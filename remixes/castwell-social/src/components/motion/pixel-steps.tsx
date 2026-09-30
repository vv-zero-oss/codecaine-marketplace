import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * The stepped block wipe between a light section and a night one: columns of
 * square cells rise in a staircase as the boundary scrolls past, snapped to
 * whole cells so it reads as pixels, not a gradient.
 *
 * `rise` "up" grows night blocks upward out of the section below (light → night);
 * "down" hangs them from the night section above (night → light).
 */
export function PixelSteps({
  rise = "up",
  columns = 15,
  rows = 4,
  lead = "left",
  cellRatio = 0.5,
  className,
}: {
  rise?: "up" | "down"
  columns?: number
  rows?: number
  /** The side the staircase climbs from. */
  lead?: "left" | "right"
  /** A cell's height as a fraction of its width — the blocks are wide and short. */
  cellRatio?: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })

  return (
    <div
      ref={ref}
      aria-hidden
      className={cn("pointer-events-none relative grid w-full", rise === "up" ? "bg-page" : "bg-night", className)}
      style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`, aspectRatio: `${columns} / ${rows * cellRatio}` }}
    >
      {Array.from({ length: columns }, (_, i) => (
        <StepColumn
          key={i}
          index={lead === "left" ? i : columns - 1 - i}
          columns={columns}
          rows={rows}
          rise={rise}
          progress={scrollYProgress}
          still={!!reduce}
        />
      ))}
    </div>
  )
}

function StepColumn({
  index,
  columns,
  rows,
  rise,
  progress,
  still,
}: {
  index: number
  columns: number
  rows: number
  rise: "up" | "down"
  progress: MotionValue<number>
  still: boolean
}) {
  // The finished shape is a staircase: full height at the leading edge,
  // one cell at the far edge, with every other column a cell taller so the
  // edge is ragged. Scroll grows each column towards that shape, the
  // leading side first, snapped to whole cells.
  const target = Math.max(1, Math.min(rows, rows - Math.floor((index * rows) / columns) + (index % 2)))
  const cells = useTransform(progress, (p) => {
    if (still) return target
    const t = (p - 0.12) / 0.45 - (index / columns) * 0.35
    return Math.max(0, Math.min(target, Math.floor(t * (rows + 1))))
  })
  const transform = useTransform(cells, (n) =>
    rise === "up" ? `translateY(${((rows - n) / rows) * 100}%)` : `translateY(${(-(rows - n) / rows) * 100}%)`,
  )
  return (
    <div className="overflow-hidden">
      <motion.div className={cn("h-full w-full", rise === "up" ? "bg-night" : "bg-page")} style={{ transform }} />
    </div>
  )
}
