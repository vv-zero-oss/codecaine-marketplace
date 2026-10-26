import type Lenis from "lenis"

/**
 * The page's Lenis instance, when there is one, so a click that jumps the
 * page (a hero tab, a chapter link) moves with the same feel as the wheel.
 */
let current: Lenis | null = null

export function registerLenis(lenis: Lenis | null) {
  current = lenis
}

export function scrollToY(y: number, immediate = false) {
  if (current) current.scrollTo(y, { immediate, duration: 1.1 })
  else window.scrollTo({ top: y, behavior: immediate ? "auto" : "smooth" })
}
