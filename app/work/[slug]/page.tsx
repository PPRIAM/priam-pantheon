// Page d'étude de cas (Projet individuel) — PRIAM
import { notFound } from 'next/navigation'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Dictionnaire des projets codés en dur avec détails complets
const CASE_STUDIES: Record<
  string,
  {
    title: string
    clientName: string
    type: string
    role: string
    timeline: string
    challenge: string
    approach: string
    solution: string
    impact: string
  }
> = {
  'apex-brand-identity': {
    title: 'Apex Brand Identity',
    clientName: 'Apex Ventures',
    type: 'Brand Architecture',
    role: 'Creative Director',
    timeline: 'Autumn 2024',
    challenge:
      'Une startup fintech en phase de Série A sans identité visuelle, éprouvant des difficultés à communiquer un positionnement haut de gamme à des investisseurs institutionnels.',
    approach:
      'Animation d\'ateliers avec les parties prenantes pour extraire les piliers de la marque. Conception d\'un système visuel centré sur la typographie pour exprimer l\'autorité et la précision.',
    solution:
      'Livraison d\'un système de marque complet : gamme de logos, hiérarchie typographique, palette de couleurs, papeterie, modèles de pitch decks et charte graphique (120 pages).',
    impact:
      'Augmentation de 3x du taux de conversion des réunions avec les investisseurs dans les 90 jours suivant le lancement de la nouvelle marque.',
  },
  'orbis-digital-experience': {
    title: 'Orbis Digital Experience',
    clientName: 'Orbis AI',
    type: 'UX/UI Strategy',
    role: 'Lead UX Architect',
    timeline: 'Summer 2024',
    challenge:
      'Un tableau de bord SaaS B2B avec 68 % d\'abandon lors de la phase d\'onboarding. L\'interface, techniquement fonctionnelle, était cognitivement surchargée.',
    approach:
      'Réalisation de 20 entretiens utilisateurs. Établissement d\'un framework de divulgation progressive pour introduire la complexité pas à pas.',
    solution:
      'Refonte complète du flux d\'accueil (7 écrans), reconstruction du tableau de bord principal avec un système de cartes modulaires et création d\'un système de design sur mesure dans Figma.',
    impact:
      'L\'abandon lors de l\'onboarding est passé de 68 % à 19 %. Le délai de rentabilité utilisateur (Time-To-Value) est passé de 12 jours à seulement 3 jours.',
  },
  'nomad-motion-campaign': {
    title: 'Nomad Motion Campaign',
    clientName: 'Nomad Creative',
    type: 'Motion Design',
    role: 'Motion Director',
    timeline: 'Spring 2024',
    challenge:
      'Une marque de style de vie recherchait une campagne de lancement captivante, dynamique et radicalement distincte de ses concurrents sur un marché saturé.',
    approach:
      'Développement d\'une grammaire visuelle axée sur le chaos maîtrisé : des transitions lentes et délibérées contrastant avec des révélations explosives.',
    solution:
      'Production d\'un film de marque de 90 secondes, de 12 animations pour les réseaux sociaux et d\'un microsite interactif avec des animations déclenchées au scroll.',
    impact:
      '2,4 millions de vues organiques en 30 jours. Sensibilisation à la marque accrue de 340 % d\'après les enquêtes post-campagne.',
  },
  'meridian-product-strategy': {
    title: 'Meridian Product Strategy',
    clientName: 'Meridian Health',
    type: 'Product Direction',
    role: 'Product Strategist',
    timeline: 'Winter 2023',
    challenge:
      'Une jeune entreprise de HealthTech à un point d\'inflexion critique. Leur produit initial présentait des difficultés d\'adéquation avec le marché.',
    approach:
      'Direction d\'un sprint d\'exploration de 6 semaines : analyse concurrentielle, cartographie du parcours client, dimensionnement du marché et évaluation des opportunités.',
    solution:
      'Remise d\'une feuille de route stratégique de 60 pages, repositionnant l\'offre sur le marché des avantages santé pour les employeurs.',
    impact:
      'Levée de fonds de 4,2 millions de dollars sécurisée dans les 5 mois suivant le pivot stratégique. Dessert actuellement 14 clients entreprises.',
  },
}

