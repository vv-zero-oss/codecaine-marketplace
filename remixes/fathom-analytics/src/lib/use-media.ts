import { useSyncExternalStore } from "react"

/** A media query as a boolean, safe to read during render. */
export function useMedia(query: string, server = false): boolean {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query)
      list.addEventListener("change", notify)
      return () => list.removeEventListener("change", notify)
    },
    () => window.matchMedia(query).matches,
    () => server,
  )
}

/** The pinned, scroll-scrubbed layouts need room and motion; below this, or with reduced motion, sections stack. */
export function usePinned(): boolean {
  const wide = useMedia("(min-width: 900px)")
  const reduce = useMedia("(prefers-reduced-motion: reduce)")
  return wide && !reduce
}
