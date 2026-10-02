# Heirloom

A dark, cinematic landing page for a fictional private family office, built as
a remix for the canvas editor. Vite, React 19, Tailwind v4, Motion and Lenis,
with `@canvas/react` vendored in `src/lib/canvas-react/`.

```bash
npm install
npm run dev     # http://localhost:3350
```

## Sections

Hero (photographs crossfade) → programs → founders collage → stats and circle
marquee → partners → two full-bleed photo bands → footer. `/brand` is the
style guide, read live from `src/index.css`.

## Where things live

- `src/index.css` — every colour, shadow, radius, font and easing, as tokens.
- `src/content.ts` — the copy, names and photographs.
- `src/components/motion/` — `BlurWords`, `Reveal`, `Slideshow`, `CountUp`,
  `Marquee`: named components whose knobs are scalar props the editor can edit.
- `src/components/sections/` — one file per section; `SectionIntro` repeats.

The mobile menu is registered as an editor action ("Mobile menu").

## Credits

Photography from [Pexels](https://www.pexels.com). Heirloom and the people
and organisations named on the page are invented.
