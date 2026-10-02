# Meadow Workspace

A landing page for an everything-workspace — mail, customers, meetings,
projects and an assistant — set on a sky-blue hero that fades into a meadow.

- **Sections** (`src/components/sections/`): hero, trust, value props, overview tabs,
  how it works, assistant, sticky full-screen video, skills, case studies,
  testimonials, context graph, developers, scale bento, pricing, CTA.
- **Tokens**: every colour, shadow, radius, font and easing is in
  `src/index.css` under `@theme`. `/brand` renders them live.
- **Motion**: Framer Motion for entrances and the header, Lenis for scroll,
  both honouring reduced motion. `Reveal` takes scalar props the editor can edit.
- **Editor**: `@canvas/react` is vendored in `src/lib/canvas-react/`; the mobile
  menu, condensed header and overview tab are registered with `useCanvasAction`.
- **Photography**: Pexels. Fonts: Inter and JetBrains Mono from
  Google Fonts.

```bash
npm install
npm run dev   # http://localhost:3350
```
