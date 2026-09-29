import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "motion/react"

/**
 * Easings and durations shared by every animation on the page. They mirror the
 * `--ease-*` tokens in `index.css`.
 */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_REVEAL: [number, number, number, number] = [0.76, 0, 0.24, 1]

export const DURATION = {
  letter: 0.9,
  letterStagger: 0.035,
  archRise: 0.5,
  archHold: 0.6,
  archOpen: 0.7,
  script: 1.4,
}

const LenisContext = createContext<Lenis | null>(null)

/** The Lenis instance carrying the page's scroll, or null before it starts. */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Lenis carries the scroll: a heavy, slow-settling glide. Held in a ref (and
 * state, for the context) so it survives re-renders and is torn down on unmount.
 */
export function SmoothScroll({ children }: { children: ReactNode }) {
  const reduce = useReducedMotion()
  const ref = useRef<Lenis | null>(null)
  const [lenis, setLenis] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduce) return
    ref.current = new Lenis({ autoRaf: true, lerp: 0.075, wheelMultiplier: 0.9 })
    setLenis(ref.current)
    return () => {
      ref.current?.destroy()
      ref.current = null
      setLenis(null)
    }
  }, [reduce])

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>
}

/** Scroll to an element or a position, through Lenis when it is running. */
export function scrollToTarget(lenis: Lenis | null, target: string | number | HTMLElement) {
  if (lenis) {
    lenis.scrollTo(target, { duration: 1.6, easing: (t) => 1 - Math.pow(1 - t, 4) })
    return
  }
  if (typeof target === "number") window.scrollTo({ top: target, behavior: "smooth" })
  else {
    const el = typeof target === "string" ? document.querySelector(target) : target
    el?.scrollIntoView({ behavior: "smooth" })
  }
}
