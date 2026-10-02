/**
 * Lenis carries the page's scroll.
 *
 * It is a `requestAnimationFrame` loop owned by a bundled module, so it is
 * held in a ref for the page's lifetime and destroyed on unmount — that is
 * what lets the editor's SDK find it and pause it from the Motion switch.
 */

import { useEffect, useRef } from "react"
import Lenis from "lenis"

export function useSmoothScroll(): void {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    if (reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp: 0.1, wheelMultiplier: 0.95 })
    return () => {
      lenis.current?.destroy()
      lenis.current = null
    }
  }, [])
}
