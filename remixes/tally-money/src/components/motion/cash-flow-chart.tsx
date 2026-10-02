import { motion, useInView, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

const LINES = [
  { d: "M0 70 C30 68 50 40 80 44 S120 80 150 60 S190 22 220 26 S250 40 280 24", color: "var(--color-leaf-400)" },
  { d: "M0 40 C30 30 50 56 80 52 S120 30 150 46 S190 70 220 62 S250 50 280 60", color: "var(--color-coral-500)" },
  { d: "M0 92 C60 90 120 94 180 88 S240 90 280 86", color: "var(--color-brand-500)" },
]
const MONTHS = ["Feb", "Mar", "Apr", "May", "Jun", "Jul"]

/** Three cash-flow lines that draw themselves in over `duration` seconds, `stagger` apart. */
export function CashFlowChart({ duration = 1.4, stagger = 0.2, className }: { duration?: number; stagger?: number; className?: string }) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true })
  const reduced = useReducedMotion()
  return (
    <div className={cn("relative", className)}>
      <svg ref={ref} viewBox="0 0 280 110" className="w-full overflow-visible" aria-label="Cash flow, February to July" role="img">
        {LINES.map((line, i) => (
          <motion.path
            key={line.d}
            d={line.d}
            fill="none"
            stroke={line.color}
            strokeWidth="2.5"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            initial={reduced ? false : { pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : undefined}
            transition={{ duration, delay: i * stagger, ease: [0.65, 0, 0.35, 1] }}
          />
        ))}
        <line x1="190" x2="190" y1="0" y2="110" stroke="white" strokeOpacity="0.5" />
      </svg>
      <div className="absolute top-1 right-0 flex flex-col items-end gap-1.5 text-[10px] font-bold">
        <span className="rounded-md bg-leaf-500 px-1.5 py-0.5 text-night-950">+$50,860</span>
        <span className="rounded-md bg-coral-500 px-1.5 py-0.5 text-white">−$41,730</span>
        <span className="rounded-md bg-brand-500 px-1.5 py-0.5 text-white">$25,860</span>
      </div>
      <div className="mt-2 flex justify-between text-[10px] text-white/50">
        {MONTHS.map((m) => (
          <span key={m} className={m === "May" ? "font-bold text-white" : undefined}>{m}</span>
        ))}
      </div>
    </div>
  )
}
