---
version: alpha
name: Railway
description: Railway's design language is a dark, developer-focused cloud aesthetic built on near-black violet surfaces with crisp white type and cool neutral grays. A vivid purple carries the primary accent and interactive states, with a soft mint-green used for success and highlight moments. The system leans on Inter for UI, monospace for code contexts, and a subtle Newsreader serif for editorial flourish; hairline borders and layered shadows give cards gentle elevation against the deep background.
colors:
  primary: "#853BCE"
  primary-light: "#A667E4"
  accent-green: "#42946E"
  accent-green-dark: "#367859"
  accent-green-surface: "#DFF1E9"
  ink: "#FFFFFF"
  ink-strong: "#0C0C0E"
  body: "#DCDCE0"
  muted: "#A1A0AB"
  muted-strong: "#878593"
  muted-deep: "#6C6B7B"
  muted-deepest: "#545260"
  surface: "#13111C"
  surface-raised: "#1F132A"
  surface-black: "#0C0C0E"
  surface-light: "#F2F1F3"
  border: "#33323E"
typography:
  title-lg:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: 400
    lineHeight: 1.35
    letterSpacing: normal
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 600
    lineHeight: 1.5
    letterSpacing: normal
  title-sm:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: normal
  body:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.65
    letterSpacing: normal
  body-strong:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: normal
  body-sm:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
    letterSpacing: normal
  label:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.45
    letterSpacing: normal
  caption:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: 500
    lineHeight: 1.5
    letterSpacing: normal
  button:
    fontFamily: Helvetica
    fontSize: 16px
    fontWeight: 700
    lineHeight: 1
    letterSpacing: normal
rounded:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  full: 9999px
spacing:
  xs: 4px
  sm: 6px
  md: 8px
  lg: 12px
  xl: 16px
  2xl: 24px
  3xl: 32px
  4xl: 48px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 12px 16px
  button-secondary:
    backgroundColor: "{colors.surface-raised}"
    textColor: "{colors.body}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: 12px 16px
  badge:
    backgroundColor: "{colors.accent-green-surface}"
    textColor: "{colors.accent-green-dark}"
    rounded: "{rounded.full}"
    typography: "{typography.caption}"
    padding: 4px 8px
  card:
    backgroundColor: "{colors.surface-raised}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    rounded: "{rounded.lg}"
    padding: 24px
    boxShadow: rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(0, 0, 0, 0) 0px 0px 0px 0px, rgba(105, 116, 165, 0.2) 0px 12px 25px 0px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    rounded: "{rounded.md}"
    padding: 8px 12px
    typography: "{typography.body-sm}"
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.body}"
    height: 32px
    borderColor: "{colors.border}"
    borderWidth: 1px
    position: relative
  nav-link:
    textColor: "{colors.body}"
    typography: "{typography.label}"
  footer:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.muted}"
    borderColor: "{colors.border}"
    borderWidth: 1px
    columns: "6"
  footer-link:
    textColor: "{colors.muted}"
    typography: "{typography.body}"
  link:
    textColor: "{colors.primary-light}"
    typography: "{typography.body-sm}"
---

# Railway

## Overview

Railway's design language is a dark, developer-focused cloud aesthetic that trades the loud energy of typical SaaS for something calmer and almost literary. The foundation is a near-black violet — **Midnight Violet** (`{colors.surface}` — #13111C) — over which crisp white type, cool neutral grays, and a single vivid purple accent do the heavy lifting. The visual analysis describes serif display headlines paired with monospace product chrome and atmospheric dusk illustrations; the result reads as craft and trustworthiness aimed squarely at engineering teams rather than growth marketers.

