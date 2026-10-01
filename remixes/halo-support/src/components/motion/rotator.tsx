import { AnimatePresence, motion } from "motion/react"

import { cn } from "@/lib/utils"

/** Swaps a word in place: the old one lifts away, the new one rises into the
 *  same line. `index` is owned by the parent so charts can follow it. */
export function Rotator({ words, index, className }: { words: string[]; index: number; className?: string }) {
  const word = words[index % words.length]
  return (
    <span className={cn("relative inline-flex overflow-hidden align-bottom", className)}>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={word}
          initial={{ y: "70%", opacity: 0, filter: "blur(4px)" }}
          animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
          exit={{ y: "-70%", opacity: 0, filter: "blur(4px)" }}
          transition={{ duration: 0.45, ease: [0.23, 1, 0.32, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
