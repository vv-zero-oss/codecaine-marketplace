# Kerfuffle Studio

A multi-page site for a motion studio — animation, video and social content —
that is loud on purpose: cream paper, flame orange, acid lime and a deep forest
green; heavy condensed caps answered by italic serif words; rounded,
ink-outlined cards and pill buttons; stickers everywhere; and something moving
on every screen.

```bash
npm install
npm run dev     # → http://localhost:3320
```

## Pages

| Path | What is on it |
| --- | --- |
| `/` | Hero with a cursor image trail and a client marquee · hello from the crew · a pinned reel of the latest projects · numbered services fanning out · the crew grid · CTA |
| `/about` | “Makers at heart” with stickers that pop on (click to add more) · numbers that count up · the crew with roles · the studio manifesto |
| `/work` | The archive: every case, filterable by service; pictures lift off their colour block on hover |
| `/work/<slug>` | A case study: title and facts, a colour panel, the brief, the result on green, a gallery, up next |
| `/what-we-do` | “Three flavours of motion” · animation, video and social, each with a colour panel · four steps · FAQ |
| `/contact` | “Say hello” · call / write · a brief form with inline validation and a thank-you state · FAQ |
| `/brand` | The style guide: tokens read live from `index.css`, the type scale, motion curves and every component |

## How it is built

- **Tokens** — every colour, shadow, radius, font, spacing step and motion
  curve is a custom property in `src/index.css`, exposed through Tailwind's
  `@theme`. The `display`, `display-serif` and `label` utilities are the
  three type voices.
- **Fonts** — Google Fonts, linked in `index.html`: Archivo (condensed via
  its width axis), Instrument Serif in italics, Shrikhand for the name and
  name tags.
- **Components** — shadcn primitives in `components/ui/` (sheet, accordion,
  input, textarea, label, plus the studio's own pill button, arrow link,
  heading, sticker, badge, snapshot and wordmark), sections in `components/sections/`, the header and
  footer in `components/layout/`.
- **Motion** — each moving piece is a named component in
  `components/motion/` with scalar props the canvas editor can change:
  `BrushTransition` (the page change), `ImageTrail`, `Marquee`, `CardStack`,
  `FanCards`, `StickerBurst`, `ScrollBadge`, `Parallax`, `Reveal`,
  `CountUp`. Motion (Framer Motion) and CSS do the animating; Lenis carries
  the scroll and is held in a ref (`SmoothScroll`). Everything respects
  `prefers-reduced-motion`, and the editor's Motion switch.
- **Editor actions** — hidden states are registered with `useCanvasAction`:
  the mobile menu, the page transition, stickers, the work filter, the first
  FAQ answer, and the contact form's error and sent states.
- **Router** — `src/lib/router.tsx`: real paths, one pattern
  (`/work/<slug>`), and page changes routed through the brush transition.

All copy and content lives in `src/content.ts`.

## Credits

Photography from [Pexels](https://www.pexels.com), loaded from its CDN.
Icons from [Lucide](https://lucide.dev). `@canvas/react` is vendored in
`src/lib/canvas-react/` (see `vite.config.ts`).
