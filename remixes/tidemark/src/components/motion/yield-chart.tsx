import type * as React from "react"
import { useMemo, useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { money } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * A year of treasury balance as one line with a soft fill, compounding
 * monthly at `rate`. One series, so no legend — the section's title names
 * it. Recessive grid, labels in muted ink, a crosshair and tooltip on hover
 * or touch. The line redraws when the amount changes, so the change reads.
 */
export function YieldChart({
  amount = 1000000,
  rate = 0.041,
  months = 12,
  className,
}: {
  amount?: number
  /** Annual yield, e.g. 0.041 for 4.10%. */
  rate?: number
  months?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [hover, setHover] = useState<number | null>(null)

  const w = 560
  const h = 220
  const pad = { l: 8, r: 8, t: 16, b: 28 }
  const series = useMemo(
    () => Array.from({ length: months + 1 }, (_, i) => amount * Math.pow(1 + rate / 12, i)),
    [amount, rate, months],
  )
  const min = amount
  const max = series[series.length - 1]
  const x = (i: number) => pad.l + (i / months) * (w - pad.l - pad.r)
  const y = (v: number) => pad.t + (1 - (v - min) / (max - min || 1)) * (h - pad.t - pad.b)
  const line = series.map((v, i) => `${i ? "L" : "M"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ")
  const area = `${line} L${x(months)} ${h - pad.b} L${x(0)} ${h - pad.b} Z`
  const ticks = [0, 3, 6, 9, 12].filter((t) => t <= months)

  const onMove = (e: React.PointerEvent<SVGSVGElement>) => {
    const r = e.currentTarget.getBoundingClientRect()
    const rel = ((e.clientX - r.left) / r.width) * w
    const i = Math.round(((rel - pad.l) / (w - pad.l - pad.r)) * months)
    setHover(Math.max(0, Math.min(months, i)))
  }

  return (
    <div className={cn("relative w-full", className)}>
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="h-auto w-full touch-pan-y overflow-visible"
        role="img"
        aria-label={`Treasury balance over ${months} months, from ${money(amount, false)} to ${money(max, false)}`}
        onPointerMove={onMove}
        onPointerDown={onMove}
        onPointerLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id="yield-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="var(--color-chart-night)" stopOpacity="0.28" />
            <stop offset="1" stopColor="var(--color-chart-night)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {[0.25, 0.5, 0.75, 1].map((f) => (
          <line key={f} x1={pad.l} x2={w - pad.r} y1={pad.t + f * (h - pad.t - pad.b)} y2={pad.t + f * (h - pad.t - pad.b)} stroke="var(--color-forest-line)" strokeWidth={1} strokeDasharray={f === 1 ? undefined : "2 4"} />
        ))}
        {ticks.map((t) => (
          <text key={t} x={x(t)} y={h - 8} textAnchor={t === 0 ? "start" : t === months ? "end" : "middle"} className="fill-forest-muted font-mono text-[11px]">
            {t === 0 ? "Today" : `${t} mo`}
          </text>
        ))}
        <path d={area} fill="url(#yield-fill)" />
        <motion.path
          key={`${amount}-${rate}`}
          d={line}
          fill="none"
          stroke="var(--color-chart-night)"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={still ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: [0.23, 1, 0.32, 1] }}
        />
        <circle cx={x(months)} cy={y(max)} r={5} fill="var(--color-chart-night)" stroke="var(--color-forest)" strokeWidth={2} />
        {hover !== null && (
          <g>
            <line x1={x(hover)} x2={x(hover)} y1={pad.t} y2={h - pad.b} stroke="var(--color-forest-muted)" strokeWidth={1} />
            <circle cx={x(hover)} cy={y(series[hover])} r={5} fill="var(--color-lime)" stroke="var(--color-forest)" strokeWidth={2} />
          </g>
        )}
      </svg>
      {hover !== null && (
        <div
          className="pointer-events-none absolute top-0 z-10 -translate-x-1/2 rounded-[var(--radius-field)] bg-card px-3 py-2 text-[12px] text-ink shadow-(--shadow-float)"
          style={{ left: `${(x(hover) / w) * 100}%` }}
        >
          <p className="font-mono text-[11px] tracking-[0.06em] text-ink-subtle uppercase">{hover === 0 ? "Today" : `Month ${hover}`}</p>
          <p className="font-medium tabular-nums">{money(series[hover], false)}</p>
          <p className="text-gain tabular-nums">+ {money(series[hover] - amount, false)} earned</p>
        </div>
      )}
    </div>
  )
}
