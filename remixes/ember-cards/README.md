# Ember Cards

A dark landing page for **Ember**, a virtual card app: a fresh card number for
every purchase, free, instant and private. Two live 3D iPhones show the app
in the hero, and a third leans across the sign-up band.

```bash
npm install
npm run dev     # → http://localhost:3190
```

## The page

Hero → Perks → Manifesto (lights up word by word on scroll) → Highlights
(free / instant / private) → How it works (pinned: four steps, one card
changing state) → Use cases (a row that scrolls sideways while the page
scrolls down) → Coverage (dotted world map and flags) → Customer story (a
video that opens from a small window to the full screen) → Testimonials →
FAQ → Call to action → Footer. Every word is in
`src/content.ts`; every colour, shadow, radius, type size and easing is a token
in `src/index.css`.

## Metal and grain

No neon gradients: the palette is graphite black, warm bone and one
champagne accent. Cards and highlight surfaces are machined metal —
`.metal` plus a finish (`metal-chrome`, `-titanium`, `-champagne`,
`-graphite`, `-copper`) in `src/index.css`: an angled, many-banded gradient,
hair-fine brushing, a specular highlight at `--mx`/`--my`, and film grain
(`.grain`, an SVG `feTurbulence` tile). Type on metal is `.engraved`.
`MetalCard` (`components/ui/metal-card.tsx`) moves the highlight with the
pointer and leans towards it. The app screens on the phones draw the same
finishes and grain in Canvas 2D. The whole page carries a faint grain
(`.page-grain`).

## The 3D phones

- `public/models/phone.glb` — a Draco-compressed iPhone model, decoded locally
  from `public/draco/` (no CDN).
- `components/phone/phone-model.tsx` loads it once, stands it upright whatever
  its authored orientation, tints the frame (`finish`) and lays a live app
  screen over the display.
- `components/phone/screen-texture.ts` draws the app screens (`wallet`,
  `cards`) with Canvas 2D, so the holder's name, last four digits and monthly
  spend are props, not pixels in an image.
- `components/phone/phone-stage.tsx` is the React Three Fiber canvas (studio
  lighting from light panels, no HDR download) and `PhoneRig`, which turns the
  phones as the page scrolls, leans them towards the pointer and floats them.
  The canvas only renders while it is on screen.
- `HeroPhones` and `CtaPhone` expose `holder`, `last4`, `spent`, `finish`,
  `tilt`, `scrollSpin`, `followPointer` (and `spread` / `float` on the hero)
  as plain props for the canvas editor.

## Motion

Framer Motion (`motion`) for the blur-and-rise entrances (`Reveal`),
word-by-word headlines (`SplitText`), scroll-lit copy (`ScrollText`), the
pinned and horizontal sections, the video's clip-path zoom, the flag chips
dropping in, the card-number roll and the accordion; Lenis for the scroll.
Below `md` (and under reduced motion) the use-case row becomes a plain
swipeable row, and under reduced motion the video opens full-size and does
not autoplay. Everything holds still under reduced motion and while the page is
being designed in the canvas editor, whose Motion switch also pauses Lenis and
both 3D canvases.

Editor actions: **Mobile menu**, **How it works → Step 1–4**, **Customer
story → Play video / Quote shown**, **FAQ → First answer / Cost answer**,
**Highlights → New card number**.

## The style guide at `/brand`

`/brand` is Ember's brand guidelines page, linked as "Brand guidelines" in the
footer: the mark and wordmark with clear space, minimum size and voice; every
colour token, metal finish and atmosphere with its live value and WCAG
contrast for the real text/surface pairs; Newsreader, Inter and the full type
scale; spacing, radii, shadows and hairlines; the easing, duration and
`--animate-*` tokens, playable; icons and imagery; and every component, live in
its variants and states with a copyable snippet — down to a live 3D phone.
Values are read off the rendered elements, so a token changed in
`src/index.css` changes the page. Hero, StickySteps, UseCases and VideoStory
pin to the scroll or carry full-screen 3D and video, so they appear through
their parts (StepCard with step buttons, a swipeable UseCaseCard row, CtaPhone)
and a link to each in place. It lives in `src/pages/brand.tsx` and
`src/components/brand/`; `src/lib/router.tsx` is the small router for the two
pages. A component added to the site is added there in the same change.
Editor action: **Brand guidelines → Menu sheet**.

## Credits

Photography and the customer-story video from [Pexels](https://www.pexels.com). Flags from the
`circle-flags` set via Iconify. The phone model comes from the
[3d-iphone-website-threejs](https://github.com/Mornieur/3d-iphone-website-threejs)
repository (originally a Sketchfab model); check its licence before using it
commercially.
