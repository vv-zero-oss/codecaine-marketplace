import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { QrCard } from "@/components/qr-card"
import { Community } from "@/components/sections/community"
import { Daily } from "@/components/sections/daily"
import { FinalCta } from "@/components/sections/final-cta"
import { Hero } from "@/components/sections/hero"
import { Intelligence } from "@/components/sections/intelligence"
import { MoreFeatures } from "@/components/sections/more-features"
import { Privacy } from "@/components/sections/privacy"
import { Proof } from "@/components/sections/proof"
import { Records } from "@/components/sections/records"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order a visitor reads them: hero, proof, the daily signals, records, the AI coach, more features, privacy, community, closing call. */
const SECTIONS = [Hero, Proof, Daily, Records, Intelligence, MoreFeatures, Privacy, Community, FinalCta]

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
