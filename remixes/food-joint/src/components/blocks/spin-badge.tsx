import { useId } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"

import { cn } from "@/lib/utils"
import { DURATION, EASE_OUT } from "@/lib/motion"

const RING = "Fried to order ✺ Finished over oak ✺ "

/**
 * A lavender sticker with its words set round the edge (an SVG `textPath`)
 * and a flame-orange star in the middle. The ring turns with the scroll, so it
 * reads as the page moving, not as something spinning on its own.
 */
export function SpinBadge({ className, show = true }: { className?: string; show?: boolean }) {
  const id = `ring-${useId().replace(/[^a-zA-Z0-9]/g, "")}`
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (y) => (reduced ? 0 : y * 0.15))
  return (
    <motion.div
      aria-hidden
      className={cn("size-[clamp(120px,11vw,180px)]", className)}
      initial={{ opacity: 0, transform: "scale(0.9)" }}
      animate={show ? { opacity: 1, transform: "scale(1)" } : undefined}
      transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay: 1 }}
    >
      <motion.svg viewBox="0 0 200 200" className="size-full" style={{ rotate }}>
        <circle cx="100" cy="100" r="100" className="fill-lavender" />
        <defs>
          <path id={id} d="M 100,100 m -74,0 a 74,74 0 1,1 148,0 a 74,74 0 1,1 -148,0" />
        </defs>
        <text className="fill-forest font-condensed text-[21px] uppercase">
          <textPath href={`#${id}`} textLength="462">
            {RING}
          </textPath>
        </text>
        <path
          d="M100 62 L108 88 L135 82 L116 100 L135 118 L108 112 L100 138 L92 112 L65 118 L84 100 L65 82 L92 88 Z"
          className="fill-orange"
        />
      </motion.svg>
    </motion.div>
  )
}
