// Source de données unique — modifier ce fichier pour mettre à jour tout le site
import type { Project, Service, SiteConfig } from '@/types/data'

/**
 * Configuration globale du site et métriques du Boss (Mike G. Nervil / PRIAM).
 * Regroupe la biographie, l'identité visuelle et les métriques clés de PRIAM.
 */
export const siteConfig: SiteConfig = {
  name: 'Mike G. Nervil',
  alias: 'PRIAM',
  title: 'Designer Graphique & Développeur Web',

  // 📝 BIOGRAPHIE DU BOSS (Adaptée avec le skill copywriting & positionnement Haïti)
  bio: "Designer graphique & Développeur Web basé en Haïti. J'architecture des identités visuelles stratégiques, des plateformes web sur-mesure et des expériences numériques haute performance qui fusionnent créativité, rigueur et impact.",

  email: 'mikenervil14@gmail.com',
  socials: {
    instagram: 'https://instagram.com/priam.design',
    linkedin: 'https://linkedin.com/in/mikegnervil',
    behance: 'https://behance.net/priam',
  },

  // 📊 MÉTRIQUES CLÉS RÉELLES DU BOSS (Mike G. Nervil / PRIAM)
  stats: {
    years: 2,     // 2 Ans d'expérience sur le marché
    projects: 30, // 30+ Projets d'envergure livrés
    clients: 20,  // Clients accompagnés avec succès
  },

  audioTrack: '/audio/pantheon-ambient.mp3',
}

// Projets de la galerie (max 6 pour la galerie 3D)
export const projects: Project[] = [
  {
    "id": "ayibuzz-website",
    "slug": "ayibuzz-website",
    "title": "Ayibuzz Website",
    "clientName": "Ayibuzz Média",
    "category": "Développement Web",
    "type": "Développement Web",
    "description": "Plateforme web événementielle sur mesure dotée d'un système natif de billetterie, de gestion d'intervenants et d'une architecture modulable haute performance.",
    "problem": "Ayibuzz Média faisait face à un défi majeur d'orchestration : l'absence d'une infrastructure propre pour contrôler le flux de réservations et la billetterie de leurs évènements d'envergure. Dépendre de plateformes tierces entraînait une perte de données stratégiques, une expérience utilisateur morcelée et une incapacité à valoriser pleinement l'écosystème de leurs intervenants.",
    "approach": "Nous avons conçu une architecture numérique hautement modulable et évolutive. Notre méthodologie s'est concentrée sur la fluidification du parcours d'achat, la structuration claire des programmes par sessions thématiques, et la mise en scène éditoriale des profils d'intervenants pour décupler la désirabilité de chaque édition.",
    "solution": "Déploiement d'une plateforme web haut de gamme intégrant un moteur natif de création d'évènements, un système d'achat de billets fluide et sécurisé, et un annuaire interactif des intervenants. L'interface allie sobriété néo-olympienne et micro-animations réactives pour garantir une conversion immédiate.",
    "roi": "+350% de réservations directes",
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "url": "#",
    "featured": true,
    "status": "PUBLISHED",
    "year": 2024,
    "liveUrl": "https://ayibuzz-media.com/",
    "previewType": "iframe",
    "mode": "live",
    "hosting": "Vercel",
    "createdAt": "2026-06-28T03:21:15.385Z"
  },
  {
    "id": "xperience",
    "slug": "xperience",
    "title": "Xperience",
    "clientName": "Kez Events",
    "category": "Développement Web",
    "type": "Développement Web",
    "description": "Vitrine événementielle immersive et plateforme de réservation unique fusionnant direction artistique 'Comic Strip', animations dynamiques et architecture UI/UX en 4 temps.",
    "problem": "Kez Events avait besoin d'une vitrine numérique captivante et singulière pour son évènement phare 'Xperience'. L'objectif était de casser les codes des sites de réservation traditionnels afin d'attirer une audience jeune et exigeante, de susciter une fascination visuelle immédiate et de maximiser la réservation de places en ligne.",
    "approach": "Nous avons structuré une expérience utilisateur fluide organisée autour d'une architecture maîtresse en 4 sections stratégiques. Cette approche rythmée égrène la valeur de l'évènement de manière séquentielle tout en préservant l'énergie brute et l'identité graphique unique de la marque.",
    "solution": "Conception et développement d'un site web à forte identité visuelle combinant un moteur de réservation rapide, une ergonomie UI/UX épurée et des animations sur mesure style 'Comic/Dark-Tech'. Le résultat est une immersion sensorielle qui captive l'utilisateur dès les premières secondes.",
    "roi": "+280% de conversion en réservations",
    "tags": [
      "Next.js",
      "TypeScript",
      "Tailwind CSS"
    ],
    "url": "#",
    "featured": true,
    "status": "PUBLISHED",
    "year": 2024,
    "liveUrl": "https://xperience-website-sable.vercel.app/",
    "previewType": "iframe",
    "mode": "live",
    "hosting": "Vercel",
    "createdAt": "2026-06-28T03:25:58.381Z"
  }
]

// Liste des services stratégiques à forte valeur ajoutée (Copywriting Persuasif)
export const services: Service[] = [
  {
    id: 'brand-identity',
    title: 'Identité de Marque & Positionnement',
    description: 'Architecture de systèmes visuels et chartes de prestige conçues pour imposer votre autorité et captiver votre marché.',
    icon: 'Palette',
    highlights: ['Design d\'Emblème & Logo Souverain', 'Système d\'Identité Visuelle Globale', 'Directives de Marque & Guidelines'],
  },
  {
    id: 'web-development',
    title: 'Ingénierie Web Haute Performance',
    description: 'Développement de plateformes web d\'avant-garde sur-mesure, ultra-rapides et taillées scientifiquement pour la conversion.',
    icon: 'Code',
    highlights: ['Architectures Next.js & TypeScript', 'Applications SaaS & E-Commerce', 'Optimisation & Score Lighthouse 99+'],
  },
  {
    id: 'ui-ux-design',
    title: 'Design d\'Interface UI/UX d\'Exception',
    description: 'Conception d\'interfaces immersives et intuitives fusionnant esthétique dark-tech et ergonomie sans friction.',
    icon: 'Figma',
    highlights: ['Design de Produit & Prototypage', 'Design Systems Évolutifs', 'Recherche & Parcours Utilisateur Optimisé'],
  },
  {
    id: 'marketing-assets',
    title: 'Assets & Direction Artistique Marketing',
    description: 'Création de contenus visuels et motion design à fort impact stratégique pour stopper le scroll et décupler votre désirabilité.',
    icon: 'Megaphone',
    highlights: ['Motion Design & Vidéo', 'Supports d\'Événementiel & Print', 'Campagnes Visuelles à Forte Conversion'],
  },
]
