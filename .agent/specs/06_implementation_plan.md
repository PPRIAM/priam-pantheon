# 06 — Implementation Plan
# PRIAM's Pantheon — Full 3D Cinematic Experience

---

## Decisions Locked

| Question | Answer |
|---|---|
| Camera transitions | ✅ Pure smooth — no fade-to-black |
| Ambient audio | ✅ Yes — Greek/epic ambient, muted by default, toggle button |
| Mobile strategy | ✅ Adaptive 3D — `performanceMonitor` reduces quality automatically |

---

## Prerequisites

```bash
# Installer le package post-processing (seul nouveau package requis)
npm install @react-three/postprocessing
```

Verify install: `node_modules/@react-three/postprocessing` exists.

---

## Phase 0 — Cleanup (Delete Old Architecture)

### Task 0.1 — Remove old component directories
```bash
# Supprimer les anciens composants remplacés par la nouvelle architecture
Remove-Item -Recurse -Force components\hero
Remove-Item -Recurse -Force components\nav
Remove-Item -Recurse -Force components\sections
Remove-Item -Recurse -Force components\gallery
```
**Verify:** `components/` contains only empty directory — no old files remain.

### Task 0.2 — Create new directory structure
```bash
mkdir components\scene
mkdir components\chambers
mkdir components\ui
mkdir types
mkdir public\audio
```
**Verify:** All 5 directories exist.

---

## Phase 1 — Foundation Files

### Task 1.1 — `types/data.ts`
Create TypeScript type definitions.
**Contents:** `Project`, `Service`, `SiteConfig`, `ProjectCategory` interfaces.  
**Verify:** `npx tsc --noEmit` — no type errors.

### Task 1.2 — `data/projects.ts`
Replace existing file with full seed data matching new type definitions.  
**Contents:** `siteConfig`, `projects[]` (6 items), `services[]` (4 items).  
**Verify:** Import in a test file, confirm all 3 exports are typed correctly.

### Task 1.3 — `app/globals.css`
Update existing CSS:
- Add `html, body { overflow: hidden; height: 100%; width: 100%; }` — ScrollControls manages scroll internally
- Add `#__next, main { height: 100%; }` — full height propagation
- Keep ALL existing design tokens, animations, and utility classes
- Add new utilities: `.chamber-label`, `.scroll-hint`, `.audio-btn`  

**Verify:** Dev server starts, no CSS parse errors.

### Task 1.4 — `app/layout.tsx`
Update metadata only:
```typescript
export const metadata = {
  title: "PRIAM's Pantheon — Creative Director & Web Architect",
  description: "Mike G. Nervil crafts digital experiences that elevate brands and drive growth.",
  openGraph: { title: "PRIAM's Pantheon", description: "...", type: "website" },
}
```
**Verify:** `<title>` tag appears correctly in browser dev tools.

---

## Phase 2 — UI Overlay Layer (CSS components, no 3D)

> Build overlays first — they're pure React/CSS and easiest to verify independently.

### Task 2.1 — `components/ui/Loader.tsx`
Loading screen (Suspense fallback):
- Full viewport obsidian background
- PRIAM wordmark centered (Cormorant Garamond 600, 48px, ivory)
- Thin lime line below: animates width 0% → 100% over 2s
- "ENTERING THE PANTHEON..." text below (Outfit 400, 12px, ivory-dim, letter-spacing 0.15em)
- `'use client'` — uses `useEffect` for progress animation

**Verify:** Temporarily set as static export in page.tsx, confirm visual renders correctly.

### Task 2.2 — `components/ui/ScrollHint.tsx`
- `'use client'`
- Fixed center-bottom position
- "SCROLL TO EXPLORE" + animated bouncing arrow (↓)
- Listens to scroll event via `useEffect` — sets `visible = false` when `scrollY > 0`
- **Note:** With ScrollControls, scroll is internal — listen to the ScrollControls scroll ref instead via `useScroll()`
- Fade-out: `opacity: 0, transition: 400ms` then unmount

**Verify:** Visible on load, disappears on first scroll action.

### Task 2.3 — `components/ui/ChamberLabel.tsx`
- `'use client'`
- Props: `{ offset: number }` (scroll offset 0→1)
- Derives current chamber from offset thresholds
- Fades in/out on chamber change
- Format: lime Roman numeral + ivory name — "I — The Entrance"

