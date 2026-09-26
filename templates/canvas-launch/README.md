# Canvas Launch

A launch page for a design tool, told as one scroll. Every beat is a pinned
scene: scrolling decides *when* something changes, and a timed transition
decides *how*.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## The story

| Scene | File | What it says |
|---|---|---|
| Opening | `sections/intro.tsx` | The mark cools from blue to ink, holds, then dives through its own window onto the first line. |
| Story | `sections/story.tsx` | The promise over a blue glow, then the camera flies into the editor's inspector while a status card narrates a save; thirty years of separate tools; "That ends here." |
| No translation layer | `sections/real-code.tsx` | The export/file/plugin chain other canvases need, crossed out; one wire both ways; the stacks it frames. |
| Component names | `sections/component-names.tsx` | Name tags gather round the line as you scroll (scrubbed), then all but two leave. |
| Journal | `sections/journal.tsx` | A diagram of changes per breakpoint, drawn in, then saved back into the source line. |
| Magic Cast | `sections/magic-cast.tsx` | See, hear, point, type — handed to the assistant as one recording; frames and a transcript. |
| Assistant | `sections/assistant.tsx` | A prompt types itself, the mark becomes a button, and wires show which theme tokens it used. |
| Parallel runs | `sections/parallel-runs.tsx` | @-mention a layer; three runs at once, each ringed; one waiting in amber. |
| Full control | `sections/full-control.tsx` | The canvas API changing a frame as it types, the Variables window, WebMCP. |
| Import | `sections/import-web.tsx` | An address in, a page filling in section by section as editable layers. |
| Modes | `sections/modes.tsx` | Artboard, Code, Agent and Apps on one sliding switch. |
| Own model | `sections/own-model.tsx` | The CLIs you already use behind bb; no second bill; what works without AI. |
| Film | `sections/film.tsx` | Full-bleed footage with a play button that opens the clip in a dialog. Hidden until `content/photos.ts` has footage. |
| Access | `sections/waitlist.tsx` | Photographs through the mark's window, then the email form and a marquee of stacks. |
| Footer | `site-footer.tsx` | Links, the small print with photo credits, and the wordmark at page width. |

The editor in the story is drawn in code (`components/mockup/`), at the editor's
own sizes, so the camera can zoom into it without it going soft.

## Changing it

- **Colours, shadows, radii, fonts and motion** are tokens in `src/index.css`
  (`@theme`). The easings and durations there are mirrored in `src/lib/motion.ts`.
- **Photography** lives in `src/content/photos.ts` (files in `public/photos/`),
  credited in the footer.
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
