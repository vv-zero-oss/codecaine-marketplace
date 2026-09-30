import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

type RevealProps = {
  /** Rise, in px, before it settles. */
  distance?: number
  /** Seconds. */
  duration?: number
  /** Seconds before it starts, for staggering siblings. */
  delay?: number
  /** Blur, in px, it clears from. 0 for a plain fade-up. */
  blur?: number
  as?: "div" | "h2" | "p" | "span"
  className?: string
  children?: React.ReactNode
}

/**
 * The page's one entrance: a short rise and fade, with a slight de-blur, the
 * first time a heading or block scrolls in. Held at its end state while the
 * page is being designed, and a plain fade with reduced motion.
 */
export function Reveal({
  distance = 16,
  duration = 0.7,
  delay = 0,
  blur = 6,
  as = "div",
  className,
  children,
}: RevealProps) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = motion[as]
  if (designing) return <Tag className={cn(className)}>{children}</Tag>
  return (
    <Tag
      className={cn(className)}
      initial={{
        opacity: 0,
        transform: `translateY(${reduce ? 0 : distance}px)`,
        filter: reduce || !blur ? "blur(0px)" : `blur(${blur}px)`,
      }}
      whileInView={{ opacity: 1, transform: "translateY(0px)", filter: "blur(0px)" }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: reduce ? 0.3 : duration, delay, ease: [0.23, 1, 0.32, 1] }}
    >
      {children}
    </Tag>
  )
}