```typescript
const CHAMBERS = [
  { min: 0,    max: 0.20, label: 'The Entrance',    numeral: 'I'   },
  { min: 0.20, max: 0.40, label: 'The Arsenal',     numeral: 'II'  },
  { min: 0.40, max: 0.60, label: 'The Gallery Wing',numeral: 'III' },
  { min: 0.60, max: 0.80, label: 'The Sanctum',     numeral: 'IV'  },
  { min: 0.80, max: 1.00, label: 'The Oracle',      numeral: 'V'   },
]
```

**Verify:** Import in isolation, pass static offset values, confirm label changes.

### Task 2.4 — `components/ui/OverlayNav.tsx`
- `'use client'`
- Fixed position overlay (pointer-events: none on wrapper, auto on children)
- PRIAM logo: top-left, Cormorant Garamond
- Dot nav: center-bottom-left area, 5 dots
- Audio toggle: top-right (manages audio state with `useRef<HTMLAudioElement>`)
- "Hire Me" button: top-right (beside audio toggle)
- Accepts `{ offset, onJump }` props

**Audio implementation:**
```typescript
const audioRef = useRef<HTMLAudioElement | null>(null)
// Initialiser en mode muet — politique du navigateur
useEffect(() => {
  audioRef.current = new Audio(siteConfig.audioTrack)
  audioRef.current.loop = true
  audioRef.current.volume = 0.25
}, [])
```

**Verify:** All 4 elements render, audio toggle plays/pauses, dot clicks fire `onJump`.

---

## Phase 3 — 3D Environment

### Task 3.1 — `components/scene/Environment3D.tsx`
```typescript
// Éléments d'environnement: sol, brouillard, lumières ambiantes
```
- `<fog attach="fog" color="#0A0806" near={15} far={70} />`
- `<HemisphereLight skyColor="#0A0806" groundColor="#231E17" intensity={0.3} />`
- Floor plane: `PlaneGeometry(40, 200)`, rotated -90°X, centered at z=-80
- Dark marble material

**Verify:** Canvas renders without error, dark floor visible.

### Task 3.2 — `components/scene/Columns.tsx`
- Use `InstancedMesh` for performance
- 24 columns: 12 left (x=-6), 12 right (x=+6)
- Z positions: 0, -8, -16 ... -88 (every 8 units)
- Geometry: `CylinderGeometry(0.3, 0.4, 8, 12)`
- Single draw call via instancing

**Verify:** Draw call count in stats panel < 5 for columns despite 24 objects.

### Task 3.3 — `components/scene/Particles3D.tsx`
- `InstancedMesh` with `SphereGeometry(0.05, 4, 4)`
- 200 instances (desktop), prop-driven count
- `MeshBasicMaterial` lime — no lighting cost
- `useFrame`: each particle drifts upward, wraps when above starting Y
- Random XZ wobble using `Math.sin(time + seed)`

**Verify:** Particles visible, no performance regression (60fps on desktop).

### Task 3.4 — `components/scene/PostFX.tsx`
```typescript
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing'
```
- Wrapped in try/catch + conditional render (skip if `degraded` prop)
- Bloom: `luminanceThreshold={0.2} intensity={1.5} mipmapBlur`
- Vignette: `offset={0.1} darkness={0.6}`

**Verify:** Lime text/orbs glow visibly. Dark vignette frame visible at screen edges.

### Task 3.5 — `components/scene/CameraRig.tsx`
Core scroll-to-camera system:
```typescript
// Lecture du scroll et déplacement de la caméra le long de la courbe
const scroll = useScroll()
const curve = useMemo(() => new CatmullRomCurve3(WAYPOINTS), [])
const currentLookAt = useRef(new Vector3(0, 2, -20))

useFrame((state) => {
  const t = Math.min(scroll.offset, 0.999)
  const point = curve.getPointAt(t)
  state.camera.position.lerp(point, 0.05)
  
  // Interpolation douce de la cible
  const target = resolveLookAt(t)
  currentLookAt.current.lerp(target, 0.05)
  state.camera.lookAt(currentLookAt.current)
})
```

Expose `offset` via context or callback so UI overlays can read current chamber.

**Verify:** Camera moves smoothly along Z as user scrolls. No snap. No jump.

---

## Phase 4 — Chambers

