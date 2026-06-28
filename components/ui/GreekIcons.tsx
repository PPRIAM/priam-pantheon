'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Composants d'icônes SVG d'inspiration grecque mythologique (Neo-Olympien)
// Conçus avec précision vectorielle, accents lime (#BEFF39) et lueurs néon.
// Compatible avec React / Next.js 16 et prêt pour les micro-interactions.
// ─────────────────────────────────────────────────────────────────────────────

import React from 'react'

interface IconProps extends React.SVGProps<SVGSVGElement> {
  size?: number
  color?: string
  glow?: boolean
}

/** 1. Temple Panthéon / Piliers Parthénon — Symbolise l'Architecture & la Structure */
export function ParthenonIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Fronton triangulaire supérieur */}
      <path d="M2 7L12 2L22 7H2Z" />
      {/* Architrave horizontale */}
      <line x1="3" y1="9" x2="21" y2="9" />
      {/* Piliers colonnes verticales */}
      <line x1="5" y1="9" x2="5" y2="19" />
      <line x1="9" y1="9" x2="9" y2="19" />
      <line x1="13" y1="9" x2="13" y2="19" />
      <line x1="17" y1="9" x2="17" y2="19" />
      <line x1="21" y1="9" x2="21" y2="19" />
      {/* Base / Stylobate inférieur */}
      <path d="M1 19H23V22H1V19Z" />
    </svg>
  )
}

/** 2. Couronne de Laurier Olympe — Symbolise la Victoire & l'Excellence */
export function LaurelWreathIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Branche de laurier gauche */}
      <path d="M5 21C5 15 7 9 12 4" />
      <path d="M3 17C4.5 15.5 6 16 6.5 17.5" />
      <path d="M4 12C6 11 7 12 7.5 13.5" />
      <path d="M6 7C8 6.5 9 8 9 9.5" />
      
      {/* Branche de laurier droite */}
      <path d="M19 21C19 15 17 9 12 4" />
      <path d="M21 17C19.5 15.5 18 16 17.5 17.5" />
      <path d="M20 12C18 11 17 12 16.5 13.5" />
      <path d="M18 7C16 6.5 15 8 15 9.5" />
      
      {/* Ruban d'attache à la base */}
      <path d="M10 20L12 22L14 20" />
    </svg>
  )
}

/** 3. Éclair de Zeus / Olympe — Symbolise l'Énergie & le Leadership Créatif */
export function OlympusLightningIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_10px_rgba(190,255,57,0.6)]' : ''} ${className}`}
      {...props}
    >
      {/* Tracer angulaire de l'éclair mythologique */}
      <path d="M13 2L3 14H12L11 22L21 10H12L13 2Z" fill={glow ? `${color}20` : 'none'} />
    </svg>
  )
}

/** 4. Bouclier Égide d'Athéna — Symbolise la Stratégie & la Protection de Marque */
export function AthenaShieldIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Contour du bouclier égide */}
      <path d="M12 22C12 22 20 18 20 12V5L12 2L4 5V12C4 18 12 22 12 22Z" />
      {/* Étoile de sagesse intérieure */}
      <path d="M12 7L13.5 10.5L17 11L14.5 13.5L15 17L12 15.5L9 17L9.5 13.5L7 11L10.5 10.5L12 7Z" />
    </svg>
  )
}

/** 5. Motifs Méandre Grec (Greek Key) — Frise Géométrique Décorative */
export function MeanderKeyIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Chemin géométrique continu en labyrinthe méandre */}
      <path d="M2 18H8V14H5V11H11V18H14V14H11V8H17V18H20V14H17V5H22" />
    </svg>
  )
}

/** 6. Casque Spartiate / Guerrier — Symbolise la Rigueur & la Force Stratégique */
export function SpartanHelmetIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Cimier du casque */}
      <path d="M12 2C7 2 4 5 4 10V15C4 18 7 21 12 22C17 21 20 18 20 15V10C20 5 17 2 12 2Z" />
      {/* Fente oculaire en T spartiate */}
      <path d="M7 11H17V13H13V18H11V13H7V11Z" fill={glow ? `${color}30` : 'none'} />
    </svg>
  )
}

/** 7. Caducée d'Hermès / Vitesse — Symbolise le Vitesse d'Exécution & l'Itération */
export function HermesCaduceusIcon({
  size = 24,
  color = '#BEFF39',
  glow = false,
  className = '',
  ...props
}: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`${glow ? 'drop-shadow-[0_0_8px_rgba(190,255,57,0.5)]' : ''} ${className}`}
      {...props}
    >
      {/* Sceptre central */}
      <line x1="12" y1="3" x2="12" y2="21" />
      {/* Pommeau supérieur */}
      <circle cx="12" cy="3" r="1.5" />
      {/* Serpents entrelacés */}
      <path d="M7 8C7 8 12 6 12 11C12 16 17 14 17 14" />
      <path d="M17 8C17 8 12 6 12 11C12 16 7 14 7 14" />
    </svg>
  )
}
