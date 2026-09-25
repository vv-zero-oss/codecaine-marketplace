# Working in this repository

Templates, apps, design systems and skills for the canvas editor — see `README.md` for the layout, the catalog build and how to publish.

Bump an item's `version` and `updated` whenever its contents change, then run
`npm run build` and commit what it writes (`json/`, `archives/`, `index.html`)
with the item — `npm run check` fails in CI otherwise.

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
- When the reference is a video, its motion is copied exactly — easing,
  duration, path and timing, read off its frames (see section 5).
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

#### A video reference: the motion is copied too

When the reference is a video (a screen recording, a site walkthrough, a
Dribbble shot), the motion is part of the aesthetic — copy it as exactly as
the colours and type. Watch it closely, frame by frame, before writing any
animation:

- **Get the frames out.** Use ffmpeg — `@ffmpeg-installer/ffmpeg`
  (https://www.npmjs.com/package/@ffmpeg-installer/ffmpeg) gives a binary
  without a system install; `ffprobe` (`@ffprobe-installer/ffprobe`) reads the
  frame rate and duration. Pull frames at the video's own rate around each
  transition (`ffmpeg -ss <start> -to <end> -i ref.mp4 -vf fps=30 frames/%04d.png`),
  lay them out as a contact sheet (`-vf "fps=10,tile=6x4"`) to see a whole
  move at once, and look at them.
- **Read each animation's numbers off the frames:**
  - **Duration** — count the frames from the first movement to rest
    (frames ÷ fps).
  - **Easing** — plot the element's position (or opacity, scale) per frame:
    a fast start that settles is an ease-out, a slow start and end is
    ease-in-out, an overshoot and settle is a spring. Turn that into a
    `cubic-bezier` or a spring's `stiffness` / `damping` / `bounce`.
  - **Path** — where each element starts, where it lands, and how it gets
    there: which properties move (translate, scale, opacity, blur,
    clip-path), by how much, and from which origin.
  - **Timing and choreography** — delays and stagger between elements, what
    moves first, what overlaps, and what is tied to scroll rather than time.
  - **Scroll feel** — how smooth or heavy the scroll is, and what is pinned,
    scrubbed or parallaxed against it.
- **Build it with Framer Motion and Lenis** (section 3): Framer Motion for
  the transitions, springs, stagger and scroll-linked effects; Lenis for the
  scroll itself, tuned (`lerp` / `duration` / `easing`) to the recording's
  feel. Put the easings and durations you measured in as tokens beside the
  others, so every animation shares them.
- **Compare motion as well as stills.** Record the template the same way
  (Playwright's `recordVideo`, or frames at the same fps) and put its frames
  next to the reference's for each transition, as in section 9. Where the
  timing or easing differs, fix it and compare again.

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

### 8. Every line of code is responsive

All template code is responsive, always — no section, component or layout is
written for one screen size only.

- Build mobile-first and scale up with media queries (Tailwind's `sm:` /
  `md:` / `lg:` / `xl:` / `2xl:`), and use container queries (`@container`,
  `@sm:` / `@md:`) where a component should respond to the space it is given
  rather than to the window.
- Type, spacing, grids, images, navigation (a menu becomes a shadcn `Sheet`
  or drawer on small screens), tables and pricing cards all adapt. Use
  `clamp()` for fluid type and spacing where the reference scales smoothly.
- No horizontal scroll at any width, down to 360px. Touch targets stay at
  least 44px on mobile, and hover-only interactions have a tap equivalent.
- Motion adapts too: heavy scroll effects are toned down on small screens.
- Check it at 375px, 768px, 1280px and 1440px before calling it done.

### 9. End every template with a side-by-side comparison

A template is not done until it has been compared with the reference, and the
person has seen the comparison.

- Run the template and screenshot it (Playwright against the dev server) at
  the same viewport width as the reference image, section by section where
  the page is long — and at mobile width too, to show the responsive layout
  holds up.
- Put each screenshot **next to the user's reference image** — one image with
  the two side by side, or the pair sent together — and **always show it to
  the user** in the final message (with the file tool where one is available).
- Check the pair against section 5: colours, buttons, typography, spacing,
  shadows, borders. Where they differ, fix it and take the comparison again;
  where a difference is deliberate or could not be closed, say so in a line.
- Never describe a comparison that was not made. If a screenshot could not be
  taken, say so and why.

### 10. Structural wrappers are marked `data-canvas-ignore`

A template is opened in the canvas editor as a live project, and the editor's
pointer picks whatever element is under it. A React app is wrapped in elements
nobody designs — `#root`, the app's page `div`, `<main>`, the `mx-auto
max-w-*` container every section sits in — and they cover everything, so
without help every hover over a gap outlines one of them and every click there
selects it.

So every template marks those wrappers with **`data-canvas-ignore`**. The
editor's hover, click and marquee look straight through a marked element to
what is inside it (or, over its bare background, to the nearest layer round it
that is not marked). It is still a layer: it is in the layers panel, it can be
selected from there or with ⇧↵ from inside it, and it is edited like anything
else once selected. Drops still land in it.

- **Mark:** `#root` in `index.html`, the page wrapper in `App.tsx`, `<main>`,
  and a centring or max-width `Container` component (on the component, so
  every use of it is marked). An element that exists only to hold other
  elements in place, with no border, shadow or content of its own — the page
  wrapper may carry the page's background colour.
- **Do not mark:** anything somebody would design — a section, a card, a
  button, a grid of cards somebody would restyle as a unit, a heading, an
  image, a nav. When in doubt, leave it unmarked: a wrapper that is picked
  now and then is a nuisance, a card that cannot be clicked is a bug.
- **Spelling:** bare in JSX (`<main data-canvas-ignore>`, which React renders
  as `"true"`) or in HTML (`<div id="root" data-canvas-ignore>`). Presence is
  what counts. `data-canvas-ignore={false}` (the string `"false"`) switches it
  off, which is how a caller opts one use of a marked component back in.
- It is a convenience for editing, not a rule of the page: it changes nothing
  about how the site renders or behaves, and a template that leaves it out
  still works — it is just fiddlier to click around in.

In the editor, the same attribute is set or cleared from a layer's right-click
menu (canvas or layers panel): **Ignore on canvas** / **Stop ignoring on
canvas**. Marked layers show a crossed-out cursor in the layers panel. See
`docs/canvas-ignore.md` in the canvas repository.