// Liste ordonnée pour la navigation circulaire précédent / suivant
const SLUGS = [
  'apex-brand-identity',
  'orbis-digital-experience',
  'nomad-motion-campaign',
  'meridian-product-strategy',
]

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  const project = CASE_STUDIES[slug]

  if (!project) {
    notFound()
  }

  // Calcul des liens précédent / suivant pour la navigation
  const currentIndex = SLUGS.indexOf(slug)
  const prevSlug = SLUGS[(currentIndex - 1 + SLUGS.length) % SLUGS.length]
  const nextSlug = SLUGS[(currentIndex + 1) % SLUGS.length]

  const prevProject = CASE_STUDIES[prevSlug]
  const nextProject = CASE_STUDIES[nextSlug]

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5EDD8] font-sans selection:bg-[#BEFF39] selection:text-[#050505]">
      
      {/* Barre de navigation collante et simplifiée */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/#work"
            className="font-mono text-xs font-bold text-[#BEFF39] hover:text-[#D4FF72] tracking-[0.15em] transition-colors"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            &larr; BACK TO WORK
          </Link>
          <span
            className="font-mono text-xs text-[#A89880] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Case Study
          </span>
        </div>
      </nav>

      {/* En-tête héro pleine largeur */}
      <header className="py-24 px-6 border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="max-w-5xl mx-auto">
          {/* Badge de catégorie */}
          <div className="inline-flex px-3 py-1 bg-[#BEFF39]/10 text-[#BEFF39] border border-[#BEFF39]/20 rounded-full text-xs font-bold tracking-wider uppercase mb-8">
            {project.type}
          </div>

          {/* Titre de l'étude de cas */}
          <h1
            className="text-4xl md:text-7xl font-bold tracking-tight text-[#F5EDD8] mb-12 leading-[1.05]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {project.title}
          </h1>

          {/* Grille des métadonnées */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Client
              </p>
              <p className="text-sm font-semibold">{project.clientName}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Role
              </p>
              <p className="text-sm font-semibold">{project.role}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Timeline
              </p>
              <p className="text-sm font-semibold">{project.timeline}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Focus
              </p>
              <p className="text-sm font-semibold text-[#BEFF39]">{project.type}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal de l'étude de cas */}
      <main className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-16">
          
          {/* Section 1: Challenge */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Challenge
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {project.challenge}
            </p>
          </section>

          <hr className="border-t border-white/5 w-full" />

          {/* Section 2: Approach */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Approach
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {project.approach}
            </p>
          </section>

          <hr className="border-t border-white/5 w-full" />

          {/* Section 3: Solution */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Solution
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {project.solution}
            </p>
          </section>

          <hr className="border-t border-white/5 w-full" />

          {/* Section 4: Impact */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              The Impact
            </h2>
            <div className="p-8 rounded-2xl border border-[#BEFF39]/10 bg-[#BEFF39]/[0.02]">
              <p
                className="font-mono text-[10px] text-[#BEFF39] uppercase tracking-wider mb-3"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Measurable Value
              </p>
              <p
                className="text-lg md:text-2xl italic text-[#F5EDD8] leading-relaxed"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                &ldquo;{project.impact}&rdquo;
              </p>
            </div>
          </section>

        </div>
      </main>

      {/* Appel à l'action final au bas de la page */}
      <footer className="max-w-5xl mx-auto px-6 border-t border-white/5 pt-20 pb-24">
        
        {/* CTA "Start a Project" centré */}
        <div className="text-center mb-24">
          <h3
            className="text-2xl md:text-4xl font-bold text-[#F5EDD8] mb-8"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Ready to elevate your digital presence?
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#BEFF39] text-[#050505] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D4FF72] hover:shadow-[0_0_30px_rgba(190,255,57,0.35)] hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Start a Project &rarr;
          </Link>
        </div>

        {/* Navigation circulaire Précédent / Suivant */}
        <div className="flex justify-between items-center pt-8 border-t border-white/5">
          <Link
            href={`/work/${prevSlug}`}
            className="flex flex-col gap-2 group cursor-pointer text-left"
          >
            <span
              className="font-mono text-[10px] text-[#A89880] tracking-widest uppercase transition-colors group-hover:text-[#BEFF39]"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              &larr; Previous Case
            </span>
            <span className="text-sm font-semibold text-[#F5EDD8] transition-colors group-hover:text-[#F5EDD8]/80">
              {prevProject.title}
            </span>
          </Link>

          <Link
            href={`/work/${nextSlug}`}
            className="flex flex-col gap-2 items-end group cursor-pointer text-right"
          >
            <span
              className="font-mono text-[10px] text-[#A89880] tracking-widest uppercase transition-colors group-hover:text-[#BEFF39]"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              Next Case &rarr;
            </span>
            <span className="text-sm font-semibold text-[#F5EDD8] transition-colors group-hover:text-[#F5EDD8]/80">
              {nextProject.title}
            </span>
          </Link>
        </div>
      </footer>

    </div>
  )
}
