import { useMemo } from "react"

import { cn } from "@/lib/utils"

/**
 * Isometric server illustrations, built from voxels.
 *
 * Each model is a list of unit cubes; each cube is drawn as three faces —
 * a light top, a mid left and a dark right — in painter's order, so the
 * pictures are crisp at any size and take their colours from the palette
 * tokens. Status lights blink on their own offsets (CSS, so the editor's
 * Motion switch reaches them; reduced motion holds them lit).
 */

type Material = "shell" | "unit" | "metal" | "board" | "gold" | "cobalt" | "lime" | "cyan" | "signal" | "violet"
type Voxel = [x: number, y: number, z: number, m: Material, blink?: number]

const SHADES: Record<Material, [top: string, left: string, right: string]> = {
  shell: ["var(--color-rack)", "#1d2439", "#141a2b"],
  unit: ["#343d5c", "#2a3250", "#1f263d"],
  metal: ["#eef0f7", "#c6cbe0", "#9aa2c0"],
  board: ["#2b3354", "#20273f", "#171c2f"],
  gold: ["var(--color-gold-pale)", "var(--color-gold)", "#c9960f"],
  cobalt: ["var(--color-cobalt-pale)", "var(--color-cobalt)", "#2b3ba4"],
  lime: ["#efff8a", "var(--color-lime)", "#aecc00"],
  cyan: ["#b8f6ff", "var(--color-cyan)", "#1fb4cc"],
  signal: ["#ff9a8c", "var(--color-signal)", "#b92a17"],
  violet: ["#b9a9ff", "var(--color-violet)", "#4430b8"],
}

const box = (x0: number, y0: number, z0: number, w: number, d: number, h: number, m: Material): Voxel[] => {
  const out: Voxel[] = []
  for (let x = x0; x < x0 + w; x++) for (let y = y0; y < y0 + d; y++) for (let z = z0; z < z0 + h; z++) out.push([x, y, z, m])
  return out
}

/** Swap the material of the cubes at these coordinates. */
const paint = (voxels: Voxel[], at: (v: Voxel) => Material | null, blink?: (v: Voxel) => number | undefined): Voxel[] =>
  voxels.map((v) => {
    const m = at(v)
    return m ? [v[0], v[1], v[2], m, blink?.(v)] : v
  })

const MODELS = {
  /** A full-height rack: units down the front, a light on each. */
  rack: () =>
    paint(
      box(0, 0, 0, 4, 3, 10, "shell"),
      ([x, y, z]) => (y === 2 && z % 2 === 1 && z < 9 ? (x === 0 ? (z % 4 === 1 ? "lime" : "cyan") : "unit") : z === 9 ? "cobalt" : null),
      ([x, y, z]) => (y === 2 && x === 0 && z % 2 === 1 ? z : undefined),
    ),
  /** Three small machines side by side, one per branch, each with a beacon. */
  branches: () => [
    ...[0, 4, 8].flatMap((x, i) =>
      paint(
        box(x, 0, 0, 3, 3, 3 + (i % 2), "metal"),
        ([vx, vy, vz]) => (vy === 2 && vz === 1 && vx === x ? (i === 1 ? "signal" : "lime") : vy === 2 && vz === 1 ? "shell" : null),
        ([vx, vy, vz]) => (vy === 2 && vz === 1 && vx === x ? i * 3 + 1 : undefined),
      ),
    ),
    ...[0, 4, 8].map((x, i): Voxel => [x + 1, 1, 3 + (i % 2), i === 1 ? "violet" : "cyan", i * 2 + 2]),
  ],
  /** An accelerator card: a dark board, two fans, a bracket. */
  gpu: () => [
    ...box(0, 0, 0, 8, 4, 1, "board"),
    ...box(0, 0, 1, 1, 4, 3, "metal"),
    ...paint(box(2, 0, 1, 2, 2, 1, "metal"), ([x, y]) => (x === 3 && y === 1 ? "gold" : null)),
    ...paint(box(5, 0, 1, 2, 2, 1, "metal"), ([x, y]) => (x === 6 && y === 1 ? "gold" : null)),
    ...box(2, 3, 1, 5, 1, 1, "cobalt"),
    [7, 3, 1, "lime", 3] as Voxel,
  ],
  /** A fenced sandbox: corner posts and a top frame around the agent inside. */
  sandbox: () => [
    ...box(0, 0, 0, 5, 5, 1, "board"),
    ...[0, 4].flatMap((x) => [0, 4].flatMap((y) => box(x, y, 1, 1, 1, 4, "metal"))),
    ...box(1, 0, 4, 3, 1, 1, "metal"),
    ...box(0, 1, 4, 1, 3, 1, "metal"),
    ...box(2, 2, 1, 1, 1, 2, "lime"),
    [2, 2, 3, "cyan", 2] as Voxel,
  ],
  /** A circuit board: a gold die in the middle, traces running off it. */
  board: () => [
    ...box(0, 0, 0, 7, 7, 1, "board"),
    ...box(2, 2, 1, 3, 3, 1, "gold"),
    ...box(3, 3, 2, 1, 1, 1, "signal"),
    ...[0, 1, 5, 6].map((x): Voxel => [x, 3, 1, "cobalt"]),
    ...[0, 1, 5, 6].map((y): Voxel => [3, y, 1, "cobalt"]),
    [0, 0, 1, "lime", 1] as Voxel,
    [6, 6, 1, "cyan", 4] as Voxel,
  ],
} satisfies Record<string, () => Voxel[]>

