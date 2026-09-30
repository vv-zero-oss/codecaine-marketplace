# Tidemark — Fintech

A landing page for Tidemark, business banking for startups: accounts, cards,
bill pay and a treasury that earns on idle cash.

```bash
npm install
npm run dev     # → http://localhost:3200
```

## The page

Top to bottom, as a conversation: the hero (a warm-lit photograph with the
promise and the account form over it, a metal card that turns toward the
pointer, a payment that lands a moment later, a strip of balances that counts
up, and the name set edge to edge in pink, running off the section's foot) → the companies that bank here → the
numbers → the product as a bento, each cell a small working UI → treasury on
the oxblood ground, with a yield calculator and its chart → getting started in
three steps → security → customers → pricing, monthly or yearly → FAQ → the
last ask → a footer with the disclosures a bank page owes its reader.

All copy lives in `src/content.ts`; every colour, shadow, radius, font and
motion curve is a token in `src/index.css`: oxblood, cream, pink and coral,
square edges, almost no shadow. Type is Archivo in its extended width for
display and labels, Inter for reading and Geist Mono for figures, linked from
Google Fonts. The two chart colours
(`--color-chart`, `--color-chart-night`) were checked against their surfaces
for lightness, chroma and contrast.

## The style guide at `/brand`

`/brand` is Tidemark's brand guidelines page, in the site's own oxblood,
cream and wide caps: the wordmark and voice, every colour token with its value
and WCAG contrast for the real text pairs, the type scale, spacing, radii,
shadows, borders, the motion curves (press play), icons and imagery, and every
component — primitives, blocks, product art, motion pieces, section cards and
the site chrome — live in its variants and states with a copyable snippet. All
eleven home-page sections can be viewed whole, one at a time, at the end.
Every value is read off the rendered element, so changing a token in
`src/index.css` changes the page.

It lives in `src/pages/brand.tsx` and `src/components/brand/`, and is reached
from "Brand guidelines" in the footer (`src/lib/router.tsx` is a small router
for the two pages). A component added to the site is added there in the same
change.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/` (see
  `vite.config.ts`); `src/main.tsx` renders `<CanvasDesign />` in dev.
- Motion pieces are named components in `src/components/motion/` —
  `MetalCard`, `CountUp`, `GiantWordmark`, `Sparkline`, `YieldChart`, `LiftCard`, `Marquee`,
  `Reveal`, `SmoothScroll` — with their knobs as scalar props. They respect
  reduced motion and hold their end state while the page is being designed.
- Hidden states are editor actions: the mobile menu, the Product menu, the
  payment notification, the frozen card, yearly billing, each FAQ answer and
  every account form's sent state.
- Structural wrappers (`#root`, the page wrapper, `<main>`, `Container`,
  marquee tracks) carry `data-canvas-ignore`.

Photography from [Pexels](https://www.pexels.com); logos from
[SVGL](https://svgl.app); icons from [Lucide](https://lucide.dev). Tidemark,
its customers and its figures are fictional.
