---
version: alpha
name: Shopify
description: Shopify's marketing system pairs a crisp, high-contrast editorial layout with a confident black-and-white foundation and a signature Shopify green accent. Bright white surfaces carry near-black ink and Inter typography across a wide type ladder, while deep-black footer and dark hero surfaces provide dramatic contrast. Rounded pill CTAs, soft card radii and restrained hairline borders keep the feel modern, commercial and product-forward, with occasional electric violet and mint-green highlights.
colors:
  primary: "#008060"
  primary-mint: "#36F4A4"
  accent-violet: "#7126FF"
  ink: "#000000"
  ink-soft: "#18181B"
  body: "#303030"
  muted: "#71717A"
  muted-light: "#A1A1AA"
  surface: "#FFFFFF"
  surface-subtle: "#F4F4F5"
  surface-dark: "#061A1C"
  surface-dark-slate: "#2E3E48"
  hairline: "#E5E7EB"
  hairline-strong: "#D4D4D8"
  on-dark: "#FFFFFF"
  lilac: "#CEC9F8"
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 44px
    fontWeight: 330
    lineHeight: 1.1
    letterSpacing: -0.44px
  display-md:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: 360
    lineHeight: 1.2
    letterSpacing: -0.28px
  title-md:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: 450
    lineHeight: 1.3
  lead:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.4
  subtitle-strong:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 550
    lineHeight: 1.55
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-medium:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 420
    lineHeight: 1.5
  body-strong:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 550
    lineHeight: 1.5
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 420
    lineHeight: 1.45
  body-sm-light:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  caption:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 420
    lineHeight: 1.3
  label-caps:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 550
    lineHeight: 1
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 30px
  3xl: 48px
  pill: 9999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  base: 16px
  lg: 20px
  xl: 24px
  2xl: 32px
  3xl: 40px
  section: 80px
  gutter: 90px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline-strong}"
    borderWidth: 1px
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-cta-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-dark}"
    typography: "{typography.body-strong}"
    rounded: "{rounded.pill}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.xl}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    padding: 24px
  card-dark:
    backgroundColor: "{colors.surface-dark}"
    textColor: "{colors.on-dark}"
    rounded: "{rounded.3xl}"
    boxShadow: rgba(0, 0, 0, 0.25) 0px 10px 50px 0px, rgba(255, 255, 255, 0.25) 0px 0px 0px 1px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    typography: "{typography.body}"
    padding: 12px 16px
  input-focus:
    borderColor: "{colors.ink}"
    borderWidth: 2px
  badge:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.ink-soft}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 4px 12px
  navbar:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-dark}"
    height: 72px
    borderColor: "{colors.hairline}"
    borderWidth: 0px
    position: sticky
  nav-link:
    textColor: "{colors.on-dark}"
    typography: "{typography.body-sm}"
  footer:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.muted-light}"
    height: 565px
    columns: "5"
    borderColor: "{colors.hairline}"
    borderWidth: 0px
  footer-link:
    textColor: "{colors.muted-light}"
    typography: "{typography.body}"
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body-medium}"
---

# Shopify

## Overview

Shopify's marketing system is a confident, high-contrast editorial engine built on a black-and-white foundation with a signature green accent. The personality is commercial and product-forward but never corporate-safe: oversized display headlines (`display-lg` at 44px) break across multiple lines, candid lifestyle photography carries emotional warmth, and punchy motivational copy sets an aspirational register aimed at entrepreneurs and enterprise merchants alike.

