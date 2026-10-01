# Vantage — AI models landing page

A white, editorial landing page for a frontier AI lab. Built from
`remixes/sdk-scaffold`, so the editor reads it by component.

```bash
npm install
npm run dev     # → http://localhost:3330
```

Pages: `/` (home) and `/brand` (the style guide, rendered from the real tokens).

## What is on the page

- **Hero** — a headline whose last word types itself (`WordRotator`), under a
  gradient rule.
- **Products** — a live bento of five previews: a scrolling chat, a coding
  terminal, a bot's turn, an image mosaic and a voice orb. The same previews
  fill the Products menu in the header.
- **Developers** — one API in three languages, on a grainy gradient frame.
- **Stats**, **news** and **two ways to get started**, then the footer with a
  theme toggle.

## Editing

Every colour, shadow, radius, easing and duration is a token in
`src/index.css` (light on `:root`, dark on `[data-theme="dark"]`). Motion
components take scalar props: `WordRotator` (`words`, `hold`, `typeSpeed`,
`gap`, `paused`), `ChatLoop` (`duration`), `CountUp` (`to`, `suffix`,
`duration`), `VoiceOrb` (`size`, `speed`). Hidden states — the mobile menu and
the Products menu — are registered as editor actions.

## Credits

Photography from [Pexels](https://www.pexels.com). Icons from Lucide.
