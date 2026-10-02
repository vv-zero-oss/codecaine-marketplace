import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"
import { Fragment } from "react"
import type * as React from "react"

/**
 * A headline whose words rise out of a mask one after another.
 * `delay` and `stagger` are seconds; `duration` is per word. Reduced motion and
 * design mode show the finished line. Purpose: preventing a jarring change: the
 * headline arrives in reading order rather than all at once.
 */
export function SplitText({
  text,
  as = "h1",
  delay = 0.9,
  stagger = 0.06,
  duration = 0.8,
  className,
}: {
  text: string
  as?: "h1" | "h2" | "p"
  delay?: number
  stagger?: number
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = as as React.ElementType
  if (reduced || designing) return <Tag className={className}>{text}</Tag>
  return (
    <Tag className={className} aria-label={text}>
      {text.split(" ").map((word, index, words) => (
        <Fragment key={index}>
          <span aria-hidden="true" className="inline-block overflow-hidden pb-[0.14em] align-bottom">
            <motion.span
              className="inline-block"
              initial={{ transform: "translateY(110%)" }}
              animate={{ transform: "translateY(0%)" }}
              transition={{ duration, delay: delay + index * stagger, ease: [0.23, 1, 0.32, 1] }}
            >
              {word}
            </motion.span>
          </span>
          {index < words.length - 1 ? " " : null}
        </Fragment>
      ))}
    </Tag>
  )
}
