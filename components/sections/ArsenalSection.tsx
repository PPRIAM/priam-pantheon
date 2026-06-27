'use client'

// Section Arsenal — description des compétences avec cartes premium-glass & GSAP ScrollTrigger
import { useEffect, useRef } from 'react'
import { PaintBrush, Compass, Rocket } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Définition des 3 disciplines clés
const CAPABILITIES = [
  {
    id: 'interface-design',
    title: 'Interface Design',
    description: 'Systèmes de design centrés sur l\'utilisateur, conçus pour la conversion et une fidélité visuelle absolue.',
    icon: PaintBrush,
  },
  {
    id: 'creative-strategy',
    title: 'Creative Strategy',
    description: 'Architecture de marque et positionnement stratégique pour imposer une valeur premium sur le marché.',
    icon: Compass,
  },
  {
    id: 'technical-architecture',
    title: 'Technical Architecture',
    description: 'Plateformes expérientielles Next.js performantes, optimisées pour le SEO et une vitesse d\'exécution maximale.',
    icon: Rocket,
  },
]

// Composant carte individuelle réutilisable (Refactorisé pour animation GSAP)
function ArsenalCard({ capability, index }: { capability: typeof CAPABILITIES[0]; index: number }) {
  const Icon = capability.icon

  return (
    <div
      className="capability-card premium-glass p-8 md:p-10 rounded-2xl relative overflow-hidden group opacity-0 hover:shadow-[0_0_0_1px_rgba(190,255,57,0.25)]"
    >
      {/* Conteneur d'icône avec rotation 10deg au survol du groupe */}
      <div
        className="w-14 h-14 bg-white/5 text-[#A89880] group-hover:text-[#BEFF39] group-hover:bg-[#BEFF39]/10 flex items-center justify-center rounded-xl mb-8 transition-all duration-300 transform group-hover:rotate-[10deg]"
      >
        <Icon size={28} weight="light" />
      </div>

      {/* Titre de la compétence */}
      <h3
        className="text-xl font-bold text-[#F5EDD8] mb-4"
        style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
      >
        {capability.title}
      </h3>

      {/* Description */}
      <p
        className="font-sans text-sm text-[#A89880] leading-relaxed max-w-xs"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
      >
        {capability.description}
      </p>

      {/* Index décoratif en arrière-plan */}
      <span
        className="absolute bottom-6 right-8 font-mono text-xs text-white/5 select-none pointer-events-none"
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        0{index + 1}
      </span>
    </div>
  )
}

export default function ArsenalSection() {
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

    // Révélation en cascade (stagger) des 3 cartes disciplines
    const cards = section.querySelectorAll('.capability-card')
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
      // Nettoyage de la ScrollTrigger liée à cette section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="arsenal"
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
            CAPABILITIES
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            The Arsenal
          </h2>
          <div className="divider-lime mt-4 mb-6" />
          <p
            className="font-sans text-base text-[#A89880] max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-geist), sans-serif' }}
          >
            Trois piliers fondamentaux. Une vision unifiée pour concevoir des produits qui dominent le marché.
          </p>
        </div>

        {/* Grille des disciplines (3 colonnes de cartes) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {CAPABILITIES.map((cap, i) => (
            <ArsenalCard key={cap.id} capability={cap} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
