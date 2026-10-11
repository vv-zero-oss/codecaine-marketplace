# Kiln — Creative Technology Studio

A near-black site for **Kiln**, an invented technology-led creative studio in
Lisbon and Montréal. The home page is the work: every project on a curved,
endless wall you drag.

```bash
npm install
npm run dev     # → http://localhost:3530
```

## Pages

| Path | What it says |
| --- | --- |
| `/` | An intro (the vessel, pixelated in, fired through five glazes, blown to dust), then the work as a curved draggable wall or a year-by-year list, filterable. Then what the studio believes, what it makes — a pinned stage of three working devices — the selected work, the numbers, the partners, the room, and the ask |
| `/studio` | The claim, the belief, a four-step process as stacking cards, four rules, the team, the two studios with live clocks, recognition |
| `/careers` | A week at Kiln (a strip you drag), open roles filtered by team and city, an application sheet with CV drop, perks, how hiring goes |
| `/work/:slug` | A case study: brief → idea → what we made → what happened → next project |
| `/brand` | The style guide, read live from the tokens and components |

## The system

- **Type** — Inter Tight for reading, Geist Mono for labels, tags and clocks,
  Instrument Serif for client wordmarks only. A golden-ratio scale (√φ steps
  from 16px) whose tracking tightens as it grows; display sizes run to 287px.
  All from Google Fonts, linked in `index.html`.
- **Colour** — near-black soot greys (an HCT ramp from one warm-neutral seed),
  a bone inverse for the pill nav and primary button, and one ember accent (an
  HCT tonal scale from `#f2762e`). Built and checked with the Coolors MCP; every
  value is a token in `src/index.css`.
- **Surface** — pill buttons, near-square cells on 1px hairlines, long soft
  shadows that read as darker pools on a dark ground.
- **Motion** — durations and curves read off the reference frame by frame
  (cells lighten in 240ms, the wall fades out in 270ms, the list rises in
  400ms with a 30ms stagger, sheets slide in 520ms on a drawer curve). Lenis
  carries the scroll; Framer Motion the rest. Reduced motion is honoured
  everywhere.

## Built for the canvas editor

- `ProjectWall`, `IntroLoader`, `ScrollWords`, `StackCards`, `CountUp`,
  `Marquee`, `DragStrip`, `CursorPreview` are named components with scalar
  props (`speed`, `curvature`, `direction`, `paused`…).
- The wall's drift and the intro are hand-drawn on `requestAnimationFrame`, so
  their time is read off a Web Animation (`src/lib/clock-animation.ts`) — the
  editor's Motion switch stops the drift and finishes the intro.
- Hidden states are actions: Let's Talk (and its sent state and steps), Filter
  panel, List view, Pause wall, Replay intro, Apply sheet, Application sent,
  Newsletter subscribed, Glaze lab firing, Fieldnote recording and tab,
  Billboard colourway, What we make: next.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). The clients, people and projects are invented.
