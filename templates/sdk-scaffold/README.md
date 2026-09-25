# The scaffolding project, with the SDK

> **Marketplace template.** Copied from `scaffold-sdk/` in the canvas
> repository. The one difference: `@canvas/react` is vendored into
> `src/lib/canvas-react/` (see `vite.config.ts`) because the package is not
> published yet, so references below to `../sdk/src` and to running it from
> the canvas repository's root describe where it came from, not how it runs
> here. Here it is `npm install && npm run dev`.

`scaffold/` again — the same marketing page, block for block and class for
class — this time authored as components and opted into
[`@canvas/react`](src/lib/canvas-react/).

```bash
npm install
npm run dev     # → http://localhost:3102
```

Or, from the repository root, `npm run scaffold:sdk`.

Everything it knows about the editor is one line of `src/main.tsx`:

```tsx
{import.meta.env.DEV && <CanvasDesign />}
```

## Why a second scaffold

Three projects, three questions:

| | |
| --- | --- |
| `scaffold/` | Can the editor design an app that was never built for it? Nothing in it imports anything of ours, and that is what makes the answer worth having. |
| `sdk/fixture` | Does the SDK answer at all? Five components and hand-written CSS, small enough to read in one sitting. |
| `scaffold-sdk/` | What does opting in do to a page the size of a real one? |

The third question is only worth asking against the first one's page, so this
is that page. Same copy, same Tailwind theme, same Radix accordion, same
awkward shapes on purpose: `mx-auto` containers, `absolute` inside `relative`,
a grid inside a grid, inline SVG, a sticky header, a `min-h-[100vh]` hero.

The two render the same document — same 253 layers, same geometry to the pixel,
same `?only=<block>` — and the only difference in the markup is one class
attribute, where `cn()` drops a `max-w-6xl` that the other overrides with
`max-w-3xl` anyway. That is the point of the copy: with the document held
still, everything that changes below is the SDK.

Three things here moved after that sentence was written, and all three were
shaped to keep it true. See **What moves, and the state you cannot click to**
below.

## What changes

116 of those 253 layers are named by the project instead of by its markup:

| `scaffold/` | `scaffold-sdk/` | |
| --- | --- | --- |
| `div.bg-white` | `App` | `<div>` |
| `#nav` | `SiteHeader` | `<header>` |
| `div.mx-auto` | `Container` | `<div>` |
| `Quartz` | `Wordmark` | `<a>` |
| `Features` | `NavLink` | `<a>` |
| `Get started` | `ButtonLink` | `<a>` |
| `#top` | `Hero` | `<section>` |
| `div.pointer-events-none` | `HeroGlow` | `<div>` |
| `Quartz 3.0 is out` | `Badge` | `<span>` |
| `div.feature-card` | `FeatureCard` | `<div>` |
| `figure.testimonial` | `TestimonialCard` | `<figure>` |
| `div.plan-card` | `PlanCard` | `<div>` |
| `Traces with 30-day retention` | `PlanFeature` | `<li>` |
| `Most popular` | `RibbonBadge` | `<span>` |
| `footer.border-t` | `SiteFooter` | `<footer>` |

The left column is not a strawman: it is what the editor reads off `scaffold/`
for these same elements, taken from the same panel, and what it still reads for
every project that has not opted in. Note what a rendered document leaves
you with: a card is named after the words inside it, so the twelve plan
features are twelve different layer names and the three `Start free` buttons
are three layers with one name. Named, they are twelve `PlanFeature`s and nine
`ButtonLink`s — one layer per instance, which is what an instance means in a
design tool.

## And what they were handed

Select one of those layers and the Attributes panel reads the props too, which
is the half of a design that a rendered document cannot give back at all:

```
PlanCard    name "Starter"   price "$0"   features [3 items]   featured false
ButtonLink  href "#start"    variant "outline"
```

`variant="outline"` exists nowhere in the page — cva compiled it into a class
list — and `featured` is the boolean that decides which card gets the ring and
the ribbon. Only what was passed, though: the hero's
`<ButtonLink href="#start" size="lg">` has no `variant` row at all, because it
never set one and the default is applied inside `cva`, after React recorded the
call site.

Those fields are editable here, which is what the first line of
`src/main.tsx` buys:

```ts
import "@canvas/react/hook"
```

Pick `primary` from a plan button's `variant` — a dropdown of the five the type
allows, which `vite.config.ts` reads out of the source with
`canvasPropOptions()` — and that button turns indigo in the running app. It is a live override and not an edit to this directory: the
value still says `outline` in `src/components/sections/pricing.tsx`, and a
reload puts it back. Delete that import and the same rows are readings — which
is what every project that has not added it gets.

## Three things the walk does that are worth knowing before you copy this

