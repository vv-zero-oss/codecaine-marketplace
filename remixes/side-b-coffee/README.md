# Side B Coffee

A remix for a small-batch roaster that pours its coffee in two record bars.
Cream paper, roasted-brown ink, a rust frame; a condensed serif voice on a
golden-ratio scale with tight negative tracking; mono-caps buttons that look
like printed labels; soft, warm, layered shadows.

```bash
npm install
npm run dev   # http://localhost:3420
```

## Pages

- **Home** — hero reel, manifesto, featured carousel, the shelf, a pinned
  five-track walk from cherry to cup, subscription, the listening bar,
  merch, the community board, wholesale and the two bars.
- **Shop** — filters, sort, quiz and brew guide.
- **Subscribe** — a stepped subscription builder with a live summary.
- **Our story** — the liner notes, the people, the numbers.
- **Brand guidelines** (`/brand`) — every token and component, live.

## What works

- **Coffee bags, merch and the turntable are SVG** (`components/mock/`),
  drawn from props — a new coffee in `content/products.ts` gets its own bag.
- **The cart** (`lib/cart.ts`) persists to `localStorage`; quick view, the
  merch shelf and the subscription builder all add to it.
- **The radio** (`lib/radio.ts`) synthesises each record in the rotation
  with Web Audio — the turntable, the footer player and the header button
  all play it.
- Every hidden state (quick view, cart, forms, menus, carousel slide, story
  step) is registered with `useCanvasAction`.

## Credits

Photography and video from [Pexels](https://www.pexels.com) (cottonbro
studio, Michael Burrows, Tim Douglas, Lisa Fotios, Heru Dharma, Tima
Miroshnichenko and others). Type from Google Fonts: Libre Caslon Condensed,
Instrument Sans and DM Mono. Icons from Lucide.
