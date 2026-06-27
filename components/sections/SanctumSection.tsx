'use client'

// Section Sanctum — citation d'alchimie du design et statistiques de réussite avec GSAP ScrollTrigger & Parallaxe
import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Métriques clés du portfolio
const STATS = [
  { value: '8+', label: 'Years Experience', description: 'Spanning brand, digital & motion' },
  { value: '40+', label: 'Projects Delivered', description: 'Across 12 countries and 6 industries' },
  { value: '98%', label: 'Client Satisfaction', description: 'Measured by repeat business & referrals' },
  { value: '$12M+', label: 'Client Revenue Generated', description: 'Attributed to design-led growth' },
]

// Composant carte statistique (Refactorisé pour animation GSAP fluide)
function StatCard({ stat }: { stat: typeof STATS[0] }) {
  return (
    <div
      className="stat-card glass-card p-6 md:p-8 opacity-0 hover:border-[#BEFF39]/20 hover:shadow-[0_0_30px_rgba(190,255,57,0.05)]"
    >
      {/* Valeur principale en Nagasaki (Display) et couleur Lime */}
      <p
        className="text-4xl md:text-5xl font-black text-[#BEFF39] mb-2 tracking-tighter"
        style={{ fontFamily: 'var(--font-nagasaki), Impact, sans-serif' }}
      >
        {stat.value}
      </p>

      {/* Étiquette en Space Mono mutée */}
      <p
        className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#A89880] mb-2"
        style={{ fontFamily: 'var(--font-space-mono)' }}
      >
        {stat.label}
      </p>

      {/* Description */}
      <p
        className="font-sans text-xs text-[#A89880]/70 leading-relaxed"
        style={{ fontFamily: 'var(--font-geist), sans-serif' }}
      >
        {stat.description}
      </p>
    </div>
  )
}

export default function SanctumSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const quoteRef = useRef<HTMLDivElement>(null)
  const statsGridRef = useRef<HTMLDivElement>(null)
  const alchemyTextRef = useRef<HTMLSpanElement>(null)

  // Effet de dérive (drift/parallaxe) sur le texte ALCHEMY d'arrière-plan au mouvement de la souris
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const alchemy = alchemyTextRef.current
      if (!alchemy) return

      // Ne pas activer sur les écrans tactiles
      if (window.matchMedia('(hover: none)').matches) return

      const xOffset = (e.clientX - window.innerWidth / 2) * 0.03
      const yOffset = (e.clientY - window.innerHeight / 2) * 0.03

      gsap.to(alchemy, {
        x: xOffset,
        y: yOffset,
        duration: 1,
        ease: 'power2.out',
      })
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  // Animation au défilement avec GSAP ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current
    const quote = quoteRef.current
    const grid = statsGridRef.current
    if (!section || !quote || !grid) return

    // Révélation de la citation
    const tlQuote = gsap.timeline({
      scrollTrigger: {
        trigger: quote,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    tlQuote.fromTo(
      quote,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Révélation en cascade de la grille des statistiques
    const cards = grid.querySelectorAll('.stat-card')
    const tlGrid = gsap.timeline({
      scrollTrigger: {
        trigger: grid,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tlGrid.fromTo(
      cards,
      { opacity: 0, y: 30, scale: 0.98 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      }
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section || trigger.trigger === quote || trigger.trigger === grid) {
          trigger.kill()
        }
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative section-padding bg-[#050505] overflow-hidden"
    >
      {/* Séparateur supérieur */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      {/* Texte géant incliné ALCHEMY en arrière-plan (30vw, opacité 3%, rotation -12deg) */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none z-0 overflow-hidden">
        <span
          ref={alchemyTextRef}
          className="text-[30vw] font-black tracking-widest text-[#BEFF39] opacity-[0.03] rotate-[-12deg] uppercase leading-none"
          style={{ fontFamily: 'var(--font-nagasaki), Impact, sans-serif' }}
        >
          ALCHEMY
        </span>
      </div>

      <div className="section-container relative z-10">
        {/* Quote centrale avec effet de révélation */}
        <div
          ref={quoteRef}
          className="max-w-4xl mx-auto text-center mb-24 opacity-0"
        >
          <p
            className="section-eyebrow mb-6 justify-center flex"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            THE ARCHITECT
          </p>
          <blockquote
            className="font-display italic text-[#F5EDD8] text-2xl md:text-5xl leading-snug"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            &ldquo;Design is the modern alchemy; turning base code into golden experiences.&rdquo;
          </blockquote>
          <div className="divider-lime mx-auto mt-8" />
        </div>

        {/* Grille des statistiques alignée proprement en dessous */}
        <div
          ref={statsGridRef}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} />
          ))}
        </div>
      </div>
    </section>
  )
}

