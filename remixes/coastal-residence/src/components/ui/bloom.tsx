import { motion, useScroll, useTransform, useReducedMotion } from "motion/react"
import { useRef } from "react"

import { cn } from "@/lib/utils"

/**
 * A spray of bougainvillea tucked into a corner. The photograph is shot on a
 * white wall, so `mix-blend-multiply` drops the wall into whatever light
 * ground it sits on and leaves only the flowers. It drifts a little against
 * the scroll.
 */
export function Bloom({
  src,
  className,
  flip = false,
  drift = 80,
  corner = "top-left",
}: {
  src: string
  className?: string
  flip?: boolean
  drift?: number
  /** The corner the spray grows from; the photograph fades out away from it. */
  corner?: "top-left" | "top-right" | "bottom-left" | "bottom-right"
}) {
  const at = corner.replace("-", " ")
  const mask = `radial-gradient(ellipse 120% 120% at ${at}, black 38%, transparent 70%)`
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [drift, -drift])
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      style={{ y, maskImage: mask, WebkitMaskImage: mask }}
      className={cn("pointer-events-none absolute mix-blend-multiply", className)}
    >
      <img
        src={src}
        alt=""
        loading="lazy"
        className={cn("size-full object-cover brightness-[1.08] contrast-[1.2] saturate-[1.15]", flip && "-scale-x-100")}
      />
    </motion.div>
  )
}
