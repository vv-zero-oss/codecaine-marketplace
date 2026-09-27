import { useEffect, useRef, useState } from "react"
import type * as React from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"

import { AssistantBar, MentionChip } from "@/components/canvas/assistant-bar"
import { EditorWindow, EDITOR_SIZE } from "@/components/mockup/editor-window"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useTimeline } from "@/hooks/use-timeline"
import { useViewport } from "@/hooks/use-viewport"
import { APPEAR, EASE_FILM, EASE_SWAP, MOVE, SETTLE } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { AgentBuild, ImportDialog, ImportLanding, MobileBuild, Overview, PasteLanding } from "./board-scenes"
import { Caption, type CaptionLine } from "./caption"
import { AgentWindow, AppIcon, Browser, CodeWindow, ContextMenu, Dock, DoneToast, Pointer, ProgressPill } from "./desk"
import { Finale, type FinaleBeat } from "./finale"
import { LongwaveScreen } from "./longwave"
import { VariantCard, type Take } from "./variants"

/*
 * The film. One pinned stage the reader scrolls through, beat by beat, shot
 * the way the reference film is shot: a lowercase caption ruled across the
 * top, and under it the desk — the editor, a browser, a code editor, the
 * agent — moving in and out with the same ease-in-out, the camera pushing in
 * on the editor's toolbar, frames on the board filling in from outlines.
 *
 * Scrolling decides which beat is on; each beat's own choreography then plays
 * on a clock (`useTimeline`), so a slow scroll never leaves a move half done.
 */

type Beat = {
  id: string
  caption: CaptionLine[]
  /** Which objects are on the desk. */
  show: {
    editor?: "base" | "toolbar" | "right" | "left" | "pan"
    browser?: "page" | "copy"
    code?: "center" | "left"
    agent?: boolean
    dock?: boolean
    fan?: boolean
    pill?: boolean
    finale?: FinaleBeat
    particles?: boolean
  }
}

const L = (text: string): CaptionLine => ({ key: text, text })

const BEATS: Beat[] = [
  { id: "open", caption: [L("bringing your work")], show: { editor: "base" } },
  { id: "dock", caption: [L("bringing your work"), L("into codecaine is easy")], show: { editor: "base", dock: true } },
  { id: "web", caption: [L("starting from your"), L("live web app?")], show: { browser: "page" } },
  { id: "tool", caption: [L("bring it onto the board"), L("with import url")], show: { editor: "toolbar" } },
  { id: "dialog", caption: [L("bring it onto the board"), L("with import url")], show: { editor: "base" } },
  { id: "pill", caption: [L("streamed in,"), L("section by section")], show: { pill: true } },
  { id: "landed", caption: [L("as layers"), L("you can edit")], show: { editor: "base" } },
  { id: "fan", caption: [L("ask for variations")], show: { fan: true } },
  { id: "agents", caption: [{ key: "agents", text: <AgentsLine /> }], show: {} },
  { id: "code", caption: [L("run your project")], show: { code: "center" } },
  { id: "into", caption: [L("straight onto")], show: { code: "left", editor: "right", particles: true } },
  { id: "board", caption: [L("the board")], show: { editor: "base" } },
  { id: "further", caption: [L("and take it further")], show: { editor: "right", agent: true } },
  { id: "copy", caption: [L("copy from any tab")], show: { browser: "copy" } },
  { id: "paste", caption: [L("paste onto the board")], show: { editor: "base" } },
  { id: "pan", caption: [], show: { editor: "pan" } },
  { id: "overview", caption: [L("the whole product,"), L("on one board")], show: { editor: "base" } },
  { id: "bring", caption: [], show: { finale: "bring" } },
  { id: "shape", caption: [], show: { finale: "shape" } },
  { id: "ship", caption: [], show: { finale: "ship" } },
  { id: "logo", caption: [], show: { finale: "logo" } },
]

