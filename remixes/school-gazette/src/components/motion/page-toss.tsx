import { animate, useReducedMotion } from "motion/react"
import { useLayoutEffect, useRef, type ReactNode } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * The opening move: the front page is thrown onto the desk and spins to rest.
 *
 * Read off the reference recording at 15fps — it is upside down for the first
 * third of a second, crosses upright at ~0.5s, overshoots about 6° and has
 * settled flat by ~1.15s, scaling up from half size the whole way. That is an
 * ease-out with a late overshoot, so: rotation keyframes [-start, +6°, 0] at
 * [0, .8, 1] on `--ease-out`, scale 0.5 → 1 on the same clock.
 *
 * Every number is a scalar prop, so the editor can retune it. The transform is
 * removed when it lands — a transformed ancestor would break `position:
 * sticky` and `fixed` for everything inside the page.
 */
export function PageToss({
  children,
  duration = 1.15,
  spin = 420,
  startScale = 0.5,
  overshoot = 6,
  enabled = true,
  className,
}: {
  children: ReactNode
  /** seconds */
  duration?: number
  /** degrees of rotation to unwind */
  spin?: number
  startScale?: number
  /** degrees past flat before it settles */
  overshoot?: number
  enabled?: boolean
  className?: string
}) {
  const sheet = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const run = useRef<ReturnType<typeof animate> | null>(null)

  const play = () => {
    const el = sheet.current
    if (!el) return
    run.current?.stop()
    document.documentElement.style.overflow = "hidden"
    el.style.transformOrigin = `50% ${Math.round(window.innerHeight / 2)}px`
    run.current = animate(
      el,
      {
        rotate: [-spin, overshoot, 0],
        scale: [startScale, 1.01, 1],
        opacity: [0, 1, 1],
      },
      { duration, ease: [0.23, 1, 0.32, 1], times: [0, 0.8, 1] },
    )
    run.current.then(() => {
      el.style.transform = ""
      el.style.opacity = ""
      el.style.transformOrigin = ""
      document.documentElement.style.overflow = ""
    })
  }

  // The hidden state, as a switch: replay the toss from the editor.
  useCanvasAction("Replay page toss", () => play(), { group: "Page" })

  useLayoutEffect(() => {
    if (!enabled || reduced || designing) return
    play()
    return () => {
      run.current?.stop()
      document.documentElement.style.overflow = ""
    }
    // The toss is a mount effect; its numbers are read when it runs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enabled, reduced, designing, duration, spin, startScale, overshoot])

  return (
    <div ref={sheet} data-canvas-ignore className={cn("paper-sheet relative will-change-transform", className)}>
      {children}
    </div>
  )
}
