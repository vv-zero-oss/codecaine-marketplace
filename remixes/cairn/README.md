# Cairn — AI Map Maker

A marketing site and working map maker for Cairn, a (fictional) AI tool for
guides, directories and event maps. Every map on the site is the same React
component drawn over **Halden Bay**, a made-up harbour city in SVG.

```bash
npm install
npm run dev   # http://localhost:3440
```

## Pages

| Path         | What it is                                                                  |
| ------------ | --------------------------------------------------------------------------- |
| `/`          | Hero, press, a live phone map, the pinned four-step story, a newsletter embed, a live spreadsheet, templates, the studio, voices, the sticker CTA |
| `/templates` | Filter by kind (`?kind=Travel`), search, preview at full size, open in the studio |
| `/studio`    | The map maker: Ask Cairn, click-to-add, drag to reorder, styles, reader preview, share — saved to `localStorage` |
| `/pricing`   | Monthly/yearly, a views calculator, comparison table, FAQ                   |
| `/brand`     | The style guide, read live from the tokens and the real components          |

## Where things are

- `src/index.css` — every token: palette (built and audited with the Coolors
  MCP), the golden-ratio type scale with its tracking, shadows, radii, motion,
  and the four map themes (`.map-paper`, `.map-harbour`, `.map-meadow`, `.map-dusk`).
- `src/components/map/` — `MapBase` (the SVG), `CityMap` (pan, zoom, pins),
  `MapPin`, `GuidePanel` / `MapGuide`, and the browser and sky frames.
- `src/content/places.ts` — the places, neighbourhoods and categories;
  `templates.ts` — the templates.
- `src/lib/ask.ts` — "Ask Cairn". It matches plain words against the
  directory; swap `ask()` for a call to your model and nothing else changes.
- `src/components/motion/` — `Reveal`, `CountUp`, `Typewriter`,
  `StickerField`, `SmoothScroll` (Lenis), `RouteTransition`.

Hidden states (menus, dialogs, the story's steps, studio tabs, empty and
loading states) are registered as editor actions with `useCanvasAction`.

## Credits

Photography from [Pexels](https://www.pexels.com). Google logo from
[SVGL](https://svgl.app). Icons from [Lucide](https://lucide.dev). Fonts
(Newsreader, Instrument Sans, JetBrains Mono) from Google Fonts.
