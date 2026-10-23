/**
 * Smooth scroll, and the one hook every cycling component shares.
 *
 * Lenis is a `requestAnimationFrame` loop, so it is held in a ref for the
 * page's lifetime and destroyed on unmount — that is what lets the editor's
 * Motion switch find it and stop it. Everything else on the page moves through
 * Framer Motion or CSS, which the editor already controls.
 */
import { useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"
import Lenis from "lenis"
import { useCanvasDesignMode } from "@canvas/react"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  const reduced = useReducedMotion()
  useEffect(() => {
    if (reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.95 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [reduced])
}

/** True when nothing on the page should move on its own: reduced motion, or the
 *  editor is being used to design the page and a held frame is easier to style. */
export function useStill(): boolean {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  return Boolean(reduced) || designing
}

/** An index that steps through `count` items every `seconds`, unless paused.
 *  `index` can be set directly, which restarts the clock. */
export function useCycle(count: number, seconds: number, paused = false) {
  const [index, setIndex] = useState(0)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    if (paused || count < 2) return
    const timer = window.setTimeout(() => setIndex((i) => (i + 1) % count), seconds * 1000)
    return () => window.clearTimeout(timer)
  }, [index, tick, count, seconds, paused])
  const set = (next: number) => {
    setIndex(next)
    setTick((t) => t + 1)
  }
  return [index % Math.max(count, 1), set] as const
}
