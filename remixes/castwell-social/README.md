# Castwell — AI social media manager

A five-page site for **Castwell**, a fictional social media command center
run by an AI marketing team: an AI Marketing Manager that plans and reports,
specialist agents that write, cut video and answer the community, an AI
video studio, and one scheduler for every channel. Built from
`remixes/sdk-scaffold`, so the canvas editor reads it by component.

```bash
npm install
npm run dev     # → http://localhost:3220
```

## Pages

| Path | What it answers |
| --- | --- |
| `/` | What it is, what the AI team does, proof, how it works (pinned tour), channels, notes |
| `/marketing-manager` | What the AI Marketing Manager does in a week, the five agents it runs, the guardrails |
| `/video-studio` | Brief to finished video, the workflow, templates by category, studio features |
| `/scheduler` | One calendar for every channel, the best-time engine, approvals, publishing details |
| `/pricing` | Three plans with a monthly/yearly switch, every feature side by side, FAQ |
| `/brand` | The brand guidelines: mark, voice, tokens, type, motion and every component |

A small router (`src/lib/router.tsx`) switches pages without a reload, on
real paths, so the address bar and the editor's Pages list agree.

## The look

Cream paper (`#fffff8`), near-black ink, hairline rules. Newsreader at a
light weight for every heading, Inter for everything else. Flat,
square-cornered black buttons. Pastel workflow chips — mint, coral, butter,
periwinkle — float around each hero at different depths, some out of
focus. Night sections carry the diagrams. Stepped black pixel blocks wipe
between light and dark as you scroll. Every colour, shadow, radius, type
step and easing is a token in `src/index.css`.

## Motion

- Lenis carries the scroll (`components/motion/smooth-scroll.tsx`).
- `FloatingChip` — hero chips parallax against the scroll by `depth`.
- `ScrollGrow` — the home product window unfolds as it scrolls up.
- `PixelSteps` — the staircase wipe between sections, snapped to cells.
- `HowItWorksTour` — the home night section pins for five screens: the
  title types in behind a block cursor, four corner nodes square up into a
  frame, then each step lights a node and swaps the diagram and card.
- `TypeReveal`, `StreamingText`, `CountUp`, `Reveal` — one-shot entrances.
- `OutcomesCarousel` — autoplays with timer bars; paused while designing.

All of them honour reduced motion, and hold their end state while the page
is being designed in the editor.

## Editor switches

Registered with `useCanvasAction`: the mobile menu, each outcome slide,
each How-it-works step, the brief's finished state, each video format,
each template category, each approval rule, yearly billing and each FAQ.

## The style guide at `/brand`

`/brand` is Castwell's brand guidelines page, linked as "Brand guidelines"
in the footer. It documents the mark (light and night, clear space, minimum
size) and the voice; every colour token in `src/index.css` with its hex and
live value, and WCAG contrast for the real text/ground pairs; the type scale;
spacing, radii, shadows and borders; the motion tokens, playable; the icon
sets and imagery; and every component — `ui/`, `motion/`, `mockups/`,
`sections/` and `site/` — live, in its variants and states, with a copyable
snippet. Each value is read off the rendered element at runtime, so a token
changed in `index.css` changes the page. It lives in `src/pages/brand.tsx`
and `src/components/brand/`.

The pinned How-it-works tour is shown by its parts (nodes, pills, depth
boxes, the four step visuals and cards) rather than pinned; the header and
footer are the live ones around the page. A component added to the site is
added to `/brand` in the same change.

## Where things live

- `src/pages/` — one file per page, each a list of sections.
- `src/components/sections/` — sections by page, plus `shared/`
  (`PageHero`, `PillarGrid`, `Section`, `TrustStrip`, `StatBand`).
- `src/components/mockups/` — the product in HTML: command center, weekly
  brief, video studio, week calendar.
- `src/components/motion/` — every animated component.
- `src/components/ui/` — shadcn primitives, plus `PixelIcon`, `PixelArt`,
  `PixelList`, `BrandLogo`, `LogoMark`.
- `src/photos.ts` — the Pexels photos, credited in the footer.
- `src/pages/brand.tsx`, `src/components/brand/` — the style guide.

## Credits

Photography from [Pexels](https://www.pexels.com). Channel logos from
[SVGL](https://svgl.app). Icons from [Lucide](https://lucide.dev).
