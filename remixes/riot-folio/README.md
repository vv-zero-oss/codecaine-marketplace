# Riot Folio

A loud portfolio for one independent builder: an electric-ultramarine ground,
white type, and six saturated tones — lime, pink, orange, sun, mint, violet —
that each project wears as its own. Photographs are printed in one ink each
(duotone), so pictures from anywhere read as one set.

```bash
npm install
npm run dev     # → http://localhost:3300
```

## Pages

| Path | What it is |
| --- | --- |
| `/` | Intro with the work hung round it, the work grid, the numbers, clients, testimonials |
| `/work` | The six case studies, then every project in a filterable archive |
| `/work/:slug` | A case study: story, impact numbers, press, what came next |
| `/about` | The story in numbers, then in words |
| `/contact` | An address to click or copy |
| `/brand` | The style guide — every token and component, read live from the site |

## Where things live

- **Words and pictures:** `src/content.ts` — the person, projects, clients,
  testimonials and the archive. Change the storyline there.
- **Colours, shadows, radii, spacing, motion:** tokens in `src/index.css`
  (`@theme`). No raw hex in a component.
- **Motion components:** `src/components/motion/` — each a named component
  with scalar props the editor can change:
  - `PageTransition` — pages blur out and back into focus;
  - `FloatingCard` — the hero's tilted, drifting cards;
  - `ScrollFlight` + `FlightSlot` — on wide screens the first three projects'
    pictures start in the hero and fly into the work grid as you scroll;
  - `RollingNumber` — odometer digits for every statistic;
  - `QuoteCarousel` — testimonials with a visible timer; pauses on hover;
  - `CycleStack` — a card face that changes every few seconds;
  - `PhotoFan` — photographs dealt out from a stack.
- **Smooth scroll:** Lenis, held in a ref (`src/components/motion.ts`).

## In the canvas editor

`@canvas/react` is vendored in `src/lib/canvas-react/`. Layers read by
component name (`HomeHero`, `WorkCard`, `QuoteCarousel`…); structural wrappers
carry `data-canvas-ignore`. The Actions row reaches every hidden state:
**Mobile menu**, **Next testimonial**, **Pause testimonials**, **Email
copied**, **No results** and **Filter: Fintech** on the work table. Drift,
autoplay and entrances hold still while the page is being designed, and
everything honours reduced motion.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev). Type: Inter and JetBrains Mono from Google Fonts.
The people, companies and quotes are fictional.
