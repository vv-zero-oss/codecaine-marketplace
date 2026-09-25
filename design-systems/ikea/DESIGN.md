---
version: alpha
name: IKEA
description: IKEA's global storefront is warm, clean and utilitarian — a near-white off-cream canvas grounded by near-black ink text and the unmistakable IKEA yellow accent used sparingly for calls to action. The system leans on the humanist Noto IKEA typeface across a broad scale from oversized bold display headings down to compact captions, with generously rounded 8px surfaces, soft elevation and a disciplined, functional layout. Accents beyond the signature yellow (green, lilac, peach) appear as playful interactive highlights, while a stark black footer anchors the page.
colors:
  primary: "#FFDB00"
  ink: "#111111"
  ink-muted: "#818181"
  surface: "#FFFEFB"
  surface-inverse: "#000000"
  on-primary: "#111111"
  on-dark: "#FFFFFF"
  link: "#0000EE"
  accent-green: "#1A7E3B"
  accent-lilac: "#D9ABFF"
  accent-peach: "#FFAE66"
  accent-yellow-soft: "#FFF094"
  border: "#DADADA"
  border-strong: "#111111"
typography:
  hero-display:
    fontFamily: Noto IKEA
    fontSize: 82.2857px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -3.55102px
  display-lg:
    fontFamily: Noto IKEA
    fontSize: 45.7143px
    fontWeight: 700
    lineHeight: 1.1
    letterSpacing: -1.59184px
  display-md:
    fontFamily: Noto IKEA
    fontSize: 36.5714px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: -1.10204px
  title-md:
    fontFamily: Noto IKEA
    fontSize: 15.4px
    fontWeight: 600
    lineHeight: 1.2
    letterSpacing: normal
  body-lg:
    fontFamily: Noto IKEA
    fontSize: 20px
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: normal
  body:
    fontFamily: Noto IKEA
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  body-strong:
    fontFamily: Noto IKEA
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: normal
  body-sm:
    fontFamily: Noto IKEA
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: normal
  caption:
    fontFamily: Noto IKEA
    fontSize: 13.7143px
    fontWeight: 400
    lineHeight: 1.8
    letterSpacing: 0.0612245px
  button:
    fontFamily: Noto IKEA
    fontSize: 13.3333px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  label-caps:
    fontFamily: Noto IKEA
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: normal
rounded:
  sm: 2.5px
  md: 8px
  lg: 24px
  full: 9999px
spacing:
  xs: 6px
  sm: 8px
  md: 12px
  base: 16px
  lg: 20px
  xl: 24px
  2xl: 50px
  section: 60px
  3xl: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border-strong}"
    borderWidth: 1px
    typography: "{typography.button}"
  card:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: 8px
    boxShadow: rgba(0, 0, 0, 0.1) 0px 4px 15px 0px
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    rounded: 8px
    height: 50px
    padding: 16px
  chip:
    backgroundColor: "{colors.accent-yellow-soft}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  avatar:
    size: 42px
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: 96px
    borderColor: "{colors.border-strong}"
    borderWidth: 1px
    position: fixed
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  footer:
    backgroundColor: "{colors.surface-inverse}"
    textColor: "{colors.on-dark}"
    height: 872px
    position: relative
  footer-link:
    textColor: "{colors.on-dark}"
    typography: "{typography.body-lg}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body}"
---

# IKEA

## Overview

IKEA's global storefront is warm, clean and unapologetically utilitarian — a near-white off-cream canvas grounded by near-black ink text, with the unmistakable IKEA yellow reserved almost exclusively for action. The personality is editorial and homey: full-bleed lifestyle photography and solid color blocks carry the emotion, while the interface chrome stays quiet and functional. Hierarchy is built through scale and photography, not decoration — an oversized bold display headline sits above candid imagery, and the accent color appears only where a builder wants a click.

