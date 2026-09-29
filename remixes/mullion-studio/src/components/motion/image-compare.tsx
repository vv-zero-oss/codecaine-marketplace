import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"

import { EASINGS, type EasingName } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A raw frame and its edit, one over the other, split by a hairline you drag.
 *
 * The raw side is the same photograph with the `beforeFilter` applied, so the
 * two halves always line up to the pixel. Whenever the photograph changes, the
 * new pair is wiped in behind a black rule sweeping left to right.
 *
 * `position` (0–100) is where the split sits; the studio drives it from its
 * timeline, and the editor can set it directly.
 */
export function ImageCompare({
  src,
  alt = "",
  beforeFilter = "grayscale(0.8) brightness(0.8)",
  position = 50,
  beforeLabel = "Raw",
  afterLabel = "Edit",
  revealDuration = 0.8,
  revealEasing = "in-out",
  onPositionChange,
  className,
}: {
  src: string
  alt?: string
  beforeFilter?: string
  position?: number
  beforeLabel?: string
  afterLabel?: string
  revealDuration?: number
  revealEasing?: EasingName
  onPositionChange?: (position: number) => void
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [dragging, setDragging] = useState(false)
  const reduced = useReducedMotion()
  const p = Math.max(0, Math.min(100, position))

  const setFromPointer = (clientX: number) => {
    const box = ref.current?.getBoundingClientRect()
    if (!box) return
    onPositionChange?.(((clientX - box.left) / box.width) * 100)
  }

  return (
    <div
      ref={ref}
      className={cn("relative touch-pan-y overflow-hidden bg-paper-2 select-none", dragging ? "cursor-grabbing" : "cursor-ew-resize", className)}
      onPointerDown={(e) => {
        ;(e.target as HTMLElement).setPointerCapture?.(e.pointerId)
        setDragging(true)
        setFromPointer(e.clientX)
      }}
      onPointerMove={(e) => dragging && setFromPointer(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
      role="slider"
      tabIndex={0}
      aria-label={`${beforeLabel} and ${afterLabel} comparison`}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(p)}
      onKeyDown={(e) => {
        if (e.key === "ArrowLeft") onPositionChange?.(p - 5)
        if (e.key === "ArrowRight") onPositionChange?.(p + 5)
      }}
    >
      <AnimatePresence initial={false}>
        <motion.div
          key={src}
          className="absolute inset-0"
          initial={reduced ? { opacity: 0 } : { clipPath: "inset(0 100% 0 0)" }}
          animate={reduced ? { opacity: 1 } : { clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: revealDuration, ease: EASINGS[revealEasing] }}
        >
          <img src={src} alt={alt} draggable={false} className="absolute inset-0 size-full object-cover" />
          <img
            src={src}
            alt=""
            aria-hidden
            draggable={false}
            className="absolute inset-0 size-full object-cover"
            style={{ filter: beforeFilter, clipPath: `inset(0 ${100 - p}% 0 0)` }}
          />
        </motion.div>
      </AnimatePresence>

      {/* The rule that sweeps the new pair in, riding the wipe's edge. */}
      {!reduced && (
        <motion.span
          key={`${src}-rule`}
          aria-hidden
          className="pointer-events-none absolute inset-y-0 w-[3px] -translate-x-full bg-ink"
          initial={{ left: "0%", opacity: 0 }}
          animate={{ left: "100%", opacity: [1, 1, 0] }}
          transition={{ duration: revealDuration, ease: EASINGS[revealEasing], opacity: { duration: revealDuration, times: [0, 0.9, 1] } }}
        />
      )}

      {/* The split. */}
      <div aria-hidden className="pointer-events-none absolute inset-y-0 w-px bg-paper" style={{ left: `${p}%` }}>
        <span
          className={cn(
            "absolute top-1/2 left-1/2 flex h-9 w-9 -translate-x-1/2 -translate-y-1/2 items-center justify-center bg-paper text-ui text-ink shadow-handle transition-transform duration-150",
            dragging && "scale-90",
          )}
        >
          ◂▸
        </span>
      </div>
      <span className="pointer-events-none absolute top-3 left-3 bg-paper px-1.5 py-0.5 text-label uppercase tracking-ui">{beforeLabel}</span>
      <span className="pointer-events-none absolute top-3 right-3 bg-ink px-1.5 py-0.5 text-label uppercase tracking-ui text-paper">{afterLabel}</span>
    </div>
  )
}
