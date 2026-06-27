// Page de connexion admin — identifiants sécurisés
'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function AdminLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    setError('')
    
    const result = await signIn('credentials', {
      email,
      password,
      redirect: false,
    })
    
    if (result?.error) {
      setError('Identifiants invalides. Vérifiez votre email et mot de passe.')
      setLoading(false)
    } else {
      router.push('/admin/projects')
    }
  }

  return (
    <div style={{ minHeight: '100vh', background: '#050505', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="glass-card" style={{ width: '100%', maxWidth: '420px', padding: '3rem', margin: '1rem' }}>
        {/* Logo géométrique et titre */}
        <div style={{ textAlign: 'center', marginBottom: '2.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <Image
            src="/logo-lime-v3.png"
            alt="PRIAM Logo"
            width={48}
            height={34}
            style={{ objectFit: 'contain', marginBottom: '0.75rem' }}
          />
          <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '1.5rem', fontWeight: 700, letterSpacing: '0.15em', color: '#BEFF39', margin: 0 }}>PRIAM</p>
          <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#635848', marginTop: '0.5rem', margin: 0 }}>Administration</p>
        </div>
        
        {/* Formulaire */}
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="form-field"
              placeholder="admin@priam.com"
              required
              aria-label="Adresse email administrateur"
            />
          </div>
          <div>
            <label style={{ display: 'block', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', marginBottom: '0.5rem', textTransform: 'uppercase' }}>Mot de passe</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="form-field"
              placeholder="••••••••"
              required
              aria-label="Mot de passe administrateur"
            />
          </div>
          
          {error && (
            <p style={{ color: '#ff4444', fontFamily: 'var(--font-geist)', fontSize: '0.875rem', background: 'rgba(255,68,68,0.1)', padding: '0.75rem 1rem', borderRadius: '6px', border: '1px solid rgba(255,68,68,0.2)' }}>
              {error}
            </p>
          )}
          
          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{ justifyContent: 'center', opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
            aria-label="Se connecter au tableau de bord"
          >
            {loading ? 'Connexion...' : 'Accéder au tableau de bord →'}
          </button>
        </form>
        
        <p style={{ textAlign: 'center', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', color: '#635848', marginTop: '2rem' }}>
          ACCÈS RESTREINT — PRIAM PANTHÉON
        </p>
      </div>
    </div>
  )
}
