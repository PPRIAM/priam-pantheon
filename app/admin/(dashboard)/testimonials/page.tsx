// Page de gestion des témoignages — liste et CRUD
import { getTestimonials } from '@/app/actions/testimonials'
import TestimonialsListClient from './TestimonialsListClient'

export default async function TestimonialsPage() {
  const testimonials = await getTestimonials()
  
  return (
    <div>
      <div style={{ marginBottom: '2rem' }}>
        <p style={{ fontFamily: 'var(--font-space-mono)', fontSize: '0.6875rem', letterSpacing: '0.15em', color: '#BEFF39', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Avis Clients</p>
        <h1 style={{ fontFamily: 'var(--font-playfair)', fontSize: '2.5rem', color: '#F5EDD8', lineHeight: 1.1 }}>Testimonials</h1>
        <p style={{ color: '#A89880', fontFamily: 'var(--font-geist)', marginTop: '0.5rem' }}>{testimonials.length} testimonial{testimonials.length !== 1 ? 's' : ''} in database</p>
      </div>
      <TestimonialsListClient initialTestimonials={testimonials} />
    </div>
  )
}
