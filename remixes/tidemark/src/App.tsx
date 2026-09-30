/**
 * Tidemark — a landing page for business banking.
 *
 * Read top to bottom as a conversation: what it is and what it looks like
 * (hero), who banks here and how much (logos, numbers), what's in the
 * account (the product bento), why idle cash should earn (treasury), how
 * you start (steps), why it's safe (security), who says so (customers),
 * what it costs (pricing), what people ask (FAQ), and the last ask.
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { Numbers } from "@/components/sections/numbers"
import { Pricing } from "@/components/sections/pricing"
import { Security } from "@/components/sections/security"
import { Steps } from "@/components/sections/steps"
import { Treasury } from "@/components/sections/treasury"
import { Voices } from "@/components/sections/voices"
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
        <Numbers />
        <Features />
        <Treasury />
        <Steps />
        <Security />
        <Voices />
        <Pricing />
        <Faq />
        <Closing />
      </main>
      <SiteFooter />
    </div>
  )
}
