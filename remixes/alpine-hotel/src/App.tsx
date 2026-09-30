/**
 * Hotel Arven — a one-page site for a small hotel at the top of Zermatt.
 *
 * The page answers a guest's questions in order: where is it (hero), what is
 * around it (the valley), what does a morning look like (first tracks), where
 * would I sleep (rooms), what can I reach (nearby), who looks after me
 * (services), did others like it (notes), why stay longer (the quiet band),
 * the small print (FAQ), and finally the booking itself.
 */

import { Toaster } from "@/components/ui/sonner"
import { SmoothScroll } from "@/components/motion/smooth-scroll"
import { BookingProvider } from "@/components/booking/booking-context"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/site-footer"
import { Hero } from "@/components/sections/hero"
import { Valley } from "@/components/sections/valley"
import { FirstTracks } from "@/components/sections/first-tracks"
import { Rooms } from "@/components/sections/rooms"
import { Nearby } from "@/components/sections/nearby"
import { Services } from "@/components/sections/services"
import { Notes } from "@/components/sections/notes"
import { QuietBand } from "@/components/sections/quiet-band"
import { Faq } from "@/components/sections/faq"
import { Book } from "@/components/sections/book"

const SECTIONS = [
  { id: "top", Section: Hero },
  { id: "valley", Section: Valley },
  { id: "first-tracks", Section: FirstTracks },
  { id: "rooms", Section: Rooms },
  { id: "nearby", Section: Nearby },
  { id: "services", Section: Services },
  { id: "notes", Section: Notes },
  { id: "quiet", Section: QuietBand },
  { id: "faq", Section: Faq },
  { id: "book", Section: Book },
]

/** `?only=<id>` renders one section on its own. */
function sections() {
  const only = new URLSearchParams(window.location.search).get("only")
  return only ? SECTIONS.filter((entry) => entry.id === only) : SECTIONS
}

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, nothing to design. */
export default function App() {
  return (
    <SmoothScroll>
      <BookingProvider>
        <div className="bg-snow text-ink" data-canvas-ignore>
          <SiteHeader />
          <main data-canvas-ignore>
            {sections().map(({ id, Section }) => (
              <Section key={id} />
            ))}
          </main>
          <SiteFooter />
          <Toaster position="bottom-center" />
        </div>
      </BookingProvider>
    </SmoothScroll>
  )
}
