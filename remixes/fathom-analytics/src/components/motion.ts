/**
 * Smooth scroll: Lenis, held in a ref for the component's lifetime so the
 * editor's Motion switch can find and stop it, and torn down on unmount.
 * Tuned to a heavy, weighted feel (low lerp). Skipped under reduced motion.
 */
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(lerp = 0.085): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier: 0.95 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp])
}
