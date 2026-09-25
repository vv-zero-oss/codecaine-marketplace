---
version: alpha
name: Uber
description: "Uber's design system is bold, high-contrast and utilitarian: an unapologetic black-and-white foundation where pure black anchors the sticky header, primary buttons and body text, while white surfaces keep the layout clean and breathable. Typography leans on the proprietary UberMove and UberMoveText families with heavy display headings and pill-shaped interactive elements. Accents are minimal and functional — subtle grey hairlines and fills carry structure, letting content and photography provide the color."
colors:
  primary: "#000000"
  on-primary: "#FFFFFF"
  surface: "#FFFFFF"
  surface-muted: "#EFEFEF"
  surface-dark: "#292929"
  ink: "#000000"
  ink-body: "#333333"
  ink-muted: "#4A4A4A"
  ink-subtle: "#5E5E5E"
  ink-faint: "#A6A6A6"
  border: "#EFEFEF"
  border-strong: "#767676"
  link: "#0000EE"
  accent-blue: "#002661"
  accent-teal: "#9DCDD6"
typography:
  hero-display:
    fontFamily: UberMove
    fontSize: 52px
    fontWeight: 700
    lineHeight: 1.25
  display-lg:
    fontFamily: UberMove
    fontSize: 36px
    fontWeight: 700
    lineHeight: 1.2
  title-lg:
    fontFamily: UberMove
    fontSize: 24px
    fontWeight: 700
    lineHeight: 1.35
  title-md:
    fontFamily: UberMoveText
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.35
  body:
    fontFamily: UberMoveText
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body-strong:
    fontFamily: UberMoveText
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
  body-sm:
    fontFamily: UberMoveText
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  button:
    fontFamily: UberMoveText
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.15
  caption:
    fontFamily: UberMoveText
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.65
  caption-strong:
    fontFamily: UberMoveText
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.35
rounded:
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  pill: 999px
spacing:
  xs: 4px
  sm: 8px
  md: 12px
  lg: 16px
  xl: 20px
  2xl: 32px
  3xl: 36px
  section: 64px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-secondary:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-pill:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    rounded: "{rounded.pill}"
    typography: "{typography.button}"
  input:
    backgroundColor: "{colors.surface-muted}"
    textColor: "{colors.ink-body}"
    typography: "{typography.body}"
    rounded: "{rounded.md}"
    borderColor: "{colors.border}"
    borderWidth: 1px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
    boxShadow: rgba(0, 0, 0, 0.16) 0px 4px 16px 0px
  avatar:
    backgroundColor: "{colors.surface-muted}"
  navbar:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    height: 64px
    borderColor: "{colors.border}"
    borderWidth: 0px
    position: sticky
  nav-link:
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
  footer:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-strong}"
  footer-link:
    textColor: "{colors.on-primary}"
    typography: "{typography.body-strong}"
  link:
    textColor: "{colors.link}"
    typography: "{typography.body}"
---

# Uber

## Overview

Uber's system is bold, high-contrast and utilitarian — an unapologetic black-and-white foundation where pure black anchors the sticky header, primary buttons and body text while white surfaces keep everything clean and breathable. The personality is confident, global-scale consumer tech: large blunt sans-serif headlines ("Go anywhere", "Uber, reimagined for business") paired with candid lifestyle photography give it an energetic, on-the-move feel aimed at both riders and enterprise buyers.

Density is moderate-to-generous. Sections breathe on a `{spacing.section}` (64px) vertical rhythm, content sits in a repeating 3-column card grid on desktop that collapses to a single stacked column on mobile, and the hero splits into a two-column text/form-plus-image layout. Hierarchy is built almost entirely from **type scale and weight contrast**, not color — a 52px heavy display heading against 16px body does the heavy lifting, and photography supplies whatever color the near-monochrome palette withholds.

Depth is tonal, not shadowed: near-black backgrounds sit against white card panels and light-grey pill inputs to create separation. Colored icon badges are the only chromatic accents inside otherwise flat cards.

