/**
 * Adwright — a landing page for an agentic marketing product.
 *
 * The page is a list of sections, each its own component in
 * `components/sections/`, built from the pieces in `components/blocks/` and
 * shadcn's primitives in `components/ui/`. Every word is in `content.ts`,
 * every photograph in `photos.ts`, every colour and shadow in `index.css`.
 */

import { Comparison } from "@/components/sections/comparison"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Footer } from "@/components/sections/footer"
import { Hero } from "@/components/sections/hero"
import { Navbar } from "@/components/sections/navbar"
import { Overnight } from "@/components/sections/overnight"
import { Platforms } from "@/components/sections/platforms"
import { Proof } from "@/components/sections/proof"
import { SlackSection } from "@/components/sections/slack"
import { StatsBand } from "@/components/sections/stats-band"
import { Steps } from "@/components/sections/steps"
import { Testimonials } from "@/components/sections/testimonials"
import { SmoothScroll } from "@/lib/smooth-scroll"

export default function App() {
  return (
    <>
      <SmoothScroll />
      <Navbar />
      <main>
        <Hero />
        <StatsBand />
        <Proof />
        <Features />
        <Steps />
        <Overnight />
        <SlackSection />
        <Comparison />
        <Testimonials />
        <Platforms />
        <Faq />
      </main>
      <Footer />
    </>
  )
}
