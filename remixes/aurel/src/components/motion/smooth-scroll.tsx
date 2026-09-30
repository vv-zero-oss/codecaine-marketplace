import Lenis from "lenis"
import { useReducedMotion } from "motion/react"
import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react"

const LenisContext = createContext<Lenis | null>(null)

/** The page's Lenis, for a component that needs to scroll it (null when the
 *  visitor prefers reduced motion and the browser scrolls natively). */
export function useLenis() {
  return useContext(LenisContext)
}

/**
 * Smooth scroll for the whole site.
 *
 * The recording scrolls heavily and settles slowly, so `lerp` is low. Lenis
 * is held in a ref (and in state for the context) for the component's
 * lifetime, which is where the canvas editor's SDK finds it to pause it.
 * `resetKey` jumps back to the top without easing when the page changes.
 */
export function SmoothScroll({
  children,
  lerp = 0.08,
  wheelMultiplier = 0.9,
  resetKey = "",
}: {
  children: ReactNode
  lerp?: number
  wheelMultiplier?: number
  resetKey?: string
}) {
  const reduced = useReducedMotion()
  const lenis = useRef<Lenis | null>(null)
  const [instance, setInstance] = useState<Lenis | null>(null)

  useEffect(() => {
    if (reduced) return
    lenis.current = new Lenis({ autoRaf: true, lerp, wheelMultiplier, anchors: true })
    setInstance(lenis.current)
    return () => {
      lenis.current?.destroy()
      lenis.current = null
      setInstance(null)
    }
  }, [reduced, lerp, wheelMultiplier])

  useEffect(() => {
    lenis.current?.scrollTo(0, { immediate: true, force: true })
    lenis.current?.resize()
  }, [resetKey])

  return <LenisContext.Provider value={instance}>{children}</LenisContext.Provider>
}
