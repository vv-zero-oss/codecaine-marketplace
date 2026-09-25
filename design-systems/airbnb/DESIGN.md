---
version: alpha
name: Airbnb
description: Airbnb's design language is warm, friendly and airy — clean white surfaces framed by soft grey hairlines, generous rounding and its unmistakable 'Rausch' coral-red accent reserved for primary actions and brand moments. Content leads with the rounded, geometric Airbnb Cereal typeface at approachable sizes, the header floats transparently over the page with an oversized search pill, and elevation comes from soft, low-opacity shadows rather than hard borders. Interfaces stay quiet and neutral so photography and the pink CTA carry the emphasis.
colors:
  primary: "#FF385C"
  primary-strong: "#DA1249"
  ink: "#222222"
  ink-black: "#000000"
  body: "#6C6C6C"
  muted: "#606060"
  muted-light: "#C1C1C1"
  disabled: "#D1D1D1"
  surface: "#FFFFFF"
  surface-muted: "#F2F2F2"
  surface-footer: "#F7F7F7"
  hairline: "#DDDDDD"
  success: "#038026"
  on-primary: "#FFFFFF"
typography:
  display-lg:
    fontFamily: Airbnb Cereal VF
    fontSize: 22px
    fontWeight: 500
    lineHeight: 1.2
    letterSpacing: -0.44px
  title-md:
    fontFamily: Airbnb Cereal VF
    fontSize: 16px
    fontWeight: 500
    lineHeight: 1.25
  body-lg:
    fontFamily: Airbnb Cereal VF
    fontSize: 16px
    fontWeight: 400
    lineHeight: 1.5
  body:
    fontFamily: Airbnb Cereal VF
    fontSize: 15px
    fontWeight: 400
    lineHeight: 1.25
  body-md:
    fontFamily: Airbnb Cereal VF
    fontSize: 14px
    fontWeight: 400
    lineHeight: 1.45
  body-strong:
    fontFamily: Airbnb Cereal VF
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.3
  button:
    fontFamily: Airbnb Cereal VF
    fontSize: 14px
    fontWeight: 500
    lineHeight: 1.5
  caption:
    fontFamily: Airbnb Cereal VF
    fontSize: 13px
    fontWeight: 400
    lineHeight: 1.25
  micro:
    fontFamily: Airbnb Cereal VF
    fontSize: 12px
    fontWeight: 400
    lineHeight: 1.35
  micro-bold:
    fontFamily: Airbnb Cereal VF
    fontSize: 12px
    fontWeight: 700
    lineHeight: 1.35
  label-caps:
    fontFamily: Airbnb Cereal VF
    fontSize: 11px
    fontWeight: 600
    lineHeight: 1.2
rounded:
  sm: 4px
  md: 8px
  lg: 12px
  xl: 20px
  2xl: 32px
  pill: 40px
  full: 9999px
spacing:
  xs: 2px
  sm: 4px
  md: 6px
  base: 8px
  lg: 10px
  xl: 12px
  2xl: 14px
  3xl: 16px
  section: 48px
  section-lg: 96px
