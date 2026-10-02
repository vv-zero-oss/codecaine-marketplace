import { useEffect, useRef } from "react"
import Lenis from "lenis"

/**
 * Lenis carries the page scroll. The instance is held in a ref for the page's
 * lifetime, so the editor's Motion switch can find it and stop it; it is torn
 * down on unmount and left off entirely under reduced motion.
 */
export function useSmoothScroll(lerp = 0.1): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [lerp])
}
