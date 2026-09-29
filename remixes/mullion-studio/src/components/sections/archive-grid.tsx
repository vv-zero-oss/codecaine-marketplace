import { motion, useReducedMotion, useTransform, type MotionValue } from "motion/react"
import { useMemo } from "react"

import { useArchive } from "@/components/archive-state"
import { FRAMES, type Frame } from "@/frames"
import { photo } from "@/lib/image"
import { EASE_OUT_EXPO, EASE_OUT_QUINT } from "@/lib/motion"

export type IntroPhase = "text" | "cluster" | "spread" | "done"

/** The field's geometry, from the window size. */
export function fieldLayout(w: number, h: number) {
  const tile = Math.round(Math.min(112, Math.max(72, w * 0.064)))
  const px = tile * (w < 640 ? 1.7 : 1.95)
  const py = tile * 2.13
  const cols = Math.ceil(w / px) + 2
  const pan = Math.round(h * 1.6)
  const rows = Math.ceil((h + pan + py) / py) + 1
  const x0 = (w - (cols - 1) * px) / 2 - tile / 2
  const y0 = w < 640 ? 160 : 150
  return { tile, px, py, cols, rows, pan, x0, y0 }
}

type Layout = ReturnType<typeof fieldLayout>

type Tile = {
  key: string
  frame: Frame
  col: number
  left: number
  top: number
  /** Offset from its grid spot to its place in the opening cluster, if any. */
  cluster?: { dx: number; dy: number; order: number }
  /** 0–1, how far from the centre of the screen: sets the spread's fade-in. */
  distance: number
  /** Random 0–1, staggers the collapse when the view changes. */
  jitter: number
}

// The opening diamond: 1 + 3 + 5 + 3 + 1 tiles, in (col, row) steps.
const DIAMOND: [number, number][] = [
  [0, 0], [0, -1], [-1, 0], [1, 0], [0, 1],
  [-1, -1], [1, -1], [-1, 1], [1, 1], [0, -2], [-2, 0], [2, 0], [0, 2],
]
// The order the cluster's tiles pop in — scattered, as in a contact print coming up.
const POP_ORDER = [6, 0, 3, 12, 9, 1, 4, 7, 2, 10, 5, 8, 11]

function buildTiles(l: Layout, w: number, h: number): Tile[] {
  const tiles: Tile[] = []
  const cx = w / 2
  const cy = h / 2
  const maxD = Math.hypot(cx, cy)
  let seed = 7
  const rand = () => ((seed = (seed * 16807) % 2147483647) / 2147483647)
  for (let c = 0; c < l.cols; c++) {
    for (let r = 0; r < l.rows; r++) {
      const left = l.x0 + c * l.px
      const top = l.y0 + r * l.py + (c % 2 ? l.tile * 0.5 : 0)
      const d = Math.hypot(left + l.tile / 2 - cx, top + l.tile / 2 - cy)
      tiles.push({
        key: `${c}-${r}`,
        frame: FRAMES[(r * l.cols + c * 5) % FRAMES.length],
        col: c,
        left,
        top,
        distance: Math.min(1, d / maxD),
        jitter: rand(),
      })
    }
  }

  // The thirteen tiles nearest the centre open the page as a tight diamond,
  // each flying out to its own spot in the grid.
  const pitch = l.tile * 0.92
  const onScreen = tiles.filter((t) => t.top + l.tile < h && t.left > -l.tile / 2 && t.left + l.tile < w + l.tile / 2)
  const candidates = [...onScreen].sort((a, b) => a.distance - b.distance).slice(0, DIAMOND.length)
  DIAMOND.forEach(([dc, dr], slot) => {
    const target = { x: cx + dc * l.px * 1.1, y: cy + dr * l.py * 0.9 }
    let best = candidates[0]
    let bestD = Infinity
    for (const t of candidates) {
      const d = Math.hypot(t.left + l.tile / 2 - target.x, t.top + l.tile / 2 - target.y)
      if (d < bestD) (best = t), (bestD = d)
    }
    candidates.splice(candidates.indexOf(best), 1)
    best.cluster = {
      dx: cx + dc * pitch - (best.left + l.tile / 2),
      dy: cy + dr * pitch - (best.top + l.tile / 2),
      order: POP_ORDER.indexOf(slot),
    }
  })
  return tiles
}

/**
 * The archive as a field of frames, scattered in staggered columns, that the
 * page's scroll pans diagonally across. Odd columns travel a little faster
 * than even ones, so the field has depth as it drifts.
 */
