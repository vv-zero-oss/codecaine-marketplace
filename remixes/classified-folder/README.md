# Classified Folder

One cobalt folder on a warm desk that keeps one secret.

- **Hover:** the cover swings open on its left edge, the darker back shows, and a sheet marked "Do not open" slides out an inch.
- **Click:** the sheet is pulled out to the side, turned over in the air and laid on the cover, so its other side can be read.
- **Click again:** it goes back in.

It is all one component, `ClassifiedFolder` in `src/components/motion/classified-folder.tsx`, built with Motion. Every knob is a prop the canvas editor can change:

- the words: `label`, `sublabel`, `stamp`;
- the geometry: `size`, `tilt` (how far the cover opens), `peek` (how far the sheet slides out);
- the timing: `duration` (the pull);
- the starting state: `initial`.

Its two hidden states are registered as actions, **Peek** and **Document out**. Reduced motion swaps the travel for a quick fade.

Colours, radii, shadows and the motion curves are tokens in `src/index.css`. `/brand` is the style guide, read from those tokens at runtime.

Started from `remixes/sdk-scaffold`: the vendored `@canvas/react`, the aliases and `canvasPropOptions()` in `vite.config.ts`, and `data-canvas-ignore` on `#root`, the page wrapper and `<main>` are kept as they were.

```bash
npm install
npm run dev   # http://localhost:3360
```
