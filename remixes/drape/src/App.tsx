/**
 * Drape — an AI fitting room, as a landing page.
 *
 * Light and drafting-paper at the top, where a WebGL carousel draws each look
 * as a sketch until you try it on; espresso-dark below, where the product
 * shows what it does. Every section is its own named component, and `SECTIONS`
 * is the page in reading order.
 */

import { useSmoothScroll } from "@/components/motion/smooth-scroll"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Controls } from "@/components/sections/controls"
import { Faq } from "@/components/sections/faq"
import { Features } from "@/components/sections/features"
import { Friends } from "@/components/sections/friends"
import { Hero } from "@/components/sections/hero"
import { RoomZoom } from "@/components/sections/room-zoom"
import { Scatter } from "@/components/sections/scatter"
import { ShopMarquee } from "@/components/sections/shop-marquee"
import { Stories } from "@/components/sections/stories"
import { Toolkit } from "@/components/sections/toolkit"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "room", Section: RoomZoom },
  { id: "shops", Section: ShopMarquee },
  { id: "toolkit", Section: Toolkit },
  { id: "controls", Section: Controls },
  { id: "stories", Section: Stories },
  { id: "features", Section: Features },
  { id: "wardrobes", Section: Scatter },
  { id: "faq", Section: Faq },
  { id: "friends", Section: Friends },
]

/** `?only=<id>` renders one section on its own, for screenshots and tests. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design (see CLAUDE.md, section 10). */
export default function App() {
  useSmoothScroll()
  const pathname = usePathname()

  if (pathname === "/brand") {
    return (
      <div className="bg-espresso text-cream" data-canvas-ignore>
        <BrandPage />
      </div>
    )
  }

  return (
    <div className="bg-espresso" data-canvas-ignore>
      <SiteHeader />
      <main data-canvas-ignore>
        {sections().map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
      <SiteFooter />
    </div>
  )
}
