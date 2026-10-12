import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { mmss, RoastCurve, simulate } from "@/components/mock/roast-curve"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { coffeeById } from "@/content/coffees"
import { useWeight } from "@/lib/store"

const BATCHES = [
  { id: "half-day-4", batch: 2214, duration: 552, drop: 204, charge: 200 },
  { id: "the-long-way", batch: 2217, duration: 640, drop: 213, charge: 206 },
  { id: "last-bell", batch: 2221, duration: 735, drop: 226, charge: 212 },
]

/**
 * How we roast, shown rather than told: this week's three batches off the
 * logger. Pick one and the curve redraws; point at it to read any second of
 * the batch. The numbers beside it are worked out from the same curve.
 */
export function RoastLog({ title = "This week on the drum" }: { title?: string }) {
  const [id, setId] = useState(BATCHES[1].id)
  const weight = useWeight()
  const b = BATCHES.find((x) => x.id === id)!
  const coffee = coffeeById[b.id]
  const pts = simulate(b)
  const fc = pts.find((p) => p.t > 72 && p.bt >= 196)?.t ?? b.duration * 0.82
  const dev = ((b.duration - fc) / b.duration) * 100

  useCanvasAction("Roast log: next batch", () => setId(BATCHES[(BATCHES.findIndex((x) => x.id === id) + 1) % BATCHES.length].id), { group: "Roast log" })

  return (
    <section id="roast-log" className="bg-paper px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.618fr] lg:gap-16">
        <Reveal>
          <p className="type-eyebrow text-ink-3">Roast log · batch {b.batch}</p>
          <h2 className="type-display mt-3 text-d4">{title}</h2>
          <p className="mt-5 max-w-[42ch] text-ink-2">
            Every batch is logged second by second, and we publish the curve with the bag. Tuesdays and Thursdays, fifteen kilos at a time, on a drum older than most of the people running it.
          </p>
          <div className="mt-8 flex items-end gap-5">
            <div className="w-24 shrink-0 rounded-[var(--radius-tag)] bg-shelf p-2.5">
              <CoffeeBag coffeeId={coffee.id} weight={weight("12oz")} />
            </div>
            <div>
              <p className="type-display text-d2">{coffee.name}</p>
              <p className="text-caption text-ink-3">
                {coffee.country} · {coffee.process} · {coffee.notes[0]}
              </p>
            </div>
          </div>
          <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] bg-line shadow-hairline sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
            {[
              { label: "Total time", node: <span className="tabular-nums">{mmss(b.duration)}</span> },
              { label: "First crack", node: <span className="tabular-nums">{mmss(fc)}</span> },
              { label: "Drop", node: <CountUp value={b.drop} suffix="°" /> },
              { label: "Development", node: <CountUp value={dev} decimals={1} suffix="%" /> },
            ].map((s) => (
              <div key={s.label} className="bg-raised p-4">
                <dt className="type-eyebrow text-ink-3">{s.label}</dt>
                <dd className="type-display mt-2 text-d2">{s.node}</dd>
              </div>
            ))}
          </dl>
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col">
          <Tabs value={id} onValueChange={setId}>
            <TabsList className="h-auto w-full justify-start gap-1 rounded-[var(--radius-button)] bg-paper-2 p-1 sm:w-auto">
              {BATCHES.map((x) => (
                <TabsTrigger key={x.id} value={x.id} className="type-display h-9 flex-1 rounded-[var(--radius-tag)] px-3 pt-1 text-[17px] text-ink-2 data-[state=active]:bg-raised data-[state=active]:text-ink data-[state=active]:shadow-card sm:flex-none">
                  {coffeeById[x.id].name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <div className="mt-4 rounded-[var(--radius-panel)] bg-raised p-4 shadow-card sm:p-6">
            <div className="mb-3 flex flex-wrap items-center gap-x-5 gap-y-1 text-caption text-ink-3">
              <span className="flex items-center gap-2">
                <span className="h-0.5 w-5 bg-ink" /> Bean temperature °C
              </span>
              <span className="flex items-center gap-2">
                <span className="h-0 w-5 border-t-[1.6px] border-dashed border-tomato" /> Rate of rise °C/min
              </span>
              <span className="ml-auto hidden sm:inline">Point at the curve to read it</span>
            </div>
            <RoastCurve duration={b.duration} drop={b.drop} charge={b.charge} />
          </div>
        </Reveal>
      </div>
    </section>
  )
}
