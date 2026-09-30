import { useEffect, useRef } from "react"

import { cn } from "@/lib/utils"
import { fitCanvas, hash2, noise2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

type Point = [number, number]
type Rack = { x: number; top: number; label: string; origin: boolean }
type Packet = { path: Point[]; at: number; speed: number; color: string; kind: "hit" | "miss" | "sync" }
type Layout = {
  cols: number
  rows: number
  backbone: number
  floor: number
  users: number
  racks: Rack[]
  foot: number[]
  bg: HTMLCanvasElement
}

const LABELS = ["FRA", "IAD", "SIN", "GRU", "NRT", "SYD", "LHR", "BOM", "SFO", "JNB", "AMS", "YYZ", "ICN", "MAD", "CDG", "HKG"]

/**
 * The hero: a server room at night, drawn on the 9px grid.
 *
 * A row of edge racks hangs off a fibre backbone, with the origin in the
 * middle. Requests leave the origin, run along the backbone, drop into an
 * edge and fall through it to the people below — cyan for a cache hit. Now
 * and then a red miss climbs back to the origin, and violet replication
 * pulses run rack to rack along the backbone. Every rack's status lights
 * blink on their own clock.
 *
 * The band's foot is ragged, column by column, and climbs as the page
 * scrolls away, so the room erodes into the white page.
 */
export function ServerFarm({
  cell = 9,
  speed = 1,
  traffic = 1,
  missRate = 0.14,
  erodeOnScroll = true,
  playing = true,
  className,
}: {
  /** Pitch of the grid in px. */
  cell?: number
  /** 1 is the reference pace for packets and lights. */
  speed?: number
  /** Multiplies how many packets are in flight. */
  traffic?: number
  /** 0–1: share of requests that miss the edge and go back to the origin. */
  missRate?: number
  erodeOnScroll?: boolean
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const layout = useRef<Layout | null>(null)
  const packets = useRef<Packet[]>([])
  const spawnIn = useRef(0)
  const seed = useRef(1)
  const visible = useRef(true)

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting))
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const build = (w: number, h: number, p: Palette): Layout => {
    const cols = Math.ceil(w / cell)
    const rows = Math.ceil(h / cell)
    const backbone = 4
    const users = rows - 5
    const floor = users - 4
    const pitch = 9
    const count = Math.max(3, Math.floor((cols - 4) / pitch))
    const margin = Math.floor((cols - count * pitch + 4) / 2)
    const middle = Math.floor(count / 2)
    const racks: Rack[] = Array.from({ length: count }, (_, i) => {
      const origin = i === middle
      const height = origin ? floor - backbone - 6 : Math.round(12 + noise2(i * 0.7, 3) * (floor - backbone - 22) + hash2(i, 5) * 6)
      return { x: margin + i * pitch, top: floor - height, label: origin ? "ORIGIN" : LABELS[i % LABELS.length], origin }
    })
    const foot = Array.from({ length: cols }, (_, i) => rows - (hash2(i, 41) > 0.7 ? 1 + Math.floor(hash2(i, 43) * 3) : 0))

    // The room itself — floor grid, backbone, drops, rack frames — never
    // changes, so it is drawn once per size.
    const bg = document.createElement("canvas")
    const dpr = Math.min(window.devicePixelRatio || 1, 2)
    bg.width = Math.round(w * dpr)
    bg.height = Math.round(h * dpr)
    const ctx = bg.getContext("2d")!
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    const size = cell - 1
    const sq = (x: number, y: number, color: string) => {
      ctx.fillStyle = color
      ctx.fillRect(x * cell, y * cell, size, size)
    }
    for (let x = 0; x < cols; x++) {
      ctx.fillStyle = p.night
      ctx.fillRect(x * cell, 0, cell, foot[x] * cell)
      for (let y = 0; y < foot[x]; y++) sq(x, y, p.nightCell)
    }
    for (let x = 0; x < cols; x++) if (x % 2 === 0) sq(x, backbone, p.nightLine)
    for (let x = 0; x < cols; x++) if (x % 3 === 0) sq(x, floor + 1, p.nightLine)
    for (const rack of racks) {
      for (let y = backbone + 1; y < rack.top; y++) if (y % 2 === 0) sq(rack.x + 2, y, p.nightLine)
      for (let y = rack.top; y <= floor; y++) {
        sq(rack.x, y, p.rack)
        sq(rack.x + 4, y, p.rack)
      }
      for (let x = rack.x; x <= rack.x + 4; x++) {
        sq(x, rack.top, rack.origin ? p.gold : p.rack)
        sq(x, floor, p.rack)
      }
      for (let y = rack.top + 1; y < floor; y++) {
        if ((y - rack.top) % 2 === 0) continue
        for (let x = rack.x + 2; x <= rack.x + 3; x++) sq(x, y, p.rackUnit)
      }
      ctx.fillStyle = rack.origin ? p.gold : p.rackLabel
      ctx.font = `500 ${Math.max(8, cell + 1)}px "Geist Mono", ui-monospace, monospace`
      ctx.textAlign = "center"
      ctx.fillText(rack.label, (rack.x + 2.5) * cell, (rack.top - 1) * cell)
    }
    return { cols, rows, backbone, floor, users, racks, foot, bg }
  }

  const route = (l: Layout, kind: Packet["kind"]): Point[] => {
    seed.current += 1
    const s = seed.current
    const origin = l.racks.find((r) => r.origin)!
    const edges = l.racks.filter((r) => !r.origin)
    const edge = edges[Math.floor(hash2(s, 3) * edges.length)]
    const ox = origin.x + 2
    const ex = edge.x + 2
    const path: Point[] = []
    const line = (from: Point, to: Point) => {
      const [x0, y0] = from
      const [x1, y1] = to
      const n = Math.max(Math.abs(x1 - x0), Math.abs(y1 - y0))
      for (let i = path.length ? 1 : 0; i <= n; i++) path.push([Math.round(x0 + ((x1 - x0) * i) / n), Math.round(y0 + ((y1 - y0) * i) / n)])
    }
    if (kind === "sync") {
      const other = edges[Math.floor(hash2(s, 7) * edges.length)]
      line([ex, edge.top], [ex, l.backbone])
      line([ex, l.backbone], [other.x + 2, l.backbone])
      line([other.x + 2, l.backbone], [other.x + 2, other.top])
      return path
    }
    const user = Math.max(0, Math.min(l.cols - 1, ex + Math.round((hash2(s, 9) - 0.5) * 8)))
    line([ox, origin.top], [ox, l.backbone])
    line([ox, l.backbone], [ex, l.backbone])
    line([ex, l.backbone], [ex, l.floor + 1])
    line([ex, l.floor + 1], [user, l.floor + 1])
    line([user, l.floor + 1], [user, l.users])
    return kind === "miss" ? path.reverse() : path
  }

  useFrameLoop(
    (time, dt) => {
      const el = canvas.current
      if (!el || (!visible.current && time > 0)) return
      palette.current ??= readPalette()
      const p = palette.current
      const { ctx, w, h } = fitCanvas(el)
      if (!layout.current || layout.current.cols !== Math.ceil(w / cell) || layout.current.rows !== Math.ceil(h / cell)) {
        layout.current = build(w, h, p)
        packets.current = []
      }
      const l = layout.current
      const size = cell - 1
      const t = time * speed

      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(l.bg, 0, 0, w, h)

      // Status lights: each unit blinks on its own slow clock.
      for (const rack of l.racks) {
        for (let y = rack.top + 1; y < l.floor; y++) {
          if ((y - rack.top) % 2 === 0) continue
          const phase = hash2(rack.x, y)
          const on = Math.sin(t * (1.2 + phase * 3) + phase * 20) > -0.2
          const fault = hash2(rack.x * 7 + Math.floor(t * 0.4), y) > 0.985
          ctx.fillStyle = fault ? p.signal : on ? (phase > 0.55 ? p.lime : p.cyan) : p.rackUnit
          ctx.fillRect((rack.x + 1) * cell, y * cell, size, size)
        }
      }
      // The people below: most dim, some lit by a packet that just arrived.
      for (let x = 1; x < l.cols; x += 2) {
        if (hash2(x, 13) < 0.45) continue
        ctx.fillStyle = p.nightLine
        ctx.fillRect(x * cell, l.users * cell, size, size)
      }

      // Traffic.
      spawnIn.current -= dt * speed * traffic
      while (spawnIn.current <= 0) {
        const roll = hash2(seed.current, 17)
        const kind: Packet["kind"] = roll < missRate ? "miss" : roll < missRate + 0.12 ? "sync" : "hit"
        const color = kind === "miss" ? p.signal : kind === "sync" ? p.violet : hash2(seed.current, 19) > 0.3 ? p.cyan : p.lime
        packets.current.push({ path: route(l, kind), at: 0, speed: 26 + hash2(seed.current, 23) * 18, color, kind })
        spawnIn.current += 0.11 + hash2(seed.current, 29) * 0.18
      }
      const alive: Packet[] = []
      for (const packet of packets.current) {
        packet.at += dt * speed * packet.speed
        const head = Math.floor(packet.at)
        if (head >= packet.path.length + 4) continue
        alive.push(packet)
        for (let k = 0; k < 5; k++) {
          const i = head - k
          if (i < 0 || i >= packet.path.length) continue
          const [x, y] = packet.path[i]
          ctx.globalAlpha = k === 0 ? 1 : 0.55 - k * 0.1
          ctx.fillStyle = packet.color
          ctx.fillRect(x * cell, y * cell, size, size)
        }
        // A delivered hit lights its person for a moment.
        if (packet.kind === "hit" && head >= packet.path.length - 1) {
          const [x, y] = packet.path[packet.path.length - 1]
          ctx.globalAlpha = Math.max(0, 1 - (packet.at - packet.path.length) / 4)
          ctx.fillStyle = packet.color
          ctx.fillRect(x * cell, y * cell, size, size)
        }
      }
      ctx.globalAlpha = 1
      packets.current = alive

      // Eroding from the foot as the page scrolls past.
      if (erodeOnScroll) {
        const rect = el.getBoundingClientRect()
        const scrolled = Math.min(1, Math.max(0, -rect.top / Math.max(1, rect.height)))
        if (scrolled > 0) {
          for (let x = 0; x < l.cols; x++) {
            const cut = l.foot[x] - Math.round(scrolled * l.rows * (0.9 + noise2(x * 0.15, 2) * 0.6))
            if (cut < l.foot[x]) ctx.clearRect(x * cell, Math.max(0, cut) * cell, cell, (l.foot[x] - Math.max(0, cut)) * cell)
          }
        }
      }
    },
    { playing: playing && speed > 0, deps: [cell, speed, traffic, missRate, erodeOnScroll] },
  )

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label="A server room at night: requests travel from the origin along a fibre backbone to edge racks and down to the people using them."
      className={cn("block h-[clamp(340px,36vw,660px)] w-full", className)}
    />
  )
}
