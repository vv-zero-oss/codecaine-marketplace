# Overtime

Issue twelve of an invented long-read sports quarterly: eighty-four athletes
across eight sports, each with a portrait and a short profile built around
one question — what does it cost to keep going?

```bash
npm install
npm run dev     # → http://localhost:3140
```

## The views

| Path | What it is |
| --- | --- |
| `/` | Every athlete on an endless sheet, drawn with WebGL. Drag or scroll to move, pinch or ⌘/ctrl + scroll to zoom, click to open. Arrow keys and `+`/`−` once it has focus. While the sheet moves, each picture clips into a rounded window and blurs along the direction of travel, then settles when it stops. The first visit plays an intro — a line of text, a diamond of portraits, then the burst into the grid (`?intro` replays it, `?nointro` skips it). |
| `/list` | The same athletes as a list, with sport and club. |
| `/gallery` | Each portrait full screen, one after another; scroll, swipe or use the arrow keys. |
| `/story/:slug` | One athlete: headline, profile (which the browser can read aloud), portrait with the sport's glow behind it, the facts, frames from the archive, and more athletes. |
| `/about` | The issue, and the writers who profiled each athlete. |
| `/brand` | The brand guidelines — see below. |

FILTERS (by sport) and SEARCH narrow the grid and the list together.

## The style guide at `/brand`

`/brand` is the issue's brand guidelines page: the mark and the voice, every
colour token (paper and ink, the night tones of the list, the blend pair and
the eight sport accents) with its value and WCAG contrast, the type scale,
spacing, radii, borders, the absence of shadows, the motion curves (press
Play), glyphs and photography, and every component — the `ui/` primitives and
the composed pieces of the header, footer, intro, grid, list, about page and
profile — live, in its variants and states, with a copyable snippet. Each
value is read off the rendered element, so changing a token in
`src/index.css` changes the page. The WebGL grid, the intro and the header
are shown in frames; the full-screen gallery only as one still frame, since it
takes the whole window's wheel and keys. It lives in `src/pages/brand-page.tsx`
and `src/components/brand/`, and is reached from "Brand guidelines" in the
footer. A component added to the site is added there in the same change.

## Where things live

- `src/content.ts` — every word: the magazine, the athletes, their profiles, the writers.
- `src/photos.ts` — the Pexels photo ids, the photographer to credit, and each athlete's sport.
- `src/index.css` — the tokens: the dark paper and warm ink, one accent per sport, Overpass and Overpass Mono, radii, easings.
- `src/components/canvas/grid-renderer.ts` — the WebGL grid: layout, input, the clip and motion blur, the intro, the exit.
- `src/components/ui/` — shadcn primitives restyled (`checkbox`, `input`, `sheet`) and the page's own (`bracket`, `scramble-text`, `type-reveal`).
- `src/components/story/` — the pieces of a profile page.

To use your own roster, replace the athletes in `content.ts` and the ids in
`photos.ts`. The grid repeats a 12 × 7 block, so it expects 84 portraits;
change `COLUMNS` and `ROWS` in `grid-renderer.ts` to fit another number.

Photographs courtesy of [Pexels](https://www.pexels.com).
