# Fathom

A landing page for an AI analytics product, built from pinned, scroll-scrubbed
scenes. Serif display type with an italic accent, a soft peach-and-lilac wash,
and product windows that assemble themselves as you scroll.

```bash
npm install
npm run dev     # http://localhost:3340
```

## Scenes

| Component | What it does | Knobs |
| --- | --- | --- |
| `Hero` | Widgets fly in and become the home screen of a product window, which then answers a question | `heightVh`, `title`, `accent`, `body` |
| `LogoCloud` / `Marquee` | CSS marquee of customers | `duration`, `direction`, `pauseOnHover` |
| `Bento` | Three cards with isometric line art | `title`, `accent` |
| `Engage` / `StickyTabs` | Heading and tabs stay pinned; scroll swaps the product screen | `holdVh` |
| `Stories` | Pinned testimonial slider: word-by-word quote beside a looping greyscale video | `holdVh`, `media` |
| `Platform` | Dark `StickyTabs` + three capabilities | `holdVh` |
| `Unlock` | Word reveal heading; comment bubbles drift on `ParallaxLayer` | `title`, `body` |
| `VideoExpand` | Pinned video opens from a small frame to full bleed with a `clip-path` | `heightVh`, `src`, `poster` |
| `UseCases` | CSS `position: sticky` stacked cards that settle back as the next covers them | `title`, `accent` |
| `CtaDoor` | A door swings open as the section scrolls in | `openAngle` |

Below 900px, or with reduced motion, nothing pins: scenes stack and tabs become
buttons. Every pinned step is registered with `useCanvasAction`, so the editor's
Actions row can jump to it.

## Tokens

Colours, radii, shadows, fonts and motion curves are all in `src/index.css`
under `@theme`; `src/lib/motion-tokens.ts` mirrors the curves for Framer Motion.
`/brand` renders them live.

## Credits

Photography and video: Pexels. Icons: Lucide. Customer names are fictional.
