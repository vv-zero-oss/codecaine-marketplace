/**
 * The motion tokens in `index.css`, read back for JavaScript.
 *
 * Framer Motion and the WebGL stage need numbers, not CSS strings; these read
 * the custom properties once so a curve changed in the stylesheet changes
 * here too. The fallbacks are the same values, for the first render.
 */

type Bezier = [number, number, number, number]

let styles: CSSStyleDeclaration | null = null
function read(name: string) {
  styles ??= getComputedStyle(document.documentElement)
  return styles.getPropertyValue(name).trim()
}

function bezier(name: string, fallback: Bezier): Bezier {
  const match = read(name).match(/cubic-bezier\(([^)]+)\)/)
  if (!match) return fallback
  const values = match[1].split(",").map(Number)
  return values.length === 4 && values.every(Number.isFinite) ? (values as Bezier) : fallback
}

function ms(name: string, fallback: number) {
  const value = parseFloat(read(name))
  return Number.isFinite(value) ? value : fallback
}

export const ease = {
  get out() {
    return bezier("--ease-out", [0.22, 1, 0.36, 1])
  },
  get inOut() {
    return bezier("--ease-in-out", [0.65, 0, 0.35, 1])
  },
  get snap() {
    return bezier("--ease-snap", [0.32, 0.72, 0, 1])
  },
}

export const duration = {
  get dismiss() {
    return ms("--dur-dismiss", 270)
  },
  get reveal() {
    return ms("--dur-reveal", 330)
  },
  get letter() {
    return ms("--dur-letter", 520)
  },
  get slide() {
    return ms("--dur-slide", 640)
  },
  get stagger() {
    return ms("--stagger-letter", 55)
  },
}

/** A cubic-bezier as a function of t, for loops that are not Framer Motion's. */
export function cubic([x1, y1, x2, y2]: Bezier) {
  const sample = (a: number, b: number, t: number) => 3 * a * (1 - t) ** 2 * t + 3 * b * (1 - t) * t ** 2 + t ** 3
  return (x: number) => {
    if (x <= 0) return 0
    if (x >= 1) return 1
    let lo = 0
    let hi = 1
    for (let i = 0; i < 20; i++) {
      const mid = (lo + hi) / 2
      if (sample(x1, x2, mid) < x) lo = mid
      else hi = mid
    }
    return sample(y1, y2, (lo + hi) / 2)
  }
}

export const prefersReducedMotion = () => window.matchMedia("(prefers-reduced-motion: reduce)").matches
