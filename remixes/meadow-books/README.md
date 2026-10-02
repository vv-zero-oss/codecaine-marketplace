# Meadow Books

A landing page for AI accounting software — receipts, bank feeds, invoices and
month-end close handled by an assistant that shows its working — set on a
sky-blue hero that fades into a meadow.

- **Hero board** (`src/components/mocks/app-window.tsx`): a live bookkeeping
  dashboard. It types questions, runs a feed of coding and reconciliation jobs
  (some stop for review), counts down the to-review badge, follows the pointer
  with a spotlight and settles flat on scroll. It holds still for reduced motion
  and in the editor's design mode.
- **Sections** (`src/components/sections/`): hero, trust, value props, feature
  tour, how it works, assistant, pinned full-screen video, skills, case studies,
  testimonials, ledger graph, developers, bento, pricing, CTA.
- **Tokens**: every colour, shadow, radius, font and easing is in
  `src/index.css` under `@theme`. `/brand` renders them live.
- **Motion**: Motion for entrances and the header, Lenis for scroll, both
  honouring reduced motion. `Reveal`, `CountUp` and `Marquee` take scalar props
  the editor can edit.
- **Editor**: `@canvas/react` is vendored in `src/lib/canvas-react/`; the mobile
  menu, condensed header, feature tab and billing toggle are registered with
  `useCanvasAction`.
- **Photography**: Pexels. **Fonts**: Inter and JetBrains Mono from Google Fonts.
- The figures, customers and quotes are placeholder copy.

```bash
npm install
npm run dev   # http://localhost:3350
```
