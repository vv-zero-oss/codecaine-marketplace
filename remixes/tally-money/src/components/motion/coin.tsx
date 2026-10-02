import { motion, useAnimate, useReducedMotion } from "motion/react"
import { useRef, useState } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { Coin } from "@/components/illustrations/objects"
import { cn } from "@/lib/utils"

/**
 * A coin that turns on its vertical axis, and can be tossed.
 * `duration` is seconds per idle turn, `tilt` the resting angle, `height` the toss in px.
 * Purpose: delight, once, at the end of the page.
 */
export function SpinningCoin({ duration = 3.2, tilt = -12, height = 120, className }: { duration?: number; tilt?: number; height?: number; className?: string }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const hold = reduced || designing
  const [scope, animate] = useAnimate<HTMLDivElement>()
  const [result, setResult] = useState<string | null>(null)
  const [tosses, setTosses] = useState(0)
  const busy = useRef(false)

  const toss = async () => {
    if (busy.current) return
    busy.current = true
    setResult(null)
    const heads = Math.random() < 0.5
    if (!hold) {
      await animate(
        scope.current,
        { transform: ["translateY(0px) rotate(0deg)", `translateY(-${height}px) rotate(540deg)`, "translateY(0px) rotate(1080deg)"] },
        { duration: 0.9, times: [0, 0.5, 1], ease: ["circOut", "circIn"] },
      )
      // Squash on landing, then settle.
      await animate(scope.current, { transform: ["translateY(0px) scale(1.08, 0.92)", "translateY(0px) scale(1)"] }, { duration: 0.18, ease: [0.23, 1, 0.32, 1] })
    }
    setResult(heads ? "Heads" : "Tails")
    setTosses((n) => n + 1)
    busy.current = false
  }

  return (
    <div className={cn("flex flex-col items-center", className)}>
      <button type="button" onClick={toss} aria-label="Toss the coin" className="block w-full cursor-pointer rounded-full focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-4 focus-visible:outline-none">
        <div ref={scope}>
          <motion.div
            style={{ rotate: tilt }}
            animate={hold ? { rotateY: 0 } : { rotateY: 360 }}
            transition={hold ? { duration: 0 } : { duration, ease: "linear", repeat: Infinity }}
          >
            <Coin className="h-auto w-full drop-shadow-[0_8px_8px_rgb(27_31_72/0.15)]" />
          </motion.div>
        </div>
      </button>
      <p aria-live="polite" className="mt-3 h-5 text-xs font-semibold tracking-wide text-ink-400 uppercase">
        {result ? <span className="text-ink-900">{result} · {tosses} {tosses === 1 ? "toss" : "tosses"}</span> : "Tap to toss"}
      </p>
    </div>
  )
}
