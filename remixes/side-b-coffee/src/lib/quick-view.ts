import { useSyncExternalStore } from "react"

/**
 * Which coffee's quick view is open, if any. One dialog for the whole site
 * (mounted in App), opened from any card on any page.
 */
let current: string | null = null
const listeners = new Set<() => void>()

export const quickView = {
  open(id: string) {
    current = id
    listeners.forEach((l) => l())
  },
  close() {
    current = null
    listeners.forEach((l) => l())
  },
}

export function useQuickView() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => current,
  )
}
