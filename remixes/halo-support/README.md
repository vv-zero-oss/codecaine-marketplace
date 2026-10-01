# Halo Support

A dark, amber-lit landing page for an AI support platform whose agents improve
their own metrics. Built from `sdk-scaffold`, so the canvas editor reads it by
component.

```bash
npm install
npm run dev      # http://localhost:3330
npm run build
```

## The page

Announcement bar, header (shadcn navigation menu, a `Sheet` on small screens),
hero (scrambling scanline headline, a rotating metric with a self-drawing KPI
chart, a typing CLI card, a logo marquee), a console window you can click,
an industries carousel, three auto-advancing walkthroughs (Build, Observe,
Improve), a dotted language map, a customer story, the call to action and
the footer. `/brand` is the style guide, rendered from the real tokens.

## Where things live

| | |
| --- | --- |
| `src/index.css` | Every colour, shadow, radius, font and motion token (`@theme`) |
| `src/content.ts` | All the words |
| `src/components/sections/` | One file per section |
| `src/components/motion/` | `ScrambleText`, `Rotator`, `CountUp`, `LineChart`, `LogoMarquee` — scalar props, ready for the editor |
| `src/components/visuals/` | The screens inside the walkthroughs |
| `src/components/brand/` | The style-guide chapters |

## For the editor

Hidden states are registered with `useCanvasAction`: the mobile menu, the
announcement bar, each walkthrough's next step, the industries carousel, the
console's auto-improve switch and the contact form's success and error states.
Lenis is held in a ref and everything else moves through Framer Motion or CSS,
so the Motion switch reaches all of it; `useStill()` also holds frames while
the page is being designed.

## Credits

Photography from [Pexels](https://www.pexels.com) (Mizuno K; the portrait is
by Rupinder Singh). Fonts are Google Fonts, linked from `index.html`. Social
marks come from [SVGL](https://svgl.app). Customer names on the page are
fictional. The world map is Natural Earth land data (public domain), rasterised
by `scripts/world-grid.mjs`.