### Task 4.1 — `components/chambers/EntranceChamber.tsx`
Position group: z = 0 to -30  
Contents:
- `<Text>` "PRIAM" — fontSize={8}, color="#BEFF39", position=[0, 4, -15]
- `<Text>` "Mike G. Nervil" — fontSize={1.2}, color="#F5EDD8", position=[0, 1.8, -15]
- `<Text>` "Creative Director & Web Architect" — fontSize={0.8}, ivory-dim, below
- Temple arch: `TorusGeometry` half-circle at z=-5, y=5
- SpotLight: lime, above entrance, intensity 1.2
- `<Html>` scroll hint integration (passed as child or prop)

**Verify:** PRIAM text glows lime (bloom). Architecture arch visible framing the entrance.

### Task 4.2 — `components/chambers/ArsenalChamber.tsx`
Position group: z = -35 to -65  
Contents:
- 4 plinths: `BoxGeometry(2, 1, 2)`, stone material, positions:
  - `[-4, 0.5, -48]`, `[4, 0.5, -48]`, `[-4, 0.5, -58]`, `[4, 0.5, -58]`
- 4 lime orbs above each: `SphereGeometry(0.3)`, lime emissive material
- `<Html>` service card on each plinth (from `services[]` data)
- SpotLight per plinth: lime, intensity 0.8
- Orb hover: `onPointerOver` → emissiveIntensity 3.0

**Verify:** 4 plinths visible with floating orbs. Service cards readable.

### Task 4.3 — `components/chambers/GalleryChamber.tsx`
Position group: z = -65 to -100  
Contents:
- 6 floating frames from `projects[]` data
- Frame geometry: `EdgesGeometry(BoxGeometry(4, 2.8, 0.05))` — outline only
- Lime emissive edges
- `<Html>` project card inside each frame
- Frame positions (3 per side):
  - Left: `[-8, 2, -72]`, `[-8, 2, -82]`, `[-8, 2, -92]`
  - Right: `[8, 2, -72]`, `[8, 2, -82]`, `[8, 2, -92]`
- Frames tilt slightly toward camera (rotateY ±0.15 rad)
- Hover: emissiveIntensity 1.5 → 4.0

**Verify:** 6 frames visible with project data. "View →" links open in new tab.

### Task 4.4 — `components/chambers/SanctumChamber.tsx`
Position group: z = -100 to -135  
Contents:
- Portrait frame: `PlaneGeometry(3, 3.5)`, lime border mesh, position [0, 3, -118]
- `<Html>` inside frame: portrait image (picsum placeholder, 300×350)
- 3 stat plinths in arc: `[-5, 0.5, -122]`, `[0, 0.5, -125]`, `[5, 0.5, -122]`
- `<Html>` on each stat: number + label (5+ Years / 40+ Projects / 20+ Clients)
- Roman arch entrance: two pillars + lintel at z=-105
- `<Html>` bio quote: `"I don't just design and build — I craft digital legacies."`
- Dimmer SpotLight: intimate lighting, intensity 0.6

**Verify:** Portrait frame visible. Stat plinths readable. Intimate atmosphere.

### Task 4.5 — `components/chambers/OracleChamber.tsx`
Position group: z = -135 to -165  
Contents:
- Altar: `RoundedBoxGeometry(3, 1, 3, 8, 0.2)`, marble material, position [0, 0.5, -155]
- Altar top `PlaneGeometry(2.5, 2.5)`: lime emissive, emissiveIntensity animated
- PointLight on altar: lime, animated intensity 1→3→1 (pulsing)
- Dense particles halo around altar
- `<Html>` contact panel above altar:
  - "Let's Build Something Great" (Cormorant 600, 32px)
  - "Ready to elevate your brand and digital presence?" (Outfit 400, 14px)
  - "Hire Me" button → `mailto:priamnervil@gmail.com`
  - Social links row: Instagram | LinkedIn | Behance

**Verify:** Altar pulses lime. Contact HTML panel readable. Hire Me opens email client.

---

## Phase 5 — Assembly

### Task 5.1 — `components/scene/Scene.tsx`
```typescript
// Assemblage complet de la scène 3D
export function Scene({ onOffsetChange }: { onOffsetChange: (v: number) => void }) {
  return (
    <>
      <CameraRig onOffset={onOffsetChange} />
      <Environment3D />
      <Columns />
      <Particles3D count={200} />
      <EntranceChamber />
      <ArsenalChamber />
      <GalleryChamber />
      <SanctumChamber />
      <OracleChamber />
      <PostFX />
    </>
  )
}
```

**Verify:** All chambers visible in correct Z positions. No Z-fighting. No missing components.

