import { useEffect, useMemo, useRef, useState } from "react"
import { useReducedMotion } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { ProjectCell } from "@/components/work/project-cell"
import type { Project } from "@/data/projects"
import { createClock } from "@/lib/clock-animation"
import { useIntroDone } from "@/lib/intro"
import { cn } from "@/lib/utils"

/**
 * The wall: every project as a cell on the inside of a sphere — the middle
 * flat and far, the edges tilting in towards you — that you drag in any
 * direction, forever. It drifts by itself when nobody is holding it, carries
 * a flick on a little momentum, and arrives after the intro by flying in
 * from depth.
 *
 * Each cell is placed by hand every frame (transform only). The drift and
 * the entrance read their time off Web Animations (`clock-animation.ts`), so
 * the editor's Motion switch stops the drift and finishes the entrance.
 *
 * Every knob is a scalar prop: `speed` (drift, px/s), `curvature` (0 is a
 * flat grid), `direction` of drift, `paused`, `momentum`.
 */
export function ProjectWall({
  projects,
  speed = 16,
  curvature = 1.15,
  direction = "diagonal",
  paused = false,
  momentum = true,
  className,
}: {
  projects: Project[]
  speed?: number
  curvature?: number
  direction?: "left" | "up" | "diagonal"
  paused?: boolean
  momentum?: boolean
  className?: string
}) {
  const stageRef = useRef<HTMLDivElement>(null)
  const cellRefs = useRef<(HTMLElement | null)[]>([])
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const introDone = useIntroDone()
  const [grid, setGrid] = useState({ cols: 9, rows: 6, w: 300, h: 310 })
  const [held, setHeld] = useState(false)

  // Live values the frame loop reads without re-rendering.
  const live = useRef({ speed, curvature, direction, momentum, reduced: !!reduced })
  live.current = { speed, curvature, direction, momentum, reduced: !!reduced }

  // The drift clock: an endless Web Animation the editor can pause.
  const driftRef = useRef<ReturnType<typeof createClock> | null>(null)
  const stopDrift = paused || designing || !!reduced || held
  useCanvasAction("Pause wall", (next) => setHeld(next ?? !held), { on: held, group: "Work" })

  useEffect(() => {
    const drift = driftRef.current
    if (!drift) return
    if (stopDrift) drift.animation.pause()
    else drift.animation.play()
  }, [stopDrift])

  // Size the grid to the window: enough columns and rows to cover it with a
  // cell and a half to spare on every side, so wrapping is never seen.
  useEffect(() => {
    const measure = () => {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const w = vw < 640 ? Math.max(168, Math.min(vw * 0.5, 230)) : Math.max(220, Math.min(vw * 0.195, 400))
      const h = Math.round(w * 1.03)
      setGrid({ cols: Math.ceil(vw / w) + 3, rows: Math.ceil(vh / h) + 3, w: Math.round(w), h })
    }
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [])

  const cells = useMemo(() => {
    const out: { key: string; project: Project | undefined; col: number; row: number }[] = []
    for (let row = 0; row < grid.rows; row++)
      for (let col = 0; col < grid.cols; col++) {
        // Offset each row so a project is never stacked on itself.
        const i = projects.length ? (row * 5 + col * 1 + row * grid.cols) % projects.length : -1
        out.push({ key: `${col}-${row}`, project: i >= 0 ? projects[i] : undefined, col, row })
      }
    return out
  }, [grid, projects])

  useEffect(() => {
    const stage = stageRef.current
    if (!stage) return
    const drift = createClock(stage)
    driftRef.current = drift
    if (stopDrift) drift.animation.pause()
    const entrance = introDone ? createClock(stage, 1150) : null

    const state = { ox: 0, oy: 0, vx: 0, vy: 0, dragging: false, moved: 0, lastX: 0, lastY: 0, lastT: 0, tx: 0, ty: 0, driftBase: 0 }
    let raf = 0
    let last = performance.now()
    let visible = true
    const { cols, rows, w, h } = grid
    const totalW = cols * w
    const totalH = rows * h

    const mod = (n: number, m: number) => ((n % m) + m) % m

    const frame = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      const L = live.current
      const vw = stage.clientWidth
      const vh = stage.clientHeight

      // Momentum after a flick, decaying ~8% a frame.
      if (!state.dragging && L.momentum && !L.reduced) {
        state.ox += state.vx * dt
        state.oy += state.vy * dt
        const k = Math.pow(0.92, dt / 16)
        state.vx *= k
        state.vy *= k
      }
      // Keyboard and focus targets glide in.
      if (state.tx || state.ty) {
        const k = L.reduced ? 1 : 1 - Math.pow(0.82, dt / 16)
        state.ox += state.tx * k
        state.oy += state.ty * k
        state.tx -= state.tx * k
        state.ty -= state.ty * k
        if (Math.abs(state.tx) < 0.3) state.tx = 0
        if (Math.abs(state.ty) < 0.3) state.ty = 0
      }

      const d = (drift.now() / 1000) * L.speed
      const dx = L.direction === "up" ? 0 : L.direction === "left" ? -d : -d * 0.8
      const dy = L.direction === "left" ? 0 : L.direction === "up" ? -d : -d * 0.45
      const ox = state.ox + dx
      const oy = state.oy + dy

      const e = entrance ? Math.min(1, entrance.now() / 1150) : 1
      const enter = 1 - Math.pow(1 - e, 3)
      const curve = Math.max(0, Math.min(1.2, L.curvature))
      const maxAngle = 36 * curve
      const depth = Math.min(vw, 1600) * 0.26 * curve

      for (let i = 0; i < cellRefs.current.length; i++) {
        const el = cellRefs.current[i]
        if (!el) continue
        const col = i % cols
        const row = Math.floor(i / cols)
        const x = mod(col * w + ox, totalW) - w * 1.5
        const y = mod(row * h + oy, totalH) - h * 1.5
        const nx = (x + w / 2 - vw / 2) / (vw / 2)
        const ny = (y + h / 2 - vh / 2) / (vh / 2)
        const cx = Math.max(-1.6, Math.min(1.6, nx))
        const cy = Math.max(-1.6, Math.min(1.6, ny))
        const z = (cx * cx * 0.9 + cy * cy * 0.55) * depth - (1 - enter) * 900
        const s = 0.82 + 0.18 * enter
        el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, ${z.toFixed(1)}px) rotateY(${(-cx * maxAngle).toFixed(2)}deg) rotateX(${(cy * maxAngle * 0.62).toFixed(2)}deg) scale(${s.toFixed(3)})`
        el.style.opacity = enter < 1 ? String(Math.min(1, enter * 1.4)) : ""
      }
      if (visible) raf = requestAnimationFrame(frame)
    }

    const io = new IntersectionObserver(([entry]) => {
      const was = visible
      visible = entry.isIntersecting
      if (visible && !was) {
        last = performance.now()
        raf = requestAnimationFrame(frame)
      }
    })
    io.observe(stage)
    raf = requestAnimationFrame(frame)

    // Dragging. A press only becomes a drag past 6px, so a tap still opens the cell.
    const down = (e: PointerEvent) => {
      if (e.button !== 0) return
      state.dragging = true
      state.moved = 0
      state.vx = state.vy = 0
      state.lastX = e.clientX
      state.lastY = e.clientY
      state.lastT = performance.now()
    }
    const move = (e: PointerEvent) => {
      if (!state.dragging) return
      const dx = e.clientX - state.lastX
      // Touch drags only sideways; vertical swipes belong to the page.
      const dy = e.pointerType === "touch" ? 0 : e.clientY - state.lastY
      const t = performance.now()
      const dt = Math.max(1, t - state.lastT)
      state.ox += dx
      state.oy += dy
      state.vx = dx / dt
      state.vy = dy / dt
      state.moved += Math.abs(dx) + Math.abs(dy)
      state.lastX = e.clientX
      state.lastY = e.clientY
      state.lastT = t
      if (state.moved > 6 && !stage.hasPointerCapture(e.pointerId)) {
        stage.setPointerCapture(e.pointerId)
        stage.dataset.dragging = "true"
      }
    }
    const up = (e: PointerEvent) => {
      if (!state.dragging) return
      state.dragging = false
      if (stage.hasPointerCapture(e.pointerId)) stage.releasePointerCapture(e.pointerId)
      // A pause before letting go means no flick.
      if (performance.now() - state.lastT > 80) state.vx = state.vy = 0
      window.setTimeout(() => delete stage.dataset.dragging, 0)
    }
    const click = (e: MouseEvent) => {
      if (state.moved > 6) {
        e.preventDefault()
        e.stopPropagation()
        state.moved = 0
      }
    }
    // Sideways trackpad swipes pan the wall; vertical ones scroll the page.
    const wheel = (e: WheelEvent) => {
      if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
        e.preventDefault()
        state.ox -= e.deltaX
      }
    }
    const key = (e: KeyboardEvent) => {
      const step = { ArrowLeft: [w, 0], ArrowRight: [-w, 0], ArrowUp: [0, h], ArrowDown: [0, -h] }[e.key]
      if (!step || !stage.contains(document.activeElement)) return
      e.preventDefault()
      state.tx += step[0]
      state.ty += step[1]
    }
    // A cell reached with Tab is brought to the middle.
    const focus = (e: FocusEvent) => {
      const el = (e.target as HTMLElement).closest<HTMLElement>("[data-cell]")
      if (!el) return
      const r = el.getBoundingClientRect()
      const s = stage.getBoundingClientRect()
      state.tx += s.left + s.width / 2 - (r.left + r.width / 2)
      state.ty += s.top + s.height / 2 - (r.top + r.height / 2)
    }

    stage.addEventListener("pointerdown", down)
    window.addEventListener("pointermove", move)
    window.addEventListener("pointerup", up)
    window.addEventListener("pointercancel", up)
    stage.addEventListener("click", click, true)
    stage.addEventListener("wheel", wheel, { passive: false })
    stage.addEventListener("keydown", key)
    stage.addEventListener("focusin", focus)

    return () => {
      cancelAnimationFrame(raf)
      io.disconnect()
      drift.cancel()
      entrance?.cancel()
      driftRef.current = null
      stage.removeEventListener("pointerdown", down)
      window.removeEventListener("pointermove", move)
      window.removeEventListener("pointerup", up)
      window.removeEventListener("pointercancel", up)
      stage.removeEventListener("click", click, true)
      stage.removeEventListener("wheel", wheel)
      stage.removeEventListener("keydown", key)
      stage.removeEventListener("focusin", focus)
    }
    // stopDrift is applied by its own effect; the loop is rebuilt only when the grid or intro changes.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [grid, introDone])

  return (
    <div
      ref={stageRef}
      role="region"
      aria-label="All projects, as a wall you can drag. Use Tab to move between projects."
      className={cn(
        "relative h-svh w-full cursor-grab touch-pan-y overflow-hidden bg-page select-none [perspective:1100px] data-[dragging=true]:cursor-grabbing data-[dragging=true]:[&_a]:pointer-events-none",
        className,
      )}
    >
      {!introDone ? null : (
        <div data-canvas-ignore className="absolute inset-0 [transform-style:preserve-3d]">
          {cells.map((cell, i) =>
            cell.project ? (
              <ProjectCell
                key={`${cell.key}-${cell.project.slug}`}
                data-cell=""
                ref={(el: HTMLAnchorElement | null) => {
                  cellRefs.current[i] = el
                }}
                project={cell.project}
                className="absolute top-0 left-0 animate-in fade-in-0 duration-(--duration-fade) will-change-transform [backface-visibility:hidden]"
                style={{ width: grid.w, height: grid.h, transform: "translate3d(-9999px,0,0)" }}
                imageSize={Math.round(grid.w * 0.64 * 2)}
              />
            ) : null,
          )}
        </div>
      )}
      {/* The sphere's falloff: the edges sink into the page. */}
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_75%_70%_at_50%_50%,transparent_55%,var(--color-page)_100%)]" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-page/90 to-transparent" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-page to-transparent" />
    </div>
  )
}
