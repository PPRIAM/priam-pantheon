'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Page 404 sur mesure — PRIAM's Pantheon (Neo-Olympien Dark Mythos)
// Conçue selon les normes deterministic UI/UX : 0 emoji, min-h-[100dvh],
// typographie Nagasaki/GeoForm, glassmorphisme et micro-interactions magnétiques.
// ─────────────────────────────────────────────────────────────────────────────

import Link from 'next/link'
import { ParthenonIcon, OlympusLightningIcon, MeanderKeyIcon } from '@/components/ui/GreekIcons'
import { ArrowLeft, House } from '@phosphor-icons/react'
import MagneticButton from '@/components/ui/MagneticButton'

export default function NotFound() {
  return (
    <main className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden bg-[#050505] px-6 py-24">
      {/* Superposition de grain de bruit SVG global */}
      <div className="bg-noise-overlay" aria-hidden="true" />

      {/* Grille de fond technique 60px avec repères de précision */}
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

      {/* Halo lumineux d'aura ambiante central vert lime */}
      <div
        className="ambient-spotlight w-[600px] h-[600px] bg-[#BEFF39] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        aria-hidden="true"
      />

      {/* Carte principale glassmorphique centrée avec bordure de réfraction */}
      <div className="relative z-10 max-w-2xl w-full text-center">
        <div className="premium-glass p-10 md:p-14 rounded-3xl relative overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] border border-white/10">
          
          {/* Badge supérieur de statut technique & icône mythologique */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#BEFF39]/10 border border-[#BEFF39]/30 mb-8">
            <ParthenonIcon size={16} glow={true} />
            <span
              className="font-mono text-[11px] font-bold uppercase tracking-[0.3em] text-[#BEFF39]"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              ERR_404 // REALM_NOT_FOUND
            </span>
          </div>

          {/* Titre géant 404 en police Nagasaki avec kerning éditorial (letter-spacing) */}
          <h1
            className="font-nagasaki text-8xl md:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-[#F5EDD8] to-[#A89880] mb-4 tracking-[0.15em] leading-none select-none"
            style={{ fontFamily: "'Nagasaki', 'nagasaki', var(--font-nagasaki), sans-serif", letterSpacing: '0.15em' }}
          >
            404
          </h1>

          {/* Sous-titre éditorial en GeoForm */}
          <h2
            className="text-2xl md:text-3xl font-bold text-[#F5EDD8] mb-6 tracking-tight"
            style={{ fontFamily: 'var(--font-geoform), sans-serif' }}
          >
            LOST IN THE VOID
          </h2>

          {/* Description narrative en Montserrat */}
          <p
            className="font-sans text-sm md:text-base text-[#A89880] max-w-md mx-auto leading-relaxed mb-10"
            style={{ fontFamily: 'var(--font-montserrat), sans-serif' }}
          >
            La chambre sacrée que vous cherchez s&apos;est dissipée dans le vide de l&apos;Underworld.
            Revenez vers le sanctuaire principal pour poursuivre l&apos;expérience.
          </p>

          {/* Frise géométrique décorative Méandre */}
          <div className="flex items-center justify-center gap-2 mb-10 opacity-30">
            <MeanderKeyIcon size={20} />
            <div className="w-16 h-px bg-[#BEFF39]" />
            <OlympusLightningIcon size={18} />
            <div className="w-16 h-px bg-[#BEFF39]" />
            <MeanderKeyIcon size={20} />
          </div>

          {/* Actions interactives — Bouton magnétique de retour au Sanctum */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <MagneticButton>
              <Link
                href="/"
                className="btn-sweep inline-flex items-center gap-3 font-mono text-xs font-bold uppercase tracking-[0.25em] bg-[#BEFF39] text-[#050505] px-8 py-4 rounded-full hover:bg-[#D4FF72] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(190,255,57,0.35)] active:scale-95 cursor-pointer"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                <House size={18} weight="bold" />
                Return to Sanctum
              </Link>
            </MagneticButton>

            <button
              onClick={() => window.history.back()}
              className="inline-flex items-center gap-2 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#A89880] hover:text-[#F5EDD8] px-6 py-4 rounded-full border border-white/10 hover:border-white/30 transition-all duration-300 cursor-pointer"
              style={{ fontFamily: 'var(--font-space-mono)' }}
            >
              <ArrowLeft size={16} />
              Go Back
            </button>
          </div>
        </div>
      </div>
    </main>
  )
}