Density is deliberately loose. Full-bleed sections stack in a single column with generous vertical rhythm (`spacing.section` — 80px between blocks), letting oversized type and imagery breathe. Hierarchy is manufactured almost entirely through **scale and tonal contrast** rather than decoration: bright white surfaces (`surface` — #FFFFFF) carry near-black ink, then abruptly hand off to deep-black hero and footer surfaces (`ink` — #000000) or green-black gradient panels for drama. Weight does light work — the display tiers are actually *lighter* than body (330–360 vs 400+) so size, not boldness, signals importance.

Shape and color keep the mood modern and approachable: pill CTAs, soft card radii, restrained hairline borders, and occasional electric violet or mint-green highlights punctuating an otherwise monochrome field.

**Key Characteristics:**
- Black-and-white foundation with a single **Shopify green** (`primary` — #008060) brand accent
- Oversized display type where hierarchy comes from scale, not weight
- Depth built from full-bleed tonal contrast between sections, not shadows
- Pill-shaped CTA buttons (`rounded.pill`) as the signature interactive shape
- Inter across the entire type ladder, from 12px caps to 44px display
- Generous 80px section spacing on a 4/8/16px base grid
- Dark hero and footer surfaces (`ink`, `surface-dark`) for dramatic contrast
- Electric violet (`accent-violet`) and mint (`primary-mint`) as sparing accent pops

## Colors

The palette is fundamentally monochrome — white and near-black do almost all the work — with Shopify green as the one true brand color and violet/mint reserved for rare accent moments. There are no decorative gradients in the token set; the visual gradients seen on hero panels are photographic/section treatments, not reusable tokens.

### Brand & Accent
- **Shopify Green** (`primary` — #008060): the signature brand accent, used for CTA fills (`button-cta-primary`) and occasional emphasis text. Appears sparingly (measured on 2 pages) — it is a punctuation color, not a field color.
- **Mint** (`primary-mint` — #36F4A4): an electric highlight for accents on dark surfaces; low-frequency, high-energy.
- **Electric Violet** (`accent-violet` — #7126FF): a bold section/accent color, observed as text on a single page's purple block. Use only as a deliberate pop.
- **Lilac** (`lilac` — #CEC9F8): a soft tint for occasional accent surfaces.

### Surface
- **Paper White** (`surface` — #FFFFFF): the dominant canvas; carries near-black ink across the marketing pages.
- **Subtle Gray** (`surface-subtle` — #F4F4F5): quiet zebra/section fill and the badge background.
- **Deep Forest** (`surface-dark` — #061A1C): the dramatic dark hero/card surface, near-black with a green cast.
- **Slate** (`surface-dark-slate` — #2E3E48): a secondary dark surface for layered dark panels.

### Text
- **Ink** (`ink` — #000000): pure-black headlines and primary text on light surfaces; also navbar and footer background.
- **Soft Ink** (`ink-soft` — #18181B): near-black for card body text, slightly softened.
- **Body Gray** (`body` — #303030): default paragraph ink where full black is too heavy.
- **Muted** (`muted` — #71717A) and **Muted Light** (`muted-light` — #A1A1AA): secondary and tertiary text; `muted-light` is the footer link color on black.
- **On Dark** (`on-dark` — #FFFFFF): text and CTA labels on dark surfaces.

### Hairlines & Borders
- **Hairline** (`hairline` — #E5E7EB): the default 1px divider and card/input border — by far the most-measured border color (used across all 8 pages).
- **Hairline Strong** (`hairline-strong` — #D4D4D8): a slightly heavier border, used on secondary button outlines.

There is no dark-mode token block. The system instead achieves its dark surfaces through explicit dark tokens (`surface-dark`, `ink`, `on-dark`) applied per-section, not through a global theme switch — builders should treat dark sections as intentional design choices, not a toggled theme.

## Typography

### Font Family
The entire system runs on **Inter** (shipped as `Shopify-Inter`, a self-hosted build). There is one family and one voice — no serif, no mono. A `ui-sans-serif` fallback appears in the evidence only where the custom font hadn't loaded. Inter's tight, neutral geometry supports the wide type ladder from 12px labels to 44px display.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `display-lg` | 44px | 330 | 1.1 | -0.44px | Oversized hero headlines |
| `display-md` | 28px | 360 | 1.2 | -0.28px | Section headlines |
| `title-md` | 20px | 450 | 1.3 | normal | Card titles, subheads |
| `lead` | 18px | 400 | 1.4 | normal | Intro / lead paragraphs |
| `subtitle-strong` | 18px | 550 | 1.55 | normal | Emphasized subheads, links |
| `body` | 16px | 400 | 1.5 | normal | Default paragraph text |
| `body-medium` | 16px | 420 | 1.5 | normal | Slightly emphasized body, links |
| `body-strong` | 16px | 550 | 1.5 | normal | Button labels, strong body |
| `body-sm` | 14px | 420 | 1.45 | normal | Nav links, secondary text |
| `body-sm-light` | 14px | 400 | 1.45 | normal | Fine secondary text |
| `caption` | 14px | 420 | 1.3 | normal | Captions, meta |
| `label-caps` | 12px | 550 | 1 | normal | Badge/eyebrow uppercase labels |

### Principles
- **Scale carries hierarchy, not weight.** The display tiers use *lighter* weights (330, 360) than body copy (400–550) — a deliberate inversion. Big text is thin and elegant; small text is where the boldest weights (550) live.
- **Fractional weights are intentional.** 330, 360, 420, 450, 550 are exact optical-size tunings of Inter's variable axis. Standard weight 500 is deliberately absent — the ladder jumps 450 → 550.
- **Negative tracking only on display.** Letter-spacing is tightened only at large sizes (-0.44px on `display-lg`, -0.28px on `display-md`); everything 20px and below runs at normal tracking.
- **Line-height loosens as text shrinks and tightens as it grows.** Display sits at 1.1–1.2; body opens to 1.5; the one outlier is `subtitle-strong` at 1.55 for comfortable multi-line reading.

### Note on Font Substitutes
Inter is open-source — use it directly (Google Fonts or npm `@fontsource/inter`). To match Shopify's tuning, enable the variable weight axis and set the exact numeric weights (330/360/420/450/550) rather than snapping to 400/500/600; also enable `opsz` optical sizing if available so large display text tightens correctly.

## Layout

### Spacing System
The base unit is 4px, expanding through a consistent scale: `spacing.xs` (4px), `spacing.sm` (8px), `spacing.md` (12px), `spacing.base` (16px), `spacing.lg` (20px), `spacing.xl` (24px), `spacing.2xl` (32px), `spacing.3xl` (40px), then a large jump to `spacing.section` (80px) for between-block rhythm and `spacing.gutter` (90px) for horizontal margins. The measured frequency confirms this: 16px and 24px dominate (component padding), with 80px and 90px as the section/gutter workhorses.

### Grid & Container
The page is a single-column, full-width sectional layout — full-bleed color and photographic sections stacked vertically, with content constrained inside a centered container padded by `spacing.gutter` (90px). Mid-page feature callouts use three-column card grids with consistent card padding (`card.padding` — 24px). The footer resolves to **5 columns** (`footer.columns`) of links.

### Whitespace Philosophy
Whitespace is generous and structural. The 80px `spacing.section` rhythm gives oversized headlines room to land, and abrupt tonal jumps between full-bleed sections (white → black → green) do the framing work that borders would in a denser system. Inside cards and controls the spacing tightens to 16–24px, creating a two-tier rhythm: airy between sections, compact within components.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Solid color block, no border | Full-bleed sections; depth from tonal contrast alone |
| 1 — Hairline | 1px `hairline` (#E5E7EB) border | Cards (`card`), inputs (`input`), dividers |
| 2 — Soft float | Soft drop shadow + 1px ring | Floating dashboard/phone mockups |
| 3 — Dramatic dark card | `rgba(0,0,0,0.25) 0px 10px 50px` + white 1px ring | `card-dark` on dark surfaces |

**Shadow philosophy.** Elevation comes primarily from surface change, not shadows. The dominant depth device is abrupt full-bleed tonal contrast — white handing to near-black (`ink`) or deep forest (`surface-dark`) — plus collage-style overlap of UI mockups. Real box-shadows are reserved for two jobs: the signature `card-dark` treatment, which pairs a wide soft ambient shadow (`0px 10px 50px` at 25% black) with a 1px translucent-white ring so dark cards separate from dark backgrounds; and floating product/dashboard screenshots that use layered soft shadows to imply a stacked, hovering collage. On light surfaces, cards stay flat with only a hairline — a deliberate restraint that keeps the editorial feel crisp.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `rounded.sm` | 4px | Small chips, subtle rounding |
| `rounded.md` | 8px | Input fields (`input`) |
| `rounded.lg` | 12px | Standard cards, panels |
| `rounded.xl` | 16px | Larger content cards (`card`) |
| `rounded.2xl` | 30px | Large rounded panels |
| `rounded.3xl` | 48px | Dramatic dark hero cards (`card-dark`) |
| `rounded.pill` | 9999px | All buttons, badges, chips |

The geometry is uniformly soft and organic-cornered — sharp corners are absent from the system. Radius scales with element size: small controls take 4–8px, content cards take 12–16px, and large statement surfaces round dramatically at 30–48px. The **pill** (`rounded.pill`) is the signature interactive shape, applied to every button (`button-primary`, `button-secondary`, `button-cta-primary`) and badge (`badge`). Circles recur as a motif too — overlapping circular avatar clusters appear in hero imagery. The overall effect is approachable and modern without feeling playful, because the softness is paired with high-contrast monochrome color.

## Components

### Navigation
**`navbar`** — A sticky top bar (`position: sticky`) standing 72px tall (`navbar.height`) on a black ground (`ink` — #000000) with white text (`on-dark`). It carries no visible border (`borderWidth: 0px`) and no backdrop blur. Nav links use `nav-link` styling: white text at 14px / weight 420 (`body-sm`). The header includes a CTA button (`hasCtaButton: true`). On mobile the full link set collapses to a hamburger icon plus a single visible CTA.

### Buttons
**`button-primary`** — The default action: solid black fill (`ink`), white label (`on-dark`), `body-strong` type, fully pill-shaped (`rounded.pill`), padded 12px 24px. High-contrast and confident.

**`button-secondary`** — White fill (`surface`) with black label (`ink`) and a 1px `hairline-strong` (#D4D4D8) outline, same pill shape and padding. The quiet companion to the primary.

**`button-cta-primary`** — The green conversion button: Shopify green fill (`primary` — #008060), white `body-strong` label, pill shape. Reserved for the highest-intent actions ('Kostenlos starten').

### Cards & Containers
**`card`** — White surface (`surface`), soft-ink text (`ink-soft`), 16px radius (`rounded.xl`), 1px `hairline` border, 24px padding. The flat, hairline-bounded default used in three-column feature grids.

**`card-dark`** — The dramatic variant: deep-forest surface (`surface-dark` — #061A1C), white text, heavily rounded at 48px (`rounded.3xl`), and lifted by the signature shadow (`0px 10px 50px` at 25% black plus a translucent-white 1px ring) so it reads on dark backgrounds.

### Inputs & Forms
**`input`** — White field with black text, 1px `hairline` border, 8px radius (`rounded.md`), `body` type, padded 12px 16px.

**`input-focus`** — On focus the border thickens to 2px and darkens to `ink` (#000000) — a simple, high-contrast focus signal with no glow.

### Badges & Chips
**`badge`** — Subtle-gray pill (`surface-subtle` — #F4F4F5) with soft-ink text, `label-caps` type (12px / 550 uppercase), pill radius, padded 4px 12px. Used for eyebrow labels and category tags.

### Links
**`link`** — Inline links take black text (`ink`) and `body-medium` (16px / 420) — emphasis by weight, not color, keeping the monochrome discipline.

### Footer
**`footer`** — A tall (565px) black section (`ink` — #000000) organized in 5 columns (`footer.columns`) of links. Link text (`footer-link`) is muted-light gray (`muted-light` — #A1A1AA) at 16px / weight 400 (`body`), with no border and no CTA. Roughly 30 links were measured across the columns, following the standard product/company/resource grouping pattern of a long-scroll marketing footer.

## Do's and Don'ts

### Do
- Do build hierarchy from **scale**: reach for `display-lg` (44px) and `display-md` (28px) and let their light weights (330/360) carry impact rather than bolding them.
- Do keep buttons fully pill-shaped (`rounded.pill`) — it's the system's signature interactive geometry across `button-primary`, `button-secondary`, and `button-cta-primary`.
- Do reserve Shopify green (`primary` — #008060) for the highest-intent CTA (`button-cta-primary`); everywhere else, actions stay black (`button-primary`).
- Do separate sections with abrupt tonal contrast (white `surface` → black `ink` → deep forest `surface-dark`) using `spacing.section` (80px) — that's how depth is made here.
- Do bound light cards with only a 1px `hairline` (#E5E7EB) and keep them flat; save shadows for `card-dark` and floating mockups.
- Do signal input focus with the 2px black border (`input-focus`), not a colored glow.

### Don't
- Don't introduce decorative gradients as tokens — the system has none; gradient hero panels are photographic treatments.
- Don't use weight 500 — the ladder deliberately jumps 450 → 550; snapping to 500 breaks the Inter optical tuning.
- Don't apply negative letter-spacing below 20px; tracking tightening is exclusive to `display-lg`/`display-md`.
- Don't scatter the accent colors (`accent-violet`, `primary-mint`, `lilac`) — they are rare punctuation, never field colors.
- Don't add borders to the navbar or footer; both run `borderWidth: 0px` on solid black (`ink`).
- Don't color inline links — keep them black (`ink`) with `body-medium` weight for emphasis instead.
- Don't tighten section rhythm below `spacing.section` (80px); the airy vertical whitespace is core to the editorial feel.

## Responsive Behavior

This is a **two-viewport analysis** (desktop and mobile captures only) — no intermediate breakpoint pixel values could be measured, so treat stacking as observed behavior rather than precise thresholds.

### Desktop → Mobile behavior
- The desktop single-column sectional layout stays single-column on mobile but condenses: the hero shrinks, oversized display type reflows across more lines, and three-column feature grids stack to one column.
- The 72px navbar (`navbar`) collapses its full link set into a hamburger icon plus a single visible CTA button — the header keeps one action reachable at all times.
- Pill CTAs (`rounded.pill`) and the email-capture input (`input`) are retained on mobile, going full-width in the stacked flow.
- The 5-column footer (`footer.columns`) reflows to stacked link groups.

### Touch targets
Button and input padding (12px vertical on `button-primary`/`input`, giving comfortable ~44px+ tap heights with their line-height) supports touch use without a separate mobile control set. Beyond these two captures, exact breakpoints and any tablet-specific reflow are unverified.

## Iteration Guide

1. **Edit tokens, not hex.** Always reference tokens (`colors.primary`, `rounded.pill`, `typography.display-lg`) so changes propagate; never hard-code #008060 or 9999px inline.
2. **Add button variants beside the existing three.** New actions should extend `button-primary`/`button-secondary`/`button-cta-primary` patterns — keep the pill radius and 12px 24px padding constant; vary only fill and text color.
3. **Respect the weight ladder.** When adding type styles, pick from the existing numeric weights (330/360/420/450/550). Do not introduce 500 or 600 — the absence of 500 is intentional.
4. **Keep the monochrome discipline.** The palette is black/white plus one green accent. Adding a new brand color is a boundary violation; violet, mint, and lilac exist only as sparing accents.
5. **Depth = surface change first.** Prefer new full-bleed tonal sections over adding shadows. If a dark card is needed, reuse the `card-dark` shadow-plus-ring recipe rather than inventing a new elevation.
6. **Section rhythm is fixed at 80px.** Use `spacing.section` between blocks and `spacing.gutter` (90px) for horizontal margins; component-internal spacing stays in the 16–24px band.
7. **Dark surfaces are per-section, not a theme.** There is no global dark mode — apply `surface-dark`/`ink` + `on-dark` deliberately where drama is wanted, and keep light `surface` as the default canvas.

## Known Gaps

- **Hover/active states unverified.** Tokens define default and `input-focus` states, but button and link hover, active, and disabled treatments were not captured.
- **Animation and transitions unknown.** Scroll behavior, reveal animations, and CTA micro-interactions on this long-scroll marketing site could not be measured from static captures.
- **Two-viewport responsive only.** Desktop and mobile were captured; exact breakpoints, tablet reflow, and mid-range column behavior are inferred, not measured.
- **Accent color usage is thin.** `accent-violet` (1 page), `primary-mint` (4 pages), and `lilac` (1 page) appear rarely in evidence, so precise application rules are uncertain.
- **Gradient panels not tokenized.** The green-to-black hero gradients seen in screenshots have no token — builders must recreate them as section-specific treatments.
- **Auth-walled and dashboard product surfaces** (the real Shopify admin, checkout) were not part of the capture set; this system describes marketing pages only.
- **Footer/nav link inventories** report aggregate counts (41 header, 30 footer links) that include mega-menu items; exact grouping and labels were not fully resolved.
