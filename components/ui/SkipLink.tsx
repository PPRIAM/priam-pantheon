// Lien d'accès rapide — Accessibilité WCAG 2.1 AA
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-[#BEFF39] focus:text-[#050505] focus:px-6 focus:py-3 focus:rounded-full focus:font-mono focus:text-xs focus:font-bold focus:uppercase focus:tracking-wider focus:outline-none focus:ring-2 focus:ring-[#BEFF39]"
    >
      Skip to main content
    </a>
  )
}
