# Pixelkeep

A pixel-art secure web gateway site, built from `sdk-scaffold` and opted into
`@canvas/react`.

- **Home** — a dusk-sky hero with a tilting access pass, a decrypting feature
  board, a **sticky 3D dashboard** that stays pinned while three sections scroll
  beneath it, a pinned problem statement, stats, reviews, pricing, FAQ and CTA.
- **Pages** — `/products`, `/pricing`, `/customers`, `/generator`, `/brand`.
- **Generator** — rolls a whole landing page (palette, layout, copy, sections)
  from three seeds; lock facets, share the URL, or paint this site with it.
- **3D** — pointer-tilt cards, CSS 3D cubes, a radar and a stack of policy cards
  built from plain transforms.

Stack: Vite, React 19, Tailwind v4, shadcn/ui, Framer Motion, Lenis. Every
colour, shadow, radius and easing is a token in `src/index.css`. Fonts come from
Google Fonts; photographs are from Pexels, scaled to 256px and palette-reduced
(`src/assets/`).

```bash
npm install
npm run dev     # http://localhost:3340
```
