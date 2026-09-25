/**
 * Quartz — the scaffolding project, authored as components.
 *
 * The same marketing page as `scaffold/`, block for block and class for class:
 * hero, logo cloud, features, integrations, stats, testimonials, pricing,
 * FAQs, CTA, footer. Same words, same Tailwind theme, same Radix accordion,
 * same awkward shapes on purpose — `mx-auto` containers, `absolute` inside
 * `relative`, a grid inside a grid, inline SVG, a sticky header and a
 * `min-h-[100vh]` hero.
 *
 * One difference: this one is written as components with names, and it adds
 * `@canvas/react` (see `src/main.tsx`). So the editor's layers panel reads
 * `Hero`, `FeatureCard`, `PlanCard`, `ButtonLink` here and
 * `section`, `div.rounded-2xl`, `a.inline-flex` there — off the same document.
 *
 * That is the whole of the comparison, and it is why the page is a copy rather
 * than a shared module: `scaffold/` has to stay a project that knows nothing
 * about this editor, and a component library the two of them share would make
 * it one that does.
 */

import { useSmoothScroll } from "@/components/motion"
import { SupportDrawer } from "@/components/support-drawer"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { CallToAction } from "@/components/sections/call-to-action"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { Integrations } from "@/components/sections/integrations"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { Pricing } from "@/components/sections/pricing"
import { Stats } from "@/components/sections/stats"
import { Testimonials } from "@/components/sections/testimonials"

/** In the order they appear. The id is the section's own `id` attribute, so
 *  `?only=` and an anchor link agree about what a block is called. */
const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "logos", Section: LogoCloud },
  { id: "features", Section: Features },
  { id: "integrations", Section: Integrations },
  { id: "stats", Section: Stats },
  { id: "testimonials", Section: Testimonials },
  { id: "pricing", Section: Pricing },
  { id: "faq", Section: Faq },
  { id: "cta", Section: CallToAction },
]

/**
 * `?only=<id>` renders one block on its own.
 *
 * A convenience for the fidelity suite, and an honest one: it changes which
 * blocks are on the page, never how any of them is built. A block measured
 * alone is the same markup, the same classes and the same stylesheet as the
 * block measured in place — which is what lets a test carry it out of the
 * project and back without the rest of the page reflowing underneath it
 * between the two measurements.
 *
 * It filters the list rather than wrapping each block in a `<Show>`, because a
 * wrapper is a component too: every section would report `Show` as the
 * innermost component it is the root of, and the panel would name ten layers
 * after the thing that decided whether to render them.
 */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  // A `requestAnimationFrame` loop owned by a bundled module, which is the one
  // kind of motion an editor cannot reach from outside the page. See
  // `components/motion.ts` — it is here so the SDK's motion channel has
  // something real to drive, and it is a fixture, on purpose.
  useSmoothScroll()

  return (
    <div className="bg-white text-quartz-900" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        {sections().map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <SiteFooter />
      {/* A state the page is one click away from, which is what a project
          registers an action for. */}
      <SupportDrawer />
    </div>
  )
}
