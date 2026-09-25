---
version: alpha
name: Stripe
description: "Stripe's Dutch marketing site pairs a crisp, high-contrast editorial layout with deep navy ink on white surfaces and a signature indigo-violet accent. Typography is set entirely in the Söhne variable family across a light-to-medium weight ladder, giving a clean fintech tone. Elevated product cards float on soft layered shadows, hairline borders divide sections, and the vivid #635BFF / #533AFD accents drive links and CTAs."
colors:
  primary: "#635BFF"
  primary-strong: "#533AFD"
  ink: "#0A2540"
  ink-deep: "#061B31"
  body: "#3C4F69"
  muted: "#64748D"
  muted-light: "#707F98"
  footer-link: "#50617A"
  slate: "#273951"
  black: "#000000"
  surface: "#FFFFFF"
  surface-alt: "#F8FAFD"
  surface-tint: "#E5EDF5"
  hairline: "#E5EDF5"
  link-classic: "#0000EE"
  accent-orange: "#FF6118"
typography:
  display:
    fontFamily: sohne-var
    fontSize: 32px
    fontWeight: 700
    lineHeight: 1.5
    letterSpacing: normal
  title-lg:
    fontFamily: sohne-var
    fontSize: 26px
    fontWeight: 500
    lineHeight: 1.4
    letterSpacing: normal
  title-md:
    fontFamily: sohne-var
    fontSize: 18px
    fontWeight: 425
    lineHeight: 1.55
    letterSpacing: normal
  body-lg:
    fontFamily: sohne-var
    fontSize: 18px
    fontWeight: 300
    lineHeight: 1.55
    letterSpacing: normal
  body:
    fontFamily: sohne-var
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  body-strong:
    fontFamily: sohne-var
    fontSize: 15px
    fontWeight: 425
    lineHeight: 1.6
    letterSpacing: normal
  button:
    fontFamily: sohne-var
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: normal
  input:
    fontFamily: sohne-var
    fontSize: 15px
    fontWeight: 300
    lineHeight: 1.6
    letterSpacing: 0.2px
  body-sm:
    fontFamily: sohne-var
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: normal
  body-sm-light:
    fontFamily: sohne-var
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.3
    letterSpacing: normal
  caption:
    fontFamily: sohne-var
    fontSize: 14px
    fontWeight: 300
    lineHeight: 1.2
    letterSpacing: normal
  nav-link:
    fontFamily: sohne-var
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.3
    letterSpacing: normal
rounded:
  sm: 4px
  md: 8px
  pill: 16.5px
  round: 99px
spacing:
  2xs: 2px
  xs: 4px
  sm: 6px
  md: 12px
  lg: 16px
  xl: 24px
  2xl: 32px
  gutter: 20px
  section: 76px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.surface}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    padding: 12px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.primary}"
    typography: "{typography.button}"
    rounded: "{rounded.pill}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.input}"
    rounded: "{rounded.md}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    padding: 12px 16px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    boxShadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px
    padding: 24px
  card-elevated:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    boxShadow: rgba(50, 50, 93, 0.25) 0px 30px 60px -12px, rgba(0, 0, 0, 0.3) 0px 18px 36px -18px
  link:
    textColor: "{colors.primary-strong}"
    typography: "{typography.body-sm}"
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.black}"
    height: 76px
    borderWidth: 0px
    position: relative
  nav-link:
    textColor: "{colors.primary-strong}"
    typography: "{typography.nav-link}"
  footer:
    backgroundColor: "{colors.surface-alt}"
    textColor: "{colors.footer-link}"
    height: 1102px
    columns: "4"
    position: relative
  footer-link:
    textColor: "{colors.footer-link}"
    typography: "{typography.body}"
---

# Stripe

## Overview

Stripe's Dutch marketing site is a high-contrast editorial fintech system: deep navy ink on generous white surfaces, punctuated by a single vivid indigo-violet accent that carries every link and primary action. The personality is confident and technical but warm — headlines set in a clean, weight-light sans give an engineered, precision-instrument feel rather than playful startup energy, while enterprise logos and dense pricing tables signal business-grade credibility.

Density is editorial-generous. Sections breathe on a `{spacing.section}` (76px) vertical rhythm, cards carry roomy `24px` interior padding, and whitespace does most of the separation work. Hierarchy is built three ways: **color contrast** (navy `{colors.ink}` headings over `{colors.body}` body copy, with the indigo accent reserved for interaction), **type scale** (a 14→32px ladder), and **elevation** (product cards float on soft layered shadows over pale off-white backgrounds). Weight is used sparingly — most text sits at 300–425, so bold at 700 is a rare, deliberate emphasis.

