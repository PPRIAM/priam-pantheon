'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Section Showcase Bento — grille éditoriale unifiée combinant projets,
// statistiques et témoignages en une seule section premium à layout asymétrique.
// Remplace les anciennes GallerySection, SanctumSection et TestimonialsSection.
// Animation de révélation au scroll via GSAP ScrollTrigger uniquement (pas d'IO).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Star } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrement SSR-safe du plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Types exportés ──────────────────────────────────────────────────────────

/** Interface mappée sur le modèle Prisma Project — ré-exportée pour usage externe */
export type Project = {
  id: string
  slug: string
  title: string
  clientName: string
  type: string
  coverImage?: string | null
  createdAt: Date
}

/** Structure d'un témoignage client — mappée sur le modèle Prisma Testimonial */
type Testimonial = {
  id: string
  clientName: string
  role: string
  company: string
  quote: string
  rating: number
}

/** Props de la section — données injectées par le Server Component parent */
type ShowcaseBentoSectionProps = {
  projects: Project[]
  testimonials: Testimonial[]
}

// ─── Données statistiques (codées en dur) ────────────────────────────────────

const STATS = [
  { value: '8+', label: 'Years Experience', description: 'Spanning brand, digital & motion' },
  { value: '40+', label: 'Projects Delivered', description: 'Across 12 countries and 6 industries' },
  { value: '98%', label: 'Client Satisfaction', description: 'Measured by repeat business & referrals' },
  { value: '$12M+', label: 'Client Revenue Generated', description: 'Attributed to design-led growth' },
]

// ─── Sous-composant : Carte projet ──────────────────────────────────────────

function ProjectCard({
  project,
  className = '',
}: {
  project: Project
  className?: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const initialsRef = useRef<HTMLSpanElement>(null)

  // Initiales du client (2 lettres max)
  const initials = project.clientName
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)

  // Effet parallaxe sur les initiales au survol de la souris
  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const el = containerRef.current
    const init = initialsRef.current
    if (!el || !init) return

    // Pas de parallaxe sur les écrans tactiles pour éviter les sauts
    if (window.matchMedia('(hover: none)').matches) return

    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2

    gsap.to(init, {
      x: x * 0.15,
      y: y * 0.15,
      scale: 1.15,
      duration: 0.4,
      ease: 'power2.out',
    })
  }

  // Remise à zéro de la parallaxe quand la souris quitte la carte
  const handleMouseLeave = () => {
    const init = initialsRef.current
    if (!init) return

    gsap.to(init, {
      x: 0,
      y: 0,
      scale: 1,
      duration: 0.8,
      ease: 'power3.out',
    })
  }

  return (
    <div ref={containerRef} className={`bento-cell ${className}`}>
      <Link
        href={`/work/${project.slug}`}
        className="block group cursor-pointer h-full"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
      >
        {/* Conteneur visuel — bordure métallique + survol lime glow */}
        <div className="h-full metallic-border overflow-hidden rounded-2xl relative bg-neutral-900/40 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.02] group-hover:shadow-[0_20px_50px_rgba(190,255,57,0.12)]">
          {/* Fond dégradé lime → transparent */}
          <div
            className="w-full h-full min-h-[260px] relative"
            style={{
              background: 'linear-gradient(135deg, var(--lime-glow) 0%, transparent 100%)',
            }}
          >
            {/* Badge de catégorie — coin supérieur gauche */}
            <div className="absolute top-4 left-4 z-10">
              <span className="category-badge text-[10px] tracking-wider px-3 py-1 font-bold">
                {project.type}
              </span>
            </div>

            {/* Initiales géantes du client au centre */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                ref={initialsRef}
                className="text-8xl lg:text-9xl font-extrabold text-[#BEFF39]/10 select-none tracking-tighter"
                style={{ fontFamily: 'var(--font-nagasaki), Impact, sans-serif' }}
              >
                {initials}
              </span>
            </div>

            {/* Voile de survol sombre avec CTA */}
            <div className="absolute inset-0 bg-[#050505]/85 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#BEFF39] border-b border-[#BEFF39] pb-1"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                View Case Study &rarr;
              </span>
            </div>

            {/* Informations du projet — coin inférieur gauche */}
            <div className="absolute bottom-5 left-5 z-10">
              <h3
                className="text-lg font-bold text-[#F5EDD8] leading-tight mb-1 group-hover:text-[#BEFF39] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                {project.title}
              </h3>
              <p
                className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                {project.clientName}
              </p>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}

// ─── Sous-composant : Cellule statistique ───────────────────────────────────

function StatCell({ stat }: { stat: (typeof STATS)[0] }) {
  return (
    <div className="bento-cell glass-card p-5 hover:border-[#BEFF39]/20 hover:shadow-[0_0_30px_rgba(190,255,57,0.05)] transition-all duration-300">
      {/* Valeur en police display Nagasaki — accent lime */}
      <p
        className="text-3xl lg:text-4xl font-black text-[#BEFF39] mb-2 tracking-tighter"
        style={{ fontFamily: 'var(--font-nagasaki), Impact, sans-serif' }}
      >
        {stat.value}
      </p>

      {/* Étiquette en Space Mono — couleur sable désert */}
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A89880] mb-1"
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        {stat.label}
      </p>

      {/* Description en police body — très discrète */}
      <p
        className="text-xs text-[#A89880]/60 leading-relaxed"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
      >
        {stat.description}
      </p>
    </div>
  )
}

// ─── Sous-composant : Cellule témoignage ────────────────────────────────────

