import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"

import { cn } from "@/lib/utils"

/**
 * Text that types itself, a character at a time — for prompts, commands and
 * transcripts, where watching it arrive is the point. `insert` drops a node
 * (a chip) in after a given character. Reduced motion shows it whole.
 */
export function Typed({
  text,
  delay = 0,
  speed = 0.028,
  as = "span",
  className,
  insert,
}: {
  text: string
  delay?: number
  speed?: number
  as?: "span" | "p"
  className?: string
  insert?: { after: number; node: React.ReactNode }
}) {
  const reduce = useReducedMotion()
  const Tag = as
  return (
    <Tag aria-label={text} className={cn(as === "p" && "whitespace-pre-wrap", className)}>
      {text.split("").map((ch, i) => (
        <motion.span
          key={i}
          aria-hidden
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.01, delay: delay + i * speed }}
        >
          {ch}
          {insert && i === insert.after && insert.node}
        </motion.span>
      ))}
    </Tag>
  )
}
