'use client'
// Composant de gestion des témoignages clients (CRUD)
import { useState, useTransition } from 'react'
import { Testimonial } from '@prisma/client'
import { createTestimonial, updateTestimonial, deleteTestimonial } from '@/app/actions/testimonials'
import { Plus, Trash, Pencil, X, Star } from '@phosphor-icons/react'

interface TestimonialsManagerProps {
  testimonials: Testimonial[]
}

export default function TestimonialsManager({ testimonials }: TestimonialsManagerProps) {
  const [isPending, startTransition] = useTransition()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null)

  // États locaux des champs du formulaire
  const [clientName, setClientName] = useState('')
  const [role, setRole] = useState('')
  const [company, setCompany] = useState('')
  const [quote, setQuote] = useState('')
  const [rating, setRating] = useState(5)
  const [formError, setFormError] = useState('')

  // Ouvrir le tiroir pour la création
  const openCreateDrawer = () => {
    setEditingTestimonial(null)
    setClientName('')
    setRole('')
    setCompany('')
    setQuote('')
    setRating(5)
    setFormError('')
    setIsDrawerOpen(true)
  }

  // Ouvrir le tiroir pour la modification
  const openEditDrawer = (testimonial: Testimonial) => {
    setEditingTestimonial(testimonial)
    setClientName(testimonial.clientName)
    setRole(testimonial.role)
    setCompany(testimonial.company)
    setQuote(testimonial.quote)
    setRating(testimonial.rating)
    setFormError('')
    setIsDrawerOpen(true)
  }

  // Soumission du formulaire (création ou édition)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const formData = new FormData()
    formData.append('clientName', clientName)
    formData.append('role', role)
    formData.append('company', company)
    formData.append('quote', quote)
    formData.append('rating', rating.toString())

    startTransition(async () => {
      try {
        let res
        if (editingTestimonial) {
          res = await updateTestimonial(editingTestimonial.id, formData)
        } else {
          res = await createTestimonial(formData)
        }

        if (res?.success) {
          setIsDrawerOpen(false)
        } else {
          setFormError('Une erreur est survenue lors de la validation du témoignage.')
        }
      } catch (err: any) {
        setFormError(err.message || 'Une erreur inconnue est survenue.')
      }
    })
  }

  // Suppression d'un témoignage
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le témoignage de "${name}" ?`)) {
      startTransition(async () => {
        await deleteTestimonial(id)
      })
    }
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Bouton de création */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button onClick={openCreateDrawer} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} weight="bold" />
          <span>Add New Testimonial</span>
        </button>
      </div>

      {/* Table des témoignages */}
      <div className="glass-card" style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Client Name</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Company & Role</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Rating</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Quote</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {testimonials.length === 0 ? (
              <tr>
                <td colSpan={5} style={{ padding: '3rem 1.5rem', textAlign: 'center', fontFamily: 'var(--font-geist)', color: '#635848' }}>
                  Aucun témoignage enregistré en base de données.
                </td>
              </tr>
            ) : (
              testimonials.map((testimonial) => (
                <tr key={testimonial.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  {/* Nom du client */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.125rem', fontWeight: 600, color: '#F5EDD8', margin: 0 }}>
                      {testimonial.clientName}
                    </p>
                  </td>
                  {/* Compagnie & Rôle */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#F5EDD8', margin: 0 }}>
                      {testimonial.role}
                    </p>
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', color: '#A89880' }}>
                      {testimonial.company}
                    </span>
                  </td>
                  {/* Note */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <div style={{ display: 'flex', gap: '0.125rem' }}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          size={14}
                          weight={i < testimonial.rating ? 'fill' : 'regular'}
                          color={i < testimonial.rating ? '#BEFF39' : '#635848'}
                        />
                      ))}
                    </div>
                  </td>
                  {/* Témoignage */}
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#A89880', maxWidth: '300px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    "{testimonial.quote}"
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                      {/* Éditer */}
                      <button
                        onClick={() => openEditDrawer(testimonial)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A89880', padding: '0.25rem', transition: 'color 0.2s' }}
                        title="Éditer le témoignage"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#BEFF39')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A89880')}
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Supprimer */}
                      <button
                        onClick={() => handleDelete(testimonial.id, testimonial.clientName)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#635848', padding: '0.25rem', transition: 'color 0.2s' }}
                        title="Supprimer le témoignage"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#ff4444')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#635848')}
                      >
                        <Trash size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Tiroir d'édition coulissant premium (Drawer Overlay) */}
      {isDrawerOpen && (
        <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          background: 'rgba(0,0,0,0.6)',
          backdropFilter: 'blur(4px)',
          zIndex: 100,
          display: 'flex',
          justifyContent: 'flex-end',
          animation: 'fadeIn 0.2s ease-out',
        }}>
          {/* Clic en dehors pour fermer */}
          <div onClick={() => setIsDrawerOpen(false)} style={{ flex: 1, cursor: 'pointer' }} />
          
          {/* Contenu du tiroir */}
          <div style={{
            width: '100%',
            maxWidth: '520px',
            background: '#0A0806',
            borderLeft: '1px solid rgba(255,255,255,0.08)',
            padding: '2.5rem',
            overflowY: 'auto',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            boxShadow: '-10px 0 40px rgba(0,0,0,0.5)',
            transform: 'translateX(0)',
            transition: 'transform 0.3s var(--ease-out-expo)',
          }}>
            {/* En-tête du formulaire */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <p className="tech-label" style={{ marginBottom: '0.25rem' }}>
                  {editingTestimonial ? 'ÉDITION' : 'NOUVEL ENREGISTREMENT'}
                </p>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.75rem', color: '#F5EDD8', margin: 0 }}>
                  {editingTestimonial ? 'Edit Testimonial' : 'New Testimonial'}
                </h2>
              </div>
              <button
                onClick={() => setIsDrawerOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A89880', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = '#BEFF39')}
                onMouseLeave={(e) => (e.currentTarget.style.color = '#A89880')}
              >
                <X size={20} />
              </button>
            </div>

            {/* Formulaire */}
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              
              {/* Nom du client */}
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

              {/* Rôle & Compagnie (Côte à côte) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-field"
                    placeholder="e.g. Chief Executive Officer"
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
                    placeholder="e.g. Pantheon Industries"
                  />
                </div>
              </div>

              {/* Note (Rating 1-5) */}
              <div>
                <label className="form-label">Rating</label>
                <select
                  value={rating}
                  onChange={(e) => setRating(Number(e.target.value))}
                  className="form-field"
                  style={{ appearance: 'none', background: 'var(--obsidian-3) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23A89880\'%3E%3Cpath d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}
                >
                  <option value={5} style={{ background: '#0A0806' }}>5 Stars</option>
                  <option value={4} style={{ background: '#0A0806' }}>4 Stars</option>
                  <option value={3} style={{ background: '#0A0806' }}>3 Stars</option>
                  <option value={2} style={{ background: '#0A0806' }}>2 Stars</option>
                  <option value={1} style={{ background: '#0A0806' }}>1 Star</option>
                </select>
              </div>

              {/* Citation (Quote) */}
              <div>
                <label className="form-label">Quote</label>
                <textarea
                  required
                  rows={4}
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  className="form-field"
                  placeholder="Paste the testimonial quote here..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Erreur du formulaire */}
              {formError && (
                <div style={{ color: '#ff4444', fontFamily: 'var(--font-geist)', fontSize: '0.8125rem', background: 'rgba(255,68,68,0.1)', padding: '0.75rem 1rem', borderRadius: '4px', border: '1px solid rgba(255,68,68,0.2)' }}>
                  {formError}
                </div>
              )}

              {/* Actions de validation */}
              <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="btn-ghost"
                  style={{ flex: 1, justifyContent: 'center' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isPending}
                  className="btn-primary"
                  style={{ flex: 1, justifyContent: 'center', opacity: isPending ? 0.7 : 1, cursor: isPending ? 'not-allowed' : 'pointer' }}
                >
                  {isPending ? 'Saving...' : 'Save Testimonial'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
