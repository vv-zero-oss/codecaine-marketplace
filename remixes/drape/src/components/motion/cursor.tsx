import { useCanvasDesignMode } from "@canvas/react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Cursor — a collaborator's pointer with their name, wandering between two
 * points on a slow loop, as friends looking at the same outfit would.
 * `x`/`y` place it (percent of the parent), `dx`/`dy` how far it wanders
 * (px), `duration` one leg of the trip in seconds.
 */
export function Cursor({
  name = "Maya",
  color = "var(--mustard)",
  x = 20,
  y = 20,
  dx = 40,
  dy = 20,
  duration = 4,
  delay = 0,
  className,
}: {
  name?: string
  color?: string
  x?: number
  y?: number
  dx?: number
  dy?: number
  duration?: number
  delay?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <motion.div
      aria-hidden
      className={cn("pointer-events-none absolute z-10", className)}
      style={{ left: `${x}%`, top: `${y}%` }}
      animate={still ? { x: 0, y: 0 } : { x: [0, dx, dx * 0.4, 0], y: [0, dy, -dy * 0.6, 0] }}
      transition={still ? { duration: 0 } : { duration: duration * 3, delay, repeat: Infinity, ease: "easeInOut" }}
    >
      <svg width="16" height="18" viewBox="0 0 16 18" className="drop-shadow-sm">
        <path d="M1 1l13.5 7.2-6.2 1.5-3 6.6L1 1z" fill={color} stroke="var(--paper)" strokeWidth="1.2" strokeLinejoin="round" />
      </svg>
      <span
        className="ml-3 -mt-0.5 inline-block rounded-xs px-1.5 py-0.5 text-[11px] font-medium text-paper"
        style={{ background: color }}
      >
        {name}
      </span>
    </motion.div>
  )
}
