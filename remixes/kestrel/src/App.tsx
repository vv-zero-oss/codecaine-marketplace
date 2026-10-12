/**
 * Kestrel — a finance platform where agents do the busywork.
 *
 * Every page reads as a conversation. The home page: what it is and what it
 * looks like working (hero), who already runs on it (proof), what's in it
 * (platform), why it exists — six tools that never talked, now one (the
 * pinned story), how a dollar moves through it (the pinned walkthrough), who
 * says so (team story), how it learns your rules (policy), how it grows with
 * you (scale), what it saves (calculator), the receipts, and the last ask.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { CustomersPage } from "@/pages/customers"
import { HomePage } from "@/pages/home"
import { PlatformPage } from "@/pages/platform"
import { PricingPage } from "@/pages/pricing"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/platform": PlatformPage,
  "/pricing": PricingPage,
  "/customers": CustomersPage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage

  return (
    <div className="min-h-screen bg-page text-ink" data-canvas-ignore>
      <SmoothScroll />
      <SiteHeader />
      <main data-canvas-ignore className="relative z-10 overflow-x-clip rounded-b-[28px] bg-page pb-8">
        <RouteTransition path={pathname}>
          <Page />
        </RouteTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
