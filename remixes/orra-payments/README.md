# Orra — payments platform

A landing page for Orra, a fictional payments platform for merchants who sell
online and in person — and its brand guidelines at `/brand`.

```bash
npm install
npm run dev     # → http://localhost:3540
```

## The page

`src/App.tsx` is the list of sections, in order: `Hero` (a headline whose
second line follows the `HeroShowcase` scenes), `MerchantStrip`,
`ProductIndex`, `Payments` (the `MethodWall` and `TerminalStack`),
`Accounts` (`CardFan`), `Dashboard` (autoplaying `FeatureTabs`),
`Customers` (`StoryCarousel`), `Developers` (`BinaryOrb`, `OrbitMark`),
`Support`, `CallToAction` and `ProductRail`. Every word is in `src/content.ts`;
every photo id in `src/photos.ts`.

## The system

- **Tokens** live in `src/index.css`: warm paper and surface, cocoa for the
  primary action, ember for links, hairline borders, very soft shadows, 16px
  card corners, and the motion curves (`--ease-out-soft`, `--ease-in-out-soft`)
  — mirrored for Framer Motion in `src/lib/easing.ts`.
- **Type**: Inter (optical sizes) light and tight for headlines,
  JetBrains Mono for eyebrows, Source Serif 4 for customer quotes — all from
  Google Fonts.
- **Components**: shadcn/ui primitives in `components/ui/`, sections in
  `components/sections/`, motion in `components/motion/`, HTML product
  pictures in `components/mockups/`.
- **Motion**: Lenis carries the scroll (held in a ref so the editor can pause
  it); Framer Motion for entrances, the headline swap and scroll-linked
  parallax; CSS for constant drift and the carousel timers, so the editor's
  Motion switch stops everything. Reduced motion is honoured throughout.

## In the editor

`@canvas/react` is vendored in `src/lib/canvas-react/`. Each hidden state is a
switch in the Actions row: hero scenes, dashboard tabs, customer stories, the
mobile menu, and the Talk to sales dialog (open, and sent). Structural
wrappers carry `data-canvas-ignore`.

## Credits

Photography from [Pexels](https://www.pexels.com). Payment and social marks
from [Simple Icons](https://simpleicons.org) (CC0), via Iconify. Icons from
[Lucide](https://lucide.dev).
