'use client'

// Section héros — Architecture éditoriale centrée avec badges inline
// Le titre H1 intègre deux badges circulaires directement dans le flux du texte :
// Badge 1 : Photo de profil grayscale dans un cercle
// Badge 2 : Glyphe animé wireframe lime (rotation infinie CSS)
// Animations d'entrée en cascade via GSAP.
import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { CaretDoubleDown } from '@phosphor-icons/react'
import MagneticButton from '../ui/MagneticButton'

export default function HeroSection() {
  // Références pour les animations GSAP
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  // État pour le badge photo en cas d'erreur de chargement
  const [imageError, setImageError] = useState(false)

  useEffect(() => {
    // Animation d'entrée en cascade — chaque élément apparaît successivement
    const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

    tl.fromTo(
      eyebrowRef.current,
      { opacity: 0, y: 20, filter: 'blur(6px)' },
      { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.8, delay: 0.3 }
    )
      .fromTo(
        titleRef.current,
        { opacity: 0, y: 40, skewY: 1 },
        { opacity: 1, y: 0, skewY: 0, duration: 1.0 },
        '-=0.5'
      )
      .fromTo(
        subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        ctasRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8 },
        '-=0.5'
      )
      .fromTo(
        scrollHintRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.8 },
        '-=0.3'
      )

    return () => {
      tl.kill()
    }
  }, [])

  // Défilement fluide vers la section sélectionnée
  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#050505] py-20 lg:py-0"
    >
      {/* Grille de fond technique — motif de repères de précision 2% lime */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(rgba(190, 255, 57, 0.02) 1px, transparent 1px),
            linear-gradient(90deg, rgba(190, 255, 57, 0.02) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }}
      />

      {/* Halo de lueur ambiante central */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(circle 600px at 50% 50%, rgba(190, 255, 57, 0.03) 0%, transparent 80%)',
        }}
      />

      {/* Contenu centré — disposition entièrement axiale */}
      <div className="section-container relative z-10 w-full flex flex-col items-center text-center pt-24 lg:pt-16">

        {/* Eyebrow de style technique */}
        <p
          ref={eyebrowRef}
          className="font-mono text-xs font-bold uppercase tracking-[0.5em] text-[#BEFF39] mb-8 opacity-0"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          EST. MMXXIV / CREATIVE DIRECTOR
        </p>

        {/* Titre éditorial principal avec badges inline
            Structure : ARCHITECTING [BADGE_PHOTO] DIGITAL [BADGE_GLYPH] EXPERIENCES
            Les badges sont des inline-flex dans le flux du texte pour créer un effet éditorial premium */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[#F5EDD8] mb-8 leading-[1.1] tracking-tight opacity-0 max-w-5xl"
          style={{
            fontFamily: 'var(--font-geoform), "Century Gothic", sans-serif',
            fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
          }}
        >
          ARCHITECTING{' '}

          {/* Badge 1 — Photo de profil grayscale dans un cercle bordé lime */}
          <span className="inline-flex align-middle mx-1 md:mx-2">
            <span className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-[#BEFF39]/40 shadow-[0_0_20px_rgba(190,255,57,0.15)] inline-block">
              {!imageError ? (
                <img
                  src="/portrait.png"
                  alt="Mike G. Nervil"
                  onError={() => setImageError(true)}
                  className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[1.05]"
                />
              ) : (
                // Cercle de secours avec les initiales si la photo manque
                <span className="w-full h-full bg-[#BEFF39]/10 flex items-center justify-center text-[#BEFF39] text-xs md:text-sm font-bold">
                  MN
                </span>
              )}
            </span>
          </span>

          {/* Ligne "DIGITAL" en contour (stroke) pour le contraste éditorial */}
          <span
            className="text-transparent"
            style={{
              WebkitTextStroke: '1.5px rgba(245, 237, 216, 0.7)',
            }}
          >
            DIGITAL
          </span>{' '}

          {/* Badge 2 — Glyphe wireframe lime avec rotation infinie */}
          <span className="inline-flex align-middle mx-1 md:mx-2">
            <span className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-[#BEFF39]/30 bg-[#BEFF39]/5 inline-flex items-center justify-center shadow-[0_0_20px_rgba(190,255,57,0.1)]">
              {/* SVG wireframe polyèdre rotatif */}
              <svg
                viewBox="0 0 40 40"
                className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#BEFF39] animate-[spin_8s_linear_infinite]"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                {/* Losange central */}
                <path d="M20 4 L36 20 L20 36 L4 20 Z" />
                {/* Lignes internes croisées */}
                <line x1="20" y1="4" x2="20" y2="36" />
                <line x1="4" y1="20" x2="36" y2="20" />
                {/* Cercle intérieur */}
                <circle cx="20" cy="20" r="8" />
              </svg>
            </span>
          </span>

          EXPERIENCES
        </h1>

        {/* Paragraphe de description en Montserrat */}
        <p
          ref={subtitleRef}
          className="font-sans text-sm md:text-base text-[#A89880] leading-relaxed max-w-xl mb-10 opacity-0"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Mike G. Nervil (Priam) est un directeur de création et architecte d&apos;expérience.
          Conception haut de gamme et ingénierie interactive pour les entreprises qui refusent de se fondre dans la masse.
        </p>

        {/* Bouton CTA réactif magnétique */}
        <div ref={ctasRef} className="opacity-0">
          <MagneticButton>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-mono text-xs font-bold uppercase tracking-[0.3em] bg-[#BEFF39] text-[#050505] px-10 py-4.5 rounded-full hover:bg-[#D4FF72] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(190,255,57,0.35)] active:scale-98 cursor-pointer"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              Start a Project
            </button>
          </MagneticButton>
        </div>
      </div>

      {/* Double indicateur de défilement vers le bas */}
      <div
        ref={scrollHintRef}
        role="button"
        tabIndex={0}
        aria-label="Défiler vers la galerie"
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 cursor-pointer opacity-0 z-30"
        onClick={scrollToWork}
        onKeyDown={(e) => e.key === 'Enter' && scrollToWork()}
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#A89880]/60">
          Scroll
        </span>
        <div className="text-[#BEFF39] animate-bounce">
          <CaretDoubleDown size={20} weight="bold" />
        </div>
      </div>
    </section>
  )
}
