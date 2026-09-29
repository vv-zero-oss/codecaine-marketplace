# AI Canvas

A launch page for **Boundless**, an AI canvas: prompt, sketch and shape pages
on an endless canvas, then publish them live. Built from `sdk-scaffold` and
opted into `@canvas/react`, so every section and every moving piece shows up
by name in the canvas editor.

```bash
npm install
npm run dev     # → http://localhost:3170
```

## The page

| Section | What moves |
| --- | --- |
| `Hero` | `InfiniteCanvas` — WebGL, endless, drifting. Photos blur in, then frames, live pages, a selection with an agent cursor, a prompt and a component sheet build in behind them over a dot grid. Scrolling pushes it (with motion blur) and washes it out to paper; the first line of the story sharpens in its place. Drag it. |
| `Scatter` | `ScatterTiles` — photos blurring in one by one round the words |
| `SeparateWorlds` | `DriftBand` — forty years of machines drifting past, captioned; the headline word by word |
| `EndsToday` | the product shot rising to the golden measure, lines swapping over its faded edge |
| `Manifesto` | `SteppedWords` — a sentence set down a mauve panel as you scroll |
| `LivePages` | pinned: prompt → shape → publish, shot and status toast swapping with blur crossfades |
| `Together` | `FlyingCursors` — people and agents gathering on the headline, blurred by scroll speed |
| `Branches` | version control as a diagram drawn on the scroll: branch, agent review, merge to main |
| `KnowsYourSystem` | `Typewriter` prompt → the mark becomes a button → wires to its tokens |
| `Film` | a film opening from a golden window to full bleed; play/pause at the centre |
| `RunFree`, `Place` | `CyclingImage` in the sentence; lines sharpening from muted ink |
| `CallToAction` | the closing glow, `PortalMark`, the big pill and `LogoMarquee` |
| `SiteFooter` | links, small print and the name set giant |

Every white scene is pinned while you read it (`ScrollScene`) and leaves with
a scroll-tied blur.

### Composition

Pinned stages are cut on the golden section — `rows-golden-below` /
`rows-golden-above` put the picture in the 61.8% band and the words in the
38.2% one; diagrams and shots take `w-golden` (61.8% of the screen); the
film's headline sits on the 76.4% line and the close on the 38.2% line.
Spacing steps are a φ scale (`phi-1`…`phi-8`: 8, 13, 21, 34, 55, 89, 144, 233).

## Changing it

- **Words and photographs**: `src/content.ts`. The product name is `brand.name`.
- **Colours, shadows, radii, type scale, curves**: tokens in `src/index.css`.
- **What lies on the canvas**: `src/components/canvas/scene.ts` — the frames'
  cells and how each is painted.
- **The canvas's knobs** (props, editable in the editor): `speed`,
  `direction`, `motionBlur`, `intro` (`warp` / `fade` / `none`), `dotGrid`,
  `focus`, `paused`.

## In the editor

- The canvas drift is a GSAP tween held in a ref and Lenis is held in a ref, so
  the Motion switch stops both; everything else is Framer Motion or CSS.
  Reduced motion stops the drift and drops every blur.
- Actions: **Hero · Canvas drift**, **Header · Mobile menu**, **Live pages ·
  Prompt / Shape / Publish**, **Version control · Branch / Review / Merge**,
  **Agent · Generated**, **Film · Film playing**.
- Designing, the hero's entrance and the agent sequence hold at their end state.

Photography and film from [Pexels](https://www.pexels.com); logos from
[SVGL](https://svgl.app). Font: Inter, from Google Fonts.
