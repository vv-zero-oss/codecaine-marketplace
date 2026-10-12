/**
 * Side B Coffee — a roastery in an old record-pressing plant, and two bars
 * where the coffee comes with a record on.
 *
 * Every page is a story. Home: who we are (hero), what we believe (the
 * manifesto), what's on the bar this week (featured), the shelf (beans),
 * how a cherry becomes your cup (the pinned walk from farm to cup), how to
 * never run out (subscription), coffee for your own shop (wholesale), the
 * music (listening bar), the merch, what's happening (the board), and where
 * to find us (the bars). Then Shop, Subscribe, Our story and the brand guide.
 */

import { QuickView } from "@/components/blocks/quick-view"
import { Hero } from "@/components/sections/home/hero"
import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { CartDrawer } from "@/components/site/cart-drawer"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { HomePage } from "@/pages/home"
import { ShopPage } from "@/pages/shop"
import { StoryPage } from "@/pages/story"
import { SubscribePage } from "@/pages/subscribe"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/shop": ShopPage,
  "/subscribe": SubscribePage,
  "/story": StoryPage,
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
      {/* On the home page the hero comes first and the bar sticks once it has scrolled past */}
      {Page === HomePage && <Hero />}
      <SiteHeader />
      <main data-canvas-ignore className="relative overflow-x-clip">
        <RouteTransition path={pathname}>
          <Page />
        </RouteTransition>
      </main>
      <SiteFooter />
      <QuickView />
      <CartDrawer />
    </div>
  )
}