**Innermost wins.** An element is named for the component whose output it
*begins*, and where several components all begin at the same element the
nearest one is the answer. `CheckIcon` returns an `<Icon>`, so the twelve
check marks are layers called `Icon`; `CheckIcon` is still in the answer, one
step further out, and the panel simply shows the first. Delegating to another
component is normal React and costs you the outer name.

**A library's parts are components too.** The FAQ is a Radix accordion, and
Radix's own `Primitive.div`, `Primitive.h3` and `Primitive.button` sit nearer
those elements than the wrappers in `src/components/ui/accordion.tsx` do — so
that is what the panel reads there, rather than `AccordionItem` or
`AccordionTrigger`. It is the same rule doing exactly what it says; it is also
the one place on this page where the names are not the project's own.

**`asChild` puts `Slot` in the way.** `scaffold/` writes its link-shaped
buttons as shadcn does, `<Button asChild><a … /></Button>`. That renders the
same `<a class="inline-flex …">` — and reports `Slot.Slot`, which is what Radix
calls the component nearest the anchor. This project has a `ButtonLink`
instead: identical markup, and a name somebody chose. Where you would rather
keep `asChild`, `Button.displayName` on the wrapper does not help — the name
has to belong to the component nearest the element.

## Leaving it out of production

Component names are yours, and this hands them to whatever is framing the
page. The dev-flag guard in `src/main.tsx` is how a real project ships it, and
on a real domain pass `origin` as well — `<CanvasDesign origin="https://…" />`
— so only your editor can ask. Left off, as it is here, any origin can, which
is the honest default for a dev server on localhost and the wrong one anywhere
else.

## What moves, and the state you cannot click to

Three additions, for the two channels that are not about naming at all:

| | |
| --- | --- |
| a GSAP tween on the logo row | An animation that never ends, driven by a bundled module rather than a CSS keyframe. The editor's guest agent can see every CSS animation on a page and none of this one — `window.gsap` does not exist in a bundle — so this is what the SDK's motion channel is proven against. |
| a Lenis | A `requestAnimationFrame` loop that also takes the wheel. Held in a ref, which is where `react-lenis` and every hand-rolled version put one, and therefore where the crawl finds it. |
| `SupportDrawer` | A state the page is one click deep into, registered with `useCanvasAction` so the editor can put the page into it from the panel. It also reads `useCanvasDesignMode()`, so it says whether it was opened from the editor or by a visitor. |

None of them changes the document this project renders, and that was the
constraint rather than an accident:

- the tween is on the row that was already there and moves it four per cent and
  back, instead of the marquee that would have needed the logos written out
  twice;
- Lenis renders nothing;
- the drawer renders `null` until it is open, so a closed one is not an element
  — which is also the honest shape of a drawer, and means the Actions row is
  genuinely the only way to reach that state without leaving the board.

So the layer count, the geometry and the 116 renamed layers are all exactly
what they were. `e2e/live-sdk-scaffold.mjs` would say so first if they were
not.

This is a fixture exhibiting the thing it tests, which is the shape CLAUDE.md
warns about: nothing measured here says whether a page somebody ships holds
anything the motion channel can drive. `e2e/live-sdk-motion.mjs` ends by asking
that of the standard target instead.

## The three settings a real project deletes

`vite.config.ts` aliases `@canvas/react` to `../sdk/src`, deduplicates React
across that boundary, and widens the file-serving allowlist to reach it. All
three exist because the package lives in this repository rather than in
`node_modules`; a project that installed it writes the import as
`@canvas/react` and keeps only the one plugin line — `canvasPropOptions()`,
which is what makes `variant` a dropdown rather than a text field.

## Checking it

```bash
npm run scaffold:sdk           # here → http://localhost:3102
npm run dev                    # the editor, in another terminal
npm run verify:sdk-scaffold
npm run verify:sdk-motion
```

**Restart this dev server after editing `sdk/src`.** The package is aliased in
from outside this project's root and reaches the framed page through the
editor's proxy, which was measured serving the previous module for a whole run
— long enough for `verify:sdk-motion` to pass against code that had been broken
on purpose to check that it could fail.

`e2e/live-sdk-scaffold.mjs` frames this project, asks its SDK what the page is
made of, and checks the panel agrees element for element — every count in it is
a component written once and rendered *n* times. Then it selects a plan card
and reads its props back out of the Attributes panel, which is the only way to
tell that what the SDK answered is what somebody looking at the editor
actually sees.

`e2e/live-sdk-motion.mjs` is the other two channels: the tween measured moving,
held still under Stop and running again under Playing; the reduced-motion query
answered yes inside the page under Reduced; and the drawer opened from the
panel's Actions row.
