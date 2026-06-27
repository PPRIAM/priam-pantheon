'use client'
// Composant client pour la gestion interactive des témoignages
import { useState, useTransition } from 'react'
import { Testimonial } from '@prisma/client'
import { createTestimonial, deleteTestimonial } from '@/app/actions/testimonials'
import { Trash, Star, ChatCircle, User } from '@phosphor-icons/react'

interface TestimonialsListClientProps {
  initialTestimonials: Testimonial[]
}

export default function TestimonialsListClient({ initialTestimonials }: TestimonialsListClientProps) {
  const [testimonials, setTestimonials] = useState<Testimonial[]>(initialTestimonials)
  const [isPending, startTransition] = useTransition()

  // Formulaire state
  const [clientName, setClientName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [formError, setFormError] = useState('')

  // Soumission du formulaire de création
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    if (quote.length < 10) {
      setFormError('La citation doit faire au moins 10 caractères.')
      return
    }

    const formData = new FormData()
    formData.append('clientName', clientName)
    formData.append('role', role)
    formData.append('company', company)
    formData.append('quote', quote)
    formData.append('rating', rating.toString())

    startTransition(async () => {
      try {
        const res = await createTestimonial(formData)
        if (res.success && res.testimonial) {
          // Mise à jour de l'état local
          setTestimonials([res.testimonial, ...testimonials])
          // Réinitialisation du formulaire
          setClientName('')
          setRole('')
          setCompany('')
          setQuote('')
          setRating(5)
        } else {
          setFormError('Une erreur est survenue lors de la création du témoignage.')
        }
      } catch (err: any) {
        setFormError(err.message || 'Une erreur est survenue.')
      }
    })
  }

  // Suppression d'un témoignage
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Voulez-vous vraiment supprimer le témoignage de "${name}" ?`)) {
      startTransition(async () => {
        try {
          const res = await deleteTestimonial(id)
          if (res.success) {
            setTestimonials(testimonials.filter((t) => t.id !== id))
          }
        } catch (err: any) {
          console.error(err)
        }
      })
    }
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'minmax(320px, 380px) 1fr', gap: '2rem', alignItems: 'start' }}>
      
      {/* Colonne de gauche : Formulaire d'ajout */}
      <div className="glass-card" style={{ padding: '2rem', border: '1px solid rgba(255,255,255,0.05)', position: 'sticky', top: '2rem' }}>
        <p className="tech-label" style={{ marginBottom: '0.25rem' }}>Nouveau témoignage</p>
        <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.5rem', color: '#F5EDD8', marginBottom: '1.5rem' }}>Add Testimonial</h2>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label className="form-label">Client Name</label>
            <input
              type="text"
              required
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="form-field"
              placeholder="e.g. Zeus Olympios"
            />
          </div>

          <div>
            <label className="form-label">Role</label>
            <input
              type="text"
              required
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="form-field"
              placeholder="e.g. Creative Director"
            />
          </div>

          <div>
            <label className="form-label">Company</label>
            <input
              type="text"
              required
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              className="form-field"
              placeholder="e.g. Mount Olympus Group"
            />
          </div>

          <div>
            <label className="form-label">Rating</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              className="form-field"
              style={{ appearance: 'none', background: 'var(--obsidian-3) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23A89880\'%3E%3Cpath d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}
            >
              {[5, 4, 3, 2, 1].map((val) => (
                <option key={val} value={val} style={{ background: '#0A0806' }}>
                  {val} Star{val > 1 ? 's' : ''}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="form-label">Quote</label>
            <textarea
              required
              rows={4}
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
              className="form-field"
              placeholder="Write the client testimonial here (min 10 characters)..."
              style={{ resize: 'vertical' }}
            />
          </div>

          {formError && (
            <div style={{ color: '#ff4444', fontFamily: 'var(--font-geist)', fontSize: '0.8125rem', background: 'rgba(255,68,68,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid rgba(255,68,68,0.2)' }}>
              {formError}
            </div>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="btn-primary"
            style={{ width: '100%', justifyContent: 'center', marginTop: '0.5rem', opacity: isPending ? 0.7 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}
          >
            {isPending ? 'Adding...' : 'Add Testimonial →'}
          </button>
        </form>
      </div>

      {/* Colonne de droite : Liste des témoignages */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {testimonials.length === 0 ? (
          <div className="glass-card" style={{ padding: '3rem', textAlign: 'center', border: '1px solid rgba(255,255,255,0.05)' }}>
            <ChatCircle size={40} style={{ color: '#635848', marginBottom: '1rem', marginInline: 'auto' }} />
            <p style={{ fontFamily: 'var(--font-geist)', color: '#635848', margin: 0 }}>
              Aucun témoignage enregistré pour le moment.
            </p>
          </div>
        ) : (
          testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="glass-card"
              style={{
                padding: '1.5rem 2rem',
                border: '1px solid rgba(255,255,255,0.05)',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
                position: 'relative',
                transition: 'border-color 0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'rgba(190, 255, 57, 0.2)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.05)')}
            >
              {/* Entête du témoignage (Note étoiles + Bouton supprimer) */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '0.125rem' }}>
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star
                      key={idx}
                      size={14}
                      weight={idx < testimonial.rating ? 'fill' : 'regular'}
                      style={{ color: idx < testimonial.rating ? '#BEFF39' : '#635848' }}
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleDelete(testimonial.id, testimonial.clientName)}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    color: '#635848',
                    padding: '0.25rem',
                    transition: 'color 0.2s',
                  }}
                  title="Supprimer ce témoignage"
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4444')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = '#635848')}
                >
                  <Trash size={16} />
                </button>
              </div>

              {/* Contenu de la citation */}
              <p style={{
                fontFamily: 'var(--font-playfair)',
                fontSize: '1.125rem',
                fontStyle: 'italic',
                color: '#F5EDD8',
                lineHeight: 1.5,
                margin: 0,
              }}>
                “{testimonial.quote}”
              </p>

              {/* Métadonnées du client */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginTop: '0.5rem' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#BEFF39',
                }}>
                  <User size={18} />
                </div>
                <div>
                  <h4 style={{ fontFamily: 'var(--font-geist)', fontSize: '0.875rem', fontWeight: 600, color: '#F5EDD8', margin: 0 }}>
                    {testimonial.clientName}
                  </h4>
                  <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', color: '#A89880', margin: 0 }}>
                    {testimonial.role} at <span style={{ color: '#BEFF39' }}>{testimonial.company}</span>
                  </p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
