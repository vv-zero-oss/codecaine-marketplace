import { useEffect, useRef } from "react"

import { token } from "@/lib/tokens"
import { cn } from "@/lib/utils"

/**
 * A short motion-graphics loop, drawn on a canvas: counter-rotating rings of
 * dashes round a pulsing sun, with a sweep of bars underneath. It stands in
 * for "a video somebody saw and loved" in the Magic Cast scene, and then for
 * the same motion rebuilt on their own hero — so both are this one piece.
 *
 * `playing` pauses it; `t0` offsets its clock so two copies can run in step.
 */
export function KineticLoop({ playing = true, className }: { playing?: boolean; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const c = {
      bg: token("art-bg"),
      coral: token("art-coral"),
      amber: token("art-amber"),
      violet: token("art-violet"),
      cyan: token("art-cyan"),
      cream: token("art-cream"),
    }
    let frame = 0
    let last = performance.now()
    let time = 0

    const draw = (now: number) => {
      const dpr = Math.min(2, window.devicePixelRatio || 1)
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      if (canvas.width !== Math.round(w * dpr)) {
        canvas.width = Math.round(w * dpr)
        canvas.height = Math.round(h * dpr)
      }
      if (playing && !reduce) time += (now - last) / 1000
      last = now
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      ctx.fillStyle = c.bg
      ctx.fillRect(0, 0, w, h)

      const cx = w * 0.5
      const cy = h * 0.46
      const r = Math.min(w, h) * 0.3

      // The sun: a soft disc that breathes.
      const pulse = 1 + Math.sin(time * 2.1) * 0.06
      const sun = ctx.createRadialGradient(cx, cy, 0, cx, cy, r * 0.9 * pulse)
      sun.addColorStop(0, c.cream)
      sun.addColorStop(0.35, c.amber)
      sun.addColorStop(0.7, c.coral)
      sun.addColorStop(1, "transparent")
      ctx.fillStyle = sun
      ctx.beginPath()
      ctx.arc(cx, cy, r * 0.9 * pulse, 0, Math.PI * 2)
      ctx.fill()

      // Rings of dashes, alternating direction.
      const rings = [
        { rad: 1.05, n: 48, len: 0.05, speed: 0.35, col: c.cyan, width: 3 },
        { rad: 1.25, n: 64, len: 0.03, speed: -0.22, col: c.violet, width: 4 },
        { rad: 1.45, n: 30, len: 0.09, speed: 0.16, col: c.coral, width: 2 },
      ]
      for (const ring of rings) {
        ctx.strokeStyle = ring.col
        ctx.lineWidth = ring.width
        ctx.lineCap = "round"
        for (let i = 0; i < ring.n; i++) {
          const a = (i / ring.n) * Math.PI * 2 + time * ring.speed
          const wobble = 1 + Math.sin(time * 1.4 + i * 0.5) * 0.03
          ctx.beginPath()
          ctx.arc(cx, cy, r * ring.rad * wobble, a, a + ring.len * Math.PI * 2 * (0.6 + 0.4 * Math.sin(time + i)))
          ctx.stroke()
        }
      }

      // The sweep: bars rising in a travelling wave.
      const bars = 28
      const bw = w / bars
      for (let i = 0; i < bars; i++) {
        const v = (Math.sin(time * 3 - i * 0.45) + 1) / 2
        const bh = h * (0.04 + v * 0.16)
        ctx.fillStyle = i % 3 === 0 ? c.violet : i % 3 === 1 ? c.cyan : c.coral
        ctx.globalAlpha = 0.35 + v * 0.55
        ctx.fillRect(i * bw + bw * 0.2, h - bh, bw * 0.6, bh)
      }
      ctx.globalAlpha = 1
      frame = requestAnimationFrame(draw)
    }
    frame = requestAnimationFrame(draw)
    return () => cancelAnimationFrame(frame)
  }, [playing])

  return <canvas ref={ref} aria-hidden className={cn("block size-full", className)} />
}
