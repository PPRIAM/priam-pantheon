'use server'

// Actions serveur pour la gestion des témoignages (CRUD) avec auto-seeding et résilience
import { prisma } from '@/lib/prisma'
import type { Testimonial } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Données réelles de référence des témoignages (Single Source of Truth)
const INITIAL_TESTIMONIALS = [
  {
    clientName: 'Équipe Ayibuzz',
    role: 'Directeur des Opérations',
    company: 'Ayibuzz Média',
    quote: 'L\'architecture web développée par PRIAM a totalement transformé notre gestion événementielle. Le système de billetterie natif et l\'interface fluide nous ont permis d\'enregistrer une hausse de 350% des réservations directes dès le premier événement.',
    rating: 5,
  },
  {
    clientName: 'Direction Kez',
    role: 'Fondatrice & Event Producer',
    company: 'Kez Events',
    quote: 'Pour l\'événement Xperience, PRIAM a su traduire l\'essence de notre marque avec une direction artistique \'Comic/Dark-Tech\' percutante. La plateforme est non seulement visuellement spectaculaire, mais elle a généré une conversion record.',
    rating: 5,
  },
]

// Objets statiques de secours typés sans aucun recours à 'as any' ou '@ts-ignore'
const FALLBACK_TESTIMONIALS: Testimonial[] = INITIAL_TESTIMONIALS.map((t, index) => ({
  id: `static-testimonial-${index + 1}`,
  ...t,
  avatarImage: null,
  createdAt: new Date('2026-06-28T03:21:15.385Z'),
}))

/**
 * Assure l'auto-alimentation (seeding) dynamique de la base de données si aucun témoignage n'existe.
 * En cas de zéro enregistrement dans la table Testimonial, insère les témoignages réels d'Ayibuzz Média et Kez Events.
 */
async function ensureTestimonialsSeeded(): Promise<void> {
  try {
    const count = await prisma.testimonial.count()
    if (count === 0) {
      await prisma.testimonial.createMany({
        data: INITIAL_TESTIMONIALS,
      })
    }
  } catch (e) {
    console.error('Échec de la vérification ou de l\'auto-seeding des témoignages :', e)
  }
}

// Schéma de validation pour un témoignage
const testimonialSchema = z.object({
  clientName: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  quote: z.string().min(10).max(1000),
  rating: z.coerce.number().min(1).max(5).default(5),
})

// Récupérer tous les témoignages triés par date de création avec auto-seeding et fallback résilient
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    await ensureTestimonialsSeeded()
    const dbTestimonials = await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
    if (dbTestimonials.length > 0) return dbTestimonials
    return FALLBACK_TESTIMONIALS
  } catch (e) {
    console.error('getTestimonials a échoué, activation du tableau statique de secours :', e)
    return FALLBACK_TESTIMONIALS
  }
}

// Créer un nouveau témoignage depuis un FormData
export async function createTestimonial(formData: FormData) {
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }
  try {
    const testimonial = await prisma.testimonial.create({ data: parsed.data })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, testimonial }
  } catch (e) {
    console.error('createTestimonial a échoué :', e)
    return { success: false, errors: { _root: ['Erreur base de données. Veuillez réessayer.'] } }
  }
}

// Mettre à jour un témoignage existant
export async function updateTestimonial(id: string, formData: FormData) {
  const parsed = testimonialSchema.safeParse(Object.fromEntries(formData))
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }
  try {
    const testimonial = await prisma.testimonial.update({ where: { id }, data: parsed.data })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true, testimonial }
  } catch (e) {
    console.error('updateTestimonial a échoué :', e)
    return { success: false, errors: { _root: ['Erreur base de données. Veuillez réessayer.'] } }
  }
}

// Supprimer un témoignage par son identifiant
export async function deleteTestimonial(id: string) {
  try {
    await prisma.testimonial.delete({ where: { id } })
    revalidatePath('/admin/testimonials')
    revalidatePath('/')
    return { success: true }
  } catch (e) {
    console.error('deleteTestimonial a échoué :', e)
    return { success: false, error: 'Impossible de supprimer ce témoignage.' }
  }
}


