/**
 * Lenis carries the page's scroll.
 *
 * It is a `requestAnimationFrame` loop, so the instance is held in a ref for
 * the component's lifetime and destroyed on unmount — which is what lets the
 * editor's SDK find it and stop it from the Motion switch. The softer `lerp`
 * gives the long dusk-sky hero its weight; reduced motion turns it off.
 */
import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.09, wheelMultiplier: 0.95 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
