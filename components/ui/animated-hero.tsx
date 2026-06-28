'use client'

import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, Sparkles, Terminal, ShieldCheck } from 'lucide-react'
import { Button } from '@/components/ui/button'

/**
 * Liste des adjectifs animés qualifiant les réalisations numériques.
 * Ces mots défilent séquentiellement dans le titre principal du Hero.
 */
const ADJECTIFS_ANIMES = [
  'extraordinaires',
  'sur-mesure',
  'immersives',
  'haute-performance',
  'mémorables',
]

/**
 * Composant Hero Animé au style Dark-Tech fluide.
 * Combine Framer Motion pour les transitions de texte fluides et Lucide Icons pour les éléments d'interface.
 * Couleurs principales : fond #050505, accent néon #BEFF39.
 */
export function AnimatedHero() {
  // Index de l'adjectif actuellement affiché dans le cycle d'animation
  const [indexAdjectif, setIndexAdjectif] = useState(0)

  // Effet d'intervalle temporisé pour faire défiler automatiquement les adjectifs toutes les 3 secondes
  useEffect(() => {
    const intervalle = setInterval(() => {
      setIndexAdjectif((prevIndex) => (prevIndex + 1) % ADJECTIFS_ANIMES.length)
    }, 3000)

    // Nettoyage impératif de l'intervalle lors du démontage du composant
    return () => clearInterval(intervalle)
  }, [])

  return (
    <section className="relative min-h-[90vh] w-full bg-[#050505] text-white flex items-center justify-center overflow-hidden px-4 py-24">
      {/* Grille de fond Dark-Tech avec masque radial et accent néon #BEFF39 */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-40 pointer-events-none" />

      {/* Halo lumineux d'arrière-plan diffusant l'accent néon #BEFF39 */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-[#BEFF39]/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto text-center flex flex-col items-center">
        {/* Badge supérieur Dark-Tech avec micro-animation d'apparition */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="inline-flex items-center gap-2 rounded-full border border-[#BEFF39]/30 bg-[#BEFF39]/10 px-4 py-1.5 text-xs font-semibold text-[#BEFF39] backdrop-blur-md shadow-[0_0_20px_rgba(190,255,57,0.15)] mb-8"
        >
          <Sparkles className="h-3.5 w-3.5 animate-pulse text-[#BEFF39]" />
          <span>PRIAM PANTHEON • STUDIO CRÉATIF & INGÉNIERIE WEB</span>
        </motion.div>

        {/* Titre principal intégrant le défilement d'adjectifs avec Framer Motion */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
          className="text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.15] mb-6 max-w-4xl"
        >
          Nous concevons des expériences numériques{' '}
          <span className="relative inline-block text-left min-w-[280px] sm:min-w-[420px] h-[1.2em] align-bottom">
            <AnimatePresence mode="wait">
              <motion.span
                key={indexAdjectif}
                initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(8px)' }}
                transition={{ duration: 0.5, ease: 'easeInOut' }}
                className="absolute left-0 text-[#BEFF39] drop-shadow-[0_0_25px_rgba(190,255,57,0.4)] whitespace-nowrap"
              >
                {ADJECTIFS_ANIMES[indexAdjectif]}
              </motion.span>
            </AnimatePresence>
          </span>
        </motion.h1>

        {/* Paragraphe sous-titre expliquant la proposition de valeur */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="text-lg sm:text-xl text-zinc-400 max-w-2xl mb-10 leading-relaxed font-normal"
        >
          Fusion d'architecture numérique d'avant-garde, de direction artistique haute couture et d'interfaces réactives taillées pour la conversion.
        </motion.p>

        {/* Groupe de boutons d'action avec les composants UI réutilisables */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: 'easeOut' }}
          className="flex flex-col sm:flex-row gap-4 items-center justify-center w-full sm:w-auto"
        >
          <Button size="lg" className="w-full sm:w-auto group gap-3 text-base">
            <span>Découvrir le Panthéon</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>

          <Button size="lg" variant="outline" className="w-full sm:w-auto text-base">
            Explorer les Projets
          </Button>
        </motion.div>

        {/* Indicateurs et piliers techniques en bas de Hero */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 sm:grid-cols-3 gap-6 text-left w-full max-w-3xl"
        >
          <div className="flex items-center gap-3">
            <Terminal className="h-5 w-5 text-[#BEFF39] shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Architecture Robuste</div>
              <div className="text-xs text-zinc-500">Next.js & TypeScript Natif</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-[#BEFF39] shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Haute Performance</div>
              <div className="text-xs text-zinc-500">Score Lighthouse 99+</div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Sparkles className="h-5 w-5 text-[#BEFF39] shrink-0" />
            <div>
              <div className="text-sm font-semibold text-white">Design Néo-Olympien</div>
              <div className="text-xs text-zinc-500">Esthétique Dark-Tech Sur-Mesure</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export { AnimatedHero as Hero }
export default AnimatedHero
