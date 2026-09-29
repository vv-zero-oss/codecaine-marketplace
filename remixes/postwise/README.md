# Postwise — AI Email

A landing page for Postwise, an AI email assistant that reads, sorts and
drafts your email in your own voice.

```bash
npm install
npm run dev     # → http://localhost:3170
```

## The page

Top to bottom, as a conversation: the hero (a drifting sea-glass light and
the product rising out of a blur) → customer logos → the numbers, framed in
hairlines → a quote → **Scribe**, the copilot, on deep lagoon teal with notes
floating off the product and rows of signals drifting past → how it works, in
three cards → the platform as a clickable deck → the "zero inbox" band →
personas as tabs → the team dashboard over a sunlit desk → a results bento →
customer stories in a duotone carousel → pricing, monthly or yearly → FAQ →
articles → the wall of love → the closing ask and the footer.

All copy lives in `src/content.ts`; every colour, shadow, radius, font and
motion curve is a token in `src/index.css`.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/` (see
  `vite.config.ts`); `src/main.tsx` renders `<CanvasDesign />` in dev.
- Motion pieces are named components in `src/components/motion/` —
  `GradientBlob`, `RiseIn`, `FeatureDeck`, `Marquee`, `ParallaxColumns`,
  `ParallaxImage`, `TiltCard`, `Typewriter`, `Reveal`, `SmoothScroll` — with
  their knobs as scalar props. The stories carousel is shadcn's Embla
  carousel, its API held in state; the featured plan wears `border-beam`.
- Hidden states are editor actions: the mobile menu, the Product menu, the
  floating nav, each deck card, each persona tab, the results' story overlay,
  each customer story, yearly billing, each FAQ answer and every trial
  form's sent state.
- Structural wrappers (`#root`, the page wrapper, `<main>`, `Container`,
  `ScaledFrame`'s inner layer, marquee tracks) carry `data-canvas-ignore`.

Photography from [Pexels](https://www.pexels.com); logos from
[SVGL](https://svgl.app); icons from [Lucide](https://lucide.dev).