components:
  button-primary:
    backgroundColor: "{colors.primary}"
    textColor: "{colors.on-primary}"
    typography: "{typography.button}"
    rounded: "{rounded.md}"
    padding: 14px 24px
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.ink}"
    borderWidth: 1px
    typography: "{typography.button}"
    rounded: "{rounded.md}"
  search-pill:
    backgroundColor: "{colors.surface}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    rounded: "{rounded.full}"
    boxShadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.04) 0px 2px 6px 0px, rgba(0, 0, 0, 0.1) 0px 4px 8px 0px
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
    typography: "{typography.body-strong}"
    rounded: "{rounded.md}"
  input-focus:
    borderColor: "{colors.ink}"
    boxShadow: rgba(0, 0, 0, 0) 0px 0px 0px 1px, rgba(0, 0, 0, 0) 0px 0px 0px 4px, rgba(0, 0, 0, 0.18) 0px 2px 4px 0px
  card:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.lg}"
    boxShadow: rgba(0, 0, 0, 0.08) 0px 1px 2px 0px, rgba(0, 0, 0, 0.05) 0px 4px 12px 0px
  card-elevated:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.xl}"
    boxShadow: rgba(0, 0, 0, 0.02) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 8px 24px 0px
  avatar:
    rounded: "{rounded.full}"
    backgroundColor: "{colors.surface-muted}"
  badge:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    typography: "{typography.label-caps}"
    rounded: "{rounded.full}"
    boxShadow: rgba(0, 0, 0, 0.16) 0px 4px 10px 0px
  navbar:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    height: 96px
    borderWidth: 0px
    position: static
  nav-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  footer:
    backgroundColor: "{colors.surface-footer}"
    textColor: "{colors.ink}"
    height: 669px
    columns: "3"
    borderColor: "{colors.hairline}"
    borderWidth: 1px
  footer-link:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
  link:
    textColor: "{colors.ink}"
    typography: "{typography.body-md}"
---

# Airbnb

## Overview

Airbnb's interface is warm, friendly and airy — a quiet neutral canvas that lets candid home photography and a single coral accent do the emotional work. The system is built around clean white surfaces (`{colors.surface}` — #FFFFFF) framed by soft grey hairlines (`{colors.hairline}` — #DDDDDD), generously rounded geometry, and the unmistakable **Rausch** coral-red (`{colors.primary}` — #FF385C) reserved almost exclusively for primary actions and brand moments. Nothing shouts; the chrome stays deliberately restrained so listing images carry the color.

Density is medium-airy. Content is organized into horizontal, swipeable card carousels grouped under bold section headers, each card pairing a rounded photo with a compact two-line text block (title, then dates/host, then price/rating). Hierarchy is built through weight and size contrast in a single typeface rather than through color or rules — headings sit at weight 500, body text at weight 400, and micro-labels drop to 12–13px. The header floats transparently over the page with an oversized rounded search pill as the visual anchor.

Elevation is intentionally soft: surfaces are mostly flat and tonal, with cards and floating controls lifted by low-opacity drop shadows rather than hard borders. The overall effect is human, approachable, and photography-forward.

