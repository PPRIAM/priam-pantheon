# 02 — Technical Requirements Document (TRD)
# PRIAM's Pantheon — Cinematic 3D Portfolio

---

## 1. Stack Decision Matrix

| Concern | Decision | Version | Rationale |
|---|---|---|---|
| Framework | **Next.js App Router** | 16.2.9 | Already installed; SSG metadata for SEO |
| Language | **TypeScript** | ^5 | Type-safe Three.js objects and data models |
| 3D Engine | **Three.js** | ^0.184.0 | Industry standard; most ecosystem support |
| React 3D | **@react-three/fiber (R3F)** | ^9.6.1 | React-idiomatic Three.js; hook-driven |
| R3F Utilities | **@react-three/drei** | ^10.7.7 | ScrollControls, Html, Text, Environment |
| Scroll System | **ScrollControls (drei)** | built-in | Purpose-built for 3D scroll-driven camera |
| Text in 3D | **Text (troika-three-text)** | via drei | SDF font rendering, no font JSON needed |
| Post-FX | **@react-three/postprocessing** | ^3.x | Bloom + Vignette; compatible with R3F 9 |
| Animation | **GSAP** | ^3.15.0 | Overlay UI animations; timeline control |
| Styling | **Tailwind CSS v4** | ^4 | Utility classes for HTML overlay components |
| Icons | **@phosphor-icons/react** | ^2.1.10 | Clean icon set for service + social icons |
| Package Manager | **npm** | bundled | Already in use |

---

## 2. Architecture Overview

```
app/page.tsx  (Server Component — minimal shell)
  └── components/Experience.tsx  ('use client' — dynamic import, ssr:false)
        └── <Canvas>  (R3F, full viewport)
              └── <ScrollControls pages={8} damping={0.25}>
                    └── <Scene>
                          ├── <CameraRig>        ← reads useScroll, drives camera
                          ├── <Environment3D>    ← floor, fog, hemisphere light
                          ├── <Columns>          ← instanced corridor columns
                          ├── <Particles3D>      ← ambient lime dust particles
                          ├── <EntranceChamber>  ← t: 0.00–0.20
                          ├── <ArsenalChamber>   ← t: 0.20–0.40
                          ├── <GalleryChamber>   ← t: 0.40–0.60
                          ├── <SanctumChamber>   ← t: 0.60–0.80
                          ├── <OracleChamber>    ← t: 0.80–1.00
                          └── <PostFX>           ← Bloom + Vignette
```

CSS overlays (fixed position, pointer-events only on interactive elements):
```
components/ui/
  ├── OverlayNav.tsx     ← logo + 5-dot nav + Hire Me CTA
  ├── ChamberLabel.tsx   ← current chamber name, bottom-center
  ├── ScrollHint.tsx     ← "SCROLL TO EXPLORE" — fades after first scroll
  └── Loader.tsx         ← Suspense fallback loading screen
```

---

## 3. Camera System

### 3.1 Scroll Driver
```typescript
// ScrollControls wraps the entire scene
// useScroll() returns { offset: 0→1 }
// offset drives camera position along the curve
```

### 3.2 Camera Path — CatmullRomCurve3 Waypoints
```typescript
const CAMERA_WAYPOINTS = [
  new Vector3(0,  2,   12),   // Start: outside temple
  new Vector3(0,  1.5, -5),   // Entering arch
  new Vector3(0,  1,  -25),   // Inside entrance hall
  new Vector3(0,  1,  -45),   // Arsenal chamber
  new Vector3(2,  1.5,-60),   // Transition turn
  new Vector3(0,  1,  -80),   // Gallery midpoint
  new Vector3(-2, 2,  -105),  // Sanctum approach
  new Vector3(0,  1.5,-125),  // Sanctum center
  new Vector3(0,  1,  -160),  // Oracle altar
]
```

