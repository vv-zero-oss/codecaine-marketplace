/**
 * Hotel Arven — a one-page guide to a small, old hotel at the top of Zermatt,
 * set like a printed hotel guide on warm paper.
 *
 * Each chapter answers the next question a guest has: where is it and what
 * is it (cover, the house), when is it open (seasons), what is a day like
 * (a day), what does it cost (rooms & rates), what is near (around the
 * house), how do I get there and what is included (arriving), and finally
 * the questions and the registration card itself.
 */

import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { BookingProvider } from "@/components/booking/booking-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Cover } from "@/components/sections/cover"
import { House } from "@/components/sections/house"
import { Seasons } from "@/components/sections/seasons"
import { Day } from "@/components/sections/day"
import { Rooms } from "@/components/sections/rooms"
import { Around } from "@/components/sections/around"
import { Arriving } from "@/components/sections/arriving"
import { GuestBook } from "@/components/sections/guest-book"
import { Faq } from "@/components/sections/faq"
import { Reserve } from "@/components/sections/reserve"
import { usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

const SECTIONS = [
  { id: "top", Section: Cover },
  { id: "house", Section: House },
  { id: "seasons", Section: Seasons },
  { id: "day", Section: Day },
  { id: "rooms", Section: Rooms },
  { id: "around", Section: Around },
  { id: "arriving", Section: Arriving },
  { id: "guest-book", Section: GuestBook },
  { id: "faq", Section: Faq },
  { id: "reserve", Section: Reserve },
]

/** `?only=<id>` renders one section on its own. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing to design. */
export default function App() {
  const pathname = usePathname()
  return (
    <SmoothScroll>
      <BookingProvider>
        <div className="bg-paper text-ink" data-canvas-ignore>
          {pathname === "/brand" ? (
            // The style guide: its own masthead and main, the same footer and paper.
            <BrandPage />
          ) : (
            <>
              <SiteHeader />
              <main data-canvas-ignore>
                {sections().map(({ id, Section }) => (
                  <Section key={id} />
                ))}
              </main>
            </>
          )}
          <SiteFooter />
          {/* The paper's tooth, over everything — photographs and film included. */}
          <div aria-hidden className="paper-grain pointer-events-none fixed inset-0 z-[60] opacity-60 mix-blend-multiply" />
        </div>
      </BookingProvider>
    </SmoothScroll>
  )
}
