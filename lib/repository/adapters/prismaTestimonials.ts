// Implémentation Prisma de l'interface TestimonialRepository
// Tous les commentaires sont rédigés en français

import { PrismaClient, Testimonial } from '@prisma/client'
import { TestimonialRepository, TestimonialInput } from '../testimonials'

export class PrismaTestimonialRepository implements TestimonialRepository {
  // Le client Prisma est injecté via le constructeur
  constructor(private prisma: PrismaClient) {}

  async getAll(): Promise<Testimonial[]> {
    return this.prisma.testimonial.findMany({
      orderBy: { createdAt: 'desc' },
    })
  }

  async create(data: TestimonialInput): Promise<Testimonial> {
    return this.prisma.testimonial.create({
      data,
    })
  }

  async update(id: string, data: TestimonialInput): Promise<Testimonial> {
    return this.prisma.testimonial.update({
      where: { id },
      data,
    })
  }

  async delete(id: string): Promise<void> {
    await this.prisma.testimonial.delete({
      where: { id },
    })
  }
}
