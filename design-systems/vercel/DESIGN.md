---
version: alpha
name: Vercel
description: Vercel's system is a crisp, high-contrast monochrome canvas built on near-black ink over pure white, punctuated by the signature electric blue and occasional pink/green/purple status accents. Surfaces are clean and hairline-defined with 1px borders rather than heavy shadows, and the whole thing is typeset in Geist — a geometric sans paired with a mono for code and a pixel face for playful display moments. It ships a true dark theme that inverts to soft-white ink on deep charcoal.
colors:
  primary: "#0070F3"
  ink: "#171717"
  ink-black: "#000000"
  body: "#4D4D4D"
  muted: "#666666"
  muted-light: "#8F8F8F"
  muted-lighter: "#A8A8A8"
  muted-subtle: "#7D7D7D"
  surface: "#FFFFFF"
  surface-subtle: "#EBEBEB"
  hairline: "#EBEBEB"
  on-primary: "#FFFFFF"
  accent-pink: "#BD2864"
  accent-green: "#297A3A"
  accent-purple: "#7820BC"
  accent-blue: "#1D9BF0"
  danger-surface: "#FFE6E6"
typography:
  display-pixel:
    fontFamily: Geist Pixel Square
    fontSize: 72px
    fontWeight: 400
    lineHeight: 1
    letterSpacing: -1.44px
  display-lg:
    fontFamily: Geist Sans
    fontSize: 32px
    fontWeight: 450
    lineHeight: 1.25
    letterSpacing: -1.28px
  title-md:
    fontFamily: Geist Sans
    fontSize: 24px
    fontWeight: 450
    lineHeight: 1.35
    letterSpacing: -0.96px
  body-lg:
    fontFamily: Geist Sans
    fontSize: 18px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: normal
  body:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: normal
  body-strong:
    fontFamily: Geist Sans
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: normal
  body-sm:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: normal
  body-sm-strong:
    fontFamily: Geist Sans
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: normal
  label-caps:
    fontFamily: Geist Sans
    fontSize: 11px
    fontWeight: 500
    lineHeight: 1.8
    letterSpacing: 0.2px
  mono:
    fontFamily: Geist Mono
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.55
    letterSpacing: normal
  mono-sm:
    fontFamily: Geist Mono
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: normal
rounded:
  sm: 2px
  md: 4px
  lg: 6px
  xl: 8px
  2xl: 12px
  3xl: 128px
  pill: 9999px
spacing:
  xs: 2px
  sm: 4px
  md: 6px
  lg: 8px
  xl: 12px
  2xl: 16px
  3xl: 24px
  4xl: 32px
  5xl: 48px
  6xl: 64px
components:
  button-primary:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.on-primary}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.lg}"
    padding: 8px 12px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm-strong}"
    rounded: "{rounded.lg}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    padding: 8px 12px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.2xl}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    boxShadow: rgba(0, 0, 0, 0.08) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 2px 0px, rgb(250, 250, 250) 0px 0px 0px 1px
    padding: 24px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
    rounded: "{rounded.lg}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    height: 40px
    padding: 8px 12px
  badge:
    backgroundColor: "{colors.surface-subtle}"
    textColor: "{colors.body}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.pill}"
    padding: 2px 8px
  avatar:
    rounded: "{rounded.pill}"
    size: 32px
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body-sm}"
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: 64px
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    position: sticky
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body}"
  footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  footer-link:
    textColor: "{colors.body}"
    typography: "{typography.body-sm}"
dark:
  colors:
    ink: "#EDEDED"
    body: "#A1A1A1"
    muted: "#8F8F8F"
    surface: "#0A0A0A"
    surface-subtle: "#1F1F1F"
    hairline: "#1F1F1F"
    accent-pink: "#F75F8F"
    accent-green: "#62C073"
    accent-purple: "#BF7AF0"
    danger-surface: "#561A1E"
---

# Vercel

## Overview

