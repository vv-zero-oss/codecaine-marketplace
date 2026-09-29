# Mullion Studio

A one-page site for **Mullion**, an AI image editor made for architects:
relight a facade, replace a white sky, grow the planting to its season and
grade a whole project's photography to one reference frame.

```bash
npm install
npm run dev     # → http://localhost:3160
```

`?intro=0` opens straight onto the archive, skipping the opening line;
`?only=<section-id>` renders one section on its own.

## The page

| Section | File | What it does |
| --- | --- | --- |
| Archive | `sections/archive.tsx`, `archive-grid.tsx`, `archive-list.tsx`, `archive-gallery.tsx` | Opens with a line resolving out of noise, thirteen frames popping in as a diamond and flying apart into a staggered field. Scrolling pans the field diagonally (odd columns a touch faster). **Grid / List / Gallery** in the header switch views; **Filters** and **Search** dim what does not match. Clicking a frame opens it in the studio. |
| Edit band | `sections/edit-band.tsx` | The four edits in oversize type, solid and outlined, sliding against each other with the scroll. |
| Studio | `sections/studio.tsx`, `motion/image-compare.tsx` | Raw against edited with a draggable split. Tabs switch the edit (each new pair is wiped in behind a black rule); the timeline's knob *is* the split, and ▸ plays the edit across the frame. |
| Toolkit | `sections/toolkit.tsx` | All eight edits as a ledger; rows invert under the pointer with a trailing preview, and the live four open in the studio. |
| How it works | `sections/workflow.tsx` | Pinned while scrolled through: a giant rolling step number, each step's frame wiping up over the last, the steps list with a filling rule. |
| Why | `sections/statement.tsx` | An oversize paragraph that inks in word by word as it is read, and three count-up numbers. |
| Pricing, FAQ, Closing, Footer | `sections/pricing.tsx`, `faq.tsx`, `closing.tsx`, `site-footer.tsx` | Ruled plans with a monthly/yearly roll, shadcn accordion, oversize marquee CTA, a drifting filmstrip and the wordmark rising in at full width. |

Motion pieces live in `src/components/motion/` as named components with
scalar props (`ScrollMarquee`, `RiseText`, `WordReveal`, `CountUp`,
`ImageCompare`, `CursorPreview`, `Filmstrip`, `ScrambleText`), so the canvas
editor can list and change them. Hidden states — archive views, filters,
search, studio edit, brief, each how-it-works step, yearly billing, every FAQ
item, the mobile menu and replaying the intro — are registered with
`useCanvasAction`. The intro holds at its end state while the page is being
designed.

## Tokens

Everything in `src/index.css`: a warm concrete paper, graphite ink and one
blueprint accent; JetBrains Mono (from Google Fonts) at four weights; the
type scale (`text-label`, `text-ui`, `text-body`, `text-giant`); gutter and
section spacing; the two shadows floating tools use; and the easings and
durations every animation shares (mirrored in `src/lib/motion.ts`).

Photography from [Pexels](https://www.pexels.com) — `src/frames.ts` credits
each photographer.
