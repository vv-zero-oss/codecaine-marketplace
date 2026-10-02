import { motion } from "motion/react"
import type { ReactNode } from "react"

import { EASE_OUT } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

/** Fades and lifts into place once, as it enters the viewport. Subtle, and the only entrance the page uses. */
export function Reveal({ children, delay = 0, y = 14, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 0.7, ease: EASE_OUT, delay }}
      className={cn(className)}
    >
      {children}
    </motion.div>
  )
}
