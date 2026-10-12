import { useCallback, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

import { CraftPlan, PLAN_H, PLAN_W, ROTORS } from "./craft-plan"

/** What one motor can give for the minutes it takes to land, as a share of its normal hover load. */
const MAX_LOAD = 150

function status(down: number) {
  if (down === 0) return { tone: "ok", head: "All six turning. Normal flight.", body: "Each motor carries a sixth of the aircraft." }
  if (down === 1)
    return { tone: "ok", head: "Lands safely. The trip carries on.", body: "The other five take up the load in milliseconds; the passengers feel nothing and land where they planned." }
  if (down === 2)
    return { tone: "ok", head: "Still lands safely, at the nearest pad.", body: "Four motors at full emergency output can hold the aircraft. The pilot diverts to the closest vertiport." }
  if (down < 6)
    return {
      tone: "warn",
      head: "Emergency landing.",
      body: "Past what the remaining motors can hold up in a hover. In cruise the wing glides it to the nearest clear space; the parachute stands by.",
    }
  return { tone: "warn", head: "No power. Glide, then parachute.", body: "With every motor stopped the wing still flies. Lower down, the ballistic parachute brings the whole aircraft to the ground." }
}

/**
 * "Lose a motor, keep flying", as something to try: tap any of the six
 * rotors to stop it and the others show the load they pick up, with an
 * honest line on what happens next. Each motor is an editor switch.
 */
export function MotorRedundancy({
  title = "Lose a motor. Keep flying.",
}: {
  title?: string
}) {
  const [down, setDown] = useState<number[]>([])
  const reduced = useReducedMotion()
  const toggle = useCallback((id: number, next?: boolean) => {
    setDown((d) => {
      const on = next ?? !d.includes(id)
      return on ? [...new Set([...d, id])].sort() : d.filter((x) => x !== id)
    })
  }, [])

  const running = 6 - down.length
  const load = running ? Math.round(600 / running) : 0
  const s = status(down.length)
  const over = load > MAX_LOAD || running === 0

  return (
    <section data-header-tone="dark" className="bg-page py-(--spacing-section)">
      <Container>
        <CornerLabels left="Redundancy" right="Tap a rotor to stop it" className="text-ink-3" />
        {ROTORS.map((r) => (
          <MotorAction key={r.id} id={r.id} name={r.name} failed={down.includes(r.id)} toggle={toggle} />
        ))}

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.2fr)] lg:gap-20">
          <div className="flex flex-col gap-10">
            <SectionHeading
              title={title}
              lead="There is no single part whose failure brings Aerie down. Six rotors share the work, so losing one is a reason to land, not a reason to fall."
            />

            <div className="flex flex-col gap-4">
              <div
                className={cn(
                  "flex flex-col gap-1 rounded-(--radius-card) p-5 transition-[background-color] duration-(--duration-swap)",
                  s.tone === "ok" ? "bg-signal-green-soft" : "bg-peach",
                )}
                aria-live="polite"
              >
                <p className={cn("type-head text-h4", s.tone === "ok" ? "text-signal-green" : "text-ember-ink")}>{s.head}</p>
                <p className="text-body text-ink-2">{s.body}</p>
              </div>
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-micro text-ink-3">
                  <span>Load on each running motor</span>
                  <span className="tabular-nums">{running ? `${load}% of normal` : "—"}</span>
                </div>
                <div className="relative h-3 rounded-full bg-panel">
                  <motion.div
                    className={cn("h-full origin-left rounded-full", over ? "bg-ember" : "bg-sky")}
                    initial={false}
                    animate={{ scaleX: running ? Math.min(1, load / 200) : 0 }}
                    transition={reduced ? { duration: 0 } : { duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  />
                  <span className="absolute inset-y-[-4px] w-px bg-ink" style={{ left: `${(MAX_LOAD / 200) * 100}%` }} aria-hidden />
                </div>
                <p className="text-micro text-ink-3">The line marks the most each motor is built to give for the minutes it takes to land. Figures are simplified.</p>
              </div>
              <Button variant="outline" size="sm" className="self-start" onClick={() => setDown([])} disabled={!down.length}>
                <RotateCcw /> Restart all motors
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative mx-auto w-full max-w-[560px]">
              <CraftPlan tilt={0} tone="dark" failed={down.join(",")} spinSeconds={0.5} />
              {ROTORS.map((r) => {
                const failed = down.includes(r.id)
                return (
                  <button
                    key={r.id}
                    type="button"
                    aria-pressed={failed}
                    aria-label={`Motor ${r.id}, ${r.name}: ${failed ? "stopped, tap to restart" : "running, tap to stop"}`}
                    onClick={() => toggle(r.id)}
                    style={{ left: `${(r.x / PLAN_W) * 100}%`, top: `${(r.y / PLAN_H) * 100}%`, width: `${(92 / PLAN_W) * 100}%` }}
                    className="absolute aspect-square min-w-11 -translate-x-1/2 -translate-y-1/2 rounded-full outline-none transition-[box-shadow] duration-(--duration-hover) hover:shadow-[inset_0_0_0_2px_var(--color-sky)] focus-visible:shadow-[inset_0_0_0_3px_var(--color-sky)] active:scale-[0.96]"
                  />
                )
              })}
            </div>

            <ul className="grid grid-cols-2 gap-2 sm:grid-cols-3">
              {ROTORS.map((r) => {
                const failed = down.includes(r.id)
                return (
                  <li key={r.id}>
                    <button
                      type="button"
                      aria-pressed={failed}
                      onClick={() => toggle(r.id)}
                      className={cn(
                        "flex min-h-11 w-full flex-col items-start gap-1 rounded-(--radius-card) p-3.5 text-left outline-none",
                        "transition-[background-color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97] focus-visible:ring-[3px] focus-visible:ring-sky/40",
                        failed ? "bg-peach shadow-[inset_0_0_0_1px_var(--color-ember)]" : "bg-raised shadow-(--shadow-card) hover:bg-panel",
                      )}
                    >
                      <span className="text-micro text-ink-3">
                        Motor {r.id} · {r.name}
                      </span>
                      <span className={cn("type-head text-h4 tabular-nums", failed ? "text-ember-ink" : "text-ink")}>{failed ? "Stopped" : `${load}%`}</span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}

function MotorAction({ id, name, failed, toggle }: { id: number; name: string; failed: boolean; toggle: (id: number, next?: boolean) => void }) {
  const run = useCallback((next?: boolean) => toggle(id, next), [id, toggle])
  useCanvasAction(`Motor ${id} stopped (${name.toLowerCase()})`, run, { on: failed, group: "Redundancy" })
  return null
}
