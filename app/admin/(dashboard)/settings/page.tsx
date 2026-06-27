// Page de paramètres de l'administration — Concept et Configuration
'use client'
import { useState } from 'react'
import { Gear, Shield, Eye, Palette } from '@phosphor-icons/react'

export default function SettingsPage() {
  const [siteName, setSiteName] = useState('Priam Pantheon')
  const [contactEmail, setContactEmail] = useState('contact@priam.design')
  const [theme, setTheme] = useState('dark')

  return (
    <div>
      {/* En-tête de la page */}
      <div style={{ marginBottom: '2.5rem' }}>
        <p className="tech-label" style={{ marginBottom: '0.5rem' }}>Configuration</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#F5EDD8', lineHeight: 1.1 }}>Settings</h1>
        <p style={{ color: '#A89880', fontFamily: 'var(--font-geist)', marginTop: '0.5rem' }}>
          Gérer les configurations générales et la sécurité du dashboard
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '2rem', alignItems: 'start' }}>
        {/* Formulaire des paramètres généraux */}
        <div className="glass-card" style={{ padding: '2.5rem', border: '1px solid rgba(255,255,255,0.05)', display: 'flex', flexDirection: 'column', gap: '2rem' }}>
          <div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', color: '#F5EDD8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Gear size={20} style={{ color: '#BEFF39' }} />
              <span>General Settings</span>
            </h3>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div>
                <label className="form-label">Site Name</label>
                <input
                  type="text"
                  value={siteName}
                  onChange={(e) => setSiteName(e.target.value)}
                  className="form-field"
                  placeholder="Priam Pantheon"
                />
              </div>

              <div>
                <label className="form-label">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  className="form-field"
                  placeholder="contact@priam.design"
                />
              </div>

              <div>
                <label className="form-label">Active Theme</label>
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value)}
                  className="form-field"
                  style={{ appearance: 'none', background: 'var(--obsidian-3) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23A89880\'%3E%3Cpath d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}
                >
                  <option value="dark" style={{ background: '#0A0806' }}>Dark Mythos (Electric Lime & Void Black)</option>
                  <option value="light" style={{ background: '#0A0806' }} disabled>Light Mode (Coming Soon)</option>
                </select>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderBottom: '1px solid rgba(255,255,255,0.05)' }} />

          <div>
            <h3 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.25rem', color: '#F5EDD8', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Shield size={20} style={{ color: '#BEFF39' }} />
              <span>Security</span>
            </h3>
            
            <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#A89880', marginBottom: '1.25rem', lineHeight: 1.5 }}>
              L'authentification admin est gérée via Next-Auth avec des identifiants définis dans les variables d'environnement (.env.local).
            </p>

            <button
              className="btn-ghost"
              style={{ padding: '0.75rem 1.5rem', fontSize: '0.875rem' }}
              onClick={() => alert('La modification des clés d\'API se fait dans le fichier d\'environnement du serveur.')}
            >
              Manage Environment Keys
            </button>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '1rem' }}>
            <button
              className="btn-primary"
              onClick={() => alert('Paramètres sauvegardés avec succès ! (Simulation)')}
            >
              Save Configuration
            </button>
          </div>
        </div>

        {/* Section d'information latérale */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)' }}>
            <h4 style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', color: '#BEFF39', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Palette size={16} />
              <span>DESIGN SYSTEM</span>
            </h4>
            <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.8125rem', color: '#A89880', lineHeight: 1.5, margin: 0 }}>
              Ce tableau de bord utilise les tokens du système <strong>Dark Mythos</strong> :
            </p>
            <ul style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', color: '#635848', paddingLeft: '1.25rem', marginTop: '0.75rem', lineHeight: 1.6 }}>
              <li>Background: #050505</li>
              <li>Sidebar: #0A0806</li>
              <li>Accent: #BEFF39 (Lime)</li>
              <li>Text: #F5EDD8 (Ivory)</li>
              <li>Font: Space Mono & Geist</li>
            </ul>
          </div>

          <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', color: '#635848' }}>
            <h4 style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Eye size={16} />
              <span>SYSTEM DIAGNOSTICS</span>
            </h4>
            <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.8125rem', lineHeight: 1.5, margin: 0 }}>
              Version: 1.0.0-gold<br />
              Environment: local-dev<br />
              Database: SQLite via Prisma<br />
              Session Strategy: JWT (Auth.js)
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
