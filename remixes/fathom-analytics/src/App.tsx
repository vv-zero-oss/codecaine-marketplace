/**
 * Fathom — an AI analytics landing page built from pinned, scroll-scrubbed
 * scenes. Sections are plain components that read as a list; each scene that
 * pins itself explains why in its own doc comment.
 */
import { useSmoothScroll } from "@/components/motion"
import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Bento } from "@/components/sections/bento"
import { CtaDoor } from "@/components/sections/cta-door"
import { Engage } from "@/components/sections/engage"
import { Hero } from "@/components/sections/hero"
import { LogoCloud } from "@/components/sections/logo-cloud"
import { Platform } from "@/components/sections/platform"
import { Stories } from "@/components/sections/stories"
import { Trio } from "@/components/sections/trio"
import { Unlock } from "@/components/sections/unlock"
import { UseCases } from "@/components/sections/use-cases"
import { VideoExpand } from "@/components/sections/video-expand"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-paper text-ink" data-canvas-ignore>
        <BrandPage />
      </div>
    )
  }

  return (
    <div className="bg-paper text-ink" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        <Hero />
        <LogoCloud />
        <Bento />
        <Engage />
        <Stories />
        <Platform />
        <Unlock />
        <Trio />
        <VideoExpand />
        <UseCases />
        <CtaDoor />
      </main>
      <SiteFooter />
    </div>
  )
}
