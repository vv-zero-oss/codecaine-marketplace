import { useEffect, useRef } from "react"
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from "motion/react"

import { pexels } from "@/lib/photos"

/**
 * The work that follows the pointer over a list: a small print that trails
 * the cursor on a soft spring and swaps as you move down the rows. Only on
 * devices with a fine pointer — on touch, rows carry their own thumbnail.
 */
export function CursorPreview({
  photo,
  alt = "",
  width = 280,
  stiffness = 320,
  damping = 30,
}: {
  /** The Pexels id of the hovered row, or null when nothing is hovered. */
  photo: number | null
  alt?: string
  width?: number
  stiffness?: number
  damping?: number
}) {
  const reduced = useReducedMotion()
  const x = useMotionValue(-999)
  const y = useMotionValue(-999)
  const sx = useSpring(x, { stiffness, damping })
  const sy = useSpring(y, { stiffness, damping })
  const fine = useRef(typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches)

  useEffect(() => {
    const move = (e: PointerEvent) => {
      x.set(e.clientX + 24)
      y.set(e.clientY - width * 0.62)
    }
    window.addEventListener("pointermove", move)
    return () => window.removeEventListener("pointermove", move)
  }, [x, y, width])

  if (!fine.current) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 z-40"
      style={{ x: reduced ? x : sx, y: reduced ? y : sy, width }}
    >
      <AnimatePresence mode="popLayout">
        {photo ? (
          <motion.img
            key={photo}
            src={pexels(photo, width * 2, Math.round(width * 2 * 1.2))}
            alt={alt}
            className="aspect-[1/1.2] w-full rounded-(--radius-cell) object-cover shadow-(--shadow-float)"
            initial={{ opacity: 0, transform: "scale(0.94)" }}
            animate={{ opacity: 1, transform: "scale(1)" }}
            exit={{ opacity: 0, transform: "scale(0.97)" }}
            transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
          />
        ) : null}
      </AnimatePresence>
    </motion.div>
  )
}
