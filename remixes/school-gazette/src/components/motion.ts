/**
 * Lenis carries the scroll, held in a ref for the component's lifetime and
 * destroyed on unmount — a `requestAnimationFrame` loop the editor can only
 * stop if something in React's tree is holding it. Reduced motion falls back
 * to the browser's own scroll.
 */
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, anchors: true, lerp: 0.085, wheelMultiplier: 0.95 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
