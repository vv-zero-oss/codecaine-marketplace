import { useEffect, useRef } from "react"
import gsap from "gsap"

/**
 * A render loop for the page's pixel canvases, driven by an endless GSAP
 * tween held in a ref.
 *
 * Why GSAP rather than a bare `requestAnimationFrame`: the canvas editor's SDK
 * finds animation libraries by walking React's tree for the instances a
 * component holds, and an endless GSAP tween in a ref is one it knows how to
 * pause (its Motion switch: Stop / Reduced) and release again. A raw rAF loop
 * would be invisible to it. The tween itself animates nothing — its
 * `onUpdate` is the frame.
 *
 * `draw(time, dt)` gets seconds. `playing: false` draws one still frame and
 * stops, as does the reduced-motion query (read on every start, so the
 * editor's Reduced mode applies without a reload).
 */
export function useFrameLoop(
  draw: (time: number, dt: number) => void,
  { playing = true, deps = [] as unknown[] }: { playing?: boolean; deps?: unknown[] } = {},
) {
  const tween = useRef<gsap.core.Tween | null>(null)
  const drawRef = useRef(draw)
  drawRef.current = draw

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    let time = 0
    let last = performance.now()
    // The first frame always draws, so a paused or reduced canvas is a still,
    // not a blank.
    drawRef.current(0, 0)
    if (!playing || reduced) return

    const clock = { t: 0 }
    tween.current = gsap.to(clock, {
      t: 1,
      duration: 1,
      ease: "none",
      repeat: -1,
      onUpdate() {
        const now = performance.now()
        const dt = Math.min(0.05, (now - last) / 1000)
        last = now
        time += dt
        drawRef.current(time, dt)
      },
      onRepeat() {
        last = performance.now()
      },
    })
    return () => {
      tween.current?.kill()
      tween.current = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playing, ...deps])

  return tween
}

/** Canvas sized to its box at the device's pixel ratio; returns CSS px. */
export function fitCanvas(canvas: HTMLCanvasElement) {
  const rect = canvas.getBoundingClientRect()
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  const w = Math.max(1, Math.round(rect.width))
  const h = Math.max(1, Math.round(rect.height))
  if (canvas.width !== Math.round(w * dpr) || canvas.height !== Math.round(h * dpr)) {
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
  }
  const ctx = canvas.getContext("2d")!
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return { ctx, w, h }
}

/** Reads the palette from the CSS tokens, so the canvases follow index.css. */
export function readPalette() {
  const css = getComputedStyle(document.documentElement)
  const v = (name: string) => css.getPropertyValue(name).trim()
  return {
    navy: v("--color-navy") || "#202334",
    cobalt: v("--color-cobalt") || "#394dcb",
    cobaltSoft: v("--color-cobalt-soft") || "#7d88dc",
    cobaltPale: v("--color-cobalt-pale") || "#b8bfee",
    violet: v("--color-violet") || "#6042eb",
    gold: v("--color-gold") || "#efbb1f",
    goldSoft: v("--color-gold-soft") || "#f3cf62",
    goldPale: v("--color-gold-pale") || "#f8e3a6",
    signal: v("--color-signal") || "#ea3c25",
    lime: v("--color-lime") || "#d9ff00",
    ink: v("--color-ink") || "#0c0c0c",
  }
}
export type Palette = ReturnType<typeof readPalette>

/** Small, fast value noise — enough for drifting bands and ragged edges. */
export function hash2(x: number, y: number) {
  let h = (x * 374761393 + y * 668265263) | 0
  h = Math.imul(h ^ (h >>> 13), 1274126177)
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295
}
export function noise2(x: number, y: number) {
  const xi = Math.floor(x)
  const yi = Math.floor(y)
  const xf = x - xi
  const yf = y - yi
  const u = xf * xf * (3 - 2 * xf)
  const v = yf * yf * (3 - 2 * yf)
  const a = hash2(xi, yi)
  const b = hash2(xi + 1, yi)
  const c = hash2(xi, yi + 1)
  const d = hash2(xi + 1, yi + 1)
  return a + (b - a) * u + (c - a) * v + (a - b - c + d) * u * v
}
export function fbm(x: number, y: number) {
  return noise2(x, y) * 0.6 + noise2(x * 2.1 + 17, y * 2.1 + 5) * 0.3 + noise2(x * 4.3 + 3, y * 4.3 + 11) * 0.1
}