Hierarchy is built through tonal layering and type, not decoration. Surfaces step from the deep background (`{colors.surface}`) to slightly lifted violet-charcoal cards (`{colors.surface-raised}` — #1F132A), always fenced by a thin hairline (`{colors.border}` — #33323E). Emphasis comes from the purple accent (`{colors.primary}` — #853BCE) on interactive elements, from white-to-gray text contrast, and from the mint-green success moments (`{colors.accent-green}` — #42946E). Density is deliberately dual: generous vertical rhythm separates major sections, while card interiors pack feature lists, stats, and pricing tables tightly for information density.

**Key Characteristics:**
- Near-black violet surfaces (`{colors.surface}`, `{colors.surface-raised}`) as the canvas, never pure black except for `{colors.surface-black}`.
- A single vivid purple accent (`{colors.primary}`) carries all primary interaction; mint green (`{colors.accent-green}`) is reserved for success/highlight.
- Inter runs the entire UI; a Newsreader serif adds editorial display flourish and monospace handles code contexts.
- Hairline borders (`{colors.border}`, 1px) define nearly every container edge.
- Elevation is tonal and glow-based — soft colored shadows, not hard drops.
- Consistent medium rounding (`{rounded.md}`–`{rounded.lg}`) gives a soft-technical geometry.
- White (`{colors.ink}`) headings against multi-step gray body text (`{colors.body}`, `{colors.muted}`) build hierarchy.

## Colors

The palette is anchored in deep violet-blacks and cool grays, with purple as the one loud voice and mint green as an occasional grace note. There are no true gradients in the token system — depth comes from stepping between discrete surface tones and soft glow shadows, not gradient fills.

### Brand & Accent
- **Royal Purple** (`{colors.primary}` — #853BCE): the primary accent — primary buttons, interactive states, focus emphasis. The signature color of the system.
- **Lavender** (`{colors.primary-light}` — #A667E4): lighter purple for inline links (`{components.link}`) and hover/active accents against dark surfaces.
- **Mint Green** (`{colors.accent-green}` — #42946E): success and highlight text moments.
- **Deep Mint** (`{colors.accent-green-dark}` — #367859): darker green used as badge text on the mint surface.
- **Mint Wash** (`{colors.accent-green-surface}` — #DFF1E9): pale green fill behind badges (`{components.badge}`), a rare light surface in a dark system.

### Surfaces
- **Midnight Violet** (`{colors.surface}` — #13111C): the base app surface, navbar, and footer background.
- **Raised Violet** (`{colors.surface-raised}` — #1F132A): lifted cards, secondary buttons, and panels one step above the base.
- **True Black** (`{colors.surface-black}` — #0C0C0E): the deepest surface, matching `{colors.ink-strong}`.
- **Paper** (`{colors.surface-light}` — #F2F1F3): light surface for inverted contexts.

### Text
- **Pure White** (`{colors.ink}` — #FFFFFF): headings and highest-emphasis type.
- **Near-Black Ink** (`{colors.ink-strong}` — #0C0C0E): text on light surfaces.
- **Body Gray** (`{colors.body}` — #DCDCE0): default body copy on dark surfaces.
- **Muted** (`{colors.muted}` — #A1A0AB): secondary text and footer links.
- **Muted Strong** (`{colors.muted-strong}` — #878593), **Muted Deep** (`{colors.muted-deep}` — #6C6B7B), **Muted Deepest** (`{colors.muted-deepest}` — #545260): the descending gray ladder for captions, disabled states, and de-emphasized labels.

### Hairlines & Borders
- **Hairline** (`{colors.border}` — #33323E): the near-universal 1px border on cards, inputs, navbar, and footer. One of the most-used colors in the system (present on 6 of 7 pages as a border role).

### Dark Mode
The system is dark-native — there is no separate light/dark token block. The dark violet surfaces are the default and only theme; the light tokens (`{colors.surface-light}`, `{colors.ink-strong}`) exist for inverted islands (like the mint badge), not a full alternate theme. A builder should treat dark as the ground truth and not attempt to synthesize a light mode from these tokens.

## Typography

### Font Family
- **Inter** — the workhorse for all UI: titles, body, labels, captions. Dominant by a wide margin (3336 weight units across 6 pages).
- **Newsreader** (Variable) — a serif used for editorial display headlines ('Ship software peacefully'). Observed on the site as display flourish, though not represented in a shipped token (see Known Gaps).
- **Monospace (JetBrains Mono / ui-monospace)** — used inside code panels and terminal-style product chrome.
- **Helvetica** — used specifically for button labels (`{typography.button}`), bold and tight.

### Hierarchy

| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.title-lg}` | 24px | 400 | 1.35 | normal | Large section titles |
| `{typography.title-md}` | 18px | 600 | 1.5 | normal | Card/section headings (semibold) |
| `{typography.title-sm}` | 18px | 500 | 1.5 | normal | Medium headings (medium weight) |
| `{typography.body}` | 16px | 400 | 1.65 | normal | Default body copy |
| `{typography.body-strong}` | 16px | 500 | 1.5 | normal | Emphasized body |
| `{typography.body-sm}` | 14px | 400 | 1.45 | normal | Secondary/dense text, inputs |
| `{typography.label}` | 14px | 500 | 1.45 | normal | Nav links, labels, table headers |
| `{typography.caption}` | 12px | 500 | 1.5 | normal | Badges, fine print |
| `{typography.button}` | 16px | 700 | 1 | normal | Button labels (Helvetica) |

### Principles
Weights are restrained to 400 / 500 / 600, with 700 reserved exclusively for button labels. Body text runs generous — 1.65 line height on `{typography.body}` gives breathing room for reading, while tighter 1.45–1.5 governs labels and dense UI. Letter-spacing is uniformly `normal` across every token: the system never tracks type in or out. Hierarchy comes from size and weight steps, not from spacing tricks. Note the two 18px titles that differ only in weight — `{typography.title-md}` (600) versus `{typography.title-sm}` (500) — a deliberate two-tier emphasis at one size.

### Note on Font Substitutes
Inter is open-source; use it directly. For the serif display role, **Newsreader** (Google Fonts) is the exact family the site uses editorially — pair it at ~28px/500 for headlines. For code contexts, **JetBrains Mono** is the observed and open-source choice. The `{typography.button}` token specifies Helvetica; substitute Arial or a system sans-serif stack (`Helvetica, Arial, sans-serif`) at weight 700 to match the tight, bold button treatment.

## Layout

### Spacing System
The scale is a 4px-based rhythm with a 6px half-step early on: `{spacing.xs}` 4px, `{spacing.sm}` 6px, `{spacing.md}` 8px, `{spacing.lg}` 12px, `{spacing.xl}` 16px, `{spacing.2xl}` 24px, `{spacing.3xl}` 32px, `{spacing.4xl}` 48px. The measured evidence confirms 12px and 16px as the most-used gaps (238 and 201 occurrences across all 7 pages), with 8px, 4px, and 6px close behind — a tightly packed internal rhythm. Larger 32px and 48px steps separate major blocks.

### Grid & Container
The layout centers a single-column hero, then breaks into strict grids: logo walls, a three-column pricing comparison with a highlighted middle Pro card, and a dense feature-comparison table with alternating rows. The footer is a **6-column** link layout (`{components.footer}` — columns: 6). A vertical timeline/rail motif threads down the left edge across feature sections, marking scroll progress. Card padding is a consistent 24px (`{components.card}`).

### Whitespace Philosophy
Whitespace is intentionally two-speed. Between sections, generous vertical spacing (32px–48px) gives the page a calm, editorial pace that matches the serif-headline tone. Inside cards and tables, spacing tightens to 8–16px to pack feature lists, stats, and pricing rows densely — respecting the information needs of a technical audience without feeling cramped, thanks to the roomy 1.65 body line height.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Base | Flat `{colors.surface}` (#13111C) | Page background, navbar, footer |
| Hairline | 1px `{colors.border}` (#33323E) | Card, input, and panel edges — the primary separator |
| Raised surface | Tonal step to `{colors.surface-raised}` (#1F132A) | Lifted cards and panels |
| Soft shadow | Blue-gray glow `rgba(105,116,165,0.2) 0px 12px 25px` | Card elevation (`{components.card}` boxShadow) |
| Glow accents | Purple/cyan colored soft shadows | Buttons, status dots, hero light sources |

**Shadow philosophy.** Elevation comes from surface change first, hairlines second, and shadows only as a soft finishing glow. On a near-black canvas, a hard black drop shadow would be invisible — so the card shadow (`{components.card}`) uses a cool blue-gray tint (`rgba(105,116,165,0.2)`) offset 12px down with 25px blur, reading as a gentle light bloom rather than a cast shadow. Observed shadows in evidence lean the same way: colored, wide-blur, low-opacity glows suggesting a light source above and behind the panel. The visual analysis confirms depth is 'mainly tonal layering' with 'soft glows... rather than hard drop shadows.' Build elevation by stepping surfaces and adding hairlines; reach for shadow only on floating cards.

## Shapes

### Border Radius Scale

| Token | Value | Use |
|---|---|---|
| `{rounded.xs}` | 4px | Small chips, tight inner elements |
| `{rounded.sm}` | 6px | Compact controls, small buttons |
| `{rounded.md}` | 8px | Buttons, inputs — the default control radius |
| `{rounded.lg}` | 12px | Cards and larger panels |
| `{rounded.xl}` | 16px | Large containers, feature panels |
| `{rounded.full}` | 9999px | Pills, badges, circular dots/avatars |

The geometry is soft-technical: rounded rectangles everywhere, from buttons and pricing cards to code panels and logo tiles, all sharing a consistent medium radius. The evidence shows 6px and 8px as the most frequent radii (109 and 106 occurrences across 6 pages), confirming `{rounded.md}` as the control default and `{rounded.lg}` for cards. Fully-rounded `{rounded.full}` is used deliberately for badges (`{components.badge}`) and small status/timeline dots — the pill shape signals status and progression, never structural containers. Browser-chrome-style window bars on product mockups reinforce the rounded, framed geometry.

## Components

### Navigation
**`navbar`** — A slim bar on the base surface (`{colors.surface}` — #13111C) measuring 32px tall (`{components.navbar}` height: 32px), positioned relatively (not sticky/fixed) with no backdrop blur. It carries a 1px hairline (`{colors.border}`). Nav links use `{components.nav-link}` styling — `{colors.body}` text at the `{typography.label}` scale (14px/500 Inter). The header does not carry a CTA button (`hasCtaButton: false`). On mobile the nav collapses to a hamburger, per the visual analysis.

**`nav-link`** — 14px medium-weight Inter (`{typography.label}`) in body gray (`{colors.body}`), brightening toward white on interaction.

### Buttons
**`button-primary`** — Royal Purple fill (`{colors.primary}` — #853BCE) with white label (`{colors.ink}`), Helvetica bold 16px (`{typography.button}`), 8px radius (`{rounded.md}`), padding 12px 16px. The single loud call-to-action.

**`button-secondary`** — Raised violet fill (`{colors.surface-raised}`) with body-gray label (`{colors.body}`) and a 1px hairline border (`{colors.border}`), same 8px radius and 12px 16px padding. Used for secondary actions beside the primary button.

### Cards & Containers
**`card`** — Raised violet surface (`{colors.surface-raised}` — #1F132A) with a 1px hairline (`{colors.border}`), 12px radius (`{rounded.lg}`), and 24px padding. Carries the signature soft blue-gray glow shadow (`rgba(105,116,165,0.2) 0px 12px 25px`). The primary container for pricing tiers, feature blocks, and stats.

### Inputs & Forms
**`input`** — Deep base-surface fill (`{colors.surface}`), body-gray text (`{colors.body}`), 1px hairline border (`{colors.border}`), 8px radius (`{rounded.md}`), padding 8px 12px, typed at `{typography.body-sm}` (14px). Note inputs sit on the darkest surface while cards sit raised — an inverted relationship that visually recesses fields into panels.

### Badges & Chips
**`badge`** — Mint Wash fill (`{colors.accent-green-surface}` — #DFF1E9) with Deep Mint text (`{colors.accent-green-dark}` — #367859), fully rounded (`{rounded.full}`), caption type (`{typography.caption}` — 12px/500), padding 4px 8px. A rare light element used for success/highlight labeling.

### Links
**`link`** — Inline links in Lavender (`{colors.primary-light}` — #A667E4) at `{typography.body-sm}` (14px), distinguishing interactive text from the purple button accent.

### Footer
**`footer`** — Base-surface background (`{colors.surface}`), muted text (`{colors.muted}`), 1px hairline top border (`{colors.border}`), laid out in **6 columns**. The measured footer is tall (~801px) and holds ~39 links in muted gray (`{colors.muted}` — #A1A0AB) at 16px/400 Inter (`{components.footer-link}`). No CTA button. Legal text and secondary links share the same muted treatment, keeping the footer quiet and dense.

**`footer-link`** — Muted gray (`{colors.muted}`) at `{typography.body}` (16px/400), brightening on hover (not captured).

## Do's and Don'ts

### Do
- Build surfaces by stepping tones: `{colors.surface}` for the base, `{colors.surface-raised}` for lifted cards, and fence every container with a 1px `{colors.border}` hairline.
- Reserve `{colors.primary}` (#853BCE) for primary actions and interactive emphasis only — it is the one loud voice.
- Use `{colors.primary-light}` for inline text links (`{components.link}`) so links stay distinct from purple buttons.
- Keep the mint family (`{colors.accent-green}`, `{colors.accent-green-surface}`) strictly for success and highlight moments like `{components.badge}`.
- Set body copy in `{typography.body}` (16px/1.65) and let its generous line height carry the calm, editorial pace.
- Use the gray text ladder (`{colors.body}` → `{colors.muted}` → `{colors.muted-deep}`) to build hierarchy instead of adding new colors.
- Apply the soft blue-gray glow shadow from `{components.card}` for floating elevation, not hard black drops.

### Don't
- Don't use pure black backgrounds — the base is violet-tinted `{colors.surface}` (#13111C), reserve `{colors.surface-black}` for the deepest accents only.
- Don't apply weight 700 outside button labels (`{typography.button}`); UI weights stop at 600 (`{typography.title-md}`).
- Don't add letter-spacing — every type token is `normal`; hierarchy comes from size and weight.
- Don't put dark text on the raised card surface; use `{colors.ink}` and `{colors.body}`, saving `{colors.ink-strong}` for light surfaces.
- Don't rely on shadows for separation on dark panels — hairlines (`{colors.border}`) do the work; hard shadows disappear on the near-black canvas.
- Don't introduce gradient fills; the system depends on flat tonal steps.
- Don't make the navbar tall or sticky — it is a slim 32px relative bar (`{components.navbar}`) with no CTA.

## Responsive Behavior

This is a two-viewport analysis (desktop and mobile); no intermediate breakpoint pixel values were captured, so treat the transition points as unknown.

On desktop, content uses centered single-column heroes that give way to multi-column grids — three-column pricing comparisons, logo walls, and a 6-column footer (`{components.footer}`). On mobile, the visual analysis shows the layout collapsing to a single stacked column, preserving the same card and icon-label patterns while reducing side padding. The navbar (`{components.navbar}`, 32px) simplifies to a hamburger menu on mobile.

Touch targets are supported by the button padding of 12px 16px (`{components.button-primary}`), which around a 16px label yields a comfortably tappable control. Inputs at 8px 12px padding (`{components.input}`) are more compact and may sit near the lower bound of touch sizing. The dense pricing/feature tables are the most at-risk pattern on small screens — expect them to reflow or scroll horizontally, though the exact behavior was not captured.

## Iteration Guide

1. **Theme by token, not hex.** Change surface tone by editing `{colors.surface}` and `{colors.surface-raised}` together — they define the base-vs-raised relationship the whole system relies on.
2. **The accent is singular.** If you need a new interactive color, reassign `{colors.primary}` rather than sprinkling additional accents; `{colors.primary-light}` should track it for links.
3. **Button variants live in `{components.button-primary}` and `{components.button-secondary}`.** New button styles should extend these, keeping the 8px radius (`{rounded.md}`) and 12px 16px padding.
4. **Respect the weight ceiling.** Keep UI type at 400/500/600 (the `{typography.title-*}` and `{typography.body-*}` tokens); only `{typography.button}` uses 700.
5. **Elevation is tonal + hairline first.** Add depth by stepping to `{colors.surface-raised}` and applying `{colors.border}`, reaching for the `{components.card}` glow shadow only for floating panels — never hard black shadows.
6. **Keep letter-spacing normal.** Every typography token is untracked; do not introduce spacing to create emphasis.
7. **Unbreakable boundaries:** dark violet base (never pure black backgrounds), single purple accent, mint reserved for success, 1px hairlines everywhere, and no gradients.

## Known Gaps

- **Serif display tokens dropped.** Two `typography.display` tokens (Newsreader) were dropped during grounding because the font family was not detected in the measured DOM, yet the visual analysis clearly shows serif headlines. The serif role is real but has no shipped token — reconstruct it manually with Newsreader if needed.
- **One page failed to capture.** `https://railway.com/new` timed out, so any components unique to that surface are unrepresented.
- **Hover, focus, and active states unverified.** Token values describe resting states only; button hover, link hover, input focus rings, and pressed states were not captured.
- **Animation and scroll behavior unknown.** The left-edge timeline/rail scroll-progress motif is described visually but its motion and transitions were not measured.
- **Auth-walled and dashboard surfaces absent.** Only public marketing pages were captured; the actual product UI behind login was not reached.
- **Monospace and code-panel styling underspecified.** JetBrains Mono appears in evidence but has no dedicated token; code-context type must be inferred.
- **Breakpoint values unknown.** Only two viewports were captured, so exact responsive breakpoints and table-reflow behavior are inferred, not measured.
- **Navbar border evidence conflicts.** The token sets a 1px border while landmark measurement reported 0px; the hairline treatment on the header is uncertain.
