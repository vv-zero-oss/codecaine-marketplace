# Tidemark — Fintech

A landing page for Tidemark, business banking for startups: accounts, cards,
bill pay and a treasury that earns on idle cash.

```bash
npm install
npm run dev     # → http://localhost:3190
```

## The page

Top to bottom, as a conversation: the hero (a serif promise beside a
metal card that turns toward the pointer, a live balance that counts up, and
a payment that lands a moment later) → the companies that bank here → the
numbers → the product as a bento, each cell a small working UI → treasury on
the forest ground, with a yield calculator and its chart → getting started in
three steps → security → customers → pricing, monthly or yearly → FAQ → the
last ask → a footer with the disclosures a bank page owes its reader.

All copy lives in `src/content.ts`; every colour, shadow, radius, font and
motion curve is a token in `src/index.css`. Type is Instrument Serif, Geist
and Geist Mono, linked from Google Fonts. The two chart colours
(`--color-chart`, `--color-chart-night`) were checked against their surfaces
for lightness, chroma and contrast.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/` (see
  `vite.config.ts`); `src/main.tsx` renders `<CanvasDesign />` in dev.
- Motion pieces are named components in `src/components/motion/` —
  `MetalCard`, `CountUp`, `Sparkline`, `YieldChart`, `LiftCard`, `Marquee`,
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
