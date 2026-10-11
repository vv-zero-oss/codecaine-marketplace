import { useState } from "react"
import { Plus, Star } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { avatar, PEOPLE } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Review = { name?: string; handle?: string; photo?: number; title?: string; meta?: string; stars?: boolean; body: string }

const REVIEWS: Review[] = [
  { name: "Marguerite Osei", handle: "@margosei", photo: PEOPLE[5], body: "I fly every week for work and had a folder of five apps for this. Now there's one. It told me about the inbound plane before the gate agent knew anything." },
  { title: "Finally, a calm app", meta: "12 Mar 2026 · by halfwaythere", stars: true, body: "Clear, fast and obviously made by people who care. The delay predictions are scarily good, and the passport is the nicest thing on my phone." },
  { name: "Dev Raman", handle: "@devflies", photo: PEOPLE[6], body: "One of the most thoughtfully designed apps I've used. Every screen answers the question I actually had." },
  { title: "Worth the yearly fee", meta: "2 Jan 2026 · by k.whitlock", stars: true, body: "Two million miles in, and this is the first app that keeps me ahead of the airport instead of behind it. The tower advisories alone have saved me hours." },
  { name: "Joel Brandt", meta: "Rebooked in time", photo: PEOPLE[4], body: "Day trip, Boston to Chicago. At 7:20 Contrail flagged a delay two legs before mine. The airline said nothing until 9. I was on the earlier flight by then." },
  { title: "Favourite app, full stop", meta: "28 Aug 2025 · by aczar", stars: true, body: "It does exactly what it needs to, and it does it beautifully. No notes. I wish everything on my phone worked like this." },
  { name: "Saoirse Flynn", handle: "@saoirseflies", photo: PEOPLE[9], body: "My mum gets a notification when I land, and has stopped texting me “well?” from the moment the wheels touch down. Worth it for that alone." },
  { name: "Henrik Adler", handle: "@hadler", photo: PEOPLE[10], body: "First flight I tracked with it got cancelled. Contrail told me thirty minutes before the airline did, while I was still at home." },
  { title: "The gate change thing", meta: "4 Jun 2026 · by tinyrunway", stars: true, body: "Got the gate change while I was in the coffee line. Walked straight over. Watched forty people sprint past me ten minutes later." },
  { name: "Lucía Paredes", handle: "@luciap", photo: PEOPLE[11], body: "The friends map is how my whole family keeps track of each other at Christmas. Six cities, zero group-chat chaos." },
]

function ReviewCard({ review }: { review: Review }) {
  return (
    <figure className="break-inside-avoid rounded-(--radius-card) bg-raised shadow-(--shadow-card)">
      <figcaption className="flex items-center gap-3 border-b border-dashed border-line px-5 pt-5 pb-4">
        {review.photo ? <img src={avatar(review.photo, 80)} alt="" className="size-10 rounded-full object-cover" /> : null}
        <div className="min-w-0">
          <p className="truncate font-semibold text-ink">{review.name ?? review.title}</p>
          <p className="truncate text-[13.5px] text-ink-3">{review.handle ?? review.meta}</p>
          {review.stars ? (
            <span className="mt-1 flex gap-0.5 text-amber" aria-label="Five stars">
              {Array.from({ length: 5 }, (_, i) => <Star key={i} className="size-3.5 fill-current" />)}
            </span>
          ) : null}
        </div>
      </figcaption>
      <blockquote className="px-5 pt-4 pb-5 text-[15px] leading-relaxed text-ink-2">{review.body}</blockquote>
    </figure>
  )
}

/**
 * The receipts: a masonry wall of reviews that fades out at the bottom, with
 * a pill that opens the rest.
 */
export function Testimonials() {
  const [open, setOpen] = useState(false)
  useCanvasAction("All reviews", (next) => setOpen(next ?? !open), { on: open, group: "Reviews" })
  const shown = open ? REVIEWS : REVIEWS.slice(0, 7)
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container className="max-w-[1400px]">
        <Reveal>
          <h2 className="type-display mx-auto max-w-[20ch] text-center text-h2 text-balance">From first flights to two million miles, people love Contrail.</h2>
        </Reveal>
        <div className={cn("relative mt-14", !open && "max-h-[880px] overflow-hidden")}>
          <div className="columns-1 gap-4 sm:columns-2 lg:columns-3 xl:columns-4 [&>*]:mb-4">
            <AnimatePresence initial={false}>
              {shown.map((r, i) => (
                <motion.div key={i} initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3, delay: i >= 7 ? (i - 7) * 0.05 : 0 }}>
                  <ReviewCard review={r} />
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
          {!open ? <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-64 bg-[linear-gradient(transparent,var(--color-page)_85%)]" /> : null}
          <div className={cn("flex justify-center", open ? "mt-6" : "absolute inset-x-0 bottom-6")}>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              className="inline-flex h-12 items-center gap-3 rounded-full bg-ink py-1.5 pr-4 pl-1.5 text-[15px] text-white shadow-(--shadow-float) transition-transform duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]"
            >
              <span className="flex -space-x-2">
                {PEOPLE.slice(5, 8).map((id) => <img key={id} src={avatar(id, 64)} alt="" className="size-9 rounded-full object-cover ring-2 ring-ink" />)}
              </span>
              <span className="text-white/80 max-sm:hidden">3 million people fly with Contrail</span>
              <span className="h-5 w-px bg-white/20 max-sm:hidden" />
              <span className="flex items-center gap-1.5 font-medium">
                {open ? "Show fewer" : "View more"}
                <Plus className={cn("size-4 transition-transform duration-(--duration-swap) ease-(--ease-out-strong)", open && "rotate-45")} />
              </span>
            </button>
          </div>
        </div>
      </Container>
    </section>
  )
}
