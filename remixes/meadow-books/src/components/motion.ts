/**
 * Smooth scroll, owned by Lenis.
 *
 * Lenis drives itself from requestAnimationFrame, which an editor cannot stop
 * from outside the page — so the instance is held in a ref for the component's
 * lifetime and destroyed on unmount, and that is where the SDK finds it.
 * Reduced motion turns it off altogether.
 */

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.11, wheelMultiplier: 0.9 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
