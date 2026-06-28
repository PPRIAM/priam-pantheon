'use client'

// Section FAQ — accordéon interactif avec transitions fluides et GSAP ScrollTrigger
import { useEffect, useRef, useState } from 'react'
import { Plus, Minus } from '@phosphor-icons/react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

// Données des questions fréquentes
const FAQS = [
  {
    question: 'Quelles sont vos spécialités principales ?',
    answer:
      'Je suis spécialisé en identité de marque, design UI/UX, direction artistique et développement web full-stack avec Next.js. Mon objectif est de créer des expériences numériques d\'exception qui génèrent des conversions.',
  },
  {
    question: 'Quel est votre délai d\'exécution habituel ?',
    answer:
      'La plupart des projets sont planifiés sur 2 à 6 semaines selon leur complexité. Les livrables plus ciblés comme les landing pages peuvent être livrés en 48 à 72 heures. Je fournis toujours un calendrier précis avant de débuter.',
  },
  {
    question: 'Quelle stack technique utilisez-vous ?',
    answer:
      'Next.js (App Router), React, TypeScript, TailwindCSS, GSAP pour les animations, Prisma pour les bases de données et Vercel pour le déploiement. Chaque outil est choisi pour sa performance et son expérience développeur.',
  },
  {
    question: 'Comment démarrer une collaboration ?',
    answer:
      'Tout commence par un appel de découverte gratuit. Je propose une phase de test — un livrable restreint et parfaitement défini — pour vous permettre d\'évaluer la qualité avant de vous engager sur un projet plus vaste.',
  },
  {
    question: 'Travaillez-vous avec des clients internationaux ?',
    answer:
      'Absolument. J\'ai réalisé des projets dans plus de 12 pays et 6 secteurs d\'activité. La communication s\'effectue en priorité de manière asynchrone, avec des points de synchronisation planifiés selon vos besoins.',
  },
]

// Composant individuel d'élément FAQ (panneau accordéon)
function FAQItem({
  faq,
  index,
  isOpen,
  onToggle,
}: {
  faq: (typeof FAQS)[0]
  index: number
  isOpen: boolean
  onToggle: () => void
}) {
  return (
    <div className="faq-item opacity-0">
      {/* Séparateur entre les éléments */}
      {index > 0 && <div className="h-px bg-white/5" />}

      <div
        className={`relative transition-all duration-300 ${
          isOpen ? 'border-l-2 border-[#BEFF39] pl-6' : 'border-l-2 border-transparent pl-6'
        }`}
      >
        {/* Bouton question — toute la ligne est cliquable */}
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between py-6 text-left group cursor-pointer"
          aria-expanded={isOpen}
        >
          {/* Texte de la question */}
          <span
            className={`text-lg font-bold leading-snug transition-colors duration-300 ${
              isOpen
                ? 'text-[#F5EDD8]'
                : 'text-[#F5EDD8] group-hover:text-[#BEFF39]'
            }`}
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            {faq.question}
          </span>

          {/* Icône Plus / Minus avec rotation */}
          <span
            className={`ml-4 flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full transition-all duration-300 ${
              isOpen
                ? 'bg-[#BEFF39]/10 text-[#BEFF39]'
                : 'bg-white/5 text-[#A89880] group-hover:text-[#BEFF39]'
            }`}
          >
            {isOpen ? (
              <Minus size={16} weight="bold" />
            ) : (
              <Plus size={16} weight="bold" />
            )}
          </span>
        </button>

        {/* Conteneur de la réponse — animation max-height + overflow-hidden */}
        <div
          className="overflow-hidden transition-all duration-500 ease-in-out"
          style={{
            maxHeight: isOpen ? '500px' : '0px',
            opacity: isOpen ? 1 : 0,
          }}
        >
          <p
            className="text-sm text-[#A89880] leading-relaxed pb-6 max-w-2xl"
            style={{ fontFamily: 'var(--font-geist), sans-serif' }}
          >
            {faq.answer}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function FAQsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)

  // État pour suivre quel élément FAQ est actuellement ouvert (un seul à la fois)
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  // Bascule d'ouverture/fermeture d'un élément
  const handleToggle = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index))
  }

  // Animation d'apparition au défilement avec GSAP ScrollTrigger
  useEffect(() => {
    const section = sectionRef.current
    const header = headerRef.current
    if (!section || !header) return

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })

    // Révélation de l'en-tête de section en premier
    tl.fromTo(
      header,
      { opacity: 0, y: 30 },
      { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }
    )

    // Révélation en cascade (stagger) des éléments FAQ
    const items = section.querySelectorAll('.faq-item')
    if (items.length > 0) {
      tl.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
        },
        '-=0.4'
      )
    }

    return () => {
      // Nettoyage des ScrollTriggers associées à cette section
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.trigger === section) trigger.kill()
      })
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative section-padding bg-[#050505]"
    >
      {/* Séparateur supérieur */}
      <div className="absolute top-0 left-6 right-6 md:left-12 md:right-12 h-px bg-white/5" />

      <div className="section-container">
        {/* En-tête de section */}
        <div ref={headerRef} className="mb-20 opacity-0">
          <p
            className="section-eyebrow"
            style={{ fontFamily: 'var(--font-space-mono)' }}
          >
            FAQ
          </p>
          <h2
            className="section-heading"
            style={{ fontFamily: 'var(--font-playfair), Georgia, serif' }}
          >
            Questions & Réponses
          </h2>
          <div className="divider-lime mt-4 mb-6" />
          <p
            className="font-sans text-base text-[#A89880] max-w-md leading-relaxed"
            style={{ fontFamily: 'var(--font-geist), sans-serif' }}
          >
            Les réponses aux questions les plus fréquentes sur le processus, la stack et les engagements.
          </p>
        </div>

        {/* Conteneur accordéon centré — largeur maximale 768px */}
        <div className="max-w-3xl mx-auto">
          {FAQS.map((faq, i) => (
            <FAQItem
              key={i}
              faq={faq}
              index={i}
              isOpen={openIndex === i}
              onToggle={() => handleToggle(i)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
