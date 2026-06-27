# Project Memory — PRIAM

## Overview
Project: priam-pantheon
Phase: done (Sprint 1-3 Health Fixes + Second Path Editorial Restructuring + Highlight.io Observability)
Decisions:
- Migrated inline SVG logo to physical `/logo-lime-v3.png` via Next.js `Image` component.
- Refactored `components/NavBar.tsx` to morph dynamically on scroll (y > 50px) into a floating centered glassmorphic dock (`max-w-[480px] h-14 rounded-full shadow-lg`).
- Improved transition choreography with asymmetric Tailwind animation classes to prevent text and icon overlaps during resizing.
- Integrated a rotating neon lime laser border of 1.5px thickness (Angle B) on the scrolled dock. Uses a conic-gradient pseudo-layer rotated infinitely in 4 seconds, masked inset by 1.5px with a `bg-[#050505]/90 backdrop-blur-2xl` inner background, maintaining high readability and glassmorphism.
- Re-architected site typography:
  - Loaded `Montserrat` via `next/font/google` and configured it as body font (`--font-montserrat` mapped to `--font-geist` for global body transition).
  - Defined `@font-face` rules for `GeoForm` (headings, `--font-geoform` mapped to `--font-playfair` for global heading transition) with Century Gothic fallback.
  - Defined `@font-face` rules for `Nagasaki` (display, `--font-nagasaki`) with Impact/Arial Black fallback stack.
  - Modified large display elements (Hero title, counter statistics, decorative backgrounds, and initials) to render in Nagasaki.
- Condensed central navigation links into Phosphor micro-icons (`Briefcase`, `Wrench`, `User`, `Envelope`) when scrolled, displaying the active section in electric lime.
- Collapsed right CTA button ("Let's Talk") into a magnetic circular icon button (`PaperPlaneTilt`) when scrolled, showing it on all screens (including mobile) to enhance responsiveness.
- Automatically closed mobile drawer menu on scroll to prevent overlapping layouts.
- Implemented Hero Section Concept 8 ("Macro Aura") with the Boss's portrait, applying a high-contrast grayscale filter, an electric lime drop shadow outline, and an infinitely scrolling Nagasaki text path.
- Updated Hero to Approach C (Asymmetric Overlap) by enlarging the portrait container to 560px and overlapping it slightly behind the text column with negative margins and z-index layers.
- Added a bottom gradient mask (`mask-image` linear gradient) to blend the portrait and its drop shadow smoothly into the void black background.
- Centered the Hero text completely and integrated two inline-flex badges (grayscale portrait + polyhedral rotating lime wireframe) directly inside the H1 Nagasaki title.
- Replaced GallerySection, SanctumSection, and TestimonialsSection with a single unified `ShowcaseBentoSection` using a CSS Grid layout on desktop (lg:grid-cols-4) and GSAP ScrollTrigger reveals.
- Target `#about` link to the stats bento sub-grid with a `scroll-mt-24` offset to keep spacing below the sticky nav bar.
- Added a 3-step process page section `HowItWorksSection` connected with dashed SVG arrows on desktop.
- Added an interactive local state-controlled accordion FAQ panel section `FAQsSection`.
- Integrated Highlight.io for full-stack observability. Added client-side `<HighlightInit>` in `app/layout.tsx` (using `recordHeadersAndBody: true` network capturing) and server-side instrumentation via root `instrumentation.ts` registration.
- Wrapped Next.js configuration in `next.config.ts` using `withHighlightConfig` to handle source map uploads. Next.js 16 handles instrumentation hook loading natively by default.
- Verified build and TypeScript type-checking cleanly under Next.js 16.2.9.
- Kept all source code comments in French.

## Sprint 1-3 Health Fixes (2026-06-26)
- **TD-09**: Auth hardened — plain-text password comparison replaced with `bcryptjs.compare()`. ADMIN_PASSWORD env var must now store a bcrypt hash.
- **TD-05**: IntersectionObserver duplication eliminated — TestimonialsSection migrated to GSAP ScrollTrigger (matches Gallery/Arsenal pattern).
- **TD-07**: OracleSection redundant client-side validation removed — API Zod validation is single source of truth. Enhanced error parsing for field-level Zod errors.
- **TD-08**: ESLint `no-explicit-any` changed from `off` to `warn` (soft re-enable).
- **TD-10/11**: `.gitignore` updated — `audit-report.html` added.
- **TD-13**: Dead code cleaned — `components/chambers/` (5 files) and `components/ui/ChamberLabel.tsx` deleted. ESLint ignore entries removed.
- All fixes verified with clean production build (8.5s compile, 14.8s TypeScript, 11/11 pages, zero errors).

## Task Registry
- ui-upgrader -> Refactor Logo.tsx -> DONE
- ui-upgrader -> Refactor NavBar.tsx -> DONE
- ui-upgrader -> Typographic Redesign (Nagasaki, GeoForm, Montserrat) -> DONE
- ui-upgrader -> Hero Section Redesign (Concept 8) -> DONE
- ui-upgrader -> Hero Section Approach C & Bottom Mask -> DONE
- ui-upgrader -> Persist UI/UX guidelines in .agents/AGENTS.md -> DONE
- ui-upgrader -> Verify build compiles cleanly -> DONE
- health-fixer -> TD-09 Auth Hardening (bcryptjs) -> DONE
- health-fixer -> TD-05 TestimonialsSection GSAP Migration -> DONE
- health-fixer -> TD-07 OracleSection Validation Cleanup -> DONE
- health-fixer -> TD-08 ESLint no-explicit-any -> warn -> DONE
- health-fixer -> TD-10/11 .gitignore Cleanup -> DONE
- health-fixer -> TD-13 Chambers Dead Code Cleanup -> DONE
- bento-builder -> Create ShowcaseBentoSection.tsx -> DONE
- sections-builder -> Create HowItWorksSection.tsx & FAQsSection.tsx -> DONE
- orchestrator -> page.tsx integration & navbar target links -> DONE
- orchestrator -> Verify build compiles cleanly -> DONE
- orchestrator -> Install Highlight.io SDK -> DONE
- orchestrator -> Configure Highlight client, server, and next.config -> DONE
- orchestrator -> Validate integration build compiles clean -> DONE

## Pending
- Boss must regenerate ADMIN_PASSWORD as bcrypt hash in `.env.local` (confirmed set up).

## Walkthrough Summary
All micro-interactions, scroll-driven navbar dock mechanics, rotating laser neon border, typography upgrades, editorial centered Hero section, consolidated Showcase Bento, HowItWorks process workflow, FAQs accordion, Highlight.io full-stack telemetry, and Sprint 1-3 health fixes have been fully implemented, integrated, and verified. See the full walkthrough log at [walkthrough.md](file:///C:/Users/Lenovo/.gemini/antigravity/brain/5f3f6acc-0cff-4bf4-891f-a579966c0c7b/walkthrough.md).
