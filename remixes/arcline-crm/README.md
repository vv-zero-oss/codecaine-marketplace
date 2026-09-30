# Arcline — AI CRM

A minimal, dark five-page site for **Arcline**, a fictional CRM whose agents
do the busywork of selling. Built from `remixes/sdk-scaffold`, so the canvas
editor reads it by component.

```bash
npm install
npm run dev     # → http://localhost:3160
```

## Pages

| Path | What it answers |
| --- | --- |
| `/` | What it is, how it works chapter by chapter, why it's accurate, does it fit my stack, does it work |
| `/agents` | What asking Arcline is like, for each role, and the prompts to start from |
| `/customers` | Who sells on it, three stories in full and four in brief |
| `/pricing` | Four plans, a monthly/annual switch, every feature side by side, FAQ |
| `/changelog` | Every release, filterable by kind |

A forty-line router (`src/lib/router.tsx`) switches pages without a reload,
on real paths, so the address bar and the editor's Pages list agree.

## The look

A hairline frame: two vertical rules a gutter in from the window, sections
meeting at horizontal rules. Inter at its display optical size for
headings, two-tone headlines (the first sentence in full ink, the rest
muted), body text at 14–16px and nothing larger than 18px under a heading.
Buttons are 36px with 10px corners; hovers arrive in 50ms and leave over
300ms. Every colour, shadow, radius, type step and curve is a token in
`src/index.css`.

## Where things live

- `src/content/` — every word, per page. `src/photos.ts` — the Pexels photos.
- `src/pages/` — one file per page, each a list of sections.
- `src/components/sections/` — the home page's sections, reused by the others.
- `src/components/mockups/` — the product, drawn in HTML: the hero's app
  window (a scripted loop), the companies table and email composer, the
  enrichment radar, prompt-to-list, intent score, workflow builder, pipeline
  board, analyst card, charts, signals feed and the record page that
  assembles itself. `Fit` scales each one to the width it is given.
- `src/components/primitives/`, `src/components/atoms/` — agent-UI
  primitives from [Beautiful UI](https://www.beautifului.dev) (MIT), with
  their helper styles in `src/styles/primitives.css`: the suggestion card,
  the agent task run, the streaming answer, the gliding menu highlight and
  the shimmer.
- `src/components/icons/isocon.tsx` — isometric line icons from
  [Isocons](https://isocons.app) (CC BY 4.0, recoloured to `currentColor`),
  which trace themselves in on hover.
- `src/components/motion/` — `Reveal` (focus-in on scroll), `Marquee`,
  `SmoothScroll` (Lenis), `TypewriterPrompt`.

## In the editor

Actions: **Announcement** and **Mobile menu** (Header), **Hero scene**
(Hero), **Next chapter** (Platform), **Signal** (Deal Memory), **Code
copied** (Developers), **Next story** (Customers), **Subscribed**
(Newsletter), **Annual billing** (Pricing) and **Next persona** (Agents).
Loops hold still while the page is designed and for reduced motion.

## Credits

Photography from [Pexels](https://www.pexels.com). Isometric icons from
[Isocons](https://isocons.app), licensed
[CC BY 4.0](https://creativecommons.org/licenses/by/4.0/) and recoloured.
Agent-UI primitives from Beautiful UI, MIT © 2026 Shane Levine. Logos from
[SVGL](https://svgl.app).
