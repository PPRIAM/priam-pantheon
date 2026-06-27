'use client'
// Navigation overlay — logo, points de chambre, bouton Hire Me, toggle audio
import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/data/projects'

// Offsets cibles pour chaque chambre via le scroll programmatique
const CHAMBER_OFFSETS = [0.0, 0.21, 0.41, 0.61, 0.82]

interface OverlayNavProps {
  chamberIndex: number
  onJump: (offset: number) => void
}

export default function OverlayNav({ chamberIndex, onJump }: OverlayNavProps) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [audioReady, setAudioReady] = useState(false)

  // Initialisation de l'audio — muet par défaut (politique navigateur)
  useEffect(() => {
    try {
      const audio = new Audio(siteConfig.audioTrack)
      audio.loop = true
      audio.volume = 0.25
      audioRef.current = audio
      audio.addEventListener('canplaythrough', () => setAudioReady(true))
    } catch {
      // Audio non disponible — pas d'erreur affichée
    }
    return () => { audioRef.current?.pause() }
  }, [])

  const toggleAudio = () => {
    if (!audioRef.current || !audioReady) return
    if (audioPlaying) {
      audioRef.current.pause()
      setAudioPlaying(false)
    } else {
      audioRef.current.play().then(() => setAudioPlaying(true)).catch(() => {})
    }
  }

  return (
    <>
      {/* Logo PRIAM — haut gauche */}
      <div
        onClick={() => onJump(0)}
        style={{
          position: 'fixed', top: '1.5rem', left: '2rem',
          fontFamily: '"Cormorant Garamond", serif',
          fontSize: '1.2rem', fontWeight: 600,
          color: '#F5EDD8', letterSpacing: '-0.02em',
          zIndex: 80, cursor: 'pointer',
          transition: 'color 0.2s ease',
        }}
        onMouseEnter={e => (e.currentTarget.style.color = '#BEFF39')}
        onMouseLeave={e => (e.currentTarget.style.color = '#F5EDD8')}
      >
        PRIAM
      </div>

      {/* Boutons haut droite — Audio + Hire Me */}
      <div style={{
        position: 'fixed', top: '1.5rem', right: '2rem',
        display: 'flex', alignItems: 'center', gap: '0.75rem',
        zIndex: 80,
      }}>
        {/* Toggle Audio */}
        <button
          onClick={toggleAudio}
          title={audioPlaying ? 'Mute' : 'Play ambient'}
          style={{
            width: '36px', height: '36px', borderRadius: '50%',
            background: 'rgba(10,8,6,0.6)',
            backdropFilter: 'blur(12px)',
            border: `1px solid ${audioPlaying ? 'rgba(190,255,57,0.4)' : 'rgba(245,237,216,0.15)'}`,
            color: audioPlaying ? '#BEFF39' : '#A89880',
            cursor: 'pointer',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '1rem',
            transition: 'all 0.2s ease',
          }}
        >
          {audioPlaying ? '🔊' : '🔇'}
        </button>

        {/* Hire Me */}
        <a
          href={`mailto:${siteConfig.email}`}
          style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.4rem',
            padding: '0.6rem 1.25rem',
            background: '#BEFF39', color: '#0A0806',
            fontFamily: '"Outfit", sans-serif',
            fontWeight: 600, fontSize: '0.8125rem',
            letterSpacing: '0.02em',
            borderRadius: '4px', textDecoration: 'none',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLElement).style.background = '#D4FF72'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-2px)'
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLElement).style.background = '#BEFF39'
            ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
          }}
        >
          Hire Me →
        </a>
      </div>

      {/* Points de navigation chambre — bas gauche */}
      <div style={{
        position: 'fixed', bottom: '2rem', left: '2rem',
        display: 'flex', flexDirection: 'column', gap: '8px',
        zIndex: 80,
      }}>
        {CHAMBER_OFFSETS.map((offset, i) => (
          <button
            key={i}
            onClick={() => onJump(offset)}
            title={`Chamber ${i + 1}`}
            style={{
              width: '8px', height: '8px', borderRadius: '50%',
              border: 'none', cursor: 'pointer', padding: 0,
              background: i === chamberIndex ? '#BEFF39' : 'rgba(99,88,72,0.6)',
              boxShadow: i === chamberIndex ? '0 0 8px rgba(190,255,57,0.6)' : 'none',
              transition: 'all 0.2s ease',
              transform: i === chamberIndex ? 'scale(1.3)' : 'scale(1)',
            }}
          />
        ))}
      </div>
    </>
  )
}
