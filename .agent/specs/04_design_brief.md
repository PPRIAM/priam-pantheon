# 04 — UI/UX Design Brief
# PRIAM's Pantheon — Neo-Olympian Cinematic Design System

---

## 1. Design Direction

**Aesthetic:** Neo-Olympian Dark Luxury  
**Reference archetype:** Ancient Greek mythology meets modern precision engineering.
Heavy on shadow. Lime cuts through like a ceremonial torch.
Architecture is structural, not decorative.

**Design pillars:**
1. **Darkness as canvas** — Obsidian black is not a background color, it IS the world
2. **Lime as sacred fire** — Used sparingly and intentionally; everything lime GLOWS
3. **Stone as structure** — All 3D geometry is rendered as dark stone/marble
4. **Editorial precision** — Typography is monumental; no small timid text
5. **Motion is cinematic** — Everything moves like a film camera, not a website

---

## 2. Color System

### 2.1 Core Palette (CSS Custom Properties)

```css
:root {
  /* Obsidian — primary surface */
  --obsidian:      #0A0806;   /* Base background / darkest dark */
  --obsidian-2:    #100D0A;   /* Card backgrounds */
  --obsidian-3:    #1A1510;   /* Elevated surfaces */
  --obsidian-4:    #231E17;   /* Hover states */

  /* Lime — sacred fire / accent */
  --lime:          #BEFF39;   /* Primary accent — used for glow, CTAs, active states */
  --lime-light:    #D4FF72;   /* Hover state for lime elements */
  --lime-dim:      #8BAF26;   /* Muted lime — secondary accents, borders */
  --lime-glow:     rgba(190, 255, 57, 0.15);  /* Glow fill */
  --lime-border:   rgba(190, 255, 57, 0.25);  /* Lime border tint */

  /* Ivory — text */
  --ivory:         #F5EDD8;   /* Primary text */
  --ivory-dim:     #A89880;   /* Secondary text / captions */
  --ivory-muted:   #635848;   /* Disabled / placeholder text */

  /* Structural borders */
  --border-subtle: rgba(245, 237, 216, 0.08);
  --border-mid:    rgba(245, 237, 216, 0.15);
}
```

### 2.2 3D Material Colors

| Material | Hex | Usage |
|---|---|---|
| Dark Stone | `#1A1510` | Columns, floor, walls, plinths |
| Marble | `#231E17` | Altar, pedestals — slightly lighter |
| Lime Emissive | `#BEFF39` | Orbs, text, altar glow — emissiveIntensity: 1.5 |
| Ambient Fog | `#0A0806` | Scene fog color — blends to darkness |

---

## 3. Typography

### 3.1 Font Stack

| Role | Font Family | Weight | Usage |
|---|---|---|---|
| Display / Monumental | Cormorant Garamond | 600 (SemiBold) | PRIAM title, chamber headings, section titles |
| UI / Functional | Outfit | 400, 500, 600 | Nav, buttons, labels, body text in Html overlays |
| 3D Text (in-world) | Troika SDF (via drei `<Text>`) | Bold | PRIAM wordmark, service names in 3D space |

### 3.2 Type Scale (CSS overlays)

```css
/* Échelle typographique éditoriale */
--text-xs:    0.75rem;    /* 12px — badges, labels */
--text-sm:    0.875rem;   /* 14px — captions, helper text */
--text-base:  1rem;       /* 16px — body copy */
--text-lg:    1.25rem;    /* 20px — lead text */
--text-xl:    1.5rem;     /* 24px — subheadings */
--text-2xl:   2rem;       /* 32px — chamber names */
--text-3xl:   3rem;       /* 48px — section display titles */
--text-hero:  clamp(4rem, 12vw, 10rem);  /* Hero PRIAM text in CSS overlays */
```

