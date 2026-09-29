import type * as React from "react"
import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { EASE } from "@/lib/motion"

/**
 * Content that comes into focus: a small rise, a fade and a 1.5px blur
 * clearing, over 0.6s on the page's ease-out. `onMount` plays it on load
 * (the hero); otherwise it plays the first time it scrolls into view.
 *
 * Shown at its end state while the page is designed and for reduced motion.
 */
export function Reveal({
  y = 8,
  blur = 1.5,
  delay = 0,
  duration = 0.6,
  onMount = false,
  as = "div",
  className,
  children,
}: {
  y?: number
  blur?: number
  delay?: number
  duration?: number
  onMount?: boolean
  as?: "div" | "section" | "li" | "article" | "p"
  className?: string
  children?: React.ReactNode
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = motion[as]

  if (reduced || designing) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }

  const shown = { opacity: 1, y: 0, filter: "blur(0px)" }
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y, filter: `blur(${blur}px)` }}
      {...(onMount ? { animate: shown } : { whileInView: shown, viewport: { once: true, margin: "0px 0px -10% 0px" } })}
      transition={{ duration, ease: EASE.out, delay }}
    >
      {children}
    </Tag>
  )
}
