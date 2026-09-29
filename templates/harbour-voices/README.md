# Harbour Voices

An oral-history archive for an invented port town: eighty-four people who
worked the port of Vela, each with a portrait and one story in their own
words.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## The views

| Path | What it is |
| --- | --- |
| `/` | Every portrait on an endless sheet, drawn with WebGL. Drag or scroll to move, pinch or ⌘/ctrl + scroll to zoom, click to open. Arrow keys and `+`/`−` once it has focus. The first visit plays an intro — a line of text, a diamond of portraits, then the burst into the grid (`?intro` replays it, `?nointro` skips it). |
| `/list` | The same people as a list, at night. |
| `/gallery` | Each portrait full screen, one after another; scroll, swipe or use the arrow keys. |
| `/story/:slug` | One person: the story (which the browser can read aloud), the portrait, the facts, the family album, and more voices. |
| `/about` | The project, and the volunteers who recorded the stories. |

FILTERS and SEARCH narrow the grid and the list together.

## Where things live

- `src/content.ts` — every word, the people, their stories, the volunteers.
- `src/photos.ts` — the Pexels photo ids and the photographer to credit for each.
- `src/index.css` — the tokens: ink and paper (and their night pair), the type scale, gutters, easings.
- `src/components/canvas/grid-renderer.ts` — the WebGL grid: layout, input, the intro, the exit.
- `src/components/ui/` — shadcn primitives restyled (`checkbox`, `input`, `sheet`) and the page's own (`bracket`, `scramble-text`, `type-reveal`).
- `src/components/story/` — the pieces of a story page.

To use your own archive, replace the people in `content.ts` and the ids in
`photos.ts`. The grid repeats a 12 × 7 block, so it expects 84 portraits;
change `COLUMNS` and `ROWS` in `grid-renderer.ts` to fit another number.

Photographs courtesy of [Pexels](https://www.pexels.com).