### 3.3 Type Rules
- Letter-spacing display: `-0.02em` — tight, monumental
- Letter-spacing UI uppercase: `+0.10em` — spaced small caps for labels
- Line-height display: `1.0` — compressed editorial
- Line-height body: `1.6` — comfortable reading
- **Never use font-weight 700+ on Cormorant** — 600 is the maximum before it loses elegance

---

## 4. Spacing System (4pt grid)

```
4px  →  0.25rem  → --space-1
8px  →  0.5rem   → --space-2
12px →  0.75rem  → --space-3
16px →  1rem     → --space-4
24px →  1.5rem   → --space-6
32px →  2rem     → --space-8
48px →  3rem     → --space-12
64px →  4rem     → --space-16
96px →  6rem     → --space-24
128px → 8rem     → --space-32
```

---

## 5. Component Design Specs

### 5.1 "Hire Me" CTA Button (overlay)
```
Background:  var(--lime)
Text color:  var(--obsidian)
Font:        Outfit 600
Size:        14px
Padding:     10px 20px
Border-radius: 4px
Hover:       background → var(--lime-light), translateY(-2px), box-shadow lime glow
Active:      scale(0.97)
Transition:  200ms cubic-bezier(0.16, 1, 0.3, 1)
```

### 5.2 Chamber Dot Navigation
```
Dot size:    8px × 8px
Shape:       Circle (border-radius: 50%)
Inactive:    background: var(--ivory-muted); opacity: 0.4
Active:      background: var(--lime); box-shadow: 0 0 8px var(--lime-glow)
Hover:       background: var(--ivory-dim); scale(1.2)
Gap between: 10px
Transition:  150ms ease
```

### 5.3 Chamber Label
```
Font:        Outfit 500, 11px, letter-spacing 0.15em, uppercase
Color:       var(--ivory-dim)
Position:    fixed, bottom: 2rem, left: 50%, transform: translateX(-50%)
Prefix:      Roman numeral "I — " in var(--lime)
Animation:   fadeIn 400ms ease when chamber changes, fadeOut 300ms on leave
```

### 5.4 PRIAM Logo (overlay)
```
Font:        Cormorant Garamond 600, 20px
Color:       var(--ivory)
Letter-spacing: -0.02em
Hover:       color → var(--lime), transition 200ms
Position:    fixed, top: 1.5rem, left: 2rem
```

### 5.5 Audio Toggle Button
```
Size:        36px × 36px
Shape:       Circle
Background:  rgba(10, 8, 6, 0.6), backdrop-filter: blur(12px)
Border:      1px solid var(--border-mid)
Icon:        Phosphor SpeakerHigh / SpeakerSlash
Icon color:  var(--ivory-dim)
Active:      icon → var(--lime), border-color → var(--lime-border)
Position:    fixed, top: 1.5rem, right: 7rem (left of Hire Me)
```

### 5.6 Html Project Frame Cards (inside 3D)
```
Width:       280px (scales with 3D perspective)
Background:  rgba(26, 21, 16, 0.92), backdrop-filter: blur(8px)
Border:      1px solid var(--lime-border)
Border-radius: 8px
Padding:     20px
Category badge: lime pill, uppercase 10px
Title:       Outfit 600, 16px, ivory
"View →":    lime color, Outfit 500, 14px
Hover whole card: border-color → var(--lime), scale(1.04)
```

### 5.7 Service Plinth Html Labels
```
Width:       200px
Text-align:  center
Service name: Outfit 600, 15px, ivory
Description: Outfit 400, 12px, ivory-dim
Icon:        Phosphor icon, 24px, lime
Layout:      flex-col, gap 8px
```

---

## 6. 3D Visual Design Specs

### 6.1 Lighting Setup
```
HemisphereLight:
  skyColor:     #0A0806 (obsidian)
  groundColor:  #231E17 (warm dark)
  intensity:    0.3

SpotLight per chamber:
  color:        #BEFF39 (lime)
  intensity:    0.8–1.5 (stronger at Oracle)
  penumbra:     0.5 (soft edge)
  decay:        2
  position:     above each chamber center

PointLight (Altar — Oracle only):
  color:        #BEFF39
  intensity:    animated 1→3→1 (pulse)
  distance:     15
  decay:        2
```

