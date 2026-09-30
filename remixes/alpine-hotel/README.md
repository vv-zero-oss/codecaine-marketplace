# Alpine Hotel — Hotel Arven, Zermatt

A one-page site for a small hotel at the top of Zermatt: rooms, nearby
spots, services and a booking form, on a snow / glacier-ice / larch-rust /
stone-pine palette.

```bash
npm install
npm run dev     # → http://localhost:3230
```

## The page

| Section | What it does |
| --- | --- |
| `SiteHeader` | Two white pills overlapped in the middle that part to either edge on scroll (220ms ease-out); a `Sheet` menu on small screens. |
| `Hero` | Headline and pill buttons. The photo band below loses its margins and radius until it runs edge to edge and pins, while the booking card (`StayCard`) climbs into it. |
| `Valley` | `VideoZoomSplit`: a pinned film grows from a small card to the full screen, then parts into three cards along gutters that open between them. |
| `FirstTracks` | `TextClipParallax`: snowboard footage runs inside two lines of display type, drifting against the scroll. |
| `Rooms` | The shop shelf: photo, name, nightly price, hairline select and a rust pill. Totals follow the dates picked in the hero. |
| `Nearby` | Nearby spots timed from the door, filtered by season with shadcn `Tabs`, and how to get to the hotel. |
| `Services`, `Notes` | What the house does, and guest postcards on `ParallaxCard`s. |
| `QuietBand`, `Faq` | A rust band with a rising film; questions on the right, one open at a time. |
| `Book` | The reservation form (react-hook-form + zod), sharing dates, room and guests with the hero card and the room shelf. |

Dates, room and guests live in `BookingProvider`
(`src/components/booking/booking-context.tsx`), so choosing them anywhere
fills them in everywhere.

## In the editor

Every moving piece is a named component with scalar props — `VideoZoomSplit`
(`panes`, `gutter`, `radius`, `startWidth`, `zoom`, `length`…),
`TextClipParallax` (`lineOne`, `lineTwo`, `parallax`, `drift`),
`ParallaxCard` (`speed`, `tilt`), `Reveal`. Lenis is held in a ref, so the
Motion switch pauses it, and everything honours reduced motion.

Actions: *Header split*, *Mobile menu*, *Date picker*, *Show split cards*,
*Show everything / winter / summer / village*, *First answer open*,
*Booking confirmed*, *Show form errors*.

## Credits

Photography and film from [Pexels](https://www.pexels.com). Fonts are
Inter Tight and Geist from Google Fonts; icons from Lucide.
