'use server'
// Actions serveur pour la gestion des projets (CRUD)
import { prisma } from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Schéma de validation pour un projet
const projectSchema = z.object({
  title: z.string().min(1).max(200),
  slug: z.string().min(1).max(200).regex(/^[a-z0-9-]+$/, 'Slug invalide — utilisez uniquement des minuscules, chiffres et tirets'),
  type: z.string().min(1),
  status: z.enum(['DRAFT', 'PUBLISHED']),
  clientName: z.string().min(1),
  role: z.string().min(1),
  problem: z.string().min(1),
  approach: z.string().min(1),
  solution: z.string().min(1),
  roi: z.string().optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
})

// Récupérer tous les projets (admin)
export async function getProjects() {
  try {
    return await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
  } catch (e) {
    console.error('getProjects failed:', e)
    return []
  }
}

// Récupérer uniquement les projets publiés (front-end public)
export async function getPublishedProjects() {
  try {
    return await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })
  } catch (e) {
    console.error('getPublishedProjects failed:', e)
    return []
  }
}

// Récupérer un projet par son slug
export async function getProjectBySlug(slug: string) {
  try {
    return await prisma.project.findUnique({ where: { slug } })
  } catch (e) {
    console.error('getProjectBySlug failed:', e)
    return null
  }
}

// Créer un nouveau projet depuis un FormData
export async function createProject(formData: FormData) {
  const raw = Object.fromEntries(formData)
  const parsed = projectSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }
  try {
    const project = await prisma.project.create({
      data: {
        ...parsed.data,
        roi: parsed.data.roi || null,
        coverImage: parsed.data.coverImage || null,
      },
    })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true, project }
  } catch (e) {
    console.error('createProject failed:', e)
    return { success: false, errors: { _root: ['Erreur base de données. Veuillez réessayer.'] } }
  }
}

// Mettre à jour un projet existant
export async function updateProject(id: string, formData: FormData) {
  const raw = Object.fromEntries(formData)
  const parsed = projectSchema.safeParse(raw)
  if (!parsed.success) {
    return { success: false, errors: parsed.error.flatten().fieldErrors }
  }
  try {
    const project = await prisma.project.update({
      where: { id },
      data: {
        ...parsed.data,
        roi: parsed.data.roi || null,
        coverImage: parsed.data.coverImage || null,
      },
    })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true, project }
  } catch (e) {
    console.error('updateProject failed:', e)
    return { success: false, errors: { _root: ['Erreur base de données. Veuillez réessayer.'] } }
  }
}

// Supprimer un projet par son identifiant
export async function deleteProject(id: string) {
  try {
    await prisma.project.delete({ where: { id } })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true }
  } catch (e) {
    console.error('deleteProject failed:', e)
    return { success: false, error: 'Impossible de supprimer ce projet.' }
  }
}

// Basculer le statut d'un projet entre PUBLISHED et DRAFT
export async function toggleProjectStatus(id: string, currentStatus: string) {
  const newStatus = currentStatus === 'PUBLISHED' ? 'DRAFT' : 'PUBLISHED'
  try {
    await prisma.project.update({ where: { id }, data: { status: newStatus } })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true, newStatus }
  } catch (e) {
    console.error('toggleProjectStatus failed:', e)
    return { success: false, error: 'Impossible de modifier le statut.' }
  }
}
