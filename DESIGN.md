# Design

<!-- impeccable:design-schema 1 -->

## World name

Coral & Mercy

## Direction contract

Seed key `8ead9b23` (Impeccable v4.0.4, `--scope direction --mode persuade`). Assigned index 7 of the resonance-ordered grounded shortlist. A church front door that proves welcome + the next service in the first viewport, refusing the generic "hero photo + verse + 3 cards" church template. Persistent Plan-Your-Visit path, not a brochure.

## Palette

RCCG-aligned: the denomination's established identity is a **red ring on white** (red = the Blood of Jesus, white = purity). The site uses RCCG red as the committed accent.

| Token | Hex | Role |
|---|---|---|
| `--ivory` | #FBF7F0 | Page ground |
| `--ivory-2` | #F4EDE2 | Alternate section ground |
| `--coral` | #C8102E | **RCCG red** — the single committed accent (buttons, pills, active states, logo ring) |
| `--coral-deep` | #9E0C22 | Hover / focus / links (deeper red) |
| `--coral-soft` | #F6DDE0 | Tints, focus rings, placeholder slots |
| `--sage` | #7C9A8C | Calm secondary (used sparingly, e.g. tile kicker) |
| `--walnut` | #34271F | Ink (warm near-black, never pure black) |
| `--walnut-soft` | #5B4A3E | Secondary text |
| `--line` | #E7DDCE | Hairlines on ivory |
| `--paper` | #FFFFFF | Cards |

Color commits at page scale: coral owns buttons, pills, active nav, the next-service CTA, and placeholder slots — not scattered as accents. Ground is warm ivory, not white.

## Type

- Display: **Instrument Serif** (free, Google Fonts) — warm, humanist, distinctive. Not on the convergent "AI" cluster (replaced Fraunces after the detector flagged overused-font).
- Body: **Figtree** (free, Google Fonts) — friendly, legible, off the overused cluster.
- Scale: h1 clamp(2.4rem, 6vw, 4rem); h2 clamp(1.9rem, 4vw, 2.8rem); body 17px / line-height 1.65; body measure capped at 62–75ch.
- Tracking: display headings -0.02em; never past -0.04em.

## Components (own-world, not stock)

- **Buttons:** pill-shaped (radius 999px), primary = coral fill with white text + soft shadow, ghost = ivory border that warms to coral on hover. One lift-on-hover transform.
- **Cards:** 14px radius, 1px `--line` border, soft offset shadow (`0 4px 14px -8px`), no ghost-card double-border+shadow.
- **Nav:** sticky, translucent ivory with backdrop blur, hairline bottom border. Persistent "Visit" CTA. Collapses to a hamburger under 760px.
- **Next-service strip:** dark walnut bar, white text, computed live from the service schedule (see `assets/js/main.js`).
- **Placeholder slots:** dashed coral border + coral-soft fill + "to be added" label — visibly marks every gap the church must fill. Honesty over invention.

## Layout & rhythm

- Container max-width 1140px, generous section padding `clamp(3.5rem, 7vw, 6rem)`.
- More space above a heading than below; tight groupings within a card, generous separation between sections.
- Responsive: 3-col → 2-col (≤900px) → 1-col (≤760px). Schedule table stays a table on desktop, stacks via grid on mobile.

## Motion

- One authored reveal moment: `.reveal` fades + lifts on intersection (exponential ease-out). No identical entrance on every section. Fully disabled under `prefers-reduced-motion`.

## Browser surfaces themed from palette

Focus rings (coral), selection (coral-soft), inputs (coral focus glow), scrollbar left default. No system font as display voice.

## Anti-slop notes

- Deliberately avoided the cream+terracotta AI cliché; coral is a softer, less saturated warm accent on ivory, paired with sage + walnut.
- No hero stock photo, no verse overlay, no kicker-above-heading, no section-numbering, no glass/gradient-text decoration.
- Detector ran in degraded (regex) mode; overused-font fired on the font URL string, not real usage. Em-dash findings are advisory and acceptable in short church copy.

## Accessibility

Target WCAG 2.1 AA. Semantic landmarks (header/main/footer/nav), labelled form fields, visible focus, AA-contrast palette, reduced-motion support, keyboard-operable nav.

## Maintainability (for a non-developer admin)

All tokens live in `:root` of `assets/css/styles.css`. Edit colors/spacing there. Service times are editable in `assets/js/main.js` (`SERVICES` array). Replace placeholder slots by editing the marked text. No build step; upload changed files to GitHub to publish.
