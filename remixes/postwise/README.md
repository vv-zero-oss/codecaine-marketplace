# Postwise — AI Email

A landing page for Postwise, an AI email assistant that reads, sorts and
drafts your email in your own voice.

```bash
npm install
npm run dev     # → http://localhost:3170
```

## The page

Top to bottom, as a conversation: the hero (a drifting ember-and-lilac light,
a paper plane, the product rising out of a blur) → customer logos → a quote →
**Scribe**, the copilot, on a dark ground with notes floating off the product
and rows of signals drifting past → the platform as a clickable deck of cards →
the midnight "zero inbox" band → personas as tabs → a results bento → articles →
the wall of love → the closing ask and the footer.

All copy lives in `src/content.ts`; every colour, shadow, radius, font and
motion curve is a token in `src/index.css`.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/` (see
  `vite.config.ts`); `src/main.tsx` renders `<CanvasDesign />` in dev.
- Motion pieces are named components in `src/components/motion/` —
  `GradientBlob`, `PaperPlane`, `RiseIn`, `FeatureDeck`, `Marquee`,
  `ParallaxColumns`, `TiltCard`, `Typewriter`, `Reveal`, `SmoothScroll` —
  with their knobs as scalar props.
- Hidden states are editor actions: the mobile menu, the Product menu, the
  floating nav, each deck card, each persona tab, the results' story overlay
  and every trial form's sent state.
- Structural wrappers (`#root`, the page wrapper, `<main>`, `Container`,
  `ScaledFrame`'s inner layer, marquee tracks) carry `data-canvas-ignore`.

Photography from [Pexels](https://www.pexels.com); logos from
[SVGL](https://svgl.app); icons from [Lucide](https://lucide.dev).
