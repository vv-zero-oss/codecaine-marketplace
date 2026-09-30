import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"
import Lenis from "lenis"
import { useReducedMotion } from "motion/react"

/** Easings shared by every animation. They mirror the `--ease-*` tokens in `index.css`. */
export const EASE_OUT: [number, number, number, number] = [0.22, 1, 0.36, 1]
export const EASE_IN_OUT: [number, number, number, number] = [0.65, 0, 0.35, 1]

/** Named curves, for components that expose `easing` as a prop. */
export const EASINGS = {
  out: EASE_OUT,
  "in-out": EASE_IN_OUT,
  linear: [0, 0, 1, 1] as [number, number, number, number],
}
export type EasingName = keyof typeof EASINGS

const LenisContext = createContext<Lenis | null>(null)

/** The Lenis instance carrying the page's scroll, or null before it starts. */
export function useLenis() {
  return useContext(LenisContext)
}

/** Scroll to an anchor through Lenis when it is running, natively otherwise. */
export function useScrollTo() {
  const lenis = useLenis()
  return (target: string) => {
    const el = document.querySelector(target) as HTMLElement | null
    if (!el) return
    if (lenis) lenis.scrollTo(el, { offset: -8, duration: 1.4 })
    else el.scrollIntoView({ behavior: "smooth" })
  }
}

/**
 * Lenis carries the scroll — a light glide, close to the recording's feel
 * (it settles in roughly a third of a second). Held in a ref (and state, for
 * the context) so the editor's Motion switch can find and pause it. Off under
 * reduced motion.
 */
export function SmoothScroll({ lerp = 0.12, children }: { lerp?: number; children: ReactNode }) {
  const reduce = useReducedMotion()
  const lenis = useRef<Lenis | null>(null)
  const [instance, setInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduce) return
    lenis.current = new Lenis({ autoRaf: true, lerp })
    setInstance(lenis.current)
    return () => {
      lenis.current?.destroy()
      lenis.current = null
      setInstance(null)
    }
  }, [reduce, lerp])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}

/** Matches a media query live — for toning scroll effects down on phones. */
export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() =>
    typeof window === "undefined" ? false : window.matchMedia(query).matches,
  )
  useEffect(() => {
    const mql = window.matchMedia(query)
    const on = () => setMatches(mql.matches)
    on()
    mql.addEventListener("change", on)
    return () => mql.removeEventListener("change", on)
  }, [query])
  return matches
}
