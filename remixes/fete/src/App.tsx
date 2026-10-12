/**
 * Fête — an events platform for run clubs, supper clubs, hack nights and
 * everything in between.
 *
 * Every page is a conversation. Home: the promise (hero, with its moods),
 * proof that it is alive (this season's big ones), how hosting goes (the
 * pinned phone), how it feels to be invited (a working RSVP), who is here
 * (communities), how to find your thing (categories), what hosts say, and
 * the last ask. Discover lets you find a night, Host lets you make one,
 * Pricing says what it costs, and /brand is the system underneath.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { CreatePage } from "@/pages/create"
import { DiscoverPage } from "@/pages/discover"
import { HomePage } from "@/pages/home"
import { PricingPage } from "@/pages/pricing"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/discover": DiscoverPage,
  "/create": CreatePage,
  "/pricing": PricingPage,
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
      <SmoothScroll lerp={0.09} />
      <SiteHeader />
      <main data-canvas-ignore className="relative">
        <RouteTransition path={pathname}>
          <Page />
        </RouteTransition>
      </main>
      <SiteFooter />
    </div>
  )
}
