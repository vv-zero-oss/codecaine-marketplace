/**
 * Luna Residence — a single long page for a small gated development on the
 * coast, told as a walk through the place: the arrival, what makes it worth
 * choosing, where it sits, the homes, the grounds, the rooms, the people
 * behind it and how to get in touch.
 */

import { motion } from "motion/react"
import { useState } from "react"

import { EASE_OUT, SmoothScroll } from "@/components/motion"
import { ScrollRail } from "@/components/scroll-rail"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Amenities } from "@/components/sections/amenities"
import { Architecture } from "@/components/sections/architecture"
import { CoastStory } from "@/components/sections/coast-story"
import { Credits } from "@/components/sections/credits"
import { Hero } from "@/components/sections/hero"
import { Notes } from "@/components/sections/notes"
import { QuoteBand } from "@/components/sections/quote-band"
import { Reasons } from "@/components/sections/reasons"
import { Residences } from "@/components/sections/residences"
import { SeaViews } from "@/components/sections/sea-views"
import { Space } from "@/components/sections/space"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const [ready, setReady] = useState(false)
  const pathname = usePathname()

  // `/brand`: the style guide, in the same shell and with the same footer.
  if (pathname === "/brand") {
    return (
      <SmoothScroll>
        <div className="overflow-x-clip bg-shell text-ink" data-canvas-ignore>
          <BrandPage />
          <SiteFooter />
        </div>
      </SmoothScroll>
    )
  }

  return (
    <SmoothScroll>
      <div className="overflow-x-clip bg-shell text-ink" data-canvas-ignore>
        <motion.div
          initial={{ opacity: 0 }}
          animate={ready ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, ease: EASE_OUT, delay: 0.5 }}
          className="relative z-40"
          data-canvas-ignore
        >
          <SiteHeader />
          <ScrollRail />
        </motion.div>
        <main data-canvas-ignore>
          <Hero onReady={() => setReady(true)} />
          <Notes />
          <Reasons />
          <QuoteBand />
          <CoastStory />
          <Residences />
          <Amenities />
          <Space />
          <Architecture />
          <Credits />
          <SeaViews />
        </main>
        <SiteFooter />
      </div>
    </SmoothScroll>
  )
}
