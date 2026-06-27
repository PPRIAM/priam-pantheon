'use client'
// Tableau interactif de gestion des projets avec tiroir d'édition/création coulissant
import { useState, useTransition } from 'react'
import { Project } from '@prisma/client'
import { toggleProjectStatus, deleteProject, createProject, updateProject } from '@/app/actions/projects'
import { Plus, ToggleLeft, ToggleRight, Trash, Pencil, X } from '@phosphor-icons/react'

interface ProjectTableProps {
  projects: Project[]
}

export default function ProjectTable({ projects }: ProjectTableProps) {
  const [isPending, startTransition] = useTransition()
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const [editingProject, setEditingProject] = useState<Project | null>(null)
  
  // États locaux des champs pour la synchronisation automatique du slug
  const [title, setTitle] = useState('')
  const [slug, setSlug] = useState('')
  const [type, setType] = useState('')
  const [status, setStatus] = useState<'DRAFT' | 'PUBLISHED'>('DRAFT')
  const [clientName, setClientName] = useState('')
  const [role, setRole] = useState('')
  const [problem, setProblem] = useState('')
  const [approach, setApproach] = useState('')
  const [solution, setSolution] = useState('')
  const [roi, setRoi] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [formError, setFormError] = useState('')

  // Génération automatique du slug à partir du titre
  const handleTitleChange = (val: string) => {
    setTitle(val)
    // Ne met à jour le slug que si nous sommes en création
    if (!editingProject) {
      const generated = val
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '') // Enlever les accents
        .replace(/[^a-z0-9 -]/g, '')     // Supprimer les caractères spéciaux
        .replace(/\s+/g, '-')            // Remplacer les espaces par des tirets
        .replace(/-+/g, '-')             // Supprimer les tirets répétés
        .trim()
      setSlug(generated)
    }
  }

  // Ouvrir le tiroir pour la création
  const openCreateDrawer = () => {
    setEditingProject(null)
    setTitle('')
    setSlug('')
    setType('')
    setStatus('DRAFT')
    setClientName('')
    setRole('')
    setProblem('')
    setApproach('')
    setSolution('')
    setRoi('')
    setCoverImage('')
    setFormError('')
    setIsDrawerOpen(true)
  }

  // Ouvrir le tiroir pour la modification
  const openEditDrawer = (project: Project) => {
    setEditingProject(project)
    setTitle(project.title)
    setSlug(project.slug)
    setType(project.type)
    setStatus(project.status as 'DRAFT' | 'PUBLISHED')
    setClientName(project.clientName)
    setRole(project.role)
    setProblem(project.problem)
    setApproach(project.approach)
    setSolution(project.solution)
    setRoi(project.roi || '')
    setCoverImage(project.coverImage || '')
    setFormError('')
    setIsDrawerOpen(true)
  }

  // Soumission du formulaire (création ou édition)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')

    const formData = new FormData()
    formData.append('title', title)
    formData.append('slug', slug)
    formData.append('type', type)
    formData.append('status', status)
    formData.append('clientName', clientName)
    formData.append('role', role)
    formData.append('problem', problem)
    formData.append('approach', approach)
    formData.append('solution', solution)
    formData.append('roi', roi)
    formData.append('coverImage', coverImage)

    startTransition(async () => {
      try {
        let res
        if (editingProject) {
          res = await updateProject(editingProject.id, formData)
        } else {
          res = await createProject(formData)
        }

        if (res?.success) {
          setIsDrawerOpen(false)
        } else {
          setFormError('Une erreur est survenue lors de la validation du formulaire.')
        }
      } catch (err: any) {
        setFormError(err.message || 'Une erreur inconnue est survenue.')
      }
    })
  }

  // Suppression d'un projet
  const handleDelete = (id: string, name: string) => {
    if (window.confirm(`Êtes-vous sûr de vouloir supprimer définitivement le projet "${name}" ?`)) {
      startTransition(async () => {
        await deleteProject(id)
      })
    }
  }

  // Inverser le statut d'un projet (PUBLISHED <-> DRAFT)
  const handleToggleStatus = (id: string, currentStatus: string) => {
    startTransition(async () => {
      await toggleProjectStatus(id, currentStatus)
    })
  }

  return (
    <div style={{ position: 'relative' }}>
      {/* Bouton de création */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '1.5rem' }}>
        <button onClick={openCreateDrawer} className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Plus size={16} weight="bold" />
          <span>Create New Project</span>
        </button>
      </div>

      {/* Table des projets */}
      <div className="glass-card" style={{ overflowX: 'auto', border: '1px solid rgba(255,255,255,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.08)', background: 'rgba(255,255,255,0.01)' }}>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Title</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Type</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Client</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Status</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase' }}>Date</th>
              <th style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.12em', color: '#A89880', textTransform: 'uppercase', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {projects.length === 0 ? (
              <tr>
                <td colSpan={6} style={{ padding: '3rem 1.5rem', textAlign: 'center', fontFamily: 'var(--font-geist)', color: '#635848' }}>
                  Aucun projet enregistré en base de données.
                </td>
              </tr>
            ) : (
              projects.map((project) => (
                <tr key={project.id} style={{ borderBottom: '1px solid rgba(255,255,255,0.04)', transition: 'background 0.2s' }} onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.02)')} onMouseLeave={(e) => (e.currentTarget.style.background = 'transparent')}>
                  {/* Titre */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <p style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.125rem', fontWeight: 600, color: '#F5EDD8', margin: 0 }}>
                      {project.title}
                    </p>
                    <span style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.625rem', color: '#635848' }}>
                      /{project.slug}
                    </span>
                  </td>
                  {/* Type */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    <span className="label-mono" style={{ fontSize: '0.6875rem', padding: '0.25rem 0.5rem', border: '1px solid var(--border-mid)', borderRadius: '4px', color: '#A89880' }}>
                      {project.type}
                    </span>
                  </td>
                  {/* Client */}
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-geist)', fontSize: '0.875rem', color: '#F5EDD8' }}>
                    {project.clientName}
                  </td>
                  {/* Statut */}
                  <td style={{ padding: '1rem 1.5rem' }}>
                    {project.status === 'PUBLISHED' ? (
                      <span style={{ display: 'inline-block', padding: '0.25rem 0.625rem', borderRadius: '4px', background: '#BEFF39', color: '#050505', fontFamily: 'var(--font-space-mono)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                        PUBLISHED
                      </span>
                    ) : (
                      <span style={{ display: 'inline-block', padding: '0.25rem 0.625rem', borderRadius: '4px', border: '1px solid rgba(255,255,255,0.2)', color: '#635848', fontFamily: 'var(--font-space-mono)', fontSize: '0.625rem', fontWeight: 700, letterSpacing: '0.05em' }}>
                        DRAFT
                      </span>
                    )}
                  </td>
                  {/* Date */}
                  <td style={{ padding: '1rem 1.5rem', fontFamily: 'var(--font-geist)', fontSize: '0.8125rem', color: '#A89880' }}>
                    {new Date(project.createdAt).toLocaleDateString('fr-FR', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </td>
                  {/* Actions */}
                  <td style={{ padding: '1rem 1.5rem', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', alignItems: 'center' }}>
                      {/* Basculer le statut */}
                      <button
                        onClick={() => handleToggleStatus(project.id, project.status)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: project.status === 'PUBLISHED' ? '#BEFF39' : '#635848', padding: '0.25rem', transition: 'color 0.2s' }}
                        title={project.status === 'PUBLISHED' ? 'Désactiver le projet' : 'Publier le projet'}
                      >
                        {project.status === 'PUBLISHED' ? <ToggleRight size={22} weight="fill" /> : <ToggleLeft size={22} />}
                      </button>

                      {/* Éditer */}
                      <button
                        onClick={() => openEditDrawer(project)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#A89880', padding: '0.25rem', transition: 'color 0.2s' }}
                        title="Éditer le projet"
                        onMouseEnter={(e) => (e.currentTarget.style.color = '#BEFF39')}
                        onMouseLeave={(e) => (e.currentTarget.style.color = '#A89880')}
                      >
                        <Pencil size={18} />
                      </button>

                      {/* Supprimer */}
                      <button
                        onClick={() => handleDelete(project.id, project.title)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#635848', padding: '0.25rem', transition: 'color 0.2s' }}
                        title="Supprimer le projet"
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
                  {editingProject ? 'ÉDITION' : 'NOUVEL ENREGISTREMENT'}
                </p>
                <h2 style={{ fontFamily: 'var(--font-playfair)', fontSize: '1.75rem', color: '#F5EDD8', margin: 0 }}>
                  {editingProject ? 'Edit Project' : 'New Project'}
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
              
              {/* Titre */}
              <div>
                <label className="form-label">Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  className="form-field"
                  placeholder="e.g. Oracle Chamber Redesign"
                />
              </div>

              {/* Slug */}
              <div>
                <label className="form-label">Slug (URL)</label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className="form-field"
                  placeholder="oracle-chamber-redesign"
                />
              </div>

              {/* Type & Client (Côte à côte) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Type</label>
                  <input
                    type="text"
                    required
                    value={type}
                    onChange={(e) => setType(e.target.value)}
                    className="form-field"
                    placeholder="e.g. Design & Art Direction"
                  />
                </div>
                <div>
                  <label className="form-label">Client</label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    className="form-field"
                    placeholder="e.g. Apollo Corp"
                  />
                </div>
              </div>

              {/* Rôle & ROI (Côte à côte) */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                <div>
                  <label className="form-label">Role</label>
                  <input
                    type="text"
                    required
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="form-field"
                    placeholder="e.g. Lead Designer"
                  />
                </div>
                <div>
                  <label className="form-label">ROI (Optional)</label>
                  <input
                    type="text"
                    value={roi}
                    onChange={(e) => setRoi(e.target.value)}
                    className="form-field"
                    placeholder="e.g. +140% Conversion"
                  />
                </div>
              </div>

              {/* Image de couverture */}
              <div>
                <label className="form-label">Cover Image URL</label>
                <input
                  type="url"
                  value={coverImage}
                  onChange={(e) => setCoverImage(e.target.value)}
                  className="form-field"
                  placeholder="https://images.unsplash.com/photo-..."
                />
              </div>

              {/* Statut */}
              <div>
                <label className="form-label">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as 'DRAFT' | 'PUBLISHED')}
                  className="form-field"
                  style={{ appearance: 'none', background: 'var(--obsidian-3) url("data:image/svg+xml,%3Csvg xmlns=\'http://www.w3.org/2000/svg\' viewBox=\'0 0 24 24\' fill=\'%23A89880\'%3E%3Cpath d=\'M7 10l5 5 5-5H7z\'/%3E%3C/svg%3E") no-repeat right 12px center', backgroundSize: '16px' }}
                >
                  <option value="DRAFT" style={{ background: '#0A0806' }}>DRAFT</option>
                  <option value="PUBLISHED" style={{ background: '#0A0806' }}>PUBLISHED</option>
                </select>
              </div>

              {/* Problème */}
              <div>
                <label className="form-label">Problem</label>
                <textarea
                  required
                  rows={3}
                  value={problem}
                  onChange={(e) => setProblem(e.target.value)}
                  className="form-field"
                  placeholder="Explain the client's problem..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Approche */}
              <div>
                <label className="form-label">Approach</label>
                <textarea
                  required
                  rows={3}
                  value={approach}
                  onChange={(e) => setApproach(e.target.value)}
                  className="form-field"
                  placeholder="Describe your design and strategic approach..."
                  style={{ resize: 'vertical' }}
                />
              </div>

              {/* Solution */}
              <div>
                <label className="form-label">Solution</label>
                <textarea
                  required
                  rows={3}
                  value={solution}
                  onChange={(e) => setSolution(e.target.value)}
                  className="form-field"
                  placeholder="Describe the final solution shipped..."
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
                  {isPending ? 'Saving...' : 'Save Project'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
