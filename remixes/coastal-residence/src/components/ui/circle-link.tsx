import { motion, useReducedMotion } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The round call to action: a hairline circle with two short arcs that turn
 * slowly, and speed up and close in on hover.
 */
export function CircleLink({
  children,
  className,
  tone = "ink",
  ...props
}: React.ComponentProps<"a"> & { tone?: "ink" | "light" }) {
  const reduce = useReducedMotion()
  return (
    <a
      className={cn(
        "group relative grid size-40 shrink-0 place-items-center rounded-full text-center sm:size-56",
        tone === "ink" ? "text-ink" : "text-paper",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 rounded-full border border-current opacity-15 transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-95" />
      <motion.svg
        viewBox="0 0 100 100"
        className="absolute inset-0 size-full transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:scale-90"
        animate={reduce ? undefined : { rotate: 360 }}
        transition={{ duration: 18, ease: "linear", repeat: Infinity }}
        aria-hidden="true"
      >
        <path d="M 14 30 A 42 42 0 0 1 22 20" stroke="currentColor" strokeWidth={0.6} fill="none" />
        <path d="M 86 70 A 42 42 0 0 1 78 80" stroke="currentColor" strokeWidth={0.6} fill="none" />
      </motion.svg>
      <span className="label relative max-w-[9rem] transition-transform duration-300 ease-[var(--ease-out-soft)] group-active:scale-95">
        {children}
      </span>
    </a>
  )
}
