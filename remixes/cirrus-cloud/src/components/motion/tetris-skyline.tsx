import { useCallback, useEffect, useRef, useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { cn } from "@/lib/utils"
import { fitCanvas, hash2, readPalette, useFrameLoop, type Palette } from "./frame-loop"

const SHAPES = [
  [[0, 0], [1, 0], [2, 0], [3, 0]], // I
  [[0, 0], [1, 0], [0, 1], [1, 1]], // O
  [[0, 0], [1, 0], [2, 0], [1, 1]], // T
  [[1, 0], [2, 0], [0, 1], [1, 1]], // S
  [[0, 0], [1, 0], [1, 1], [2, 1]], // Z
  [[0, 0], [0, 1], [1, 1], [2, 1]], // J
  [[2, 0], [0, 1], [1, 1], [2, 1]], // L
] as const

type Cell = [number, number]
type Piece = { cells: Cell[]; x: number; y: number; color: number }

const rotate = (cells: Cell[]): Cell[] => {
  const turned = cells.map(([x, y]) => [-y, x] as Cell)
  const minX = Math.min(...turned.map((c) => c[0]))
  const minY = Math.min(...turned.map((c) => c[1]))
  return turned.map(([x, y]) => [x - minX, y - minY] as Cell)
}

/**
 * The page's foot: a skyline of stacked squares along the bottom edge, with
 * pieces falling onto it now and then — and a button that hands you the
 * next one.
 *
 * Idle, pieces drop at random columns and lock where they land. Playing, the
 * falling piece is yours: ← → to move, ↑ to turn, ↓ to drop faster, space to
 * slam it down — or on a phone, tap left or right of the button to move and
 * tap the button again to turn. A full row clears, as it should.
 */
export function TetrisSkyline({
  cell = 9,
  rows = 18,
  fall = 7,
  skyline = 0.6,
  playing: animate = true,
  className,
}: {
  /** Pitch of the grid in px. */
  cell?: number
  /** How many squares tall the play area is. */
  rows?: number
  /** Rows a piece falls per second. */
  fall?: number
  /** 0–1: how tall the starting skyline is, as a share of the rows. */
  skyline?: number
  playing?: boolean
  className?: string
}) {
  const canvas = useRef<HTMLCanvasElement>(null)
  const palette = useRef<Palette | null>(null)
  const [game, setGame] = useState(false)
  const [next, setNext] = useState(2)
  const state = useRef({
    cols: 0,
    grid: [] as number[][],
    pieces: [] as Piece[],
    player: null as Piece | null,
    acc: 0,
    playerAcc: 0,
    spawnIn: 0.4,
    seed: 1,
  })

  useCanvasAction("Play Tetris", (on) => setGame(on ?? !game), { on: game, group: "Footer" })

  const colors = (p: Palette) => [p.gold, p.lime, p.signal, p.cobalt, p.navy]

  const fits = (piece: Piece, dx = 0, dy = 0, cells = piece.cells) => {
    const s = state.current
    return cells.every(([cx, cy]) => {
      const x = piece.x + cx + dx
      const y = piece.y + cy + dy
      return x >= 0 && x < s.cols && y < rows && (y < 0 || !s.grid[y]?.[x])
    })
  }

  const spawn = useCallback(
    (x?: number, shape?: number): Piece => {
      const s = state.current
      s.seed += 1
      const kind = shape ?? Math.floor(hash2(s.seed, 5) * SHAPES.length)
      let cells = SHAPES[kind].map(([a, b]) => [a, b] as Cell)
      const turns = Math.floor(hash2(s.seed, 6) * 4)
      for (let n = 0; n < turns; n++) cells = rotate(cells)
      const col = x ?? Math.floor(hash2(s.seed, 7) * Math.max(1, s.cols - 4))
      return { cells, x: col, y: -2, color: 1 + Math.floor(hash2(s.seed, 8) * 5) }
    },
    [],
  )

  const lock = (piece: Piece) => {
    const s = state.current
    for (const [cx, cy] of piece.cells) {
      const y = piece.y + cy
      if (y >= 0 && y < rows) s.grid[y][piece.x + cx] = piece.color
    }
    // Full rows clear; a stack that reaches the top sinks back down.
    s.grid = s.grid.filter((row) => row.some((v) => !v))
    while (s.grid.length < rows) s.grid.unshift(new Array(s.cols).fill(0))
    const peak = s.grid.findIndex((row) => row.some(Boolean))
    if (peak !== -1 && peak < 3) {
      s.grid.splice(rows - 4, 4)
      for (let n = 0; n < 4; n++) s.grid.unshift(new Array(s.cols).fill(0))
    }
  }

  // Keys, while playing.
  useEffect(() => {
    if (!game) return
    const s = state.current
    s.player = spawn(Math.floor(s.cols / 2) - 1, next)
    const onKey = (event: KeyboardEvent) => {
      const piece = s.player
      if (!piece) return
      const key = event.key
      if (!["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", " "].includes(key)) return
      event.preventDefault()
      if (key === "ArrowLeft" && fits(piece, -1)) piece.x -= 1
      if (key === "ArrowRight" && fits(piece, 1)) piece.x += 1
      if (key === "ArrowDown" && fits(piece, 0, 1)) piece.y += 1
      if (key === "ArrowUp") {
        const turned = rotate(piece.cells)
        if (fits(piece, 0, 0, turned)) piece.cells = turned
      }
      if (key === " ") {
        while (fits(piece, 0, 1)) piece.y += 1
        s.playerAcc = 1
      }
    }
    window.addEventListener("keydown", onKey)
    return () => {
      window.removeEventListener("keydown", onKey)
      s.player = null
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [game])

  const nudge = (dx: number) => {
    const piece = state.current.player
    if (piece && fits(piece, dx)) piece.x += dx
  }

  useFrameLoop(
    (_time, dt) => {
      const el = canvas.current
      if (!el) return
      palette.current ??= readPalette()
      const palette_ = colors(palette.current)
      const { ctx, w, h } = fitCanvas(el)
      const s = state.current
      const cols = Math.ceil(w / cell)

      if (s.cols !== cols) {
        // A fresh skyline: towers of uneven height with the odd gap.
        s.cols = cols
        s.grid = Array.from({ length: rows }, () => new Array(cols).fill(0))
        for (let x = 0; x < cols; x++) {
          const gap = hash2(x, 1) > 0.82
          const tall = gap ? 0 : Math.floor(hash2(Math.floor(x / 3), 2) * rows * skyline * 1.4 * hash2(x, 3)) + 1
          for (let y = rows - tall; y < rows; y++) {
            if (y < 0) continue
            if (hash2(x, y) > 0.2 || y === rows - 1) s.grid[y][x] = 1 + Math.floor(hash2(x * 5, y * 3) * 5)
          }
        }
        s.pieces = []
      }

      // Time moves in rows: the idle pieces at `fall`, yours at a pace you can steer.
      s.acc += dt * fall
      const steps = Math.floor(s.acc)
      s.acc -= steps
      for (let n = 0; n < steps; n++) {
        for (const piece of [...s.pieces]) {
          if (fits(piece, 0, 1)) piece.y += 1
          else {
            lock(piece)
            s.pieces = s.pieces.filter((other) => other !== piece)
          }
        }
      }
      if (s.player) {
        s.playerAcc += dt * 2.5
        while (s.playerAcc >= 1 && s.player) {
          s.playerAcc -= 1
          if (fits(s.player, 0, 1)) s.player.y += 1
          else {
            lock(s.player)
            s.player = spawn(Math.floor(cols / 2) - 1, next)
            s.playerAcc = 0
            setNext(Math.floor(hash2(s.seed, 11) * SHAPES.length))
          }
        }
      }
      s.spawnIn -= dt
      if (s.spawnIn <= 0 && s.pieces.length < 3) {
        s.pieces.push(spawn())
        s.spawnIn = 0.6 + hash2(s.seed, 12) * 1.4
      }

      ctx.clearRect(0, 0, w, h)
      const size = cell - 1
      const top = h - rows * cell
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const v = s.grid[y][x]
          if (!v) continue
          ctx.fillStyle = palette_[v - 1]
          ctx.fillRect(x * cell, top + y * cell, size, size)
        }
      }
      for (const piece of [...s.pieces, ...(s.player ? [s.player] : [])]) {
        ctx.fillStyle = palette_[piece.color - 1]
        for (const [cx, cy] of piece.cells) {
          const y = piece.y + cy
          if (y < 0) continue
          ctx.fillRect((piece.x + cx) * cell, top + y * cell, size, size)
        }
      }
    },
    { playing: animate, deps: [cell, rows, fall, skyline] },
  )

  return (
    <div className={cn("relative", className)}>
      <canvas
        ref={canvas}
        aria-hidden
        className="block w-full touch-manipulation"
        style={{ height: rows * cell }}
        onPointerDown={(event) => {
          if (!game) return
          const rect = event.currentTarget.getBoundingClientRect()
          nudge(event.clientX < rect.left + rect.width / 2 ? -1 : 1)
        }}
      />
      <button
        type="button"
        aria-pressed={game}
        onClick={() => {
          if (!game) return setGame(true)
          const piece = state.current.player
          if (piece) {
            const turned = rotate(piece.cells)
            if (fits(piece, 0, 0, turned)) piece.cells = turned
          }
        }}
        onDoubleClick={() => setGame(false)}
        className="notch absolute bottom-[calc(var(--spacing-pixel)*2)] left-1/2 inline-flex h-14 min-w-34 -translate-x-1/2 items-center justify-center gap-4 bg-ink px-8 text-[1.125rem] text-paper transition-transform duration-(--duration-press) ease-(--ease-out) outline-none select-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cobalt"
      >
        {game ? "turn" : "play"}
        <NextPiece shape={next} />
      </button>
      {game && (
        <p className="label pointer-events-none absolute bottom-[calc(var(--spacing-pixel)*2+4.25rem)] left-1/2 w-max -translate-x-1/2 text-mute">
          ← → move · ↑ turn · space drop · double-click to stop
        </p>
      )}
    </div>
  )
}

/** The next piece, drawn in 3px squares inside the button. */
function NextPiece({ shape }: { shape: number }) {
  const cells = SHAPES[shape]
  const tones = ["var(--color-gold)", "var(--color-lime)", "var(--color-signal)", "var(--color-cobalt)", "var(--color-lime)", "var(--color-signal)", "var(--color-gold)"]
  return (
    <svg aria-hidden viewBox="0 0 16 8" className="h-2 w-4">
      {cells.map(([x, y]) => (
        <rect key={`${x}-${y}`} x={x * 4} y={y * 4} width={3} height={3} fill={tones[shape]} />
      ))}
    </svg>
  )
}
