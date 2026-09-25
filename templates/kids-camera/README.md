# Kids Camera

A one-page story site for a physical product made for children, built from the
canvas scaffold (`scaffold-sdk`) with `@canvas/react` vendored in
`src/lib/canvas-react/`.

```bash
npm install
npm run dev     # → http://localhost:3120
```

## What is where

| | |
| --- | --- |
| `src/content.ts` | Every word and photograph. The story, in order. |
| `src/index.css` | Every colour, shadow, radius, font, type size, spacing step and easing, as tokens. |
| `src/components/ui/` | shadcn primitives: `button`, `input`, `sheet`, and `container`. |
| `src/components/blocks/` | Pieces used more than once: `Photo`, `NewsletterPill`, `CaptionBlock`, the stickers, the swirl, the wordmark. |
| `src/components/sections/` | The page, one file per section, in the order `App.tsx` lists them. |
| `src/hooks/` | Lenis (held in a ref, where the editor's SDK finds it) and the media queries that switch the pinned scenes off on phones and under reduced motion. |

## Motion

Framer Motion (`motion/react`) for the scroll-linked scenes, Lenis for the
scroll. Everything moves with transform, opacity or clip-path. The durations
and the curve are tokens in `index.css`. Under `prefers-reduced-motion`, Lenis
is off, the pinned scenes become stacked layouts, and the entrances only fade.

## Photographs

From [Pexels](https://www.pexels.com). A photo slot in `content.ts` is a Pexels
id and alt text. `query` records the search it came from, so a picture can be
swapped for another of the same tone. A slot whose `id` is `null` renders an
empty frame in the swirl tone.

## Editor

`#root`, the page wrapper, `<main>` and `Container` carry `data-canvas-ignore`,
so the canvas editor's pointer looks through them to the sections.
