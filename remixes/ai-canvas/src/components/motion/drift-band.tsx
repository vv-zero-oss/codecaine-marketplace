import { motion, useReducedMotion, type MotionValue } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { ScrubReveal } from "@/components/motion/scrub-reveal"
import { pexels, type Photo } from "@/content"
import { cn } from "@/lib/utils"

/** Where each tile sits in one copy of the band: left and top as % of the
 *  copy, width in vw. Two loose clusters with air between them, tops on a
 *  staggered rhythm — never a grid, never a straight line. */
const SLOTS = [
  { x: 0, y: 4, w: 15 },
  { x: 11, y: 44, w: 13 },
  { x: 22, y: 10, w: 18 },
  { x: 36, y: 48, w: 14 },
  { x: 47, y: 2, w: 16 },
  { x: 60, y: 38, w: 19 },
  { x: 75, y: 8, w: 13.5 },
  { x: 86, y: 46, w: 15 },
]

/**
 * A strip of captioned photographs drifting sideways for ever, at the pace
 * of a slow pan. The strip is rendered twice and runs half its width, so the
 * seam never shows. It is a Framer Motion animation (the Web Animations API),
 * so the editor's Motion switch stops it; it holds still under reduced motion
 * and while being designed.
 *
 * With `progress`, each tile also sharpens in on the reader's scroll, one
 * after another.
 */
export function DriftBand({
  items,
  progress,
  seconds = 90,
  direction = "left",
  className,
}: {
  items: { year: string; label: string; photo: Photo }[]
  progress?: MotionValue<number>
  /** Seconds for one full pass of the strip. */
  seconds?: number
  direction?: "left" | "right"
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing, motion: mode } = useCanvasDesignMode()
  const still = reduced || designing || mode !== "play"
  const [from, to] = direction === "left" ? ["translateX(0%)", "translateX(-50%)"] : ["translateX(-50%)", "translateX(0%)"]

  return (
    <div className={cn("relative size-full overflow-hidden", className)}>
      <motion.div
        className="absolute inset-y-0 left-0 flex w-max"
        data-canvas-ignore
        initial={{ transform: from }}
        animate={still ? { transform: from } : { transform: [from, to] }}
        transition={still ? { duration: 0 } : { duration: seconds, ease: "linear", repeat: Infinity }}
      >
        {[0, 1].map((copy) => (
          <div key={copy} aria-hidden={copy === 1} className="relative h-full w-[170vw] shrink-0 lg:w-[128vw]">
            {items.slice(0, SLOTS.length).map((item, i) => {
              const slot = SLOTS[i]
              const tile = (
                <figure className="flex flex-col gap-phi-1">
                  <img
                    src={pexels(item.photo, 520)}
                    alt={copy === 0 ? item.photo.alt : ""}
                    loading="lazy"
                    className="aspect-[4/3] w-full rounded-[6px] object-cover shadow-float"
                  />
                  <figcaption className="text-micro text-mist tabular-nums">
                    {item.year} — {item.label}
                  </figcaption>
                </figure>
              )
              const style = { left: `${slot.x}%`, top: `${slot.y}%`, width: `max(118px, ${slot.w}vw)` }
              return progress ? (
                <ScrubReveal
                  key={i}
                  progress={progress}
                  from={0.02 + i * 0.035}
                  to={0.12 + i * 0.035}
                  className="absolute"
                  style={style}
                >
                  {tile}
                </ScrubReveal>
              ) : (
                <div key={i} className="absolute" style={style}>
                  {tile}
                </div>
              )
            })}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
