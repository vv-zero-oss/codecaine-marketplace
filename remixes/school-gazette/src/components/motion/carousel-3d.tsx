import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState, type ReactNode } from "react"
import { useReducedMotion } from "motion/react"

import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { cn } from "@/lib/utils"

/**
 * A cylinder of cards that turns to the one you ask for. The cards are
 * children; the geometry is derived from how many there are. `autoplay` turns
 * it on its own every `interval` seconds — it holds still in the editor, under
 * reduced motion, and while it is being hovered. Each slide is also a switch in
 * the editor's Actions row.
 */
export function Carousel3D({
  children,
  cardWidth = 260,
  cardHeight = 320,
  interval = 4,
  autoplay = false,
  className,
}: {
  children: ReactNode[]
  cardWidth?: number
  cardHeight?: number
  /** seconds between turns */
  interval?: number
  autoplay?: boolean
  className?: string
}) {
  const items = Array.isArray(children) ? children : [children]
  const count = items.length
  const step = 360 / count
  const radius = Math.round(cardWidth / 2 / Math.tan(Math.PI / count)) + 24
  const [index, setIndex] = useState(0)
  const [auto, setAuto] = useState(autoplay)
  const [hover, setHover] = useState(false)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const touch = useRef<number | null>(null)

  useEffect(() => setAuto(autoplay), [autoplay])
  useEffect(() => {
    if (!auto || hover || reduced || designing) return
    const id = window.setInterval(() => setIndex((i) => i + 1), interval * 1000)
    return () => window.clearInterval(id)
  }, [auto, hover, reduced, designing, interval])

  useCanvasAction("Next club", () => setIndex((i) => i + 1), { group: "Noticeboard" })
  useCanvasAction("Previous club", () => setIndex((i) => i - 1), { group: "Noticeboard" })
  useCanvasAction("Carousel autoplay", (next) => setAuto(next ?? !auto), { group: "Noticeboard", on: auto })

  const current = ((index % count) + count) % count

  return (
    <div className={cn("flex w-full flex-col items-center gap-8", className)}>
      <div
        className="relative w-full overflow-hidden py-6 [perspective:1400px]"
        style={{ height: cardHeight + 72 }}
        onPointerEnter={() => setHover(true)}
        onPointerLeave={() => setHover(false)}
        onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
        onTouchEnd={(e) => {
          if (touch.current === null) return
          const dx = e.changedTouches[0].clientX - touch.current
          if (Math.abs(dx) > 40) setIndex((i) => i + (dx < 0 ? 1 : -1))
          touch.current = null
        }}
      >
        <div
          data-canvas-ignore
          className="absolute top-6 left-1/2 [transform-style:preserve-3d] transition-transform duration-[900ms] ease-[var(--ease-out)]"
          style={{
            width: cardWidth,
            height: cardHeight,
            marginLeft: -cardWidth / 2,
            transform: `translateZ(${-radius}px) rotateY(${-index * step}deg)`,
          }}
        >
          {items.map((child, i) => (
            <div
              key={i}
              aria-hidden={i !== current}
              className="absolute inset-0 [backface-visibility:hidden]"
              style={{ transform: `rotateY(${i * step}deg) translateZ(${radius}px)` }}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button variant="paper" size="icon" aria-label="Previous club" onClick={() => setIndex((i) => i - 1)}>
          <ArrowLeft />
        </Button>
        <span className="kicker min-w-16 text-center tabular-nums">
          {String(current + 1).padStart(2, "0")} / {String(count).padStart(2, "0")}
        </span>
        <Button variant="paper" size="icon" aria-label="Next club" onClick={() => setIndex((i) => i + 1)}>
          <ArrowRight />
        </Button>
        <label className="ml-2 flex items-center gap-3 kicker">
          Auto-turn
          <Switch checked={auto} onCheckedChange={setAuto} aria-label="Auto-turn" />
        </label>
      </div>
    </div>
  )
}
