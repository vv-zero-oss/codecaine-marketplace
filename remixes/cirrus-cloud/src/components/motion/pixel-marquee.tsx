import { useEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"
import { fitCanvas, hash2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

/**
 * A line of lowercase set in pixels that scrolls past, endlessly.
 *
 * There is no pixel font. The phrase is drawn tiny into an offscreen canvas
 * and every pixel that survives a threshold becomes one square on the 9px
 * grid, so the letters keep the real typeface's shapes and break into blocks
 * at their edges. Each square takes a colour from the palette — mostly gold,
 * flecked with lime, red, cobalt and navy — and a few change every beat, so
 * the word glitters as it moves.
 */
export function PixelMarquee({
  text = "the answer is yes, it runs in the cloud",
  speed = 160,
  direction = "left",
  cell = 9,
  rows = 16,
  threshold = 0.28,
  flicker = 0.06,
  playing = true,
  className,
}: {
  text?: string
  /** Pixels per second. */
  speed?: number
  direction?: "left" | "right"
  /** Pitch of the grid in px. */
  cell?: number
  /** How many squares tall a capital-height letter is drawn. */
  rows?: number
  /** 0–1: how much ink a tiny pixel needs to become a square. */
  threshold?: number
  /** Share of squares that change colour each beat. */
  flicker?: number
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const visible = useRef(false)
  const [fontsReady, setFontsReady] = useState(false)
  const bitmap = useRef<{ cols: number; rows: number; on: Uint8Array } | null>(null)

  useEffect(() => {
    let live = true
    document.fonts.load(`600 40px Geist`).finally(() => live && setFontsReady(true))
    return () => {
      live = false
    }
  }, [])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), { rootMargin: "120px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  // The phrase, drawn tiny: one canvas pixel per square.
  useEffect(() => {
    const phrase = `${text}  `
    const off = document.createElement("canvas")
    const ctx = off.getContext("2d", { willReadFrequently: true })!
    const px = Math.round(rows * 1.3)
    ctx.font = `600 ${px}px Geist, ui-sans-serif, system-ui, sans-serif`
    const width = Math.ceil(ctx.measureText(phrase).width)
    const height = Math.round(rows * 1.6)
    off.width = width
    off.height = height
    ctx.font = `600 ${px}px Geist, ui-sans-serif, system-ui, sans-serif`
    ctx.fillStyle = "#000"
    ctx.textBaseline = "alphabetic"
    ctx.fillText(phrase, 0, Math.round(rows * 1.1))
    // Emboldened a touch, so every stroke is two squares wide.
    ctx.strokeStyle = "#000"
    ctx.lineWidth = Math.max(0.6, rows * 0.06)
    ctx.lineJoin = "round"
    ctx.strokeText(phrase, 0, Math.round(rows * 1.1))
    const data = ctx.getImageData(0, 0, width, height).data
    const on = new Uint8Array(width * height)
    for (let n = 0; n < width * height; n++) on[n] = data[n * 4 + 3] / 255 > threshold ? 1 : 0
    bitmap.current = { cols: width, rows: height, on }
  }, [text, rows, threshold, fontsReady])

  const offset = useRef(0)

  useFrameLoop(
    (time, dt) => {
      const el = canvas.current
      const bits = bitmap.current
      if (!el || !bits || (!visible.current && time > 0)) return
      palette.current ??= readPalette()
      const p = palette.current
      const { ctx, w, h } = fitCanvas(el)
      ctx.clearRect(0, 0, w, h)

      const span = bits.cols * cell
      offset.current = (offset.current + dt * speed * (direction === "left" ? 1 : -1) + span) % span
      const shift = Math.round(offset.current / cell)
      const beat = Math.floor(time * 8)
      const top = Math.max(0, Math.floor((h / cell - bits.rows) / 2))
      const cols = Math.ceil(w / cell) + 1
      const size = cell - 1
      const colors = [p.gold, p.gold, p.gold, p.gold, p.gold, p.gold, p.gold, p.lime, p.lime, p.signal, p.cobalt, p.navy]

      for (let i = 0; i < cols; i++) {
        const src = (((i + shift) % bits.cols) + bits.cols) % bits.cols
        for (let j = 0; j < bits.rows; j++) {
          if (!bits.on[j * bits.cols + src]) continue
          // A stable colour per square, re-rolled on some beats.
          const roll = hash2(src, j + 31) < flicker * 4 ? beat : 0
          const c = colors[Math.floor(hash2(src * 3 + roll, j * 7 + roll) * colors.length)]
          ctx.fillStyle = c
          ctx.fillRect(i * cell, (top + j) * cell, size, size)
        }
      }
    },
    { playing: playing && speed > 0, deps: [speed, direction, cell, flicker, fontsReady, text, rows] },
  )

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label={text}
      className={cn("block w-full", className)}
      style={{ height: Math.ceil(rows * 1.6) * cell }}
    />
  )
}
