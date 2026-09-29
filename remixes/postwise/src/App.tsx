/**
 * Postwise — a landing page for an AI email assistant.
 *
 * Read top to bottom as a conversation: what it is (hero), who uses it
 * (logos, a quote), what it does all day (the Scribe copilot and the signals
 * it catches), how it's built (the platform deck), an ask, who it's for
 * (personas), what it changed for them (results), further reading, the wall
 * of love, and the last ask.
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Articles } from "@/components/sections/articles"
import { Copilot } from "@/components/sections/copilot"
import { Hero } from "@/components/sections/hero"
import { JourneyCta } from "@/components/sections/journey-cta"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { LoveWall } from "@/components/sections/love-wall"
import { Personas } from "@/components/sections/personas"
import { Platform } from "@/components/sections/platform"
import { QuoteSection } from "@/components/sections/quote-section"
import { Results } from "@/components/sections/results"
import { UnlockCta } from "@/components/sections/unlock-cta"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  return (
    <div className="min-h-screen bg-paper text-ink" data-canvas-ignore>
      <SmoothScroll />
      <SiteHeader />
      <main data-canvas-ignore>
        <Hero />
        <LogoCloud />
        <QuoteSection quote="first" className="pt-6 md:pt-8" />
        <Copilot />
        <Platform />
        <QuoteSection quote="third" className="pt-0 md:pt-0" />
        <JourneyCta />
        <Personas />
        <Results />
        <Articles />
        <LoveWall />
        <UnlockCta />
      </main>
      <SiteFooter />
    </div>
  )
}
