import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { FRAMES } from "@/frames"
import { photo } from "@/lib/image"
import { cn } from "@/lib/utils"

/**
 * A strip of frames, numbered and named like contact-sheet cells, that drifts
 * sideways as the page scrolls past it. `start` and `count` pick which frames;
 * `size` is a cell's width in px; `drift` how far it travels, in px.
 */
export function Filmstrip({
  start = 0,
  count = 14,
  size = 132,
  drift = 320,
  direction = "left",
  className,
}: {
  start?: number
  count?: number
  size?: number
  drift?: number
  direction?: "left" | "right"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const sign = direction === "left" ? -1 : 1
  const x = useTransform(scrollYProgress, [0, 1], [(-sign * drift) / 2, (sign * drift) / 2])
  const frames = Array.from({ length: count }, (_, i) => FRAMES[(start + i) % FRAMES.length])

  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.ul data-canvas-ignore style={{ x: reduced ? 0 : x }} className="flex w-max gap-3 will-change-transform">
        {frames.map((frame) => (
          <li key={frame.id} style={{ width: size }}>
            <p className="mb-1.5 flex justify-between gap-2 text-label">
              <span>{String(frame.n).padStart(2, "0")} .</span>
              <span className="truncate">{frame.name}</span>
            </p>
            <img src={photo(frame.id, size, size * 1.25)} alt={frame.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
          </li>
        ))}
      </motion.ul>
    </div>
  )
}
