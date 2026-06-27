'use client'
// Écran de chargement — affiché pendant que le canvas 3D initialise
import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  // Animation de la barre de progression
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(p => {
        if (p >= 90) { clearInterval(timer); return 90 }
        return p + Math.random() * 15
      })
    }, 200)
    return () => clearInterval(timer)
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0,
      background: '#0A0806',
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      zIndex: 9999,
    }}>
      {/* Logo PRIAM */}
      <div style={{
        fontFamily: '"Cormorant Garamond", serif',
        fontSize: 'clamp(2rem, 6vw, 4rem)',
        fontWeight: 600,
        color: '#F5EDD8',
        letterSpacing: '-0.02em',
        marginBottom: '2rem',
      }}>
        PRIAM
      </div>

      {/* Spinner orbital premium Uiverse */}
      <div className="spinner-container mb-6">
        <svg viewBox="25 25 50 50" className="spinner-orbital">
          <circle r="20" cy="50" cx="50" />
        </svg>
        {/* Affichage du pourcentage de chargement au centre du spinner */}
        <div className="absolute inset-0 flex items-center justify-center font-mono text-[10px] font-bold text-[#BEFF39] tracking-widest">
          {Math.round(progress)}%
        </div>
      </div>

      {/* Texte de chargement */}
      <div style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '0.7rem',
        fontWeight: 400,
        color: '#635848',
        letterSpacing: '0.2em',
        textTransform: 'uppercase',
      }}>
        Entering the Pantheon
      </div>
    </div>
  )
}
