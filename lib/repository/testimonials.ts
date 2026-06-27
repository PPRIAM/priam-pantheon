// Interface du Repository pour l'entité Témoignage (Testimonial)
// Tous les commentaires sont en français pour respecter la consigne du Boss

import { Testimonial } from '@prisma/client'

// Type d'entrée pour la création et mise à jour d'un témoignage
export type TestimonialInput = Omit<Testimonial, 'id' | 'createdAt'>

export interface TestimonialRepository {
  /**
   * Récupère tous les témoignages ordonnés par date de création.
   */
  getAll(): Promise<Testimonial[]>

  /**
   * Crée un nouveau témoignage.
   */
  create(data: TestimonialInput): Promise<Testimonial>

  /**
   * Met à jour un témoignage existant.
   */
  update(id: string, data: TestimonialInput): Promise<Testimonial>

  /**
   * Supprime un témoignage.
   */
  delete(id: string): Promise<void>
}
