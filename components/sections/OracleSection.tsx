'use client'

// Section Oracle — formulaire de contact épuré avec animations de survol, GSAP & ScrollTrigger
import { useState, useRef, useEffect, FormEvent } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type FormState = {
  name: string
  email: string
  subject: string
  message: string
}

type SubmitState = 'idle' | 'loading' | 'success' | 'error'

export default function OracleSection() {
  const headerRef = useRef<HTMLDivElement>(null)
  const formRef = useRef<HTMLDivElement>(null)

  // États pour les données du formulaire et la soumission
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    subject: '',
    message: '',
  })
  const [submitState, setSubmitState] = useState<SubmitState>('idle')
  const [errorMessage, setErrorMessage] = useState<string>('')

  // Animation de révélation de l'en-tête et du formulaire avec ScrollTrigger
  useEffect(() => {
    const header = headerRef.current
    const formEl = formRef.current
    if (!header || !formEl) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: header,
        start: 'top 85%',
        toggleActions: 'play none none none',
      },
    })

    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    ).fromTo(
      formEl,
      { opacity: 0, y: 40 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' },
      '-=0.5'
    )

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === header || trigger.trigger === formEl) trigger.kill()
      })
    }
  }, [])

  // Soumission du formulaire
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    setSubmitState('loading')
    setErrorMessage('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      // Gestion des erreurs API — parsing des erreurs Zod par champ si disponibles
      if (!res.ok) {
        const data = await res.json().catch(() => ({}))
        if (data.errors) {
          // Concaténation des erreurs de validation Zod par champ
          const messages = Object.values(data.errors).flat().join('. ')
          throw new Error(messages || 'Validation failed.')
        }
        throw new Error(data.message || 'An error occurred. Please try again.')
      }

      setSubmitState('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch (err) {
      setSubmitState('error')
      setErrorMessage(
        err instanceof Error ? err.message : 'Something went wrong. Please try again later.'
      )
    }
  }

  return (
    <section
      id="contact"
      className="relative section-padding bg-[#050505] overflow-hidden"
    >
      {/* Séparateur supérieur */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      {/* Lueur radiale subtile d'arrière-plan */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 85%, rgba(190, 255, 57, 0.02) 0%, transparent 80%)',
        }}
      />

      <div className="section-container relative z-10">
        {/* En-tête centré */}
        <div
          ref={headerRef}
          className="text-center max-w-[640px] mx-auto mb-20 opacity-0"
        >
          <p
            className="section-eyebrow justify-center flex mb-4"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            THE ORACLE
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Begin the Dialogue
          </h2>
          <div className="divider-lime mx-auto mt-4" />
        </div>

        {/* Zone formulaire — Centrée max-w-[640px] */}
        <div
          ref={formRef}
          className="max-w-[640px] mx-auto opacity-0"
        >
          {submitState === 'success' ? (
            /* État Réussite */
            <div className="premium-glass p-10 rounded-2xl text-center border border-[#BEFF39]/20 shadow-[0_0_40px_rgba(190,255,57,0.06)]">
              <div className="w-16 h-16 rounded-full bg-[#BEFF39]/10 border border-[#BEFF39]/30 flex items-center justify-center mx-auto mb-6 text-[#BEFF39] text-2xl font-bold">
                ✓
              </div>
              <h3
                className="text-2xl font-bold text-[#F5EDD8] mb-3"
                style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
              >
                Message received.
              </h3>
              <p
                className="font-sans text-sm text-[#A89880] leading-relaxed mb-8"
                style={{ fontFamily: 'var(--font-geist), sans-serif' }}
              >
                I&apos;ll be in touch within 24 hours.
              </p>
              <button
                onClick={() => setSubmitState('idle')}
                className="font-mono text-[10px] font-bold uppercase tracking-wider text-[#BEFF39] border-b border-[#BEFF39] pb-1 cursor-pointer"
                style={{ fontFamily: 'var(--font-space-mono)' }}
              >
                Send another message &rarr;
              </button>
            </div>
          ) : (
            /* Formulaire Standard (Refactorisé Uiverse) */
            <form onSubmit={handleSubmit} className="flex flex-col gap-8">
              {/* Ligne Prénom + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Champ Nom (Effet flottant Uiverse) */}
                <div className="inputBox">
                  <input
                    id="name"
                    type="text"
                    required
                    placeholder=" "
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                  />
                  <span>Full Name</span>
                </div>

                {/* Champ E-mail (Effet flottant Uiverse) */}
                <div className="inputBox">
                  <input
                    id="email"
                    type="email"
                    required
                    placeholder=" "
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                  />
                  <span>Email Address</span>
                </div>
              </div>

              {/* Champ Sujet (Effet flottant Uiverse) */}
              <div className="inputBox">
                <input
                  id="subject"
                  type="text"
                  required
                  placeholder=" "
                  value={form.subject}
                  onChange={(e) => setForm({ ...form, subject: e.target.value })}
                />
                <span>Subject</span>
              </div>

              {/* Champ Message (Effet flottant Uiverse) */}
              <div className="inputBox">
                <textarea
                  id="message"
                  required
                  rows={4}
                  placeholder=" "
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                />
                <span>Message</span>
              </div>

              {/* Message d'erreur */}
              {submitState === 'error' && (
                <div className="p-4 bg-red-950/20 border border-red-500/30 rounded-xl text-red-400 text-xs font-mono">
                  &times; {errorMessage}
                </div>
              )}

              {/* Bouton Soumettre "Summon" */}
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mt-4">
                <p
                  className="font-mono text-[9px] uppercase tracking-wider text-[#A89880]/60"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  Response within 24h &middot; No spam, ever
                </p>

                <button
                  type="submit"
                  disabled={submitState === 'loading'}
                  className="relative overflow-hidden rounded-full border border-[#BEFF39]/50 px-10 py-4.5 font-mono text-xs font-bold uppercase tracking-[0.2em] text-[#BEFF39] bg-transparent hover:text-[#050505] hover:shadow-[0_0_30px_rgba(190,255,57,0.3)] transition-colors duration-300 group cursor-pointer w-full sm:w-auto btn-sweep"
                  style={{ fontFamily: 'var(--font-space-mono)' }}
                >
                  <span className="absolute inset-0 bg-[#BEFF39] transform translate-y-full transition-transform duration-300 ease-out group-hover:translate-y-0 z-0" />
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {submitState === 'loading' ? (
                      <>
                        <span className="inline-block w-3.5 h-3.5 border-2 border-[#050505] border-t-transparent rounded-full animate-spin" />
                        Summoning...
                      </>
                    ) : (
                      'Summon'
                    )}
                  </span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
