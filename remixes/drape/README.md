# Drape — AI try-on landing page

A landing page for Drape, an AI fitting room: try any outfit on your own
photo, in any colour, before it's yours.

```bash
npm install
npm run dev     # → http://localhost:3300
```

`/brand` is the style guide — every token and component, live.

## What's on the page

| Section | Component | What moves |
| --- | --- | --- |
| Hero | `Hero`, `TryOnStage`, `HeadlineReveal` | A three.js carousel of five looks, each drawn as a pencil sketch by a shader (`components/three/sketch-material.ts`). Hover the front look and a selection box opens from the cursor with the real photo inside it; press the arrow to try the whole look on. The headline writes itself in with a soft mask. |
| Pull-back | `RoomZoom` | Scroll-scrubbed: the fitting room shrinks from full screen into a display on a sunlit wall. |
| Proof | `ShopMarquee`, `Marquee` | A CSS marquee of partner shops. |
| Toolkit | `Toolkit`, `StepTabs`, `RecolourGrid` | Pinned; the scroll walks through Snap → Dress → Recolour → Wear it. The sketch and the sixteen colourways are made in the page (`lib/image-fx.ts`): the recolour moves only the garment's hue range, so skin and walls stay put. |
| Controls | `Controls`, `TriedOn`, `FloatCard` | Working cards: a prompt that recolours, swatches, fit, size advice, a second angle. |
| Stories | `Stories`, `StoryCard` | Horizontal scroller; a pill follows the cursor, click turns a card to its quote. |
| Features | `Features`, `FeatureCard`, `Parallax` | Three columns drifting at different speeds. |
| Wardrobes | `Scatter` | Photos at different parallax depths round the line, then a strip. |
| FAQ, Friends, Footer | `Faq`, `Friends`, `Cursor`, `SiteFooter` | Accordion; collaborators' cursors; a newsletter form that validates. |

Motion durations and curves are tokens in `src/index.css` (`--dur-*`,
`--ease-*`), read by the WebGL loop and Framer Motion through `lib/tokens.ts`.

## For the canvas editor

`@canvas/react` is vendored in `src/lib/canvas-react/`. Every animated piece
is a named component with scalar props (`TryOnStage`: `index`, `tilt`,
`spacing`, `lineWeight`, `boxWidth`, `boxHeight`, `autoplay`; `Marquee`:
`speed`, `direction`, `paused`; `Cursor`, `Parallax`, `HeadlineReveal`, …).
The three.js renderer and its loop, and Lenis, are held in refs. Hidden
states are actions: the try-on box, "look tried on", next look, each toolkit
step, the mobile menu, a story, the first FAQ answer, the prompt's
generating state, the newsletter's error and success.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). Fonts from Google Fonts: Inter, Inter Tight,
Kaushan Script, JetBrains Mono. Shop names on the page are made up.