export type IsoModel = keyof typeof MODELS

const W = 8
const H = 4.6
const Z = 9

export function IsoServer({ model, className }: { model: IsoModel; className?: string }) {
  const { faces, box: view } = useMemo(() => {
    const voxels = MODELS[model]()
    const filled = new Set(voxels.map(([x, y, z]) => `${x},${y},${z}`))
    const has = (x: number, y: number, z: number) => filled.has(`${x},${y},${z}`)
    const sorted = [...voxels].sort((a, b) => a[0] + a[1] + a[2] - (b[0] + b[1] + b[2]) || a[2] - b[2])
    const faces: { d: string; fill: string; blink?: number }[] = []
    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity
    for (const [x, y, z, m, blink] of sorted) {
      const sx = (x - y) * W
      const sy = (x + y) * H - z * Z
      const [top, left, right] = SHADES[m]
      const pt = (dx: number, dy: number) => {
        const px = sx + dx
        const py = sy + dy
        minX = Math.min(minX, px)
        maxX = Math.max(maxX, px)
        minY = Math.min(minY, py)
        maxY = Math.max(maxY, py)
        return `${px.toFixed(2)},${py.toFixed(2)}`
      }
      // top (+z), left (+y) and right (+x) faces — hidden ones are skipped.
      if (!has(x, y, z + 1)) faces.push({ d: `M${pt(0, -Z)}L${pt(W, H - Z)}L${pt(0, 2 * H - Z)}L${pt(-W, H - Z)}Z`, fill: top, blink })
      if (!has(x, y + 1, z)) faces.push({ d: `M${pt(-W, H - Z)}L${pt(0, 2 * H - Z)}L${pt(0, 2 * H)}L${pt(-W, H)}Z`, fill: left, blink })
      if (!has(x + 1, y, z)) faces.push({ d: `M${pt(0, 2 * H - Z)}L${pt(W, H - Z)}L${pt(W, H)}L${pt(0, 2 * H)}Z`, fill: right, blink })
    }
    return { faces, box: `${minX - 2} ${minY - 2} ${maxX - minX + 4} ${maxY - minY + 4}` }
  }, [model])

  return (
    <svg viewBox={view} aria-hidden shapeRendering="geometricPrecision" className={cn("overflow-visible", className)}>
      {faces.map((face, i) => (
        <path
          key={i}
          d={face.d}
          fill={face.fill}
          stroke={face.fill}
          strokeWidth={0.35}
          className={face.blink !== undefined ? "iso-blink" : undefined}
          style={face.blink !== undefined ? { animationDelay: `${(face.blink % 7) * -0.37}s` } : undefined}
        />
      ))}
    </svg>
  )
}
