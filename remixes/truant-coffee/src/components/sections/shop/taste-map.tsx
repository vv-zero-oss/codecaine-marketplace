import { useMemo, useState } from "react"
import { motion } from "motion/react"

import { Reveal } from "@/components/motion/reveal"
import { CoffeeBag } from "@/components/mock/coffee-bag"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { COFFEES, seriesById, type SeriesId } from "@/content/coffees"
import { money } from "@/lib/photos"
import { useStore, useWeight } from "@/lib/store"
import { cn } from "@/lib/utils"

const DOT: Record<SeriesId, string> = {
  recess: "bg-recess",
  detour: "bg-detour",
  field: "bg-field",
  latebell: "bg-latebell",
}

/**
 * The shelf as a map: every coffee placed by sweetness (across) and body
 * (up). Set the two sliders to what you like and a marker moves there; the
 * nearest coffee lights up as your match, ready to add. Point at any dot to
 * read it.
 */
export function TasteMap({ title = "Find yours on the map" }: { title?: string }) {
  const { add } = useStore()
  const weight = useWeight()
  const [sweet, setSweet] = useState(7)
  const [body, setBody] = useState(5)
  const [hover, setHover] = useState<string | null>(null)
  const [added, setAdded] = useState(false)

  const match = useMemo(() => [...COFFEES].sort((a, b) => Math.hypot(a.sweetness - sweet, a.body - body) - Math.hypot(b.sweetness - sweet, b.body - body))[0], [sweet, body])
  const focus = COFFEES.find((c) => c.id === hover) ?? match
  // The shelf spans roughly 2–10 on both scales; the map spans that.
  const pos = (s: number, b: number) => ({ left: `${8 + ((s - 2) / 8) * 84}%`, top: `${92 - ((b - 2) / 8) * 84}%` })

  return (
    <section id="taste-map" className="bg-paper-2 px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <Reveal className="max-w-[60ch]">
        <p className="type-eyebrow text-ink-3">Taste map</p>
        <h2 className="type-display mt-3 text-d4">{title}</h2>
        <p className="mt-4 text-ink-2">Not sure what you like? Tell us how sweet and how heavy, and we'll point at a bag.</p>
      </Reveal>
      <div className="mt-12 grid gap-8 lg:grid-cols-[1.618fr_1fr]">
        <div className="relative aspect-[4/3] rounded-[var(--radius-panel)] bg-raised shadow-card sm:aspect-[16/10]">
          {/* Axes */}
          <div className="absolute inset-y-[8%] left-1/2 w-px bg-line" />
          <div className="absolute inset-x-[8%] top-1/2 h-px bg-line" />
          <span className="type-eyebrow absolute bottom-2 left-1/2 -translate-x-1/2 text-ink-3">Sweeter →</span>
          <span className="type-eyebrow absolute top-1/2 left-1 origin-left -translate-y-1/2 -rotate-90 translate-x-3 text-ink-3">Heavier →</span>
          {/* Your marker */}
          <motion.div
            className="absolute size-20 -translate-x-1/2 -translate-y-1/2 rounded-full border-[1.5px] border-dashed border-ink/50"
            animate={pos(sweet, body)}
            transition={{ type: "spring", stiffness: 260, damping: 26 }}
            aria-hidden
          />
          {COFFEES.map((c) => {
            const isMatch = c.id === match.id
            return (
              <button
                key={c.id}
                type="button"
                onPointerEnter={() => setHover(c.id)}
                onPointerLeave={() => setHover(null)}
                onFocus={() => setHover(c.id)}
                onBlur={() => setHover(null)}
                onClick={() => {
                  setSweet(c.sweetness)
                  setBody(c.body)
                }}
                style={pos(c.sweetness, c.body)}
                className="group absolute -translate-x-1/2 -translate-y-1/2 p-2"
                aria-label={`${c.name}: sweetness ${c.sweetness}, body ${c.body}`}
              >
                <span className={cn("block size-3.5 rounded-full ring-2 ring-raised transition-transform duration-200 group-hover:scale-150", DOT[c.series], isMatch && "scale-150 ring-4 ring-ink/15")} />
                <span className={cn("type-display absolute top-full left-1/2 -translate-x-1/2 whitespace-nowrap text-[14px] leading-none text-ink-2 transition-opacity", isMatch || hover === c.id ? "opacity-100" : "opacity-0")}>{c.name}</span>
              </button>
            )
          })}
        </div>

        <div className="flex flex-col">
          <div className="space-y-6">
            {[
              { label: "Sweetness", value: sweet, set: setSweet, lo: "Bright", hi: "Syrupy" },
              { label: "Body", value: body, set: setBody, lo: "Tea-like", hi: "Heavy" },
            ].map((s) => (
              <div key={s.label}>
                <div className="flex justify-between text-caption">
                  <span className="text-ink">{s.label}</span>
                  <span className="text-ink-3">
                    {s.lo} — {s.hi}
                  </span>
                </div>
                <Slider className="mt-3" min={2} max={10} step={0.5} value={[s.value]} onValueChange={([v]) => s.set(v)} aria-label={s.label} />
              </div>
            ))}
          </div>
          <motion.div key={focus.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }} className="mt-8 flex gap-5 rounded-[var(--radius-card)] bg-raised p-5 shadow-card">
            <div className="w-20 shrink-0">
              <CoffeeBag coffeeId={focus.id} weight={weight("12oz")} />
            </div>
            <div className="flex-1">
              <p className="type-eyebrow text-tomato">{focus.id === match.id ? "Your match" : seriesById[focus.series].short}</p>
              <p className="type-display mt-1 text-d2">{focus.name}</p>
              <p className="mt-1 text-caption text-ink-2">{focus.notes.join(" · ")}</p>
              <div className="mt-3 flex items-center justify-between">
                <span className="text-[14px] tabular-nums">{money(focus.price)}</span>
                <Button
                  size="sm"
                  onClick={() => {
                    add(focus.id)
                    setAdded(true)
                    window.setTimeout(() => setAdded(false), 1300)
                  }}
                >
                  {added ? "Added ✓" : "Add to bag"}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
