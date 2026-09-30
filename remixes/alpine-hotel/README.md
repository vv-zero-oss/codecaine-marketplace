# Alpine Hotel — Hotel Arven, Zermatt

A one-page guide to a small, family-run hotel at the top of Zermatt, set like
a printed hotel guide: warm paper with a grain over everything, serif
headlines, mono labels, photographs mounted as prints, torn edges between
sheets and one Swiss signal red kept for what matters (the Reserve button,
the house stamp, the times on the timetable).

```bash
npm install
npm run dev     # → http://localhost:3230
```

## Every section answers a question

| No. | Section | The guest's question |
| --- | --- | --- |
| — | `Cover` | Where is it, what is it? A dateline, one plain sentence, a mounted photo with the house stamp, and a fill-in line: *Staying [dates] for [guests]*. |
| 01 | `House` | Who runs it? Its history, a drop cap, three facts. |
| 02 | `Seasons` | When is it open? `VideoZoomSplit` grows a film to full screen, then splits it into winter, summer and the two closed months. |
| 03 | `Day` | What is a day like? A timetable, with snowboard footage printed inside “First tracks” (`TextClipParallax`). |
| 04 | `Rooms` | What does it cost? A rate card for winter and summer; the photo beside it follows the row you are on. |
| 05 | `Around` | What is nearby? A drawn trail map with numbered pins, keyed to a list timed from the front door. |
| 06 | `Arriving` | How do I get to a car-free village, and what is included? Train times, parking, and in-the-rate vs on-request prices. |
| — | `GuestBook` | Did people like it? Three lines from the guest book. |
| 07 | `Faq` | The questions the desk answers most. |
| 08 | `Reserve` | The registration card: fill-in lines, a running total “for the desk”, and a red stamp when it goes through. |

Dates, room and guests live in `BookingProvider`, so the cover line, the
rate card and the registration card share them.

## Paper

- `paper-grain` (in `index.css`) is two SVG turbulence layers — fine tooth
  and slow blotches — laid over the page in one fixed, multiplied overlay.
- `TornEdge` draws a deterministic ragged edge in the next sheet's colour.
- `Print` mounts a photo with a white border and a numbered caption.
- `Stamp` is a rubber stamp whose ink is broken up with a turbulence mask.
- The text clip multiplies the paper colour over the footage, so the film
  prints into the letters like ink.

## The style guide at `/brand`

`/brand` is the house style, reached from "Brand guidelines" in the footer and
set like the rest of the guide: the wordmark and seal with their clear space
and minimum size, the voice, every colour token in `src/index.css` (the
palette and shadcn's `:root` names) with its live value, hex and WCAG contrast
for the pairs type is really set in, the three families and the type scale,
spacing, radii, shadows, rules and the torn edge, the motion curves
(playable), icons and photography — and every component, live, in its
variants and states with a copyable snippet: every `components/ui/` piece, the
booking fields, Reveal, TextClipParallax, RateRow, TrailMap, SeasonTag,
AvailabilityLine, the header, and each section one at a time (Seasons carries
the pinned VideoZoomSplit). Every value is read off the rendered element, so
changing a token changes the page. It lives in `src/pages/brand.tsx` and
`src/components/brand/`; `src/lib/router.tsx` is a small router for the two
pages.

## In the editor

Named components with scalar props: `VideoZoomSplit`, `TextClipParallax`,
`Reveal`, `TornEdge` (`seed`, `tone`), `Stamp` (`ring`, `middle`,
`rotate`), `Print`, `Chapter`. Lenis is held in a ref; everything honours
reduced motion.

Actions: *Mobile menu*, *Date picker*, *Show split cards*, *Preview <room>*,
*Next spot*, *First answer open*, *Request received*, *Show form errors*.

## Credits

Photographs and film from [Pexels](https://www.pexels.com). Newsreader,
Instrument Sans and IBM Plex Mono from Google Fonts; icons from Lucide.