The accent strategy is disciplined: **Indigo** (`{colors.primary}` — #635BFF) and its pressed sibling **Deep Indigo** (`{colors.primary-strong}` — #533AFD) are the only saturated hues in the core UI, everything else is navy, slate, or hairline gray. Diagonal gradient artwork supplies color and motion inside hero and feature panels without competing with the ink-on-white text system.

**Key Characteristics:**
- Navy-on-white palette with a single indigo-violet accent for all interaction
- One typeface family, Söhne variable (`sohne-var`), across a light-to-medium weight ladder
- Weight 300–425 dominates; 700 is reserved for the largest display headings
- Soft layered drop-shadows create card depth; the rest of the system is flat
- Hairline dividers (`{colors.hairline}` — #E5EDF5) separate sections and outline secondary controls
- Pill-shaped buttons (`{rounded.pill}`) against 8px-radius cards and inputs
- 76px section rhythm and 24px card padding create an airy, editorial density

## Colors

The palette is navy ink and white with one saturated accent. No decorative gradients live in the token system — the vivid diagonal gradients seen in screenshots are artwork inside panels, not UI color tokens.

### Brand & Accent
- **Indigo** (`{colors.primary}` — #635BFF): the signature Stripe accent; primary button fills, interactive highlights, active states.
- **Deep Indigo** (`{colors.primary-strong}` — #533AFD): the pressed/stronger accent; carries nav links, inline links, and hover/pressed treatments. In evidence it is the single most-used text accent (appears on 7 pages).
- **Accent Orange** (`{colors.accent-orange}` — #FF6118): a rare editorial highlight, seen on a single page — use sparingly, never as a primary action color.
- **Classic Link Blue** (`{colors.link-classic}` — #0000EE): default browser-link blue surfacing in unstyled/legal contexts; not a brand choice, avoid for designed UI.

### Surface
- **White** (`{colors.surface}` — #FFFFFF): the dominant canvas for pages, cards, inputs, and the navbar.
- **Off-White** (`{colors.surface-alt}` — #F8FAFD): the footer band and alternating section backgrounds; a barely-there cool tint.
- **Pale Slate Tint** (`{colors.surface-tint}` — #E5EDF5): subtle fills and tinted panels; shares its hex with the hairline.

### Text
- **Navy Ink** (`{colors.ink}` — #0A2540): primary headings and high-emphasis text.
- **Deep Navy** (`{colors.ink-deep}` — #061B31): the darkest ink, for maximum-contrast headings.
- **Body Slate** (`{colors.body}` — #3C4F69): default paragraph color and the single most-used text color across all 8 pages.
- **Muted Slate** (`{colors.muted}` — #64748D) and **Muted Light** (`{colors.muted-light}` — #707F98): secondary/caption text and metadata.
- **Slate** (`{colors.slate}` — #273951): a mid-dark text tone for specific dense contexts.
- **Footer Slate** (`{colors.footer-link}` — #50617A): footer link text against the off-white band.
- **Black** (`{colors.black}` — #000000): used structurally (nav text color reference) and in high-contrast contexts.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #E5EDF5): the 1px rule for section dividers, card outlines, secondary-button borders, and input borders. Confirmed as the dominant border color (28 border uses across 8 pages).

### Dark Mode
No dark-theme token block is defined. The system instead signals hierarchy through **color-contrast blocking** — dark navy pricing cards and dark footer bands — rather than a full dark-mode inversion. Builders should not invent a dark palette; use navy surfaces (`{colors.ink}` / `{colors.ink-deep}`) as intentional dark accents on an otherwise light system.

## Typography

The entire system is set in one variable typeface, exercised across a deliberately narrow, light-leaning weight range.

### Font Family
- **Söhne (`sohne-var`)**: the sole brand typeface, used for everything from 14px nav links to 32px display headings. Its variable axis lets the ladder run 300 → 700 without swapping fonts.
- **Arial**: a negligible fallback (17 occurrences across 5 pages) — the system substitute, not a design choice.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display}` | 32px | 700 | 1.5 | normal | Largest display / hero headings |
| `{typography.title-lg}` | 26px | 500 | 1.4 | normal | Section titles |
| `{typography.title-md}` | 18px | 425 | 1.55 | normal | Subheadings / card titles |
| `{typography.body-lg}` | 18px | 300 | 1.55 | normal | Lead paragraphs, intros |
| `{typography.body}` | 16px | 400 | 1.5 | normal | Default body copy |
| `{typography.body-strong}` | 15px | 425 | 1.6 | normal | Emphasized body / labels |
| `{typography.button}` | 14px | 400 | 1 | normal | Button labels |
| `{typography.input}` | 15px | 300 | 1.6 | 0.2px | Input / select text |
| `{typography.body-sm}` | 14px | 400 | 1.3 | normal | Small text, inline links |
| `{typography.body-sm-light}` | 14px | 300 | 1.3 | normal | List items, fine print |
| `{typography.caption}` | 14px | 300 | 1.2 | normal | Captions, metadata |
| `{typography.nav-link}` | 14px | 400 | 1.3 | normal | Navbar links |

### Principles
The weight ladder is intentionally light: 300 for body and captions, 400/425 for default and emphasis, 500 for section titles, and a single jump to 700 only at 32px display. Weight 600 is absent, and 500 appears only once — emphasis comes from size and color, not heavy strokes. Letter-spacing is essentially normal throughout; the only tracked exception is inputs at 0.2px (and an observed -0.42px on certain tightened hero headings). Line-height widens for reading text (1.55–1.6 for body and inputs) and tightens for compact UI (1.0 on buttons, 1.2–1.3 on captions and small text) — a clear split between reading comfort and control compactness.

### Note on Font Substitutes
Söhne is a proprietary Klim Type Foundry face. For open-source rebuilds, **Inter** is the closest stand-in — set it at the same weights (300/400/425→450/500/700) and expect slightly wider glyphs; nudge letter-spacing marginally negative on large headings to match Söhne's tighter display fit. Manrope is a secondary option if a more geometric feel is acceptable.

## Layout

### Spacing System
The scale is built on a 4px base and runs: `{spacing.2xs}` 2px, `{spacing.xs}` 4px, `{spacing.sm}` 6px, `{spacing.md}` 12px, `{spacing.lg}` 16px, `{spacing.xl}` 24px, `{spacing.2xl}` 32px, plus `{spacing.gutter}` 20px for column gutters and `{spacing.section}` 76px for vertical section separation. In evidence, 4px, 16px, 12px, and 32px dominate — the everyday rhythm of padding and gaps.

### Grid & Container
Desktop uses a clean multi-column grid: 2-up and 3-up card mosaics for feature showcases, and a left-nav / right-detail split on the pricing page for dense reference content. Column gutters run at `{spacing.gutter}` (20px). The footer is a 4-column link layout (`{components.footer.columns}`). The header stands 76px tall (`{components.navbar.height}`). Exact page max-width was not measured; treat the container as a centered, generously margined column consistent with Stripe's editorial grid.

### Whitespace Philosophy
Whitespace is the primary separator. Sections are spaced on the 76px rhythm, cards carry 24px interior padding (`{components.card.padding}`), and hairline rules (`{colors.hairline}`) handle finer division. Content breathes — the density is deliberately editorial, letting navy headings and gradient artwork land without clutter. Mobile preserves card spacing while collapsing multi-column mosaics into a single stacked column.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | No shadow, white or off-white fill (`{colors.surface}` / `{colors.surface-alt}`) | Page backgrounds, footer band, most sections |
| 1 — Hairline | 1px `{colors.hairline}` border, no shadow | Secondary buttons, inputs, section dividers, tinted panels |
| 2 — Resting card | `{components.card.boxShadow}` — layered `rgba(50,50,93,0.25) 0 13px 27px -5px` + `rgba(0,0,0,0.3) 0 8px 16px -8px` | Feature tiles, pricing cards, standard floating cards |
| 3 — Elevated card | `{components.card-elevated.boxShadow}` — `rgba(50,50,93,0.25) 0 30px 60px -12px` + `rgba(0,0,0,0.3) 0 18px 36px -18px` | Modals, hero product cards, form overlays |
| Contrast block | Dark navy fill instead of shadow | 'Maatwerk' pricing card, dark footer accents |

**Shadow philosophy.** Elevation is a two-tier soft-shadow system: the same navy-tinted double shadow scales up (13/27px → 30/60px) to signal how far a surface floats above the page. Shadows are diffuse and colored (a subtle navy `rgba(50,50,93,0.25)` cast, not neutral gray) so cards feel like they belong to the palette rather than dropping generic black. Crucially, depth is optional — most of the system is flat, and Stripe frequently swaps elevation for **color-contrast blocking** (dark navy panels) to mark the highest-priority surfaces. Hairline borders, not shadows, do the everyday separating work.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 4px | Small chips, tags, subtle roundings (most-used radius, all 8 pages) |
| `{rounded.md}` | 8px | Cards, inputs, panels — the default surface radius |
| `{rounded.pill}` | 16.5px | Pill buttons (primary and secondary CTAs) |
| `{rounded.round}` | 99px | Fully rounded / circular elements, avatars, icon badges |

The geometry is soft but precise: medium-radius rounded rectangles unify buttons, cards, inputs, and icon badges into one approachable family. The character split is deliberate — **8px** for surfaces (cards, inputs) reads engineered and calm, while **pill** (16.5px) buttons and **99px** circles add friendliness at the interactive layer. Diagonal gradient bands cutting across sections provide the only angular counterpoint to an otherwise orthogonal, gently-rounded grid. Circles (99px / 50%) are reserved for icons and avatar-scale elements, not containers.

## Components

### Navigation
**`navbar`** — A 76px-tall bar (`{components.navbar.height}`) on a white surface (`{components.navbar.backgroundColor}`), positioned `relative` with no border (`borderWidth: 0px`) and no backdrop blur. It carries exactly **4 nav links** styled in `{typography.nav-link}` (14px/400 Söhne) colored Deep Indigo (`{colors.primary-strong}` — #533AFD), and it includes a CTA button (`hasCtaButton: true`). On mobile the links collapse behind a hamburger menu.

**`nav-link`** — Deep Indigo text (`{colors.primary-strong}`) at 14px/400; compact 1.3 line-height. Used for the primary header navigation.

### Buttons
**`button-primary`** — Indigo fill (`{colors.primary}` — #635BFF) with white text (`{colors.surface}`), pill radius (`{rounded.pill}` — 16.5px), `12px 24px` padding, label in `{typography.button}` (14px/400, line-height 1). The main call to action ('Aan de slag', 'Doorgaan').
**`button-secondary`** — White fill (`{colors.surface}`) with Indigo text (`{colors.primary}`), a 1px hairline border (`{colors.hairline}`), same pill radius and button typography. The lower-emphasis pairing alongside the primary CTA.

### Cards & Containers
**`card`** — White surface (`{colors.surface}`), 8px radius (`{rounded.md}`), 24px padding, and the resting layered shadow (`{components.card.boxShadow}`). The workhorse feature/pricing tile.
**`card-elevated`** — Same white surface and radius with the larger `{components.card-elevated.boxShadow}` for modals and hero product surfaces that float higher off the page.

### Inputs & Forms
**`input`** — White fill (`{colors.surface}`), navy text (`{colors.ink}`), 8px radius (`{rounded.md}`), 1px hairline border (`{colors.hairline}`), `12px 16px` padding, text in `{typography.input}` (15px/300, 0.2px tracking). Focus is signaled by a blue focus ring (observed `rgb(77,144,254) 0 0 0 2px`).

### Links
**`link`** — Deep Indigo text (`{colors.primary-strong}`) in `{typography.body-sm}` (14px/400). Inline text links throughout content.

### Footer
**`footer`** — A tall off-white band (`{components.footer.backgroundColor}` — #F8FAFD), positioned `relative`, laid out in **4 columns** (`{components.footer.columns}`) holding ~85 links. Footer links use `{components.footer-link}` styling: Footer Slate (`{colors.footer-link}` — #50617A) at 16px/300 Söhne. No CTA button in the footer. The measured height (1102px) reflects the dense link inventory; legal/fine text sits in the muted-light range at the bottom.

## Do's and Don'ts

### Do
- Keep the two-typeface split — Söhne (`sohne-var`) for everything visible, Arial only as the system fallback; do not add a third family.
- Reserve saturated color for interaction: use Indigo (`{colors.primary}`) for primary fills and Deep Indigo (`{colors.primary-strong}`) for links and pressed states.
- Set body copy in Body Slate (`{colors.body}`) and headings in navy (`{colors.ink}` / `{colors.ink-deep}`) — the navy-on-white contrast is the backbone.
- Separate sections with hairline rules (`{colors.hairline}`, 1px) and the 76px `{spacing.section}` rhythm before reaching for shadows.
- Use the two-tier shadow system (`{components.card.boxShadow}` → `{components.card-elevated.boxShadow}`) to signal float distance, keeping shadows navy-tinted, not black-gray.
- Give CTAs pill radius (`{rounded.pill}`) and keep cards/inputs at 8px (`{rounded.md}`).
- Keep weights in the 300–425 range for text; jump to 700 only for 32px display headings.

### Don't
- Don't introduce a 600 weight or lean on bold — 500 is used once, and emphasis should come from size and color, not stroke weight.
- Don't use the classic-link blue (`{colors.link-classic}` — #0000EE) for designed UI; it only surfaces in unstyled contexts.
- Don't overuse Accent Orange (`{colors.accent-orange}`) — it is a rare single-page highlight, never a primary action.
- Don't add decorative UI gradients as tokens; gradient color belongs to artwork inside panels, not to controls.
- Don't put shadows on secondary buttons or inputs — they carry a 1px hairline border (`{colors.hairline}`) instead.
- Don't invent a dark-mode palette; signal top-priority surfaces with navy contrast blocks (`{colors.ink}`) on the light system.
- Don't tighten letter-spacing globally — only inputs (0.2px) and large hero headings deviate from normal tracking.

## Responsive Behavior

This is a two-viewport analysis (desktop and mobile captures); no intermediate breakpoint pixel values were measured, so treat the transition points as unknown.

### What the evidence shows
- **Desktop** uses a multi-column grid — 2-up and 3-up card mosaics for feature showcases, and a left-nav / right-detail split on the pricing page for dense reference content.
- **Mobile** collapses to a single-column stacked rhythm with full-bleed gradient imagery. Card spacing (24px padding) is preserved; comparative pricing tables simplify into vertical stacks.
- **Navigation** collapses from 4 visible nav links on desktop to a hamburger menu on mobile; the 76px bar height and white surface persist.

### Touch targets
Primary buttons carry `12px 24px` padding on `{typography.button}` at line-height 1, and inputs use `12px 16px` padding — both yield comfortably tappable ~44px-tall controls on mobile.

## Iteration Guide

1. **Change accents in one place.** All interaction color flows from `{colors.primary}` (fills) and `{colors.primary-strong}` (links/pressed). Retheme by editing those two tokens — never hardcode #635BFF/#533AFD into components.
2. **Respect the weight ceiling.** Text lives at 300–425; only `{typography.display}` uses 700. If you need emphasis, move up the size ladder (`{typography.body}` → `{typography.title-md}` → `{typography.title-lg}`) rather than adding weights.
3. **Two shadow tiers only.** Elevation variants live in `{components.card.boxShadow}` and `{components.card-elevated.boxShadow}`. Don't author new shadow values; escalate to color-contrast navy blocks for the highest priority.
4. **Radius by role.** Buttons = `{rounded.pill}`, surfaces (cards/inputs) = `{rounded.md}`, circles = `{rounded.round}`. Keep this mapping intact when adding components.
5. **Borders, not shadows, for secondary surfaces.** Secondary buttons and inputs use a 1px `{colors.hairline}` border. New form controls should follow the `input` token's border/radius/padding recipe.
6. **One typeface.** Everything is `sohne-var` with Arial as fallback only. Do not introduce a third family.
7. **Spacing on the 4px grid.** Use the named scale (`{spacing.xs}`–`{spacing.2xl}`, `{spacing.gutter}`, `{spacing.section}`); the 76px section rhythm is the unbreakable vertical unit.

## Known Gaps

- **Hover/active/focus states** were largely not captured. A single focus-ring shadow (`rgb(77,144,254) 0 0 0 2px`) was observed on inputs, but button hover, link hover, and disabled states are inferred, not measured.
- **Container max-width** was not directly measured; grid descriptions rely on screenshot inspection rather than exact pixel widths.
- **Breakpoints** are unknown — only two viewports (desktop, mobile) were captured, so the exact collapse thresholds are not verifiable.
- **Animation and motion** (gradient movement, transitions, scroll effects) could not be assessed from static captures.
- **Auth-walled or app surfaces** (Dashboard, checkout flows beyond marketing pages) were not in scope; all 8 captured pages are public marketing/newsroom/customer pages.
- **Gradient artwork** colors are not tokenized — the vivid diagonal gradients are decorative imagery and their exact stops are outside the token system.
- **Accent Orange** (`{colors.accent-orange}`) and **Slate** (`{colors.slate}`) each appear on only one page, so their intended usage is thinly supported.
- No values were dropped during grounding, so the token set is complete relative to the captured evidence.
