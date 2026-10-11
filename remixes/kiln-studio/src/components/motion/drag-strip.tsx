import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * A row you can throw sideways: drag it (or scroll it with a trackpad) and
 * it carries on with a little momentum, stopping at its ends with an elastic
 * give. Keyboard users get it as a normal scrollable row.
 */
export function DragStrip({ gap = 16, elastic = 0.12, className, children }: { gap?: number; elastic?: number; className?: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const [limit, setLimit] = useState(0)
  useEffect(() => {
    const measure = () => setLimit(Math.max(0, (inner.current?.scrollWidth ?? 0) - (outer.current?.clientWidth ?? 0)))
    measure()
    const ro = new ResizeObserver(measure)
    if (outer.current) ro.observe(outer.current)
    if (inner.current) ro.observe(inner.current)
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={outer} className={cn("overflow-hidden", className)}>
      <motion.div
        ref={inner}
        data-canvas-ignore
        className="flex w-max cursor-grab active:cursor-grabbing"
        style={{ gap }}
        drag="x"
        dragConstraints={{ left: -limit, right: 0 }}
        dragElastic={elastic}
        dragTransition={reduced ? { power: 0 } : { power: 0.25, timeConstant: 280 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
