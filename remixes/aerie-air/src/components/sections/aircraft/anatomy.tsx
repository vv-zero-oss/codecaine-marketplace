import { useCallback, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { CornerLabels } from "@/components/blocks/corner-label"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

import { CraftPlan, PLAN_H, PLAN_W, type PlanPart } from "./craft-plan"

type Part = { id: Exclude<PlanPart, "none">; n: number; name: string; x: number; y: number; body: string; stat: string; statLabel: string }

const PARTS: Part[] = [
  {
    id: "cabin",
    n: 1,
    name: "Cabin",
    x: 300,
    y: 140,
    body: "Four seats behind the pilot, each with a window to itself and room under it for a carry-on. The canopy wraps far enough down that you can see the roof you are leaving.",
    stat: "4 + 1",
    statLabel: "seats",
  },
  {
    id: "computer",
    n: 2,
    name: "Flight computer",
    x: 300,
    y: 222,
    body: "Three independent computers fly the aircraft together and vote on every command. If one disagrees with the other two, it is outvoted and set aside — the pilot sees a note, not a problem.",
    stat: "3×",
    statLabel: "triplex, voting",
  },
  {
    id: "battery",
    n: 3,
    name: "Battery packs",
    x: 300,
    y: 307,
    body: "Six packs, split between the floor and the wing roots, each walled off from the next. Any one can be lost and the others still bring the aircraft home with a reserve to spare.",
    stat: "6",
    statLabel: "isolated packs",
  },
  {
    id: "motors",
    n: 4,
    name: "Six electric motors",
    x: 488,
    y: 214,
    body: "One motor per rotor, each with two windings and two controllers. No gearbox, no fuel, nothing that runs hot — and nothing in the cabin you can smell.",
    stat: "6 × 2",
    statLabel: "motors, windings each",
  },
  {
    id: "parachute",
    n: 5,
    name: "Ballistic parachute",
    x: 300,
    y: 384,
    body: "Packed behind the cabin, a parachute big enough to lower the whole aircraft. It is the last line of a long list, and we expect it to stay folded for the life of the airframe.",
    stat: "1",
    statLabel: "whole-aircraft chute",
  },
  {
    id: "gear",
    n: 6,
    name: "Landing gear",
    x: 354,
    y: 341,
    body: "Three short legs on wheels, so the aircraft can roll off the landing spot to its charging bay instead of hovering there. Less time in the air over a roof is less sound for its neighbours.",
    stat: "3",
    statLabel: "wheeled legs",
  },
]

/**
 * The aircraft from above with its skin turned to glass: six numbered
 * hotspots, each opening a card about the system beneath it. Hover, tap or
 * tab to a number; the open one is a switch in the editor's Actions row.
 */
export function Anatomy({
  title = "What is under the skin.",
  defaultPart = "motors",
}: {
  title?: string
  defaultPart?: Exclude<PlanPart, "none">
}) {
  const [open, setOpen] = useState<Part["id"]>(defaultPart)
  const part = PARTS.find((p) => p.id === open) ?? PARTS[0]

  return (
    <section data-header-tone="light" className="bg-dusk py-(--spacing-section) text-dusk-fg">
      <Container>
        <CornerLabels left="Anatomy" right="Six systems, numbered" className="text-dusk-muted" />
        {PARTS.map((p) => (
          <PartAction key={p.id} part={p} open={open === p.id} setOpen={setOpen} />
        ))}
        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:items-center lg:gap-20">
          <div className="flex flex-col gap-10">
            <Reveal>
              <h2 className="type-head max-w-[12ch] text-display text-balance">{title}</h2>
            </Reveal>
            <ol className="flex flex-col border-t border-white/12" aria-label="Systems">
              {PARTS.map((p) => (
                <li key={p.id}>
                  <button
                    type="button"
                    onMouseEnter={() => setOpen(p.id)}
                    onFocus={() => setOpen(p.id)}
                    onClick={() => setOpen(p.id)}
                    aria-pressed={open === p.id}
                    className={cn(
                      "flex min-h-11 w-full items-center gap-4 border-b border-white/12 py-2.5 text-left text-body outline-none",
                      "transition-[color,padding] duration-(--duration-hover) ease-(--ease-out-strong) focus-visible:ring-[3px] focus-visible:ring-sky/50",
                      open === p.id ? "pl-2 text-dusk-fg" : "text-dusk-muted hover:text-dusk-fg",
                    )}
                  >
                    <span className="w-6 text-micro tabular-nums">0{p.n}</span>
                    {p.name}
                  </button>
                </li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-8">
            <div className="relative mx-auto w-full max-w-[640px]">
              <CraftPlan tilt={0} tone="light" xray emphasis={open} spinSeconds={0.6} />
              {PARTS.map((p) => (
                <button
                  key={p.id}
                  type="button"
                  aria-label={`${p.n}. ${p.name}`}
                  aria-pressed={open === p.id}
                  onMouseEnter={() => setOpen(p.id)}
                  onFocus={() => setOpen(p.id)}
                  onClick={() => setOpen(p.id)}
                  style={{ left: `${(p.x / PLAN_W) * 100}%`, top: `${(p.y / PLAN_H) * 100}%` }}
                  className="group absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full outline-none"
                >
                  <span
                    className={cn(
                      "flex size-7 items-center justify-center rounded-full text-micro font-medium tabular-nums",
                      "transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) group-active:scale-[0.92]",
                      "group-focus-visible:ring-[3px] group-focus-visible:ring-sky/60",
                      open === p.id ? "scale-110 bg-sky text-on-sky" : "bg-dusk text-dusk-fg shadow-[0_0_0_1.5px_var(--color-dusk-fg)] group-hover:bg-dusk-2",
                    )}
                  >
                    {p.n}
                  </span>
                </button>
              ))}
            </div>

            <div className="relative min-h-[13rem] rounded-(--radius-card) bg-dusk-2 p-6 md:p-8" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={part.id}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                  className="grid gap-6 sm:grid-cols-[minmax(0,1fr)_auto]"
                >
                  <div className="flex flex-col gap-2">
                    <p className="text-micro text-dusk-muted tabular-nums">0{part.n} / 06</p>
                    <p className="type-head text-h4">{part.name}</p>
                    <p className="max-w-[52ch] text-body text-dusk-muted">{part.body}</p>
                  </div>
                  <div className="flex flex-col gap-1 sm:items-end sm:text-right">
                    <p className="type-head text-h2 tabular-nums text-sky-200">{part.stat}</p>
                    <p className="text-micro text-dusk-muted">{part.statLabel}</p>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

/** One editor switch per hotspot, so any card can be opened from Actions. */
function PartAction({ part, open, setOpen }: { part: Part; open: boolean; setOpen: (id: Part["id"]) => void }) {
  const run = useCallback((next?: boolean) => setOpen(next === false ? "cabin" : part.id), [part.id, setOpen])
  useCanvasAction(`${part.n}. ${part.name}`, run, { on: open, group: "Anatomy" })
  return null
}
