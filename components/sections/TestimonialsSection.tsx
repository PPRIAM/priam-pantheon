'use client'

// Section Témoignages — avis clients haut de gamme avec cartes premium-glass
// Animation de révélation via GSAP ScrollTrigger (aligné sur GallerySection)
import { useEffect, useRef } from 'react'
import { Star } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Enregistrement conditionnel du plugin (SSR-safe)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Structure d'un témoignage — mappée sur le modèle Prisma Testimonial
type Testimonial = {
  id: string
  clientName: string
  role: string
  company: string
  quote: string
  rating: number
}

// Props de la section — injectées par le Server Component parent
type TestimonialsSectionProps = {
  testimonials: Testimonial[]
}

// Carte de témoignage individuelle (pas de ref ni useEffect — la révélation est gérée par le parent)
function TestimonialCard({ testimonial, index }: { testimonial: Testimonial; index: number }) {
  return (
    <div
      className={`testimonial-card premium-glass p-8 rounded-2xl relative overflow-hidden group hover:border-[#BEFF39]/20 ${
        index === 2 ? 'md:col-span-2 md:max-w-3xl md:mx-auto w-full' : ''
      }`}
    >
      {/* Guillemet géant en arrière-plan (vert désaturé text-lime/5) */}
      <span
        className="absolute -top-6 -right-2 font-display text-[12rem] font-bold text-[#BEFF39]/5 select-none pointer-events-none transition-colors duration-300 group-hover:text-[#BEFF39]/12 leading-none"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        &ldquo;
      </span>

      {/* Étoiles de notation — dynamiques selon rating en DB */}
      <div className="flex gap-1 mb-6 relative z-10">
        {Array.from({ length: testimonial.rating }).map((_, i) => (
          <Star key={i} size={16} weight="fill" color="#BEFF39" />
        ))}
      </div>

      {/* Citation textuelle */}
      <blockquote
        className="font-display italic text-[#F5EDD8] text-lg leading-relaxed mb-8 relative z-10"
        style={{
          fontFamily: 'var(--font-playfair), Georgia, serif',
          fontSize: '1.1rem',
        }}
      >
        &ldquo;{testimonial.quote}&rdquo;
      </blockquote>

      {/* Auteur du témoignage avec ligne verticale Lime */}
      <div className="flex items-center gap-4 relative z-10">
        <div className="w-px h-10 bg-[#BEFF39]" />
        <div>
          {/* Nom de l'auteur en Space Mono gras et Lime */}
          <p
            className="font-mono text-xs font-bold text-[#BEFF39] uppercase tracking-wider mb-1"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            {testimonial.clientName}
          </p>

          {/* Rôle et entreprise */}
          <p
            className="font-mono text-[10px] text-[#A89880] uppercase tracking-wider"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            {testimonial.role} &middot; {testimonial.company}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Timeline GSAP unique — révèle l'en-tête puis les cartes avec stagger
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

    // Animation de l'en-tête
    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Animation des cartes avec décalage progressif
    const cards = section.querySelectorAll('.testimonial-card')
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' },
        '-=0.4'
      )
    }

    // Nettoyage des ScrollTriggers associés à cette section
    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [testimonials])

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      className="relative section-padding bg-[#050505]"
    >
      {/* Séparateur supérieur */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* En-tête de section */}
        <div
          ref={headerRef}
          className="mb-20 opacity-0"
        >
          <p className="section-eyebrow" style={{ fontFamily: 'var(--font-space-mono)' }}>
            CLIENT LEGENDS
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            What They Say
          </h2>
          <div className="divider-lime mt-4" />
        </div>

        {/* Grille de témoignages à 2 colonnes avec espace de 10 */}
        {testimonials.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {testimonials.map((t, i) => (
              <TestimonialCard key={t.id} testimonial={t} index={i} />
            ))}
          </div>
        ) : (
          // État vide — aucun témoignage en base
          <p
            className="font-mono text-xs text-[#A89880] uppercase tracking-wider text-center py-20"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            Témoignages à venir.
          </p>
        )}
      </div>
    </section>
  )
}
