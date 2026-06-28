'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Section Showcase Bento — grille éditoriale unifiée combinant projets,
// statistiques et témoignages en une seule section premium à layout asymétrique.
// Intègre le déclencheur de prévisualisation en direct (LivePreviewModal) et
// les détails enrichis de l'étude de cas (Problème, Solution, ROI).
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { Star, Eye, Globe } from '@phosphor-icons/react'
import { ParthenonIcon, LaurelWreathIcon, OlympusLightningIcon } from '@/components/ui/GreekIcons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import LivePreviewModal from '@/components/LivePreviewModal'

// Enregistrement SSR-safe du plugin ScrollTrigger
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// ─── Types exportés ──────────────────────────────────────────────────────────

/** Interface mappée sur le modèle Prisma Project et ses extensions d'études de cas */
export type Project = {
  id: string
  slug: string
  title: string
  clientName: string
  type: string
  coverImage?: string | null
  createdAt: Date
  liveUrl?: string | null
  previewType?: 'iframe' | 'image' | 'video' | string | null
  problem?: string | null
  approach?: string | null
  solution?: string | null
  roi?: string | null
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

// ─── Données statistiques réelles du Boss (PRIAM) ────────────────────────────────────

const STATS = [
  { value: '2 Ans', label: "Années d'Expérience", description: 'Expertise combinée en design graphique & développement web' },
  { value: '+30', label: 'Projets Livrés', description: 'Plateformes sur-mesure, identités de marque & vitrines' },
  { value: '85%', label: 'Satisfaction Client', description: 'Mesurée par le réengagement et les recommandations directes' },
  { value: '100%', label: "Fidélité Artistique", description: 'Respect absolu de la direction visuelle et de l\'expérience UI/UX' },
]

// ─── Sous-composant : Carte projet ──────────────────────────────────────────

function ProjectCard({
  project,
  className = '',
  onOpenPreview,
}: {
  project: Project
  className?: string
  onOpenPreview?: (project: Project, e: React.MouseEvent) => void
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
        <div className="h-full overflow-hidden rounded-2xl relative bg-[#0A0A0A] border border-white/10 transition-all duration-500 group-hover:-translate-y-2 group-hover:scale-[1.01] group-hover:border-[#BEFF39]/40 group-hover:shadow-[0_20px_50px_rgba(190,255,57,0.15)] active:scale-[0.98] cursor-pointer flex flex-col justify-between">
          {/* Motifs de fond et Couverture Live interactive */}
          {project.liveUrl ? (
            <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-40 group-hover:opacity-75 transition-opacity duration-700 z-0">
              <iframe
                src={project.liveUrl}
                title={`Aperçu live de ${project.title}`}
                className="w-[1200px] h-[800px] origin-top-left scale-[0.35] pointer-events-none border-0 select-none opacity-80"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent pointer-events-none" />
            </div>
          ) : (
            <div className="absolute inset-0 opacity-20 pointer-events-none bg-[radial-gradient(#BEFF39_1px,transparent_1px)] [background-size:16px_16px]" />
          )}

          {/* Conteneur principal de la carte */}
          <div className="w-full h-full min-h-[320px] relative flex flex-col justify-between p-6 z-10">
            {/* Haut de carte : Badge de catégorie haute couture + Bouton DÉMO LIVE Réactif Lumineux */}
            <div className="flex items-center justify-between z-20 relative gap-2">
              <span className="inline-flex items-center gap-1.5 bg-[#050505]/90 border border-[#BEFF39]/40 text-[#BEFF39] px-3.5 py-1.5 rounded-full font-mono text-[11px] font-bold uppercase tracking-widest backdrop-blur-md shadow-lg">
                <span className="w-2 h-2 rounded-full bg-[#BEFF39] animate-pulse shadow-[0_0_8px_#BEFF39]" />
                {project.type}
              </span>

              {/* Bouton DÉMO LIVE ultra-visible et lumineux si liveUrl existe */}
              {project.liveUrl && onOpenPreview && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onOpenPreview(project, e)
                  }}
                  className="flex items-center gap-1.5 bg-[#BEFF39] hover:bg-[#D4FF72] text-[#050505] border border-[#BEFF39] px-4 py-1.5 rounded-full text-[11px] font-mono font-extrabold uppercase tracking-wider transition-all duration-300 shadow-[0_0_20px_rgba(190,255,57,0.5)] hover:scale-105 cursor-pointer z-30 group/btn"
                  title="Ouvrir la démo live interactive"
                >
                  <Globe size={14} weight="bold" className="animate-spin-slow group-hover/btn:scale-110" />
                  <span>⚡ DÉMO LIVE</span>
                </button>
              )}
            </div>

            {/* Initiales géantes du client au centre avec effet filigrane néo-olympien */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <span
                ref={initialsRef}
                className="font-nagasaki text-8xl lg:text-9xl font-extrabold text-[#BEFF39]/[0.08] select-none tracking-tighter transition-all duration-500 group-hover:text-[#BEFF39]/[0.16]"
                style={{ fontFamily: "'Nagasaki', 'nagasaki', var(--font-nagasaki), sans-serif" }}
              >
                {initials}
              </span>
            </div>

            {/* Voile de survol sombre avec CTA et résumé d'étude de cas */}
            <div className="absolute inset-0 bg-[#050505]/94 flex flex-col items-center justify-center p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 space-y-3 text-center backdrop-blur-md">
              <span
                className="font-mono text-[11px] font-bold uppercase tracking-[0.2em] text-[#BEFF39] border-b border-[#BEFF39]/50 pb-1"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Consulter l&apos;Étude de Cas &rarr;
              </span>

              {project.liveUrl && onOpenPreview && (
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    onOpenPreview(project, e)
                  }}
                  className="flex items-center gap-2 bg-[#BEFF39] text-[#050505] hover:bg-[#D4FF72] px-6 py-3 rounded-full text-xs font-mono font-extrabold uppercase tracking-wider transition-all duration-300 shadow-[0_0_30px_rgba(190,255,57,0.6)] cursor-pointer mt-2 hover:scale-105"
                >
                  <Globe size={18} weight="bold" />
                  <span>⚡ OUVRIR LA DÉMO LIVE INTERACTIVE</span>
                </button>
              )}

              {(project.problem || project.roi) && (
                <div className="max-w-xs space-y-1.5 text-xs text-[#F5EDD8]/80 font-sans line-clamp-3 mt-1">
                  {project.roi && (
                    <span className="inline-block bg-[#BEFF39]/20 text-[#BEFF39] font-mono text-[10px] px-2.5 py-0.5 rounded-md border border-[#BEFF39]/40 mb-1">
                      ROI: {project.roi}
                    </span>
                  )}
                  {project.problem && <p className="italic text-[11px]">"{project.problem}"</p>}
                </div>
              )}
            </div>

            {/* Informations du projet — coin inférieur avec vignette de contraste */}
            <div className="z-10 mt-auto pt-8 relative">
              <h3
                className="text-xl font-bold text-[#F5EDD8] leading-tight mb-1.5 group-hover:text-[#BEFF39] transition-colors duration-200"
                style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
              >
                {project.title}
              </h3>
              <div className="flex items-center justify-between gap-2">
                <p
                  className="font-mono text-[11px] text-[#A89880] uppercase tracking-wider font-semibold"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  {project.clientName}
                </p>
                {project.roi && (
                  <span className="font-mono text-[10px] text-[#BEFF39] font-bold tracking-wide bg-[#BEFF39]/10 px-2.5 py-1 rounded-lg border border-[#BEFF39]/30 backdrop-blur-sm shadow-inner shrink-0">
                    {project.roi}
                  </span>
                )}
              </div>
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
    <div className="bento-cell glass-card glass-card-interactive p-5 active:scale-[0.98] cursor-pointer">
      <p
        className="text-3xl lg:text-4xl font-extrabold text-[#BEFF39] mb-2 tracking-tighter"
        style={{ fontFamily: 'var(--font-geoform), var(--font-montserrat), sans-serif' }}
      >
        {stat.value}
      </p>
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A89880] mb-1"
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        {stat.label}
      </p>
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
    <div className="bento-cell premium-glass glass-card-interactive p-6 rounded-2xl relative overflow-hidden group active:scale-[0.98] cursor-pointer">
      <span
        className="absolute -top-4 -right-1 text-[10rem] font-bold text-[#BEFF39]/5 select-none pointer-events-none transition-colors duration-300 group-hover:text-[#BEFF39]/10 leading-none"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        &ldquo;
      </span>
      <div className="flex gap-1 mb-5 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={14} weight="fill" color="#BEFF39" />
        ))}
      </div>
      <blockquote
        className="italic text-[#F5EDD8] text-sm leading-relaxed mb-6 relative z-10"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>
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

  // Gestion de l'état de la fenêtre modale de prévisualisation live
  const [previewProject, setPreviewProject] = useState<Project | null>(null)
  const [isPreviewOpen, setIsPreviewOpen] = useState<boolean>(false)

  const handleOpenPreview = (project: Project, e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setPreviewProject(project)
    setIsPreviewOpen(true)
  }

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

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

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

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [projects, testimonials])

  const isEmpty = projects.length === 0 && testimonials.length === 0

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative section-padding bg-[#050505]"
    >
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* ── En-tête de section ─────────────────────────────────────────── */}
        <div ref={headerRef} className="mb-24 opacity-0">
          <p
            className="section-eyebrow flex items-center gap-2"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            <ParthenonIcon size={18} glow={true} />
            VITRINE
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
          >
            Nos Réalisations
          </h2>
          <div className="divider-lime mt-4" />
        </div>

        {/* ── Grille Bento principale ────────────────────────────────────── */}
        {isEmpty ? (
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
              {project1 ? (
                <ProjectCard
                  project={project1}
                  className="lg:col-span-2"
                  onOpenPreview={handleOpenPreview}
                />
              ) : (
                <div className="bento-cell lg:col-span-2 glass-card rounded-2xl min-h-[260px] flex items-center justify-center">
                  <p
                    className="font-mono text-xs text-[#A89880]/60 uppercase tracking-wider"
                    style={{ fontFamily: 'var(--font-space-mono)' }}
                  >
                    Projet à venir
                  </p>
                </div>
              )}

              <div id="about" className="lg:col-span-2 flex flex-col justify-between scroll-mt-28">
                <div className="mb-4 flex items-center justify-between border-b border-white/5 pb-3">
                  <div>
                    <p
                      className="font-mono text-[10px] font-bold uppercase tracking-widest text-[#BEFF39] flex items-center gap-1.5"
                      style={{ fontFamily: 'var(--font-space-mono)' }}
                    >
                      <LaurelWreathIcon size={16} />
                      À PROPOS & IMPACT
                    </p>
                    <h3
                      className="text-lg font-bold text-[#F5EDD8] tracking-tight"
                      style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
                    >
                      Indicateurs Clés d'Impact
                    </h3>
                  </div>
                  <div className="flex items-center gap-2">
                    <OlympusLightningIcon size={20} glow={true} className="animate-pulse" />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {STATS.map((stat) => (
                    <StatCell key={stat.label} stat={stat} />
                  ))}
                </div>
              </div>
            </div>

            {/* ── Rangée 2 : Témoignages & Projets secondaires ── */}
            {(testimonial1 || project2 || testimonial2) && (
              <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
                {project2 ? (
                  <>
                    {testimonial1 && (
                      <div className="lg:col-span-1">
                        <TestimonialCell testimonial={testimonial1} />
                      </div>
                    )}
                    <ProjectCard
                      project={project2}
                      className="lg:col-span-2"
                      onOpenPreview={handleOpenPreview}
                    />
                    {testimonial2 && (
                      <div className="lg:col-span-1">
                        <TestimonialCell testimonial={testimonial2} />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {testimonial1 && (
                      <div className={testimonial2 ? "lg:col-span-2" : "lg:col-span-4"}>
                        <TestimonialCell testimonial={testimonial1} />
                      </div>
                    )}
                    {testimonial2 && (
                      <div className={testimonial1 ? "lg:col-span-2" : "lg:col-span-4"}>
                        <TestimonialCell testimonial={testimonial2} />
                      </div>
                    )}
                  </>
                )}
              </div>
            )}

            {/* ── Rangée 3+ : Contenu additionnel ── */}
            {(remainingProjects.length > 0 || remainingTestimonials.length > 0) && (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {remainingProjects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className="md:col-span-2"
                    onOpenPreview={handleOpenPreview}
                  />
                ))}

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

      {/* ── Fenêtre modale de prévisualisation en direct ────────────────────── */}
      <LivePreviewModal
        isOpen={isPreviewOpen}
        onClose={() => setIsPreviewOpen(false)}
        project={previewProject}
      />
    </section>
  )
}
