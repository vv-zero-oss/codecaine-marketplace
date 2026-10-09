# Ordinary Matter

An editorial site for a publication about people who make things by hand —
three cloth-bound volumes, free stories online, a small shop and a quarterly
letter. Cream paper, a bookish serif and a quiet grotesk, 1px rules, soft
warm shadows and a golden-ratio type scale with tight, negative tracking.

```bash
npm install
npm run dev    # http://localhost:3410
```

## Pages

- `/` — the split opening (scrolling dispatches beside a pinned, dissolving
  portrait column), the volume on the table (the cover opens as you scroll;
  the pages turn by click, button or arrow key), selected stories, how a story
  gets made (pinned), a line that inks in as you read, the loud index of
  makers, the letters postcard, and the featured volumes.
- `/stories` — the archive, filterable by trade and searchable, the lead
  story, the index by name and the volumes.
- `/shop` — every product drawn live (drag a book to turn it), cloth
  editions, quantities, a working bag with free-shipping progress and a demo
  checkout.
- `/about` — the manifesto, a pinned timeline, principles, the masthead, a
  "suggest a maker" form and photo credits.
- `/brand` — the style guide, read live from `src/index.css` and the real
  components.

## Where things live

- Tokens: `src/index.css` (`@theme`) — colours, type scale, radii, spacing,
  shadows, easings and durations.
- Content: `src/content/` — stories, shop, site copy.
- Mockups: `src/components/mock/` — `BookObject`, `OpenBook`, `CoverArt`,
  `Slipcase`, `PrintStack`, `Envelope`.
- Motion: `src/components/motion/` — `HeroCarousel`, `ScrollWords`, `Reveal`,
  `ParallaxPhoto`, `Marquee`, `CountUp`, `SmoothScroll` (Lenis).

Every animated piece takes its knobs as scalar props, honours reduced motion,
holds still while designing in the canvas editor, and registers its hidden
states (bag, story reader, quick view, mobile menu, book open, letter sent…)
as editor actions.

## Credits

Photography from [Pexels](https://www.pexels.com) — the photographers are
listed on `/about`. Icons by [Lucide](https://lucide.dev). Fonts from Google
Fonts: Newsreader, Inter Tight and JetBrains Mono.
