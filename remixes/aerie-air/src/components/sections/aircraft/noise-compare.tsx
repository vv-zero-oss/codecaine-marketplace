import { useCallback, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { cn } from "@/lib/utils"

const MIN_M = 100
const MAX_M = 1000
const FLOOR_DB = 20
const CEIL_DB = 100

/** Slider position (0–100) to metres, on a log scale so 100–300 m gets room. */
const toMetres = (s: number) => Math.round(MIN_M * (MAX_M / MIN_M) ** (s / 100))
const toSlider = (m: number) => (Math.log(m / MIN_M) / Math.log(MAX_M / MIN_M)) * 100

/** A flyover heard from `m` metres, given its level at 500 m: −6 dB per doubling. */
const flyover = (at500: number, m: number) => at500 - 20 * Math.log10(m / 500)

function whatYouHear(db: number) {
  if (db >= 55) return "About a conversation across the table. You would notice it pass, then carry on."
  if (db >= 47) return "Under the hum of a busy office. Most people on the street will not look up."
  if (db >= 41) return "Like a quiet library. It blends into the sound the city already makes."
  return "Below the city's own background. Lost in the wind and the distant traffic."
}

/**
 * The noise claim made into something to play with: drag the distance and
 * the aircraft's level is worked out again against a helicopter flying the
 * same pass, with street traffic and a conversation as fixed yardsticks.
 * Bars sit on the decibel scale, which is itself logarithmic.
 */
export function NoiseCompare({
  title = "45 dB is a number. Here is what it sounds like.",
  aerieAt500 = 45,
  helicopterAt500 = 79,
  defaultDistance = 500,
}: {
  title?: string
  aerieAt500?: number
  helicopterAt500?: number
  defaultDistance?: number
}) {
  const [metres, setMetres] = useState(defaultDistance)
  const reduced = useReducedMotion()

  const close = useCallback((on?: boolean) => setMetres((m) => ((on ?? m !== 100) ? 100 : defaultDistance)), [defaultDistance])
  const far = useCallback((on?: boolean) => setMetres((m) => ((on ?? m !== 1000) ? 1000 : defaultDistance)), [defaultDistance])
  useCanvasAction("Overhead at 100 m", close, { on: metres === 100, group: "Noise" })
  useCanvasAction("A kilometre away", far, { on: metres === 1000, group: "Noise" })

  const aerie = flyover(aerieAt500, metres)
  const heli = flyover(helicopterAt500, metres)
  const times = 2 ** ((heli - aerie) / 10)

  const rows = [
    { name: "Aerie A-1", note: `flying over, ${metres} m away`, db: aerie, tone: "bg-sky", strong: true },
    { name: "A helicopter", note: `same pass, ${metres} m away`, db: heli, tone: "bg-ink", strong: false },
    { name: "City traffic", note: "standing at the kerb", db: 70, tone: "bg-ink-3", strong: false },
    { name: "Conversation", note: "across a table, 1 m", db: 60, tone: "bg-ink-4", strong: false },
  ]

  return (
    <section data-header-tone="dark" className="bg-page py-(--spacing-section)">
      <Container>
        <CornerLabels left="Noise" right="Modelled for a level flyover" className="text-ink-3" />
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] lg:gap-20">
          <SectionHeading title={title} lead="Most of a helicopter's noise is its rotor tips breaking the air. Aerie's rotors are bigger, slower and many, so each one has less to shout about." />

          <div className="flex flex-col gap-10">
            <div className="flex flex-col gap-4">
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="noise-distance" className="text-micro text-ink-3">
                  How far away you are
                </label>
                <output htmlFor="noise-distance" className="type-head text-h3 tabular-nums">
                  {metres >= 1000 ? "1 km" : `${metres} m`}
                </output>
              </div>
              <Slider
                id="noise-distance"
                aria-label="Distance from the aircraft"
                min={0}
                max={100}
                step={0.5}
                value={[toSlider(metres)]}
                onValueChange={([s]) => setMetres(toMetres(s))}
                className="py-3"
              />
              <div className="flex justify-between text-micro text-ink-3">
                <span>100 m</span>
                <span>300 m</span>
                <span>1 km</span>
              </div>
            </div>

            <ul className="flex flex-col gap-5">
              {rows.map((r) => {
                const w = Math.min(1, Math.max(0.02, (r.db - FLOOR_DB) / (CEIL_DB - FLOOR_DB)))
                return (
                  <li key={r.name} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-4 gap-y-2">
                    <p className="text-body">
                      <span className={cn(r.strong && "font-medium")}>{r.name}</span>
                      <span className="ml-2 text-micro text-ink-3">{r.note}</span>
                    </p>
                    <p className="text-right text-body font-medium tabular-nums">{Math.round(r.db)} dB</p>
                    <div className="col-span-2 h-3 overflow-hidden rounded-full bg-panel">
                      <motion.div
                        className={cn("h-full origin-left rounded-full", r.tone)}
                        initial={false}
                        animate={{ scaleX: w }}
                        transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                      />
                    </div>
                  </li>
                )
              })}
            </ul>

            <div className="flex flex-col gap-2 border-t border-line pt-6">
              <p className="type-head text-h4" aria-live="polite">
                {whatYouHear(aerie)}
              </p>
              <p className="text-body text-ink-3">
                To the ear, about <span className="font-medium text-ink tabular-nums">{times.toFixed(0)}×</span> quieter than the helicopter at the
                same distance — every 10 dB down sounds roughly half as loud.
              </p>
              <p className="text-micro text-ink-3">
                Levels fall 6 dB each time the distance doubles; real air takes a little more away. Scale runs 20–100 dB.
              </p>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
