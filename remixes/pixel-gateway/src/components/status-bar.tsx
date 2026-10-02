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
      className="fixed inset-x-0 bottom-0 z-40 h-(--status-h) border-t-2 border-fg/10 bg-bg/70 font-mono text-lg text-fg-muted backdrop-blur-[3px]"
    >
      <div data-canvas-ignore className="mx-auto flex h-full w-full max-w-7xl items-center justify-between gap-phi-2 px-phi-3 sm:px-phi-4 lg:px-phi-5">
      <div className="flex min-w-0 items-center gap-phi-2 sm:gap-phi-4">
        <span aria-hidden className="text-fg-subtle">+</span>
        <span className="truncate">{origin}</span>
        <span className="hidden truncate sm:inline">{product}</span>
      </div>
      <div className="flex items-center gap-phi-2">
        <span className="whitespace-nowrap text-base tabular-nums sm:text-lg">{coords}</span>
        <PixelSprite name="heart" scale={2} className="animate-blink" title="Lives" />
      </div>
      </div>
    </div>
  )
}
