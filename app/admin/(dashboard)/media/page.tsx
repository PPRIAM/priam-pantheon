// Page de la bibliothèque de médias — Future fonctionnalité
'use client'
import { Images, CloudArrowUp, Database } from '@phosphor-icons/react'

export default function MediaPage() {
  return (
    <div>
      {/* En-tête de la page */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="tech-label" style={{ marginBottom: '0.5rem' }}>Stockage</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#F5EDD8', lineHeight: 1.1 }}>Media Library</h1>
        <p style={{ color: '#A89880', fontFamily: 'var(--font-geist)', marginTop: '0.5rem' }}>
          Gestionnaire d'actifs et bibliothèque de médias
        </p>
      </div>

      {/* Conteneur principal sous forme de carte bento glassmorphique */}
      <div className="glass-card" style={{
        padding: '4rem 2rem',
        border: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        gap: '1.5rem',
        maxWidth: '700px',
        margin: '0 auto',
      }}>
        {/* Icônes conceptuelles */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#635848' }}>
          <Images size={48} weight="light" />
          <div style={{ borderLeft: '1px dashed rgba(255,255,255,0.15)', height: '24px' }} />
          <CloudArrowUp size={48} weight="light" style={{ color: '#BEFF39', opacity: 0.8 }} />
          <div style={{ borderLeft: '1px dashed rgba(255,255,255,0.15)', height: '24px' }} />
          <Database size={48} weight="light" />
        </div>

        {/* Message d'information */}
        <div style={{ maxWidth: '480px' }}>
          <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', color: '#F5EDD8', marginBottom: '0.75rem' }}>
            Media uploads coming soon
          </h3>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#A89880', lineHeight: 1.6 }}>
            Connect Vercel Blob or AWS S3 to enable this feature. In the meantime, you can use direct URLs from public hosts (like Unsplash, Imgur or Cloudinary) in your project forms.
          </p>
        </div>

        {/* Bouton d'action fictif (Désactivé) */}
        <button
          className="btn-ghost"
          aria-disabled="true"
          disabled
          style={{
            marginTop: '1rem',
            opacity: 0.5,
            cursor: 'not-allowed',
            borderColor: 'rgba(255,255,255,0.08)',
            color: '#635848',
          }}
        >
          Configure Storage →
        </button>
      </div>
    </div>
  )
}
