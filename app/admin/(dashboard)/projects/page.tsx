// Page de gestion des projets — liste et CRUD
import { getProjects } from '@/app/actions/projects'
import ProjectTable from '@/components/admin/ProjectTable'

export default async function ProjectsPage() {
  const projects = await getProjects()
  
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#BEFF39', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Référentiel</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#F5EDD8', lineHeight: 1.1 }}>Projects</h1>
        <p style={{ color: '#A89880', fontFamily: 'var(--font-geist)', marginTop: '0.5rem' }}>{projects.length} project{projects.length !== 1 ? 's' : ''} in database</p>
      </div>
      <ProjectTable projects={projects} />
    </div>
  )
}
