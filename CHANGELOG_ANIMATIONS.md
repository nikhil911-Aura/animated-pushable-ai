# Animation Changelog

## Scroll Animation Upgrade

### Infrastructure

- **`lib/lenis.tsx`** — `SmoothScrollProvider`: Lenis smooth scroll synced to GSAP ticker. Respects `prefers-reduced-motion`. Wrapped around entire app in `app/layout.tsx`.

- **`components/animation/useGSAP.ts`** — GSAP context hook with `ctx.revert()` cleanup and `prefers-reduced-motion` guard.

- **`components/animation/SplitText.tsx`** — Character-split text reveal. Animates `y:36 opacity:0 rotateX:-70 → rest`. Supports `onMount` or scroll-trigger mode.

- **`components/animation/FlowLine.tsx`** — Animated SVG path drawn between two element refs via `stroke-dasharray` draw-in on scroll.

- **`components/animation/PulseReveal.tsx`** — Wraps a child with a brand-accent glow pulse on scroll entry.

- **`components/animation/ScrollSection.tsx`** — Standardised ScrollTrigger wrapper: `pin`, `scrub`, `length`, `onProgress` callback.

- **`components/animation/MagneticButton.tsx`** — Cursor magnetism via `gsap.quickTo`. Translates toward cursor up to `maxDistance` px.

- **`components/animation/AnimationShell.tsx`** — Global shell: scroll progress bar (1px fixed top, `#a78bfa`), custom cursor follower (24×24 circle, `rgba(167,139,250,0.18)`, 80ms delay via `quickTo`).

---

### Per-Section

| Section | Animation |
|---|---|
| **Hero** | Node-field canvas (30–45 nodes, connecting lines `rgba(167,139,250,0.12)`); `SplitText` character reveal on mount for static headline parts; GSAP scroll exit scrub `scale:1→0.94 opacity:1→0.3 blur:0→6px`; `MagneticButton` on CTAs |
| **Trust** | Logo chips grayscale `0.7 / opacity 0.55` → full color on hover |
| **Agents** | Desktop: pinned horizontal scroll track with 4 full-viewport panels, `window.innerHeight × 3.5` scroll length, progress dots, snap; Mobile: vertical expand/collapse card fallback |
| **HowItWorks** | Pinned for `window.innerHeight × 2`, steps activate at progress `0.15 / 0.5 / 0.85`, animated fill line, inactive steps dimmed |
| **Demo** | GSAP scale `0.92 → 1` + fade on scroll entry |
| **Industry** | GSAP diagonal grid stagger `{ grid:[2,3], from:"start", axis:"y", amount:0.6 }` |
| **Pricing** | Featured plan infinite GSAP border-glow pulse; column entrance stagger |
| **Integrations** | 3 concentric orbital rings (radii 88/148/210px) with logos distributed across rings, alternating rotation directions, dashed connecting lines from hub |
| **WhyTrust** | GSAP 2×2 grid stagger on reason cards |
| **FinalCTA** | Aurora: 3 overlapping blurred radial gradients drifting 8–11s GSAP infinite (yoyo) |
| **FAQ** | Word-by-word reveal on answer expand (GSAP stagger 0.015s per word) |

---

## Signature Tile

**File:** `components/animation/SignatureTile.tsx`
**Placed:** between `<IndustrySection />` and `<PricingSection />` in `app/page.tsx`

### Spec

| Property | Value |
|---|---|
| Grid size | 32 × 32 (1024 cells). Fallback: drop to 24 × 24 if Lighthouse score drops > 3 pts |
| Character set | `["·", ":", "+", "×", "◦", "▪", "▫", "○", "∙", "/"]` — data/flow/network vocabulary |
| Colour split | ~4% `rgba(99,102,241,0.9)` (BRAND_PRIMARY), ~8% `rgba(167,139,250,0.9)` (BRAND_ACCENT), remainder `rgba(255,255,255,0.35)` |
| Edge cells (columns < 6 or > 25, i.e. outside tile bounds) | `rgba(255,255,255,0.12)` and faster fade-out (0.015 window vs 0.025) |
| Pin length | `+=150%` (1.5 × viewport height) |
| Scrub | `0.5` |
| PRNG | `mulberry32(seed=42)` — deterministic, no hydration mismatch |

### Scroll choreography

| Progress | Action |
|---|---|
| 0.00 – 0.15 | Tile enters: scale `0.85 → 1`, opacity `0 → 1` |
| 0.15 – 0.45 | Dissolution: grid fades in L → R (col 0 at 0.15, col 31 at 0.45). Logo mask shrinks `100% → 20%` |
| 0.45 – 0.55 | Peak fragmentation: full grid visible. Logo at 20%. Accent cells pulse `scale 1 → 1.3` (desktop only) |
| 0.55 – 0.85 | Reassembly: grid fades out L → R. Logo mask grows `20% → 100%` |
| 0.85 – 1.00 | Tagline reveals: line 1 fades + translates; line 2 character-by-character stagger |

### Fallbacks

- **`prefers-reduced-motion`**: No pin, no dissolution. Section shrinks to `min-h-[60vh]`. Tile, logo, and tagline render statically.
- **Mobile (< 768px)**: Accent-pulse sub-tween disabled. Grid still runs; dissolution/reassembly proceed normally.
- **Low-end devices**: Reduce grid to 24 × 24 (change `COLS = ROWS = 24`, `TOTAL = 576`) if Lighthouse performance score drops more than 3 points.
