# 05 — Backend Schema
# PRIAM's Pantheon — Static Data Architecture

---

## 1. Overview

PRIAM's Pantheon is a **static frontend-only portfolio**. There is no server-side database,
no authentication, no user accounts. All content is driven by TypeScript data files
committed to the repository.

**Contact mechanism:** `mailto:` link (Phase 1). Resend API (Phase 2 upgrade).

---

## 2. Data Architecture

All site content lives in `data/projects.ts`. This is the single source of truth.
No CMS, no API, no database in Phase 1.

---

## 3. TypeScript Data Models

### 3.1 Project

```typescript
// Modèle de projet pour la galerie 3D
export interface Project {
  id: string;              // Identifiant unique slug (ex: "brand-luxeaura")
  title: string;           // Nom du projet affiché dans le cadre
  category: ProjectCategory; // Catégorie pour le badge
  description: string;    // Courte description (max 100 chars) pour la carte
  tags: string[];          // Technologies / disciplines utilisées
  url?: string;            // URL externe du projet (optionnel)
  featured: boolean;       // Mis en avant = apparaît en premier dans la galerie
  year: number;            // Année du projet
}

export type ProjectCategory =
  | 'Brand Identity'
  | 'Web Development'
  | 'UI/UX Design'
  | 'Marketing Assets';
```

### 3.2 Service

```typescript
// Modèle de service pour la chambre Arsenal
export interface Service {
  id: string;              // Slug unique
  title: string;           // Nom du service
  description: string;    // Description courte (max 80 chars)
  icon: string;            // Nom de l'icône Phosphor
  highlights: string[];   // 3 points clés du service
}
```

### 3.3 SiteConfig

```typescript
// Configuration globale du site — identité et contact
export interface SiteConfig {
  name: string;            // "Mike G. Nervil"
  alias: string;           // "PRIAM"
  title: string;           // "Creative Director & Web Architect"
  bio: string;             // Citation biographique (max 200 chars)
  email: string;           // Email de contact mailto:
  socials: {
    instagram?: string;    // URL Instagram
    linkedin?: string;     // URL LinkedIn
    behance?: string;      // URL Behance
  };
  stats: {
    years: number;         // Années d'expérience
    projects: number;      // Projets complétés
    clients: number;       // Clients servis
  };
  audioTrack: string;      // Chemin vers /public/audio/pantheon-ambient.mp3
}
```

---

## 4. Seed Data (data/projects.ts)

```typescript
import type { Project, Service, SiteConfig } from '@/types/data'

// Configuration principale du site
export const siteConfig: SiteConfig = {
  name: 'Mike G. Nervil',
  alias: 'PRIAM',
  title: 'Creative Director & Web Architect',
  bio: "I don't just design and build — I craft digital legacies that transform businesses.",
  email: 'priamnervil@gmail.com',
  socials: {
    instagram: 'https://instagram.com/priam.design',
    linkedin: 'https://linkedin.com/in/mikegnervil',
    behance: 'https://behance.net/priam',
  },
  stats: {
    years: 5,
    projects: 40,
    clients: 20,
  },
  audioTrack: '/audio/pantheon-ambient.mp3',
}

// Projets de la galerie (max 6 recommandés pour la galerie 3D)
export const projects: Project[] = [
  {
    id: 'brand-luxeaura',
    title: 'LuxeAura Brand Identity',
    category: 'Brand Identity',
    description: 'Complete brand system for a luxury wellness company.',
    tags: ['Logo Design', 'Typography', 'Brand Guidelines'],
    url: 'https://behance.net/priam/luxeaura',
    featured: true,
    year: 2024,
  },
  {
    id: 'web-novatech',
    title: 'NovaTech SaaS Platform',
    category: 'Web Development',
    description: 'Full-stack web app for B2B project management.',
    tags: ['Next.js', 'TypeScript', 'Supabase'],
    url: 'https://novatech.io',
    featured: true,
    year: 2024,
  },
  {
    id: 'ui-pulsedash',
    title: 'PulseDash Analytics UI',
    category: 'UI/UX Design',
    description: 'Dashboard redesign increasing user retention by 38%.',
    tags: ['Figma', 'Design System', 'Data Viz'],
    url: 'https://behance.net/priam/pulsedash',
    featured: true,
    year: 2023,
  },
  {
    id: 'brand-arcvault',
    title: 'ArcVault Brand Launch',
    category: 'Brand Identity',
    description: 'Bold identity for a Web3 asset storage platform.',
    tags: ['Logo', 'Motion', 'Visual Language'],
    url: 'https://behance.net/priam/arcvault',
    featured: false,
    year: 2023,
  },
  {
    id: 'web-solarcycle',
    title: 'SolarCycle E-commerce',
    category: 'Web Development',
    description: 'High-conversion Shopify store for sustainable cycling brand.',
    tags: ['Shopify', 'Custom Theme', 'Conversion CRO'],
    url: 'https://solarcycle.co',
    featured: false,
    year: 2023,
  },
  {
    id: 'marketing-meridian',
    title: 'Meridian Campaign Assets',
    category: 'Marketing Assets',
    description: '360° campaign for Q4 product launch — social, print, OOH.',
    tags: ['Social Media', 'Print', 'Motion Graphics'],
    url: 'https://behance.net/priam/meridian',
    featured: false,
    year: 2024,
  },
]

// Services de la chambre Arsenal
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
```

---

## 5. Types File

```typescript
// types/data.ts — Définitions de types centralisées
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
```

---

## 6. Phase 2 — Resend API (Future Upgrade)

When ready to upgrade from mailto: to a real contact form:

```typescript
// app/api/contact/route.ts (future)
// POST body:
interface ContactPayload {
  name: string      // Sender name
  email: string     // Sender email
  message: string   // Project brief
  budget?: string   // Optional budget range
}

// Response:
interface ContactResponse {
  success: boolean
  messageId?: string
  error?: string
}
```

Resend sends to `priamnervil@gmail.com` with formatted HTML email template.
No database needed — purely transactional.

---

## 7. Audio Asset

```
Location: /public/audio/pantheon-ambient.mp3
Format:   MP3, 128kbps (balance quality vs. load time)
Duration: 3–5 minutes, seamlessly loopable
Content:  Greek/epic dark orchestral ambient (royalty-free)
Source:   Boss to provide OR use Pixabay / Freesound royalty-free track
```

**Placeholder:** Until Boss provides track, use a silent 1-second MP3 
so the audio system initializes without errors.
