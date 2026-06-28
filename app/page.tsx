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
    <main id="main-content" className="relative overflow-hidden">
      <NavBar />
      <HeroSection />

      {/* Halos lumineux ambiants vert lime pour illuminer l'espace sombre */}
      <div
        className="ambient-spotlight w-[600px] h-[600px] top-[20%] -left-[200px]"
        aria-hidden="true"
      />
      <div
        className="ambient-spotlight w-[700px] h-[700px] top-[50%] -right-[250px]"
        aria-hidden="true"
      />
      <div
        className="ambient-spotlight w-[650px] h-[650px] top-[75%] left-[10%]"
        aria-hidden="true"
      />

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