### 6.2 Fog
```
<fog attach="fog" color="#0A0806" near={15} far={70} />
```
Objects fade into obsidian darkness beyond 70 units — creates depth and mystery.

### 6.3 Particles (Particles3D)
```
Count:          200 (desktop) / 80 (mobile via performanceMonitor)
Size:           0.05–0.15 (random)
Color:          #BEFF39 (lime)
Material:       MeshBasicMaterial (no lighting cost)
Animation:      gentle upward drift, random XZ wobble, loop
Distribution:   spread across full Z path (-170 to +12)
```

### 6.4 Bloom (PostFX)
```
luminanceThreshold:  0.2   ← only emissive objects bloom
luminanceSmoothing:  0.9
intensity:           1.5
mipmapBlur:          true  ← softer, more natural glow
```
Effect: Lime text and orbs emit a soft divine glow. Stone surfaces are unaffected.

### 6.5 Vignette (PostFX)
```
eskil:    false
offset:   0.1
darkness: 0.6
```
Cinematic dark frame at screen edges — draws eye to center of each chamber.

---

## 7. Motion Design

### 7.1 Camera Motion
- Lerp factor: `0.05` (very smooth, cinematic drift)
- No easing curves needed — lerp handles it naturally
- Q1 decision: **Pure smooth, no fades between chambers**
- Camera never snaps or jumps

### 7.2 CSS Overlay Animations
```css
/* Fondu d'entrée de l'étiquette de chambre */
@keyframes chamberFadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
}

/* Indication de défilement */
@keyframes scrollBounce {
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(8px); }
}
```

### 7.3 Hover Micro-interactions
- All hover states: 150–200ms `cubic-bezier(0.16, 1, 0.3, 1)`
- 3D object hover: emissiveIntensity 1.5 → 3.0, scale 1.0 → 1.02
- Button hover: translateY(-2px) + lime glow shadow

---

## 8. Audio Design (Q2: Yes — ambient audio with toggle)

**Track type:** Greek/epic ambient — dark orchestral with subtle percussion
**Implementation:**
```typescript
// Fichier audio: /public/audio/pantheon-ambient.mp3
// Démarrage: muted by default, user must click toggle
const audio = new Audio('/public/audio/pantheon-ambient.mp3')
audio.loop = true
audio.volume = 0.25  // Subtil — ne doit pas distraire
```
- Default state: MUTED (never autoplay with sound — browser policy)
- Toggle icon: Phosphor `SpeakerSlash` (muted) / `SpeakerHigh` (playing)
- Volume: 25% — ambient, not dominant
- Source: royalty-free track (Boss to provide or use placeholder)

---

## 9. Responsive Behavior (Q3: Adaptive 3D)

| Device | Strategy |
|---|---|
| Desktop (> 1024px) | Full experience: 200 particles, bloom, vignette, all geometry |
| Tablet (768–1024px) | Reduced: 120 particles, bloom halved, vignette unchanged |
| Mobile (< 768px) | Minimal: 80 particles, bloom disabled, vignette only, shadows off |

`performanceMonitor` from `@react-three/drei` auto-detects FPS and adjusts quality:
```typescript
<PerformanceMonitor onDecline={() => setDegraded(true)}>
  {degraded ? <LowQualityScene /> : <FullScene />}
</PerformanceMonitor>
```

---

## 10. Loading Screen Design

```
Background: var(--obsidian) — full viewport
Center:     PRIAM wordmark (Cormorant Garamond, 600, 48px, ivory)
Below:      Thin lime progress line (width animates 0→100%)
Below:      "ENTERING THE PANTHEON..." — Outfit 400, 12px, ivory-dim, letter-spacing 0.15em
```
