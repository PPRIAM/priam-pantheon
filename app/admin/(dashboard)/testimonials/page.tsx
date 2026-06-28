// Page d'administration pour la gestion complète des témoignages clients (CRUD)
import { getTestimonials } from '@/app/actions/testimonials'
import TestimonialsManager from '@/components/admin/TestimonialsManager'

export default async function TestimonialsPage() {
  // Récupération initiale de la liste des témoignages depuis la base de données
  const testimonials = await getTestimonials()
  
  return (
    <div>
      {/* En-tête de la page d'administration des témoignages */}
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#BEFF39', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Avis Clients & Témoignages
        </p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#F5EDD8', lineHeight: 1.1 }}>
          Testimonials
        </h1>
        <p style={{ color: '#A89880', fontFamily: 'var(--font-geist)', marginTop: '0.5rem' }}>
          {testimonials.length} témoignage{testimonials.length !== 1 ? 's' : ''} enregistré{testimonials.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Composant principal de gestion CRUD des témoignages avec tiroir d'édition */}
      <TestimonialsManager testimonials={testimonials} />
    </div>
  )
}

