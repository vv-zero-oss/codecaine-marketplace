# Kerfuffle Studio

A multi-page site for a small motion studio — animation, film and social
content. Editorial and restrained: paper and ink with one accent colour, one
typeface plus a mono for labels, a twelve-column grid with numbered section
labels and hairlines. The photography carries the colour; motion is used in a
few places where it has a job.

```bash
npm install
npm run dev     # → http://localhost:3320
```

## Pages

| Path | What is on it |
| --- | --- |
| `/` | A one-sentence hero with finished work dropping under the pointer · client names · a pinned reel of four recent projects · services with a hover preview · the studio · the team · contact |
| `/about` | What the studio is · numbers that count up · the team with roles · how we work |
| `/work` | Every project, filterable by service |
| `/work/<slug>` | A case study: title and facts, a full-bleed image, the brief, the result, next case |
| `/what-we-do` | Animation, film and social, each with deliverables · the process · FAQ |
| `/contact` | Email, phone and address beside a brief form with inline validation · FAQ |
| `/brand` | The style guide: tokens read live from `index.css`, the type scale, grid, motion and every component |

## How it is built

- **Tokens** — every colour, radius, shadow, spacing step and motion curve is a
  custom property in `src/index.css`, exposed through Tailwind's `@theme`. Two
  type utilities: `display` for headings and `label` for mono meta.
- **Fonts** — Google Fonts, linked in `index.html`: Instrument Sans and
  JetBrains Mono.
- **Components** — shadcn primitives in `components/ui/` (sheet, accordion,
  input, textarea, label, plus button, arrow link, section header and
  wordmark), sections in `components/sections/`, header and footer in
  `components/layout/`.
- **Motion** — each moving piece is a named component in `components/motion/`
  with scalar props the canvas editor can change: `BrushTransition` (page
  changes), `ImageTrail`, `CardStack`, `HoverPreview`, `Marquee`, `Parallax`,
  `Reveal`, `CountUp`. Motion (Framer Motion) and CSS do the animating; Lenis
  carries the scroll and is held in a ref (`SmoothScroll`). Everything
  respects `prefers-reduced-motion` and the editor's Motion switch.
- **Editor actions** — hidden states registered with `useCanvasAction`: the
  mobile menu, the page transition, the work filter, the first FAQ answer, and
  the contact form's error and sent states.
- **Router** — `src/lib/router.tsx`: real paths, one pattern (`/work/<slug>`),
  page changes routed through the brush transition.

All copy lives in `src/content.ts`.

## Credits

Photography from [Pexels](https://www.pexels.com), loaded from its CDN. Icons
from [Lucide](https://lucide.dev). `@canvas/react` is vendored in
`src/lib/canvas-react/` (see `vite.config.ts`).
