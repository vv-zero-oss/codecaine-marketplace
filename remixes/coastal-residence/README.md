# Coastal Residence

Luna Residence: a one-page site for a small gated development on the coast,
twenty-two homes between Altea and Calpe. It reads as a walk through the
place:

1. **Arrival**: a deep olive screen, and an arch that rises and opens onto the hero.
   The name writes itself in, and a *by day / by night* switch regrades the
   scene.
2. **The gardens at dusk**: pulsing points pinned to the photograph, each
   opening a note card.
3. **Three reasons**: a sand-coloured disc rises over the picture with the
   chapter title set round its rim. Then three pinned reasons, each
   re-lettering the headline as you scroll.
4. **The studio's quote** over a full-bleed photograph.
5. **The idea, the place, the coast**: a pinned section that scrolls sideways
   on wide screens (it stacks on phones), ending on a hand-drawn coastline
   with drive times.
6. **Residences**: the bay from the air, then a panel that slides over it with
   the three home types.
7. **Amenities**: a pinned full-screen list that steps through the grounds.
8. **The space to live in**: a cream disc, then a collage of the rooms, specs
   and upgrades.
9. **Architecture**, **the team** (an accordion), **sea views** and an olive
   **contact** footer.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## Where things live

- `src/content.ts`: every word and every photograph (Pexels, credited in the
  footer).
- `src/index.css`: the tokens. Palette by role (`deep` olive, `pale` sand,
  `shell` limestone, `ink`, and `sky` / `dusk` for grading the hero), fonts, the card shadow, radii and the motion easings. Headlines use
  the `font-condensed` utility.
- `src/components/sections/`: one file per chapter.
- `src/components/ui/`: shadcn primitives (button, sheet, popover, carousel,
  accordion) and the page's own pieces: `StretchText` / `ScriptReveal` (the
  letter and script entrances), `CircleReveal` (the rising disc), `CircleLink`,
  `Bloom` and `Emblem`.
- `src/components/motion.tsx`: Lenis (the scroll) and the shared easings and
  durations.

## The style guide at `/brand`

`/brand` is Luna's brand guidelines page, linked as "Brand guidelines" in the
footer: the badge and emblem with clear space, minimum size and voice; every
colour token with its value and WCAG contrast for the real text/ground pairs;
the families and the fluid type scale; spacing, radii, the one shadow and the
hairlines; the easings and durations, playable; icons and photography; and
every component, live in its variants and states with a copyable snippet.
Values are read off the rendered elements, so a token changed in
`src/index.css` changes the page. The full-bleed, scroll-pinned sections are
shown in part (their pieces, a slider-driven disc, and a link to each in
place). It lives in `src/pages/brand.tsx` and `src/components/brand/`;
`src/lib/router.tsx` is the small router for the two pages. A component added
to the site is added there in the same change.

Fonts are Google Fonts linked from `index.html`: Instrument Serif (headlines,
and its italic for the accent words) and Manrope. All motion respects
`prefers-reduced-motion`.
