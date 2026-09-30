import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Clock, MapPin, TrainFront, Car, Plane } from "lucide-react"
import { useCanvasAction } from "@canvas/react"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Reveal } from "@/components/motion/reveal"
import { EASE_OUT } from "@/components/motion/smooth-scroll"
import { getting, hotel, spots, type Spot } from "@/content"
import { cn } from "@/lib/utils"

const FILTERS = [
  { value: "all", label: "Everything" },
  { value: "winter", label: "Winter" },
  { value: "summer", label: "Summer" },
  { value: "village", label: "Village" },
] as const
type Filter = (typeof FILTERS)[number]["value"]

/**
 * Where to go from the door: a pinboard of nearby spots with how long each
 * takes to reach, filtered by season, and how to get to the hotel itself.
 */
export function Nearby({
  title = "Everything within a morning's reach",
  lede = "Lakes, lifts, glaciers and the old village — timed from our front door.",
}: {
  title?: string
  lede?: string
}) {
  const [filter, setFilter] = useState<Filter>("all")
  const reduce = useReducedMotion()
  for (const f of FILTERS) {
    // eslint-disable-next-line react-hooks/rules-of-hooks -- fixed list, same order every render
    useCanvasAction(`Show ${f.label.toLowerCase()}`, () => setFilter(f.value), { on: filter === f.value, group: "Nearby" })
  }
  const shown = spots.filter((s) => filter === "all" || s.kind === filter)

  return (
    <section id="nearby" className="bg-snow py-(--spacing-section)">
      <Container>
        <SectionHeading eyebrow="Nearby spots" title={title} lede={lede} />
        <div className="mt-10 flex justify-center">
          <Tabs value={filter} onValueChange={(v) => setFilter(v as Filter)}>
            <TabsList className="h-auto rounded-pill bg-mist p-1">
              {FILTERS.map((f) => (
                <TabsTrigger
                  key={f.value}
                  value={f.value}
                  className="h-10 rounded-pill px-4 text-[13px] data-[state=active]:bg-snow data-[state=active]:shadow-(--shadow-pill) sm:px-5"
                >
                  {f.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        <motion.div layout={!reduce} className="mt-10 grid auto-rows-[15rem] grid-flow-dense grid-cols-1 gap-3 min-[480px]:grid-cols-2 sm:auto-rows-[17rem] sm:gap-4 lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((spot) => (
              <motion.div
                key={spot.name}
                layout={!reduce}
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.35, ease: EASE_OUT }}
                className={cn(spot.tall && "row-span-2")}
              >
                <SpotCard spot={spot} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div id="location" className="mt-20 grid gap-8 border-t border-hairline pt-12 lg:grid-cols-[1fr_2fr]">
          <Reveal>
            <p className="text-[13px] text-rust">Getting here</p>
            <p className="font-headline mt-3 text-4xl tracking-tighter">{hotel.place}</p>
            <p className="mt-3 flex items-center gap-2 text-ink-soft">
              <MapPin className="size-4" />
              {hotel.address}
            </p>
          </Reveal>
          <div className="grid gap-6 sm:grid-cols-3">
            {getting.map((g, i) => {
              const Icon = [TrainFront, Car, Plane][i] ?? TrainFront
              return (
                <Reveal key={g.title} delay={i * 0.06}>
                  <Icon className="size-5 text-rust" />
                  <p className="mt-3 font-medium">{g.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-soft">{g.body}</p>
                </Reveal>
              )
            })}
          </div>
        </div>
      </Container>
    </section>
  )
}

export function SpotCard({ spot }: { spot: Spot }) {
  return (
    <article className="group relative h-full overflow-hidden rounded-card bg-ice sm:min-h-72">
      <img
        src={spot.image}
        alt={spot.alt}
        loading="lazy"
        className="absolute inset-0 size-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.04]"
      />
      <div className="absolute inset-x-2 bottom-2 flex items-center gap-3 rounded-xl bg-snow/92 p-2.5 pr-3 backdrop-blur-md sm:inset-x-3 sm:bottom-3">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-pine text-snow">
          <Clock className="size-4" />
        </span>
        <div className="min-w-0">
          <p className="truncate text-sm font-medium text-ink">
            {spot.name} <span className="font-normal text-rust">· {spot.distance}</span>
          </p>
          <p className="truncate text-xs text-ink-mute">{spot.how}</p>
        </div>
      </div>
    </article>
  )
}
