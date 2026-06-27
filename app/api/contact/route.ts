import { NextRequest, NextResponse } from 'next/server'
import { Resend } from 'resend'
import { z } from 'zod'

// Schéma de validation du formulaire de contact
const contactSchema = z.object({
  name: z.string().min(2, 'Le nom doit contenir au moins 2 caractères').max(100),
  email: z.string().email('Adresse email invalide'),
  subject: z.string().min(2, 'Le sujet est trop court').max(200),
  message: z.string().min(10, 'Le message est trop court').max(5000),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const data = contactSchema.parse(body)

    // Envoi de l'email via Resend — uniquement si la clé API est configurée
    const apiKey = process.env.RESEND_API_KEY
    if (apiKey && !apiKey.startsWith('re_placeholder')) {
      const resend = new Resend(apiKey)
      await resend.emails.send({
        from: 'contact@priam.design',
        to: process.env.ADMIN_EMAIL ?? 'admin@priam.com',
        replyTo: data.email,
        subject: `[Priam.design] ${data.subject}`,
        text: `Nouveau message de ${data.name} (${data.email}):\n\n${data.message}`,
        html: `
          <h2>Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${data.name}</p>
          <p><strong>Email :</strong> ${data.email}</p>
          <p><strong>Sujet :</strong> ${data.subject}</p>
          <hr />
          <p>${data.message.replace(/\n/g, '<br/>')}</p>
        `,
      })
    } else {
      // Fallback en développement — log structuré
      console.info('📧 [DEV] Message de contact reçu (Resend non configuré):', {
        name: data.name,
        email: data.email,
        subject: data.subject,
        messagePreview: data.message.slice(0, 100),
      })
    }

    return NextResponse.json(
      { success: true, message: 'Message reçu. Je vous répondrai sous 24 heures.' },
      { status: 200 }
    )
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Retourner les erreurs de validation par champ
      return NextResponse.json(
        { success: false, errors: error.flatten().fieldErrors },
        { status: 400 }
      )
    }
    console.error('Erreur API contact:', error)
    return NextResponse.json(
      { success: false, message: 'Erreur serveur interne' },
      { status: 500 }
    )
  }
}
