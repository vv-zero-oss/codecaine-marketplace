import { motion } from "motion/react"

import { useStill } from "@/components/motion"
import { cn } from "@/lib/utils"

/** A sentence that arrives word by word, each one sharpening out of a blur and
 *  rising a few pixels. Re-runs when `text` changes (give the parent a `key`). */
export function WordReveal({
  text,
  stagger = 0.045,
  duration = 0.5,
  blur = 6,
  className,
}: {
  text: string
  stagger?: number
  duration?: number
  blur?: number
  className?: string
}) {
  const still = useStill()
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {text.split(" ").map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          aria-hidden
          className="inline-block whitespace-pre"
          initial={still ? false : { opacity: 0, y: 6, filter: `blur(${blur}px)` }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ delay: i * stagger, duration, ease: [0.23, 1, 0.32, 1] }}
        >
          {word}{" "}
        </motion.span>
      ))}
    </span>
  )
}
