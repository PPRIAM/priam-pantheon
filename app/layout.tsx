// Mise en page principale — PRIAM's Pantheon (Neo-Olympien 2D)
import type { Metadata } from "next";
import { Montserrat, Space_Mono } from "next/font/google";
import "./globals.css";
// Composant d'accessibilité — lien d'évitement WCAG 2.1 AA
import SkipLink from "@/components/ui/SkipLink";
// Analytics — Vercel Web Analytics
import { Analytics } from "@vercel/analytics/next";



// Police de corps principale — Montserrat (Géométrique et lisible)
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
  display: "swap",
});

// Police mono — étiquettes et accents
const spaceMono = Space_Mono({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-space-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "PRIAM | Creative Director & Experience Architect",
  description:
    "I help brands become unforgettable through strategic design, immersive digital experiences, and precise creative direction. Working globally.",
  keywords: [
    "creative director",
    "experience architect",
    "brand identity",
    "UI/UX design",
    "motion design",
    "Next.js",
    "PRIAM",
    "Mike Nervil",
    "portfolio",
    "digital experience",
  ],
  authors: [{ name: "Mike G. Nervil", url: "https://priam.design" }],
  openGraph: {
    title: "PRIAM | Creative Director & Experience Architect",
    description: "Design & Experience that wins clients.",
    type: "website",
    locale: "en_US",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${montserrat.variable} ${spaceMono.variable} antialiased relative`}
      >
        {/* Grain de bruit SVG global pour enrichir la profondeur tactile */}
        <div className="bg-noise-overlay" aria-hidden="true" />
        {/* Lien d'évitement — premier élément du body pour WCAG 2.1 AA */}
        <SkipLink />
        {children}
        <Analytics />
      </body>
    </html>
  );
}

