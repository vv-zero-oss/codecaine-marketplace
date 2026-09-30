# Cirrus — Cloud Dev Environments

A landing page for Cirrus, which runs full development environments in the
cloud: any branch, any laptop, booted in about nine seconds.

```bash
npm install
npm run dev     # → http://localhost:3210
```

## The page

Top to bottom, as a conversation: the masthead and a field of drifting pixel
weather → a big opening line → what teams run on it (a card rail) → where it
started → what laptops are good and hopeless at → how it works (clone, boot,
build, ship) over a particle-stream diagram → the product, the Environment
Spec, over a second diagram → the levels of remote development → the stacks
it runs → per-minute pricing → FAQ → the answer in pixel lights, the ask and
a footer you can play Tetris on.

All copy lives in `src/content.ts`. Every colour, font, type step, spacing
step, the notch size, the one shadow and every motion curve is a token in
`src/index.css`. White paper under a faint 9px grid; navy, cobalt, gold,
signal red, lime and violet appear only as 8px squares on that pitch. Type is
Geist and Geist Mono, linked from Google Fonts. Nothing is rounded: buttons
and chips have pixel-notched corners (`.notch`).

## Motion

Named components in `src/components/motion/`, each with its knobs as scalar
props:

- `PixelField` — the hero: noise-warped diagonal bands on the 9px grid that
  drift, with a ragged dripping foot that erodes upward as you scroll.
- `PixelStream` — `explore` / `spec`: particles flowing left to right into a
  shape that explains a process.
- `PixelMarquee` — a phrase drawn tiny, thresholded, and each surviving pixel
  blown up into a flickering square, scrolling past.
- `TetrisSkyline` — pieces falling onto a skyline; press play to steer them.
- `TyperText` — headings that type in: each letter flickers through a filled
  bar, a lime highlight and an outline before it lands.
- `GhostyImage` — photographs that bleed in through a feathered mask.
- `SmoothScroll` — Lenis.

The canvases render from an endless GSAP tween held in a ref
(`frame-loop.ts`), so the canvas editor's Motion switch can stop and resume
them; all of them honour reduced motion, and the typer and image reveals hold
their end state while the page is being designed.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/`; `src/main.tsx`
  renders `<CanvasDesign />` in dev.
- Hidden states are editor actions: each FAQ answer, both card rails scrolled
  to the end, the corner link, and Tetris play mode.
- Structural wrappers (`#root`, the page wrapper, `<main>`, `Container`, the
  rail tracks) carry `data-canvas-ignore`.

Photography from [Pexels](https://www.pexels.com); icons from
[Lucide](https://lucide.dev). Cirrus, its customers and its figures are
fictional.
