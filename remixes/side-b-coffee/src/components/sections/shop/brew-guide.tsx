import { useEffect, useRef, useState } from "react"
import { Pause, Play, RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Slider } from "@/components/ui/slider"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"

type MethodId = "pour-over" | "espresso" | "french-press"

const METHODS: Record<
  MethodId,
  { name: string; ratio: number; grams: number; min: number; max: number; grind: string; target: number; steps: { at: number; say: string }[] }
> = {
  "pour-over": {
    name: "Pour-over",
    ratio: 16,
    grams: 15,
    min: 10,
    max: 40,
    grind: "Medium-fine, like sea salt",
    target: 210,
    steps: [
      { at: 0, say: "Bloom: pour twice the coffee's weight in water and wait." },
      { at: 40, say: "Pour slowly in circles to the halfway mark." },
      { at: 90, say: "Top up to your full water weight." },
      { at: 150, say: "Let it draw down. Flip the record." },
    ],
  },
  espresso: {
    name: "Espresso",
    ratio: 2,
    grams: 18,
    min: 14,
    max: 22,
    grind: "Fine, like powdered sugar",
    target: 28,
    steps: [
      { at: 0, say: "Lock in and start the shot." },
      { at: 8, say: "First drops — dark, slow, like honey." },
      { at: 20, say: "Blonding: get ready to stop." },
    ],
  },
  "french-press": {
    name: "French press",
    ratio: 15,
    grams: 30,
    min: 15,
    max: 60,
    grind: "Coarse, like breadcrumbs",
    target: 240,
    steps: [
      { at: 0, say: "Pour all the water in, put the lid on." },
      { at: 60, say: "Break the crust with a spoon, skim the foam." },
      { at: 180, say: "Nearly there — warm your cup." },
      { at: 225, say: "Press slowly, pour it all out." },
    ],
  },
}

function clock(s: number) {
  return `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`
}

/**
 * The brew guide, as a tool rather than a recipe card: pick a method, slide
 * the coffee dose and the water follows the ratio; start the timer and it
 * counts up against the target, telling you what to do at each step. The
 * ring fills linearly (it is a clock); the step text crossfades as it
 * changes.
 */
export function BrewGuide() {
  const [method, setMethod] = useState<MethodId>("pour-over")
  const m = METHODS[method]
  const [grams, setGrams] = useState(m.grams)
  const [elapsed, setElapsed] = useState(0)
  const [running, setRunning] = useState(false)
  const started = useRef(0)

  useCanvasAction("Brew timer running", (next) => setRunning(next ?? !running), { on: running, group: "Brew guide" })

  useEffect(() => {
    setGrams(METHODS[method].grams)
    setElapsed(0)
    setRunning(false)
  }, [method])

  useEffect(() => {
    if (!running) return
    started.current = performance.now() - elapsed * 1000
    const id = window.setInterval(() => setElapsed((performance.now() - started.current) / 1000), 200)
    return () => window.clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running])

  const water = grams * m.ratio
  const step = [...m.steps].reverse().find((s) => elapsed >= s.at) ?? m.steps[0]
  const progress = Math.min(1, elapsed / m.target)
  const over = elapsed >= m.target
  const R = 70
  const C = 2 * Math.PI * R

  return (
    <section className="py-(--spacing-section)">
      <Container className="space-y-12">
        <SectionHeading
          kicker="Brew guide"
          before="Brew it like"
          highlight="the bar does."
          tone="ember"
          doodle="kettle"
          actions={
            <ToggleGroup type="single" variant="outline" value={method} onValueChange={(v) => v && setMethod(v as MethodId)} aria-label="Brew method" className="flex-wrap">
              {(Object.keys(METHODS) as MethodId[]).map((id) => (
                <ToggleGroupItem key={id} value={id} className="h-10 px-4">
                  {METHODS[id].name}
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          }
        />

        <div className="grid gap-px overflow-hidden rounded-(--radius-panel) bg-line shadow-(--shadow-card) lg:grid-cols-[1fr_1fr_1.1fr]">
          {/* the recipe */}
          <div className="space-y-6 bg-raised p-6 sm:p-8">
            <p className="type-label text-[11px] text-ink-3">The recipe</p>
            <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
              {[
                ["Ratio", `1 : ${m.ratio}`],
                ["Target time", clock(m.target)],
                ["Water", m.ratio === 2 ? "Out of the machine" : "94 °C, just off the boil"],
                ["Grind", m.grind],
              ].map(([k, v]) => (
                <div key={k}>
                  <dt className="text-[12.5px] text-ink-3">{k}</dt>
                  <dd className="type-display mt-1 text-[22px] leading-tight tracking-[-0.015em]">{v}</dd>
                </div>
              ))}
            </dl>
          </div>

          {/* the calculator */}
          <div className="space-y-6 bg-raised p-6 sm:p-8">
            <p className="type-label text-[11px] text-ink-3">The calculator</p>
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="type-display text-h1 leading-none tabular">{grams}g</p>
                <p className="mt-1 text-[13px] text-ink-3">coffee</p>
              </div>
              <span className="pb-4 font-mono text-[14px] text-ink-3">→</span>
              <div className="text-right">
                <p className="type-display text-h1 leading-none text-ember tabular">{m.ratio === 2 ? `${water}g` : `${water}ml`}</p>
                <p className="mt-1 text-[13px] text-ink-3">{m.ratio === 2 ? "in the cup" : "water"}</p>
              </div>
            </div>
            <Slider value={[grams]} min={m.min} max={m.max} step={1} onValueChange={([v]) => setGrams(v)} aria-label="Coffee dose in grams" />
            <div className="flex justify-between font-mono text-[11.5px] text-ink-3 tabular">
              <span>{m.min}g</span>
              <span>{m.max}g</span>
            </div>
          </div>

          {/* the timer */}
          <div className="flex flex-col items-center gap-5 bg-raised p-6 sm:flex-row sm:p-8 lg:flex-col xl:flex-row">
            <div className="relative grid size-40 shrink-0 place-items-center">
              <svg viewBox="0 0 160 160" className="absolute inset-0 -rotate-90" aria-hidden>
                <circle cx="80" cy="80" r={R} fill="none" stroke="var(--color-panel-deep)" strokeWidth="6" />
                <circle
                  cx="80"
                  cy="80"
                  r={R}
                  fill="none"
                  stroke={over ? "var(--color-moss)" : "var(--color-rust)"}
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray={C}
                  strokeDashoffset={C * (1 - progress)}
                  className="transition-[stroke-dashoffset] duration-200 ease-linear"
                />
              </svg>
              <div className="text-center">
                <p className="font-mono text-[30px] leading-none tabular" role="timer" aria-live="off">
                  {clock(elapsed)}
                </p>
                <p className="mt-1 text-[12px] text-ink-3">of {clock(m.target)}</p>
              </div>
            </div>
            <div className="flex w-full flex-col gap-4">
              <p key={step.say} className={cn("min-h-[3lh] text-[15px] text-ink-2 motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-300", over && "text-moss")}>
                {over ? "Done. Pour it, sit down, put a record on." : step.say}
              </p>
              <div className="flex gap-2">
                <Button variant={running ? "ink" : "rust"} className="flex-1" onClick={() => setRunning((r) => !r)}>
                  {running ? <><Pause /> Pause</> : <><Play /> {elapsed ? "Resume" : "Start"}</>}
                </Button>
                <Button variant="outline" size="icon" className="size-11" onClick={() => (setRunning(false), setElapsed(0))} aria-label="Reset timer" disabled={!elapsed}>
                  <RotateCcw />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
