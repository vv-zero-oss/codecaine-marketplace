import { navigate } from "@/lib/router"

/**
 * Leaving a page with a goodbye.
 *
 * The grid fades its portraits out in a scattered order before the next page
 * appears; a page that wants that registers an exit here while it is mounted,
 * and every in-site link goes through `go()`. A page with no exit changes
 * straight away.
 */
let exit: ((done: () => void) => void) | null = null
let leaving = false

export function registerExit(handler: (done: () => void) => void) {
  exit = handler
  return () => {
    if (exit === handler) exit = null
  }
}

export function go(to: string) {
  if (leaving) return
  if (!exit) {
    navigate(to)
    return
  }
  leaving = true
  const run = exit
  exit = null
  run(() => {
    leaving = false
    navigate(to)
  })
}
