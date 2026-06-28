// Script d'ensemencement — données initiales réelles (Single Source of Truth) pour la base de données
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  // Purge propre des données existantes
  await prisma.testimonial.deleteMany()
  await prisma.project.deleteMany()

  // Création des projets de démonstration réels (Ayibuzz Website & Xperience)
  await prisma.project.createMany({
    data: [
      {
        title: 'Ayibuzz Website',
        slug: 'ayibuzz-website',
        type: 'Développement Web',
        status: 'PUBLISHED',
        clientName: 'Ayibuzz Média',
        role: 'Lead Designer & Developer',
        problem: 'Ayibuzz Média faisait face à un défi majeur d\'orchestration : l\'absence d\'une infrastructure propre pour contrôler le flux de réservations et la billetterie de leurs évènements d\'envergure. Dépendre de plateformes tierces entraînait une perte de données stratégiques, une expérience utilisateur morcelée et une incapacité à valoriser pleinement l\'écosystème de leurs intervenants.',
        approach: 'Nous avons conçu une architecture numérique hautement modulable et évolutive. Notre méthodologie s\'est concentrée sur la fluidification du parcours d\'achat, la structuration claire des programmes par sessions thématiques, et la mise en scène éditoriale des profils d\'intervenants pour décupler la désirabilité de chaque édition.',
        solution: 'Déploiement d\'une plateforme web haut de gamme intégrant un moteur natif de création d\'évènements, un système d\'achat de billets fluide et sécurisé, et un annuaire interactif des intervenants. L\'interface allie sobriété néo-olympienne et micro-animations réactives pour garantir une conversion immédiate.',
        roi: '+350% de réservations directes',
        liveUrl: 'https://ayibuzz-media.com/',
        previewType: 'iframe',
      },
      {
        title: 'Xperience',
        slug: 'xperience',
        type: 'Développement Web',
        status: 'PUBLISHED',
        clientName: 'Kez Events',
        role: 'Lead Designer & Developer',
        problem: 'Kez Events avait besoin d\'une vitrine numérique captivante et singulière pour son évènement phare \'Xperience\'. L\'objectif était de casser les codes des sites de réservation traditionnels afin d\'attirer une audience jeune et exigeante, de susciter une fascination visuelle immédiate et de maximiser la réservation de places en ligne.',
        approach: 'Nous avons structuré une expérience utilisateur fluide organisée autour d\'une architecture maîtresse en 4 sections stratégiques. Cette approche rythmée égrène la valeur de l\'évènement de manière séquentielle tout en préservant l\'énergie brute et l\'identité graphique unique de la marque.',
        solution: 'Conception et développement d\'un site web à forte identité visuelle combinant un moteur de réservation rapide, une ergonomie UI/UX épurée et des animations sur mesure style \'Comic/Dark-Tech\'. Le résultat est une immersion sensorielle qui captive l\'utilisateur dès les premières secondes.',
        roi: '+280% de conversion en réservations',
        liveUrl: 'https://xperience-website-sable.vercel.app/',
        previewType: 'iframe',
      },
    ],
  })

  // Création des témoignages initiaux réels (Ayibuzz Média & Kez Events)
  await prisma.testimonial.createMany({
    data: [
      {
        clientName: 'Équipe Ayibuzz',
        role: 'Directeur des Opérations',
        company: 'Ayibuzz Média',
        quote: 'L\'architecture web développée par PRIAM a totalement transformé notre gestion événementielle. Le système de billetterie natif et l\'interface fluide nous ont permis d\'enregistrer une hausse de 350% des réservations directes dès le premier événement.',
        rating: 5,
      },
      {
        clientName: 'Direction Kez',
        role: 'Fondatrice & Event Producer',
        company: 'Kez Events',
        quote: 'Pour l\'événement Xperience, PRIAM a su traduire l\'essence de notre marque avec une direction artistique \'Comic/Dark-Tech\' percutante. La plateforme est non seulement visuellement spectaculaire, mais elle a généré une conversion record.',
        rating: 5,
      },
    ],
  })

  console.log('✅ Base de données ensemencée avec succès — 2 projets réels, 2 témoignages réels créés')
}

main()
  .catch((e) => {
    console.error('❌ Erreur lors de l\'ensemencement :', e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())

