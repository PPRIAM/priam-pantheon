'use server'

// Actions serveur pour la gestion des projets (CRUD) avec auto-seeding et résilience
import { prisma } from '@/lib/prisma'
import type { Project } from '@prisma/client'
import { revalidatePath } from 'next/cache'
import { z } from 'zod'

// Données réelles de référence des projets (Single Source of Truth)
const INITIAL_PROJECTS = [
  {
    title: 'Ayibuzz Website',
    slug: 'ayibuzz-website',
    type: 'Développement Web',
    status: 'PUBLISHED',
    clientName: 'Ayibuzz Média',
    role: 'Lead Designer & Developer',
    problem: 'Ayibuzz Média faisait face à un défi majeur d\'orchestration : l\'absence d\'une infrastructure propre pour contrôler le flux de réservations et la billetterie de leurs évènements d\'envergure. Dépendre de plateformes tierces entraînait une perte de données stratégiques, une expérience utilisateur morcelée et une incapacité à valoriser pleinement l\'écosystème de leurs intervenants.',
    approach: 'Nous avons conçu une architecture numérique hautement modulable et évolutive. Notre méthodologie s\'est concentrée sur la fluidification du parcours d\'achat, la structuration claire des programmes par sessions thématiques, et la mise en scène éditoriale des profils d\'intervenants pour décupler la désirabilité de chaque édition.',
    solution: 'Déploiement d\'une plateforme web haut de gamme intégrant un moteur natif de création d\'évènements, un système d\'achat de billets fluide et sécurisé, et un annuaire interactif des intervenants. L\'interface allie sobriété néo-olympienne et micro-animations réactives pour garantir une conversion immédiate.',
    roi: '+350% de réservations directes',
    liveUrl: 'https://ayibuzz-media.com/',
    previewType: 'iframe',
  },
  {
    title: 'Xperience',
    slug: 'xperience',
    type: 'Développement Web',
    status: 'PUBLISHED',
    clientName: 'Kez Events',
    role: 'Lead Designer & Developer',
    problem: 'Kez Events avait besoin d\'une vitrine numérique captivante et singulière pour son évènement phare \'Xperience\'. L\'objectif était de casser les codes des sites de réservation traditionnels afin d\'attirer une audience jeune et exigeante, de susciter une fascination visuelle immédiate et de maximiser la réservation de places en ligne.',
    approach: 'Nous avons structuré une expérience utilisateur fluide organisée autour d\'une architecture maîtresse en 4 sections stratégiques. Cette approche rythmée égrène la valeur de l\'évènement de manière séquentielle tout en préservant l\'énergie brute et l\'identité graphique unique de la marque.',
    solution: 'Conception et développement d\'un site web à forte identité visuelle combinant un moteur de réservation rapide, une ergonomie UI/UX épurée et des animations sur mesure style \'Comic/Dark-Tech\'. Le résultat est une immersion sensorielle qui captive l\'utilisateur dès les premières secondes.',
    roi: '+280% de conversion en réservations',
    liveUrl: 'https://xperience-website-sable.vercel.app/',
    previewType: 'iframe',
  },
]

// Objets statiques de secours typés sans aucun recours à 'as any' ou '@ts-ignore'
const FALLBACK_PROJECTS: Project[] = INITIAL_PROJECTS.map((p, index) => ({
  id: `static-project-${index + 1}`,
  ...p,
  coverImage: null,
  gallery: null,
  createdAt: new Date('2026-06-28T03:21:15.385Z'),
  updatedAt: new Date('2026-06-28T03:21:15.385Z'),
}))

/**
 * Assure l'auto-alimentation (seeding) dynamique de la base de données si aucun projet n'existe.
 * En cas de zéro enregistrement dans la table Project, insère les projets réels Ayibuzz Website et Xperience.
 */
async function ensureProjectsSeeded(): Promise<void> {
  try {
    const count = await prisma.project.count()
    if (count === 0) {
      await prisma.project.createMany({
        data: INITIAL_PROJECTS,
      })
    }
  } catch (e) {
    console.error('Échec de la vérification ou de l\'auto-seeding des projets :', e)
  }
}

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
  liveUrl: z.string().url().optional().or(z.literal('')),
  previewType: z.enum(['iframe', 'image', 'video']).optional(),
  coverImage: z.string().url().optional().or(z.literal('')),
})

// Récupérer tous les projets (admin) avec auto-seeding et fallback résilient
export async function getProjects(): Promise<Project[]> {
  try {
    await ensureProjectsSeeded()
    const dbProjects = await prisma.project.findMany({ orderBy: { createdAt: 'desc' } })
    if (dbProjects.length > 0) return dbProjects
    return FALLBACK_PROJECTS
  } catch (e) {
    console.error('getProjects a échoué, activation du tableau statique de secours :', e)
    return FALLBACK_PROJECTS
  }
}

// Récupérer uniquement les projets publiés (front-end public) avec auto-seeding et fallback résilient
export async function getPublishedProjects(): Promise<Project[]> {
  try {
    await ensureProjectsSeeded()
    const dbProjects = await prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })
    if (dbProjects.length > 0) return dbProjects
    return FALLBACK_PROJECTS.filter((p) => p.status === 'PUBLISHED')
  } catch (e) {
    console.error('getPublishedProjects a échoué, activation du tableau statique de secours :', e)
    return FALLBACK_PROJECTS.filter((p) => p.status === 'PUBLISHED')
  }
}

// Récupérer un projet par son slug
export async function getProjectBySlug(slug: string): Promise<Project | null> {
  try {
    return await prisma.project.findUnique({ where: { slug } })
  } catch (e) {
    console.error('getProjectBySlug a échoué :', e)
    return FALLBACK_PROJECTS.find((p) => p.slug === slug) || null
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
        title: parsed.data.title,
        slug: parsed.data.slug,
        type: parsed.data.type,
        status: parsed.data.status,
        clientName: parsed.data.clientName,
        role: parsed.data.role,
        problem: parsed.data.problem,
        approach: parsed.data.approach,
        solution: parsed.data.solution,
        roi: parsed.data.roi || null,
        liveUrl: parsed.data.liveUrl || null,
        previewType: parsed.data.previewType || 'iframe',
        coverImage: parsed.data.coverImage || null,
      },
    })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true, project }
  } catch (e) {
    console.error('createProject a échoué :', e)
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
        title: parsed.data.title,
        slug: parsed.data.slug,
        type: parsed.data.type,
        status: parsed.data.status,
        clientName: parsed.data.clientName,
        role: parsed.data.role,
        problem: parsed.data.problem,
        approach: parsed.data.approach,
        solution: parsed.data.solution,
        roi: parsed.data.roi || null,
        liveUrl: parsed.data.liveUrl || null,
        previewType: parsed.data.previewType || 'iframe',
        coverImage: parsed.data.coverImage || null,
      },
    })
    revalidatePath('/admin/projects')
    revalidatePath('/')
    return { success: true, project }
  } catch (e) {
    console.error('updateProject a échoué :', e)
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
    console.error('deleteProject a échoué :', e)
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
    console.error('toggleProjectStatus a échoué :', e)
    return { success: false, error: 'Impossible de modifier le statut.' }
  }
}