export function Film({ onOpen }: { onOpen: () => void }) {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, BEATS.length)
  const view = useViewport()
  const reduce = useReducedMotion()
  const beat = BEATS[step]
  const show = beat.show

  // The opening: the pointer goes to the icon, presses it, the editor opens.
  const [phase, setPhase] = useState<"icon" | "press" | "open">(reduce ? "open" : "icon")
  useEffect(() => {
    if (phase === "open") {
      onOpen()
      return
    }
    const id = setTimeout(() => setPhase(phase === "icon" ? "press" : "open"), phase === "icon" ? 900 : 350)
    return () => clearTimeout(id)
  }, [phase, onOpen])
  const opened = phase === "open"

  const g = geometry(view.width, view.height)
  // Paste is shot close: the menu, big, on the studio grey; then the board.
  const pasteT = useTimeline(beat.id === "paste", [0.45, 1.15])
  const pasteClose = beat.id === "paste" && pasteT < 2

  return (
    <section ref={ref} id="film" aria-label="Codecaine, the film" className="relative" style={{ height: `${BEATS.length * 80 + 100}svh` }}>
      <div className="bg-ruled sticky top-0 h-svh w-full overflow-hidden">
        {opened && <Caption lines={beat.caption} className="top-[10svh]" />}

        {/* The app icon, pressed, then the editor it opens */}
        <AnimatePresence>
          {!opened && (
            <motion.div
              key="icon"
              className="absolute top-[18svh] left-1/2 -translate-x-1/2"
              exit={{ opacity: 0, transition: { duration: 0.3 } }}
            >
              <motion.div animate={{ scale: phase === "press" ? 0.94 : 1, filter: phase === "press" ? "brightness(0.8)" : "brightness(1)" }} transition={{ duration: 0.17 }}>
                <AppIcon className="size-[clamp(64px,7vw,96px)]" />
              </motion.div>
              <motion.span
                className="absolute top-0 left-0"
                initial={{ x: 120, y: 90 }}
                animate={{ x: 52, y: 48 }}
                transition={{ duration: 0.8, ease: EASE_FILM }}
              >
                <Pointer className="w-6" />
              </motion.span>
            </motion.div>
          )}
        </AnimatePresence>

        <EditorOnDesk beat={beat} g={g} visible={opened && !!show.editor && !pasteClose} />

        <AnimatePresence>
          {pasteClose && (
            <motion.div
              key="paste-close"
              className="absolute inset-0 z-10 grid place-items-center bg-studio"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { duration: APPEAR } }}
              transition={{ duration: APPEAR }}
            >
              <div className="relative origin-center" style={{ transform: `scale(${g.wide ? 1.9 : 1.3})` }}>
                <ContextMenu
                  active={pasteT >= 1 ? 2 : undefined}
                  items={[{ label: "Cut", keys: "⌘X" }, { label: "Copy", keys: "⌘C" }, { label: "Paste", keys: "⌘V" }, { label: "Select all", keys: "⌘A", divider: true }]}
                />
                <motion.span className="absolute" initial={{ left: 150, top: 150 }} animate={{ left: 70, top: 84 }} transition={{ duration: 0.4, ease: EASE_FILM }}>
                  <Pointer />
                </motion.span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <Shot on={show.browser !== undefined} {...g.browser}>
          <Browser url="longwave.fm" title="Longwave" width={g.browser.w} height={g.browser.h}>
            <BrowserPage copy={show.browser === "copy"} width={g.browser.w} height={g.browser.h - 72} />
          </Browser>
        </Shot>

        <Shot on={show.code !== undefined} x={show.code === "left" ? g.code.leftX : g.code.x} y={g.code.y} w={g.code.w} h={g.code.h}>
          <CodeWindow width={g.code.w} height={g.code.h} />
        </Shot>

        <AnimatePresence>{show.particles && g.wide && <Particles key="particles" g={g} />}</AnimatePresence>

        <Shot on={!!show.agent} x={g.agent.x} y={g.agent.y} w={g.agent.w} h={260}>
          <AgentLog active={beat.id === "further"} width={g.agent.w} />
        </Shot>

        <AnimatePresence>
          {show.dock && (
            <motion.div
              key="dock"
              className="absolute bottom-[4svh] left-1/2 z-10 origin-bottom -translate-x-1/2 scale-[0.8] sm:scale-100"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: MOVE, ease: EASE_FILM }}
            >
              <DockWithHover />
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{show.pill && <ImportProgress key="pill" />}</AnimatePresence>
        <AnimatePresence>{show.fan && <Fan key="fan" g={g} />}</AnimatePresence>
        <Finale beat={show.finale ?? null} />
      </div>
    </section>
  )
}

