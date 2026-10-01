import { useSmoothScroll } from "@/components/motion"
import { Community } from "@/components/sections/community"
import { Developers } from "@/components/sections/developers"
import { GetStarted } from "@/components/sections/get-started"
import { Hero } from "@/components/sections/hero"
import { Intro } from "@/components/sections/intro"
import { News } from "@/components/sections/news"
import { Products } from "@/components/sections/products"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** In the order they appear: hero, products, developers, proof, intro, news, ways to start. */
const SECTIONS = [Hero, Products, Developers, Community, Intro, News, GetStarted]

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing to design. */
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
    </div>
  )
}
