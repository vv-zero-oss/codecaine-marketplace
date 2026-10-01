import { useEffect, useRef } from "react"

import { WORLD_GRID } from "@/lib/world-grid"
import { cn } from "@/lib/utils"

const COLS = WORLD_GRID[0].length
const ROWS = WORLD_GRID.length
const CHARS = ["$", "8", "o", "0", "$"]

const hash = (x: number, y: number) => {
  const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453
  return n - Math.floor(n)
}

/**
 * The world as characters: every land cell is a glyph, drawn once to a canvas
 * and redrawn only when the highlighted place (`lon`, `lat`) changes. The cells
 * around that place light up in the accent.
 */
export function LanguageMap({ lon, lat, className }: { lon: number; lat: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)
  const frame = useRef({ lon, lat })
  frame.current = { lon, lat }

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const draw = () => {
      const { width } = canvas.getBoundingClientRect()
      if (!width) return
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const cw = width / COLS
      const ch = cw * 0.92
      canvas.width = width * dpr
      canvas.height = ch * ROWS * dpr
      canvas.style.height = `${ch * ROWS}px`
      const ctx = canvas.getContext("2d")!
      ctx.scale(dpr, dpr)
      ctx.clearRect(0, 0, width, ch * ROWS)
      ctx.font = `${Math.max(cw * 1.2, 5)}px "Geist Mono", ui-monospace, monospace`
      ctx.textBaseline = "middle"
      ctx.textAlign = "center"
      const hx = ((frame.current.lon + 180) / 360) * (COLS - 1)
      const hy = ((80 - frame.current.lat) / 140) * (ROWS - 1)
      for (let y = 0; y < ROWS; y++) {
        for (let x = 0; x < COLS; x++) {
          if (WORLD_GRID[y][x] !== "1") continue
          const near = Math.hypot((x - hx) / 1.6, y - hy) < 2.6 && hash(x, y) > 0.35
          const h = hash(x, y)
          ctx.fillStyle = near ? "#ff5a24" : `rgba(236,236,230,${0.28 + h * 0.6})`
          ctx.fillText(CHARS[Math.floor(h * CHARS.length)], x * cw + cw / 2, y * ch + ch / 2)
        }
      }
    }
    draw()
    const ro = new ResizeObserver(draw)
    ro.observe(canvas)
    document.fonts?.ready.then(draw)
    return () => ro.disconnect()
  }, [lon, lat])

  return <canvas ref={ref} role="img" aria-label="World map drawn in characters" className={cn("block w-full", className)} />
}
