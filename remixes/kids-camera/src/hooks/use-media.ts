import { useSyncExternalStore } from "react"

/** A media query as state. The scroll-pinned sections use it to fall back to
 *  a plain stacked layout on small screens and under reduced motion. */
export function useMedia(query: string, fallback = false) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", notify)
      return () => list.removeEventListener("change", notify)
    },
    () => window.matchMedia(query).matches,
    () => fallback,
  )
}

/** Wide enough, and allowed, to run the pinned scroll scenes. */
export function useScrollScenes() {
  const wide = useMedia("(min-width: 768px)")
  const reduced = useMedia("(prefers-reduced-motion: reduce)")
  return wide && !reduced
}
