'use client'

// Section héros — Architecture éditoriale centrée avec badges inline et carrousel d'adjectifs animés
// Fusion du composant AnimatedHero (Framer Motion) et du style néo-olympien PRIAM (GSAP + Badges)
import { useEffect, useRef, useState, useMemo } from 'react'
import { gsap } from 'gsap'
import { motion } from 'framer-motion'
import { CaretDoubleDown } from '@phosphor-icons/react'
import MagneticButton from '../ui/MagneticButton'
import { AuroraBackground } from '../ui/AuroraBackground'

export default function HeroSection() {
  // Références pour les animations d'entrée GSAP
  const eyebrowRef = useRef<HTMLParagraphElement>(null)
  const titleRef = useRef<HTMLHeadingElement>(null)
  const subtitleRef = useRef<HTMLParagraphElement>(null)
  const ctasRef = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  // État pour la gestion des erreurs de l'image de profil
  const [imageError, setImageError] = useState(false)

  // État et liste des adjectifs animés pour la rotation du titre Hero
  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ['extraordinaires', 'sur-mesure', 'immersives', 'haute-performance', 'mémorables'],
    []
  )

  // Effet d'animation séquentielle des adjectifs (changement toutes les 2.5 secondes)
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (titleNumber === titles.length - 1) {
        setTitleNumber(0)
      } else {
        setTitleNumber(titleNumber + 1)
      }
    }, 2500)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

  // Effet d'animation d'entrée en cascade avec GSAP
  useEffect(() => {
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

  // Défilement fluide vers la galerie de réalisations
  const scrollToWork = () => {
    document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="home" className="relative min-h-screen overflow-hidden bg-[#050505]">
      <AuroraBackground className="min-h-screen py-20 lg:py-0">
        {/* Grille de fond technique — repères 60px avec lueur lime subtile */}
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

        {/* Contenu centré principal */}
        <div className="section-container relative z-10 w-full flex flex-col items-center text-center pt-24 lg:pt-16">

        {/* Eyebrow de style technique */}
        <p
          ref={eyebrowRef}
          className="font-mono text-xs font-bold uppercase tracking-[0.4em] text-[#BEFF39] mb-8 opacity-0"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          HAÏTI / DESIGNER GRAPHIQUE & DÉVELOPPEUR WEB
        </p>

        {/* Titre éditorial hybride structuré sur 2 lignes spacieuses avec animation Framer Motion épurée */}
        <h1
          ref={titleRef}
          className="font-display font-black text-[#F5EDD8] mb-8 leading-[1.25] tracking-tight opacity-0 max-w-5xl text-center flex flex-col items-center justify-center gap-2"
          style={{
            fontFamily: 'var(--font-geoform), "Century Gothic", sans-serif',
            fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          }}
        >
          {/* Ligne 1 : ARCHITECTE + Badge Photo + NUMÉRIQUES + Badge Glyphe */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2">
            <span>ARCHITECTE</span>

            <span className="inline-flex align-middle">
              <span className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full overflow-hidden border-2 border-[#BEFF39]/40 shadow-[0_0_20px_rgba(190,255,57,0.15)] inline-block">
                {!imageError ? (
                  <img
                    src="/portrait.png"
                    alt="Mike G. Nervil"
                    onError={() => setImageError(true)}
                    className="w-full h-full object-cover grayscale contrast-[1.25] brightness-[1.05]"
                  />
                ) : (
                  <span className="w-full h-full bg-[#BEFF39]/10 flex items-center justify-center text-[#BEFF39] text-xs md:text-sm font-bold">
                    MN
                  </span>
                )}
              </span>
            </span>

            <span
              className="text-transparent"
              style={{ WebkitTextStroke: '1.5px rgba(245, 237, 216, 0.7)' }}
            >
              NUMÉRIQUES
            </span>

            <span className="inline-flex align-middle">
              <span className="relative w-10 h-10 md:w-14 md:h-14 lg:w-16 lg:h-16 rounded-full border-2 border-[#BEFF39]/30 bg-[#BEFF39]/5 inline-flex items-center justify-center shadow-[0_0_20px_rgba(190,255,57,0.1)]">
                <svg
                  viewBox="0 0 40 40"
                  className="w-5 h-5 md:w-7 md:h-7 lg:w-8 lg:h-8 text-[#BEFF39] animate-[spin_8s_linear_infinite]"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M20 4 L36 20 L20 36 L4 20 Z" />
                  <line x1="20" y1="4" x2="20" y2="36" />
                  <line x1="4" y1="20" x2="36" y2="20" />
                  <circle cx="20" cy="20" r="8" />
                </svg>
              </span>
            </span>
          </div>

          {/* Ligne 2 : D'EXPÉRIENCES + Adjectif animé (sans glow néon, conteneur élargi) */}
          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 mt-1">
            <span>D&apos;EXPÉRIENCES</span>
            <span className="relative inline-flex justify-center items-center text-center text-[#BEFF39] h-[1.3em] min-w-[320px] sm:min-w-[420px] md:min-w-[550px] px-4 overflow-visible">
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute font-extrabold uppercase tracking-tight text-[#BEFF39] whitespace-nowrap"
                  initial={{ opacity: 0, y: '-80%' }}
                  transition={{ type: 'spring', stiffness: 70, damping: 16 }}
                  animate={
                    titleNumber === index
                      ? { y: '0%', opacity: 1 }
                      : { y: titleNumber > index ? '-100%' : '100%', opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </div>
        </h1>

        {/* Paragraphe de description en Montserrat avec copywriting stratégique */}
        <p
          ref={subtitleRef}
          className="font-sans text-sm md:text-base text-[#A89880] leading-relaxed max-w-2xl mb-10 opacity-0"
          style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
        >
          Mike G. Nervil (Priam) est un designer graphique &amp; développeur web basé en Haïti.
          J&apos;architecture des identités visuelles stratégiques, des plateformes web sur-mesure et des expériences numériques haute performance qui fusionnent créativité, rigueur et impact.
        </p>

        {/* Bouton CTA réactif magnétique */}
        <div ref={ctasRef} className="opacity-0">
          <MagneticButton>
            <button
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="font-mono text-xs font-bold uppercase tracking-[0.3em] bg-[#BEFF39] text-[#050505] px-10 py-4.5 rounded-full hover:bg-[#D4FF72] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(190,255,57,0.35)] active:scale-98 cursor-pointer"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              Lancer un projet
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
          Découvrir
        </span>
        <div className="text-[#BEFF39] animate-bounce">
          <CaretDoubleDown size={20} weight="bold" />
        </div>
      </div>
      </AuroraBackground>
    </section>
  )
}
