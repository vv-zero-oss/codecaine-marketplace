import { useEffect, useRef, useState } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

const DRUM = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789-:"

/** One cell of the board. It turns through the drum, one leaf at a time, from
 *  the letter it shows to the one it is told — the way a real board does. */
function Flap({ char, step, size, dim }: { char: string; step: number; size: "md" | "lg"; dim: boolean }) {
  const [shown, setShown] = useState(" ")
  const [flipping, setFlipping] = useState(false)
  const target = char.toUpperCase()

  useEffect(() => {
    if (shown === target) return
    const id = window.setTimeout(() => {
      const from = DRUM.indexOf(shown)
      const to = DRUM.indexOf(target)
      // turn forward round the drum; skip ahead if it's a long way
      const distance = (to - from + DRUM.length) % DRUM.length
      const next = distance > 8 ? DRUM[(to - 6 + DRUM.length) % DRUM.length] : DRUM[(from + 1) % DRUM.length]
      setShown(to < 0 ? target : next)
      setFlipping(true)
    }, step)
    return () => window.clearTimeout(id)
  }, [shown, target, step])

  useEffect(() => {
    if (!flipping) return
    const id = window.setTimeout(() => setFlipping(false), step * 0.9)
    return () => window.clearTimeout(id)
  }, [flipping, step])

  return (
    <span
      className={cn(
        "relative grid place-items-center overflow-hidden rounded-[0.14em] bg-[linear-gradient(180deg,#1a1033_0%,#120a28_49%,#0a0418_51%,#140b2c_100%)] font-data font-semibold text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.08),0_6px_14px_-6px_rgb(0_0_0/0.6)] [perspective:300px]",
        size === "lg" ? "h-[1.45em] w-[1.05em]" : "h-[1.4em] w-[0.95em]",
        dim && "text-white/35",
      )}
    >
      <span
        className="transition-transform ease-(--ease-out-strong)"
        style={{ transform: flipping ? "rotateX(-70deg)" : "rotateX(0deg)", transitionDuration: flipping ? "0ms" : `${step * 0.85}ms`, transformOrigin: "50% 52%" }}
      >
        {shown === " " ? " " : shown}
      </span>
      <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-black/70" />
      <span aria-hidden className="absolute top-1/2 left-0 h-[0.18em] w-[0.08em] -translate-y-1/2 rounded-r-sm bg-white/15" />
      <span aria-hidden className="absolute top-1/2 right-0 h-[0.18em] w-[0.08em] -translate-y-1/2 rounded-l-sm bg-white/15" />
    </span>
  )
}

/**
 * A split-flap board: a word that clatters into place, cell by cell, when it
 * scrolls into view or changes. `dimFrom` greys out the cells from that index
 * on — "32" bright, "HRS" quiet, as the board in the delay report reads.
 */
export function SplitFlap({
  text = "32HRS",
  /** Milliseconds per leaf. */
  step = 70,
  /** Milliseconds between one cell starting and the next. */
  stagger = 90,
  dimFrom = 2,
  size = "lg",
  className,
}: {
  text?: string
  step?: number
  stagger?: number
  dimFrom?: number
  size?: "md" | "lg"
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -15% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const [started, setStarted] = useState<boolean[]>([])

  useEffect(() => {
    if (!inView && !still) return
    const timers = [...text].map((_, i) => window.setTimeout(() => setStarted((s) => Object.assign([...s], { [i]: true })), still ? 0 : i * stagger))
    return () => timers.forEach(window.clearTimeout)
  }, [inView, text, stagger, still])

  return (
    <span ref={ref} role="img" aria-label={text} className={cn("inline-flex gap-[0.12em]", className)}>
      {[...text].map((c, i) => (
        <Flap key={i} char={started[i] ? c : " "} step={still ? 0 : step} size={size} dim={i >= dimFrom} />
      ))}
    </span>
  )
}
