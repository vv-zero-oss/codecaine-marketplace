/**
 * Cirrus — cloud development environments: home, product, network,
 * pricing, changelog and the brand guidelines.
 *
 * Every section is a named component and every piece of motion is its own
 * (see `components/motion/`), so the canvas editor's layers panel reads
 * `ServerFarm`, `LifeCycle`, `PixelMarquee` rather than `canvas`. Words live
 * in `content.ts`; every colour, size and curve is a token in `index.css`.
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import type { City } from "@/components/site/city-line"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { BrandPage } from "@/pages/brand"
import { ChangelogPage } from "@/pages/changelog"
import { HomePage } from "@/pages/home"
import { NetworkPage } from "@/pages/network"
import { NotFoundPage } from "@/pages/not-found"
import { PricingPage } from "@/pages/pricing"
import { ProductPage } from "@/pages/product"
import { usePathname } from "@/router"

/** Each page, and the edge region whose skyline sits in its footer. */
const PAGES: Record<string, { Page: () => React.JSX.Element; city: City }> = {
  "/": { Page: HomePage, city: "london" },
  "/product": { Page: ProductPage, city: "miami" },
  "/network": { Page: NetworkPage, city: "manhattan" },
  "/pricing": { Page: PricingPage, city: "los-angeles" },
  "/changelog": { Page: ChangelogPage, city: "london" },
  "/brand": { Page: BrandPage, city: "manhattan" },
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, so the
 *  canvas editor looks through them (they stay in its layers panel). */
export default function App() {
  const pathname = usePathname().replace(/\/+$/, "") || "/"
  const { Page, city } = PAGES[pathname] ?? { Page: NotFoundPage, city: "montreal" as City }

  return (
    <div className="min-h-dvh text-ink-soft" data-canvas-ignore>
      <SmoothScroll resetKey={pathname} />
      <SiteHeader pathname={pathname} />
      <main data-canvas-ignore>
        <Page key={pathname} />
      </main>
      <SiteFooter city={city} />
    </div>
  )
}