### Task 5.2 — `components/Experience.tsx`
```typescript
'use client'
// Canvas principal avec ScrollControls — point d'entrée de l'expérience 3D

export default function Experience() {
  const [offset, setOffset] = useState(0)

  return (
    <>
      {/* Canvas 3D — plein viewport */}
      <Canvas
        style={{ position: 'fixed', inset: 0 }}
        camera={{ fov: 60, near: 0.1, far: 200, position: [0, 2, 12] }}
        gl={{ antialias: true, alpha: false }}
      >
        <Suspense fallback={null}>
          <ScrollControls pages={8} damping={0.25}>
            <Scene onOffsetChange={setOffset} />
          </ScrollControls>
        </Suspense>
      </Canvas>

      {/* Overlays CSS au-dessus du canvas */}
      <Loader />  {/* Removed from DOM after load via state */}
      <OverlayNav offset={offset} />
      <ChamberLabel offset={offset} />
      <ScrollHint />
    </>
  )
}
```

### Task 5.3 — `app/page.tsx`
```typescript
// Import dynamique pour éviter le SSR du canvas WebGL
import dynamic from 'next/dynamic'
import Loader from '@/components/ui/Loader'

const Experience = dynamic(() => import('@/components/Experience'), {
  ssr: false,
  loading: () => <Loader />,
})

export default function Home() {
  return <Experience />
}
```

**Verify:** Page loads, Loader shows briefly, then 3D world appears.

---

## Phase 6 — Audio Asset

### Task 6.1 — Add ambient audio placeholder
```bash
# Télécharger un fichier audio placeholder royalty-free
# OR créer un silence MP3 1 seconde pour initialiser sans erreur
```
Place at: `public/audio/pantheon-ambient.mp3`  
**Verify:** Audio file exists, audio toggle button plays/pauses without console errors.

---

## Phase 7 — QA & Polish

### Task 7.1 — TypeScript validation
```bash
npx tsc --noEmit
```
Fix all type errors before proceeding.

### Task 7.2 — Build validation
```bash
npm run build
```
Must complete with 0 errors.

### Task 7.3 — Console audit
Open browser DevTools → Console:
- Zero React hydration errors
- Zero Three.js deprecation warnings
- Zero 404s on assets

### Task 7.4 — Performance check
- Install `<Stats />` from drei temporarily
- Confirm: 60fps desktop, draw calls < 80
- Remove `<Stats />` before final

### Task 7.5 — Scroll journey full walkthrough
1. Load `http://localhost:3000`
2. Confirm loading screen appears
3. Confirm loading screen disappears + 3D world appears
4. Scroll slowly — confirm camera moves smoothly (no snap)
5. Traverse all 5 chambers — confirm content visible in each
6. Test dot navigation — click each dot, confirm jump
7. Test "Hire Me" — confirm mailto opens
8. Test audio toggle — confirm play/pause
9. Test scroll back to top — confirm reverse journey smooth

### Task 7.6 — Mobile simulation
Open Chrome DevTools → Device Mode → iPhone 14  
- Confirm `performanceMonitor` triggers degraded mode
- Confirm experience still functional (lower quality, same content)

---

## File Manifest (complete)

```
types/
  data.ts                          [NEW]
data/
  projects.ts                      [MODIFY — full rewrite with types]
app/
  page.tsx                         [MODIFY — dynamic import only]
  layout.tsx                       [MODIFY — metadata update]
  globals.css                      [MODIFY — overflow:hidden + new utilities]
components/
  Experience.tsx                   [NEW — Canvas + ScrollControls root]
  scene/
    Scene.tsx                      [NEW]
    CameraRig.tsx                  [NEW]
    Environment3D.tsx              [NEW]
    Columns.tsx                    [NEW]
    Particles3D.tsx                [NEW]
    PostFX.tsx                     [NEW]
  chambers/
    EntranceChamber.tsx            [NEW]
    ArsenalChamber.tsx             [NEW]
    GalleryChamber.tsx             [NEW]
    SanctumChamber.tsx             [NEW]
    OracleChamber.tsx              [NEW]
  ui/
    OverlayNav.tsx                 [NEW]
    ChamberLabel.tsx               [NEW]
    ScrollHint.tsx                 [NEW]
    Loader.tsx                     [NEW]
public/
  audio/
    pantheon-ambient.mp3           [NEW — placeholder or real track]

DELETED:
  components/hero/                 [DELETE]
  components/nav/                  [DELETE]
  components/sections/             [DELETE]
  components/gallery/              [DELETE]
```
