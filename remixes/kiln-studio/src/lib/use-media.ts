import { useSyncExternalStore } from "react"

/** Whether a media query matches, live. */
export function useMedia(query: string, server = false) {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query)
      mql.addEventListener("change", onChange)
      return () => mql.removeEventListener("change", onChange)
    },
    () => window.matchMedia(query).matches,
    () => server,
  )
}
