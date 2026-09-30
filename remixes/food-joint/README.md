# Food Joint

A loud one-page site for a restaurant — here, Oakbird, a fried-chicken room
that finishes every bird over oak — built from the canvas scaffold
(`scaffold-sdk`) with `@canvas/react` vendored in `src/lib/canvas-react/`.

```bash
npm install
npm run dev     # → http://localhost:3150
```

`?nopreload` skips the preloader; `?only=<section id>` renders one section on
its own (`hero`, `ticker`, `statement`, `menu`, `oak`, `process`, `reviews`,
`room`, `book`).

## What is where

| | |
| --- | --- |
| `src/content.ts` | Every word, photograph and film, in the order the page tells it. Swap the restaurant here. |
| `src/index.css` | Every colour, shadow, radius, font, type size, spacing step and easing, as tokens. |
| `src/lib/shapes.ts` | The SVG clip shapes (cushion, arch, blob, scallop, burst, ticket) in `objectBoundingBox` units. |
| `src/lib/motion.ts` | The curves, durations and springs Framer Motion uses — the same values as the CSS tokens. |
| `src/components/ui/` | shadcn primitives: `button`, `input`, `label`, `sheet`, `tabs`, and `container`. |
| `src/components/blocks/` | Pieces used more than once: `ClipShape`, `Photo`, `Film`, `RiseText`, `Marquee`, `CtaEllipse`, `SpinBadge`, `Eyebrow`, `Wordmark`. |
| `src/components/sections/` | The page, one file per section, in the order `App.tsx` lists them. |
| `src/pages/brand.tsx`, `src/components/brand/` | The style guide at `/brand`. |
| `src/lib/router.tsx` | A small router for the two pages. |

## The page

1. **Preloader** — a scalloped plate flicking through the menu, a count to 100; waits on the fonts and the hero photo, then lifts as a clip-path wipe.
2. **Hero** — the photo in a lopsided cushion (an SVG `clipPath` that swells as you scroll), two huge words fitted to the width, the orange ellipse to book.
3. **Ticker** — two crossing bands whose speed and direction follow the scroll.
4. **Statement** — a sentence inked in word by word, with photos and a film set into the line.
5. **Menu** — shadcn Tabs; with a mouse, the dish follows the pointer in a morphing blob; on touch, each row shows its picture.
6. **Oak** — the word cut out of a sheet over a wood-fire film; pinned, you zoom through the letters. Then three films in three shapes.
7. **Process** — five steps, pinned and walked sideways on wide screens, stacked on phones.
8. **Reviews** — stickers you can pick up and throw (with a mouse).
9. **Room** — four photos in four shapes at four depths.
10. **Booking** — name, party size, evening and time; confirms as a ticket stub.
11. **Footer** — the name the full width, with the food showing through the letters.

## The style guide at `/brand`

`/brand` is Oakbird's brand guidelines page, linked as "Brand guidelines" from
the footer: the wordmark with its clear space and minimum size, the voice, every
colour token with its value and measured WCAG contrast, the three faces of
Archivo and the whole type scale, the spacing steps, radii, clip shapes,
shadows and borders, the motion curves (press play), icons and imagery, and
every component — primitives, blocks and sections — live in its variants and
states with a copyable snippet. Every value is read off the rendered element,
so changing a token in `src/index.css` changes the page. The pinned oak zoom
and the sideways kitchen walk are shown by their parts (`StillCutout`,
`StepCard`); the preloader plays on demand. Add a component here in the same
change that adds it to the site.

Every animation respects `prefers-reduced-motion`, and the pinned scenes fall
back to plain stacked layouts on small screens.

Photographs and films are from [Pexels](https://www.pexels.com); fonts
(Archivo) from Google Fonts.
