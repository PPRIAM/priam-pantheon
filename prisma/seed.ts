// Script d'ensemencement — données initiales pour les tests
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Supprimer les données existantes
  await prisma.testimonial.deleteMany()
  await prisma.project.deleteMany()

  // Créer les projets de démonstration
  await prisma.project.createMany({
    data: [
      {
        title: 'Apex Brand Identity',
        slug: 'apex-brand-identity',
        type: 'Brand Architecture',
        status: 'PUBLISHED',
        clientName: 'Apex Ventures',
        role: 'Creative Director',
        problem: 'A Series-A fintech startup with no visual identity, struggling to communicate premium positioning to institutional investors.',
        approach: 'Conducted stakeholder workshops to extract brand pillars. Developed a typographic-led identity system centered on authority and precision.',
        solution: 'Delivered a complete brand system: logo suite, typography hierarchy, color palette, stationery, pitch deck template, and brand guidelines (120 pages).',
        roi: '3x increase in investor meeting conversion rate within 90 days of rebrand launch.',
      },
      {
        title: 'Orbis Digital Experience',
        slug: 'orbis-digital-experience',
        type: 'UX/UI Strategy',
        status: 'PUBLISHED',
        clientName: 'Orbis AI',
        role: 'Lead UX Architect',
        problem: 'A B2B SaaS dashboard with 68% user drop-off during onboarding. The interface was technically functional but cognitively overwhelming.',
        approach: 'Ran 20 user interviews. Built a progressive disclosure framework that introduced complexity incrementally.',
        solution: 'Redesigned the onboarding flow (7 screens), rebuilt the main dashboard with a modular card system, and created a custom design system in Figma.',
        roi: 'Onboarding drop-off reduced from 68% to 19%. Time-to-value cut from 12 days to 3 days.',
      },
      {
        title: 'Nomad Motion Campaign',
        slug: 'nomad-motion-campaign',
        type: 'Motion Design',
        status: 'PUBLISHED',
        clientName: 'Nomad Creative',
        role: 'Motion Director',
        problem: 'A lifestyle brand needed a launch campaign that felt premium, kinetic, and distinct from competitors in a saturated market.',
        approach: 'Developed a visual language around controlled chaos: slow, deliberate transitions contrasted with explosive reveals.',
        solution: 'Produced a 90-second brand film, 12 social motion assets, and an interactive microsite with scroll-driven animations.',
        roi: '2.4M organic views in 30 days. Brand awareness up 340% per post-campaign survey.',
      },
      {
        title: 'Meridian Product Strategy',
        slug: 'meridian-product-strategy',
        type: 'Product Direction',
        status: 'PUBLISHED',
        clientName: 'Meridian Health',
        role: 'Product Strategist',
        problem: 'A HealthTech startup at a critical pivot point. Their original product had product-market fit issues.',
        approach: 'Led a 6-week discovery sprint: competitive analysis, customer journey mapping, market sizing, and opportunity landscaping.',
        solution: 'Delivered a 60-page strategic roadmap, repositioned for the employer health benefits market.',
        roi: 'Secured $4.2M seed round within 5 months of strategic pivot. Now serves 14 enterprise clients.',
      },
    ],
  })

  // Créer les témoignages initiaux
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Marcus Chen',
        role: 'CEO',
        company: 'Apex Ventures',
        quote: 'Priam did not just design a logo — he architected a perception. The brand system he delivered positioned us alongside firms 10x our size. We closed our Series A 3 months after the rebrand.',
        rating: 5,
      },
      {
        clientName: 'Dr. Layla Hassan',
        role: 'CPO',
        company: 'Orbis AI',
        quote: 'The UX overhaul Priam delivered was the single highest-ROI investment we made in Q3. What other designers told us would take 6 months, he shipped in 8 weeks without sacrificing depth.',
        rating: 5,
      },
      {
        clientName: 'Sofia Reyes',
        role: 'Founder',
        company: 'Nomad Creative',
        quote: "I have worked with agencies in NYC and London. Priam operates at a different frequency. He thinks about the problem you haven't asked yet, then solves that one first.",
        rating: 5,
      },
    ],
  })

  console.log('✅ Base de données ensemencée avec succès — 4 projets, 3 témoignages créés')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'ensemencement:', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
