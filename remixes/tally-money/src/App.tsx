/**
 * Tally — a personal-finance landing page, built as named components.
 *
 * The page reads as a list of sections. Complex motion lives in
 * `components/motion/`, each piece a named component whose knobs are scalar
 * props, so the editor can retune it. Hidden states (the mobile menu, the
 * linked bank, the search result) are registered with `useCanvasAction`.
 */

import { useSmoothScroll } from "@/components/motion"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { AutoLog } from "@/components/sections/auto-log"
import { BankLink } from "@/components/sections/bank-link"
import { BankSite } from "@/components/sections/bank-site"
import { Hero } from "@/components/sections/hero"
import { Insights } from "@/components/sections/insights"
import { Closing } from "@/components/sections/closing"
import { Faq } from "@/components/sections/faq"
import { Numbers } from "@/components/sections/numbers"
import { Pricing } from "@/components/sections/pricing"
import { Testimonials } from "@/components/sections/testimonials"
import { Manifesto } from "@/components/sections/manifesto"
import { Merchants } from "@/components/sections/merchants"
import { SearchRecall } from "@/components/sections/search-recall"
import { Showcase } from "@/components/sections/showcase"
import { ScrollProgress } from "@/components/motion/scroll-progress"
import { QrCode } from "@/components/qr-code"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "bank", Section: BankLink },
  { id: "features", Section: Showcase },
  { id: "log", Section: AutoLog },
  { id: "merchants", Section: Merchants },
  { id: "search", Section: SearchRecall },
  { id: "insights", Section: Insights },
  { id: "numbers", Section: Numbers },
  { id: "site", Section: BankSite },
  { id: "proof", Section: Testimonials },
  { id: "pricing", Section: Pricing },
  { id: "faq", Section: Faq },
  { id: "manifesto", Section: Manifesto },
  { id: "closing", Section: Closing },
]

/** `?only=<id>` renders one block on its own — handy for a section at a time. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-white text-ink-900" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="bg-white text-ink-900" data-canvas-ignore>
      <ScrollProgress />
      <SiteHeader />
      <main data-canvas-ignore>
        {sections().map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <SiteFooter />
      {/* A small get-the-app tile pinned bottom-left on wide screens. */}
      <a href="#download" aria-label="Get the app" className="fixed bottom-5 left-5 z-30 hidden transition-transform duration-150 hover:scale-105 active:scale-95 min-[1500px]:block">
        <QrCode className="size-16" />
      </a>
    </div>
  )
}
