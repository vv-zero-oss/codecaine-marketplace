# Cadence Fitness

A landing page for **Cadence**, a fitness and vitals app: heart rate, sleep,
HRV and every workout, quietly understood. Green-black ground with Forest Ink
cards, one Lime Voltage accent, a Linen Mist "progress" chapter that rises over
the night, and the product itself drawn in HTML from the same tokens.

```bash
npm install
npm run dev     # → http://localhost:3540
```

## Pages

- `/`: hero, statement, vitals bento, progress bento, pricing, reviews, closing.
- `/brand`: the brand guidelines: logo, colour (with contrast ratios), type,
  spacing, radii, shadows, motion, icons, imagery and every component live.

## The system

- **Colour.** Forest Ink `#163300` and Spruce `#054d28` for dark surfaces,
  Lime Voltage `#9fe870` for the one action per view and for emphasis on dark,
  Linen Mist `#e2f6d5` for the light chapter. Signal Blue and Alarm Red are
  supporting accents only; Obsidian, Charcoal, Slate, Pebble, Fog and Paper are
  the neutrals. Every one is a token in `src/index.css`.
- **Type.** Inter throughout. Display is Inter Black (900), tracked −0.035 to
  −0.04em; card titles 700; body 400.
- **Shape.** Pills for every button, tag and nav segment; 10px inner cards and
  inputs; 28px big cards. Flat: hairlines, not shadows, except for things that
  physically float.

## Where things are

| Path | What |
| --- | --- |
| `src/index.css` | Every token: palette, roles, type scale, radii, shadows, easings, durations |
| `src/components/ui/` | shadcn primitives (button, chip, switch, dialog, sheet, tooltip, container) |
| `src/components/sections/` | The page's sections and their shared pieces (`FeatureCard`, `SectionHeading`, `Laurel`) |
| `src/components/motion/` | `FloatingPill`, `WordReveal`, `RisingPanel`, `DrawLine`, `Reveal`, `SmoothScroll` |
| `src/components/mock/` | The app UI: `DashboardMock`, `PhoneScreen`, devices, chart helpers |
| `src/components/site/` | Header (splits into two pills on scroll), footer, banner, logo |
| `src/lib/canvas-react/` | `@canvas/react`, vendored — do not edit in place |

## In the canvas editor

Every animated piece is a named component with scalar props (`FloatingPill`'s
`icon`, `colour`, `depth`, `blur`, `distance`; `WordReveal`'s `dim`, `blur`;
`RisingPanel`'s `scaleTo`). Hidden states have switches in the Actions row:
**Announcement bar**, **Mobile menu**, **Monthly billing**, **Why isn't it
free?**, and the style guide's demo dialog and sheet. Lenis is held in a ref
so the Motion switch can pause it.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). Fonts from Google Fonts: Inter, Geist Mono.
