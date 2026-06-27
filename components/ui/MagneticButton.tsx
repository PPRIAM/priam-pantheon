'use client'

// Composant MagneticButton — effet magnétique au survol de la souris
// L'élément suit le curseur à 30% de l'offset via GSAP quickTo
// Retour fluide au centre à la sortie — esthétique cinématique lourde

import { useRef, ReactNode, useCallback } from 'react'
import gsap from 'gsap'

// ─── Types ───────────────────────────────────────────────────────────────────

interface MagneticButtonProps {
  children: ReactNode
  className?: string
  // Force du magnétisme — 0 à 1, défaut 0.3 (30% de l'offset)
  strength?: number
  // Durée du retour au centre en secondes
  returnDuration?: number
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  returnDuration = 0.6,
}: MagneticButtonProps) {
  // Référence vers le wrapper magnétique
  const wrapperRef = useRef<HTMLDivElement>(null)

  // Fonctions quickTo GSAP — interpolation fluide sans recalcul à chaque frame
  // Initialisées de manière paresseuse au premier survol pour performance
  const xTo = useRef<((value: number) => void) | null>(null)
  const yTo = useRef<((value: number) => void) | null>(null)

  // Initialiser les fonctions quickTo une seule fois
  const initQuickTo = useCallback(() => {
    const el = wrapperRef.current
    if (!el || xTo.current) return

    // quickTo: interpolateur GSAP haute performance pour animations temps-réel
    xTo.current = gsap.quickTo(el, 'x', {
      duration: 0.4,
      ease: 'power4.out',
    })
    yTo.current = gsap.quickTo(el, 'y', {
      duration: 0.4,
      ease: 'power4.out',
    })
  }, [])

  // Gestionnaire de mouvement souris — calcule l'offset et applique le magnétisme
  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = wrapperRef.current
      if (!el) return

      // Assurer l'initialisation des quickTo
      initQuickTo()

      // Calcul de la position relative au centre de l'élément
      const rect = el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      // Offset de la souris par rapport au centre
      const offsetX = e.clientX - centerX
      const offsetY = e.clientY - centerY

      // Appliquer le magnétisme à strength% de l'offset
      xTo.current?.(offsetX * strength)
      yTo.current?.(offsetY * strength)
    },
    [initQuickTo, strength]
  )

  // Retour au centre à la sortie de la souris
  const handleMouseLeave = useCallback(() => {
    const el = wrapperRef.current
    if (!el) return

    // Retour fluide au centre avec easing expo
    gsap.to(el, {
      x: 0,
      y: 0,
      duration: returnDuration,
      ease: 'expo.out',
    })
  }, [returnDuration])

  return (
    <div
      ref={wrapperRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      // Curseur pointeur pour indiquer l'interactivité
      style={{ display: 'inline-block', cursor: 'pointer' }}
    >
      {children}
    </div>
  )
}
