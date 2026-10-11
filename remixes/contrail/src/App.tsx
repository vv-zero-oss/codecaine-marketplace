/**
 * Contrail — a flight tracker that tells you first, and tells you why.
 *
 * Every page is a story. Home follows one trip from the night before to the
 * baggage belt, then asks why flying feels like guesswork, shows what
 * Contrail knows, how a delay is seen coming, how flights get in, who else
 * gets told, and what a year of flying adds up to. Pricing, Passport and About
 * carry the same voice; `/brand` is the system it is all built from.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "@/lib/router"
import { AboutPage } from "@/pages/about"
import { BrandPage } from "@/pages/brand"
import { HomePage } from "@/pages/home"
import { PassportPage } from "@/pages/passport"
import { PricingPage } from "@/pages/pricing"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/pricing": PricingPage,
  "/passport": PassportPage,
  "/about": AboutPage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
        <SmoothScroll />
        <SiteHeader />
        <main data-canvas-ignore className="relative overflow-x-clip">
          <RouteTransition path={pathname}>
            <Page />
          </RouteTransition>
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
