import { useSyncExternalStore } from "react"

export type Theme = "light" | "dark"

const KEY = "vantage-theme"
const listeners = new Set<() => void>()

function read(): Theme {
  try {
    const saved = localStorage.getItem(KEY)
    if (saved === "light" || saved === "dark") return saved
  } catch {
    // Storage can be blocked; fall through to the system preference.
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
}

let current: Theme = read()
document.documentElement.dataset.theme = current

function set(next: Theme) {
  current = next
  document.documentElement.dataset.theme = next
  try {
    localStorage.setItem(KEY, next)
  } catch {
    // Applied, just not remembered.
  }
  listeners.forEach((l) => l())
}

/** The page theme: remembered, written to `data-theme` on <html>, shared by every caller. */
export function useTheme() {
  const theme = useSyncExternalStore(
    (cb) => (listeners.add(cb), () => listeners.delete(cb)),
    () => current,
  )
  return { theme, setTheme: set, toggle: () => set(current === "dark" ? "light" : "dark") }
}
