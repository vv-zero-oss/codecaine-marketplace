import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * A card that lifts and turns a few degrees under the pointer, as the
 * results grid does in the reference — a spring, so it settles rather than
 * snaps. `tilt` is the angle in degrees; its sign alternates per card.
 */
export function TiltCard({
  tilt = 2,
  lift = 4,
  className,
  children,
  ...props
}: {
  tilt?: number
  lift?: number
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<typeof motion.div>, "children">) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={cn("group/tilt", className)}
      whileHover={reduced ? undefined : { rotate: tilt, y: -lift }}
      transition={{ type: "spring", stiffness: 320, damping: 22 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
