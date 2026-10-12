# Contrail — Flight Tracker

A product site for Contrail, an invented flight tracker that tells you first and tells you why. The page goes from day to night and back: a light hero, a night middle where delays are explained, and a light ending for sharing and the passport.

## Pages

- `/` — the promise, then one trip in four phases on a pinned phone (preflight, at the airport, after landing, download); press; a manifesto that lights up word by word; a bento of working mockups; a delay timeline pinned and scrolled sideways; a flight importer that parses real input; friends and family; the passport; small reasons; reviews; and a device composition.
- `/pricing` — plans with a billing switch and rolling prices, a sticky comparison table, a gift-card builder and FAQs.
- `/passport` — one year switch drives the cover, a sticky route atlas, the charts, the aircraft, the split-flap delay report and the share card.
- `/about` — sticky story chapters, values, team, offices with live local times, press and careers.
- `/brand` — the style guide, read live from the tokens in `src/index.css`, with every component in its states.

## System

- Type: Inter (words), Barlow (flight data), JetBrains Mono (codes), loaded from Google Fonts. A golden-ratio scale (φ half-steps from 16px) with tracking that tightens as size grows.
- Colour: white and cool greys by day, a deep violet night, one amber for "now", plus green/red/blue signals checked for contrast and colour blindness. Every colour, shadow, radius and motion curve is a token in `src/index.css`.
- Motion: Framer Motion and Lenis. Scroll-driven pieces (the hero, the timeline, the story text) stay still and fully shown with reduced motion and while the page is being designed in the editor.
- Maps: Natural Earth 110m countries (`world-atlas`) drawn with `d3-geo`, with real airport coordinates and great-circle routes.

## Editor

Built from `remixes/sdk-scaffold`: `@canvas/react` is vendored in `src/lib/canvas-react/`. Animated pieces are named components with scalar props (`FlightMap`, `SplitFlap`, `ScrollStory`, `HeroJourney`, `DelayTimeline`…). Hidden states are registered as actions: each hero phase, the delay prediction, importer error and success, the alerts and story sticker, the delay-report years, billing, the gift purchase, passport years, story chapters, the Insiders dialog and the mobile menu.

## Credits

Photography from [Pexels](https://www.pexels.com). Map data from Natural Earth. Icons from Lucide. Airlines, publications and people are invented.

```bash
npm install
npm run dev   # http://localhost:3460
```
