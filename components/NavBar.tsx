'use client'

// Barre de navigation collante et glassmorphique — PRIAM
import { useState, useEffect, useCallback } from 'react'
import Link from 'next/link'
import Logo from './ui/Logo'
import MagneticButton from './ui/MagneticButton'
import { ParthenonIcon, AthenaShieldIcon, LaurelWreathIcon, OlympusLightningIcon } from './ui/GreekIcons'
import { PaperPlaneTilt } from '@phosphor-icons/react'

// Liens de navigation avec cibles d'ancres
const NAV_LINKS = [
  { label: 'Work', href: '#work', id: 'work' },
  { label: 'Arsenal', href: '#arsenal', id: 'arsenal' },
  { label: 'About', href: '#about', id: 'about' },
  { label: 'Contact', href: '#contact', id: 'contact' },
]

// Mappage des identifiants vers les icônes grecques mythologiques natives pour le mode pilule condensé
const ICON_MAP = {
  work: ParthenonIcon,
  arsenal: AthenaShieldIcon,
  about: LaurelWreathIcon,
  contact: OlympusLightningIcon,
}

export default function NavBar() {
  // États pour le défilement et le menu mobile
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  // Détection du défilement pour activer le flou et condenser la barre
  const handleScroll = useCallback(() => {
    setScrolled(window.scrollY > 50)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    // Initialisation asynchrone pour éviter les rendus en cascade au montage
    const timer = setTimeout(() => handleScroll(), 0)
    return () => {
      window.removeEventListener('scroll', handleScroll)
      clearTimeout(timer)
    }
  }, [handleScroll])

  // Fermer automatiquement le menu mobile si la barre est condensée
  useEffect(() => {
    if (scrolled) {
      setMenuOpen(false)
    }
  }, [scrolled])

  // Détection de la section active à l'écran via IntersectionObserver
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-50% 0px -50% 0px', // Déclenchement au milieu de l'écran
      threshold: 0,
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }, observerOptions)

    NAV_LINKS.forEach((link) => {
      const el = document.getElementById(link.id)
      if (el) observer.observe(el)
    })

    // Ajouter également le héros pour réinitialiser l'état actif
    const heroEl = document.getElementById('home')
    if (heroEl) observer.observe(heroEl)

    return () => observer.disconnect()
  }, [])

  // Défilement fluide vers une section
  const scrollToSection = (href: string) => {
    setMenuOpen(false)
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <nav
        className={`fixed z-50 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-between ${
          scrolled
            ? 'bottom-4 left-1/2 -translate-x-1/2 md:bottom-auto md:top-4 w-[calc(100%-2rem)] max-w-[480px] h-14 rounded-full shadow-lg px-6 py-2'
            : 'top-0 left-0 w-full h-20 rounded-none border-b border-transparent bg-transparent px-6 md:px-12'
        }`}
      >
        {/* Arrière-plan néon rotatif (Angle B) — visible uniquement en mode condensé */}
        <div className={`absolute inset-0 -z-10 rounded-full overflow-hidden pointer-events-none transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
        }`}>
          {/* Effet laser tournant */}
          <div 
            className="absolute w-[200%] h-[300%] left-[-50%] top-[-100%] bg-[conic-gradient(from_0deg,transparent_50%,#BEFF39_80%,#BEFF39_100%)]"
            style={{ 
              animation: 'spin 4s linear infinite',
              willChange: 'transform' 
            }}
          />
          {/* Masque interne créant la bordure de 1.5px et l'effet de verre acrylique */}
          <div className="absolute inset-[1.5px] rounded-full bg-[#050505]/90 backdrop-blur-2xl" />
        </div>
        {/* Logo de gauche incluant l'image PNG physique de PRIAM */}
        <Link
          href="#home"
          onClick={(e) => {
            e.preventDefault()
            scrollToSection('#home')
            setActiveSection('')
          }}
          className="flex items-center gap-2 font-mono text-lg font-bold tracking-widest text-[#F5EDD8] hover:text-[#BEFF39] transition-colors duration-200 group"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          <Logo
            size={scrolled ? 26 : 34}
            className="transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
          />
          <span className={`transition-all origin-left ${
            scrolled 
              ? 'duration-150 delay-0 opacity-0 scale-75 max-w-0 absolute pointer-events-none' 
              : 'duration-300 delay-150 opacity-100 scale-100 max-w-[100px]'
          }`}>
            PRIAM
          </span>
        </Link>

        {/* Liens du centre — Visibles sur grand écran en étendu, sur tous les écrans en condensé (micro-icônes) */}
        <ul className={`flex items-center transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          scrolled
            ? 'gap-6 md:gap-8'
            : 'hidden md:flex gap-10'
        }`}>
          {NAV_LINKS.map((link) => {
            const isActive = activeSection === link.id
            const IconComponent = ICON_MAP[link.id as keyof typeof ICON_MAP]
            return (
              <li key={link.href}>
                <button
                  onClick={() => scrollToSection(link.href)}
                  className={`relative flex items-center justify-center font-sans transition-colors duration-300 cursor-pointer ${
                    isActive ? 'text-[#BEFF39]' : 'text-[#A89880] hover:text-[#F5EDD8]'
                  }`}
                >
                  {/* Libellé texte pour l'état étendu (s'estompe instantanément au défilement) */}
                  <span className={`text-sm tracking-wide font-medium transition-all ${
                    scrolled 
                      ? 'duration-150 delay-0 opacity-0 scale-75 max-w-0 absolute pointer-events-none' 
                      : 'duration-300 delay-150 opacity-100 scale-100 max-w-[100px]'
                  }`}>
                    {link.label}
                  </span>
                  
                  {/* Icône grecque mythologique native pour l'état pilule condensé */}
                  <span className={`transition-all ${
                    scrolled 
                      ? 'duration-300 delay-150 opacity-100 scale-100 max-w-[40px]' 
                      : 'duration-150 delay-0 opacity-0 scale-75 max-w-0 absolute pointer-events-none'
                  }`}>
                    {IconComponent && (
                      <IconComponent
                        size={20}
                        glow={isActive}
                        color={isActive ? '#BEFF39' : '#A89880'}
                        className={`transition-all duration-300 ${
                          isActive 
                            ? 'scale-115 text-[#BEFF39]' 
                            : 'hover:scale-110 hover:text-[#F5EDD8]'
                        }`}
                      />
                    )}
                  </span>
                  
                  {/* Point indicateur sous le lien actif en mode étendu */}
                  {!scrolled && isActive && (
                    <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-1 h-1 bg-[#BEFF39] rounded-full" />
                  )}
                </button>
              </li>
            )
          })}
        </ul>

        {/* CTA droite & Bouton Hamburger pour mobile */}
        <div className="flex items-center gap-4">
          {/* Bouton CTA magnétique réactif (large en étendu, circulaire condensé en défilement) */}
          <MagneticButton>
            <button
              onClick={() => scrollToSection('#contact')}
              className={`inline-flex items-center justify-center bg-[#BEFF39] text-[#050505] font-semibold rounded-full transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] hover:scale-105 active:scale-95 cursor-pointer ${
                scrolled
                  ? 'w-9 h-9 p-0 text-base shadow-[0_0_12px_rgba(190,255,57,0.4)]'
                  : 'hidden md:inline-flex px-6 py-2.5 text-sm h-10'
              }`}
            >
              <span className={`transition-all whitespace-nowrap ${
                scrolled 
                  ? 'duration-150 delay-0 opacity-0 scale-75 absolute pointer-events-none' 
                  : 'duration-300 delay-150 opacity-100 scale-100 max-w-[120px]'
              }`}>
                Let&rsquo;s Talk &rarr;
              </span>
              <span className={`transition-all ${
                scrolled 
                  ? 'duration-300 delay-150 opacity-100 scale-100 max-w-[40px]' 
                  : 'duration-150 delay-0 opacity-0 scale-75 max-w-0 absolute pointer-events-none'
              }`}>
                <PaperPlaneTilt size={16} weight="bold" />
              </span>
            </button>
          </MagneticButton>

          {/* Bouton Hamburger mobile — visible uniquement en mode étendu non défilé */}
          <label
            className={`hamburger flex items-center justify-center w-10 h-10 border border-white/10 rounded-lg text-[#F5EDD8] transition-all duration-350 cursor-pointer ${
              scrolled ? 'opacity-0 scale-75 pointer-events-none absolute md:hidden' : 'md:hidden'
            }`}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
          >
            <input
              type="checkbox"
              checked={menuOpen}
              onChange={() => setMenuOpen(!menuOpen)}
            />
            <svg viewBox="0 0 32 32">
              <path
                className="line line-top-bottom"
                d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
              />
              <path className="line" d="M7 16 27 16" />
            </svg>
          </label>
        </div>

        {/* Menu mobile déroulant — uniquement accessible en mode étendu non défilé */}
        <div
          className={`absolute top-20 left-0 right-0 bg-[#050505]/95 backdrop-blur-2xl border-b border-white/5 transition-all duration-350 ease-in-out md:hidden overflow-hidden ${
            menuOpen ? 'max-height-96 opacity-100 py-6' : 'max-height-0 opacity-0 pointer-events-none'
          }`}
          style={{
            maxHeight: menuOpen ? '24rem' : '0px',
          }}
        >
          <ul className="flex flex-col gap-4 px-6">
            {NAV_LINKS.map((link) => {
              const isActive = activeSection === link.id
              return (
                <li key={link.href}>
                  <button
                    onClick={() => scrollToSection(link.href)}
                    className={`w-full text-left font-sans text-lg font-medium py-2 border-b border-white/5 transition-colors cursor-pointer ${
                      isActive ? 'text-[#BEFF39]' : 'text-[#A89880]'
                    }`}
                  >
                    {link.label}
                  </button>
                </li>
              )
            })}
            <li className="pt-4">
              <button
                onClick={() => scrollToSection('#contact')}
                className="w-full py-3 bg-[#BEFF39] text-[#050505] font-bold rounded-full text-center cursor-pointer"
              >
                Let&rsquo;s Talk &rarr;
              </button>
            </li>
          </ul>
        </div>
      </nav>
    </>
  )
}
