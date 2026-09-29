import Lenis from "lenis"
import { useEffect } from "react"

/**
 * The motion tokens, for the code that animates from TypeScript. They are the
 * same curves as `--ease-*` in `index.css`, as the arrays Framer Motion takes.
 */
export const ease = {
  outQuart: [0.25, 1, 0.5, 1],
  outExpo: [0.16, 1, 0.3, 1],
  inOutQuart: [0.76, 0, 0.24, 1],
} as const

export const duration = {
  fast: 0.16,
  base: 0.32,
  slow: 0.7,
} as const

export function prefersReducedMotion() {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches
}

let lenis: Lenis | null = null

/** The page's Lenis instance, when one is running — for a scroll-to or a stop. */
export function getLenis() {
  return lenis
}

/**
 * Smooth scroll for the pages that scroll: the list, a story, the about page.
 * The grid and the gallery drive their own motion and turn it off.
 *
 * `lerp` 0.1 is a soft, slightly heavy glide — the page settles rather than
 * stops. Reduced motion gets the browser's own scroll.
 */
export function useSmoothScroll(enabled = true) {
  useEffect(() => {
    if (!enabled || prefersReducedMotion()) return
    const instance = new Lenis({ lerp: 0.1, wheelMultiplier: 1, touchMultiplier: 1.4 })
    lenis = instance
    let frame = requestAnimationFrame(function loop(time) {
      instance.raf(time)
      frame = requestAnimationFrame(loop)
    })
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      if (lenis === instance) lenis = null
    }
  }, [enabled])
}
