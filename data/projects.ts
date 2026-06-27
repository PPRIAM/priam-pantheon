// Source de données unique — modifier ce fichier pour mettre à jour tout le site
import type { Project, Service, SiteConfig } from '@/types/data'

export const siteConfig: SiteConfig = {
  name: 'Mike G. Nervil',
  alias: 'PRIAM',
  title: 'Creative Director & Web Architect',
  bio: "I don't just design and build — I craft digital legacies that transform businesses.",
  email: 'mikenervil14@gmail.com',
  socials: {
    instagram: 'https://instagram.com/priam.design',
    linkedin: 'https://linkedin.com/in/mikegnervil',
    behance: 'https://behance.net/priam',
  },
  stats: { years: 5, projects: 40, clients: 20 },
  audioTrack: '/audio/pantheon-ambient.mp3',
}

// Projets de la galerie (max 6 pour la galerie 3D)
export const projects: Project[] = [
  {
    id: 'brand-luxeaura',
    title: 'LuxeAura Brand Identity',
    category: 'Brand Identity',
    description: 'Complete brand system for a luxury wellness company.',
    tags: ['Logo Design', 'Typography', 'Brand Guidelines'],
    url: '#',
    featured: true,
    year: 2024,
  },
  {
    id: 'web-novatech',
    title: 'NovaTech SaaS Platform',
    category: 'Web Development',
    description: 'Full-stack web app for B2B project management.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    url: '#',
    featured: true,
    year: 2024,
  },
  {
    id: 'ui-pulsedash',
    title: 'PulseDash Analytics UI',
    category: 'UI/UX Design',
    description: 'Dashboard redesign increasing user retention by 38%.',
    tags: ['Figma', 'Design System', 'Data Viz'],
    url: '#',
    featured: true,
    year: 2023,
  },
  {
    id: 'brand-arcvault',
    title: 'ArcVault Brand Launch',
    category: 'Brand Identity',
    description: 'Bold identity for a Web3 asset storage platform.',
    tags: ['Logo', 'Motion', 'Visual Language'],
    url: '#',
    featured: false,
    year: 2023,
  },
  {
    id: 'web-solarcycle',
    title: 'SolarCycle E-commerce',
    category: 'Web Development',
    description: 'High-conversion Shopify store for sustainable cycling brand.',
    tags: ['Shopify', 'Custom Theme', 'CRO'],
    url: '#',
    featured: false,
    year: 2023,
  },
  {
    id: 'marketing-meridian',
    title: 'Meridian Campaign Assets',
    category: 'Marketing Assets',
    description: '360° campaign for Q4 product launch — social, print, OOH.',
    tags: ['Social Media', 'Print', 'Motion Graphics'],
    url: '#',
    featured: false,
    year: 2024,
  },
]

export const services: Service[] = [
  {
    id: 'brand-identity',
    title: 'Brand Identity',
    description: 'Logos, visual systems, and brand guidelines that mean business.',
    icon: 'Palette',
    highlights: ['Logo & Mark Design', 'Visual Identity System', 'Brand Guidelines'],
  },
  {
    id: 'web-development',
    title: 'Web Development',
    description: 'Fast, modern websites and apps built to convert.',
    icon: 'Code',
    highlights: ['Next.js & React', 'E-commerce & SaaS', 'Performance-first'],
  },
  {
    id: 'ui-ux-design',
    title: 'UI/UX Design',
    description: 'Interfaces that are beautiful and impossible to leave.',
    icon: 'Figma',
    highlights: ['Product Design', 'Design Systems', 'User Research'],
  },
  {
    id: 'marketing-assets',
    title: 'Marketing Assets',
    description: 'Social, print, and motion assets that stop the scroll.',
    icon: 'Megaphone',
    highlights: ['Social Media', 'Print & OOH', 'Motion Graphics'],
  },
]