**Key Characteristics:**
- Pure black (`{colors.primary}` — #000000) canvas for header, footer, primary buttons and body text
- White (`{colors.surface}` — #FFFFFF) content surfaces keep the layout breathable
- Proprietary UberMove (display) and UberMoveText (everything else) typefaces
- Only three font weights exist: 400, 500, 700 — no other cuts
- Pill-shaped (`{rounded.pill}` — 999px) buttons and location inputs are a signature
- Elevation comes from tonal contrast, with shadows reserved for one floating card
- Accent color is minimal and functional; content and photography carry the palette

## Colors

The palette is deliberately austere: a black-and-white spine with grey structural tones and a couple of functional accents. There are no gradients anywhere — flat fills only, letting photography provide color.

### Brand & Accent
- **Uber Black** (`{colors.primary}` — #000000): the load-bearing color. Header, footer, primary buttons and body text all draw from it. Also `{colors.ink}`.
- **On-Black** (`{colors.on-primary}` — #FFFFFF): text and icons on every black surface — nav links, footer links, primary button labels.
- **Enterprise Blue** (`{colors.accent-blue}` — #002661): a deep navy used sparingly as a surface accent on a single page — functional, not a core brand hue.
- **Sky Teal** (`{colors.accent-teal}` — #9DCDD6): a soft teal fill seen once as a decorative surface accent.

### Surface
- **White** (`{colors.surface}` — #FFFFFF): default page and card background.
- **Cloud** (`{colors.surface-muted}` — #EFEFEF): fills secondary buttons and input fields, and doubles as the hairline color. Shares its value with `{colors.border}`.
- **Charcoal** (`{colors.surface-dark}` — #292929): a near-black surface for occasional dark panels distinct from pure black.

### Text
- **Ink** (`{colors.ink}` — #000000): primary heading and high-emphasis text.
- **Body Ink** (`{colors.ink-body}` — #333333): the workhorse body-copy color — the second-most-used text tone on the site.
- **Muted Ink** (`{colors.ink-muted}` — #4A4A4A): secondary text.
- **Subtle Ink** (`{colors.ink-subtle}` — #5E5E5E): tertiary/caption text.
- **Faint Ink** (`{colors.ink-faint}` — #A6A6A6): placeholder and disabled text.

### Hairlines & Borders
- **Hairline** (`{colors.border}` — #EFEFEF): default 1px divider and input border.
- **Strong Border** (`{colors.border-strong}` — #767676): higher-contrast borders where a hairline is too faint.

### Links
- **Classic Link Blue** (`{colors.link}` — #0000EE): the raw browser-blue used for inline text links — an intentionally utilitarian choice that appears across all pages.

### Dark Mode
No dedicated dark-mode token block ships with this system. Note, though, that the system is effectively "dark-first" in its chrome: the header and footer are already pure black with white text, so a builder should not expect a separate theme layer — the black surfaces are the brand, not a mode toggle.

## Typography

Two proprietary families split the work cleanly: UberMove for display, UberMoveText for everything at reading size and below.

### Font Family
- **UberMove** — display and large headings only (`{typography.hero-display}`, `{typography.display-lg}`, `{typography.title-lg}`). Heavy, blunt, geometric; carries the brand's confident voice.
- **UberMoveText** — titles, body, buttons, captions. Optimized for smaller sizes and dense UI.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.hero-display}` | 52px | 700 | 1.25 | normal | Page-level H1 hero headlines |
| `{typography.display-lg}` | 36px | 700 | 1.2 | normal | Section headings (H2/H3) |
| `{typography.title-lg}` | 24px | 700 | 1.35 | normal | Card and sub-section titles |
| `{typography.title-md}` | 18px | 500 | 1.35 | normal | Small titles, emphasized subheads |
| `{typography.body}` | 16px | 400 | 1.5 | normal | Default body copy |
| `{typography.body-strong}` | 16px | 500 | 1.5 | normal | Emphasized body, footer links |
| `{typography.body-sm}` | 14px | 400 | 1.45 | normal | Secondary paragraphs |
| `{typography.button}` | 14px | 500 | 1.15 | normal | Button and nav-link labels |
| `{typography.caption}` | 12px | 400 | 1.65 | normal | Fine print, captions |
| `{typography.caption-strong}` | 12px | 500 | 1.35 | normal | Emphasized captions, labels |

### Principles
The ladder uses exactly three weights — **400 (regular), 500 (medium), 700 (bold)**. There is no 600 and no light cut; medium 500 handles all "semibold" emphasis. Letter spacing is `normal` everywhere — the type is designed to be set without tracking adjustments. Line-height tightens as size grows (1.5 for body down to 1.15–1.25 for buttons and display), a deliberate strategy: big type reads as compact and punchy, small type stays open and legible. Bold is reserved for UberMove display sizes; UberMoveText tops out at 500.

### Note on Font Substitutes
UberMove and UberMoveText are proprietary. For rebuilds without a license, substitute **Inter** or **Manrope** for UberMoveText and a heavier geometric like **Archivo** or **Sora** for UberMove display. Set display headings to 700, tighten line-height to ~1.2, and keep letter-spacing at normal; drop UI text to Inter 400/500 to match the two-weight body rhythm.

## Layout

### Spacing System
Spacing follows a 4px base unit expanded into a named scale: `{spacing.xs}` (4px), `{spacing.sm}` (8px), `{spacing.md}` (12px), `{spacing.lg}` (16px), `{spacing.xl}` (20px), `{spacing.2xl}` (32px), `{spacing.3xl}` (36px), and `{spacing.section}` (64px). The most frequently measured values are 12px (inline/component padding) and 64px/36px (section rhythm), confirming a tight-inside, generous-between pattern.

### Grid & Container
Desktop uses a wide two-column hero — text and input form on the left, image collage on the right — followed by a repeating **3-column card grid** for services and process steps. A thin accent divider line marks section transitions. Mobile collapses to a single stacked column and converts carousels into swipeable 1/x indicators. Exact max container width and gutter values aren't measured in the evidence, so treat the 3-column grid and section spacing as the reliable structure.

### Whitespace Philosophy
Whitespace is generous and structural. Sections are separated by the full `{spacing.section}` (64px) rhythm, giving each card grid and photography break room to breathe against the stark canvas. Inside components, spacing stays tight (`{spacing.md}` 12px padding on buttons) so controls feel compact while the page overall feels open. The result reads premium and uncluttered — the black-and-white palette relies on space, not borders, to separate content.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| 0 — Flat | Tonal contrast only (black vs white vs `{colors.surface-muted}`) | Default separation between sections, cards and inputs |
| 1 — Hairline | 1px `{colors.border}` (#EFEFEF) rule | Dividers, input borders, section transitions |
| 2 — Shadow | `rgba(0,0,0,0.16) 0px 4px 16px 0px` | Card component (`{components.card}`) and the floating cookie-consent panel |

**Shadow philosophy.** Elevation comes from surface change, not shadows. The system leans on tonal contrast — near-black grounds against white panels and light-grey pill inputs — to create depth across almost the entire page. A single soft shadow (`rgba(0,0,0,0.16) 0px 4px 16px 0px`) is reserved for genuinely floating elements like cards and the cookie-consent card that must sit above the dark hero. Colored icon badges inside service cards provide small elevated accents without any real z-depth. Treat shadow as an exception, not a default.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 6px | Small controls, tight corners |
| `{rounded.md}` | 8px | Buttons, inputs, cards — the default radius |
| `{rounded.lg}` | 12px | Larger cards and panels |
| `{rounded.xl}` | 16px | Prominent photo tiles and containers |
| `{rounded.pill}` | 999px | Pill buttons and location-input fields |

The geometry is consistently rounded and tactile. The default corner is `{rounded.md}` (8px), applied to standard buttons, inputs and cards, while soft-cornered rectangles handle photo tiles and larger panels. The signature move is the **pill** (`{rounded.pill}` — 999px): fully rounded buttons and location-input fields that read as friendly and touch-ready against the stark black canvas. Circular shapes (50% radius, observed in evidence) appear for carousel arrows, avatars and icon badges. The moderate-to-large radii soften an otherwise severe monochrome system.

## Components

### Navigation
**`navbar`** — A sticky (`position: sticky`) black bar, 64px tall, drawing background from `{colors.primary}` with `{colors.on-primary}` white text. It carries **7 nav links** styled via `{components.nav-link}` — white text in `{typography.button}` (14px/500 UberMoveText) — and includes a CTA button (`hasCtaButton: true`). The border width is 0px, so there is no hairline rule beneath the header; separation from content comes from the black-against-white tonal jump. No backdrop blur is applied.

### Buttons
**`button-primary`** — Black fill (`{colors.primary}`) with white label (`{colors.on-primary}`), `{typography.button}` text, `{rounded.md}` corners, 12px 16px padding. The default high-emphasis action.

**`button-secondary`** — Cloud fill (`{colors.surface-muted}` — #EFEFEF) with black label (`{colors.ink}`), same `{typography.button}`, `{rounded.md}` and padding. Lower emphasis; sits on white surfaces.

**`button-pill`** — Black fill, white label, fully rounded `{rounded.pill}` (999px), `{typography.button}`. The signature marketing CTA and carousel control shape.

### Inputs & Forms
**`input`** — Cloud fill (`{colors.surface-muted}`) with body-ink text (`{colors.ink-body}` — #333333), `{typography.body}`, `{rounded.md}` corners and a 1px `{colors.border}` outline. The hero's location-entry fields use this treatment, often at pill radius.

### Cards & Containers
**`card`** — White (`{colors.surface}`) background, `{rounded.md}` corners, and the system's one shadow: `rgba(0,0,0,0.16) 0px 4px 16px 0px`. Used for floating panels and elevated content tiles.

**`avatar`** — Cloud (`{colors.surface-muted}`) placeholder fill; renders circular in practice (its intended circle radius token was dropped in extraction).

### Links
**`link`** — Inline text links use raw browser blue (`{colors.link}` — #0000EE) with `{typography.body}` — a deliberately utilitarian, unstyled link treatment.

### Footer
**`footer`** — Black background (`{colors.primary}`) with white text (`{colors.on-primary}`), typographically set in `{typography.body-strong}`. It is a tall, link-dense block (measured ~1013px tall) carrying roughly **38 links** styled via `{components.footer-link}` — white, `{typography.body-strong}` (16px/500 UberMoveText). Links arrange in multiple columns with legal/fine print set smaller beneath. No CTA button in the footer. Its structural border is 0px, relying on the black ground for separation.

## Do's and Don'ts

### Do
- Use only the observed font weights — 400, 500, 700 (`{typography.body}`, `{typography.body-strong}`, `{typography.hero-display}`). Weight 600 and light cuts are deliberately absent.
- Anchor primary actions in black (`{components.button-primary}` → `{colors.primary}`) with white labels (`{colors.on-primary}`).
- Reach for the pill (`{rounded.pill}`) for marketing CTAs and location inputs; it's the brand's signature shape.
- Build hierarchy from type scale — jump from `{typography.hero-display}` (52px) to `{typography.body}` (16px) rather than adding color.
- Separate sections with the `{spacing.section}` (64px) rhythm and let photography supply the color.
- Set UberMove for display sizes and UberMoveText for everything at 24px and below.
- Keep letter-spacing `normal` everywhere — the type is designed without tracking.

### Don't
- Don't add drop shadows as a default; reserve the single `{components.card}` shadow for genuinely floating elements — elevation is tonal.
- Don't introduce gradients; every fill is flat.
- Don't restyle inline links away from raw blue (`{colors.link}` — #0000EE) unless the whole system changes.
- Don't put a hairline under the navbar — its border width is 0px; contrast comes from the black bar itself.
- Don't use accent-blue (`{colors.accent-blue}`) or accent-teal (`{colors.accent-teal}`) as primary brand colors; they are single-page functional accents.
- Don't set body text in pure black on white for long copy — use `{colors.ink-body}` (#333333) as the workhorse.
- Don't tighten body line-height below 1.45; the openness (`{typography.body}` at 1.5) is intentional for legibility.

## Responsive Behavior

This is a **two-viewport analysis** (desktop and mobile captures only); no intermediate breakpoint pixel values were measured, so treat exact breakpoints as unknown.

On **desktop**, the hero is a two-column layout — text and input form on the left, image collage on the right — followed by a repeating 3-column card grid with generous vertical spacing between sections.

On **mobile**, the layout collapses to a single stacked column. The hero simplifies to the form fields only, carousels convert to swipeable 1/x indicators, and the same card and pill-button language carries through at full width.

Touch targets hold up: primary and secondary buttons carry 12px 16px padding on `{typography.button}` text, and pill inputs use the same padding scale, keeping tap areas comfortable on mobile. The 64px navbar height gives ample room for a mobile menu affordance. Because only two viewports were captured, this section scores low on breakpoint precision.

## Iteration Guide

1. **Reference tokens, never hex.** Edit `{colors.primary}` or `{typography.hero-display}`, not #000000 or 52px — every component inherits through references.
2. **Button variants live in three places** — `{components.button-primary}` (black), `{components.button-secondary}` (cloud), and `{components.button-pill}` (pill radius). Add a new emphasis level as a new component token, not an inline override.
3. **Respect the weight ceiling.** Only 400/500/700 exist across the type scale; do not add a 600 or a light cut when introducing new text styles.
4. **Keep elevation tonal.** If you need separation, change surface (`{colors.surface}` vs `{colors.surface-muted}` vs `{colors.primary}`) before adding a shadow — the only sanctioned shadow lives on `{components.card}`.
5. **Two families, fixed roles.** UberMove is display-only (`hero-display`, `display-lg`, `title-lg`); UberMoveText owns everything else. Don't cross these roles.
6. **The chrome is black by contract.** `{components.navbar}` and `{components.footer}` both pull `{colors.primary}` with `{colors.on-primary}` text — treat black chrome as an unbreakable boundary, not a theme choice.
7. **Accents stay functional.** `{colors.accent-blue}` and `{colors.accent-teal}` are edge-case surface accents; never promote them to primary brand color.

## Known Gaps

- **Circle radius dropped.** A `rounded.circle` (9999px) token and the `avatar.rounded` reference to it were dropped because the exact dimension wasn't observed; avatars render circular in practice but the token is unverified.
- **Hover, focus and active states** were not captured — button, link and input interaction styling is inferred from resting state only.
- **Animation and transitions** (carousel motion, menu expansion) are not measured; the mobile 1/x swipe behavior is observed visually but not timed.
- **Exact container max-width and grid gutters** are not in the evidence — the 3-column grid and 64px section rhythm are reliable, but precise column widths are not.
- **Breakpoint values** are unknown; only desktop and mobile viewports were captured, so intermediate/tablet behavior is unverified.
- **Accent colors** (`{colors.accent-blue}`, `{colors.accent-teal}`) and `{colors.surface-dark}` each appear on a single page with low weight — their broader usage patterns couldn't be confirmed.
- **Auth-walled surfaces** (rider/driver apps, booking flows) were not reached; all 8 captured pages were public marketing pages.
- **Footer measured height (~1013px)** reflects a link-dense static block; the exact column count wasn't resolved (reported as 0/multi).
