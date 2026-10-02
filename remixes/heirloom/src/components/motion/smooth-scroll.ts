import { useReducedMotion } from "motion/react"
import { useEffect, useRef } from "react"
import Lenis from "lenis"

/** Lenis carries the scroll. Held in a ref for the page's lifetime so the
 *  editor's Motion switch can find it, and skipped for reduced motion. */
export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  const reduce = useReducedMotion()
  useEffect(() => {
    if (reduce) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.085, wheelMultiplier: 0.9 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [reduce])
}
