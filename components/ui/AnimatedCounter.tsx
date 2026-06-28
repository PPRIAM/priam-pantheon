'use client'

// Composant AnimatedCounter — compteur animé pour les statistiques
// Utilise GSAP pour animer de 0 jusqu'à la valeur cible
// Déclenché par IntersectionObserver — une seule animation par élément
// Police: Playfair Display pour l'impact visuel

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

// ─── Types ───────────────────────────────────────────────────────────────────

interface AnimatedCounterProps {
  // Valeur cible à atteindre
  value: number
  // Suffixe affiché après le chiffre (ex: '+', '%', 'k')
  suffix?: string
  // Préfixe affiché avant le chiffre (ex: '$', '€')
  prefix?: string
  // Durée totale de l'animation en millisecondes
  duration?: number
  // Délai avant démarrage de l'animation en ms
  delay?: number
  // Classes CSS supplémentaires pour le conteneur
  className?: string
  // Nombre de décimales à afficher (défaut: 0)
  decimals?: number
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function AnimatedCounter({
  value,
  suffix = '',
  prefix = '',
  duration = 2000,
  delay = 0,
  className = '',
  decimals = 0,
}: AnimatedCounterProps) {
  // Valeur courante affichée — commence à 0
  const [displayValue, setDisplayValue] = useState(0)

  // Référence vers le conteneur pour IntersectionObserver
  const containerRef = useRef<HTMLSpanElement>(null)

  // Objet proxy GSAP pour animer une valeur numérique
  const counterRef = useRef({ value: 0 })

  // Indicateur — animation déjà jouée (ne jouer qu'une fois)
  const hasAnimated = useRef(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return

    // Créer l'observateur d'intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated.current) {
            hasAnimated.current = true

            // Remettre la valeur proxy à 0 avant de démarrer
            counterRef.current.value = 0

            // Animation GSAP sur l'objet proxy — mise à jour du state React à chaque tick
            gsap.to(counterRef.current, {
              value,
              duration: duration / 1000, // GSAP utilise des secondes
              delay: delay / 1000,
              ease: 'power4.out',
              onUpdate: () => {
                // Arrondir selon le nombre de décimales demandé
                setDisplayValue(
                  parseFloat(counterRef.current.value.toFixed(decimals))
                )
              },
              onComplete: () => {
                // Assurer la valeur finale exacte
                setDisplayValue(value)
              },
            })

            // Ne déclencher qu'une seule fois
            observer.unobserve(el)
          }
        })
      },
      {
        threshold: 0.3,
        rootMargin: '0px 0px -20px 0px',
      }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
    }
  }, [value, duration, delay, decimals])

  // Formater le nombre pour l'affichage
  const formattedValue =
    decimals > 0
      ? displayValue.toFixed(decimals)
      : Math.floor(displayValue).toLocaleString('fr-FR')

  return (
    <span
      ref={containerRef}
      className={className}
      style={{
        // GeoForm pour l'affichage précis des chiffres des statistiques
        fontFamily: 'var(--font-geoform), var(--font-montserrat), sans-serif',
        display: 'inline-block',
        // Chiffres tabulaires — alignement constant pendant l'animation
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {prefix}
      {formattedValue}
      {suffix}
    </span>
  )
}
