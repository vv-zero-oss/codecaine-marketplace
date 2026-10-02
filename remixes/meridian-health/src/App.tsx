import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { QrCard } from "@/components/qr-card"
import { Community } from "@/components/sections/community"
import { DayTimeline } from "@/components/sections/day-timeline"
import { Daily } from "@/components/sections/daily"
import { FinalCta } from "@/components/sections/final-cta"
import { Hero } from "@/components/sections/hero"
import { Intelligence } from "@/components/sections/intelligence"
import { MoreFeatures } from "@/components/sections/more-features"
import { Manifesto } from "@/components/sections/manifesto"
import { Privacy } from "@/components/sections/privacy"
import { Proof } from "@/components/sections/proof"
import { Records } from "@/components/sections/records"
import { Signals } from "@/components/sections/signals"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order a visitor reads them: hero, proof, a manifesto, the daily signals, a pinned day timeline, records, a horizontal signal ribbon, the AI coach, more features, privacy, community, closing call. */
const SECTIONS = [Hero, Proof, Manifesto, Daily, DayTimeline, Records, Signals, Intelligence, MoreFeatures, Privacy, Community, FinalCta]

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing of their own to design. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-paper text-ink" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="bg-paper text-ink" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        {SECTIONS.map((Section) => (
          <Section key={Section.name} />
        ))}
      </main>
      <SiteFooter />
      <QrCard />
    </div>
  )
}
