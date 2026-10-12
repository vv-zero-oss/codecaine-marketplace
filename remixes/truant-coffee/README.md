# Truant Coffee Co. — specialty roaster

A loud, photograph-led storefront for Truant, a fictional single-origin roaster on the shore of Lake Superior: stacked condensed poster type (Bayon) over full-bleed photography, a fixed right-hand rail, warm paper, one tomato accent and soft, low shadows.

```bash
npm install
npm run dev     # → http://localhost:3430
```

## Pages

- **Home** — the promise (*Take the long way*), four series stacked as you scroll, the mission lighting up word by word before a photograph opens out to fill the window, this week's roast log (a live roast curve you can scrub), NEVER RUN DRY assembling letter by letter, a working brew timer, and the places to find us.
- **Shop** (`/shop`, `?series=`) — filterable, sortable shelf of drawn bags, a quick view with size / grind / quantity, and a taste map that points you at a match.
- **Subscribe** (`/subscribe`) — a four-step builder with a pinned, live order (bags fan out, price, saving, cost per cup, next three ship days), the roast week, and an FAQ.
- **Field notes** (`/field-notes`) — the coffee-belt map pinned while each origin's chapter scrolls past, what we paid against the market, and the producers.
- **Brand guidelines** (`/brand`) — tokens, type, space, motion and every component, read live from the stylesheet.

The bag, the cart (with code `TRUANT15`), the subscription (skip, pause, cancel), the discount tab, the newsletter and the brew timer all work, and persist in `localStorage`.

## Built with

Vite, React 19, Tailwind v4 (tokens in `src/index.css`), shadcn/ui on Radix, Framer Motion (`motion`) and Lenis. `@canvas/react` is vendored in `src/lib/canvas-react/`: every drawer, dialog and hidden state is registered as an editor action, and the motion pieces (`LineReveal`, `Marquee`, `CountUp`, `ScrollWords`, the roast curve, the origin map) are named components with scalar props.

## Credits

Photography from [Pexels](https://www.pexels.com). Social logos from [Simple Icons](https://simpleicons.org) via Iconify. Fonts from Google Fonts (Bayon, Inter). Truant, its coffees and producers are invented.
