import { useMemo, useRef, useState } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

export type RoastProfile = {
  /** Seconds, charge to drop. */
  duration: number
  /** °C at drop. */
  drop: number
  /** °C the probe reads at charge. */
  charge: number
}

export type RoastPoint = { t: number; bt: number; ror: number }

/** Bean temperature over a batch: the plunge to the turning point, then the
 *  long climb that slows as it nears the drop. A model, but a faithful one. */
export function simulate({ duration, drop, charge }: RoastProfile): RoastPoint[] {
  const tp = 72
  const low = 92
  const pts: RoastPoint[] = []
  for (let t = 0; t <= duration; t += 5) {
    let bt: number
    if (t <= tp) bt = low + (charge - low) * (1 - t / tp) ** 2.4
    else {
      const x = (t - tp) / (duration - tp)
      bt = low + (drop - low) * (1 - Math.exp(-2.25 * x)) / (1 - Math.exp(-2.25))
    }
    pts.push({ t, bt, ror: 0 })
  }
  // Rate of rise, °C per minute, over a 30s window.
  for (let i = 6; i < pts.length; i++) pts[i].ror = ((pts[i].bt - pts[i - 6].bt) / 30) * 60
  return pts
}

const mmss = (t: number) => `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, "0")}`

const W = 640
const H = 340
const PAD = { l: 40, r: 40, t: 22, b: 34 }
const C_TOP = 236
const T_MIN = 60
const R_MAX = 40

/**
 * A roast logger's chart, live: bean temperature (solid) and rate of rise
 * (dashed) for a batch, with the three phases shaded beneath. Point at it —
 * or drag a finger along it — and a scrubber reads off the time, the
 * temperature and the rate at that second. Changing `drop` or `duration`
 * redraws the curves, which ink themselves in again.
 */
