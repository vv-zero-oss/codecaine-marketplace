# Glovebox — car insurance that runs itself

A one-page landing site for Glovebox, an AI that keeps every car insurance
policy in one place, shops renewals and handles claims.

```bash
npm install
npm run dev     # → http://localhost:3210
```

## The page

| Section | What it does |
| --- | --- |
| `Hero` | Full-bleed driving footage. Scrolling pins it while a `clip-path: inset(… round …)` closes the frame toward the centre and the video zooms in against it. |
| `Features` | Three blurred-video cards, each tucked under the last and widened by a clip inset as it reaches the middle, with a live "Glovebox working…" panel and an ask bar that types its question. |
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

## Credits

Photography and video: [Pexels](https://www.pexels.com). Fonts: Newsreader,
DM Sans and DM Mono from Google Fonts. Icons: Lucide. The insurers named on
the page are fictional.
