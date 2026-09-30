# Aurel

A site for a small fashion house: ready-to-wear and made-to-measure, cut in
one atelier in Lisbon and sold in one room. Bone paper, ink, burnt orange;
a condensed display serif with italic lowercase set into its capitals.

```bash
npm install
npm run dev     # http://localhost:3240
```

## Pages

| Path | What is on it |
| --- | --- |
| `/` | The film folding into the header, the garment rising through its headline, the frame that grows to full screen, the grey band, the pinned split column, the drifting archive wall, the verse and its seal |
| `/collection` | Filter tabs over an animated grid, then the index with a cursor-following preview |
| `/collection/:slug` | Photographs scrolling beside a pinned buying column: size, bag, details |
| `/atelier` | Five steps as stacking cards, the numbers, the workroom window growing open |
| `/journal` | Features read sideways on a pinned track, then the archive |
| `/house` | The shop, a timeline with the year pinned beside it, values, a parallax gallery |
| `/appointments` | A pinned photograph beside the booking form, hours and questions |
| `/brand` | The brand guidelines: the system the site is built from |

## Where things are

- `src/content.ts` — every word and photograph. Titles use `_italic_ CAPS`
  markup, read by `MixedTitle`.
- `src/index.css` — the tokens: colours, shadows, radii, fonts, spacing and
  the motion curves.
- `src/components/motion/` — each effect is its own named component with
  scalar props (`HeroFilm`, `PieceReveal`, `GrowFrame`, `WordSweep`,
  `DriftGallery`, `SealVerse`, `StackCards`, `HorizontalTrack`,
  `HoverPreview`, `SectionRail`, `FadeUp`, `ClipReveal`, `ParallaxImage`,
  `CountUp`, `SmoothScroll`).
- `src/components/sections/home/`, `src/components/blocks/`,
  `src/components/site/` — the home page's sections, blocks shared between
  pages, and the header, menu, bag and footer.
- `src/components/ui/` — shadcn/ui primitives, plus the house's
  `ButtonLink`, `MixedTitle`, `SectionHeading`, `Container`, `Wordmark`.
- `src/router.tsx` — a forty-line router, so real paths work without a
  dependency.

## The style guide at `/brand`

`/brand` is the house's brand guidelines, linked as "Brand guidelines" in
the footer's small print: the wordmark on paper, ink and the studio with
its clear space and minimum size, the seal, the voice in do/don't lines;
every colour token in `src/index.css` (and shadcn's names on `:root`, and
the three gradients) with its value, hex and WCAG contrast for the real
text pairs; the three faces and the whole fluid type scale; spacing,
radii, shadows and borders; each easing and duration, playable; icons and
photography — then every component live in its variants and states with a
copyable snippet: buttons, form fields, toggles, tabs, accordion, sheet,
bag and toast, the type components, the blocks, the motion components,
and the site's frame. The pinned, scroll-driven scenes (the film, the
rising garment, the growing frame, the sweep, the split, the drifting
wall, the seal, the stacking cards, the sideways track, the timeline)
need a whole window of scroll, so each is shown live on its own page in a
frame, scrolled to it.

Every value is read off the rendered element at runtime
(`src/components/brand/read-style.ts`), so changing a token changes the
page. It lives in `src/pages/brand.tsx` and `src/components/brand/`; a
component added to the site is added there in the same change. Its sample
sheet and select are the "Sample sheet" and "Sample select open" actions.

## In the canvas editor

`@canvas/react` is vendored in `src/lib/canvas-react/`. Structural wrappers
carry `data-canvas-ignore`. These states have switches in the editor's
Actions row: **Menu**, **Bag**, **Bag with a piece in it**, **Newsletter
joined** (Site); the collection filters; **Size chosen**, **Size missing
error** and each details panel (Product); **Booking sent** and **First
question open** (Appointments). Entrances hold at their end state while
designing, and the hero film pauses.

## Credits

Photographs and the hero film are from [Pexels](https://www.pexels.com).
Fonts are Instrument Serif, EB Garamond and Inter from Google Fonts.