Density is generous but not sparse. The type scale spans an enormous range, from an 82px hero display down to a 12px uppercase label, and the spacing scale reaches a 96px (`{spacing.3xl}`) rhythm for major sections. Surfaces are softly rounded at 8px (`{rounded.md}`), elevation is almost entirely flat, and the layout follows a magazine-style asymmetric grid of image tiles that collapses cleanly into a single stacked column on mobile.

Contrast anchors the page: a stark black footer (`{colors.surface-inverse}` — #000000) closes every session against the off-cream body, and playful secondary accents (green, lilac, peach) appear as occasional interactive highlights rather than structural color.

**Key Characteristics:**
- Off-cream canvas (`{colors.surface}` — #FFFEFB) against near-black ink (`{colors.ink}` — #111111)
- IKEA yellow (`{colors.primary}` — #FFDB00) used sparingly and only for calls to action
- Single humanist typeface, Noto IKEA, across the entire scale
- Only three font weights in play: 400, 600, 700 — weight 500 is deliberately absent
- Soft 8px (`{rounded.md}`) rounded surfaces with tight negative letter-spacing on display type
- Flat elevation: depth comes from full-bleed photography and color blocks, not shadows
- A dramatic black footer anchoring the warm body
- Editorial photo-grid layout that stacks to one column on mobile

## Colors

The palette is disciplined: a warm neutral shell, near-black ink, and one loud brand yellow that does all the work of drawing the eye. Everything else is a supporting accent used in tiny quantities.

### Brand & Accent
- **IKEA Yellow** (`{colors.primary}` — #FFDB00): the signature. Reserved for primary action surfaces (the primary button) and small brand moments — never for large fields of text or background. Pair with `{colors.on-primary}` (#111111) ink for legible labels.
- **Soft Yellow** (`{colors.accent-yellow-soft}` — #FFF094): a gentle tint used for chips and highlight fills.
- **Accent Green** (`{colors.accent-green}` — #1A7E3B): a playful interactive highlight, appears sparingly.
- **Accent Lilac** (`{colors.accent-lilac}` — #D9ABFF): a decorative interactive accent.
- **Accent Peach** (`{colors.accent-peach}` — #FFAE66): a warm decorative block/accent color.

### Surface
- **Parchment** (`{colors.surface}` — #FFFEFB): the primary off-cream canvas for the body, cards, inputs and navbar. Warmer than pure white on purpose.
- **True Black** (`{colors.surface-inverse}` — #000000): the footer background — a deliberate high-contrast anchor at the bottom of the page.

### Text
- **Ink** (`{colors.ink}` — #111111): default body and heading text; the dominant color by weight across the page.
- **Muted Ink** (`{colors.ink-muted}` — #818181): secondary and supporting text, captions, de-emphasized metadata.
- **On-Dark** (`{colors.on-dark}` — #FFFFFF): text over the black footer and dark surfaces.
- **On-Primary** (`{colors.on-primary}` — #111111): ink used on top of yellow action surfaces.

### Links, Hairlines & Borders
- **Classic Link Blue** (`{colors.link}` — #0000EE): raw hyperlink blue, used for inline text links — a stark utilitarian choice against the warm palette.
- **Hairline** (`{colors.border}` — #DADADA): light 1px dividers and input outlines.
- **Strong Border** (`{colors.border-strong}` — #111111): the ink-colored 1px outline for secondary buttons and structural rules.

There are **no gradients** in this system — depth and color come from solid blocks and photography. The palette carries no dedicated dark-mode block; the black footer is a color choice within a single light theme, not a theming layer, so build for light only.

## Typography

### Font Family
The entire system is set in **Noto IKEA**, IKEA's proprietary humanist sans, at every level from hero to caption. There is no secondary typeface — the single-family discipline is a defining trait.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 82.29px | 700 | 1.1 | -3.55px | Oversized hero headlines |
| `{typography.display-lg}` | 45.71px | 700 | 1.1 | -1.59px | Large section display headings |
| `{typography.display-md}` | 36.57px | 700 | 1.15 | -1.10px | Story-block and mid-tier headings |
| `{typography.title-md}` | 15.4px | 600 | 1.2 | normal | Compact titles / subheads |
| `{typography.body-lg}` | 20px | 400 | 1.6 | normal | Lead paragraphs, footer links |
| `{typography.body}` | 16px | 400 | 1.5 | normal | Default body text, nav links |
| `{typography.body-strong}` | 16px | 700 | 1.15 | normal | Emphasized body / inline bold |
| `{typography.body-sm}` | 14px | 400 | 1.55 | normal | Secondary text, chip labels |
| `{typography.caption}` | 13.71px | 400 | 1.8 | 0.06px | Captions, fine print |
| `{typography.button}` | 13.33px | 400 | 1.5 | normal | Button labels |
| `{typography.label-caps}` | 12px | 700 | 1 | normal | Uppercase micro-labels / eyebrows |

### Principles
- **Only three weights exist:** 400 (regular), 600 (used exclusively for `{typography.title-md}`), and 700 (all display and emphasis). Do not introduce 500 or heavier cuts — they are deliberately absent.
- **Letter-spacing tightens as type grows:** display sizes pull negative (-3.55px at hero, -1.10px at display-md) for a condensed, confident headline; body and below stay at normal tracking. Only `{typography.caption}` uses a hair of positive tracking (0.06px).
- **Line-height loosens as type shrinks:** display sits tight at 1.1, body relaxes to 1.5–1.6, and captions open to 1.8 for legibility at small sizes.
- **Button text is notably small** (13.33px, weight 400) — the button relies on its yellow fill, not bold text, for prominence.

### Note on Font Substitutes
Noto IKEA is proprietary. Substitute with **Noto Sans** (the open-source family it derives from) or **Inter** as a fallback. Tune by applying the same aggressive negative letter-spacing on display sizes (roughly -0.04em) and keeping to weights 400/600/700 to preserve the ladder.

## Layout

### Spacing System
The spacing scale is broadly 4px-derived but pragmatic, running: `{spacing.xs}` (6px), `{spacing.sm}` (8px), `{spacing.md}` (12px), `{spacing.base}` (16px), `{spacing.lg}` (20px), `{spacing.xl}` (24px), `{spacing.2xl}` (50px), `{spacing.section}` (60px), `{spacing.3xl}` (96px). By measured frequency, 16px and 24px do the heaviest lifting for internal padding and gaps, while 60px and 96px separate major page sections.

### Grid & Container
The layout is an editorial, magazine-style grid of large asymmetric image tiles — a single-column full-bleed hero mixed with two-column story blocks, punctuated by a full-width color callout band. Imagery is full-bleed; caption content (eyebrow + bold headline) sits bottom-left over each image. Card interiors use 24px padding (`{components.card.padding}`). Exact column counts and container max-widths were not measurable from the single capture, so treat the grid as flexible asymmetric tiles rather than a fixed 12-column system.

### Whitespace Philosophy
Whitespace is generous and rhythmic. Sections breathe at the 60–96px scale while content packs tightly at 16–24px internally. The result is a calm, editorial cadence where photography and negative space — not borders — separate ideas.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, solid color or full-bleed image | Nearly everything — image tiles, CTA blocks, color bands, footer |
| Hairline | 1px border (`{colors.border}` #DADADA or `{colors.border-strong}` #111111) | Input outlines, secondary button outline, navbar rule |
| Soft shadow | `rgba(0,0,0,0.1) 0px 4px 15px 0px` | Cards (`{components.card}`) and the floating cookie-consent modal |

**Shadow philosophy.** Elevation comes from surface change and photography, not shadows. The system is almost entirely flat — depth is conveyed through full-bleed imagery and solid color blocks (yellow, orange). The single soft shadow in the token set is a low-opacity 4px/15px-blur lift used only for genuinely floating elements like cards and the consent modal. If you find yourself reaching for a shadow, ask whether a color block or image would carry the depth instead.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 2.5px | Barely-rounded small elements |
| `{rounded.md}` | 8px | Default — cards, inputs, surfaces |
| `{rounded.lg}` | 24px | Larger rounded containers |
| `{rounded.full}` | 9999px | Pills and circles |

The geometry is predominantly rectilinear: image tiles, CTA blocks and buttons use sharp or barely-rounded corners, giving the page an editorial, poster-like character. The dominant applied radius by far is 8px (`{rounded.md}`), which softens cards and inputs just enough to feel friendly without going bubbly. Fully rounded geometry (`{rounded.full}`) is reserved for small pill-shaped buttons (Accept / Reject / Cookie settings) and circular icon buttons (play/pause, arrow-in-circle) — note that the pill radius on primary/secondary buttons, chips and avatars was not observed in the capture, so apply `{rounded.full}` to those only where a pill or circle is genuinely intended.

## Components

### Navigation
**`navbar`** — A fixed-position bar (`{components.navbar.position}`) at 96px tall (`{components.navbar.height}`) on the off-cream surface (`{colors.surface}` #FFFEFB) with ink text (`{colors.ink}`). The evidence shows roughly 12 nav links set in `{typography.body}` (16px, weight 400, ink), and the header carries a CTA button. A 1px rule (`{colors.border-strong}`) is defined for the bar's edge; no backdrop blur is applied. Links are quiet text — the utilitarian hierarchy relies on position and iconography, not color.

**`nav-link`** — Ink text (`{colors.ink}`) in `{typography.body}` (16px/400). Understated by design.

### Buttons
**`button-primary`** — The signature action: IKEA yellow fill (`{colors.primary}` #FFDB00) with ink label (`{colors.on-primary}` #111111), `{typography.button}` (13.33px), padding 12px 24px. Small text, loud fill — the color is the emphasis.
**`button-secondary`** — Off-cream fill (`{colors.surface}`) with a 1px ink outline (`{colors.border-strong}`, 1px) and ink text, same `{typography.button}`. Used for secondary actions alongside the yellow primary.

### Cards & Containers
**`card`** — Off-cream surface (`{colors.surface}`), ink text, 8px radius (`{components.card.rounded}`), 24px padding, and the system's one soft shadow `rgba(0,0,0,0.1) 0px 4px 15px 0px`. The only genuinely elevated surface.
**`chip`** — Soft-yellow fill (`{colors.accent-yellow-soft}` #FFF094) with ink text in `{typography.body-sm}` (14px). A gentle highlight tag.
**`avatar`** — 42px square (`{components.avatar.size}`); intended circular where used.

### Inputs & Forms
**`input`** — Off-cream fill, ink text, 1px hairline border (`{colors.border}` #DADADA), 8px radius, 50px tall (`{components.input.height}`) with 16px padding — a comfortable, touch-friendly target.

### Links
**`link`** — Classic browser blue (`{colors.link}` #0000EE) in `{typography.body}` for inline text links — a stark, functional contrast against the warm palette.

### Footer
**`footer`** — The page's dramatic anchor: true-black background (`{colors.surface-inverse}` #000000) with white text (`{colors.on-dark}` #FFFFFF), relative position, and a tall 872px (`{components.footer.height}`) stack. Roughly 10 footer links render in `{typography.body-lg}` (20px, weight 400, white) — larger and more generous than the navbar's 16px links. No CTA button in the footer. Exact column counts weren't measurable, so treat it as a stacked multi-group link layout closing on legal fine print.

## Do's and Don'ts

### Do
- **Do** set all text in Noto IKEA (`{typography.body}` and siblings); it is the single voice of the system.
- **Do** restrict weights to 400, 600 and 700 — 600 only for `{typography.title-md}`, 700 for display and emphasis.
- **Do** reserve IKEA yellow (`{colors.primary}`) for calls to action and brand moments only, with ink labels (`{colors.on-primary}`).
- **Do** apply the tight negative letter-spacing on display type (`{typography.hero-display}` at -3.55px, `{typography.display-md}` at -1.10px) to keep headlines confident.
- **Do** default surfaces to the off-cream `{colors.surface}` (#FFFEFB) and 8px radius (`{rounded.md}`).
- **Do** let full-bleed photography and solid color blocks carry depth instead of shadows.
- **Do** use the black footer (`{colors.surface-inverse}`) with white text (`{colors.on-dark}`) as the page's closing anchor.

### Don't
- **Don't** introduce a second typeface — Noto IKEA is the entire system.
- **Don't** add weight 500 or heavier/lighter cuts beyond 400/600/700.
- **Don't** use yellow (`{colors.primary}`) for large text fields or background washes — it is an action color.
- **Don't** scatter drop shadows; the only shadow is `rgba(0,0,0,0.1) 0px 4px 15px 0px` on cards and modals.
- **Don't** recolor inline links away from the classic blue (`{colors.link}` #0000EE).
- **Don't** over-round structural tiles — keep image blocks and CTAs rectilinear; reserve `{rounded.full}` for pills and circular icon buttons.
- **Don't** deploy the playful accents (green, lilac, peach) as structural color — they are occasional interactive highlights.

## Responsive Behavior

This is a two-viewport analysis (desktop and mobile); no intermediate breakpoint pixel values were captured, so treat the transition as a single collapse rather than a defined series of breakpoints.

On desktop, the layout is an editorial grid of large asymmetric image tiles — a full-bleed hero mixed with two-column story blocks and a full-width color callout band ('Back at it!') carrying a mixed text + thumbnail row. On mobile, the grid collapses into a single stacked column of full-width cards, each preserving the same caption-overlay pattern: an eyebrow label plus bold headline anchored bottom-left of the image. The visual rhythm is maintained across both viewports.

Touch targets are sized generously — inputs stand 50px tall (`{components.input.height}`) and the navbar is 96px (`{components.navbar.height}`) — comfortable for both cursor and thumb. Exact column-count changes and gutter values beyond the single-column stack could not be verified from the two captures.

## Iteration Guide

1. **Reference tokens, never hex.** Change `{colors.primary}` or `{colors.surface}` at the token level so every button, card and surface updates coherently.
2. **Keep the type ladder intact.** Adjust roles by moving to the correct token (`{typography.display-lg}` vs `{typography.display-md}`), don't invent new sizes; the negative letter-spacing on display tiers is part of the brand and must scale with size.
3. **Preserve the three-weight rule.** Any new emphasis must resolve to 400, 600, or 700 — never introduce 500.
4. **Guard the yellow.** `{colors.primary}` is an action color. New CTAs live in `{components.button-primary}`; secondary actions use the outlined `{components.button-secondary}`.
5. **Elevation is flat by default.** New surfaces should rely on color blocks and photography; only reach for the single card shadow when an element genuinely floats.
6. **Radius stays at 8px.** Default new surfaces to `{rounded.md}`; reserve `{rounded.full}` strictly for pills and circular icon buttons.
7. **Unbreakable boundaries:** single typeface (Noto IKEA), off-cream body against black footer, blue inline links (`{colors.link}`), and sparing accent usage. Do not restyle these to match generic conventions.

## Known Gaps

- **Single page captured.** Only the homepage (`https://ikea.com/`) was analyzed; product-listing, product-detail, cart and account surfaces were not seen and may introduce components or patterns absent here.
- **Pill/circle radii unverified.** The `9999px` radius was dropped from `button-primary`, `button-secondary`, `chip` and `avatar` because it wasn't observed on the page — apply `{rounded.full}` to those only where a pill/circle is truly intended.
- **No hover/focus/active states.** Interactive state styling (button hover, link focus rings, input focus) was not captured and must be designed to spec.
- **No animation or motion data.** Transitions, carousel behavior and the play/pause interactions were not measured.
- **Grid metrics approximate.** Container max-widths, exact column counts and gutters could not be derived from a single capture; the footer's link-column structure (10 links, 872px tall) is known in totals but not in column layout.
- **Navbar border ambiguity.** Tokens define a 1px `{colors.border-strong}` navbar rule, but landmark evidence reported 0px border width — verify the header's actual divider treatment.
- **No dark theme.** The black footer is a design choice within one light theme; no dark-mode token block exists, so dark theming is undefined.