**Key Characteristics:**
- One typeface everywhere: Airbnb Cereal VF, rounded and geometric
- Coral **Rausch** (`{colors.primary}` — #FF385C) is the only saturated accent, reserved for primary CTAs and brand marks
- Fully rounded geometry — pills, circles, and soft-radius cards, no sharp corners
- Elevation from soft low-opacity shadows, not heavy borders
- Neutral surface stack (`{colors.surface}`, `{colors.surface-muted}`, `{colors.surface-footer}`) keeps chrome quiet
- Ink text (`{colors.ink}` — #222222) instead of pure black for a softer read
- Content-forward layout: swipeable photo carousels under bold section headers

## Colors

The palette is overwhelmingly neutral — white and grey surfaces, ink-grey text — with coral **Rausch** as the single point of saturation. There are no gradients anywhere in the system; color contrast comes from tonal surface shifts and the coral accent alone.

### Brand & Accent
- **Rausch** (`{colors.primary}` — #FF385C): the signature coral-red, reserved for primary action buttons, the wordmark, and brand moments. Used sparingly — it appeared as a text/interactive color across all pages but at low weight, confirming its role as an accent, not a field.
- **Rausch Strong** (`{colors.primary-strong}` — #DA1249): the darker pressed/hover state for coral surfaces.
- **Success Green** (`{colors.success}` — #038026): rare, used for positive/confirmation text only.

### Surface
- **White** (`{colors.surface}` — #FFFFFF): the primary canvas for cards, inputs, header, and search pill.
- **Muted Grey** (`{colors.surface-muted}` — #F2F2F2): secondary fills, avatar placeholders, and subtle interactive backgrounds.
- **Footer Grey** (`{colors.surface-footer}` — #F7F7F7): the faint warm-grey wash behind the footer.

### Text
- **Ink** (`{colors.ink}` — #222222): the dominant text color — softer than black, used for headings and body across every page.
- **Ink Black** (`{colors.ink-black}` — #000000): reserved for the highest-contrast text moments.
- **Body Grey** (`{colors.body}` — #6C6C6C): secondary text like dates, subtitles, and metadata.
- **Muted** (`{colors.muted}` — #606060): tertiary muted text.
- **Muted Light** (`{colors.muted-light}` — #C1C1C1): placeholder and de-emphasized text.
- **Disabled** (`{colors.disabled}` — #D1D1D1): disabled control text and icons.

### Hairlines & Borders
- **Hairline Grey** (`{colors.hairline}` — #DDDDDD): the universal 1px border for the search pill, inputs, cards, and footer divider. Every border in the system is 1px.

### On-Accent
- **On Primary** (`{colors.on-primary}` — #FFFFFF): white text/icons on coral surfaces.

There is no dark-mode token block in this system; the interface is light-only. A builder should not synthesize dark surfaces — the entire design assumes a white canvas.

## Typography

### Font Family
The entire system is set in **Airbnb Cereal VF** — a rounded, geometric variable typeface that carries the brand's friendly personality. It is the only family in the system (weight 4800 across all 8 pages) and appears at every level from 22px display down to 11px caps labels. There is no secondary or monospace family.

### Hierarchy
| Token | Size | Weight | Line Height | Letter Spacing | Use |
|---|---|---|---|---|---|
| `{typography.display-lg}` | 22px | 500 | 1.2 | -0.44px | Largest section/display headings |
| `{typography.title-md}` | 16px | 500 | 1.25 | normal | Card and section titles |
| `{typography.body-lg}` | 16px | 400 | 1.5 | normal | Comfortable reading body |
| `{typography.body}` | 15px | 400 | 1.25 | normal | Default body text |
| `{typography.body-md}` | 14px | 400 | 1.45 | normal | Nav links, footer links, dense body |
| `{typography.body-strong}` | 14px | 500 | 1.3 | normal | Emphasized body, input text |
| `{typography.button}` | 14px | 500 | 1.5 | normal | Button labels |
| `{typography.caption}` | 13px | 400 | 1.25 | normal | Captions, metadata |
| `{typography.micro}` | 12px | 400 | 1.35 | normal | Fine print |
| `{typography.micro-bold}` | 12px | 700 | 1.35 | normal | Emphasized micro text |
| `{typography.label-caps}` | 11px | 600 | 1.2 | normal | Small caps-style badge labels |

### Principles
The ladder runs on four weights: 400 (body), 500 (titles, buttons, emphasis), 600 (small caps labels), and 700 (micro-bold accents). Weight 500 does the bulk of the emphasis work — it is how titles separate from body. Letter-spacing is essentially untouched everywhere except the 22px display, which pulls in slightly (-0.44px) to keep large rounded glyphs tight. Line-height widens for reading contexts (1.45–1.5 for body) and tightens for headings and labels (1.2–1.3). Hierarchy is made through size and weight steps, never color shifts.

### Note on Font Substitutes
Airbnb Cereal is proprietary. For rebuilds without a license, **Circular**, **Nunito Sans**, or **Poppins** approximate its rounded geometric character; of the open-source options, Nunito Sans is the closest for body text. Tune by setting body weight to 400 and heading weight to 500–600, and apply the -0.44px tracking on large display text to match the tight, warm feel.

## Layout

### Spacing System
The base unit is 8px, but the scale is unusually fine-grained at small sizes to support tight card and control padding. The token ramp: `{spacing.xs}` 2px, `{spacing.sm}` 4px, `{spacing.md}` 6px, `{spacing.base}` 8px, `{spacing.lg}` 10px, `{spacing.xl}` 12px, `{spacing.2xl}` 14px, `{spacing.3xl}` 16px, then a large jump to `{spacing.section}` 48px and `{spacing.section-lg}` 96px for vertical section rhythm. The most-used measured values were 8px and 12px, confirming those as the workhorse gaps between cards and inline elements.

### Grid & Container
The home and search pages lay content into horizontal, swipeable card carousels — roughly 7 columns on desktop, condensing to 2–3 on mobile — grouped under bold section headers with 'see more' arrows. Gutters between image cards use the 8–12px spacing tokens consistently. The header stands 96px tall (`{components.navbar}` height). The footer is a 3-column link layout (`{components.footer}` columns: 3) roughly 669px tall.

### Whitespace Philosophy
Whitespace is generous and structural. The 48px and 96px section spacings create clear breathing room between carousel groups, while the fine 2–16px scale keeps individual cards compact and information-dense. The result is airy at the macro scale and efficient at the micro scale — photography gets room to breathe, but each card stays tight and scannable.

## Elevation & Depth

| Level | Treatment | Use |
|---|---|---|
| Flat | No shadow, tonal surface only | Page canvas, header bar, most content |
| Hairline | 1px `{colors.hairline}` border | Inputs, secondary buttons, footer divider |
| Raised pill | `{components.search-pill}` triple soft shadow (0.02/0.04/0.1 opacity) | Floating search pill, circular search button |
| Card | `{components.card}` shadow (0.08 + 0.05 opacity) | Standard content cards |
| Elevated card | `{components.card-elevated}` shadow (0.1 opacity, 8px 24px blur) | Modals, popovers, elevated surfaces |
| Badge float | `{components.badge}` shadow (0.16 opacity, 4px 10px) | 'Guest favorite' badges over photos |
| Input focus | `{components.input-focus}` shadow ring | Focused text inputs |

**Shadow philosophy.** Elevation is soft and low-opacity — Airbnb lifts elements with diffuse, barely-there shadows rather than hard borders or dark drop shadows. Most of the interface is flat and tonal; shadows appear only where an element genuinely floats above the page (the search pill, badges over photography, modals). Shadow opacity climbs with elevation intent: 0.04–0.1 for the resting search pill, 0.16 for badges that must read over busy photos, and layered 8px–24px blur for true overlays. The effect is gentle depth that never competes with the content.

## Shapes

### Border Radius Scale
| Token | Value | Use |
|---|---|---|
| `{rounded.sm}` | 4px | Small chips, subtle rounding |
| `{rounded.md}` | 8px | Buttons, inputs |
| `{rounded.lg}` | 12px | Standard cards |
| `{rounded.xl}` | 20px | Elevated cards, larger photo containers |
| `{rounded.2xl}` | 32px | Large surface rounding |
| `{rounded.pill}` | 40px | Pill controls, filter tabs |
| `{rounded.full}` | 9999px | Circles — avatars, icon buttons, search button, full pills |

The geometry is consistently, emphatically rounded — there are no sharp corners anywhere in the visible UI. Photo cards carry large soft radii (`{rounded.lg}` to `{rounded.xl}`), the search bar segments and filter tabs are fully pill-shaped, and interactive icons — the search button, avatars, heart/save toggles — are perfect circles via `{rounded.full}`. The 50% radius appeared most frequently in the evidence, confirming that circular controls are a defining motif. This rounded language reinforces the brand's warm, friendly, human tone.

## Components

### Navigation
**`navbar`** — The header stands 96px tall (`{components.navbar}` height) and sits `static` in the flow with a transparent-to-white background (`{colors.surface}`) and zero border width — it floats cleanly over the page with no hairline rule and no backdrop blur. It carries **5 nav links** styled in `{typography.body-md}` (14px, weight 400) in ink (`{colors.ink}` — #222222), plus a primary CTA button. The visual anchor is the oversized rounded search pill.

**`nav-link`** — Ink text (`{colors.ink}`) in `{typography.body-md}`. Quiet and unobtrusive; hierarchy in the header comes from the search pill and CTA, not the links.

**`search-pill`** — The signature control: white surface (`{colors.surface}`), 1px hairline border (`{colors.hairline}`), fully rounded (`{rounded.full}`), and lifted by a layered soft shadow (0.02/0.04/0.1 opacity). It anchors the header and expands into segmented pill sections for location/date/guests.

### Buttons
**`button-primary`** — Coral **Rausch** fill (`{colors.primary}` — #FF385C) with white text (`{colors.on-primary}`), `{typography.button}` (14px/500), `{rounded.md}` corners, and 14px 24px padding. The pressed/hover state deepens to `{colors.primary-strong}` (#DA1249). This is the only saturated button in the system.

**`button-secondary`** — White surface (`{colors.surface}`) with a 1px ink border (`{colors.ink}`), ink text, same `{typography.button}` and `{rounded.md}`. Used for lower-emphasis actions beside the primary CTA.

### Cards & Containers
**`card`** — White surface (`{colors.surface}`), `{rounded.lg}` (12px), soft two-layer shadow (0.08 + 0.05 opacity). The default carousel content card holding a rounded photo and two-line text block.

**`card-elevated`** — White surface, larger `{rounded.xl}` (20px) rounding and a deeper 8px 24px shadow. Used for modals and floating overlays such as the cookie dialog.

**`avatar`** — Fully circular (`{rounded.full}`) with a muted grey placeholder (`{colors.surface-muted}`). Used for host and user profile images.

### Inputs & Forms
**`input`** — White surface, 1px hairline border (`{colors.hairline}`), ink text (`{colors.ink}`), `{typography.body-strong}` (14px/500), `{rounded.md}` corners.

**`input-focus`** — On focus the border darkens to ink (`{colors.ink}`) and a soft shadow ring appears (0.18 opacity, 2px 4px). Focus is signaled by the darker border, not a colored glow.

### Badges & Chips
**`badge`** — The 'Guest favorite' style pill: white surface (`{colors.surface}`), ink text, `{typography.label-caps}` (11px/600), `{rounded.full}`, floated with a stronger 0.16-opacity shadow so it reads clearly over photography.

### Footer
**`footer`** — Warm-grey surface (`{colors.surface-footer}` — #F7F7F7) about 669px tall, `position: relative`, organized into **3 columns** and topped by a 1px hairline divider (`{colors.hairline}`). It holds ~31 links in `{typography.body-md}` (14px/400). On mobile it collapses into a stacked accordion-like list.

**`footer-link`** — Ink text (`{colors.ink}`) in `{typography.body-md}`. No CTA button in the footer.

**`link`** — General inline link: ink text (`{colors.ink}`), `{typography.body-md}`. Links are ink-colored rather than coral — the accent is reserved for actions.

## Do's and Don'ts

### Do
- Set all text in **Airbnb Cereal VF** — never introduce a second typeface; the whole system leans on this one family (measured across all 8 pages).
- Reserve coral **Rausch** (`{colors.primary}` — #FF385C) for primary actions and brand marks only; let photography carry the rest of the color.
- Use ink (`{colors.ink}` — #222222) for text instead of pure black to keep the read soft and warm.
- Lift floating elements with the soft shadow tokens (`{components.card}`, `{components.search-pill}`) rather than heavy borders.
- Keep controls fully rounded — pills (`{rounded.pill}`, `{rounded.full}`) for interactive chrome, `{rounded.lg}`–`{rounded.xl}` for photo cards.
- Build hierarchy with weight 500 (`{typography.title-md}`) against weight 400 body (`{typography.body-md}`), not with color.
- Separate sections with the large `{spacing.section}` (48px) / `{spacing.section-lg}` (96px) rhythm to stay airy.

### Don't
- Don't fill large surfaces with coral — `{colors.primary}` is an accent, appearing at low weight even where present.
- Don't add gradients; the system is flat, tonal, and photography-driven.
- Don't use hard or heavy drop shadows — cap opacity around the token levels (0.04–0.16).
- Don't introduce sharp corners; every corner in the system is rounded.
- Don't invent a dark theme — there is no dark token block; the canvas is white-only.
- Don't color links coral; links use ink (`{colors.link}` → `{colors.ink}`), and only actions get the accent.
- Don't tint borders — every border is 1px in hairline grey (`{colors.hairline}` — #DDDDDD).

## Responsive Behavior

This is a two-viewport analysis (desktop and mobile captures only); no intermediate breakpoint pixel values could be measured, so treat exact thresholds as unknown.

What the screenshots show: horizontal card carousels run roughly 7 columns wide on desktop and condense to 2–3 cards on mobile. The multi-column, masonry-like content grid reflows to a single-column vertical stack on mobile. The footer's 3-column link layout (`{components.footer}`) collapses into a stacked, accordion-like list on small screens. Mobile additionally introduces a sticky bottom navigation and an app-download banner not present on desktop.

Touch targets are supported by the padding tokens — the primary button carries 14px 24px padding (`{components.button-primary}`) and controls use fully rounded pill/circle shapes that keep tap areas generous. Because only two viewports were captured, this section is reported at low confidence.

## Iteration Guide

1. **Change accent via `{colors.primary}` only.** The coral Rausch and its pressed state `{colors.primary-strong}` are the single saturated pair — recolor there, never by scattering new hues across surfaces.
2. **Adjust type through the scale, not ad hoc sizes.** Emphasis lives in weight 500 tokens (`{typography.title-md}`, `{typography.button}`); keep body at weight 400 (`{typography.body-md}`). Do not add weights between the existing 400/500/600/700 steps.
3. **Button variants live in `{components.button-primary}` and `{components.button-secondary}`.** Primary = coral fill; secondary = ink-bordered white. Add new emphasis levels by composing existing tokens, not new colors.
4. **Elevation is token-bounded.** Use `{components.card}`, `{components.card-elevated}`, `{components.search-pill}`, and `{components.badge}` shadows — never author a shadow above ~0.16 opacity or the interface stops feeling like Airbnb.
5. **Keep everything rounded.** Pull radii from the `{rounded}` scale; circular controls use `{rounded.full}`, pills use `{rounded.pill}`. Sharp corners break the system.
6. **Preserve the white-only canvas.** There is no dark block — do not synthesize one; theme via the neutral surface stack (`{colors.surface}`, `{colors.surface-muted}`, `{colors.surface-footer}`).
7. **One typeface, always.** All new components inherit Airbnb Cereal VF; never introduce a second family.

## Known Gaps

- **Hover and pressed states** are inferred from token pairs (e.g. `{colors.primary-strong}` as the coral hover) but were not directly captured; interactive transitions and animation timing are unverified.
- **Focus states** beyond the `{components.input-focus}` shadow ring were not observed across all controls.
- **Auth-walled and transactional surfaces** (checkout, messaging, account settings) were not captured — only public marketing, search, and listing pages (8 pages captured).
- **Responsive behavior** rests on two viewports only; intermediate breakpoints and exact stacking thresholds are unknown.
- **Animation and carousel scroll behavior** (swipe physics, transitions) cannot be verified from static captures.
- **Rare colors** like `{colors.success}` (#038026) and `{colors.muted}` (#606060) appeared on only one page at very low weight, so their full usage context is thin.
- The **display-lg** style (`{typography.display-lg}`) was measured on a single page at low weight, so its role at scale is partly inferred.
- No values were dropped during grounding, so token coverage is otherwise complete for what was captured.
