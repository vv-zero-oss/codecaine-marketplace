import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Founders } from "@/components/sections/founders"
import { Hero } from "@/components/sections/hero"
import { Network } from "@/components/sections/network"
import { Partners } from "@/components/sections/partners"
import { PhotoBand } from "@/components/sections/photo-band"
import { Programs } from "@/components/sections/programs"
import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { BANDS } from "@/content"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural wrappers
 *  the canvas editor looks through to the sections inside. */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="min-h-screen bg-ink text-fg" data-canvas-ignore>
        <BrandPage />
        <SiteFooter />
      </div>
    )
  }

  return (
    <div className="bg-ink text-fg" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        <Hero />
        <Programs />
        <Founders />
        <Network />
        <Partners />
        {BANDS.map(({ id, ...band }) => (
          <PhotoBand key={id} id={id} {...band} />
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}
