'use client'

// Section Galerie — affichage asymétrique du portfolio avec GSAP ScrollTrigger & Parallaxe
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Interface mappée sur le modèle Prisma Project
export type Project = {
  id: string
  slug: string
  title: string
  clientName: string
  type: string
  coverImage?: string | null
  createdAt: Date
}

// Props de la section — projets injectés par le Server Component parent
type GallerySectionProps = {
  projects: Project[]
}

// Composant de carte individuelle réutilisable (Refactorisé avec parallaxe et transitions GSAP)
function ProjectCard({ project, index }: { project: Project; index: number }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialsRef = useRef<HTMLSpanElement>(null)

  // Initiales du client (max 2 lettres)
  const initials = project.clientName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  // Gestionnaires pour l'effet de parallaxe sur les initiales du client au survol
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = containerRef.current
    const initials = initialsRef.current
    if (!el || !initials) return

    // Ne pas activer la parallaxe sur les écrans tactiles pour éviter les sauts
    if (window.matchMedia('(hover: none)').matches) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(initials, {
      x: x * 0.15,
      y: y * 0.15,
      scale: 1.15,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  const handleMouseLeave = () => {
    const initials = initialsRef.current
    if (!initials) return

    gsap.to(initials, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  return (
    <div
      ref={containerRef}
      className={`project-card opacity-0 ${
        index % 2 !== 0 ? 'md:mt-32' : ''
      }`}
    >
      <Link
        href={`/work/${project.slug}`}
        className="block group cursor-pointer"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Conteneur de l'image (aspect ratio 16/10) avec bordure métallique et élévation au survol */}
        <div
          className="aspect-[16/10] metallic-border overflow-hidden relative mb-6 bg-neutral-900/40 rounded-xl transition-all duration-500 group-hover:-translate-y-3 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(190,255,57,0.1)]"
        >
          {/* Dégradé de fond — lime glow vers transparent */}
          <div
            className="w-full h-full relative"
            style={{
              background: 'linear-gradient(135deg, var(--lime-glow) 0%, transparent 100%)',
            }}
          >
            {/* Badge de catégorie dans le coin supérieur gauche */}
            <div className="absolute top-4 left-4 z-10">
              <span className="category-badge text-[10px] tracking-wider px-3 py-1 font-bold">
                {project.type}
              </span>
            </div>

            {/* Initiales du client au centre */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                ref={initialsRef}
                className="text-7xl font-extrabold text-[#BEFF39]/10 select-none tracking-tighter"
                style={{ fontFamily: 'var(--font-nagasaki), Impact, sans-serif' }}
              >
                {initials}
              </span>
            </div>

            {/* Voile de survol noir avec invitation à l'action */}
            <div className="absolute inset-0 bg-[#050505]/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#BEFF39] border-b border-[#BEFF39] pb-1"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                View Case Study &rarr;
              </span>
            </div>
          </div>
        </div>

        {/* Détails du projet en dessous de la carte */}
        <div className="px-2">
          <h3
            className="text-xl font-bold text-[#F5EDD8] leading-tight mb-1 group-hover:text-[#BEFF39] transition-colors duration-200"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {project.title}
          </h3>
          <p
            className="font-mono text-xs text-[#A89880] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            {project.clientName}
          </p>
        </div>
      </Link>
    </div>
  )
}

export default function GallerySection({ projects }: GallerySectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Animation d'apparition de la section avec GSAP ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    if (!section || !header) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Révélation de l'en-tête de section
    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Révélation en cascade (stagger) de la grille des cartes projets
    const cards = section.querySelectorAll('.project-card')
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    return () => {
      // Nettoyage de la ScrollTrigger liée à cette section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [projects])

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative section-padding bg-[#050505]"
    >
      {/* Ligne séparatrice supérieure */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* En-tête de la section */}
        <div
          ref={headerRef}
          className="mb-24 opacity-0"
        >
          <p className="section-eyebrow" style={{ fontFamily: 'var(--font-space-mono)' }}>
            SELECTED WORK
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            The Portfolio
          </h2>
          <div className="divider-lime mt-4" />
        </div>

        {/* Grille asymétrique — 2 colonnes sur tablette/bureau, 1 sur mobile */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-32">
            {projects.map((project, i) => (
              <ProjectCard key={project.id} project={project} index={i} />
            ))}
          </div>
        ) : (
          // État vide — aucun projet publié
          <p
            className="font-mono text-xs text-[#A89880] uppercase tracking-wider text-center py-20"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Projets à venir — revenez bientôt.
          </p>
        )}
      </div>
    </section>
  )
}


