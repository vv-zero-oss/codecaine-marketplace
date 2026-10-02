import { motion, useInView, useReducedMotion, useSpring } from "motion/react"
import { useRef, useState } from "react"

import { CountUp } from "@/components/motion/count-up"
import { cn } from "@/lib/utils"

const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"]
const DATA = {
  income: [38200, 41500, 44800, 50860, 47300, 52100],
  spent: [36100, 39800, 43200, 41730, 45900, 44100],
  saved: [18400, 21200, 23100, 25860, 27400, 29900],
}
const COLORS = { income: "var(--color-leaf-400)", spent: "var(--color-coral-500)", saved: "var(--color-brand-500)" }
const W = 280
const MAX = 60000
const x = (i: number) => (i * W) / (MONTHS.length - 1)
const y = (v: number) => 104 - (v / MAX) * 96

/** A smooth path through the points (Catmull-Rom, turned into cubic Béziers). */
function smooth(values: number[]): string {
  const pts = values.map((v, i) => [x(i), y(v)] as const)
  let d = `M${pts[0][0]} ${pts[0][1]}`
  for (let i = 0; i < pts.length - 1; i++) {
    const p0 = pts[i - 1] ?? pts[i]
    const p1 = pts[i]
    const p2 = pts[i + 1]
    const p3 = pts[i + 2] ?? p2
    d += ` C${p1[0] + (p2[0] - p0[0]) / 6} ${p1[1] + (p2[1] - p0[1]) / 6} ${p2[0] - (p3[0] - p1[0]) / 6} ${p2[1] - (p3[1] - p1[1]) / 6} ${p2[0]} ${p2[1]}`
  }
  return d
}

/**
 * Three cash-flow lines that draw themselves in over `duration` seconds, `stagger`
 * apart, then follow your finger or cursor: the guide snaps to a month and the
 * three figures count to that month's values. Purpose: state indication.
 */
export function CashFlowChart({ duration = 1.4, stagger = 0.2, className }: { duration?: number; stagger?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(3)
  const guide = useSpring(x(3), { stiffness: 300, damping: 30 })
  const keys = ["income", "spent", "saved"] as const

  const scrub = (event: React.PointerEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect()
    const next = Math.min(MONTHS.length - 1, Math.max(0, Math.round(((event.clientX - rect.left) / rect.width) * (MONTHS.length - 1))))
    setIndex(next)
    guide.set(x(next))
  }

  return (
    <div ref={ref} className={cn("relative touch-pan-y select-none", className)} onPointerMove={scrub} onPointerDown={scrub}>
      <svg viewBox={`0 0 ${W} 110`} className="w-full overflow-visible" aria-label="Cash flow, February to July. Move across it to read a month." role="img">
        {keys.map((key, i) => (
          <motion.path
            key={key}
            d={smooth(DATA[key])}
            fill="none"
            stroke={COLORS[key]}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration, delay: i * stagger, ease: [0.77, 0, 0.175, 1] }}
          />
        ))}
        <motion.line x1="0" x2="0" y1="0" y2="110" stroke="white" strokeOpacity="0.5" style={{ x: guide }} />
        {keys.map((key) => (
          <motion.circle key={key} r="3.5" fill={COLORS[key]} stroke="white" strokeWidth="1.5" initial={false} animate={{ cx: x(index), cy: y(DATA[key][index]) }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        ))}
      </svg>
      <div className="pointer-events-none absolute top-1 right-0 flex flex-col items-end gap-1.5 text-[10px] font-bold">
        <span className="rounded-md bg-leaf-500 px-1.5 py-0.5 text-night-950">
          <CountUp value={DATA.income[index]} prefix="+$" duration={0.5} />
        </span>
        <span className="rounded-md bg-coral-500 px-1.5 py-0.5 text-white">
          <CountUp value={DATA.spent[index]} prefix="−$" duration={0.5} />
        </span>
        <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-white">
          <CountUp value={DATA.saved[index]} prefix="$" duration={0.5} />
        </span>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/50">
        {MONTHS.map((month, i) => (
          <span key={month} className={cn("transition-colors duration-150", i === index && "font-bold text-white")}>{month}</span>
        ))}
      </div>
    </div>
  )
}
