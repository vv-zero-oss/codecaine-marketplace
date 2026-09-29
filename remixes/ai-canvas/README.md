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
| `Problem` | `BlurText` — the second line word by word |
| `Manifesto` | `SteppedWords` — a sentence set down a mauve panel as you scroll |
| `LivePages` | pinned: prompt → shape → publish, shot and status toast swapping with blur crossfades |
| `Together` | `FlyingCursors` — people and agents gathering on the headline, blurred by scroll speed |
| `KnowsYourSystem` | `Typewriter` prompt → button → wires drawn to its tokens |
| `RunFree`, `Place` | `CyclingImage` in the sentence; lines sharpening from muted ink |
| `CallToAction` | the big pill |

Every scene leaves with a scroll-tied blur (`ScrollScene`).

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
  Prompt / Shape / Publish**, **Agent · Generated**.
- Designing, the hero's entrance and the agent sequence hold at their end state.

Photography from [Pexels](https://www.pexels.com). Font: Inter, from Google Fonts.