/* ——— geometry ——— */

type Geometry = ReturnType<typeof geometry>

/** The board's left edge and width inside the editor, in the editor's own pixels. */
const BOARD = { x: 312, w: 869 }

/** Where everything sits for a screen of W × H. */
function geometry(W: number, H: number) {
  const wide = W >= 1024
  const ew = wide ? Math.min(W * 0.88, 1500) : W - 24
  // On a phone the editor is framed on its board — the part that changes —
  // and the panels either side run off the edges of the screen.
  const k = wide ? ew / EDITOR_SIZE.width : (W - 24) / BOARD.w
  const top = wide ? H * 0.4 : H * 0.4
  const bw = wide ? Math.min(W * 0.8, 1300) : W - 24
  const cw = wide ? Math.min(W * 0.5, 820) : W - 24
  return {
    W,
    H,
    wide,
    k,
    top,
    editor: { x: wide ? (W - ew) / 2 : 12 - BOARD.x * k, y: top, w: ew },
    browser: { x: (W - bw) / 2, y: top, w: bw, h: Math.min(H - top + 40, bw * 0.62) },
    code: { x: (W - cw) / 2, leftX: wide ? -cw * 0.42 : -cw * 1.2, y: top, w: cw, h: cw * 0.6 },
    agent: { x: wide ? W * 0.06 : 12, y: wide ? H * 0.5 : H * 0.55, w: wide ? 400 : W - 24 },
  }
}

/** The editor, placed for the beat: at rest, pushed in on its toolbar, aside, or panning. */
function EditorOnDesk({ beat, g, visible }: { beat: Beat; g: Geometry; visible: boolean }) {
  const mode = beat.show.editor
  const { k } = g
  let target: Record<string, number | number[]> = { x: g.editor.x, y: g.top, scale: k, opacity: 1 }
  if (mode === "toolbar") {
    // The toolbar's centre, in the editor's own pixels, brought to the lower middle of the screen.
    const Z = g.wide ? Math.min(2.4, (g.W * 0.5) / 440) : (g.W - 24) / 440
    target = { x: g.W / 2 - 746 * Z, y: g.H * 0.8 - 822 * Z, scale: Z, opacity: 1 }
  } else if (mode === "right") {
    target = g.wide ? { x: g.W * 0.4, y: g.top, scale: k * 0.9, opacity: 1 } : { x: g.editor.x, y: g.top + 40, scale: k, opacity: 1 }
  } else if (mode === "pan") {
    // Close on the board and drift across the frames, the way the film glides over them.
    const Z = g.wide ? k * 2.8 : k * 2
    const at = (bx: number, by: number) => ({ x: g.W * 0.06 - (332 + bx) * Z, y: g.H * 0.12 - (60 + by) * Z })
    const a = at(30, 20)
    const b = at(150, 150)
    const c = at(260, 290)
    target = { x: [a.x, b.x, c.x], y: [a.y, b.y, c.y], scale: Z, opacity: 1 }
  }
  if (!visible) target = { ...target, opacity: 0, y: (target.y as number) + 30 }

  const board = boardFor(beat.id)
  return (
    <motion.div
      aria-hidden
      className="absolute top-0 left-0 origin-top-left will-change-transform"
      initial={{ x: g.editor.x, y: g.top + 12, scale: k, opacity: 0 }}
      animate={target}
      transition={
        mode === "pan" && visible
          ? { duration: 3.2, ease: EASE_FILM, opacity: { duration: APPEAR } }
          : { duration: MOVE, ease: EASE_FILM, opacity: { duration: APPEAR } }
      }
    >
      <EditorWindow
        tab="Longwave"
        board={board.content}
        toolbar={beat.id === "tool" ? { activeTool: "import-url", openGroup: "media", highlightedTool: "import-url" } : undefined}
      />
      {beat.id === "tool" && (
        <motion.span className="absolute" initial={{ left: 640, top: 760, opacity: 0 }} animate={{ left: 812, top: 736, opacity: 1 }} transition={{ duration: 0.6, delay: 0.2, ease: EASE_FILM }}>
          <Pointer className="w-4" />
        </motion.span>
      )}
    </motion.div>
  )
}

