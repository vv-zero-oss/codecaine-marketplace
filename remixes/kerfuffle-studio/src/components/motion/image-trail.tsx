import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { useMotionAllowed } from "@/components/motion/use-motion"
import { cn } from "@/lib/utils"

type Drop = { id: number; x: number; y: number; src: string; rotate: number }

/**
 * Pictures dropped under the pointer as it moves — a new one every
 * `spacing` pixels, each gone after `lifetime` ms. When the pointer is
 * elsewhere (or on a phone), it draws its own slow figure-eight so the hero is
 * never empty.
 *
 * Renders as a layer over its parent (which must be `relative`) and listens
 * to the parent's pointer. The images come from `images`, a `|`-separated
 * list, so the editor can swap them as one string.
 */
export function ImageTrail({
  images,
  spacing = 110,
  lifetime = 1100,
  size = 240,
  tilt = 6,
  autoplay = true,
  interval = 320,
  className,
}: {
  images: string
  spacing?: number
  lifetime?: number
  size?: number
  tilt?: number
  autoplay?: boolean
  interval?: number
  className?: string
}) {
  const layer = useRef<HTMLDivElement>(null)
  const [drops, setDrops] = useState<Drop[]>([])
  const last = useRef<{ x: number; y: number } | null>(null)
  const next = useRef(0)
  const idle = useRef(true)
  const { allowed, designing } = useMotionAllowed()
  const sources = images.split("|").filter(Boolean)
  const [hostWidth, setHostWidth] = useState(1440)
  // Smaller pictures on a phone, so the headline still reads through them.
  const w = Math.min(size, hostWidth * 0.4)

  const spawn = (x: number, y: number) => {
    if (!sources.length) return
    const id = next.current++
    const src = sources[id % sources.length]
    const rotate = (Math.random() * 2 - 1) * tilt
    setDrops((all) => [...all.slice(-9), { id, x, y, src, rotate }])
    window.setTimeout(() => setDrops((all) => all.filter((d) => d.id !== id)), lifetime)
  }

  useEffect(() => {
    const host = layer.current?.parentElement
    if (!host) return
    const observer = new ResizeObserver(([entry]) => setHostWidth(entry.contentRect.width))
    observer.observe(host)
    return () => observer.disconnect()
  }, [])

  // Follow the pointer over the parent.
  useEffect(() => {
    const host = layer.current?.parentElement
    if (!host || !allowed) return
    let timer = 0
    const move = (event: PointerEvent) => {
      if (event.pointerType === "touch") return
      idle.current = false
      window.clearTimeout(timer)
      timer = window.setTimeout(() => (idle.current = true), 1600)
      const box = host.getBoundingClientRect()
      const x = event.clientX - box.left
      const y = event.clientY - box.top
      const prev = last.current
      if (!prev || Math.hypot(x - prev.x, y - prev.y) > spacing) {
        last.current = { x, y }
        spawn(x, y)
      }
    }
    host.addEventListener("pointermove", move)
    return () => {
      host.removeEventListener("pointermove", move)
      window.clearTimeout(timer)
    }
  })

  // Draw on its own while nobody is steering.
  useEffect(() => {
    const host = layer.current?.parentElement
    if (!host || !autoplay || !allowed || designing) return
    let t = 0
    const tick = window.setInterval(() => {
      if (!idle.current || document.hidden) return
      t += 0.42
      const { width, height } = host.getBoundingClientRect()
      spawn(width / 2 + Math.sin(t) * width * 0.3, height * 0.3 + Math.sin(t * 2) * height * 0.1)
    }, interval)
    return () => window.clearInterval(tick)
  }, [autoplay, allowed, designing, interval, images])

  return (
    <div ref={layer} aria-hidden className={cn("pointer-events-none absolute inset-0 z-0 isolate overflow-hidden", className)}>
      <AnimatePresence>
        {drops.map((drop) => (
          <motion.img
            key={drop.id}
            src={drop.src}
            alt=""
            draggable={false}
            initial={{ opacity: 0, scale: 0.55, rotate: drop.rotate * 2 }}
            animate={{ opacity: 1, scale: 1, rotate: drop.rotate }}
            exit={{ opacity: 0, scale: 0.85, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }}
            transition={{ type: "spring", stiffness: 420, damping: 30 }}
            className="absolute object-cover"
            style={{
              left: drop.x - w / 2,
              top: drop.y - (w * 0.75) / 2,
              width: w,
              height: w * 0.75,
              zIndex: drop.id,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}
