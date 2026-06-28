// Définitions de types centralisées pour PRIAM's Pantheon
export type ProjectCategory =
  | 'Brand Identity'
  | 'Web Development'
  | 'UI/UX Design'
  | 'Marketing Assets'

export interface Project {
  id: string
  slug?: string
  title: string
  clientName?: string
  type?: string
  status?: string
  mode?: string
  hosting?: string
  createdAt?: string | Date
  category: ProjectCategory | string
  description: string
  tags: string[]
  url?: string
  featured: boolean
  year: number
  // Extensions pour démos en direct et études de cas
  liveUrl?: string
  previewType?: 'iframe' | 'image' | 'code' | string
  problem?: string
  approach?: string
  solution?: string
  roi?: string
  [key: string]: any
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