### 3.3 Look-At Targets (per chamber range)
```typescript
const LOOK_AT_TARGETS = [
  { range: [0, 0.2],   target: new Vector3(0, 2, -20)  },  // Entrance
  { range: [0.2, 0.4], target: new Vector3(0, 1, -45)  },  // Arsenal
  { range: [0.4, 0.6], target: new Vector3(2, 1, -80)  },  // Gallery
  { range: [0.6, 0.8], target: new Vector3(0, 2, -125) },  // Sanctum
  { range: [0.8, 1.0], target: new Vector3(0, 1, -160) },  // Oracle
]
```

### 3.4 useFrame Camera Update
```typescript
useFrame((state) => {
  const t = scroll.offset.current
  const point = curve.getPointAt(Math.min(t, 0.999))
  state.camera.position.lerp(point, 0.05)          // Smooth position
  currentTarget.lerp(resolvedTarget(t), 0.05)       // Smooth look-at
  state.camera.lookAt(currentTarget)
})
```

---

## 4. 3D Object Specifications

### 4.1 Shared Materials
```typescript
// Matériau de pierre sombre pour colonnes et sols
const stoneMat = new MeshStandardMaterial({
  color: '#1A1510',
  roughness: 0.9,
  metalness: 0.1,
})

// Matériau lime émissif pour les orbes et accents
const limeMat = new MeshStandardMaterial({
  color: '#BEFF39',
  emissive: '#BEFF39',
  emissiveIntensity: 1.5,
  roughness: 0.2,
  metalness: 0.1,
})
```

### 4.2 Instanced Columns
- Geometry: `CylinderGeometry(0.3, 0.4, 8, 12)` — tapered Doric column
- Count: 24 (12 each side)
- Spacing: every 8 units along Z from z=0 to z=-160
- Material: stone, no emissive

### 4.3 Floor
- `PlaneGeometry(40, 200)` rotated -90° on X
- MeshStandardMaterial: dark marble, roughness 0.8, metalness 0.2
- UVs tiled for grid/marble texture via `repeat`

### 4.4 Text Components (via drei `<Text>`)
- Entrance "PRIAM": font size 8, color `#BEFF39`, position [0, 4, -15]
- Subtitle "Mike G. Nervil": font size 1.2, color `#F5EDD8`, below
- All text: SDF anti-aliased, no font JSON needed

### 4.5 Post-Processing
```typescript
<EffectComposer>
  <Bloom
    luminanceThreshold={0.2}
    luminanceSmoothing={0.9}
    intensity={1.5}
    mipmapBlur
  />
  <Vignette eskil={false} offset={0.1} darkness={0.6} />
</EffectComposer>
```

---

## 5. HTML Overlay System

All interactive text/buttons rendered via drei `<Html>`:
- `occlude` prop: content hides when behind geometry
- `transform` prop: content scales with 3D perspective
- `portal` prop: renders into document body (avoids z-index stacking context issues)
- Styled with Tailwind classes and CSS custom properties from `globals.css`

---

## 6. Performance Constraints

| Constraint | Target |
|---|---|
| Draw calls | < 80 per frame |
| Triangle count | < 500k total scene |
| Particle count | 200 (instanced, single draw call) |
| Texture memory | < 64MB total |
| Shadows | Disabled (baked ambient occlusion via vertex color) |
| Mobile | `performanceMonitor` reduces particle count + disables postprocessing |

---

## 7. Next.js Configuration

```typescript
// next.config.ts
const config: NextConfig = {
  transpilePackages: ['three', '@react-three/fiber', '@react-three/drei'],
  experimental: { esmExternals: 'loose' },
}
```

Dynamic import in page.tsx:
```typescript
const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
  loading: () => <Loader />,
})
```

---

## 8. Packages to Install

```bash
npm install @react-three/postprocessing
```

All other packages already present in `package.json`.

---

## 9. File Deletion Plan

Remove (replaced by new architecture):
- `components/hero/` — entire directory
- `components/nav/` — entire directory  
- `components/sections/` — entire directory
- `components/gallery/` — entire directory
