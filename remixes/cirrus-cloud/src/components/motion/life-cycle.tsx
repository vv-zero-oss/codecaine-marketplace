import { useEffect, useMemo, useRef } from "react"

import { cn } from "@/lib/utils"
import { fitCanvas, hash2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

/**
 * Clone → Boot → Build → Ship, drawn as life: one swarm of squares that is
 * a DNA double helix, unzips and replicates into two (the new strands in
 * lime), gathers into a single organism with beating cilia, grows into a
 * tree, and finally lets its seeds go on the wind — then starts again.
 *
 * Every square snaps to the 9px grid; between shapes each one flies to its
 * new place on its own spring, so a change of shape reads as a swarm
 * re-forming rather than a cut.
 */

type Phase = "helix" | "replicate" | "organism" | "tree" | "seeds"

const PHASES: { name: Phase; step: number; seconds: number }[] = [
  { name: "helix", step: 0, seconds: 2.4 },
  { name: "replicate", step: 0, seconds: 3.4 },
  { name: "organism", step: 1, seconds: 3.4 },
  { name: "tree", step: 2, seconds: 3.6 },
  { name: "seeds", step: 3, seconds: 3.4 },
]
const CYCLE = PHASES.reduce((sum, p) => sum + p.seconds, 0)
const STEP_START = [0, 2, 3, 4].map((phase) => PHASES.slice(0, phase).reduce((sum, p) => sum + p.seconds, 0))

type Target = [x: number, y: number, color: string, alpha: number]
type Branch = { x0: number; y0: number; x1: number; y1: number; depth: number; cum: number }

export function LifeCycle({
  cell = 9,
  count = 560,
  speed = 1,
  autoplay = true,
  step,
  jump = 0,
  onStepChange,
  playing = true,
  className,
}: {
  cell?: number
  /** How many squares make up the swarm. */
  count?: number
  /** 1 is the reference pace. */
  speed?: number
  /** Whether it moves through the steps by itself. */
  autoplay?: boolean
  /** 0–3 (Clone, Boot, Build, Ship): jumps there when it changes. */
  step?: number
  /** Bump to jump to `step` again, even when it has not changed. */
  jump?: number
  onStepChange?: (step: number) => void
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const visible = useRef(false)
  const clock = useRef(0)
  const reported = useRef(-1)
  const onStep = useRef(onStepChange)
  onStep.current = onStepChange

  const swarm = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        a: hash2(i, 1),
        b: hash2(i, 2),
        c: hash2(i, 3),
        d: hash2(i, 4),
        k: 3 + hash2(i, 5) * 3.5,
        x: -1,
        y: -1,
      })),
    [count],
  )

  // Jump when the caller picks a step.
  useEffect(() => {
    if (step === undefined) return
    clock.current = STEP_START[Math.max(0, Math.min(3, step))] + 0.01
  }, [step, jump])

  useEffect(() => {
    const el = canvas.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => (visible.current = entry.isIntersecting), { rootMargin: "120px" })
    io.observe(el)
    return () => io.disconnect()
  }, [])

  const tree = useRef<{ rows: number; branches: Branch[]; tips: [number, number][]; total: number } | null>(null)

  useFrameLoop(
    (time, dt) => {
      const el = canvas.current
      if (!el || (!visible.current && time > 0)) return
      palette.current ??= readPalette()
      const p = palette.current
      const { ctx, w, h } = fitCanvas(el)
      const cols = w / cell
      const rows = h / cell

      if (autoplay) clock.current = (clock.current + dt * speed) % CYCLE
      let at = clock.current
      let index = 0
      while (index < PHASES.length - 1 && at >= PHASES[index].seconds) at -= PHASES[index++].seconds
      const phase = PHASES[index]
      const progress = at / phase.seconds
      if (phase.step !== reported.current) {
        reported.current = phase.step
        onStep.current?.(phase.step)
      }
      const t = time * speed

      if (!tree.current || tree.current.rows !== Math.round(rows)) tree.current = growTree(cols, rows)
      const shape = { cols, rows, t, progress, p, tree: tree.current }

      ctx.clearRect(0, 0, w, h)
      const size = cell - 1
      const seen = new Set<number>()
      const ease = 1 - Math.exp(-dt * 1)
      for (let i = 0; i < swarm.length; i++) {
        const s = swarm[i]
        const [tx, ty, color, alpha] = target(phase.name, s, shape)
        if (s.x < 0) {
          s.x = tx
          s.y = ty
        } else {
          const pull = 1 - Math.pow(1 - ease, s.k)
          s.x += (tx - s.x) * pull
          s.y += (ty - s.y) * pull
        }
        const gx = Math.round(s.x)
        const gy = Math.round(s.y)
        if (gx < 0 || gy < 0 || gx >= Math.ceil(cols) || gy >= Math.ceil(rows)) continue
        const key = gx * 4096 + gy
        if (seen.has(key)) continue
        seen.add(key)
        ctx.globalAlpha = alpha
        ctx.fillStyle = color
        ctx.fillRect(gx * cell, gy * cell, size, size)
      }
      ctx.globalAlpha = 1
    },
    { playing, deps: [cell, speed, autoplay, swarm] },
  )

  return (
    <canvas
      ref={canvas}
      role="img"
      aria-label="A DNA helix replicates, becomes an organism, grows into a tree and scatters its seeds."
      className={cn("block h-[clamp(300px,34vw,470px)] w-full", className)}
    />
  )
}