function boardFor(id: string): { content: React.ReactNode } {
  switch (id) {
    case "dialog":
      return { content: <ImportDialog /> }
    case "landed":
      return { content: <ImportLanding active /> }
    case "into":
      return { content: <MobileBuild active={false} /> }
    case "board":
      return { content: <MobileBuild active /> }
    case "further":
      return { content: <AgentBuild active /> }
    case "paste":
      return { content: <PasteLanding /> }
    case "pan":
      return { content: <Overview pointers={false} /> }
    case "overview":
      return { content: <Overview /> }
    default:
      return { content: null }
  }
}

/* ——— the other shots ——— */

/** A window that appears within a frame or two and settles, and is cut when it goes. */
function Shot({ on, x, y, w, children }: { on: boolean; x: number; y: number; w: number; h: number; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {on && (
        <motion.div
          className="absolute top-0 left-0 origin-top"
          style={{ width: w }}
          initial={{ x, y: y + 12, opacity: 0 }}
          animate={{ x, y, opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: APPEAR } }}
          transition={{ duration: MOVE, ease: EASE_FILM, y: { duration: SETTLE, ease: EASE_SWAP }, opacity: { duration: APPEAR } }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** The dock: the pointer drifts along it and the browser lifts. */
function DockWithHover() {
  const t = useTimeline(true, [0.6])
  return <Dock lift={t >= 1 ? 1 : undefined} />
}

/** Longwave, running in the browser; on the copy beat, a card is right-clicked. */
function BrowserPage({ copy, width, height }: { copy: boolean; width: number; height: number }) {
  const s = Math.min(width / 560, height / 350)
  return (
    <div className="relative size-full overflow-hidden bg-app-bg">
      <div className="origin-top-left" style={{ transform: `scale(${s})` }}>
        <LongwaveScreen screen="home" build="full" />
      </div>
      {copy && <CopyMenu scale={s} />}
    </div>
  )
}

function CopyMenu({ scale }: { scale: number }) {
  const t = useTimeline(true, [0.5, 1.0])
  return (
    <>
      <span className="absolute rounded-[4px] outline-2 outline-signal outline-solid" style={{ left: 140 * scale, top: 60 * scale, width: 408 * scale, height: 118 * scale }} />
      <motion.div className="absolute" style={{ left: 330 * scale, top: 120 * scale, transformOrigin: "top left" }} initial={{ opacity: 0, scale: 0.97 }} animate={{ opacity: t >= 1 ? 1 : 0, scale: t >= 1 ? 1 : 0.97 }} transition={{ duration: 0.2 }}>
        <ContextMenu active={t >= 2 ? 1 : undefined} items={[{ label: "Cut", keys: "⌘X" }, { label: "Copy", keys: "⌘C" }, { label: "Inspect", divider: true }]} />
      </motion.div>
      <motion.span className="absolute" style={{ left: 0, top: 0 }} initial={{ x: 300 * scale, y: 220 * scale }} animate={{ x: (t >= 2 ? 360 : 336) * scale, y: (t >= 2 ? 162 : 126) * scale }} transition={{ duration: 0.5, ease: EASE_FILM }}>
        <Pointer />
      </motion.span>
    </>
  )
}

/** The import's progress, 0 → 100, then the done toast. */
function ImportProgress() {
  const [p, setP] = useState(0)
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const tick = (now: number) => {
      const v = Math.min(100, Math.round(((now - t0) / 1400) * 100))
      setP(v)
      if (v < 100) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])
  const done = p >= 100
  return (
    <motion.div
      className="absolute top-[52svh] left-1/2 origin-top -translate-x-1/2 scale-[1.3] sm:scale-[2]"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: EASE_SWAP }}
    >
      <AnimatePresence mode="wait" initial={false}>
        {done ? (
          <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.25, delay: 0.25 }}>
            <DoneToast>Imported 495 layers from longwave.fm</DoneToast>
          </motion.div>
        ) : (
          <motion.div key="progress" exit={{ opacity: 0, transition: { duration: 0.15 } }}>
            <ProgressPill label="Importing longwave.fm…" percent={p} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}

/** The screen on the board, then three takes fanning out beside it. */
function Fan({ g }: { g: Geometry }) {
  const takes: Take[] = ["original", "light", "poster", "warm"]
  const s = g.wide ? 1.1 : 0.75
  const step = g.wide ? 150 : 70
  return (
    <motion.div className="absolute top-[36svh] left-1/2" exit={{ opacity: 0, transition: { duration: 0.3 } }}>
      <div className="origin-top" style={{ transform: `scale(${s})` }}>
        {takes.map((take, i) => (
          <motion.div
            key={take}
            className="absolute top-0"
            initial={{ x: -90 - step * 1.5, rotate: 0, opacity: i === 0 ? 1 : 0 }}
            animate={{ x: -90 - step * 1.5 + i * step, y: i === 0 ? 0 : 6 * i, rotate: i === 0 ? 0 : (i - 1.5) * 2, opacity: 1 }}
            transition={{ duration: 0.55, delay: 0.3 + i * 0.12, ease: EASE_FILM }}
            style={{ zIndex: i }}
          >
            <VariantCard take={take} />
          </motion.div>
        ))}
        <motion.div
          className="absolute -top-16 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35, ease: EASE_SWAP }}
        >
          <AssistantBar
            width={330}
            value={
              <>
                Three more takes on <MentionChip name="Album" /> please
              </>
            }
          />
        </motion.div>
      </div>
    </motion.div>
  )
}

/** "let the [agent] agents": the mark in the middle cycles through the CLIs bb drives. */
function AgentsLine() {
  const logos = ["claude-ai-icon.svg", "codex_light.svg", "cursor_light.svg", "opencode.svg"]
  const [i, setI] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setI((v) => (v + 1) % (logos.length + 1)), 420)
    return () => clearInterval(id)
  }, [logos.length])
  return (
    <span className="inline-flex items-center gap-[0.25em]">
      let the
      <span className="relative inline-grid size-[0.9em] place-items-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={i}
            className="grid size-full place-items-center rounded-[22%] bg-surface shadow-chip"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            transition={{ duration: 0.18 }}
          >
            {i < logos.length ? (
              <img src={`/logos/${logos[i]}`} alt="" className={cn("size-[62%]", i > 0 && "dark:invert")} />
            ) : (
              <span className="font-mono text-[0.4em] text-ink">&gt;_</span>
            )}
          </motion.span>
        </AnimatePresence>
      </span>
      agents
    </span>
  )
}

