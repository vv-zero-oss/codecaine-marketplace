import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The pieces every diagram scene is drawn with: a group that blurs in and out
 * with its beat, a connector that draws itself, a node, and a mono pill. Each
 * diagram lays out on its own fixed board (`width` × `height`) and the scene
 * scales that board to the screen.
 */

/** A group that belongs to one or more beats: blurs in when it arrives, out when it leaves. */
export function Beat({ when, children, className }: { when: boolean; children: React.ReactNode; className?: string }) {
  return (
    <AnimatePresence>
      {when && (
        <motion.div
          className={cn("absolute inset-0", className)}
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.45, ease: EASE_SWAP }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** A connector that draws itself in — the line is the explanation, so it moves. */
export function Wire({
  d,
  width,
  height,
  className,
  dashed,
  delay = 0,
}: {
  d: string
  width: number
  height: number
  className?: string
  dashed?: boolean
  delay?: number
}) {
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} aria-hidden>
      <motion.path
        d={d}
        fill="none"
        strokeWidth={1.5}
        strokeDasharray={dashed ? "5 6" : undefined}
        className={className}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.55, delay, ease: EASE_SWAP }}
      />
    </svg>
  )
}

export function Dot({ x, y, width, height, className }: { x: number; y: number; width: number; height: number; className?: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={width} height={height} aria-hidden>
      <circle cx={x} cy={y} r={8} strokeWidth={1.5} className={cn("fill-paper", className)} />
    </svg>
  )
}

/** The small mono label a diagram names things with (SRC, DESKTOP, …). */
export function Pill({ className, children, style }: { className?: string; children: React.ReactNode; style?: React.CSSProperties }) {
  return (
    <span
      style={style}
      className={cn(
        "absolute rounded-pill border px-2.5 py-0.5 font-mono text-[12px] leading-4 font-medium tracking-wide whitespace-nowrap",
        className,
      )}
    >
      {children}
    </span>
  )
}

/** Scales a fixed diagram board to fit the screen, centred. */
export function Board({
  width,
  height,
  scale,
  top,
  children,
  className,
}: {
  width: number
  height: number
  scale: number
  top: number | string
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn("absolute left-1/2 origin-top", className)}
      style={{ top, width, height, transform: `translateX(-50%) scale(${scale})` }}
    >
      {children}
    </div>
  )
}
