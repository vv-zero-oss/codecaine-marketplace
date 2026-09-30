import { AnimatePresence, motion, useMotionValue, useSpring } from "motion/react"
import { useRef, useState, type ReactNode } from "react"

import { useMotionAllowed } from "@/components/motion/use-motion"
import { cn } from "@/lib/utils"

/**
 * A list whose rows show a picture beside the pointer while hovered. The
 * picture trails the pointer on a spring (`stiffness`, `damping`) and swaps,
 * with a short crossfade, as the pointer moves from row to row. Touch devices
 * never see it — each row carries its own thumbnail for them instead.
 */
export function HoverPreview({
  rows,
  images,
  width = 320,
  stiffness = 260,
  damping = 30,
  className,
}: {
  rows: ReactNode[]
  /** One picture per row, `|`-separated, so the editor can swap them as one string. */
  images: string
  width?: number
  stiffness?: number
  damping?: number
  className?: string
}) {
  const list = useRef<HTMLUListElement>(null)
  const [active, setActive] = useState<number | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness, damping })
  const sy = useSpring(y, { stiffness, damping })
  const { reduced } = useMotionAllowed()
  const sources = images.split("|")

  return (
    <div
      className={cn("relative", className)}
      onPointerMove={(event) => {
        if (event.pointerType !== "mouse" || !list.current) return
        const box = list.current.getBoundingClientRect()
        x.set(event.clientX - box.left)
        y.set(event.clientY - box.top)
      }}
      onPointerLeave={() => setActive(null)}
    >
      <ul ref={list} className="border-b border-current/15">
        {rows.map((row, i) => (
          <li key={i} onPointerEnter={(e) => e.pointerType === "mouse" && setActive(i)} className="border-t border-current/15">
            {row}
          </li>
        ))}
      </ul>
      <motion.div
        aria-hidden
        className="pointer-events-none absolute top-0 left-0 z-20 hidden md:block"
        style={{ x: reduced ? x : sx, y: reduced ? y : sy, width, translateX: "-50%", translateY: "-50%" }}
      >
        <AnimatePresence>
          {active !== null ? (
            <motion.img
              key={active}
              src={sources[active]}
              alt=""
              className="absolute inset-x-0 top-0 aspect-[4/3] w-full object-cover shadow-lift"
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, transition: { duration: 0.15 } }}
              transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}
            />
          ) : null}
        </AnimatePresence>
      </motion.div>
    </div>
  )
}