/** Dots streaming from the code editor across to the board. */
function Particles({ g }: { g: Geometry }) {
  const left = g.code.leftX + g.code.w
  const right = g.W * (g.wide ? 0.4 : 0.2)
  return (
    <motion.div
      aria-hidden
      className="absolute overflow-hidden"
      style={{ left, top: g.top + 40, width: Math.max(0, right - left), height: g.code.h - 40 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
    >
      <div
        className="absolute inset-y-0 -left-full w-[300%] motion-safe:animate-[stream_1.6s_linear_infinite]"
        style={{
          backgroundImage: "radial-gradient(circle, var(--color-mark) 1.6px, transparent 2px)",
          backgroundSize: "14px 14px",
          maskImage: "linear-gradient(90deg, transparent, black 30%, black 70%, transparent)",
        }}
      />
    </motion.div>
  )
}

/** The agent's log for "take it further", its lines arriving as it works. */
function AgentLog({ active, width }: { active: boolean; width: number }) {
  const t = useTimeline(active, [0.3, 0.9, 1.6, 2.3])
  const lines = [
    { kind: "prompt" as const, text: "build the Library and Explore screens" },
    { kind: "tool" as const, text: "canvas · listLayers", detail: ["Longwave", "Mobile - Home (frame)", "Mobile - Album (frame)"] },
    { kind: "note" as const, text: "Matching the album screen's type and spacing." },
    { kind: "tool" as const, text: "canvas · createLayer", detail: ["Mobile - Library", "Explore"] },
    { kind: "tool" as const, text: "canvas · canvasScreenshot" },
  ]
  return <AgentWindow width={width} lines={lines.slice(0, 1 + t)} />
}
