# Aerie — Electric Air Taxi

A cream-and-electric-blue site for **Aerie**, an all-electric air taxi that
flies rooftop to rooftop across one city, booked from a phone.

```bash
npm install
npm run dev     # → http://localhost:3445
```

## Pages

| Path | What it says |
| --- | --- |
| `/` | One pinned scroll story (the promise, the cabin, the wing, the craft lifting off, the sky turning to paper), highlights, a manifesto that inks itself in, a working glass booking app, a weekday that re-plans itself, the engineering band, notes, the story, and a blue "dream of flight" close |
| `/experience` | One trip door to door on a pinned phone, the cabin seat map, a real booking flow with a boarding pass, fares, FAQ |
| `/aircraft` | Hover/cruise rotors, a scroll-flown transition, a noise slider, anatomy hotspots, a motor-failure grid, a day of charge |
| `/routes` | A live network map with quotes, minutes back a year (pinned), the launch timeline, the story, the sticky partners list, careers and the waitlist |
| `/brand` | The style guide, read live from the tokens and components |

## The system

- **Type** — Manrope, medium weight for headlines, on a golden-ratio scale
  (√φ steps from 16px, up to 365px) with tracking that tightens as the size
  grows. JetBrains Mono for flight codes. Linked from Google Fonts in
  `index.html`.
- **Colour** — a warm cream page, an ink hierarchy, one electric sky blue
  (a tonal scale seeded in HCT), a dusk dark for photo chapters, and the
  horizon stripes (navy, ember, peach, haze) that open the menu and close
  every page. Built and checked for contrast and colour blindness with the
  Coolors MCP. Every value is a token in `src/index.css`.
- **Surface** — big rounded photo cards, small pill buttons, hairlines,
  soft warm shadows.
- **Motion** — Framer Motion scroll scrubbing and Lenis smooth scroll. The
  menu's stripe curtain, the rotor tilt, the pinned stories and every hidden
  state (booked, seat chosen, motor stopped, dialog open…) are editor
  controls: components with scalar props and `useCanvasAction` switches.

## Structure

```
src/components/ui/        shadcn primitives
src/components/blocks/    photo + credits, section heading, corner labels
src/components/mock/      the phone frame and the aircraft drawing — live SVG, not pictures
src/components/motion/    reveal, scrub text, count-up, clouds, horizon stripes, smooth scroll
src/components/sections/  home, experience, aircraft, routes
src/content/network.ts    the vertiports, and the quote every page prices trips with
```

Photography from [Pexels](https://www.pexels.com), credited on each page.
Icons from [Lucide](https://lucide.dev). The aircraft, clouds and maps are
drawn for this project.
