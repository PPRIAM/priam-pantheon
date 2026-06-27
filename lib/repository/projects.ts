// Interface du Repository pour l'entité Projet (Project)
// Tous les commentaires sont en français pour respecter la consigne du Boss

import { Project } from '@prisma/client'

// Type d'entrée pour la création et mise à jour d'un projet, excluant les champs gérés par le système
export type ProjectInput = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>

export interface ProjectRepository {
  /**
   * Récupère tous les projets enregistrés (mode administration).
   */
  getAll(): Promise<Project[]>

  /**
   * Récupère uniquement les projets ayant le statut 'PUBLISHED' (mode public).
   */
  getPublished(): Promise<Project[]>

  /**
   * Récupère un projet par son slug unique.
   */
  getBySlug(slug: string): Promise<Project | null>

  /**
   * Crée un nouveau projet.
   */
  create(data: ProjectInput): Promise<Project>

  /**
   * Met à jour un projet existant identifié par son id.
   */
  update(id: string, data: ProjectInput): Promise<Project>

  /**
   * Supprime un projet de la base de données.
   */
  delete(id: string): Promise<void>
}
