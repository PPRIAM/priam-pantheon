'use client'
// ─────────────────────────────────────────────────────────────────────────────
// Section Démo Aurora — Exemple d'intégration d'en-tête héro avec typographie
// Nagasaki/GeoForm, boutons magnétiques vert lime et animations Framer Motion.
// ─────────────────────────────────────────────────────────────────────────────
import React from 'react'
import { motion } from 'motion/react'
import { AuroraBackground } from '@/components/ui/AuroraBackground'
import { Sparkle, ArrowRight } from '@phosphor-icons/react'

export function AuroraHeroSection() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8, ease: 'easeInOut' }}
        className="relative flex flex-col gap-6 items-center justify-center px-6 max-w-5xl mx-auto text-center z-10"
      >
        {/* Badge supérieur */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#BEFF39]/10 border border-[#BEFF39]/30 rounded-full">
          <Sparkle size={14} className="text-[#BEFF39] animate-spin" />
          <span
            className="font-mono text-xs font-bold text-[#BEFF39] uppercase tracking-widest"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            NÉO-OLYMPIEN ARCHITECTURE
          </span>
        </div>

        {/* Titre principal en typographie Nagasaki */}
        <h1
          className="text-5xl md:text-8xl font-extrabold text-[#F5EDD8] tracking-tighter leading-tight"
          style={{ fontFamily: "'Nagasaki', 'nagasaki', var(--font-nagasaki), sans-serif" }}
        >
          ÉCLAIRER LE VIDE.
        </h1>

        {/* Sous-titre éditorial */}
        <p
          className="text-base md:text-xl text-[#A89880] max-w-2xl leading-relaxed"
          style={{ fontFamily: 'var(--font-geist), sans-serif' }}
        >
          Création de monuments numériques à haute conversion, propulsés par des moteurs IA autonomes et une vitesse esthétique sans compromis.
        </p>

        {/* Bouton d'action principal */}
        <a
          href="#work"
          className="mt-4 inline-flex items-center gap-3 bg-[#BEFF39] text-[#050505] px-8 py-4 rounded-full font-mono text-xs font-bold uppercase tracking-[0.2em] hover:bg-[#D4FF72] hover:shadow-[0_0_30px_rgba(190,255,57,0.4)] hover:scale-105 active:scale-98 transition-all duration-300"
          style={{ fontFamily: 'var(--font-space-mono)' }}
        >
          <span>Découvrir la Vitrine</span>
          <ArrowRight size={16} weight="bold" />
        </a>
      </motion.div>
    </AuroraBackground>
  )
}
