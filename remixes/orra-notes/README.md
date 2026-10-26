# Orra — AI note taker

A landing page for Orra, a fictional AI note-taker that sits in on meetings,
calls and conversations — and its brand guidelines at `/brand`.

```bash
npm install
npm run dev     # → http://localhost:3540
```

## The page

`src/App.tsx` is the list of sections, in order: `Hero` (an amber-to-cobalt
horizon with the headline, bullet rows and pill CTAs, and a device frame —
`HeroShowcase` — writing live notes for each scene), `TeamStrip`,
`FeatureIndex` (a numbered list), `Capture` (the `AppWall` and
`DeviceStack`), `Memory` (`NoteFan`), `Workspace` (autoplaying
`FeatureTabs` under a violet spotlight), `Customers` (`StoryCarousel`),
`Security` (`BinaryOrb`, `OrbitMark`), `Support`, `CallToAction` and
`ProductRail`. Every word is in `src/content.ts`; every photo id in
`src/photos.ts`.

## The system

A dusk-lit, dark workspace:

- **Surfaces**: a near-black canvas, graphite panels and frosted glass at 10%
  with a light blur. Elevation comes from translucency and 1px inset
  hairlines, not shadows.
- **Colour**: almost none. Warm greys (bone, ash, mist, slate) carry the text.
  Colour appears only in three gradients — the hero horizon (amber →
  cobalt), a thin violet wash, and a violet spotlight. Violet is never a fill.
- **Type**: DM Sans at weight 500 for display and body — never bolder — and
  Geist for section headings from 24px. Both from Google Fonts.
- **Shape**: pills for every button and nav link, 10px for UI, 24px cards,
  40px panels, and a floating frosted nav that sits 16px off the edges.
- **Tokens** live in `src/index.css`; motion curves are mirrored for Framer
  Motion in `src/lib/easing.ts`.
- **Components**: shadcn/ui primitives in `components/ui/`, sections in
  `components/sections/`, motion in `components/motion/`, HTML product
  pictures in `components/mockups/`.
- **Motion**: Lenis carries the scroll (held in a ref so the editor can pause
  it); Framer Motion for entrances, the headline swap and scroll-linked
  parallax; CSS for constant drift and the carousel timers, so the editor's
  Motion switch stops everything. Reduced motion is honoured throughout.

## In the editor

`@canvas/react` is vendored in `src/lib/canvas-react/`. Each hidden state is a
switch in the Actions row: hero scenes, workspace tabs, customer stories, the
mobile menu, and the Book a demo dialog (open, and sent). Structural wrappers
carry `data-canvas-ignore`.

## Credits

Photography from [Pexels](https://www.pexels.com). App and social marks from
[Simple Icons](https://simpleicons.org) (CC0), via Iconify. Icons from
[Lucide](https://lucide.dev).
