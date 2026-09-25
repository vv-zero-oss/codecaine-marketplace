# Working in this repository

Templates, apps, design systems and skills for the canvas editor
(`vv-zero-oss/canvas`). `README.md` explains the layout and the build;
`skills/publish-to-marketplace/SKILL.md` is the checklist for adding or
updating an item. In short: bump the item's `version` and `updated` whenever
its contents change, then run `npm run build` and commit what it writes
(`json/`, `archives/`, `index.html`) with the item — `npm run check` fails in
CI otherwise.

## Templates mark their structural wrappers `data-canvas-ignore`

A template is opened in the canvas editor as a live project, and the editor's
pointer picks whatever element is under it. A React app is wrapped in elements
nobody designs — `#root`, the app's page `div`, `<main>`, the `mx-auto
max-w-*` container every section sits in — and they cover everything, so
without help every hover over a gap outlines one of them and every click there
selects it.

So every template marks those wrappers with **`data-canvas-ignore`**. The
editor's hover, click and marquee look straight through a marked element to
what is inside it (or, over its bare background, to the nearest layer round it
that is not marked). It is still a layer: it is in the layers panel, it can be
selected from there or with ⇧↵ from inside it, and it is edited like anything
else once selected. Drops still land in it.

- **Mark:** `#root` in `index.html`, the page wrapper in `App.tsx`, `<main>`,
  and a centring or max-width `Container` component (on the component, so
  every use of it is marked). An element that exists only to hold other
  elements in place, with no border, shadow or content of its own — the page
  wrapper may carry the page's background colour.
- **Do not mark:** anything somebody would design — a section, a card, a
  button, a grid of cards somebody would restyle as a unit, a heading, an
  image, a nav. When in doubt, leave it unmarked: a wrapper that is picked
  now and then is a nuisance, a card that cannot be clicked is a bug.
- **Spelling:** bare in JSX (`<main data-canvas-ignore>`, which React renders
  as `"true"`) or in HTML (`<div id="root" data-canvas-ignore>`). Presence is
  what counts. `data-canvas-ignore={false}` (the string `"false"`) switches it
  off, which is how a caller opts one use of a marked component back in.
- It is a convenience for editing, not a rule of the page: it changes nothing
  about how the site renders or behaves, and a template that leaves it out
  still works — it is just fiddlier to click around in.

In the editor, the same attribute is set or cleared from a layer's right-click
menu (canvas or layers panel): **Ignore on canvas** / **Stop ignoring on
canvas**. Marked layers show a crossed-out cursor in the layers panel. See
`docs/canvas-ignore.md` in the canvas repository.
