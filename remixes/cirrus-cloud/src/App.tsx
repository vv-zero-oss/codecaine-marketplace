/**
 * Cirrus — cloud development environments.
 *
 * The page reads as a conversation: what it is (masthead), what teams run on
 * it (workloads), why it exists (origin, what changed), how it works (flow),
 * the product (the spec), how teams adopt it (levels), what it runs (stack),
 * what it costs, what people ask, and the ask itself.
 */

import { CornerLink } from "@/components/blocks/corner-link"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Changed } from "@/components/sections/changed"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Flow } from "@/components/sections/flow"
import { Intro } from "@/components/sections/intro"
import { Levels } from "@/components/sections/levels"
import { Masthead } from "@/components/sections/masthead"
import { Origin } from "@/components/sections/origin"
import { Pricing } from "@/components/sections/pricing"
import { Spec } from "@/components/sections/spec"
import { Stack } from "@/components/sections/stack"
import { Workloads } from "@/components/sections/workloads"
import { SiteFooter } from "@/components/site/site-footer"
import { brand, masthead } from "@/content"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  canvas editor looks through them (they stay in its layers panel). */
export default function App() {
  return (
    <div className="min-h-dvh text-ink-soft" data-canvas-ignore>
      <SmoothScroll />
      <CornerLink label={masthead.corner} href={brand.console} />
      <Masthead />
      <main data-canvas-ignore>
        <Intro />
        <Workloads />
        <Origin />
        <Changed />
        <Flow />
        <Spec />
        <Levels />
        <Stack />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  )
}
