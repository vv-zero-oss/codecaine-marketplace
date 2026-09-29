# Coastal Residence

Luna Residence: a one-page site for a small gated development on the coast,
twenty-two homes between Altea and Calpe. It reads as a walk through the
place:

1. **Arrival**: a plum screen, and an arch that rises and opens onto the hero.
   The name writes itself in, and a *by day / by night* switch regrades the
   scene.
2. **The gardens at dusk**: pulsing points pinned to the photograph, each
   opening a note card.
3. **Three reasons**: a disc of mist-blue rises over the picture with the
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
9. **Architecture**, **the team** (an accordion), **sea views** and a plum
   **contact** footer.

```bash
npm install
npm run dev     # → http://localhost:3130
```

## Where things live

- `src/content.ts`: every word and every photograph (Pexels, credited in the
  footer).
- `src/index.css`: the tokens. Palette (`plum`, `mist`, `shell`, `ink`, `sky`,
  `dusk`), fonts, the card shadow, radii and the motion easings. Headlines use
  the `font-condensed` utility.
- `src/components/sections/`: one file per chapter.
- `src/components/ui/`: shadcn primitives (button, sheet, popover, carousel,
  accordion) and the page's own pieces: `StretchText` / `ScriptReveal` (the
  letter and script entrances), `CircleReveal` (the rising disc), `CircleLink`,
  `Bloom` and `Emblem`.
- `src/components/motion.tsx`: Lenis (the scroll) and the shared easings and
  durations.

Fonts are Google Fonts linked from `index.html`: Noto Serif Display at its
condensed width, Pinyon Script and Archivo. All motion respects
`prefers-reduced-motion`.
