import { useEffect, useMemo, useRef, useState } from "react"
import { animate, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

const PERIODS = { "3M": 3, "6M": 6, "12M": 12 } as const
type Period = keyof typeof PERIODS

const W = 300
const H = 110
const POINTS = 24

/** A number that glides from its last value to the new one. */
function Glide({ value, className }: { value: number; className?: string }) {
  const reduced = useReducedMotion()
  const [shown, setShown] = useState(value)
  const last = useRef(value)
  useEffect(() => {
    if (reduced) {
      setShown(value)
      last.current = value
      return
    }
    const controls = animate(last.current, value, { duration: 0.6, ease: [0.23, 1, 0.32, 1], onUpdate: setShown })
    last.current = value
    return () => controls.stop()
  }, [value, reduced])
  return <span className={cn("tabular-nums", className)}>{money(shown)}</span>
}

/**
 * Idle cash, earning. Pick a horizon and the projected interest, the
 * balance and the curve all move to it — the curve morphs because every
 * period draws the same number of points.
 */
export function TreasuryCard({
  balance = 2_480_000,
  apy = 4.1,
  period: initial = "12M",
  className,
}: {
  balance?: number
  /** Annual yield, in per cent. */
  apy?: number
  period?: Period
  className?: string
}) {
  const [period, setPeriod] = useState<Period>(initial)
  useEffect(() => setPeriod(initial), [initial])
  useCanvasAction("Treasury: 3 months", (next) => setPeriod(next === false ? "12M" : "3M"), { on: period === "3M", group: "Platform" })

  const months = PERIODS[period]
  const earned = balance * (apy / 100) * (months / 12)

  const { line, area } = useMemo(() => {
    const pts = Array.from({ length: POINTS }, (_, i) => {
      const t = i / (POINTS - 1)
      // Compounding growth with a little weekly noise, scaled to the period.
      const growth = Math.pow(1 + apy / 100 / 12, months * t) - 1
      const wobble = Math.sin(i * 1.7) * 0.0009 * (months / 12)
      return [t * W, H - 12 - ((growth + wobble) / (Math.pow(1 + apy / 100 / 12, 12) - 1)) * (H - 26)] as const
    })
    const line = pts.map(([x, y], i) => `${i ? "L" : "M"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ")
    return { line, area: `${line} L${W} ${H} L0 ${H} Z` }
  }, [months, apy])

  return (
    <div className={cn("rounded-t-(--radius-card) bg-raised p-4 shadow-(--shadow-float)", className)}>
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="type-eyebrow text-[10px] text-ink-3">Cash &amp; treasury</p>
          <p className="mt-1 text-[22px] font-medium tracking-[-0.03em] text-ink">
            <Glide value={balance + earned} />
          </p>
        </div>
        <div className="flex rounded-(--radius-field) bg-panel p-0.5" role="radiogroup" aria-label="Projection period">
          {(Object.keys(PERIODS) as Period[]).map((p) => (
            <button
              key={p}
              role="radio"
              aria-checked={period === p}
              onClick={() => setPeriod(p)}
              className={cn(
                "relative h-8 min-w-10 rounded-[5px] px-2 text-[12px] transition-colors duration-(--duration-hover)",
                period === p ? "text-ink" : "text-ink-3 hover:text-ink-2",
              )}
            >
              {period === p && <motion.span layoutId="treasury-period" className="absolute inset-0 rounded-[5px] bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", duration: 0.35, bounce: 0.1 }} />}
              <span className="relative">{p}</span>
            </button>
          ))}
        </div>
      </div>
      <p className="mt-1 text-[12.5px] text-ink-3">
        <span className="text-signal-green">+<Glide value={earned} /></span> at {apy.toFixed(1)}% APY over {months} months
      </p>
      <svg viewBox={`0 0 ${W} ${H}`} className="mt-3 h-[110px] w-full overflow-visible" preserveAspectRatio="none" aria-hidden>
        <defs>
          <linearGradient id="treasury-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-signal-green)" stopOpacity="0.22" />
            <stop offset="1" stopColor="var(--color-signal-green)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75].map((f) => (
          <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke="var(--color-line)" strokeDasharray="2 4" />
        ))}
        <motion.path d={area} animate={{ d: area }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} fill="url(#treasury-fill)" />
        <motion.path d={line} animate={{ d: line }} transition={{ duration: 0.6, ease: [0.23, 1, 0.32, 1] }} fill="none" stroke="var(--color-signal-green)" strokeWidth="1.8" vectorEffect="non-scaling-stroke" />
      </svg>
    </div>
  )
}
