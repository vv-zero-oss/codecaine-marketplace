import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"
import {
  createContext,
  useCallback,
  useContext,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
} from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

/**
 * The hero's cards fly into the work grid as you scroll.
 *
 * On a wide screen the first projects' pictures start life scattered and
 * tilted round the intro — parked on `FlightSlot`s — and the scroll carries
 * each one down into its own tile, straightening as it lands. It is the one
 * bold move on the page, and it says something: the pictures you saw first
 * *are* the work.
 *
 * Built as scroll-linked transforms on the picture itself, so the tile it
 * lands in is always the real, pickable element and nothing is duplicated.
 * Below `lg`, under reduced motion, or with `landed`, the pictures just sit
 * in their tiles.
 */

const Slots = createContext<{
  register: (id: string, el: HTMLElement | null) => void
  get: (id: string) => HTMLElement | undefined
  version: number
} | null>(null)

export function FlightProvider({ children }: { children: ReactNode }) {
  const slots = useRef(new Map<string, HTMLElement>())
  const [version, setVersion] = useState(0)
  const register = useCallback((id: string, el: HTMLElement | null) => {
    if (el) slots.current.set(id, el)
    else slots.current.delete(id)
    setVersion((v) => v + 1)
  }, [])
  const get = useCallback((id: string) => slots.current.get(id), [])
  return <Slots.Provider value={{ register, get, version }}>{children}</Slots.Provider>
}

/** Where a flying picture waits in the hero: an empty, tilted box. */
export function FlightSlot({
  id,
  top,
  left,
  right,
  rotate = 0,
  className,
}: {
  id: string
  top: string
  left?: string
  right?: string
  rotate?: number
  className?: string
}) {
  const slots = useContext(Slots)
  const register = slots?.register
  const ref = useCallback((el: HTMLDivElement | null) => register?.(id, el), [id, register])
  return (
    <div
      ref={ref}
      aria-hidden
      data-rotate={rotate}
      className={cn("pointer-events-none absolute hidden aspect-[4/5] w-48 lg:block", className)}
      style={{ top, left, right }}
    />
  )
}

type Delta = { dx: number; dy: number; scale: number; rotate: number; end: number }

const DESKTOP = "(min-width: 1024px)"

export function ScrollFlight({
  slot,
  landed = false,
  landAt = 0.55,
  className,
  children,
}: {
  /** The `FlightSlot` it starts from. */
  slot: string
  /** Hold it in its tile, whatever the scroll. */
  landed?: boolean
  /** Where in the viewport its tile is when it lands (0 top … 1 bottom). */
  landAt?: number
  className?: string
  children: ReactNode
}) {
  const slots = useContext(Slots)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const home = useRef<HTMLDivElement>(null)
  const [delta, setDelta] = useState<Delta | null>(null)
  const { scrollY } = useScroll()

  const off = landed || reduce || designing

  useLayoutEffect(() => {
    if (off || !slots) {
      setDelta(null)
      return
    }
    const measure = () => {
      const target = slots.get(slot)
      const el = home.current
      if (!target || !el || !window.matchMedia(DESKTOP).matches) {
        setDelta(null)
        return
      }
      const a = target.getBoundingClientRect()
      const b = el.getBoundingClientRect()
      const scroll = window.scrollY
      const top = b.top + scroll
      setDelta({
        dx: a.left + a.width / 2 - (b.left + b.width / 2),
        dy: a.top + a.height / 2 - (b.top + b.height / 2),
        scale: a.width / b.width,
        rotate: Number(target.dataset.rotate ?? 0),
        end: Math.max(1, top - window.innerHeight * landAt),
      })
    }
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(document.body)
    document.fonts?.ready.then(measure)
    window.addEventListener("resize", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("resize", measure)
    }
  }, [slot, off, landAt, slots, slots?.version])

  return (
    <div ref={home} className={cn("relative", className)}>
      {delta ? <Flying delta={delta} scrollY={scrollY}>{children}</Flying> : children}
    </div>
  )
}

function Flying({ delta, scrollY, children }: { delta: Delta; scrollY: MotionValue<number>; children: ReactNode }) {
  // 0 in the hero, 1 in the tile — eased so it leaves gently and lands softly.
  const progress = useTransform(scrollY, (y) => {
    const t = Math.min(1, Math.max(0, y / delta.end))
    return t < 0.5 ? 4 * t * t * t : 1 - (-2 * t + 2) ** 3 / 2
  })
  const x = useTransform(progress, (p) => delta.dx * (1 - p))
  const y = useTransform(progress, (p) => delta.dy * (1 - p))
  const scale = useTransform(progress, (p) => delta.scale + (1 - delta.scale) * p)
  const rotate = useTransform(progress, (p) => delta.rotate * (1 - p))
  return (
    <motion.div className="relative z-30" style={{ x, y, scale, rotate }}>
      {children}
    </motion.div>
  )
}
