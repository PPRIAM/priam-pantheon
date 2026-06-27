'use client'
// Composant de navigation latérale de l'administration
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'
import { FolderOpen, ChatCircle, Images, Gear, SignOut } from '@phosphor-icons/react'
import Logo from '../ui/Logo'

// Définition des éléments de navigation de la barre latérale
const navItems = [
  {
    label: 'Projects',
    href: '/admin/projects',
    icon: FolderOpen,
  },
  {
    label: 'Testimonials',
    href: '/admin/testimonials',
    icon: ChatCircle,
  },
  {
    label: 'Media',
    href: '/admin/media',
    icon: Images,
  },
  {
    label: 'Settings',
    href: '/admin/settings',
    icon: Gear,
  },
]

export default function SideNav() {
  const pathname = usePathname()

  // Gestionnaire de déconnexion via auth.js
  const handleSignOut = () => {
    signOut({ callbackUrl: '/admin/login' })
  }

  return (
    <aside style={{
      width: '240px',
      position: 'fixed',
      left: 0,
      top: 0,
      bottom: 0,
      background: '#0A0806',
      borderRight: '1px solid var(--border-mid, rgba(255,255,255,0.10))',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      zIndex: 80,
    }}>
      <div>
        {/* En-tête : Logo géométrique et sous-titre ADMIN */}
        <div style={{ padding: '2rem 1.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <Logo
              size={24}
              className="text-[#BEFF39]"
              style={{ color: '#BEFF39' } as React.CSSProperties}
            />
            <span style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '1.25rem',
              fontWeight: 700,
              letterSpacing: '0.15em',
              color: '#BEFF39',
              margin: 0
            }}>
              PRIAM
            </span>
          </div>
          <p style={{
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.625rem',
            letterSpacing: '0.2em',
            color: '#635848',
            marginTop: '0.25rem',
            textTransform: 'uppercase',
            fontWeight: 600
          }}>
            ADMIN
          </p>
        </div>

        {/* Liens de navigation */}
        <nav style={{ padding: '1.5rem 0', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/')
            const Icon = item.icon

            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.875rem 1.5rem',
                  fontFamily: 'var(--font-space-mono)',
                  fontSize: '0.75rem',
                  letterSpacing: '0.08em',
                  color: isActive ? '#BEFF39' : '#A89880',
                  textDecoration: 'none',
                  borderLeft: isActive ? '2px solid #BEFF39' : '2px solid transparent',
                  background: isActive ? 'rgba(190, 255, 57, 0.03)' : 'transparent',
                  transition: 'all 0.2s var(--ease-out-expo)',
                }}
              >
                <Icon size={18} weight={isActive ? 'fill' : 'regular'} style={{ color: isActive ? '#BEFF39' : 'inherit' }} />
                <span>{item.label}</span>
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Profil de l'administrateur et déconnexion */}
      <div style={{
        padding: '1.5rem',
        borderTop: '1px solid rgba(255,255,255,0.05)',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
      }}>
        {/* Avatar & Infos utilisateur */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #BEFF39 0%, #8BAF26 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            color: '#050505',
            fontFamily: 'var(--font-space-mono)',
          }}>
            A
          </div>
          <div>
            <p style={{
              fontFamily: 'var(--font-geist)',
              fontSize: '0.8125rem',
              fontWeight: 600,
              color: '#F5EDD8',
              margin: 0
            }}>
              Admin
            </p>
            <p style={{
              fontFamily: 'var(--font-space-mono)',
              fontSize: '0.625rem',
              color: '#635848',
              margin: 0
            }}>
              Console principale
            </p>
          </div>
        </div>

        {/* Bouton déconnexion */}
        <button
          onClick={handleSignOut}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            background: 'none',
            border: 'none',
            color: '#635848',
            fontFamily: 'var(--font-space-mono)',
            fontSize: '0.6875rem',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            padding: '0.5rem 0',
            textAlign: 'left',
            transition: 'color 0.2s ease',
            width: '100%',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4444')}
          onMouseLeave={(e) => (e.currentTarget.style.color = '#635848')}
        >
          <SignOut size={16} />
          <span>SIGN OUT</span>
        </button>
      </div>
    </aside>
  )
}
