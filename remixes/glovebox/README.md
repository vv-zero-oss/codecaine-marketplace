# Glovebox — car insurance that runs itself

A one-page landing site for Glovebox, an AI that keeps every car insurance
policy in one place, shops renewals and handles claims.

```bash
npm install
npm run dev     # → http://localhost:3290
```

## The page

| Section | What it does |
| --- | --- |
| `Hero` | Full-bleed driving footage. Scrolling pins it while a `clip-path: inset(… round …)` closes the frame toward the centre and the video zooms in against it. |
| `Features` | Three blurred-video cards stacked in place: each pins in the middle of the screen (sticky) while the next slides up over it, widening from a clip inset; the covered card settles back and its caption fades. Each has a live "Glovebox working…" panel or an ask bar that types its question. |
| `Stat` | "92%" pinned in place while photos and small cards drift past at different depths, then handing over to its second line. |
| `Proof` | A dot map of members (a projected outline, no map data) that holds still while testimonials slide up over it; "Watch … story" opens a dialog. |
| `HowItWorks` | Three sand cards, each showing the thing Glovebox produces. |
| `Faq` | shadcn accordion on white tiles. |
| `Closing` | The hero's move in reverse: the frame clips open from a small window and the footage settles back. |

## Motion components (`src/components/motion/`)

Every knob is a scalar prop the canvas editor can edit live.

- `ClipZoomVideo` — `mode` (`"close" | "open"`), `pin`, `insetX`, `insetY`,
  `radius`, `openRadius`, `zoom`, `scrim`, `paused`.
- `ClipCard` — `insetX`, `radius`, `zoom`, `blur`, `paused`.
- `FloatTile` — `x`, `y`, `depth`.
- `Ticker`, `TypeLine`, `DotMap`, `Reveal`.

Scroll-linked values go through `useRange` (`progress.ts`), which always clamps.
Lenis is held in a ref (`use-smooth-scroll.ts`) so the editor's Motion switch
can stop it, and every component honours `prefers-reduced-motion` and
`useCanvasDesignMode()`.

**Editor actions:** Sign-up sent (Hero, Closing), Answer shown (Features),
Story video (Stories), First answer open (FAQ).

## The style guide at `/brand`

`/brand` is Glovebox's brand guidelines page, linked as "Brand guidelines"
from the footer: the mark with its clear space and minimum size, the voice,
every colour token from `src/index.css` with its value and measured WCAG
contrast, Newsreader / DM Sans / DM Mono and the whole type scale, spacing,
radii, shadows and borders, the motion curves (press play), icons and imagery,
and every component — primitives, blocks, motion components and sections —
live in its variants and states with a copyable snippet. Every value is read
off the rendered element, so changing a token changes the page. The pinned
sections (Hero, Features, Stat, Proof) are shown by their parts, and
`ClipZoomVideo` / `ClipCard` / `FloatTile` run unpinned in frames. It lives in
`src/pages/brand.tsx` and `src/components/brand/`, routed by
`src/lib/router.tsx`. Add a component here in the same change that adds it to
the page.

**Editor actions on `/brand`:** Dialog open, Sign-up sent, Answer shown, Story
video, First answer open.

## Credits

Photography and video: [Pexels](https://www.pexels.com). Fonts: Newsreader,
DM Sans and DM Mono from Google Fonts. Icons: Lucide. The insurers named on
the page are fictional.
