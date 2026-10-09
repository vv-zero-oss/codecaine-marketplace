# Kestrel — spend management

A marketing site for Kestrel, an invented spend platform where agents chase
receipts, code bills and close the books. White page, warm-grey product
panels on a dot grid, one lime button, soft layered shadows, and a single
neo-grotesk on a golden-ratio scale.

```bash
npm install
npm run dev     # → http://localhost:3370
```

## Pages

| Path | What it is |
| --- | --- |
| `/` | The story: hero stage → proof → platform bento → *six tools become one* (pinned scroll) → how a dollar moves (pinned walkthrough) → team story → policy agent → scale → savings calculator → receipts → closing ask |
| `/platform` | Every module, with a pinned module nav and a working mini-UI per module |
| `/pricing` | Monthly/annual plans, a full comparison table, FAQ |
| `/customers` | Featured story, industry filters, story drawer |
| `/brand` | Brand guidelines, read live from the tokens in `src/index.css` |

## System

- **Type** — Inter Tight and Geist Mono, from Google Fonts. The scale steps
  by φ half-steps (×1.272) from a 16px body, so every second step is ×1.618:
  `caption 12.6 · body 16 · lead 20.4 · h4 25.9 · h3 32.9 · h2 41.9 · h1 53.3 ·
  display 67.8 · mega 109.7 · giga 177.4`. Tracking tightens as size grows,
  from −0.006em to −0.058em.
- **Tokens** — every colour, shadow, radius, easing and duration is a CSS
  custom property in `src/index.css`, exposed through Tailwind's `@theme`.
- **Motion** — Framer Motion (`motion/react`) and Lenis. Every complex piece
  is a named component in `src/components/motion/` with scalar props, and
  every hidden state is a switch in the canvas editor (`useCanvasAction`).

## Editor plumbing

`@canvas/react` is vendored in `src/lib/canvas-react/` (with the two aliases
and `canvasPropOptions()` in `vite.config.ts`); `src/main.tsx` imports the
hook first and renders `<CanvasDesign />` in dev. Structural wrappers carry
`data-canvas-ignore`.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). Kestrel, its customers, people, figures and
quotes are invented.
