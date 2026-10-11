# Fête — Events Platform

A white, loud and joyful site for **Fête**, an events platform for run clubs,
supper clubs, hack nights and everything in between.

```bash
npm install
npm run dev     # → http://localhost:3390
```

## Pages

| Path | What it says |
| --- | --- |
| `/` | The promise (a hero whose button opens a circle into a mood), this season's big events, how hosting goes on a pinned phone, a working invitation, communities, categories, hosts in their own words, the last ask |
| `/discover` | Search, city, category, day and price filters over one list; every card opens an RSVP sheet |
| `/create` | A three-step event builder with a live phone preview that publishes and hands back a link |
| `/pricing` | Two plans with a billing switch, a payout calculator, FAQ |
| `/brand` | The style guide, read live from the tokens and components |

## The system

- **Type** — Inter with optical sizes, on a golden-ratio scale (√φ steps from
  16px) with tracking that tightens as size grows. Display sizes run to 228px.
  Poster faces (Anton, Instrument Serif, Yellowtail) appear only in event
  artwork. All from Google Fonts, linked in `index.html`.
- **Colour** — white, an ink hierarchy, and one flare (magenta → amber, six
  stops interpolated in HCT) for display type only. Built and audited with the
  Coolors MCP; every value is a token in `src/index.css`.
- **Surface** — pill buttons, hairline tiles, posters in white mats, soft wide
  shadows.
- **Motion** — Framer Motion and CSS, Lenis for scroll. The hero's moods,
  the pinned story's steps, the invitation's ticket, the builder's steps and
  the pricing billing switch are all registered as canvas actions.

## Structure

```
src/components/ui/        shadcn primitives (button, input, sheet, slider, switch, accordion, badge)
src/components/blocks/    section heading, event card, closing CTA
src/components/mock/      poster, phone, story screens, invite card — live UI, not pictures
src/components/motion/    reveal, marquee, mood backdrop, smooth scroll, route transition
src/components/sections/  home, create, pricing
src/content/events.ts     the events, communities and categories every page shares
```

Photography from [Pexels](https://www.pexels.com). Icons from
[Lucide](https://lucide.dev).
