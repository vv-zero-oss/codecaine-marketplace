import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/** A card that lifts a few pixels under the pointer, on a spring. */
export function LiftCard({
  lift = 4,
  className,
  children,
  ...props
}: {
  lift?: number
  className?: string
  children?: React.ReactNode
} & Omit<React.ComponentProps<typeof motion.div>, "children">) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={cn("group/lift", className)}
      whileHover={reduced ? undefined : { y: -lift }}
      transition={{ type: "spring", duration: 0.4, bounce: 0.15 }}
      {...props}
    >
      {children}
    </motion.div>
  )
}
