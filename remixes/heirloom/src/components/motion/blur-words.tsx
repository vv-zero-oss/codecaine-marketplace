import { motion, useReducedMotion } from "motion/react"
import { createElement } from "react"

import { Accent } from "@/components/ui/heading"
import { cn } from "@/lib/utils"

const split = (text: string) => text.split(" ").filter(Boolean)

/**
 * A heading that arrives word by word, out of a blur — the move every section
 * title on the page makes. The words before and after are sans, the accent is
 * the italic serif. Each knob is a scalar prop, read live.
 */
export function BlurWords({
  before,
  accent,
  after = "",
  as = "h2",
  stagger = 0.06,
  duration = 0.9,
  distance = 14,
  blur = 10,
  delay = 0,
  className,
}: {
  before: string
  accent: string
  after?: string
  as?: "h1" | "h2" | "h3" | "p"
  stagger?: number
  duration?: number
  distance?: number
  blur?: number
  delay?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const words = [
    ...split(before).map((text) => ({ text, italic: false })),
    ...split(accent).map((text) => ({ text, italic: true })),
    ...split(after).map((text) => ({ text, italic: false })),
  ]
  return createElement(
    as,
    { className: cn("text-balance", className), "aria-label": [before, accent, after].join(" ").trim() },
    words.map(({ text, italic }, i) => (
      <span key={i} aria-hidden>
        <motion.span
          className="inline-block"
          initial={reduce ? false : { opacity: 0, y: distance, filter: `blur(${blur}px)` }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-10% 0px" }}
          transition={{ duration, ease: [0.22, 1, 0.36, 1], delay: delay + stagger * i }}
        >
          {italic ? <Accent>{text}</Accent> : text}
        </motion.span>
        {i < words.length - 1 ? " " : ""}
      </span>
    )),
  )
}
