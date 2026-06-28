// Page d'étude de cas (Projet individuel) — PRIAM (Chargement dynamique DB & Données synthétisées)
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProjectBySlug, getPublishedProjects } from '@/app/actions/projects'
import { projects as staticProjects } from '@/data/projects'
import { Globe } from '@phosphor-icons/react/dist/ssr'

interface PageProps {
  params: Promise<{ slug: string }>
}

// Dictionnaire de secours pour les anciens projets codés en dur
const HARDCODED_CASE_STUDIES: Record<string, any> = {
  'apex-brand-identity': {
    title: 'Apex Brand Identity',
    clientName: 'Apex Ventures',
    type: 'Brand Architecture',
    role: 'Creative Director',
    timeline: 'Autumn 2024',
    problem: 'Une startup fintech en phase de Série A sans identité visuelle, éprouvant des difficultés à communiquer un positionnement haut de gamme à des investisseurs institutionnels.',
    approach: 'Animation d\'ateliers avec les parties prenantes pour extraire les piliers de la marque. Conception d\'un système visuel centré sur la typographie pour exprimer l\'autorité et la précision.',
    solution: 'Livraison d\'un système de marque complet : gamme de logos, hiérarchie typographique, palette de couleurs, papeterie, modèles de pitch decks et charte graphique (120 pages).',
    roi: 'Augmentation de 3x du taux de conversion des réunions avec les investisseurs dans les 90 jours.',
  },
  'orbis-digital-experience': {
    title: 'Orbis Digital Experience',
    clientName: 'Orbis AI',
    type: 'UX/UI Strategy',
    role: 'Lead UX Architect',
    timeline: 'Summer 2024',
    problem: 'Un tableau de bord SaaS B2B avec 68 % d\'abandon lors de la phase d\'onboarding. L\'interface, techniquement fonctionnelle, était cognitivement surchargée.',
    approach: 'Réalisation de 20 entretiens utilisateurs. Établissement d\'un framework de divulgation progressive pour introduire la complexité pas à pas.',
    solution: 'Refonte complète du flux d\'accueil (7 écrans), reconstruction du tableau de bord principal avec un système de cartes modulaires et création d\'un système de design sur mesure dans Figma.',
    roi: 'L\'abandon lors de l\'onboarding est passé de 68 % à 19 %.',
  },
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params
  
  // 1. Recherche dans la base de données SQLite via Server Action
  let projectData: any = await getProjectBySlug(slug)
  
  // 2. Si non trouvé en BD, recherche dans les projets statiques synthétisés
  if (!projectData) {
    projectData = staticProjects.find((p: any) => p.slug === slug || p.id === slug)
  }
  
  // 3. Secours sur les anciens cas d'études codés en dur
  if (!projectData) {
    projectData = HARDCODED_CASE_STUDIES[slug]
  }

  if (!projectData) {
    notFound()
  }

  // Normalisation des données pour l'affichage
  const title = projectData.title || 'Étude de Cas'
  const clientName = projectData.clientName || 'Client PRIAM'
  const type = projectData.type || projectData.category || 'Web Development'
  const role = projectData.role || 'Architecte & Designer'
  const timeline = projectData.year ? `Année ${projectData.year}` : 'Projet Récent'
  const problem = projectData.problem || projectData.challenge || 'Défi stratégique et technique sur mesure relevé avec succès par l\'agence PRIAM.'
  const approach = projectData.approach || 'Conception axée sur la performance, la typographie néo-olympienne et des architectures Web3/Next.js scalables.'
  const solution = projectData.solution || projectData.description || 'Déploiement d\'une solution sur mesure garantissant conversion, élégance et pérennité.'
  const roi = projectData.roi || projectData.impact || null
  const liveUrl = projectData.liveUrl || null

  // Récupération de tous les projets pour la navigation circulaire
  const allProjects = await getPublishedProjects()
  const slugsList = allProjects.map((p: any) => p.slug || p.id)
  const currentIndex = slugsList.indexOf(slug)
  const nextSlug = slugsList.length > 0 ? slugsList[(currentIndex + 1) % slugsList.length] : null
  const prevSlug = slugsList.length > 0 ? slugsList[(currentIndex - 1 + slugsList.length) % slugsList.length] : null

  return (
    <div className="bg-[#050505] min-h-screen text-[#F5EDD8] font-sans selection:bg-[#BEFF39] selection:text-[#050505]">
      
      {/* Barre de navigation collante et simplifiée */}
      <nav className="sticky top-0 z-50 bg-[#050505]/80 backdrop-blur-2xl border-b border-white/5 px-6 md:px-12 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">
          <Link
            href="/#about"
            className="font-mono text-xs font-bold text-[#BEFF39] hover:text-[#D4FF72] tracking-[0.15em] transition-colors"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            &larr; RETOUR AU SHOWCASE
          </Link>
          <span
            className="font-mono text-xs text-[#A89880] tracking-[0.2em] uppercase"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Étude de Cas
          </span>
        </div>
      </nav>

      {/* En-tête héro pleine largeur */}
      <header className="py-24 px-6 border-b border-white/5 bg-gradient-to-b from-white/[0.01] to-transparent">
        <div className="max-w-5xl mx-auto">
          {/* Badge de catégorie + Bouton Live */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="inline-flex px-4 py-1.5 bg-[#BEFF39]/10 text-[#BEFF39] border border-[#BEFF39]/20 rounded-full text-xs font-bold tracking-wider uppercase">
              {type}
            </div>
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#BEFF39] text-[#050505] px-5 py-2 rounded-full font-mono text-xs font-bold uppercase tracking-wider hover:bg-[#D4FF72] hover:shadow-[0_0_25px_rgba(190,255,57,0.4)] transition-all duration-300"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                <Globe size={16} weight="bold" />
                <span>Visiter le site en direct &rarr;</span>
              </a>
            )}
          </div>

          {/* Titre de l'étude de cas */}
          <h1
            className="text-4xl md:text-7xl font-bold tracking-tight text-[#F5EDD8] mb-12 leading-[1.05]"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {title}
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
              <p className="text-sm font-semibold">{clientName}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Rôle
              </p>
              <p className="text-sm font-semibold">{role}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Chronologie
              </p>
              <p className="text-sm font-semibold">{timeline}</p>
            </div>
            <div>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider mb-2"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Spécialité
              </p>
              <p className="text-sm font-semibold text-[#BEFF39]">{type}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Contenu principal de l'étude de cas */}
      <main className="py-20 px-6 max-w-4xl mx-auto">
        <div className="flex flex-col gap-16">
          
          {/* Section 1: Défi */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              Le Défi (Problem Statement)
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {problem}
            </p>
          </section>

          <hr className="border-t border-white/5 w-full" />

          {/* Section 2: Approche */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              L'Approche Stratégique
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {approach}
            </p>
          </section>

          <hr className="border-t border-white/5 w-full" />

          {/* Section 3: Solution */}
          <section className="scroll-mt-24">
            <h2
              className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
              style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
            >
              La Solution PRIAM
            </h2>
            <p className="text-base md:text-lg text-[#A89880] leading-relaxed whitespace-pre-line font-light">
              {solution}
            </p>
          </section>

          {roi && (
            <>
              <hr className="border-t border-white/5 w-full" />

              {/* Section 4: Impact ROI */}
              <section className="scroll-mt-24">
                <h2
                  className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6"
                  style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                >
                  L'Impact Mesurable (ROI)
                </h2>
                <div className="p-8 rounded-2xl border border-[#BEFF39]/20 bg-[#BEFF39]/[0.03]">
                  <p
                    className="font-mono text-[10px] text-[#BEFF39] uppercase tracking-wider mb-3"
                    style={{ fontFamily: 'var(--font-space-mono)' }}
                  >
                    Résultat Clef
                  </p>
                  <p
                    className="text-xl md:text-3xl italic text-[#BEFF39] leading-relaxed font-bold"
                    style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
                  >
                    &ldquo;{roi}&rdquo;
                  </p>
                </div>
              </section>
            </>
          )}

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
            Prêt à transformer votre présence numérique ?
          </h3>
          <Link
            href="/#contact"
            className="inline-flex items-center justify-center px-10 py-4 bg-[#BEFF39] text-[#050505] font-mono text-xs font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#D4FF72] hover:shadow-[0_0_30px_rgba(190,255,57,0.35)] hover:scale-105 active:scale-98 transition-all duration-300 cursor-pointer"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Démarrer un Projet &rarr;
          </Link>
        </div>

        {/* Navigation circulaire Précédent / Suivant */}
        {nextSlug && prevSlug && (
          <div className="flex justify-between items-center pt-8 border-t border-white/5">
            <Link
              href={`/work/${prevSlug}`}
              className="flex flex-col gap-2 group cursor-pointer text-left"
            >
              <span
                className="font-mono text-[10px] text-[#A89880] tracking-widest uppercase transition-colors group-hover:text-[#BEFF39]"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                &larr; Projet Précédent
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
                Projet Suivant &rarr;
              </span>
            </Link>
          </div>
        )}
      </footer>

    </div>
  )
}
