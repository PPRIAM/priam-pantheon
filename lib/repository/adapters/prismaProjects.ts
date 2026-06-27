// Implémentation Prisma de l'interface ProjectRepository
// Tous les commentaires sont rédigés en français

import { PrismaClient, Project } from '@prisma/client'
import { ProjectRepository, ProjectInput } from '../projects'

export class PrismaProjectRepository implements ProjectRepository {
  // Le client Prisma est injecté via le constructeur pour faciliter les mocks
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Project[]> {
    return this.prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async getPublished(): Promise<Project[]> {
    return this.prisma.project.findMany({
      where: { status: 'PUBLISHED' },
      orderBy: { createdAt: 'desc' },
    })
  }

  async getBySlug(slug: string): Promise<Project | null> {
    return this.prisma.project.findUnique({
      where: { slug },
    })
  }

  async create(data: ProjectInput): Promise<Project> {
    return this.prisma.project.create({
      data: {
        ...data,
        roi: data.roi || null,
        coverImage: data.coverImage || null,
      },
    })
  }

  async update(id: string, data: ProjectInput): Promise<Project> {
    return this.prisma.project.update({
      where: { id },
      data: {
        ...data,
        roi: data.roi || null,
        coverImage: data.coverImage || null,
      },
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.project.delete({
      where: { id },
    })
  }
}
