# 01 — Product Requirements Document (PRD)
# PRIAM's Pantheon — Cinematic 3D Portfolio

---

## 1. Product Overview

**Product Name:** PRIAM's Pantheon  
**Owner:** Mike G. Nervil a.k.a PRIAM  
**Type:** Personal Portfolio Website  
**Primary Purpose:** Attract and convert business clients by demonstrating expertise in
graphic design and web development through a world-class immersive experience.

**Positioning Statement:**
> "A cinematic 3D portfolio that doesn't show work — it *immerses* visitors in it.
> PRIAM doesn't just design and build — he architects digital experiences."

---

## 2. Objectives

| Priority | Objective |
|---|---|
| 1 | Demonstrate premium creative and technical skill through the experience itself |
| 2 | Convert visitors into clients (graphic design + web dev inquiries) |
| 3 | Establish PRIAM's brand as Neo-Olympian — dark, mythological, precision-modern |
| 4 | Showcase mixed portfolio: brand identity, web dev, UI/UX, marketing assets |
| 5 | Be fully updatable via a single `data/projects.ts` — zero code knowledge required |

---

## 3. Target Audience

**Primary:** Business owners (SMBs, startups) who need graphic design and/or web development.  
**Secondary:** Creative agencies looking for freelance collaboration.  
**Mindset:** "I want someone whose work speaks for itself before I even read their bio."

---

## 4. Core User Journey

```
Visitor lands → cinematic 3D Pantheon entrance with PRIAM title
  ↓ scroll
Flies through the Arsenal (services: brand, web dev, UI/UX, marketing)
  ↓ scroll
Travels through the Gallery Wing (project work — 6 floating frames)
  ↓ scroll
Enters the Sanctum (who PRIAM is — portrait, stats, bio)
  ↓ scroll
Arrives at the Oracle (contact + hire CTA — altar glows lime)
  → clicks "Hire Me" → mailto:
```

---

## 5. Feature Requirements

### 5.1 Must-Haves (MVP)

- [ ] Full-viewport 3D canvas — the ENTIRE site IS the 3D Pantheon world
- [ ] Scroll-driven cinematic camera along a CatmullRomCurve3 path
- [ ] 5 chambers: Entrance, Arsenal, Gallery Wing, Sanctum, Oracle
- [ ] Bloom post-processing on lime elements — makes them glow
- [ ] Vignette post-processing — cinematic dark frame
- [ ] Minimal CSS overlay: PRIAM logo, 5-dot chamber nav, "Hire Me" CTA, scroll hint
- [ ] Project data driven by `data/projects.ts` (add/remove projects without coding)
- [ ] Contact via `mailto:` + social links (Instagram, LinkedIn, Behance)
- [ ] Suspense loading screen before 3D world renders
- [ ] Zero SSR hydration errors (canvas is client-only, dynamic import ssr:false)

### 5.2 Should-Haves (Phase 2)

- [ ] Mobile adaptive quality via `performanceMonitor` from @react-three/drei
- [ ] Real profile photo replacing picsum placeholder
- [ ] Resend API for contact form backend
- [ ] Vercel deployment with custom domain

### 5.3 Nice-to-Haves (Phase 3)

- [ ] Ambient epic/Greek cinematic audio with mute toggle
- [ ] Custom lime shader cursor trailing in 3D space
- [ ] Case study deep-dive modal per project
- [ ] Testimonials as a 6th chamber
- [ ] prefers-reduced-motion: static camera fallback

---

## 6. User Stories

| ID | As a... | I want to... | So that... |
|---|---|---|---|
| US-01 | Business owner | Experience the portfolio cinematically | I immediately gauge PRIAM's creative level |
| US-02 | Potential client | See what services are offered | I know if PRIAM can solve my problem |
| US-03 | Potential client | Browse real project work in the gallery | I can evaluate quality before reaching out |
| US-04 | Visitor | Learn who PRIAM is in the Sanctum | I feel confident trusting them with my brand |
| US-05 | Ready client | Find contact info easily at the Oracle | I can initiate a project without friction |
| US-06 | PRIAM | Update portfolio projects without coding | I can maintain the site myself |

---

## 7. Non-Functional Requirements

| Category | Requirement |
|---|---|
| **Performance** | Canvas renders at 60fps desktop; adaptive on lower-end devices |
| **SEO** | Metadata + OG image via Next.js `layout.tsx` Metadata API |
| **Browser Support** | Chrome, Firefox, Safari, Edge (last 2 major versions) |
| **WebGL** | Graceful fallback message if WebGL is unavailable |
| **Accessibility** | Tab-navigable overlay UI; ARIA labels on all interactive HTML overlay elements |

---

## 8. Success Metrics

- 3D world renders without errors on first visit
- All 5 chambers traversable via scroll
- "Hire Me" opens email client correctly
- Project data updates reflect immediately in dev
- Lighthouse Performance ≥ 70 (realistic for WebGL-heavy sites)