export function RoastCurve({
  duration = 600,
  drop = 210,
  charge = 205,
  firstCrack = 196,
  className,
}: {
  duration?: number
  drop?: number
  charge?: number
  /** °C where first crack begins. */
  firstCrack?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const svg = useRef<SVGSVGElement>(null)
  const [hover, setHover] = useState<number | null>(null)
  const pts = useMemo(() => simulate({ duration, drop, charge }), [duration, drop, charge])
  const tMax = Math.ceil(duration / 60) * 60 + 60
  const x = (t: number) => PAD.l + (t / tMax) * (W - PAD.l - PAD.r)
  const y = (c: number) => PAD.t + (1 - (c - T_MIN) / (C_TOP - T_MIN)) * (H - PAD.t - PAD.b)
  const yr = (r: number) => PAD.t + (1 - r / R_MAX) * (H - PAD.t - PAD.b)
  const bt = pts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${y(p.bt).toFixed(1)}`).join(" ")
  const rorPts = pts.filter((p) => p.t > 100 && p.ror > 0)
  const ror = rorPts.map((p, i) => `${i ? "L" : "M"}${x(p.t).toFixed(1)} ${yr(p.ror).toFixed(1)}`).join(" ")
  const dryEnd = pts.find((p) => p.t > 72 && p.bt >= 150)?.t ?? duration * 0.45
  const fc = pts.find((p) => p.t > 72 && p.bt >= firstCrack)?.t ?? duration * 0.82
  const phases = [
    { from: 0, to: dryEnd, label: "Drying" },
    { from: dryEnd, to: fc, label: "Maillard" },
    { from: fc, to: duration, label: "Development" },
  ]
  const point = hover == null ? null : pts[Math.min(pts.length - 1, Math.max(0, Math.round(hover / 5)))]

  const onMove = (clientX: number) => {
    const rect = svg.current?.getBoundingClientRect()
    if (!rect) return
    const sx = ((clientX - rect.left) / rect.width) * W
    const t = ((sx - PAD.l) / (W - PAD.l - PAD.r)) * tMax
    setHover(t < 0 || t > duration ? null : t)
  }

  return (
    <div className={cn("relative", className)}>
      <svg
        ref={svg}
        viewBox={`0 0 ${W} ${H}`}
        className="block h-auto w-full touch-pan-y select-none"
        role="img"
        aria-label={`Roast curve: ${mmss(duration)} batch, dropped at ${drop}°C, first crack at ${mmss(fc)}`}
        onPointerMove={(e) => onMove(e.clientX)}
        onPointerLeave={() => setHover(null)}
      >
        {phases.map((p, i) => (
          <g key={p.label}>
            <rect x={x(p.from)} y={PAD.t} width={x(p.to) - x(p.from)} height={H - PAD.t - PAD.b} fill="var(--color-ink)" opacity={[0.02, 0.045, 0.08][i]} />
            <text x={x(p.from) + 6} y={PAD.t + 14} fontSize="10" fontFamily="var(--font-sans)" fontWeight="500" letterSpacing="0.6" fill="var(--color-ink-3)">
              {p.label.toUpperCase()}
            </text>
          </g>
        ))}
        {[100, 150, 200].map((c) => (
          <g key={c}>
            <line x1={PAD.l} x2={W - PAD.r} y1={y(c)} y2={y(c)} stroke="var(--color-line)" />
            <text x={PAD.l - 6} y={y(c) + 3} textAnchor="end" fontSize="10" fill="var(--color-ink-3)" fontFamily="var(--font-sans)">
              {c}°
            </text>
          </g>
        ))}
        {[10, 20, 30].map((r) => (
          <text key={r} x={W - PAD.r + 6} y={yr(r) + 3} fontSize="10" fill="var(--color-ink-4)" fontFamily="var(--font-sans)">
            {r}
          </text>
        ))}
        {Array.from({ length: tMax / 60 + 1 }, (_, m) => (
          <text key={m} x={x(m * 60)} y={H - PAD.b + 18} textAnchor="middle" fontSize="10" fill="var(--color-ink-3)" fontFamily="var(--font-sans)">
            {m}:00
          </text>
        ))}
        <motion.path
          key={`ror-${duration}-${drop}`}
          d={ror}
          fill="none"
          stroke="var(--color-tomato)"
          strokeWidth="1.6"
          strokeDasharray="4 4"
          initial={reduced ? false : { opacity: 0 }}
          whileInView={{ opacity: 0.9 }}
          viewport={{ once: true }}
          transition={{ delay: 0.9, duration: 0.6 }}
        />
        <motion.path
          key={`bt-${duration}-${drop}`}
          d={bt}
          fill="none"
          stroke="var(--color-ink)"
          strokeWidth="2.4"
          strokeLinecap="round"
          initial={reduced ? false : { pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: [0.77, 0, 0.175, 1] }}
        />
        {/* First crack and drop markers */}
        {[
          { t: fc, c: firstCrack, label: "1st crack" },
          { t: duration, c: drop, label: "Drop" },
        ].map((m) => (
          <g key={m.label}>
            <circle cx={x(m.t)} cy={y(m.c)} r="4" fill="var(--color-paper)" stroke="var(--color-ink)" strokeWidth="1.6" />
            <text x={x(m.t)} y={y(m.c) - 10} textAnchor="middle" fontSize="10" fontWeight="500" fill="var(--color-ink)" fontFamily="var(--font-sans)">
              {m.label}
            </text>
          </g>
        ))}
        {point && (
          <g pointerEvents="none">
            <line x1={x(point.t)} x2={x(point.t)} y1={PAD.t} y2={H - PAD.b} stroke="var(--color-ink)" strokeOpacity="0.4" />
            <circle cx={x(point.t)} cy={y(point.bt)} r="4.5" fill="var(--color-ink)" />
          </g>
        )}
      </svg>
      <div
        className={cn(
          "pointer-events-none absolute top-3 right-3 rounded-[var(--radius-tag)] bg-ink px-3 py-2 text-[12px] text-paper shadow-float transition-opacity duration-150",
          point ? "opacity-100" : "opacity-0",
        )}
        aria-live="polite"
      >
        {point && (
          <span className="tabular-nums">
            {mmss(point.t)} · <b className="font-medium">{point.bt.toFixed(1)}°C</b> · RoR {point.ror > 0 ? point.ror.toFixed(1) : "—"}
          </span>
        )}
      </div>
    </div>
  )
}

export { mmss }
