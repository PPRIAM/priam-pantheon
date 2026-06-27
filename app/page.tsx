// Page d'accueil principale — PRIAM (Server Component avec fetch DB)
import NavBar from '@/components/NavBar'
import HeroSection from '@/components/sections/HeroSection'
import ShowcaseBentoSection from '@/components/sections/ShowcaseBentoSection'
import ArsenalSection from '@/components/sections/ArsenalSection'
import HowItWorksSection from '@/components/sections/HowItWorksSection'
import FAQsSection from '@/components/sections/FAQsSection'
import OracleSection from '@/components/sections/OracleSection'
import { getPublishedProjects } from '@/app/actions/projects'
import { getTestimonials } from '@/app/actions/testimonials'

// Page asynchrone — récupère les données en DB au rendu serveur
export default async function Home() {
  // Chargement parallèle pour réduire la latence totale
  const [projects, testimonials] = await Promise.all([
    getPublishedProjects(),
    getTestimonials(),
  ])

  return (
    <main id="main-content">
      <NavBar />
      <HeroSection />
      {/* Grille Bento Showcase remplaçant Gallery, Testimonials et Sanctum */}
      <ShowcaseBentoSection projects={projects} testimonials={testimonials} />
      <ArsenalSection />
      {/* Sections Processus et FAQ ajoutées pour la restructuration éditoriale */}
      <HowItWorksSection />
      <FAQsSection />
      <OracleSection />
    </main>
  )
}


