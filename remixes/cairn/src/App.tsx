/**
 * Cairn — the AI map maker for guides, directories and event maps.
 *
 * Every page is a conversation. Home: the promise and who it's for, proof,
 * what a map feels like, how one gets made (a pinned scroll story), where it
 * goes, that it can be your own data, templates to start from, the studio
 * itself, the people using it, and the last ask. Templates lets you borrow
 * a map, Studio lets you make one, Pricing says what it costs, and /brand
 * is the system underneath. Every map on the site is the same working
 * component, drawn over Halden Bay — a made-up harbour city.
 */

import { RouteTransition } from "@/components/motion/route-transition"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { HomePage } from "@/pages/home"
import { PricingPage } from "@/pages/pricing"
import { StudioPage } from "@/pages/studio"
import { TemplatesPage } from "@/pages/templates"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/templates": TemplatesPage,
  "/studio": StudioPage,
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
      <SmoothScroll lerp={0.1} />
      <SiteHeader />
      <main data-canvas-ignore className="relative">
        <RouteTransition path={pathname}>
          <Page />
        </RouteTransition>
      </main>
      {pathname === "/studio" ? null : <SiteFooter />}
    </div>
  )
}
