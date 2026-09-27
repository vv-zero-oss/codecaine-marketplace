# Canvas Launch

A launch page for a design tool, told as a product film you scroll through.
One pinned stage, beat by beat: a lowercase caption ruled across warm paper,
and under it the desk — the editor, a browser, a code editor, the agent —
moving in and out.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## The film

| Beats | What happens |
|---|---|
| open, dock | The app icon is pressed and the editor opens; the dock of the apps a project lives between. |
| web, tool, dialog, pill, landed | A live web app; the camera pushes in on the toolbar's Import URL; the page streams onto the board as layers. |
| fan | Variations fan out beside the original, asked for in the assistant bar. |
| agents | "let the … agents", the mark cycling through the CLIs the assistant can run on. |
| code, into, board | The project in a code editor, streamed across onto the board, phone frames going from outlines to built. |
| further | The agent's log beside the board, frames building under the assistant's ring. |
| copy, paste | Copy from a browser tab, a close-up Paste, the frames landing. |
| pan, overview | A slow glide over the frames, then the whole product on one board. |
| bring, shape, ship, logo | Guides and selection boxes on the paper, then the mark and the name. |

Then `components/access.tsx`: the ask and the footer.

Scrolling decides which beat is on; each beat's own moves then play on a clock
(`hooks/use-timeline.ts`), so a slow scroll never leaves a move half done.
Beats, their captions and what is on the desk are one list, `BEATS`, in
`components/film/film.tsx`.

## Where things are

- `components/mockup/` — the editor, drawn in code (tab strip, rail, Layers,
  board, Design panel). `EditorWindow` takes `board` (what is on the board)
  and `toolbar` (its state).
- `components/canvas/` — components ported from the editor itself: toolbar,
  assistant bar, AI run chip and ring, frame title and selection, and more.
  Their colours are `--color-ed-*` in `src/editor-tokens.css`.
- `components/film/` — the film: `longwave.tsx` is the sample app the film
  builds (empty, blocked-out and built states), `desk.tsx` the other apps on
  the desk, `caption.tsx`, `board-scenes.tsx`, `variants.tsx`, `finale.tsx`.
- `src/index.css` — every page colour, shadow, radius, font and easing as a
  token, with dark values under `:root[data-theme="dark"]`. The easings and
  durations are mirrored in `src/lib/motion.ts`.
- `public/logos/` — app and agent logos from SVGL.

Reduced motion shows each beat's end state and does not start Lenis.

## Canvas editor

Opted into `@canvas/react` (vendored in `src/lib/canvas-react/`), with
`data-canvas-ignore` on `#root`, the page wrapper, `<main>` and `Container`.