type Shape = { cols: number; rows: number; t: number; progress: number; p: Palette; tree: { branches: Branch[]; tips: [number, number][]; total: number } }
type Seed = { a: number; b: number; c: number; d: number }

function target(phase: Phase, s: Seed, shape: Shape): Target {
  switch (phase) {
    case "helix":
      return helix(s, shape, shape.cols / 2, shape.rows / 2, null)
    case "replicate":
      return helix(s, shape, shape.cols / 2, shape.rows / 2, 0.08 + shape.progress * 1.1)
    case "organism":
      return organism(s, shape)
    case "tree":
      return treeShape(s, shape, false)
    case "seeds":
      return treeShape(s, shape, true)
  }
}

/**
 * A double helix across the middle. With `fork` set, the part left of the
 * fork has unzipped into two helices, each an old strand paired with a new
 * lime one; right of it the original is still whole.
 */
function helix(s: Seed, { cols, rows, t, p }: Shape, cx: number, cy: number, fork: number | null): Target {
  const x0 = cols * 0.12
  const x1 = cols * 0.88
  const x = x0 + s.a * (x1 - x0)
  const along = (x - x0) / (x1 - x0)
  const amp = Math.min(rows * 0.2, 7)
  const phase = x * 0.34 - t * 1.4
  const role = s.b < 0.36 ? "a" : s.b < 0.72 ? "b" : "rung"
  const split = fork !== null && along < fork
  const gap = split ? Math.min(1, (fork - along) * 6) * Math.min(rows * 0.24, 9) : 0

  if (!split) {
    if (role === "rung") {
      const rung = Math.round(x / 3) * 3
      const ya = cy + Math.sin(rung * 0.34 - t * 1.4) * amp
      const yb = cy - Math.sin(rung * 0.34 - t * 1.4) * amp
      const front = Math.cos(rung * 0.34 - t * 1.4) > 0
      return [rung, ya + (yb - ya) * s.c, s.c < 0.5 ? p.cobaltPale : p.goldPale, front ? 1 : 0.55]
    }
    const sign = role === "a" ? 1 : -1
    const front = Math.cos(phase) * sign > 0
    return [x, cy + Math.sin(phase) * amp * sign, role === "a" ? (front ? p.cobalt : p.cobaltSoft) : front ? p.gold : p.goldSoft, 1]
  }
  // Unzipped: strand a goes up, strand b down, rungs become the new lime strands.
  const up = role === "a" || (role === "rung" && s.c < 0.5)
  const centre = cy + (up ? -gap : gap)
  const small = amp * 0.7
  if (role === "rung") {
    const sign = up ? -1 : 1
    return [x, centre + Math.sin(phase) * small * sign, p.lime, 1]
  }
  const sign = up ? 1 : -1
  return [x, centre + Math.sin(phase) * small * sign, role === "a" ? p.cobalt : p.gold, 1]
}

