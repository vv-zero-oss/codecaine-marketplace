# Arcline — AI CRM landing page

A dark, editorial landing page for **Arcline**, a fictional AI CRM that logs
every touch, qualifies every lead and forecasts every quarter. Built from
`remixes/sdk-scaffold`, so the canvas editor reads it by component.

```bash
npm install
npm run dev     # → http://localhost:3160
```

## What is on the page

Hero with a self-typing ask box in a border beam → a logo strip that rolls
over cell by cell → the intro, with two interlocking photographs → a
signal-to-deal flow figure and three agent cards with animated pixel
readouts → the agents launch card → six features → a product window whose
panel changes with the tab beside it → customer results under two drifting
logo rows → pricing with a monthly/yearly switch → FAQ → latest posts →
the closing call to action → the footer and its full-width wordmark.

## Where things live

- `src/index.css` — every colour, shadow, radius, font and motion curve, as
  tokens in `@theme`.
- `src/content.ts` — every word on the page. `src/photos.ts` — the Pexels
  photographs and their photographers.
- `src/components/sections/` — one file per section, in page order in
  `App.tsx` (`?only=<section id>` renders one on its own).
- `src/components/motion/` — the moving parts, each a named component with
  scalar props: `SmoothScroll` (Lenis), `LogoSwap`, `TypewriterPrompt`,
  `FlowDiagram`, `PixelMatrix`, `TerminalLog`, `Marquee`, `ParallaxImage`,
  `Reveal`.
- `src/components/ui/` — shadcn primitives (button, navigation menu, sheet,
  tabs, accordion) plus `BorderBeam`, `BrandLogo` (SVGL logos in one flat
  colour) and the Arcline wordmark.

## Border beam

`BorderBeam` (`src/components/ui/border-beam.tsx`) takes the same props as
the `border-beam` package — `size`, `colorVariant`, `strength`, `active`,
`theme` — drawn in CSS so the editor's Motion switch can stop it. To use the
package instead, `npm install border-beam` and change the import to
`import { BorderBeam } from "border-beam"`.

## In the editor

Actions: **Mobile menu** (Header), **Next prompt** and **Next logo set**
(Hero), **Film playing** (Showcase), one switch per **Workspace** tab,
**Yearly billing** (Pricing) and **First answer open** (FAQ). Loops hold
still while the page is being designed and for reduced motion.

Photography from [Pexels](https://www.pexels.com); logos from
[SVGL](https://svgl.app).
