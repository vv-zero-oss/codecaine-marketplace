# Canvas Launch

A launch page for a design tool, told as one scroll. Every beat is a pinned
scene: scrolling decides *when* something changes, and a timed transition
decides *how*.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## The story

Four acts, each scene pinned while it plays and handed to the next in place.

| Act | Scene | File |
|---|---|---|
| I — the promise | Opening mark, hero, the camera onto the live frame, thirty years of separate tools, "That ends here" | `sections/intro.tsx`, `sections/story.tsx` |
| II — anything that renders | Any project (WordPress, Laravel, Java…) flying onto the board | `sections/any-project.tsx` |
| | Components by their own names | `sections/component-names.tsx` |
| | Real elements: a working form, a live three.js scene changed by asking | `sections/real-elements.tsx` |
| | Components from anywhere; switching a variant from the props dropdown | `sections/components-scene.tsx` |
| | The change journal | `sections/journal.tsx` |
| III — the assistant | Magic Cast, shot like a film: a video you love, your words, then it's on your site | `sections/magic-cast.tsx` |
| | The assistant bubble: @ a layer, paste references, it rebuilds the layer | `sections/references.tsx` |
| | Recreate a live page's header in your own project, scroll effect and all | `sections/recreate.tsx` |
| | An assistant that reads your board | `sections/assistant.tsx` |
| | Bring your own model: a gravity wall of every model bb drives | `sections/own-model.tsx` |
| IV — the ask | A 3D gallery behind "Amazing things are possible", the form, a ticket | `sections/access.tsx` |

## The editor's own components

`components/canvas/` holds components ported from the Codecaine editor — the
toolbar, the Magic Cast pill, the assistant pill, bar and mention menu, AI run
chips and rings, the frame title and selection, the Attributes props panel —
with their markup, classes and Hugeicons intact and the editor's colours as
`--color-ed-*` tokens in `src/editor-tokens.css`. They take props instead of
reading the editor's store, so scenes can act them out.

`components/art/` is the artwork the scenes play: a canvas motion graphic, a
three.js object, a matter-js gravity wall, a CSS 3D gallery, a scroll-effect
header and a button with three variants.

## Changing it

- **Colours, shadows, radii, fonts and motion** are tokens in `src/index.css`
  (`@theme`). The easings and durations there are mirrored in `src/lib/motion.ts`.
- **Photography** lives in `src/content/photos.ts` (files in `public/photos/`),
  credited in the footer. The reference images the assistant scene pastes are
  in `public/references/`.
- **Stack logos** are SVGL's, in `public/logos/`.
- `hooks/use-scene-step.ts` is the one pattern every scene uses: a tall section,
  a sticky stage, and a beat index from its scroll progress. `ui/scene.tsx`
  overlaps each scene with the one before by a screen and blurs content out and
  in, scrubbed, so scenes hand over in place instead of scrolling away.
- **Themes**: every colour is a CSS variable with a light value in `@theme` and
  a dark one under `:root[data-theme="dark"]`; `index.html` sets the attribute
  before first paint and the footer has the switch. The stock Tailwind palette
  is switched off (`--color-*: initial`), so a loose colour class can't compile.

Motion respects `prefers-reduced-motion`: the opening is skipped, swaps become
plain crossfades and Lenis is not started.

## Canvas editor

Opted into `@canvas/react` (vendored in `src/lib/canvas-react/`), with
`data-canvas-ignore` on `#root`, the page wrapper, `<main>`, the closing
backdrop and `Container`, so the editor's pointer reaches the sections and
what is in them.
