# Dark Mythos Design Tokens
> Source unique de vérité pour le système de design Neo-Olympien — PRIAM

---

## Couleurs

| Token | Valeur | Usage |
|-------|--------|-------|
| `--void-black` | `#050505` | Fond de page principal |
| `--obsidian` | `#050505` | Alias de void-black |
| `--obsidian-2` | `#0A0A0A` | Fonds de cartes |
| `--obsidian-3` | `#111111` | Surfaces surélevées, champs de saisie |
| `--obsidian-4` | `#1A1A1A` | Hover states, surfaces tertiaires |
| `--lime` | `#BEFF39` | Accent primaire, CTAs |
| `--lime-light` | `#D4FF72` | Lime au survol |
| `--lime-dim` | `#8BAF26` | Lime atténué, scrollbar |
| `--lime-glow` | `rgba(190,255,57,0.15)` | Effets de lueur |
| `--lime-border` | `rgba(190,255,57,0.25)` | Bordures accentuées |
| `--ivory` | `#F5EDD8` | Texte principal |
| `--ivory-dim` | `#A89880` | Texte secondaire, labels |
| `--ivory-muted` | `#635848` | Placeholder, texte désactivé |

---

## Bordures

| Token | Valeur | Usage |
|-------|--------|-------|
| `--border-subtle` | `rgba(255,255,255,0.05)` | Bordures très discrètes |
| `--border-mid` | `rgba(255,255,255,0.10)` | Bordures standard |
| `--border-bright` | `rgba(255,255,255,0.12)` | Bordures accentuées |
| `--glass-surface` | `rgba(255,255,255,0.03)` | Fond glassmorphique |
| `--glass-border` | `rgba(255,255,255,0.08)` | Bordure verre standard |
| `--glass-border-strong` | `rgba(255,255,255,0.15)` | Bordure verre forte |
| `--metallic` | `rgba(255,255,255,0.10)` | Bordure métallique argent |
| `--metallic-strong` | `rgba(255,255,255,0.20)` | Bordure métallique forte |

---

## Typographie

| Token | Police | Usage |
|-------|--------|-------|
| `--font-playfair` | `Playfair Display, serif` | H1-H3, titres display |
| `--font-geist` | `Geist, sans-serif` | Corps, UI, boutons |
| `--font-space-mono` | `Space Mono, monospace` | Labels, badges, code |

---

## Rayons

| Token | Valeur | Usage |
|-------|--------|-------|
| `--radius-sm` | `4px` | Boutons, petits éléments |
| `--radius-md` | `8px` | Champs, cartes moyennes |
| `--radius-lg` | `16px` | Modals, grandes cartes |

---

## Transitions

| Token | Valeur | Usage |
|-------|--------|-------|
| `--ease-out-expo` | `cubic-bezier(0.16,1,0.3,1)` | Toutes les transitions UI |

---

## Z-Index

| Token | Valeur | Usage |
|-------|--------|-------|
| `--z-base` | `1` | Éléments de base |
| `--z-overlay` | `50` | Overlays légers |
| `--z-nav` | `80` | Navigation |
| `--z-modal` | `100` | Modals, drawers |
| `--z-grain` | `200` | Texture grain (overlay fixe) |

---

## Classes Utilitaires

### Mise en page

| Classe | Description |
|--------|-------------|
| `.section-padding` | Espacement vertical 8rem / 10rem (lg) |
| `.section-container` | Conteneur centré 1400px max |
| `.bento-grid` | Grille bento 3 colonnes (responsive) |
| `.bento-cell` | Cellule bento avec hover |
| `.bento-cell-large` | Cellule occupant 2 colonnes |

### Surfaces et Effets Visuels

| Classe | Description |
|--------|-------------|
| `.glass-card` | Surface glassmorphique (--glass-surface, blur 24px) |
| `.premium-glass` | Surface de verre premium (blur 48px, fond transparent 3%, ombre interne) |
| `.metallic-border` | Bordure métallique argent avec gradient angulaire subtil |
| `.lime-glow-hover` | Lueur lime au survol (ring + glow) |
| `.grid-bg` | Fond grille Lime subtil 60px x 60px |
| `.hero-grid-bg` | Fond grille blanc pour le héro |
| `.shimmer` | Animation squelette de chargement |
| `.greek-key-border` | Bordure décorative lime (motif clé grecque) |

### Typographie

| Classe | Description |
|--------|-------------|
| `.font-display` | Playfair Display + Cormorant, weight 600 |
| `.font-ui` | Geist + Outfit, sans-serif |
| `.font-mono` | Space Mono, monospace |
| `.display-heading` | Titre éditorial clamp(2.5rem, 5vw, 4.5rem) avec Cormorant |
| `.section-heading` | Titre de section Playfair, weight 700 |
| `.section-eyebrow` | Surtitre mono, uppercase, lime |
| `.label-mono` | Étiquette mono, 0.75rem, tracking 0.12em |
| `.tech-label` | Badge technique mono, lime, 0.6875rem |
| `.form-label` | Label de formulaire, mono, ivoire atténué |

### Boutons et Interactions

| Classe | Description |
|--------|-------------|
| `.btn-primary` | Bouton Lime sur obsidien (forme pilule 9999px, CTA principal) |
| `.btn-ghost` | Bouton transparent avec bordure (forme pilule 9999px, secondaire) |

### Formulaires

| Classe | Description |
|--------|-------------|
| `.form-field` | Champ de saisie dark (--obsidian-3, focus lime) |
| `.form-label` | Label de champ mono uppercase |

### Badges

| Classe | Description |
|--------|-------------|
| `.category-badge` | Badge pill Lime (fond glow + bordure lime) |

### Animations

| Classe / Keyframe | Description |
|-------------------|-------------|
| `.animate-fade-up` | Entrée depuis le bas (fadeUp, 0.8s) |
| `.animate-fade-in` | Fondu (fadeIn, 0.6s) |
| `.shimmer` | Gradient animé pour squelettes |
| `@keyframes fadeUp` | opacity 0 to 1 + translateY 30px to 0 |
| `@keyframes fadeIn` | opacity 0 to 1 |
| `@keyframes glowPulse` | Pulsation de box-shadow lime |
| `@keyframes shimmer` | Défilement de gradient (loading states) |
| `@keyframes particleDrift` | Dérive de particules (héro) |

---

## Usage Rapide

### Carte glassmorphique
```html
<div class="glass-card lime-glow-hover p-8">Contenu</div>
```

### Titre éditorial
```html
<h2 class="display-heading">Titre Neo-Olympien</h2>
```

### Badge technique
```html
<span class="tech-label">Neo-Olympien</span>
```

### Champ de formulaire
```html
<input class="form-field" placeholder="Email..." />
```

### Squelette de chargement
```html
<div class="shimmer" style="height: 2rem; border-radius: 4px;"></div>
```

### Fond grille sur une section
```html
<section class="grid-bg section-padding">…</section>
```

---

*Généré automatiquement par Team 3 — Design System Integration — 2026-06-25*
