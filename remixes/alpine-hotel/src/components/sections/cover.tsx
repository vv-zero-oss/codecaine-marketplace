import { motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Print } from "@/components/ui/print"
import { Stamp } from "@/components/ui/stamp"
import { EASE_OUT, useScrollTo } from "@/components/motion/smooth-scroll"
import { useBooking } from "@/components/booking/booking-context"
import { DateRangeField, GuestsField } from "@/components/booking/fields"
import { cover, hotel } from "@/content"

/**
 * The cover, like the front of a printed hotel guide: a dateline, one plain
 * sentence about where the house is, a mounted photograph with the house
 * stamp pressed half onto it, and a fill-in line to ask for dates.
 */
export function Cover({
  title = cover.title,
  lede = cover.lede,
  issue = cover.issue,
  caption = cover.caption,
}: {
  title?: string
  lede?: string
  issue?: string
  caption?: string
}) {
  const reduce = useReducedMotion()
  const enter = (delay: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.7, delay, ease: EASE_OUT } }

  return (
    <section id="top" className="relative pt-8 pb-(--spacing-section) sm:pt-10">
      <Container>
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-rule pb-3">
          <span className="label text-ink-soft">{issue}</span>
          <span className="label text-ink-faint">
            {hotel.place} · {hotel.altitude}
          </span>
        </div>

        <div className="mt-10 grid gap-10 lg:mt-12 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <motion.h1 {...enter(0)} className="font-serif text-cover font-normal tracking-[-0.03em] text-balance text-ink">
              {title}
            </motion.h1>
            <motion.p {...enter(0.08)} className="mt-8 max-w-[46ch] text-lede text-ink-soft">
              {lede}
            </motion.p>
          </div>
          <motion.div {...enter(0.16)} className="relative lg:col-span-5 lg:pt-4">
            <Print src={cover.image} alt={cover.imageAlt} fig="1" caption={caption} ratio="4/5" imgClassName="max-h-[50svh]" />
            <Stamp className="absolute bottom-16 -left-4 w-28 sm:-left-24 sm:w-40" />
          </motion.div>
        </div>

        <AvailabilityLine />
      </Container>
    </section>
  )
}

/** "Arriving … for … guests" — a sentence with blanks to fill, sending you on to the rate card. */
export function AvailabilityLine({ cta = "See rooms & rates" }: { cta?: string }) {
  const { range, setRange, guests, setGuests } = useBooking()
  const scrollTo = useScrollTo()
  return (
    <div className="mt-14 grid items-end gap-x-6 gap-y-5 border-t border-ink pt-6 md:grid-cols-[auto_minmax(0,1.6fr)_auto_minmax(0,0.8fr)_auto]">
      <span className="font-serif text-xl text-ink md:pb-2.5">Staying</span>
      <div>
        <label className="label text-ink-faint" htmlFor="cover-dates">
          Dates
        </label>
        <DateRangeField id="cover-dates" value={range} onChange={setRange} />
      </div>
      <span className="font-serif text-xl text-ink md:pb-2.5">for</span>
      <div>
        <label className="label text-ink-faint" htmlFor="cover-guests">
          Guests
        </label>
        <GuestsField id="cover-guests" value={guests} onChange={setGuests} />
      </div>
      <Button size="lg" className="md:mb-0.5" onClick={() => scrollTo("#rooms")}>
        {cta} <ArrowRight />
      </Button>
    </div>
  )
}
