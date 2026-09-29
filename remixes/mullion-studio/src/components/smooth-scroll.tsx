import Lenis from "lenis"
import { createContext, useContext, useEffect, useRef, type ReactNode } from "react"

/**
 * Lenis carries the page's scroll. It is kept in a ref (and handed out through
 * context) so the header can scroll to a section, and so an editor framing the
 * page can find the instance the project holds.
 */
type ScrollTo = (target: string | number, options?: { offset?: number; immediate?: boolean }) => void

type ScrollApi = { scrollTo: ScrollTo; setLocked: (locked: boolean) => void }

const ScrollContext = createContext<ScrollApi>({
  scrollTo: (target) => {
    if (typeof target === "number") window.scrollTo({ top: target })
    else document.querySelector(target)?.scrollIntoView()
  },
  setLocked: () => {},
})

export function SmoothScroll({ children }: { children: ReactNode }) {
  const lenis = useRef<Lenis | null>(null)

  const locked = useRef(false)

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual"
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    // A heavy, even glide — slower to settle than the default, like the
    // archive's own scroll.
    const instance = new Lenis({ lerp: 0.085, wheelMultiplier: 0.9, touchMultiplier: 1.2 })
    lenis.current = instance
    if (locked.current) instance.stop()
    let frame = requestAnimationFrame(function raf(time) {
      instance.raf(time)
      frame = requestAnimationFrame(raf)
    })
    return () => {
      cancelAnimationFrame(frame)
      instance.destroy()
      lenis.current = null
    }
  }, [])

  const scrollTo: ScrollTo = (target, options) => {
    if (lenis.current) {
      lenis.current.scrollTo(target, { offset: options?.offset ?? 0, immediate: options?.immediate, duration: 1.4 })
      return
    }
    if (typeof target === "number") window.scrollTo({ top: target })
    else document.querySelector(target)?.scrollIntoView()
  }

  // Stops the page scrolling (the intro holds it while it plays).
  const setLocked = (value: boolean) => {
    locked.current = value
    document.documentElement.style.overflow = value ? "hidden" : ""
    if (value) lenis.current?.stop()
    else lenis.current?.start()
  }

  return <ScrollContext.Provider value={{ scrollTo, setLocked }}>{children}</ScrollContext.Provider>
}

export const useScrollTo = () => useContext(ScrollContext).scrollTo
export const useScrollLock = () => useContext(ScrollContext).setLocked
