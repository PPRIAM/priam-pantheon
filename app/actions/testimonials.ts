'use server'
// Actions serveur pour la gestion des témoignages (CRUD)
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schéma de validation pour un témoignage
const testimonialSchema = z.object({
  clientName: z.string().min(1).max(100),
  role: z.string().min(1).max(100),
  company: z.string().min(1).max(100),
  quote: z.string().min(10).max(1000),
  rating: z.coerce.number().min(1).max(5).default(5),
})

// Récupérer tous les témoignages triés par date de création
export async function getTestimonials() {
  try {
    return await prisma.testimonial.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (e) {
    console.error('getTestimonials failed:', e)
    return []
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
    console.error('createTestimonial failed:', e)
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
    console.error('updateTestimonial failed:', e)
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
    console.error('deleteTestimonial failed:', e)
    return { success: false, error: 'Impossible de supprimer ce témoignage.' }
  }
}

