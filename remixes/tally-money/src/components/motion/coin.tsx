import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { Coin } from "@/components/illustrations/objects"
import { cn } from "@/lib/utils"

/** A coin that turns on its vertical axis; `duration` is seconds per turn, `tilt` the resting angle. */
export function SpinningCoin({ duration = 3.2, tilt = -12, className }: { duration?: number; tilt?: number; className?: string }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const hold = reduced || designing
  return (
    <motion.div
      className={cn("w-full", className)}
      style={{ rotate: tilt }}
      animate={hold ? { rotateY: 0 } : { rotateY: 360 }}
      transition={hold ? { duration: 0 } : { duration, ease: "linear", repeat: Infinity }}
    >
      <Coin className="h-auto w-full drop-shadow-[0_8px_8px_rgb(27_31_72/0.15)]" />
    </motion.div>
  )
}
