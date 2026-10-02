import { useReducedMotion } from "motion/react"
import { useRef, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * Tilts toward the pointer in 3D: a polaroid you can pick up. `max` is the
 * steepest angle in degrees. It moves on pointer events only — no loop —
 * and does nothing under reduced motion or on touch.
 */
export function Tilt3D({
  children,
  max = 10,
  lift = 14,
  rest = 0,
  className,
}: {
  children: ReactNode
  max?: number
  /** px it rises toward the viewer while held */
  lift?: number
  /** resting rotation, degrees */
  rest?: number
  className?: string
}) {
  const el = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  const move = (event: React.PointerEvent) => {
    if (reduced || event.pointerType === "touch" || !el.current) return
    const box = el.current.getBoundingClientRect()
    const x = (event.clientX - box.left) / box.width - 0.5
    const y = (event.clientY - box.top) / box.height - 0.5
    el.current.style.transform = `rotate(${rest}deg) rotateX(${(-y * max).toFixed(2)}deg) rotateY(${(x * max).toFixed(2)}deg) translateZ(${lift}px)`
    el.current.style.transition = "transform 60ms linear"
  }
  const leave = () => {
    if (!el.current) return
    el.current.style.transition = "transform 500ms var(--ease-out)"
    el.current.style.transform = `rotate(${rest}deg)`
  }

  return (
    <div className="[perspective:900px]" onPointerMove={move} onPointerLeave={leave}>
      <div ref={el} className={cn("[transform-style:preserve-3d]", className)} style={{ transform: `rotate(${rest}deg)` }}>
        {children}
      </div>
    </div>
  )
}
