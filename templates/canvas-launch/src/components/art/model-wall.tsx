import { useEffect, useRef } from "react"
import Matter from "matter-js"

import { cn } from "@/lib/utils"

export type Ball = { name: string; logo?: string; letter?: string; mono?: boolean; size: number }

/**
 * Logos as balls, dropped under gravity onto the floor of the stage — a real
 * physics step (matter-js), with the DOM balls placed from the bodies every
 * frame. They fall when `drop` turns true and are cleared when it turns false,
 * so scrolling back up and down again drops them again.
 */
export function ModelWall({ balls, drop, className }: { balls: Ball[]; drop: boolean; className?: string }) {
  const host = useRef<HTMLDivElement>(null)
  const nodes = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const el = host.current
    if (!el || !drop) {
      nodes.current.forEach((n) => n && (n.style.opacity = "0"))
      return
    }
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches
    const W = el.clientWidth
    const H = el.clientHeight
    const engine = Matter.Engine.create({ gravity: { x: 0, y: 1.1 } })
    const wall = { isStatic: true, restitution: 0.2 }
    Matter.Composite.add(engine.world, [
      Matter.Bodies.rectangle(W / 2, H + 50, W * 2, 100, wall),
      Matter.Bodies.rectangle(-50, H / 2, 100, H * 4, wall),
      Matter.Bodies.rectangle(W + 50, H / 2, 100, H * 4, wall),
    ])
    const scale = Math.min(1, Math.max(0.55, W / 1100))
    const bodies = balls.map((b, i) => {
      const r = (b.size * scale) / 2
      // Spread across the width, staggered above the top so they land in turn.
      const x = r + ((i * 0.618 * W) % Math.max(1, W - 2 * r))
      const y = -r - (i % 6) * 90 - Math.floor(i / 6) * 160
      return Matter.Bodies.circle(x, y, r, { restitution: 0.55, friction: 0.05, frictionAir: 0.008, density: 0.002 })
    })
    Matter.Composite.add(engine.world, bodies)

    // Reduced motion: settle the pile before showing it.
    if (reduce) for (let i = 0; i < 600; i++) Matter.Engine.update(engine, 1000 / 60)

    let frame = 0
    let last = performance.now()
    const place = () => {
      bodies.forEach((body, i) => {
        const n = nodes.current[i]
        if (!n) return
        const r = (balls[i].size * scale) / 2
        n.style.opacity = "1"
        n.style.width = n.style.height = `${r * 2}px`
        n.style.transform = `translate(${body.position.x - r}px, ${body.position.y - r}px) rotate(${body.angle}rad)`
      })
    }
    const tick = (now: number) => {
      const dt = Math.min(1000 / 30, now - last)
      last = now
      if (!reduce) Matter.Engine.update(engine, dt)
      place()
      frame = requestAnimationFrame(tick)
    }
    place()
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      Matter.Engine.clear(engine)
    }
  }, [balls, drop])

  return (
    <div ref={host} className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      {balls.map((b, i) => (
        <div
          key={b.name}
          ref={(n) => {
            nodes.current[i] = n
          }}
          className="absolute top-0 left-0 grid place-items-center rounded-full bg-surface opacity-0 shadow-card will-change-transform"
        >
          {b.logo ? (
            <img src={`/logos/${b.logo}`} alt="" className={cn("size-[46%] object-contain", b.mono && "dark:invert")} />
          ) : (
            <span className="text-[clamp(14px,2.2vw,28px)] font-semibold tracking-[-0.03em]">{b.letter}</span>
          )}
        </div>
      ))}
    </div>
  )
}
