import { useEffect, useRef } from "react"
import Lenis from "lenis"
import { LENIS_OPTIONS } from "@/lib/motion"

/**
 * Lenis carries the scroll. Kept in a ref so the instance stays reachable from
 * the tree (and so a scene can stop it while the opening plays), and skipped
 * entirely for reduced motion, where the browser's own scroll is the right one.
 */
export function useSmoothScroll() {
  const lenis = useRef<Lenis | null>(null)
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const instance = new Lenis(LENIS_OPTIONS)
    lenis.current = instance
    window.__lenis = instance
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      lenis.current = null
      window.__lenis = undefined
    }
  }, [])
  return lenis
}

declare global {
  interface Window {
    __lenis?: Lenis
  }
}
