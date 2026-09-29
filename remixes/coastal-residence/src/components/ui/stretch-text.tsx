import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

import { DURATION, EASE_OUT } from "@/components/motion"
import { cn } from "@/lib/utils"

type StretchTextProps = {
  text: string
  className?: string
  /** Seconds before the first letter moves. */
  delay?: number
  /** Play on mount (`"mount"`), when scrolled into view (`"view"`), or hold hidden (`false`). */
  play?: "mount" | "view" | boolean
  as?: "span" | "h1" | "h2" | "h3" | "p"
}

/**
 * Letters that arrive tall, faint and soft, then settle to their true height
 * one after another — the headline entrance used across the page. Words stay
 * whole so lines break between them, never inside one.
 */
export function StretchText({ text, className, delay = 0, play = "view", as = "span" }: StretchTextProps) {
  const reduce = useReducedMotion()
  const Tag = motion[as] as React.ElementType
  const words = text.split(" ")
  let index = 0

  const hidden = { opacity: 0, scaleY: 2.2, y: "-0.18em", filter: "blur(6px)" }
  const shown = { opacity: 1, scaleY: 1, y: "0em", filter: "blur(0px)" }

  const trigger =
    reduce || play === true
      ? { animate: "shown" }
      : play === "mount"
        ? { animate: "shown" }
        : play === "view"
          ? { whileInView: "shown", viewport: { once: true, amount: 0.2 } }
          : { animate: "hidden" }

  return (
    <Tag className={className} aria-label={text} initial={reduce ? "shown" : "hidden"} {...trigger}>
      {words.map((word, w) => (
        <span key={w} aria-hidden="true" className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = index++
            return (
              <motion.span
                key={i}
                className="inline-block origin-top will-change-transform"
                variants={{
                  hidden,
                  shown: {
                    ...shown,
                    transition: {
                      duration: DURATION.letter,
                      ease: EASE_OUT,
                      delay: delay + i * DURATION.letterStagger,
                    },
                  },
                }}
              >
                {char}
              </motion.span>
            )
          })}
          {w < words.length - 1 ? " " : null}
        </span>
      ))}
    </Tag>
  )
}

/**
 * Script lettering written on from left to right, like a pen crossing the line.
 * The in-view check sits on an outer span: a target clipped to nothing never
 * counts as intersecting, so the clipped span cannot watch for itself.
 */
export function ScriptReveal({
  children,
  className,
  delay = 0,
  play = "view",
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  play?: "mount" | "view"
}) {
  const reduce = useReducedMotion()
  const variants = {
    hidden: { clipPath: "inset(-20% 100% -40% -10%)", opacity: 0.2 },
    shown: {
      clipPath: "inset(-20% -10% -40% -10%)",
      opacity: 1,
      transition: { duration: DURATION.script, ease: EASE_OUT, delay },
    },
  }
  return (
    <motion.span
      className={cn("inline-block", className)}
      initial={reduce ? "shown" : "hidden"}
      {...(play === "mount" ? { animate: "shown" } : { whileInView: "shown", viewport: { once: true, amount: 0.3 } })}
    >
      <motion.span className="inline-block" variants={variants}>
        {children}
      </motion.span>
    </motion.span>
  )
}
