import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { ArrowRight, Mountain } from "lucide-react"
import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { EASE_OUT, useMediaQuery, useScrollTo } from "@/components/motion/smooth-scroll"
import { useBooking } from "@/components/booking/booking-context"
import { DateRangeField, GuestsField, nightsOf } from "@/components/booking/fields"
import { hero, hotel } from "@/content"

/**
 * The opening: a headline, two pill buttons, and a photograph band with the
 * booking card rising out of it. As the page scrolls the band loses its
 * margins and radius until it runs edge to edge and pins, while the card
 * climbs into it — the move the recording makes with its phone.
 */
export function Hero({
  title = hero.title,
  lede = hero.lede,
  ledeTwo = hero.ledeTwo,
  image = hero.image,
  imageAlt = hero.imageAlt,
  primary = "Book your stay",
  secondary = "See the rooms",
}: {
  title?: string
  lede?: string
  ledeTwo?: string
  image?: string
  imageAlt?: string
  primary?: string
  secondary?: string
}) {
  const scrollTo = useScrollTo()
  const reduce = useReducedMotion()
  const band = useRef<HTMLDivElement>(null)
  const wide = useMediaQuery("(min-width: 640px)")

  // From the band's top edge entering at 62% of the viewport to it reaching the top.
  const { scrollYProgress: approach } = useScroll({ target: band, offset: ["start 0.62", "start start"] })
  // While it is pinned.
  const { scrollYProgress: pinned } = useScroll({ target: band, offset: ["start start", "end end"] })

  const inset = useTransform(approach, [0, 1], [wide ? 16 : 12, 0])
  const radius = useTransform(approach, [0, 1], [20, 0])
  const cardY = useTransform(approach, [0, 1], [wide ? "-34%" : "-22%", "0%"])
  const imageScale = useTransform(pinned, [0, 1], [1.12, 1])
  const captionOpacity = useTransform(pinned, [0.1, 0.4], [0, 1])

  return (
    <section id="top" className="relative bg-snow">
      <div className="flex flex-col items-center px-4 pt-28 text-center sm:pt-32">
        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_OUT }}
          className="font-headline text-hero text-balance text-ink"
        >
          {title}
        </motion.h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.12, ease: EASE_OUT }}
          className="mt-6 flex flex-col items-center gap-7"
        >
          <p className="max-w-[34ch] text-base leading-snug text-balance text-ink sm:max-w-none sm:text-lg">
            {lede}
            <br className="hidden sm:block" /> {ledeTwo}
          </p>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            <Button size="lg" onClick={() => scrollTo("#book")}>
              {primary}
            </Button>
            <Button size="lg" variant="pill" onClick={() => scrollTo("#rooms")}>
              {secondary}
            </Button>
          </div>
        </motion.div>
      </div>

      <div ref={band} className="relative mt-16 h-[160vh] sm:mt-20">
        <motion.div
          style={{ paddingLeft: inset, paddingRight: inset }}
          className="sticky top-0 h-svh"
          data-canvas-ignore
        >
          <motion.div style={{ borderRadius: radius }} className="relative h-full overflow-hidden bg-pine">
            <motion.img
              src={image}
              alt={imageAlt}
              style={{ scale: reduce ? 1 : imageScale }}
              className="absolute inset-0 size-full object-cover"
            />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-pine/70 via-pine/0 to-pine/10" />
            <motion.div
              style={{ opacity: captionOpacity }}
              className="absolute bottom-5 left-5 flex items-center gap-2 text-sm text-snow sm:bottom-7 sm:left-7"
            >
              <Mountain className="size-4" />
              {hotel.place} · {hotel.altitude}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* The card, above the band, climbing into it. */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-svh" data-canvas-ignore>
          <motion.div
            style={{ y: reduce ? 0 : cardY }}
            className="flex h-full items-center justify-center px-4"
            data-canvas-ignore
          >
            <StayCard />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

/** The booking card that rides up into the hero band. */
export function StayCard({ title = "Plan your stay", note = "Best rate when you book direct" }: { title?: string; note?: string }) {
  const { range, setRange, guests, setGuests } = useBooking()
  const scrollTo = useScrollTo()
  const nights = nightsOf(range)

  return (
    <div className="pointer-events-auto w-full max-w-[23.5rem] rounded-[1.75rem] bg-night p-2 shadow-(--shadow-float)">
      <div className="rounded-[1.375rem] bg-pine p-5 text-snow">
        <div className="flex items-baseline justify-between">
          <p className="font-headline text-2xl tracking-tighter">{title}</p>
          <p className="text-xs text-snow/60">{hotel.altitude}</p>
        </div>
        <div className="mt-5 flex flex-col gap-2.5">
          <label className="text-xs text-snow/70" htmlFor="stay-dates">
            Dates
          </label>
          <DateRangeField id="stay-dates" value={range} onChange={setRange} tone="dark" />
          <label className="mt-1 text-xs text-snow/70" htmlFor="stay-guests">
            Guests
          </label>
          <GuestsField id="stay-guests" value={guests} onChange={setGuests} tone="dark" />
        </div>
        <Button
          size="lg"
          className="mt-5 w-full"
          onClick={() => {
            if (!range?.from || !range?.to) {
              toast("Pick your dates first", { description: "Choose a check-in and a check-out day." })
              return
            }
            toast.success(`Rooms free for ${nights} night${nights === 1 ? "" : "s"}`, {
              description: "Prices below are for your dates.",
            })
            scrollTo("#rooms")
          }}
        >
          Check availability <ArrowRight />
        </Button>
        <p className="mt-3 text-center text-xs text-snow/60">{note}</p>
      </div>
    </div>
  )
}
