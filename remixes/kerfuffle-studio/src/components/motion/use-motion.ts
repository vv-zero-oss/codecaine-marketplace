import { useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"

/**
 * Whether something that runs on its own timer (an interval, an autoplay)
 * should run: not under reduced motion — the query, which the editor's
 * Reduced mode answers yes — and not while the editor's Motion switch holds
 * the page still.
 */
export function useMotionAllowed() {
  const reduced = useReducedMotion()
  const { motion, designing } = useCanvasDesignMode()
  return { allowed: !reduced && motion === "play", reduced: !!reduced || motion === "reduce", designing }
}
