'use client'
// Indication de défilement — disparaît après le premier scroll
import { useEffect, useState } from 'react'

export default function ScrollHint() {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const handleScroll = () => setVisible(false)
    window.addEventListener('wheel', handleScroll, { once: true })
    window.addEventListener('touchstart', handleScroll, { once: true })
    return () => {
      window.removeEventListener('wheel', handleScroll)
      window.removeEventListener('touchstart', handleScroll)
    }
  }, [])

  return (
    <div style={{
      position: 'fixed',
      bottom: '3rem',
      left: '50%',
      transform: 'translateX(-50%)',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '0.5rem',
      zIndex: 50,
      opacity: visible ? 1 : 0,
      transition: 'opacity 0.5s ease',
      pointerEvents: 'none',
    }}>
      <span style={{
        fontFamily: '"Outfit", sans-serif',
        fontSize: '0.65rem',
        letterSpacing: '0.2em',
        color: '#A89880',
        textTransform: 'uppercase',
      }}>
        Découvrir
      </span>
      {/* Flèche animée */}
      <div style={{
        width: '1px',
        height: '32px',
        background: 'linear-gradient(to bottom, #BEFF39, transparent)',
        animation: 'scrollPulse 1.5s ease-in-out infinite',
      }} />
      <style>{`
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; transform: translateY(0); }
          50% { opacity: 1; transform: translateY(6px); }
        }
      `}</style>
    </div>
  )
}
