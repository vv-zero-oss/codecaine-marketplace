import { useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { motion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { useStore } from "@/lib/store"
import { cn } from "@/lib/utils"

type Method = "pour-over" | "aeropress" | "press" | "espresso"

/** Each method's recipe: ratio, grind, time, and pours as (second, share
 *  of the total water) pairs. */
const METHODS: Record<Method, { label: string; ratio: number; grind: string; total: number; dose: [number, number, number]; steps: { at: number; share: number; say: string }[] }> = {
  "pour-over": {
    label: "Pour-over",
    ratio: 16,
    grind: "Medium-fine, like table salt",
    total: 180,
    dose: [12, 40, 20],
    steps: [
      { at: 0, share: 0.12, say: "Bloom — just enough to wet every ground" },
      { at: 45, share: 0.6, say: "Pour in slow spirals to 60%" },
      { at: 75, share: 1, say: "Top up to the full weight" },
      { at: 105, share: 1, say: "Swirl once, let it draw down" },
    ],
  },
  aeropress: {
    label: "AeroPress",
    ratio: 14,
    grind: "Medium, like beach sand",
    total: 120,
    dose: [11, 20, 15],
    steps: [
      { at: 0, share: 1, say: "Pour all the water, stir three times" },
      { at: 60, share: 1, say: "Cap it, flip it onto the cup" },
      { at: 90, share: 1, say: "Press slowly — thirty seconds" },
    ],
  },
  press: {
    label: "French press",
    ratio: 15,
    grind: "Coarse, like sea salt",
    total: 240,
    dose: [15, 60, 30],
    steps: [
      { at: 0, share: 1, say: "All the water, all at once" },
      { at: 60, share: 1, say: "Break the crust, skim the foam" },
      { at: 210, share: 1, say: "Plunge gently and pour it all out" },
    ],
  },
  espresso: {
    label: "Espresso",
    ratio: 2,
    grind: "Fine, like powdered sugar",
    total: 28,
    dose: [15, 22, 18],
    steps: [
      { at: 0, share: 0.08, say: "Pre-infuse — first drops by 6s" },
      { at: 6, share: 1, say: "Full pressure, watch it turn honey-blonde" },
      { at: 26, share: 1, say: "Stop at the yield, two seconds either way" },
    ],
  },
}

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, "0")}`

/** The vessel, filling as the timer runs — a carafe for filter methods, a
 *  cup for espresso. `fill` is 0–1. */
function Vessel({ fill, method }: { fill: number; method: Method }) {
  const top = 70 + (1 - fill) * 104
  const cup = method === "espresso"
  return (
    <svg viewBox="0 0 200 200" className="h-auto w-full max-w-[220px]" aria-hidden>
      <defs>
        <clipPath id="vessel-clip">{cup ? <path d="M58 92 h84 l-8 66 a16 16 0 0 1 -16 14 h-36 a16 16 0 0 1 -16 -14 z" /> : <path d="M70 60 h60 l18 104 a10 10 0 0 1 -10 12 h-76 a10 10 0 0 1 -10 -12 z" />}</clipPath>
      </defs>
      <g clipPath="url(#vessel-clip)">
        <rect x="0" y="0" width="200" height="200" fill="var(--color-raised)" />
        <motion.rect x="0" width="200" height="200" fill="var(--color-latebell)" initial={false} animate={{ y: top }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} />
        <motion.rect x="0" width="200" height="6" fill="var(--color-detour)" opacity="0.55" initial={false} animate={{ y: top }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} />
      </g>
      {cup ? (
        <g fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M58 92 h84 l-8 66 a16 16 0 0 1 -16 14 h-36 a16 16 0 0 1 -16 -14 z" />
          <path d="M140 104 h8 a14 14 0 0 1 0 28 h-12" />
          <path d="M40 182 h120" />
        </g>
      ) : (
        <g fill="none" stroke="var(--color-ink)" strokeWidth="2.2" strokeLinejoin="round">
          <path d="M70 60 h60 l18 104 a10 10 0 0 1 -10 12 h-76 a10 10 0 0 1 -10 -12 z" />
          <path d="M62 22 h76 l-22 30 h-32 z" />
          <path d="M84 52 h32 v8 h-32 z" />
          <path d="M130 70 c 22 0 26 36 8 46" />
        </g>
      )}
    </svg>
  )
}

/**
 * A brew guide that brews: pick a method, set the dose, and the water,
 * ratio and grind follow. Press start and a real timer walks the recipe —
 * the current step lights up, the next one waits, and the vessel fills to
 * the weight you should be at.
 */
export function BrewGuide({ title = "Dial it in", startMethod = "pour-over" }: { title?: string; startMethod?: Method }) {
  const { unit } = useStore()
  const { designing } = useCanvasDesignMode()
  const [method, setMethod] = useState<Method>(startMethod)
  const recipe = METHODS[method]
  const [dose, setDose] = useState(recipe.dose[2])
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const tick = useRef<number | null>(null)

  useEffect(() => setMethod(startMethod), [startMethod])
  useEffect(() => {
    setDose(METHODS[method].dose[2])
    setElapsed(0)
    setRunning(false)
  }, [method])

  useEffect(() => {
    if (!running || designing) return
    const started = performance.now() - elapsed * 1000
    tick.current = window.setInterval(() => {
      const t = (performance.now() - started) / 1000
      if (t >= recipe.total) {
        setElapsed(recipe.total)
        setRunning(false)
      } else setElapsed(t)
    }, 100)
    return () => {
      if (tick.current) window.clearInterval(tick.current)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running, recipe.total, designing])

  useCanvasAction("Brew timer running", (next) => setRunning(next ?? !running), { on: running, group: "Brew guide" })
  useCanvasAction("Brew finished", (next) => {
    setRunning(false)
    setElapsed((next ?? elapsed < recipe.total) ? recipe.total : 0)
  }, { on: elapsed >= recipe.total, group: "Brew guide" })

  const water = Math.round(dose * recipe.ratio)
  const current = recipe.steps.reduce((acc, s, i) => (elapsed >= s.at ? i : acc), 0)
  const step = recipe.steps[current]
  const next = recipe.steps[current + 1]
  // Where the scale should read now: ramp toward this step's share.
  const prevShare = current ? recipe.steps[current - 1].share : 0
  const rampEnd = next ? Math.min(next.at, step.at + 20) : step.at + 20
  const k = Math.min(1, (elapsed - step.at) / Math.max(1, rampEnd - step.at))
  const target = elapsed === 0 && !running ? 0 : prevShare + (step.share - prevShare) * k
  const done = elapsed >= recipe.total
  const g = (n: number) => (unit === "oz" ? `${(n / 28.35).toFixed(n > 200 ? 1 : 2)} oz` : `${n} g`)

  return (
    <section id="brew" className="bg-paper-2 px-[var(--spacing-gutter)] py-[var(--spacing-section)]">
      <div className="grid gap-12 lg:grid-cols-[1.618fr_1fr] lg:items-start">
        <Reveal>
          <p className="type-eyebrow text-ink-3">Brew guide</p>
          <h2 className="type-display mt-3 text-d4">{title}</h2>
          <p className="mt-4 max-w-[46ch] text-ink-2">The recipes our baristas actually use. Set your dose and everything else follows; press start and we'll talk you through it.</p>

          <ToggleGroup type="single" value={method} onValueChange={(v) => v && setMethod(v as Method)} className="mt-8 flex w-full flex-wrap justify-start gap-1.5" spacing={1}>
            {(Object.keys(METHODS) as Method[]).map((m) => (
              <ToggleGroupItem
                key={m}
                value={m}
                className="type-display h-10 rounded-[var(--radius-button)] px-4 pt-1 text-[19px] shadow-[inset_0_0_0_1.5px_var(--color-ink)] data-[state=on]:bg-ink data-[state=on]:text-paper"
              >
                {METHODS[m].label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>

          <div className="mt-8 grid gap-px overflow-hidden rounded-[var(--radius-card)] bg-line shadow-hairline sm:grid-cols-3">
            {[
              { label: "Coffee", value: g(dose) },
              { label: method === "espresso" ? "Yield" : "Water", value: g(water) },
              { label: "Ratio", value: `1 : ${recipe.ratio}` },
            ].map((s) => (
              <div key={s.label} className="bg-raised p-4">
                <p className="type-eyebrow text-ink-3">{s.label}</p>
                <p className="type-display mt-1.5 text-d2 tabular-nums">{s.value}</p>
              </div>
            ))}
          </div>
          <div className="mt-6">
            <div className="flex justify-between text-caption text-ink-3">
              <label htmlFor="dose">Dose</label>
              <span className="tabular-nums">
                {recipe.dose[0]}–{recipe.dose[1]} g
              </span>
            </div>
            <Slider id="dose" className="mt-3" min={recipe.dose[0]} max={recipe.dose[1]} step={1} value={[dose]} onValueChange={([v]) => setDose(v)} aria-label="Coffee dose in grams" />
            <p className="mt-4 text-caption text-ink-2">
              Grind: <span className="text-ink">{recipe.grind}</span>
            </p>
          </div>
        </Reveal>

        <Reveal delay={0.1} className="rounded-[var(--radius-panel)] bg-raised p-6 shadow-card">
          <div className="flex items-center justify-between">
            <p className="type-display text-d3 tabular-nums">{mmss(elapsed)}</p>
            <p className="text-caption text-ink-3 tabular-nums">of {mmss(recipe.total)}</p>
          </div>
          <div className="mt-3 h-1 overflow-hidden rounded-full bg-paper-2">
            <div className="h-full rounded-full bg-ink transition-[width] duration-100 ease-linear" style={{ width: `${(elapsed / recipe.total) * 100}%` }} />
          </div>
          <div className="mt-6 grid grid-cols-[1fr_1.2fr] items-center gap-4">
            <Vessel fill={target} method={method} />
            <div>
              <p className="type-eyebrow text-ink-3">Scale should read</p>
              <p className="type-display text-d3 tabular-nums">{g(Math.round(water * target))}</p>
            </div>
          </div>
          <ol className="mt-6 space-y-1">
            {recipe.steps.map((s, i) => (
              <li
                key={s.say}
                className={cn(
                  "grid grid-cols-[3.2em_1fr] gap-3 rounded-[var(--radius-tag)] px-2 py-1.5 text-[14px] transition-colors duration-300",
                  i === current && (running || elapsed > 0) && !done ? "bg-recess/30 text-ink" : i < current || done ? "text-ink-3 line-through decoration-ink-4" : "text-ink-2",
                )}
              >
                <span className="tabular-nums">{mmss(s.at)}</span>
                <span>{s.say}</span>
              </li>
            ))}
          </ol>
          <div className="mt-6 flex gap-2">
            <Button className="flex-1" variant={done ? "outline" : "tomato"} onClick={() => (done ? (setElapsed(0), setRunning(true)) : setRunning(!running))}>
              {running ? <Pause /> : <Play />} {done ? "Brew again" : running ? "Pause" : elapsed > 0 ? "Resume" : "Start"}
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="h-10"
              aria-label="Reset the timer"
              onClick={() => {
                setRunning(false)
                setElapsed(0)
              }}
            >
              <RotateCcw />
            </Button>
          </div>
          {done && <p className="mt-3 text-[13px] text-ok">Done. Give it a minute to cool — it tastes sweeter at 60°C.</p>}
        </Reveal>
      </div>
    </section>
  )
}