function TestimonialCell({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="bento-cell premium-glass p-6 rounded-2xl relative overflow-hidden group hover:border-[#BEFF39]/20 transition-all duration-300">
      {/* Guillemet géant décoratif en arrière-plan */}
      <span
        className="absolute -top-4 -right-1 text-[10rem] font-bold text-[#BEFF39]/5 select-none pointer-events-none transition-colors duration-300 group-hover:text-[#BEFF39]/10 leading-none"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        &ldquo;
      </span>

      {/* Étoiles de notation — remplies dynamiquement */}
      <div className="flex gap-1 mb-5 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} weight="fill" color="#BEFF39" />
        ))}
      </div>

      {/* Citation italique en Playfair */}
      <blockquote
        className="italic text-[#F5EDD8] text-sm leading-relaxed mb-6 relative z-10"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Auteur — barre verticale lime + nom/rôle */}
      <div className="flex items-center gap-3 relative z-10">
        <div className="w-px h-9 bg-[#BEFF39]" />
        <div>
          <p
            className="font-mono text-[10px] font-bold text-[#BEFF39] uppercase tracking-wider mb-0.5"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            {testimonial.clientName}
          </p>
          <p
            className="font-mono text-[9px] text-[#A89880] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            {testimonial.role} &middot; {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

// ─── Composant principal ────────────────────────────────────────────────────

export default function ShowcaseBentoSection({
  projects,
  testimonials,
}: ShowcaseBentoSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Extraction sûre des projets et témoignages pour la grille bento
  const project1 = projects[0] ?? null
  const project2 = projects[1] ?? null
  const remainingProjects = projects.slice(2)
  const testimonial1 = testimonials[0] ?? null
  const testimonial2 = testimonials[1] ?? null
  const remainingTestimonials = testimonials.slice(2)

  // ─── Animation GSAP ScrollTrigger ─────────────────────────────────────────
  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    if (!section || !header) return

    // Timeline principale — déclenchée quand la section entre dans le viewport
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

    // Révélation en cascade de toutes les cellules bento
    const cells = section.querySelectorAll('.bento-cell')
    if (cells.length > 0) {
      tl.fromTo(
        cells,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    // Nettoyage des ScrollTriggers attachés à cette section
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [projects, testimonials])

  // ─── État vide — aucune donnée ────────────────────────────────────────────
  const isEmpty = projects.length === 0 && testimonials.length === 0

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative section-padding bg-[#050505]"
    >
      {/* Séparateur supérieur fin */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* ── En-tête de section ─────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-24 opacity-0">
          <p
            className="section-eyebrow"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            SHOWCASE
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            The Work
          </h2>
          <div className="divider-lime mt-4" />
        </div>

        {/* ── Grille Bento principale ────────────────────────────────────── */}
        {isEmpty ? (
          // État vide gracieux
          <p
            className="font-mono text-xs text-[#A89880] uppercase tracking-wider text-center py-20"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Contenu à venir — revenez bientôt.
          </p>
        ) : (
          <div className="flex flex-col gap-6">
            {/* ── Rangée 1 : Projet vedette (2 cols) + Stats 2×2 (2 cols) ── */}
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
              {/* Projet vedette — occupe 2 colonnes */}
              {project1 ? (
                <ProjectCard
                  project={project1}
                  className="lg:col-span-2"
                />
              ) : (
                // Cellule de remplacement si aucun projet n'est disponible
                <div className="bento-cell lg:col-span-2 glass-card rounded-2xl min-h-[260px] flex items-center justify-center">
                  <p
                    className="font-mono text-xs text-[#A89880]/60 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-space-mono)' }}
                  >
                    Projet à venir
                  </p>
                </div>
              )}

              {/* Mini-grille des statistiques 2×2 — occupe 2 colonnes. Cible id="about" pour le défilement depuis la barre de navigation. */}
              <div id="about" className="lg:col-span-2 grid grid-cols-2 gap-4 scroll-mt-24">
                {STATS.map((stat) => (
                  <StatCell key={stat.label} stat={stat} />
                ))}
              </div>
            </div>

            {/* ── Rangée 2 : Témoignage 1 + Projet 2 (2 cols) + Témoignage 2 ── */}
            {(testimonial1 || project2 || testimonial2) && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {/* Témoignage gauche */}
                {testimonial1 ? (
                  <div className="lg:col-span-1">
                    <TestimonialCell testimonial={testimonial1} />
                  </div>
                ) : (
                  <div className="lg:col-span-1" />
                )}

                {/* Projet central — occupe 2 colonnes */}
                {project2 ? (
                  <ProjectCard
                    project={project2}
                    className="lg:col-span-2"
                  />
                ) : (
                  <div className="lg:col-span-2" />
                )}

                {/* Témoignage droit */}
                {testimonial2 ? (
                  <div className="lg:col-span-1">
                    <TestimonialCell testimonial={testimonial2} />
                  </div>
                ) : (
                  <div className="lg:col-span-1" />
                )}
              </div>
            )}

            {/* ── Rangée 3+ : Contenu additionnel (projets & témoignages restants) ── */}
            {(remainingProjects.length > 0 || remainingTestimonials.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Projets restants — chacun occupe 2 colonnes pour un rythme éditorial */}
                {remainingProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className="md:col-span-2"
                  />
                ))}

                {/* Témoignages restants — occupent 1 colonne chacun */}
                {remainingTestimonials.map((testimonial) => (
                  <div key={testimonial.id} className="lg:col-span-1 md:col-span-1">
                    <TestimonialCell testimonial={testimonial} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
