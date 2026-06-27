// Définitions de types centralisées pour PRIAM's Pantheon
export type ProjectCategory =
  | 'Brand Identity'
  | 'Web Development'
  | 'UI/UX Design'
  | 'Marketing Assets'

export interface Project {
  id: string
  title: string
  category: ProjectCategory
  description: string
  tags: string[]
  url?: string
  featured: boolean
  year: number
}

export interface Service {
  id: string
  title: string
  description: string
  icon: string
  highlights: string[]
}

export interface SiteConfig {
  name: string
  alias: string
  title: string
  bio: string
  email: string
  socials: {
    instagram?: string
    linkedin?: string
    behance?: string
  }
  stats: {
    years: number
    projects: number
    clients: number
  }
  audioTrack: string
}
