import { Play, RotateCcw } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"
import { useReducedMotion } from "motion/react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import type { SpriteName } from "@/components/pixel/sprites"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { SCENARIOS } from "@/content"
import { cn } from "@/lib/utils"

const NODES: { label: string; sprite: SpriteName }[] = [
  { label: "Device", sprite: "chip" },
  { label: "Inspect", sprite: "eye" },
  { label: "Policy", sprite: "shield" },
  { label: "Direct", sprite: "globe" },
]

/**
 * Pick a request, press run, and watch it travel the four stops. Each scenario
 * halts or passes at its own stop, so the verdict is something you can see
 * happen. The timer chain is held in a ref and cleared on unmount; reduced
 * motion jumps straight to the verdict.
 */
export function RequestSimulator({ stepMs = 650 }: { stepMs?: number }) {
  const reduced = useReducedMotion()
  const [id, setId] = useState<(typeof SCENARIOS)[number]["id"]>("phish")
  const [at, setAt] = useState(-1)
  const [done, setDone] = useState(false)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])
  const scenario = SCENARIOS.find((s) => s.id === id)!

  const clear = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }
  useEffect(() => clear, [])

  const reset = () => {
    clear()
    setAt(-1)
    setDone(false)
  }
  const run = () => {
    clear()
    setDone(false)
    if (reduced) {
      setAt(scenario.stop)
      setDone(true)
      return
    }
    setAt(0)
    for (let i = 1; i <= scenario.stop; i++) timers.current.push(setTimeout(() => setAt(i), i * stepMs))
    timers.current.push(setTimeout(() => setDone(true), scenario.stop * stepMs + 250))
  }
  useCanvasAction("Run simulation", () => run(), { group: "How it works" })
  useCanvasAction("Show verdict", () => { setAt(scenario.stop); setDone(true) }, { on: done, group: "How it works" })

  return (
    <div className="grid gap-8 bg-surface p-5 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)] sm:p-8 lg:grid-cols-[18rem_1fr]">
      <div role="radiogroup" aria-label="Choose a request" className="grid content-start gap-3">
        {SCENARIOS.map((s) => (
          <button
            key={s.id}
            role="radio"
            aria-checked={s.id === id}
            onClick={() => { setId(s.id); reset() }}
            className={cn(
              "min-h-14 px-4 py-3 text-left text-lg leading-tight shadow-px-sm transition-colors duration-100 ease-[steps(2,end)]",
              s.id === id ? "bg-accent text-accent-fg [--px-edge:var(--color-accent)]" : "bg-surface-2 text-fg-muted [--px-edge:var(--color-surface-2)] hover:text-fg",
            )}
          >
            {s.label}
          </button>
        ))}
      </div>
      <div className="grid content-between gap-8">
        <div className="font-mono text-xl text-fg-muted">GET <span className="text-fg">{scenario.detail}</span></div>
        <ol className="relative grid grid-cols-4 gap-2" aria-label="Request path">
          <span aria-hidden className="absolute left-[12.5%] right-[12.5%] top-8 h-1 bg-[repeating-linear-gradient(to_right,var(--color-line-strong)_0_8px,transparent_8px_16px)]" />
          {NODES.map((n, i) => {
            const reached = at >= i
            const stopped = done && i === scenario.stop && scenario.verdict !== "ALLOW"
            return (
              <li key={n.label} className="relative grid justify-items-center gap-3 text-center">
                <span className={cn("grid size-16 place-items-center bg-bg shadow-px transition-colors duration-100 ease-[steps(2,end)]", stopped ? "[--px-edge:var(--color-bad)]" : reached ? "[--px-edge:var(--color-good)]" : "[--px-edge:var(--color-line)]")}>
                  <PixelSprite name={n.sprite} scale={3} className={cn(!reached && "opacity-30")} />
                </span>
                <span className="font-display text-[8px] uppercase sm:text-[9px]">{n.label}</span>
                {at === i && !done ? <span aria-hidden className="absolute -top-1 size-3 animate-blink bg-accent-hi" /> : null}
              </li>
            )
          })}
        </ol>
        <div className="min-h-28 bg-bg p-4 shadow-px-sm [--px-edge:var(--color-line)]" aria-live="polite">
          {done ? (
            <div className="grid gap-2">
              <div className="flex items-center gap-3">
                <Badge tone={scenario.tone === "bad" ? "bad" : scenario.tone === "warn" ? "warn" : scenario.tone === "good" ? "good" : "accent"}>{scenario.verdict}</Badge>
                <span className="font-mono text-xl text-fg-muted">decided in {scenario.ms}ms, on the device</span>
              </div>
              <p className="text-lg">{scenario.log}</p>
            </div>
          ) : (
            <p className="text-lg text-fg-subtle">{at < 0 ? "Press run to send the request." : "Checking…"}</p>
          )}
        </div>
        <div className="flex flex-wrap gap-3">
          <Button variant="accent" onClick={run}><Play /> Run request</Button>
          <Button variant="ghost" onClick={reset}><RotateCcw /> Reset</Button>
        </div>
      </div>
    </div>
  )
}
