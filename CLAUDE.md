# Working in this repository

Templates, apps, design systems and skills for the canvas editor — see `README.md` for the layout, the catalog build and how to publish.

## Building a template — non-negotiable

Every template (a site, a landing page, a project under
`codecaine-marketplace/templates/`, or anything built from a reference someone
hands over) follows these rules without exception. They are not preferences to
weigh against convenience. A template that breaks one of them is not finished.

These rules are for the **template being built**. The editor's own UI keeps
its own rules (the `--ed-*` palette, `src/editor/ui/`) — do not mix the two.

### 1. The skill comes first

Emil Kowalski's design-engineering skills are installed in `.claude/skills/`
(from `npx skills add emilkowalski/skill`; `skills-lock.json` pins them — run
`npx skills update -p` to refresh). Use them on every template:

- `emil-design-eng` for the overall craft bar;
- `animate` to build any motion, `review-animations` to check it before it
  ships, `find-animation-opportunities` / `improve-animations` for a pass over
  a finished page;
- `animation-vocabulary`, `apple-design` and `pick-ui-library` when choosing
  what and how.

If the skills are missing (a fresh clone of another repo), install them before
writing any UI: `npx skills add emilkowalski/skill -s '*' -a claude-code -y --copy`.

### 2. shadcn first, never reinvent

- Use shadcn/ui components to the maximum — buttons, inputs, cards, dialogs,
  sheets, tabs, accordions, **menus, navigation menus, dropdowns, command
  palettes** and the rest. Add them with the shadcn CLI
  (`npx shadcn@latest add <component>`); do not hand-write a component shadcn
  already has.
- Follow shadcn's project structure: primitives in `components/ui/`, and
  anything composed out of them in its own folder beside it
  (`components/blocks/` or `components/sections/` — `hero.tsx`,
  `footer.tsx`, `pricing.tsx`, `navbar.tsx`), with `cn()` in `lib/utils.ts`.
- **Componentise what repeats.** A footer, a header, a hero, a section
  heading, a CTA band, a card layout that appears twice is a component the
  second time it appears. Decide this yourself, without being asked — a page
  should read as a list of sections, not a wall of markup.

### 3. Motion: the skill, Lenis and Framer Motion

- Every animation is designed with the skill above (`animate`, then
  `review-animations`).
- Smooth scroll is **Lenis** (`lenis`). For a bolder, more expressive page,
  Lenis always carries the scroll.
- Motion is **Framer Motion** (`motion` / `framer-motion`) — entrances,
  layout transitions, scroll-linked effects, gestures.
- **Be critical of every animation.** For each one, be able to say why it
  exists and what it adds. If it only adds movement, cut it. Subtle value is
  the bar; micro-interactions (a hover, a press, a toggle, a copied state) are
  always welcome. Respect `prefers-reduced-motion`.

### 4. Images: Pexels

Use real photography from Pexels (https://www.pexels.com/api/). The API key:

```
PEXELS_API_KEY=fAlnKeRzFBXFeBVMwcBEvpWBa7oB973kxC4o1nb7nx8nU10Xyp5O5AVK
```

The key rotates every day. If it returns `401`, ask for today's key rather
than falling back to placeholders. Query with
`curl -H "Authorization: $PEXELS_API_KEY" "https://api.pexels.com/v1/search?query=…&per_page=…"`,
pick images whose tone matches the reference, and credit Pexels where the
template has a credits spot. Never ship a grey box or a lorem-picsum image.

### 5. A reference is copied in its aesthetic, exactly

When a reference is given, **look at the image and read its HTML/CSS** — both,
every time. The screenshot shows the feel; the code shows the numbers.

- **Colours are not reinvented** unless the person says so. Use the
  reference's colours, or the same tones where an exact value cannot be read.
- **Buttons** — look closely at how they are built: radius, padding, height,
  border, fill, shadow, hover and press states, icon placement. Reproduce them.
- Then, always, these four:
  1. **Font and typography** — the family, weights, sizes, line-heights,
     letter-spacing, and how the type is laid out (scale, hierarchy,
     alignment, measure).
  2. **Spacing** — a scan of the spacing scale: padding, gaps, section
     rhythm, and the negative space around things.
  3. **Shadows** — how each one is configured: offsets, blur, spread, colour
     and opacity, and how many layers are stacked.
  4. **Borders** — width, colour, style, radius, and where hairlines are used.
- **Every colour and every shadow becomes a token** in the global CSS
  (`globals.css` / `index.css` — CSS custom properties, exposed through
  Tailwind's `@theme`), so it can be changed in one place later. No raw hex or
  one-off shadow inside a component. Radii, font families and the spacing
  steps you read off the reference go in as tokens too.
- **Fonts**: get as close as possible to the reference's family (Google Fonts
  or a close equivalent). If nothing close exists, fall back to **Inter** for
  sans or **EB Garamond** for serif, or another Google Font of the same
  character.
- **You cannot move away from the aesthetics of the given example.** That is
  the rule the others serve. A template that is "inspired by" the reference
  but looks like something else has failed.

### 6. Icons and logos

- **Lucide** (`lucide-react`) wherever a vector icon is needed; **Lucide
  animated icons** (https://lucide-animated.com) where an icon should move.
- For anything Lucide lacks, the Iconify sets:
  https://github.com/iconify/icon-sets
- **Company and brand logos** from SVGL: https://github.com/pheralb/svgl
  (https://svgl.app). Never draw a brand logo by hand.

### 7. Copy is written, not pasted

- **Always replace the reference's text** with new content. Never ship the
  reference's words, and never lorem ipsum.
- If no storyline was given, **write one**: who the product is for, what it
  does, and what each section does after the one before it — hero, proof,
  features, how it works, pricing, FAQ, CTA, footer — following the standard
  order a real site of that kind uses.
- Keep one consistent voice across the whole page. It should read as real,
  not as filler.
- **Every page is a conversation, not a readout.** Each section answers the
  question the previous one raised. Pricing tables, FAQs and feature lists
  follow the conventions a visitor expects from a real product.

### 8. End every template with a side-by-side comparison

A template is not done until it has been compared with the reference, and the
person has seen the comparison.

- Run the template and screenshot it (Playwright against the dev server) at
  the same viewport width as the reference image, section by section where
  the page is long.
- Put each screenshot **next to the user's reference image** — one image with
  the two side by side, or the pair sent together — and **always show it to
  the user** in the final message (with the file tool where one is available).
- Check the pair against section 5: colours, buttons, typography, spacing,
  shadows, borders. Where they differ, fix it and take the comparison again;
  where a difference is deliberate or could not be closed, say so in a line.
- Never describe a comparison that was not made. If a screenshot could not be
  taken, say so and why.