Vercel's system is an engineer's canvas: near-black ink on pure white, hairline-defined surfaces, and almost no chrome. Personality reads as confident and understated — declarative, terse copy ("Agentic Infrastructure") set in the geometric Geist family, with credibility carried by contrast and typography rather than color or ornament. The palette is deliberately monochrome; the signature **Action Blue** (`{colors.primary}` — #0070F3) and the pink/green/purple status accents are used as rare punctuation, never as decoration.

Density is comfortable-to-tight: a compact spacing scale (base 2px, stepping through 6/8/12/16/24) drives control padding, while marketing sections breathe with large vertical whitespace between them. Hierarchy is made three ways — dramatic type-size jumps (16px body up to 32px display and a 72px pixel face), tightening letter-spacing on large text, and tonal steps through a graded gray ink ladder — not through weight (the type only ever uses 400, 450, and 500).

Surfaces separate from the background with 1px hairlines (`{colors.hairline}` — #EBEBEB), and elevation appears only on floating product mockups. A true dark theme inverts the whole thing: soft-white ink (`{dark.colors.ink}` — #EDEDED) on deep charcoal (`{dark.colors.surface}` — #0A0A0A).

**Key Characteristics:**
- Monochrome-first: near-black `{colors.ink}` over white `{colors.surface}`, with color reserved for status.
- Hierarchy from size and tone, not weight — only 400/450/500 exist.
- Hairline borders (1px `{colors.hairline}`) do the work heavy shadows normally would.
- Geist everywhere: geometric sans, mono for code, pixel face for display flourishes.
- Tight negative letter-spacing on all large type; normal tracking on body.
- Pill and small-radius geometry: buttons at `{rounded.lg}`, cards at `{rounded.2xl}`, pills at `{rounded.pill}`.
- A fully realized dark theme, not an afterthought.
- Sticky 64px navbar and a dense multi-column footer sitemap.

## Colors

The palette is overwhelmingly monochrome — a graded ink ladder over white — with a single interactive blue and a small set of status accents. There are no gradients in this system; depth and interest come from tonal contrast and hairlines, not color blends.

### Brand & Accent
- **Action Blue** (`{colors.primary}` — #0070F3): the signature interactive/brand blue. Used sparingly for focus, selected states, and links-in-context; low overall usage confirms it's punctuation, not a field color.
- **Accent Pink** (`{colors.accent-pink}` — #BD2864): status/label accent, text-role only.
- **Accent Green** (`{colors.accent-green}` — #297A3A): success/positive status text.
- **Accent Purple** (`{colors.accent-purple}` — #7820BC): categorical/status accent.
- **Accent Blue** (`{colors.accent-blue}` — #1D9BF0): a lighter informational blue distinct from Action Blue.
- **Danger Surface** (`{colors.danger-surface}` — #FFE6E6): pale red fill behind error/destructive messaging.

### Surface
- **Pure White** (`{colors.surface}` — #FFFFFF): the primary canvas and card background.
- **Subtle Surface** (`{colors.surface-subtle}` — #EBEBEB): quiet fills for badges and inset zones — the same value as the hairline, so surfaces and borders share one soft gray.
- **On Primary** (`{colors.on-primary}` — #FFFFFF): text/icons on the dark primary button.

### Text (Ink Ladder)
- **Ink** (`{colors.ink}` — #171717): the workhorse near-black for headlines and primary body text.
- **True Black** (`{colors.ink-black}` — #000000): reserved absolute black for rare maximum-contrast moments.
- **Body Gray** (`{colors.body}` — #4D4D4D): secondary paragraph and footer-link text.
- **Muted** (`{colors.muted}` — #666666), **Muted Light** (`{colors.muted-light}` — #8F8F8F), **Muted Lighter** (`{colors.muted-lighter}` — #A8A8A8), **Muted Subtle** (`{colors.muted-subtle}` — #7D7D7D): a fine-grained gray ramp for captions, placeholders, and disabled/tertiary text. The depth of this ramp is the point — hierarchy in body copy is tonal.

### Hairlines & Borders
- **Hairline** (`{colors.hairline}` — #EBEBEB): the single 1px border color that defines nearly every card, input, navbar, and footer edge. It is by far the most-used border value across all pages.

### Dark Mode
The dark block inverts the canvas and re-tunes accents for contrast:

| Role | Light | Dark |
|---|---|---|
| ink | #171717 | #EDEDED |
| body | #4D4D4D | #A1A1A1 |
| muted | #666666 | #8F8F8F |
| surface | #FFFFFF | #0A0A0A |
| surface-subtle | #EBEBEB | #1F1F1F |
| hairline | #EBEBEB | #1F1F1F |
| accent-pink | #BD2864 | #F75F8F |
| accent-green | #297A3A | #62C073|
| accent-purple | #7820BC | #BF7AF0 |
| danger-surface | #FFE6E6 | #561A1E |

The strategy: ink and body soften rather than go pure white, surfaces drop to near-black charcoal, and the hairline again equals the subtle surface (both #1F1F1F) so the borders-as-structure logic survives the inversion. Accents brighten to hold saturation against the dark field. Note that `{colors.primary}` is not overridden — Action Blue stays #0070F3 in both themes.

## Typography

### Font Family
- **Geist Sans** (`GeistSans`): the primary voice — all headlines, body, labels, and UI. Geometric, low-contrast, engineered feel.
- **Geist Mono** (`Geist Mono`): code, technical labels, and monospace UI moments.
- **Geist Pixel Square** (`GeistPixelSquare`): a display-only pixel face used for a single oversized playful headline moment.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-pixel}` | 72px | 400 | 1 | -1.44px | Oversized playful display in the pixel face |
| `{typography.display-lg}` | 32px | 450 | 1.25 | -1.28px | Section hero headlines |
| `{typography.title-md}` | 24px | 450 | 1.35 | -0.96px | Sub-headings, card titles |
| `{typography.body-lg}` | 18px | 400 | 1.55 | normal | Lead paragraphs, intros |
| `{typography.body}` | 16px | 400 | 1.5 | normal | Default body copy, nav links |
| `{typography.body-strong}` | 16px | 500 | 1.5 | normal | Emphasized body |
| `{typography.body-sm}` | 14px | 400 | 1.45 | normal | Secondary text, footer links, inputs |
| `{typography.body-sm-strong}` | 14px | 500 | 1.45 | normal | Button labels, emphasized small text |
| `{typography.label-caps}` | 11px | 500 | 1.8 | 0.2px | Eyebrows, uppercase category labels |
| `{typography.mono}` | 13px | 400 | 1.55 | normal | Code and technical strings |
| `{typography.mono-sm}` | 12px | 400 | 1.35 | normal | Fine code/metadata |

### Principles
Three weights exist and no more: 400 (regular), the unusual 450 used exclusively for large sans headlines, and 500 (medium) for emphasis and controls. Weight 600+ and 300 are deliberately absent — hierarchy comes from size and tone, not bolding. Letter-spacing is a size-linked strategy: the bigger the type, the tighter the tracking (-1.44px at 72px down to -0.96px at 24px), while everything 18px and below sits at normal, with the single exception of the 11px `{typography.label-caps}` which opens up to +0.2px for uppercase legibility. Line-height scales inversely with size — display type runs tight (1.0–1.25) while body runs open (1.45–1.55) for readability.

### Note on Font Substitutes
Geist is Vercel's open-source family, available via `geist` on npm and Google Fonts — prefer the real thing. If you must substitute, **Inter** is the closest sans stand-in (tune to weights 400/500 and apply the same negative tracking on large sizes); **JetBrains Mono** or **IBM Plex Mono** cover Geist Mono. The pixel display face has no clean open equivalent — use a pixel font like **Silkscreen** only for that single decorative moment.

## Layout

### Spacing System
The base unit is 2px, with a compact scale that favors small increments: `{spacing.xs}` 2px, `{spacing.sm}` 4px, `{spacing.md}` 6px, `{spacing.lg}` 8px, `{spacing.xl}` 12px, `{spacing.2xl}` 16px, `{spacing.3xl}` 24px, `{spacing.4xl}` 32px, `{spacing.5xl}` 48px, `{spacing.6xl}` 64px. Measured usage clusters heavily on 2px, 6px, 12px, 8px, and 24px — the small end drives control padding and gaps, while 24/32/48 govern section rhythm. Card padding is 24px (`{spacing.3xl}`); buttons and inputs pad 8px×12px (`{spacing.lg}`×`{spacing.xl}`).

### Grid & Container
The marketing pages run a wide max-width container with a left-heavy text column and right-aligned supporting UI mockups or stat callouts — an asymmetric two-zone layout per section. Logo strips and feature grids space items evenly with small caps labels above bold stats. The blog/resources pages shift to a strict 3-column card grid (eyebrow date/category, title, excerpt, avatar byline), and the footer is a dense multi-column sitemap. The navbar spans a 64px-tall bar; the footer measured ~846px tall on content-heavy pages.

### Whitespace Philosophy
Whitespace is generous vertically and disciplined horizontally. Sections are separated by large vertical gaps that let single ideas stand alone, while within components spacing stays tight and rhythmic. On mobile the same spacing rhythm is preserved — the layout collapses to a single column and hierarchy is maintained by dropping type sizes rather than re-spacing.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No border, no shadow — ink on surface | Marketing copy, headlines, backgrounds |
| Hairline | 1px `{colors.hairline}` border (rendered as a 0 0 0 1px ring) | Cards, inputs, navbar, footer, badges — the default separation |
| Ring + soft shadow | `rgba(0,0,0,0.08) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 2px 0, rgb(250,250,250) 0 0 0 1px` | Standard cards (`{components.card}`) |
| Floating | Same ring plus `rgba(0,0,0,0.04) 0 8px 16px -4px` | Overlays, dropdowns, floating product mockups |

**Shadow philosophy.** Elevation comes from surface change and hairlines, not from heavy drop shadows. The overwhelmingly most common "shadow" in the evidence is actually a 1px ring (`0 0 0 1px` in white, black, or #EBEBEB) — a border expressed as a box-shadow. Real Y-offset shadows are faint (0.04–0.08 alpha) and reserved almost entirely for floating UI: the AI chat panel, code editor, and model-picker dropdowns that must read as hovering above the marketing plane. The result is a nearly flat page where depth is a signal of interactivity, applied deliberately and rarely.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 2px | Tiny inset elements, subtle rounding |
| `{rounded.md}` | 4px | Small controls, tags |
| `{rounded.lg}` | 6px | Buttons and inputs (the workhorse radius) |
| `{rounded.xl}` | 8px | Larger controls, code windows |
| `{rounded.2xl}` | 12px | Cards and containers |
| `{rounded.3xl}` | 128px | Large soft-capsule shapes |
| `{rounded.pill}` | 9999px | Fully rounded pills, badges, avatars |

The geometry is precise and restrained: small-to-medium radii dominate, with buttons and inputs at 6px (`{rounded.lg}`) and cards at 12px (`{rounded.2xl}`). The measured data confirms 6px as the single most-used radius, with the pill radius close behind for badges, avatars, and marketing CTA buttons ("Deploy now", "Talk to sales"). Fully round shapes appear as pills (`{rounded.pill}`) and circular avatars (`{components.avatar}` at 32px). The 128px `{rounded.3xl}` is a special large-capsule value for oversized rounded elements. Nothing is sharp-cornered by default — but nothing is heavily rounded either; the character is technical and geometric.

## Components

### Navigation
- **`navbar`** — A 64px-tall sticky bar (`{components.navbar}`, `position: sticky`) on a white surface (`{colors.surface}`) with ink text (`{colors.ink}`). It carries a 1px `{colors.hairline}` bottom rule and no backdrop blur (backdropFilter: none). Nav links render in `{typography.body}` (16px/400) in ink; the header includes a CTA button (`hasCtaButton: true`) — typically the dark primary "Deploy"/"Sign up" pairing. Link counts are high because the primary nav expands into mega-menu panels.
- **`nav-link`** — Ink text (`{colors.ink}`) at `{typography.body}`, minimal styling, relying on color/tone shift for hover (hover state not captured).
- **`link`** — Inline links use ink (`{colors.ink}`) at `{typography.body-sm}` (14px).

### Buttons
- **`button-primary`** — Dark fill on ink (`{colors.ink}`) with white text (`{colors.on-primary}`), `{typography.body-sm-strong}` (14px/500), radius `{rounded.lg}` (6px), padding 8px×12px. The high-contrast primary action.
- **`button-secondary`** — White surface (`{colors.surface}`), ink text, 1px `{colors.hairline}` border, same 6px radius, typography, and padding as primary. The quiet counterpart. Note: marketing hero CTAs also appear as full pills — treat the pill as a display variant of these controls.

### Cards & Containers
- **`card`** — White surface (`{colors.surface}`), radius `{rounded.2xl}` (12px), 1px `{colors.hairline}` border, 24px padding (`{spacing.3xl}`). Its box-shadow is a layered ring plus faint 2px soft shadow (`rgba(0,0,0,0.08) 0 0 0 1px, rgba(0,0,0,0.04) 0 2px 2px 0, rgb(250,250,250) 0 0 0 1px`) — barely-there depth. Used in the 3-column blog grid and feature panels.

### Inputs & Forms
- **`input`** — White surface, ink text, `{typography.body-sm}` (14px), radius `{rounded.lg}` (6px), 1px `{colors.hairline}` border, 40px height, padding 8px×12px. Error states use the pale `{colors.danger-surface}` fill.

### Badges & Chips
- **`badge`** — Subtle gray fill (`{colors.surface-subtle}`), body-gray text (`{colors.body}`), `{typography.label-caps}` (11px/500 uppercase, +0.2px tracking), fully pill-shaped (`{rounded.pill}`), padding 2px×8px. Used for eyebrow categories and status labels.
- **`avatar`** — Circular (`{rounded.pill}`), 32px — appears as byline avatars in the blog grid.

### Footer
- **`footer`** — White surface (`{colors.surface}`) with a 1px `{colors.hairline}` top rule, measured ~846px tall — a dense multi-column sitemap. Links use `{components.footer-link}`: body-gray text (`{colors.body}` — #4D4D4D) at `{typography.body-sm}` (14px/400). No CTA button in the footer (`hasCtaButton: false`); legal text sits in the same muted gray at the smallest sizes. Around 81 links organize into topic columns.

## Do's and Don'ts

### Do
- Do build separation with 1px `{colors.hairline}` borders — it is the system's primary structural device across `{components.card}`, `{components.input}`, `{components.navbar}`, and `{components.footer}`.
- Do keep type to the three observed weights only — 400, 450, and 500. The 450 is reserved for large sans headlines (`{typography.display-lg}`, `{typography.title-md}`).
- Do tighten letter-spacing on large text (down to -1.44px on `{typography.display-pixel}`) and leave body copy at normal tracking.
- Do reserve color for status: `{colors.accent-pink}`, `{colors.accent-green}`, `{colors.accent-purple}`, and `{colors.primary}` are punctuation on a monochrome field.
- Do use the ink ladder (`{colors.ink}` → `{colors.body}` → `{colors.muted}` → `{colors.muted-light}`) to create text hierarchy tonally.
- Do pad controls at 8px×12px and cards at 24px (`{spacing.3xl}`) to match the measured rhythm.
- Do use `{rounded.lg}` (6px) for buttons/inputs and `{rounded.2xl}` (12px) for cards.

### Don't
- Don't add heavier or lighter font cuts (600, 700, 300) — they break the deliberately flat weight ramp.
- Don't reach for drop shadows to separate surfaces; use hairlines. Reserve the faint layered shadow only for floating UI mockups and overlays.
- Don't recolor Action Blue (`{colors.primary}` — #0070F3) per theme — it stays constant in light and dark.
- Don't use pure black (`{colors.ink-black}`) as the default text color; the near-black `{colors.ink}` (#171717) is the workhorse.
- Don't introduce gradients — the system has none.
- Don't apply the 128px `{rounded.3xl}` or pills to standard cards; those large radii belong to capsule/CTA shapes only.
- Don't widen tracking on body text — only `{typography.label-caps}` gets positive letter-spacing.

## Responsive Behavior

This is a two-viewport analysis (desktop and mobile captures only); no intermediate breakpoint pixel values were observed, so treat exact breakpoints as unknown.

What the evidence shows: on desktop, sections use asymmetric two-zone layouts (left text column, right-aligned UI mockup or stats), the blog uses a strict 3-column card grid, and the footer spreads into a dense multi-column sitemap. On mobile, everything collapses to a single stacked column — cards stack vertically while preserving the same spacing rhythm, and hierarchy is maintained by dropping type sizes rather than restructuring the layout. The navbar remains a sticky 64px bar and condenses its expansive link set behind a menu affordance.

Touch targets are supported by the token sizing: inputs stand 40px tall (`{components.input}`) and avatars are 32px (`{components.avatar}`); button padding of 8px×12px on `{typography.body-sm-strong}` yields comfortably tappable controls. Because only two viewports were captured, this section is scored low.

## Iteration Guide

1. **Reference tokens, never raw hex.** Edit `{colors.ink}`, `{colors.hairline}`, `{colors.primary}` etc. so light and dark stay in sync — the dark block overrides by token name.
2. **Preserve the weight ceiling.** The type system uses only 400/450/500. If you need emphasis, change size or tone (`{colors.ink}` vs `{colors.body}`), not weight.
3. **Separation lives in borders.** New surfaces should adopt the 1px `{colors.hairline}` pattern before any shadow. Reserve the faint layered shadow (as on `{components.card}`) for genuinely floating elements only.
4. **Button variants live in `{components.button-primary}` and `{components.button-secondary}`** — both share `{rounded.lg}`, `{typography.body-sm-strong}`, and 8px×12px padding; keep them symmetric. The pill CTA is a marketing display treatment, not a new base component.
5. **Keep Action Blue theme-invariant.** `{colors.primary}` is intentionally not overridden in dark mode; do not add a dark variant.
6. **Honor the letter-spacing curve.** Any new large type token should carry negative tracking scaled to its size; body-scale tokens stay at normal.
7. **Unbreakable boundaries:** monochrome-first palette, no gradients, hairline structure, three font weights, and Geist as the only families. Changing any of these changes the brand, not just a value.

## Known Gaps

- **Hover, focus, and active states** were not captured — button, link, and input interaction styling is inferred from resting tokens only.
- **Animation and transitions** (menu expansion, mockup motion) are not represented in the tokens or screenshots.
- **Exact breakpoints** are unknown: only desktop and mobile viewports were captured, so the responsive rules describe endpoints, not thresholds.
- **Navbar/footer link counts** (77 and 81) reflect expanded mega-menu and sitemap DOM, not what's visible at rest; the true compact nav structure is partially inferred.
- **Header background** measured as transparent (`rgba(0,0,0,0)`) with a 0px border in the landmark data, which conflicts with the navbar token's white surface and 1px hairline — likely a scroll-dependent or transparent-over-hero state that could not be fully resolved.
- **Accent usage context** is thin: pink/green/purple accents appear only as low-weight text roles across a few pages, so their precise application (status chips vs. inline emphasis) is not fully verified.
- **Auth-walled product surfaces** (the actual dashboard) were not in scope; all evidence is from marketing, blog, and contact pages.
- No values were dropped during grounding, so the token set is believed complete for what was captured.
