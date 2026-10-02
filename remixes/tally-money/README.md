# Tally

A personal-finance landing page, built as named components for the canvas editor.
A pile of everyday spending drops in the hero; below it a bank links with one switch,
the product is shown as dashboard and phone, payments log themselves, merchants are
placed on a map and categorised, search types its own query, a cash-flow chart draws
in, and a dark band argues against ever opening a bank's website again.

```bash
npm install
npm run dev     # → http://localhost:3350
```

- **Pages:** `/` and `/brand` (tokens, type, motion and every component, live).
- **Tokens** live in `src/index.css`; Figtree is loaded from Google Fonts in `index.html`.
- **Motion** is Framer Motion plus Lenis. Each moving piece is a named component in
  `src/components/motion/` with scalar props (`interval`, `typingSpeed`, `stagger`, …).
- **Interactions:** hero objects can be picked up and flung (mouse), magnetic CTAs, tilting devices,
  a tappable payment drawer that recategorises, clickable merchant chips, a search bar that types
  itself until you click it and then filters for real, a chart you can scrub, subscription switches
  that update a 12-month balance, a tossable coin, and a scroll-progress hairline. Pointer-driven
  motion is gated to fine pointers and off under reduced motion.
- **Editor actions:** Mobile menu, Bank linked, First payment open, Search query, Pause two subscriptions.
- The QR tile and illustrations are decorative and drawn in-house; swap the QR for a real code.
- `@canvas/react` is vendored in `src/lib/canvas-react/`; leave it and the plumbing in
  `vite.config.ts` and `src/main.tsx` as they are.