/** One cell: a lime membrane, beating cilia, cobalt cytoplasm and a navy nucleus. */
function organism(s: Seed, { cols, rows, t, p }: Shape): Target {
  const cx = cols / 2 + Math.sin(t * 0.8) * 3
  const cy = rows / 2 + Math.sin(t * 1.3) * 0.8
  const R = Math.min(rows * 0.3, 11)
  if (s.b < 0.38) {
    const angle = s.a * Math.PI * 2
    const r = R + Math.sin(angle * 6 + t * 3) * 0.7
    return [cx + Math.cos(angle) * r * 1.25, cy + Math.sin(angle) * r, p.lime, 1]
  }
  if (s.b < 0.58) {
    const cilium = Math.floor(s.a * 16)
    const angle = (cilium / 16) * Math.PI * 2
    const len = 1.5 + s.c * 4
    const beat = Math.sin(t * 5 + cilium) * 0.35 * (len / 5)
    const r = R + len
    return [cx + Math.cos(angle + beat) * r * 1.25, cy + Math.sin(angle + beat) * r, s.c > 0.7 ? p.lime : p.goldSoft, 1]
  }
  if (s.b < 0.72) {
    const r = Math.sqrt(s.c) * R * 0.3
    const angle = s.a * Math.PI * 2
    return [cx + R * 0.25 + Math.cos(angle) * r * 1.25, cy - R * 0.15 + Math.sin(angle) * r, s.c < 0.25 ? p.gold : p.navy, 1]
  }
  const r = Math.sqrt(s.c) * (R - 2)
  const angle = s.a * Math.PI * 2 + t * 0.2 * (s.d - 0.5)
  return [cx + Math.cos(angle) * r * 1.25, cy + Math.sin(angle) * r, s.d < 0.5 ? p.cobaltPale : p.cobaltSoft, 1]
}

/** A tree rooted at the bottom middle, swaying; with `seeds`, some leaves fly off. */
function treeShape(s: Seed, { cols, rows, t, p, tree }: Shape, seeds: boolean): Target {
  const sway = (y: number) => ((rows - y) / rows) * Math.sin(t * 1.1) * 1.4
  if (s.b < 0.46) {
    // Branches by length, so the trunk gets its share; the lower limbs are
    // two squares thick.
    const pick = s.a * tree.total
    const branch = tree.branches.find((b) => b.cum >= pick) ?? tree.branches[tree.branches.length - 1]
    const x = branch.x0 + (branch.x1 - branch.x0) * s.c + (branch.depth < 2 ? (s.d < 0.5 ? -0.5 : 0.5) * (2 - branch.depth) : 0)
    const y = branch.y0 + (branch.y1 - branch.y0) * s.c
    return [cols / 2 + x + sway(y), y, branch.depth < 2 ? p.navy : p.ink, 1]
  }
  const [tx, ty] = tree.tips[Math.floor(s.a * tree.tips.length)]
  const r = Math.sqrt(s.c) * 3.4
  const angle = s.d * Math.PI * 2
  let x = cols / 2 + tx + Math.cos(angle) * r * 1.3 + sway(ty)
  let y = ty + Math.sin(angle) * r
  const color = s.b < 0.82 ? p.lime : s.b < 0.93 ? p.gold : p.signal
  if (seeds && s.b > 0.82) {
    // Seeds ride the wind out to the right and away.
    const f = (t * 0.22 + s.a * 3 + s.c) % 1
    x += f * cols * 0.55
    y += -f * rows * 0.3 + Math.sin(f * 12 + s.d * 6) * 2
    return [x, y, p.gold, 1 - f * 0.6]
  }
  return [x, y, color, 1]
}

function growTree(cols: number, rows: number) {
  const branches: Branch[] = []
  const tips: [number, number][] = []
  const trunk = rows * 0.34
  const grow = (x: number, y: number, angle: number, length: number, depth: number, n: number) => {
    const x1 = x + Math.cos(angle) * length * 1.3
    const y1 = y - Math.sin(angle) * length
    branches.push({ x0: x, y0: y, x1, y1, depth, cum: 0 })
    if (depth >= 4 || length < 2) {
      tips.push([x1, y1])
      return
    }
    const spread = 0.42 + hash2(n, depth) * 0.25
    grow(x1, y1, angle + spread, length * 0.7, depth + 1, n * 2 + 1)
    grow(x1, y1, angle - spread, length * 0.72, depth + 1, n * 2 + 2)
    if (depth === 1) grow(x1, y1, angle + (hash2(n, 9) - 0.5) * 0.3, length * 0.6, depth + 2, n * 3)
  }
  grow(0, rows - 1, Math.PI / 2, trunk, 0, 1)
  void cols
  let total = 0
  for (const b of branches) {
    total += Math.hypot(b.x1 - b.x0, b.y1 - b.y0) * (b.depth < 2 ? 2 : 1)
    b.cum = total
  }
  return { rows: Math.round(rows), branches, tips, total }
}
