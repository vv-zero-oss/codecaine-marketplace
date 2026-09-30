import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { Print } from "@/components/ui/print"
import { useScrollTo } from "@/components/motion/smooth-scroll"
import { useBooking } from "@/components/booking/booking-context"
import { nightsOf } from "@/components/booking/fields"
import { rooms, ratesNote, type Room } from "@/content"
import { cn } from "@/lib/utils"

const chf = (n: number) => `CHF ${n.toLocaleString("en-CH")}`

/**
 * The rate card: every room type on one printed table — size, beds, view and
 * the price in each season — with the photograph of whichever row you are on
 * standing beside it. Picking a row carries it down to the reservation card.
 */
export function Rooms({
  title = "Four kinds of room, one price list.",
  lede = "No packages and no dynamic pricing. What it says here is what it costs.",
}: {
  title?: string
  lede?: string
}) {
  const [active, setActive] = useState(rooms[0].id)
  const { range, room: chosen, setRoom } = useBooking()
  const scrollTo = useScrollTo()
  const reduce = useReducedMotion()
  const nights = nightsOf(range)
  const current = rooms.find((r) => r.id === active) ?? rooms[0]

  for (const r of rooms) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- fixed list, same order every render
    useCanvasAction(`Preview ${r.name}`, () => setActive(r.id), { on: active === r.id, group: "Rooms" })
  }

  const reserve = (r: Room) => {
    setRoom(r.id)
    scrollTo("#reserve")
  }

  return (
    <section id="rooms" className="py-(--spacing-section)">
      <Container>
        <Chapter number="04" label="Rooms & rates" title={title} lede={lede} />

        <div className="mt-12 grid gap-10 lg:grid-cols-12">
          {/* The photograph of the row in hand. Desktop only; phones get one per row. */}
          <div className="hidden lg:col-span-4 lg:block">
            <div className="sticky top-28">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={current.id}
                  initial={reduce ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={reduce ? undefined : { opacity: 0, y: -4 }}
                  transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
                >
                  <Print src={current.image} alt={current.alt} fig="3" caption={`${current.name}, ${current.view.toLowerCase()} side.`} ratio="4/3" />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>

          <div className="lg:col-span-8">
            <table className="w-full border-collapse text-left">
              <caption className="sr-only">Room types and nightly rates</caption>
              <thead className="hidden md:table-header-group">
                <tr className="border-y border-ink">
                  <th className="label py-3 pr-4 font-normal text-ink-faint">Room</th>
                  <th className="label py-3 pr-4 font-normal text-ink-faint">Beds · view</th>
                  <th className="label py-3 pr-4 text-right font-normal text-ink-faint">Winter</th>
                  <th className="label py-3 pr-4 text-right font-normal text-ink-faint">Summer</th>
                  <th className="py-3"><span className="sr-only">Reserve</span></th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((r) => (
                  <RateRow
                    key={r.id}
                    room={r}
                    active={active === r.id}
                    chosen={chosen === r.id}
                    nights={nights}
                    onFocus={() => setActive(r.id)}
                    onReserve={() => reserve(r)}
                  />
                ))}
              </tbody>
            </table>
            <p className="mt-6 max-w-[62ch] text-[13px] leading-relaxed text-ink-soft">{ratesNote}</p>
          </div>
        </div>
      </Container>
    </section>
  )
}

export function RateRow({
  room,
  active,
  chosen,
  nights,
  onFocus,
  onReserve,
}: {
  room: Room
  active: boolean
  chosen: boolean
  nights: number
  onFocus: () => void
  onReserve: () => void
}) {
  return (
    <tr
      onMouseEnter={onFocus}
      onFocus={onFocus}
      className={cn(
        "grid grid-cols-[1fr_auto] gap-x-4 border-b border-rule py-5 transition-colors duration-150 md:table-row md:py-0",
        active && "md:bg-paper-deep/60",
      )}
    >
      <td className="col-span-2 md:py-5 md:pr-4 md:pl-3">
        <img src={room.image} alt={room.alt} loading="lazy" className="mb-4 aspect-[16/10] w-full rounded-print object-cover md:hidden" />
        <p className="font-serif text-2xl leading-tight">
          {room.name}
          {chosen && <span className="label ml-3 align-middle text-signal">Chosen</span>}
        </p>
        <p className="label mt-1 text-ink-faint">
          {room.size} · sleeps {room.sleeps}
        </p>
      </td>
      <td className="col-span-2 mt-2 text-[15px] text-ink-soft md:mt-0 md:py-5 md:pr-4">
        {room.beds}
        <br className="hidden md:block" />
        <span className="md:hidden"> · </span>
        {room.view} view
      </td>
      <td className="mt-3 font-mono text-[15px] tabular-nums md:mt-0 md:py-5 md:pr-4 md:text-right">
        <span className="label mr-2 text-ink-faint md:hidden">Winter</span>
        {chf(room.winter)}
        {nights > 0 && <span className="block text-xs text-signal">{chf(room.winter * nights)} · {nights} n</span>}
      </td>
      <td className="mt-3 text-right font-mono text-[15px] tabular-nums md:mt-0 md:py-5 md:pr-4">
        <span className="label mr-2 text-ink-faint md:hidden">Summer</span>
        {chf(room.summer)}
      </td>
      <td className="col-span-2 mt-4 md:mt-0 md:py-5 md:pr-3 md:text-right">
        <button
          type="button"
          onClick={onReserve}
          className="group inline-flex min-h-11 items-center gap-2 text-sm font-medium text-ink underline decoration-rule underline-offset-4 transition-[text-decoration-color,color] duration-150 hover:text-signal hover:decoration-signal"
        >
          Reserve
          <ArrowRight className="size-4 transition-transform duration-150 ease-(--ease-out) group-hover:translate-x-0.5" />
        </button>
      </td>
    </tr>
  )
}
