import { useSyncExternalStore } from "react"

/**
 * Whether the intro has finished, for anything that waits for it — the
 * wall holds its entrance until the vessel has scattered. Once a session:
 * a second visit, a reload or a page opened in the editor starts with it
 * already done.
 */
const KEY = "kiln:intro-seen"
let done = readSeen()
const listeners = new Set<() => void>()

function readSeen() {
  try {
    return window.sessionStorage.getItem(KEY) === "1"
  } catch {
    return false
  }
}

export function finishIntro() {
  if (done) return
  done = true
  try {
    window.sessionStorage.setItem(KEY, "1")
  } catch {
    /* private mode: the intro simply plays again next time */
  }
  listeners.forEach((l) => l())
}

/** Puts the intro back, so the editor's "Replay intro" can show it again. */
export function resetIntro() {
  done = false
  try {
    window.sessionStorage.removeItem(KEY)
  } catch {
    /* ignore */
  }
  listeners.forEach((l) => l())
}

export function useIntroDone() {
  return useSyncExternalStore(
    (l) => {
      listeners.add(l)
      return () => listeners.delete(l)
    },
    () => done,
    () => true,
  )
}
