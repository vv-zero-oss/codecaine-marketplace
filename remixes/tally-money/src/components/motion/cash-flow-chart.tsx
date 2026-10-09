import { motion, useInView, useReducedMotion, useSpring } from "motion/react"
import { useRef, useState } from "react"

import { CountUp } from "@/components/motion/count-up"
import { smoothPath } from "@/lib/chart"
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
const H = 140
const y = (v: number) => H - 6 - ((v - 10000) / (MAX - 10000)) * (H - 18)

const smooth = (values: number[]) => smoothPath(values.map((v, i) => [x(i), y(v)] as const))

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
      <div className="mb-4 grid grid-cols-3 gap-2 text-left">
        {[["Income", "income", "+$", "text-leaf-400"], ["Spent", "spent", "−$", "text-coral-500"], ["Saved", "saved", "$", "text-brand-500"]].map(([label, key, prefix, tone]) => (
          <div key={key} className="rounded-lg bg-white/5 px-2 py-1.5">
            <p className="text-[8px] font-semibold tracking-wider text-white/50 uppercase">{label}</p>
            <CountUp value={DATA[key as keyof typeof DATA][index]} prefix={prefix} duration={0.5} className={cn("tabular block text-[10px] font-extrabold whitespace-nowrap", tone)} />
          </div>
        ))}
      </div>
      <svg viewBox={`0 0 ${W} ${H}`} className="w-full overflow-visible" aria-label="Cash flow, February to July. Move across it to read a month." role="img">
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
        <motion.line x1="0" x2="0" y1="0" y2={H} stroke="white" strokeOpacity="0.5" style={{ x: guide }} />
        {keys.map((key) => (
          <motion.circle key={key} r="3.5" fill={COLORS[key]} stroke="white" strokeWidth="1.5" initial={false} animate={{ cx: x(index), cy: y(DATA[key][index]) }} transition={{ type: "spring", stiffness: 300, damping: 30 }} />
        ))}
      </svg>
      <div className="mt-2 flex justify-between text-[10px] text-white/50">
        {MONTHS.map((month, i) => (
          <span key={month} className={cn("transition-colors duration-150", i === index && "font-bold text-white")}>{month}</span>
        ))}
      </div>
    </div>
  )
}
