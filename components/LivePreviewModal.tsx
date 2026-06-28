'use client'

// ─────────────────────────────────────────────────────────────────────────────
// Composant LivePreviewModal — Modal Dark-Tech de prévisualisation en direct
// Intègre un cadre de navigateur simulé avec contrôle de viewport réactif
// et prévisualisation iframe avec effet glassmorphisme Neo-Olympien.
// ─────────────────────────────────────────────────────────────────────────────

import { useEffect, useState, useRef } from 'react'
import { X, ArrowSquareOut, Desktop, DeviceTablet, DeviceMobile, LockKey, Spinner } from '@phosphor-icons/react'
import { gsap } from 'gsap'

// Types des props du composant modal
interface LivePreviewModalProps {
  isOpen: boolean
  onClose: () => void
  project: {
    title: string
    liveUrl?: string | null
    previewType?: 'iframe' | 'image' | 'video' | string | null
    coverImage?: string | null
  } | null
}

// Modes de taille de viewport réactifs simulés
type ViewportMode = 'desktop' | 'tablet' | 'mobile'

export default function LivePreviewModal({ isOpen, onClose, project }: LivePreviewModalProps) {
  const modalRef = useRef<HTMLDivElement>(null)
  const backdropRef = useRef<HTMLDivElement>(null)
  const [viewport, setViewport] = useState<ViewportMode>('desktop')
  const [isLoading, setIsLoading] = useState<boolean>(true)

  // Écoute de la touche Échap pour fermer la fenêtre modale
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // Animation GSAP d'ouverture et fermeture
  useEffect(() => {
    if (isOpen && modalRef.current && backdropRef.current) {
      setIsLoading(true)
      gsap.fromTo(
        backdropRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.3, ease: 'power2.out' }
      )
      gsap.fromTo(
        modalRef.current,
        { opacity: 0, scale: 0.92, y: 30 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.2)' }
      )
    }
  }, [isOpen])

  if (!isOpen || !project) return null

  // Largeur dynamique du conteneur selon le mode de viewport sélectionné
  const getViewportWidthClass = () => {
    switch (viewport) {
      case 'tablet':
        return 'max-w-[768px] h-[80vh]'
      case 'mobile':
        return 'max-w-[390px] h-[75vh]'
      default:
        return 'max-w-[1280px] h-[85vh]'
    }
  }

  const liveUrl = project.liveUrl || 'https://priam.agency'
  const previewType = project.previewType || 'iframe'

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
      {/* ── Fond d'écran obscurci avec effet glassmorphique ────────────────── */}
      <div
        ref={backdropRef}
        className="absolute inset-0 bg-[#050505]/90 backdrop-blur-xl transition-opacity duration-300"
        onClick={onClose}
      />

      {/* ── Conteneur principal de la fenêtre modale simulée ────────────────── */}
      <div
        ref={modalRef}
        className={`relative w-full ${getViewportWidthClass()} bg-[#0A0A0A] border border-white/10 rounded-2xl shadow-[0_25px_80px_rgba(0,0,0,0.9),0_0_40px_rgba(190,255,57,0.1)] flex flex-col overflow-hidden transition-all duration-500 ease-out z-10`}
      >
        {/* ── Barre supérieure du navigateur simulé (Cadre Dark-Tech) ────────── */}
        <div className="bg-[#111111] border-b border-white/10 px-4 py-3 flex items-center justify-between gap-4 shrink-0 select-none">
          {/* Témoins lumineux de contrôle de fenêtre */}
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="w-3.5 h-3.5 rounded-full bg-[#FF5F56] hover:brightness-125 transition-all flex items-center justify-center group"
              title="Fermer"
            >
              <X size={10} className="opacity-0 group-hover:opacity-100 text-black font-bold" />
            </button>
            <div className="w-3.5 h-3.5 rounded-full bg-[#FFBD2E]" />
            <div className="w-3.5 h-3.5 rounded-full bg-[#27C93F]" />
          </div>

          {/* Barre d'adresse dynamique avec cadenas de sécurité et URL */}
          <div className="flex-1 max-w-xl mx-auto flex items-center bg-[#050505] border border-white/10 rounded-xl px-3 py-1.5 gap-2 text-xs font-mono">
            <LockKey size={14} color="#BEFF39" weight="fill" className="shrink-0" />
            <span className="text-[#BEFF39] font-semibold text-[10px] uppercase tracking-wider shrink-0 hidden sm:inline">
              HTTPS
            </span>
            <span className="text-white/30 shrink-0">|</span>
            <span className="text-[#F5EDD8] truncate tracking-tight">{liveUrl}</span>
          </div>

          {/* Contrôles réactifs de viewport et actions rapides */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Sélecteur Desktop / Tablette / Mobile */}
            <div className="hidden md:flex items-center bg-[#050505] p-1 rounded-xl border border-white/5 mr-2">
              <button
                onClick={() => setViewport('desktop')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewport === 'desktop' ? 'bg-[#BEFF39] text-black' : 'text-[#A89880] hover:text-white'
                }`}
                title="Vue Ordinateur"
              >
                <Desktop size={16} />
              </button>
              <button
                onClick={() => setViewport('tablet')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewport === 'tablet' ? 'bg-[#BEFF39] text-black' : 'text-[#A89880] hover:text-white'
                }`}
                title="Vue Tablette"
              >
                <DeviceTablet size={16} />
              </button>
              <button
                onClick={() => setViewport('mobile')}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewport === 'mobile' ? 'bg-[#BEFF39] text-black' : 'text-[#A89880] hover:text-white'
                }`}
                title="Vue Mobile"
              >
                <DeviceMobile size={16} />
              </button>
            </div>

            {/* Bouton d'ouverture directe dans un nouvel onglet */}
            <a
              href={liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 text-[#A89880] hover:text-[#BEFF39] hover:bg-white/5 rounded-xl transition-colors"
              title="Ouvrir dans un nouvel onglet"
            >
              <ArrowSquareOut size={18} />
            </a>

            {/* Bouton Fermer */}
            <button
              onClick={onClose}
              className="p-2 text-[#A89880] hover:text-white hover:bg-white/5 rounded-xl transition-colors ml-1"
              title="Fermer la prévisualisation"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        {/* ── Zone de contenu principal de prévisualisation ─────────────────── */}
        <div className="relative flex-1 bg-[#050505] overflow-hidden">
          {/* Indice de chargement fluide */}
          {isLoading && previewType === 'iframe' && (
            <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-[#050505]/90 backdrop-blur-sm space-y-3">
              <Spinner size={32} color="#BEFF39" className="animate-spin" />
              <p className="font-mono text-xs text-[#A89880] uppercase tracking-widest animate-pulse">
                Chargement du conteneur live...
              </p>
            </div>
          )}

          {/* Intégration selon le type de prévisualisation (iframe / image / vidéo) */}
          {previewType === 'iframe' ? (
            <iframe
              src={liveUrl}
              title={`Prévisualisation en direct - ${project.title}`}
              className="w-full h-full border-0 bg-white"
              onLoad={() => setIsLoading(false)}
              sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
            />
          ) : previewType === 'video' ? (
            <div className="w-full h-full flex items-center justify-center p-4 bg-black">
              <video
                src={liveUrl}
                controls
                autoPlay
                className="max-w-full max-h-full rounded-xl"
              />
            </div>
          ) : (
            <div className="w-full h-full flex items-center justify-center p-4">
              {project.coverImage ? (
                <img
                  src={project.coverImage}
                  alt={project.title}
                  className="max-w-full max-h-full object-contain rounded-xl"
                />
              ) : (
                <div className="text-center p-8 font-mono text-sm text-[#A89880]">
                  Aucun média disponible pour ce projet.
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
