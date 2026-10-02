/**
 * Meadow — a landing page for an everything-workspace, authored as named
 * components and opted into `@canvas/react` (see `src/main.tsx`), so the
 * editor's layers panel reads `Hero`, `Overview`, `Skills` rather than
 * `section.relative`.
 */

import { useSmoothScroll } from "@/components/motion"
import { CaseStudies } from "@/components/sections/case-studies"
import { Cta } from "@/components/sections/cta"
import { HowItWorks } from "@/components/sections/how-it-works"
import { Pricing } from "@/components/sections/pricing"
import { StickyVideo } from "@/components/sections/sticky-video"
import { Testimonials } from "@/components/sections/testimonials"
import { ValueProps } from "@/components/sections/value-props"
import { Assistant } from "@/components/sections/assistant"
import { ContextGraph } from "@/components/sections/context-graph"
import { Developers } from "@/components/sections/developers"
import { Hero } from "@/components/sections/hero"
import { Overview } from "@/components/sections/overview"
import { Scale } from "@/components/sections/scale"
import { Skills } from "@/components/sections/skills"
import { Start } from "@/components/sections/start"
import { Testimonial } from "@/components/sections/testimonial"
import { Trust } from "@/components/sections/trust"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design (see CLAUDE.md). */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-page text-ink-900" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="bg-page text-ink-900" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        <Hero />
        <Trust />
        <ValueProps />
        <Overview />
        <HowItWorks />
        <Assistant />
        <StickyVideo />
        <Skills />
        <CaseStudies />
        <Testimonial />
        <Testimonials />
        <ContextGraph />
        <Developers />
        <Scale />
        <Pricing />
        <Start />
        <Cta />
      </main>
      <SiteFooter />
    </div>
  )
}
