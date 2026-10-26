# Keel Money

A landing page for **Keel**, a personal-finance app: every account, budget and
investment, calmly accounted for. Night-navy ground, one action blue, a pale
"wealth" chapter that rises over the night, and the product itself drawn in
HTML from the same tokens.

```bash
npm install
npm run dev     # → http://localhost:3540
```

## Pages

- `/` — hero, statement, spending bento, wealth bento, pricing, reviews, closing.
- `/brand` — the brand guidelines: logo, colour (with contrast ratios), type,
  spacing, radii, shadows, motion, icons, imagery and every component live.

## Where things are

| Path | What |
| --- | --- |
| `src/index.css` | Every token: colour, type scale, radii, shadows, easings, durations |
| `src/components/ui/` | shadcn primitives (button, chip, switch, dialog, sheet, tooltip, container) |
| `src/components/sections/` | The page's sections and their shared pieces (`FeatureCard`, `SectionHeading`, `Laurel`) |
| `src/components/motion/` | `FloatingPill`, `WordReveal`, `RisingPanel`, `DrawLine`, `Reveal`, `SmoothScroll` |
| `src/components/mock/` | The app UI: `DashboardMock`, `PhoneScreen`, devices, chart helpers |
| `src/components/site/` | Header (splits into two pills on scroll), footer, banner, logo |
| `src/lib/canvas-react/` | `@canvas/react`, vendored — do not edit in place |

## In the canvas editor

Every animated piece is a named component with scalar props (`FloatingPill`'s
`depth`, `blur`, `distance`; `WordReveal`'s `dim`, `blur`; `RisingPanel`'s
`scaleTo`). Hidden states have switches in the Actions row: **Announcement
bar**, **Mobile menu**, **Monthly billing**, **Why isn't it free?**, and the
style guide's demo dialog and sheet. Lenis is held in a ref so the Motion
switch can pause it.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). Fonts from Google Fonts: Wix Madefor Display,
Wix Madefor Text, Geist Mono.
