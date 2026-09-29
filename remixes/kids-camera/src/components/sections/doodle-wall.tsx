import { useCallback, useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Pencil, X } from "lucide-react"

import { Swirl } from "@/components/blocks/swirl"
import { Button } from "@/components/ui/button"
import { doodle } from "@/content"
import { cn } from "@/lib/utils"

/** A crayon's colour, read from its token so the canvas and the swatches can
 *  never disagree. */
function tokenColor(token: string) {
  const name = token.slice(4, -1)
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || "#000"
}

/**
 * A wall to draw on, the page's last word before the footer — the same idea
 * as the product, handed to the visitor: make a mark.
 *
 * A plain `<canvas>`. Strokes are smoothed through midpoints so a quick
 * scribble reads as a crayon line rather than a polyline. On a mouse the
 * cursor becomes a pencil tipped in the chosen colour; on touch the finger is
 * the pencil and the canvas takes the gesture (`touch-action: none`) only
 * inside its own frame.
 */
export function DoodleWall() {
  const canvas = useRef<HTMLCanvasElement>(null)
  const drawing = useRef<{ x: number; y: number }[] | null>(null)
  const [color, setColor] = useState(0)
  const [drawn, setDrawn] = useState(false)
  const [pencil, setPencil] = useState<{ x: number; y: number } | null>(null)

  const fit = useCallback(() => {
    const el = canvas.current
    if (!el) return
    const box = el.getBoundingClientRect()
    const ratio = window.devicePixelRatio || 1
    const snapshot = el.width ? el.toDataURL() : null
    el.width = Math.round(box.width * ratio)
    el.height = Math.round(box.height * ratio)
    const ctx = el.getContext("2d")!
    ctx.scale(ratio, ratio)
    if (snapshot && drawn) {
      const img = new Image()
      img.onload = () => ctx.drawImage(img, 0, 0, box.width, box.height)
      img.src = snapshot
    }
  }, [drawn])

  useEffect(() => {
    fit()
    const observer = new ResizeObserver(fit)
    if (canvas.current) observer.observe(canvas.current)
    return () => observer.disconnect()
  }, [fit])

  const point = (event: React.PointerEvent) => {
    const box = canvas.current!.getBoundingClientRect()
    return { x: event.clientX - box.left, y: event.clientY - box.top }
  }

  const stroke = (points: { x: number; y: number }[]) => {
    const ctx = canvas.current?.getContext("2d")
    if (!ctx || points.length < 2) return
    const [a, b, c] = points.slice(-3)
    ctx.strokeStyle = tokenColor(doodle.colors[color].token)
    ctx.lineWidth = 2.5
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()
    if (!c) {
      ctx.moveTo(a.x, a.y)
      ctx.lineTo(b.x, b.y)
    } else {
      ctx.moveTo((a.x + b.x) / 2, (a.y + b.y) / 2)
      ctx.quadraticCurveTo(b.x, b.y, (b.x + c.x) / 2, (b.y + c.y) / 2)
    }
    ctx.stroke()
  }

  const clear = () => {
    const el = canvas.current
    el?.getContext("2d")?.clearRect(0, 0, el.width, el.height)
    setDrawn(false)
  }

  return (
    <section aria-label="Drawing wall" className="bg-paper">
      <div className="mx-gutter border-t border-hairline" />
      <div className="relative h-[clamp(460px,64vw,520px)] overflow-hidden">
        <Swirl className="pointer-events-none absolute top-1/2 left-1/2 w-[clamp(240px,26.6vw,320px)] -translate-x-1/2 -translate-y-[52%]" />
        <AnimatePresence>
          {!drawn && (
            <motion.p
              className="pointer-events-none absolute top-1/2 left-1/2 w-[180px] -translate-x-1/2 -translate-y-1/2 text-center text-[10px] leading-[1.35] text-ink"
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              {doodle.prompt}
            </motion.p>
          )}
        </AnimatePresence>
        <canvas
          ref={canvas}
          aria-label="Drawing canvas"
          className="absolute inset-0 size-full touch-none [@media(pointer:fine)]:cursor-none"
          onPointerDown={(event) => {
            event.currentTarget.setPointerCapture(event.pointerId)
            drawing.current = [point(event)]
          }}
          onPointerMove={(event) => {
            const at = point(event)
            if (event.pointerType === "mouse") setPencil(at)
            if (!drawing.current) return
            drawing.current.push(at)
            stroke(drawing.current)
            if (!drawn) setDrawn(true)
          }}
          onPointerUp={() => (drawing.current = null)}
          onPointerCancel={() => (drawing.current = null)}
          onPointerLeave={() => setPencil(null)}
        />
        {pencil && (
          <Pencil
            aria-hidden
            className="pointer-events-none absolute size-7 -translate-y-full stroke-ink"
            style={{ left: pencil.x, top: pencil.y, fill: doodle.colors[color].token }}
            strokeWidth={1.5}
          />
        )}
        <div className="absolute bottom-[clamp(28px,4vw,46px)] left-1/2 flex -translate-x-1/2 items-center gap-2">
          <div role="radiogroup" aria-label="Crayon colour" className="flex h-[38px] items-center gap-0.5 rounded-pill border border-hairline bg-paper px-1.5">
            {doodle.colors.map((swatch, i) => (
              <button
                key={swatch.name}
                role="radio"
                aria-checked={color === i}
                aria-label={swatch.name}
                onClick={() => setColor(i)}
                className="grid size-11 place-items-center rounded-pill outline-none focus-visible:ring-2 focus-visible:ring-ring sm:size-[26px]"
              >
                <span
                  className={cn(
                    "block size-[17px] rounded-pill transition-[box-shadow,transform] duration-(--duration-press) ease-out-strong active:scale-90",
                    color === i && "shadow-[0_0_0_2px_var(--paper),0_0_0_3.5px_var(--ink)]",
                  )}
                  style={{ background: swatch.token }}
                />
              </button>
            ))}
          </div>
          <Button size="none" onClick={clear} aria-label={doodle.clear} className="size-11 sm:size-[38px]">
            <X className="size-3.5" />
          </Button>
        </div>
      </div>
    </section>
  )
}
