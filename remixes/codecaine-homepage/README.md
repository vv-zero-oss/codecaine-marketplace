# Codecaine Homepage

The Codecaine homepage and features page, and the design system both are built
on. Every colour, size, shadow, radius, duration and easing is a named token;
every control is a component class that reads those tokens; dark mode is one
attribute flip. 61 shadcn/ui components sit on top, aliased onto the same
tokens so none of shadcn's own colours, shadows, radii or fonts reach the page.

```bash
npm install
npm run dev        # http://localhost:3360
npm run build      # typecheck + production build
```

| Route | What it is |
|---|---|
| `/` | The homepage: hero, feature cards, a two-row marquee gallery |
| `/features` | The agent showcase, product cover, feature cards and feature list |
| `/brand` | Brand guidelines — foundations, components, the panel shell (also `/design-system`) |
| `/shadcn` | Every installed shadcn/ui component, rendered through the token bridge |

## Layout

```
src/
├── index.css              build entry — import order is load-bearing
├── styles/
│   ├── theme.css          primitives (@theme), semantic --ui-* tokens, light + dark
│   ├── shadcn.css         shadcn variable names aliased onto --ui-*
│   ├── components.css     .btn, .input, .menu, .tabs, .chip, overlays, motion recipes
│   └── landing.css        the marketing pages' --lp-* tokens and .lp-* classes
├── pages/                 home, features, design-system, shadcn
├── components/
│   ├── landing/           site nav, hero, features, gallery, agent showcase…
│   ├── site/              the design-system pages' header, sections, motion primitives
│   ├── shadcn-gallery/    the /shadcn demo grid
│   └── ui/                shadcn/ui (vendored)
├── hooks/                 use-disclosure, use-theme, use-mobile
└── lib/
    ├── canvas-react/      @canvas/react, vendored — do not edit in place
    ├── media.ts           every photo and clip (Pexels)
    ├── router.tsx         a small path router (real paths, base-aware)
    └── theme.ts, motion.ts, tokens.ts, timeline.ts, utils.ts
```

## Rules

- **Everything is a token.** No hex, `rgb()`, control `px` or `ms` inline in a
  component. Add the token to `src/styles/theme.css` (or `landing.css` for the
  marketing pages) first.
- **Borders are inset shadows**, so a control's box never changes size between
  rest, hover and focus. Controls come in three heights: 32 / 36 / 40.
- **Dark mode lives in one token block** in `theme.css`, driven by
  `data-theme` / `data-tl-theme` on `<html>`. The inline script in
  `index.html` sets them before first paint; `applyTheme()` is the only writer.
- **Restyle shadcn by `data-slot` in `shadcn.css`**, not by editing
  `components/ui/`.
- **Motion is CSS**; JS only toggles a state attribute and reads durations
  through `durationMs()`. Opens are slower than closes, `transform`/`opacity`
  only, never `ease-in`, UI motion under 300ms. Lenis carries the scroll and is
  off under reduced motion.

## Credits

Photography and video from [Pexels](https://www.pexels.com). Fonts: Inter and
Roboto Mono from Google Fonts. Integration logos from [SVGL](https://svgl.app).
