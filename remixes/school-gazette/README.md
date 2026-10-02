# The Marlowe Gazette

A school magazine as a vintage broadsheet: greige paper stock, a giant black
masthead, condensed headlines, and a retro workshop on top — a working
tabletop radio, an embossed 3D LED scoreboard, keys, knobs and switches, and
CSS-3D dice and carousels down the margins.

```bash
npm install
npm run dev     # → http://localhost:3340  (and /brand for the style guide)
```

## What is on the page

| Section | Piece | Where |
| --- | --- | --- |
| Arrival | The page is thrown onto the desk and spins to rest (`PageToss`) | `components/motion/page-toss.tsx` |
| Front page | Three short stories, the nameplate in a stretched SVG block, a ticker | `sections/hero.tsx`, `masthead.tsx` |
| Radio | **Marlowe FM**: tuning dial, TUNE/VOLUME knobs, preset keys, power switch, VU meter, a paper-tape *radio brief* that types itself, real static (Web Audio) and **Read aloud** (speech) | `components/radio/school-radio.tsx` |
| Scoreboard | Embossed riveted plate, live 7-segment countdown, House Points with keys; amber / red / green LED | `components/led/led-board.tsx` |
| Inside | Polaroids that tilt toward the pointer in 3D, a printed index, a clip-out coupon | `sections/inside-issue.tsx` |
| Noticeboard | A 3D cylinder of club cards: keys, swipe, auto-turn switch | `components/motion/carousel-3d.tsx` |
| Write for us | Typewritten form on index tabs: punch-card year, fader, switch, dome Send key, RECEIVED stamp | `sections/write-for-us.tsx` |
| Letters | The FAQ as a ruled ledger | `sections/letters.tsx` |
| Margins | `Cube3D` dice in parallax rails beside the hero, radio and scoreboard | `components/motion/cube-3d.tsx` |

## Making it yours

Everything is a token in `src/index.css` — paper, ink, spot colours, shadows
(hard-offset keys; raised and sunk emboss), radii, easings, durations — so a
re-skin is a stylesheet edit. The words are in the section files and
`src/data/radio.ts`; the school's name is in `site-header.tsx`,
`site-footer.tsx` and `marketplace.json`.

Fonts are linked from Google Fonts in `index.html`: Abril Fatface (mastheads),
Instrument Serif (condensed headlines), Newsreader (text), Special Elite
(labels and keys). Photography is from Pexels and credited in the footer.

## Built for the canvas editor

Every moving or pressable thing is a named component whose knobs are scalar
props (`speed`, `size`, `tone`, `station`, `volume`, `hue`, `targetDate` …), and
every hidden state has a switch in the editor's Actions row:

- **Page** — Replay page toss
- **Header** — Mobile menu
- **Radio** — power; tune to each station; between stations (static)
- **LED board** — colour amber / red / green
- **Noticeboard** — next / previous club, autoplay
- **Write for us** — submission received, show form errors

The 3D dice, ticker and cards run on CSS keyframes, so the Motion switch stops
them; Lenis is held in a ref (`components/motion.ts`); `useCanvasDesignMode()`
holds the toss, the autoplay and the radio's typing still while designing.

`src/lib/canvas-react/` is the vendored `@canvas/react` — leave it, the aliases
in `vite.config.ts`, and the first line of `src/main.tsx` as they are.
