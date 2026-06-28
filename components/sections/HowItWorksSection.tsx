'use client'

// Section Processus — présentation du workflow en 3 étapes avec flèches de liaison et GSAP ScrollTrigger
import { useEffect, useRef } from 'react'
import { ParthenonIcon, SpartanHelmetIcon, HermesCaduceusIcon } from '@/components/ui/GreekIcons'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Définition des 3 étapes du processus de collaboration avec icônes grecques natives
const STEPS = [
  {
    number: '01',
    title: 'Scope & Align',
    description:
      'We start with a deep-dive discovery session. I map your brand, audience, and goals — then define the scope, timeline, and success metrics.',
    icon: ParthenonIcon,
  },
  {
    number: '02',
    title: 'Design & Iterate',
    description:
      'Agile visual creation with asynchronous reviews. High-fidelity mockups, motion prototypes, and rapid iteration until every pixel resonates.',
    icon: SpartanHelmetIcon,
  },
  {
    number: '03',
    title: 'Build & Deliver',
    description:
      'Production-grade Next.js development, SEO optimization, performance tuning, and a seamless handoff. Your digital experience — launched.',
    icon: HermesCaduceusIcon,
  },
]

// Flèche horizontale en tirets SVG — visible uniquement sur desktop entre les cartes
function ConnectorArrow() {
  return (
    <div className="hidden md:flex items-center justify-center absolute top-1/2 -translate-y-1/2 -right-[calc(theme(gap.6)/2+12px)] z-10 w-6">
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="text-[#BEFF39]/40"
      >
        {/* Ligne horizontale en tirets */}
        <line
          x1="0"
          y1="12"
          x2="18"
          y2="12"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeDasharray="3 3"
        />
        {/* Pointe de flèche */}
        <polyline
          points="14,8 20,12 14,16"
          stroke="currentColor"
          strokeWidth="1.5"
          fill="none"
          strokeLinejoin="round"
          strokeLinecap="round"
        />
      </svg>
    </div>
  )
}

// Composant carte d'étape individuelle
function ProcessCard({
  step,
  index,
  isLast,
}: {
  step: (typeof STEPS)[0]
  index: number
  isLast: boolean
}) {
  const IconComponent = step.icon

  return (
    <div className="relative">
      <div className="process-card premium-glass p-8 md:p-10 rounded-2xl relative overflow-hidden group opacity-0 hover:shadow-[0_0_0_1px_rgba(190,255,57,0.25)]">
        {/* Numéro d'étape en GeoForm — gros, lime, basse opacité, positionné en haut à droite */}
        <span
          className="absolute top-4 right-6 text-6xl font-black text-[#BEFF39] opacity-20 select-none pointer-events-none leading-none"
          style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
        >
          {step.number}
        </span>

        {/* Conteneur d'icône avec rotation au survol et lueur lime */}
        <div className="w-14 h-14 bg-white/5 text-[#A89880] group-hover:text-[#BEFF39] group-hover:bg-[#BEFF39]/10 flex items-center justify-center rounded-xl mb-8 transition-all duration-300 transform group-hover:rotate-[10deg]">
          <IconComponent size={28} glow={true} />
        </div>

        {/* Titre de l'étape en GeoForm */}
        <h3
          className="text-xl font-bold text-[#F5EDD8] mb-4"
          style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
        >
          {step.title}
        </h3>

        {/* Description de l'étape */}
        <p
          className="font-sans text-sm text-[#A89880] leading-relaxed max-w-xs"
          style={{ fontFamily: 'var(--font-geist), sans-serif' }}
        >
          {step.description}
        </p>
      </div>

      {/* Flèche de connexion entre les cartes — sauf après la dernière */}
      {!isLast && <ConnectorArrow />}
    </div>
  )
}

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // Animation d'apparition au défilement avec GSAP ScrollTrigger
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

    // Révélation en cascade (stagger) des 3 cartes de processus
    const cards = section.querySelectorAll('.process-card')
    if (cards.length > 0) {
      tl.fromTo(
        cards,
        { opacity: 0, y: 40 },
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
      // Nettoyage des ScrollTriggers associées à cette section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="process"
      className="relative section-padding bg-[#050505]"
    >
      {/* Séparateur supérieur */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* En-tête de section */}
        <div ref={headerRef} className="mb-20 opacity-0">
          <p
            className="section-eyebrow"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            PROCESS
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            How It Works
          </h2>
          <div className="divider-lime mt-4 mb-6" />
          <p
            className="font-sans text-base text-[#A89880] max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-geist), sans-serif' }}
          >
            Un processus structuré, transparent et itératif — de la vision initiale au lancement final.
          </p>
        </div>

        {/* Grille des étapes (3 colonnes desktop, empilé mobile) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {STEPS.map((step, i) => (
            <ProcessCard
              key={step.number}
              step={step}
              index={i}
              isLast={i === STEPS.length - 1}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
