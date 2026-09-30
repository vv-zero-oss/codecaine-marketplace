# Cirrus — Cloud Dev Environments

A landing page for Cirrus, which runs full development environments in the
cloud: any branch, any laptop, booted in about nine seconds.

```bash
npm install
npm run dev     # → http://localhost:3210
```

## The pages

- `/` — home, below.
- `/product` — the spec as a file (with a copy button), what it describes,
  six features with pixel icons, the workloads.
- `/network` — the server room again, four numbers, every region with its
  latency, and five edges drawn as their cities.
- `/pricing` — plans, a side-by-side comparison, the FAQ.
- `/changelog` — releases, newest first.
- `/brand` — the brand guidelines: logo, voice, every colour token with
  contrast ratios, the type scale, spacing, notches, shadows, the motion
  curves (playable), pixel icons, the isometric servers, imagery and every
  component, live — all read from the stylesheet at runtime.

A menubar runs across the top (the Product menu is shadcn's navigation menu,
with pixel icons; below `lg` it folds into a sheet), and every page's footer
draws a different edge region's skyline in line art over the Tetris
skyline. Routing is `src/router.tsx`: forty lines, real paths.

## Home

Top to bottom, as a conversation: the masthead and the server room at night
→ a big opening line → what teams run on it (a card rail) → where it
started → what laptops are good and hopeless at → how it works (clone, boot,
build, ship) over a particle-stream diagram → the product, the Environment
Spec, over a second diagram → the levels of remote development → the stacks
it runs → per-minute pricing → FAQ → the answer in pixel lights, the ask and
a footer you can play Tetris on.

All copy lives in `src/content.ts`. Every colour, font, type step, spacing
step, the notch size, the one shadow and every motion curve is a token in
`src/index.css`. White paper under a faint 9px grid; navy, cobalt, gold,
signal red, lime and violet appear only as 8px squares on that pitch. Type is
Geist and Geist Mono, linked from Google Fonts. Nothing is rounded: buttons
and chips have pixel-notched corners (`.notch`).

## Motion

Named components in `src/components/motion/`, each with its knobs as scalar
props:

- `ServerFarm` — the hero: a night server room on the 9px grid. Requests run
  from the origin along a fibre backbone into edge racks and down to people
  (cyan hits), misses climb back to the origin (red), replication pulses run
  rack to rack (violet); status lights blink; the ragged foot erodes as you
  scroll.
- `LifeCycle` — clone, boot, build, ship as life: a DNA helix unzips and
  replicates, gathers into an organism, grows into a tree and scatters its
  seeds. The step row follows it; pick a step to jump there.
- `PixelStream` — `explore` / `spec`: particles flowing left to right into a
  shape that explains a process (the spec page uses `spec`).
- `PixelMarquee` — a phrase drawn tiny, thresholded, and each surviving pixel
  blown up into a flickering square, scrolling past.
- `TetrisSkyline` — pieces falling onto a skyline; press play to steer them.
- `TyperText` — headings that type in: each letter flickers through a filled
  bar, a lime highlight and an outline before it lands.
- `GhostyImage` — photographs that bleed in through a feathered mask.
- `SmoothScroll` — Lenis.

The canvases render from an endless GSAP tween held in a ref
(`frame-loop.ts`), so the canvas editor's Motion switch can stop and resume
them; all of them honour reduced motion, and the typer and image reveals hold
their end state while the page is being designed.

## Built for the canvas editor

- `@canvas/react` is vendored in `src/lib/canvas-react/`; `src/main.tsx`
  renders `<CanvasDesign />` in dev.
- Hidden states are editor actions: the mobile menu, the Product menu, each
  FAQ answer, both card rails scrolled to the end, the next life-cycle step,
  the code panel's copied state, the brand page's motion demo and Tetris
  play mode.
- Structural wrappers (`#root`, the page wrapper, `<main>`, `Container`, the
  rail tracks) carry `data-canvas-ignore`.

Photography from [Pexels](https://www.pexels.com); pixel icons from the
[Pixel Icon Library](https://pixeliconlibrary.com) by HackerNoon (MIT, inlined
in `src/components/icons/pixel-icon-data.ts`); a few UI icons from
[Lucide](https://lucide.dev); city line art from the *Minimal Wallpapers —
City Backgrounds in Line Art Style* community file, reduced to small alpha
masks in `src/assets/cities/`. The isometric servers are drawn in code
(`src/components/marks/iso-server.tsx`). Cirrus, its customers and its figures are
fictional.
