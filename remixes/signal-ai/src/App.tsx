import { useSmoothScroll } from "@/components/motion"
import { CallToAction } from "@/components/sections/cta"
import { Developers } from "@/components/sections/developers"
import { Differences } from "@/components/sections/differences"
import { Faq } from "@/components/sections/faq"
import { GetStarted } from "@/components/sections/get-started"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { News } from "@/components/sections/news"
import { Platform } from "@/components/sections/platform"
import { Products } from "@/components/sections/products"
import { Steps } from "@/components/sections/steps"
import { Testimonials } from "@/components/sections/testimonials"
import { Why } from "@/components/sections/why"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order they appear: hero, products, developers, how it works, why switch, the platform, what is different, proof, intro, news, pricing, FAQ, closing call. */
const SECTIONS = [Hero, Products, Developers, Steps, Why, Platform, Differences, Testimonials, Intro, News, GetStarted, Faq, CallToAction]

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing to design. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-paper text-ink" data-canvas-ignore>
        <BrandPage />
        <SiteFooter wide />
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
    </div>
  )
}
