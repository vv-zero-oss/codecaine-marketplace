/**
 * Cadence — a fitness and vitals app's landing page.
 *
 * The home page is one long conversation on a green-black ground: the
 * promise, the product, vitals, progress (on a Linen Mist panel that rises
 * over the night), pricing, reviews and a last invitation. `/brand` is the system it is all
 * built from, rendered from the same tokens and components.
 */

import { useState, type CSSProperties } from "react"
import { useCanvasAction } from "@canvas/react"

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { AnnouncementBar } from "@/components/site/announcement-bar"
import { SiteFooter } from "@/components/site/site-footer"
import { SiteHeader } from "@/components/site/site-header"
import { TooltipProvider } from "@/components/ui/tooltip"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"
import { HomePage } from "@/pages/home"

const PAGES: Record<string, () => React.ReactNode> = {
  "/": HomePage,
  "/brand": BrandPage,
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design, so the canvas editor looks through them
 *  to what they hold (they stay in its layers panel). See CLAUDE.md. */
export default function App() {
  const pathname = usePathname()
  const Page = PAGES[pathname] ?? HomePage
  const [banner, setBanner] = useState(true)
  useCanvasAction("Announcement bar", (next) => setBanner(next ?? !banner), { on: banner, group: "Header" })

  // The banner's height, and how far down it pushes the header and the hero.
  const offsets = { "--banner-height": "30px", "--banner-offset": banner ? "30px" : "0px" } as CSSProperties

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen bg-night text-fg" style={offsets} data-canvas-ignore>
        <SmoothScroll />
        {banner ? <AnnouncementBar onDismiss={() => setBanner(false)} /> : null}
        <SiteHeader docked={pathname === "/brand"} />
        <main data-canvas-ignore className="relative overflow-x-clip">
          <Page />
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  )
}
