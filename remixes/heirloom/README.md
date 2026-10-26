# Heirloom

A dark, cinematic landing page for a fictional private family office, built as
a remix for the canvas editor. Vite, React 19, Tailwind v4, Motion and Lenis,
with `@canvas/react` vendored in `src/lib/canvas-react/`.

```bash
npm install
npm run dev     # http://localhost:3350
```

## Pages

- `/` — hero (photographs crossfade) → programs → founders collage → stats and
  circle marquee → partners → two full-bleed photo bands.
- `/founders` — terms that count up, the portfolio filtered by stage, how a
  raise works, a pull quote.
- `/membership` — what members get, three tiers (the featured one carries a
  border beam), how joining works, an FAQ accordion.
- `/journal` — the latest essay, the rest filtered by topic, a newsletter form.
- `/manifesto` — why the office exists, six principles beside a sticky
  heading, a photo band and the partners' signatures.
- `/contact` — one form whose questions change with who is writing, inboxes
  and offices.
- `/brand` — the style guide, read live from `src/index.css`.

Every inner page opens with `PageHero` and most close with `ClosingCta`.

## Where things live

- `src/index.css` — every colour, shadow, radius, font and easing, as tokens.
- `src/content.ts` — the copy, names and photographs.
- `src/components/motion/` — `BlurWords`, `Reveal`, `Slideshow`, `CountUp`,
  `Marquee`: named components whose knobs are scalar props the editor can edit.
- `src/components/sections/` — one file per section; `SectionIntro` repeats.

Editor actions: the mobile menu, each portfolio and journal filter, each FAQ
answer, the contact form's error and sent states, and the newsletter's.

## Credits

Photography from [Pexels](https://www.pexels.com). Heirloom and the people
and organisations named on the page are invented.
