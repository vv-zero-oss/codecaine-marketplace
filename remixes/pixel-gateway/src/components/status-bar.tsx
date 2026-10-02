import { useMotionValueEvent, useScroll } from "motion/react"
import { useState } from "react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"

/**
 * The strip pinned to the bottom of the window. Its coordinates are tied to the
 * scroll — they drift as you go down the page, the way a flight tracker would —
 * and the heart blinks on a two-step.
 */
export function StatusBar({ origin = "Direct mode", product = "Secure Web Gateway" }: { origin?: string; product?: string }) {
  const { scrollYProgress } = useScroll()
  const [coords, setCoords] = useState("37.3861° N, -122.0839° W")
  useMotionValueEvent(scrollYProgress, "change", (p) => {
    const lat = 37.3861 + p * 0.4
    const lng = -122.0839 + p * 0.28
    setCoords(`${lat.toFixed(4)}° N, ${lng.toFixed(4)}° W`)
  })
  return (
    <div
      data-canvas-ignore
      className="fixed inset-x-0 bottom-0 z-40 flex h-(--status-h) items-center justify-between gap-4 border-t-2 border-fg/10 bg-bg/70 px-5 font-mono text-xl text-fg-muted backdrop-blur-[3px] sm:px-8"
    >
      <div className="flex min-w-0 items-center gap-4 sm:gap-8">
        <span aria-hidden className="text-fg-subtle">+</span>
        <span className="truncate">{origin}</span>
        <span className="hidden truncate sm:inline">{product}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="whitespace-nowrap text-lg tabular-nums sm:text-xl">{coords}</span>
        <PixelSprite name="heart" scale={2} className="animate-blink" title="Lives" />
      </div>
    </div>
  )
}