export function ArchiveGrid({
  w,
  h,
  progress,
  phase,
  onOpen,
}: {
  w: number
  h: number
  progress: MotionValue<number>
  phase: IntroPhase
  onOpen: (frame: Frame) => void
}) {
  const l = useMemo(() => fieldLayout(w, h), [w, h])
  const tiles = useMemo(() => buildTiles(l, w, h), [l, w, h])
  const reduced = useReducedMotion()

  const x = useTransform(progress, [0, 1], [0, reduced ? 0 : -l.px * 0.55])
  const yEven = useTransform(progress, [0, 1], [0, -l.pan])
  const yOdd = useTransform(progress, [0, 1], [0, -l.pan * (reduced ? 1 : 1.12)])

  const columns = Array.from({ length: l.cols }, (_, c) => tiles.filter((t) => t.col === c))

  return (
    <motion.div style={{ x }} className="absolute inset-0" aria-label="Edited frames">
      {columns.map((column, c) => (
        <motion.div key={c} style={{ y: c % 2 ? yOdd : yEven }} className="absolute inset-0 will-change-transform">
          {column.map((tile) => (
            <FieldTile key={tile.key} tile={tile} size={l.tile} phase={phase} onOpen={onOpen} />
          ))}
        </motion.div>
      ))}
    </motion.div>
  )
}

function FieldTile({
  tile,
  size,
  phase,
  onOpen,
}: {
  tile: Tile
  size: number
  phase: IntroPhase
  onOpen: (frame: Frame) => void
}) {
  const { matches } = useArchive()
  const { frame, cluster } = tile
  const lit = matches(frame)

  // Where the tile is and how it arrives, per intro phase.
  const inCluster = cluster && (phase === "text" || phase === "cluster")
  const visible =
    phase === "done" || phase === "spread" ? (lit ? 1 : 0.08) : phase === "cluster" && cluster ? 1 : 0
  const transition =
    phase === "cluster"
      ? { opacity: { duration: 0.14, delay: 0.12 + (cluster?.order ?? 0) * 0.11 } }
      : phase === "spread"
        ? {
            x: { duration: 0.95, ease: EASE_OUT_EXPO },
            y: { duration: 0.95, ease: EASE_OUT_EXPO },
            scale: { duration: 0.95, ease: EASE_OUT_EXPO },
            opacity: cluster ? { duration: 0 } : { duration: 0.6, delay: 0.25 + tile.distance * 0.55, ease: EASE_OUT_QUINT },
          }
        : { opacity: { duration: 0.35, ease: EASE_OUT_QUINT } }

  return (
    <motion.div
      className="absolute"
      style={{ left: tile.left, top: tile.top - 14, width: size, originY: 0.5 }}
      initial={false}
      animate={{
        x: inCluster ? cluster.dx : 0,
        y: inCluster ? cluster.dy : 0,
        scale: inCluster ? 0.6 : 1,
        opacity: visible,
      }}
      exit={{ scaleY: 0, opacity: 0, transition: { duration: 0.32, delay: tile.jitter * 0.28, ease: EASE_OUT_QUINT } }}
      transition={transition}
    >
      <motion.div
        className="mb-[6px] flex h-2 items-center justify-between gap-2 text-label tracking-[0.02em] text-ink"
        animate={{ opacity: phase === "done" || (phase === "spread" && !cluster) ? 1 : 0 }}
        transition={{ duration: 0.4, delay: phase === "spread" ? 0.6 : 0 }}
      >
        <span className="shrink-0">{String(frame.n).padStart(2, "0")} .</span>
        <span className="truncate">{frame.name}</span>
      </motion.div>
      <button
        type="button"
        onClick={() => onOpen(frame)}
        disabled={!lit}
        className="group/tile block aspect-square w-full cursor-pointer overflow-hidden bg-paper-3 outline-none focus-visible:ring-2 focus-visible:ring-blueprint focus-visible:ring-offset-2 focus-visible:ring-offset-paper disabled:cursor-default"
        aria-label={`Open ${frame.name} in the studio`}
      >
        <img
          src={photo(frame.id, size)}
          alt={frame.alt}
          loading={tile.distance < 0.6 ? "eager" : "lazy"}
          decoding="async"
          className="size-full object-cover transition-transform duration-500 ease-[var(--ease-out-quint)] group-hover/tile:scale-[1.06]"
        />
      </button>
    </motion.div>
  )
}
