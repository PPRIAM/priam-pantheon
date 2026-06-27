'use client'

// Composant réutilisable pour les animations d'entrée au défilement
// Utilise IntersectionObserver pour déclencher une révélation fade-up cinématique
// Esthétique: délibérée et lourde — Power4.easeOut via CSS

import { useEffect, useRef, ReactNode, CSSProperties } from 'react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ScrollRevealProps {
  children: ReactNode
  delay?: number        // Délai avant animation en millisecondes
  className?: string    // Classes Tailwind ou CSS supplémentaires
  threshold?: number    // Seuil de visibilité (0–1), défaut 0.15
  translateY?: number   // Distance de glissement initial en px, défaut 30
  duration?: number     // Durée de transition en ms, défaut 800
}

// ─── Styles d'état ───────────────────────────────────────────────────────────

const hiddenStyle: CSSProperties = {
  opacity: 0,
  transform: 'translateY(30px)',
  // Aucune transition — appliquée seulement à l'état initial pour éviter
  // le flash de contenu visible au premier rendu
  willChange: 'opacity, transform',
}

// ─── Composant principal ─────────────────────────────────────────────────────

export default function ScrollReveal({
  children,
  delay = 0,
  className = '',
  threshold = 0.15,
  translateY = 30,
  duration = 800,
}: ScrollRevealProps) {
  // Référence vers l'élément DOM à observer
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Appliquer l'état caché initial immédiatement
    el.style.opacity = '0'
    el.style.transform = `translateY(${translateY}px)`
    el.style.willChange = 'opacity, transform'

    // Créer l'observateur d'intersection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Déclencher l'animation après le délai spécifié
            const timer = setTimeout(() => {
              el.style.transition = `opacity ${duration}ms cubic-bezier(0.16, 1, 0.3, 1), transform ${duration}ms cubic-bezier(0.16, 1, 0.3, 1)`
              el.style.opacity = '1'
              el.style.transform = 'translateY(0px)'
              // Nettoyer willChange après animation pour libérer la mémoire GPU
              setTimeout(() => {
                el.style.willChange = 'auto'
              }, duration + 100)
            }, delay)

            // Ne déclencher qu'une seule fois — désabonner après révélation
            observer.unobserve(el)

            return () => clearTimeout(timer)
          }
        })
      },
      {
        threshold,
        // Marge pour déclencher légèrement avant l'entrée dans le viewport
        rootMargin: '0px 0px -40px 0px',
      }
    )

    observer.observe(el)

    // Nettoyage à la destruction du composant
    return () => {
      observer.unobserve(el)
      observer.disconnect()
    }
  }, [delay, duration, threshold, translateY])

  return (
    <div
      ref={ref}
      className={className}
      // État caché initial via style inline pour éviter le flash
      style={hiddenStyle}
    >
      {children}
    </div>
  )
}
