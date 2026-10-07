import { motion, useReducedMotion, type Transition } from "motion/react"
import { useEffect, useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { cn } from "@/lib/utils"

type State = "closed" | "peek" | "out" | "back"

/** The curves from `index.css`, as Motion wants them. */
const EASE_OUT = [0.22, 1, 0.36, 1] as const
const EASE_IN_OUT = [0.65, 0, 0.35, 1] as const

/** The folder's proportions: a little taller than a letter sheet. */
const RATIO = 1.258

/**
 * A cobalt folder that keeps one secret.
 *
 * Hover and the cover swings open on its left edge, the darker back shows,
 * and a sheet marked "Do not open" slides out an inch. Click and the sheet is
 * pulled all the way out, turned over in the air and laid on top of the
 * folder, so its other side can be read. Click again and it goes back in.
 *
 * Every knob is a scalar prop the editor can change: the words, how far the
 * cover opens (`tilt`), how far the sheet peeks (`peek`), and how long the
 * pull takes (`duration`). The two hidden states are registered as actions.
 */
export function ClassifiedFolder({
  label = "Confidential files",
  sublabel = "Internal use only",
  stamp = "Do not open",
  size = 372,
  tilt = 28,
  peek = 64,
  duration = 0.9,
  initial = "closed",
  className,
}: {
  label?: string
  sublabel?: string
  stamp?: string
  /** Width in pixels; the height follows. Shrinks to fit a narrow screen. */
  size?: number
  /** How far the cover swings open on hover, in degrees. */
  tilt?: number
  /** How far the sheet slides out on hover, in pixels. */
  peek?: number
  /** The pull out and the put back, in seconds. */
  duration?: number
  initial?: "closed" | "peek" | "out"
  className?: string
}) {
  const reduce = useReducedMotion()
  const [state, setState] = useState<State>(initial)
  const [hovered, setHovered] = useState(false)
  const w = useFit(size)
  const h = Math.round(w * RATIO)
  const k = w / 372

  useEffect(() => setState(initial), [initial])

  useCanvasAction("Peek", (next) => setState((next ?? state === "closed") ? "peek" : "closed"), {
    group: "Folder",
    on: state === "peek",
  })
  useCanvasAction("Document out", (next) => setState((next ?? state !== "out") ? "out" : "back"), {
    group: "Folder",
    on: state === "out",
  })

  const toggle = () => setState((s) => (s === "out" ? "back" : "out"))

  // The pull: out to the right, turned over in the air, laid on the cover.
  const sheetOut = { x: [peek * k, w * 0.98, w * 0.42, 6 * k], y: [0, -4 * k, -14 * k, -10 * k], rotate: [4, 7, 1, -4], rotateY: [0, 0, 90, 180], zIndex: [1, 1, 3, 3] }
  const sheetBack = { x: [6 * k, w * 0.42, w * 0.98, peek * k], y: [-10 * k, -14 * k, -4 * k, 0], rotate: [-4, 1, 7, 4], rotateY: [180, 90, 0, 0], zIndex: [3, 3, 1, 1] }
  const pull: Transition = reduce ? { duration: 0.2 } : { duration, times: [0, 0.38, 0.68, 1], ease: EASE_IN_OUT }
  const settle: Transition = reduce ? { duration: 0.15 } : { duration: 0.28, ease: EASE_OUT }

  const sheet = {
    closed: { x: 0, y: 0, rotate: 0, rotateY: 0, zIndex: 1, transition: settle },
    peek: { x: peek * k, y: 0, rotate: 4, rotateY: 0, zIndex: 1, transition: settle },
    out: reduce ? { x: 6 * k, y: -10 * k, rotate: -4, rotateY: 180, zIndex: 3, transition: pull } : { ...sheetOut, transition: pull },
    back: reduce ? { x: peek * k, y: 0, rotate: 4, rotateY: 0, zIndex: 1, transition: pull } : { ...sheetBack, transition: pull },
  }
  const cover = {
    closed: { rotateY: 0, transition: settle },
    peek: { rotateY: -tilt, transition: settle },
    out: { rotateY: reduce ? 0 : [-tilt, -tilt, 0], transition: reduce ? settle : { duration, times: [0, 0.55, 1], ease: EASE_OUT } },
    back: { rotateY: reduce ? -tilt : [0, -tilt, -tilt], transition: reduce ? settle : { duration, times: [0, 0.3, 1], ease: EASE_OUT } },
  }

  return (
    <div
      role="button"
      tabIndex={0}
      aria-pressed={state === "out"}
      aria-label={`${label}. ${state === "out" ? "Put the document back" : "Take the document out"}`}
      onMouseEnter={() => {
        setHovered(true)
        setState((s) => (s === "closed" ? "peek" : s))
      }}
      onMouseLeave={() => {
        setHovered(false)
        setState((s) => (s === "peek" ? "closed" : s))
      }}
      onClick={toggle}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault()
          toggle()
        }
      }}
      className={cn("relative cursor-pointer select-none outline-none focus-visible:ring-2 focus-visible:ring-folder focus-visible:ring-offset-8 focus-visible:ring-offset-desk", className)}
      style={{ width: w, height: h, perspective: 1400 * k, borderRadius: 18 * k }}
    >
      {/* The back of the folder: only seen when the cover opens. */}
      <div className="absolute inset-0 rounded-folder bg-folder-back shadow-folder" style={{ borderRadius: 18 * k }} />

      {/* The sheet: "Do not open" on the side you see first, the document on the other. */}
      <motion.div
        initial={false}
        animate={state}
        variants={sheet}
        onAnimationComplete={() => {
          if (state === "back") setState(hovered ? "peek" : "closed")
        }}
        className="absolute"
        style={{ left: 14 * k, top: 22 * k, width: w - 40 * k, height: h - 46 * k, transformStyle: "preserve-3d", transformPerspective: 1600 * k }}
      >
        <div
          className="absolute inset-0 overflow-hidden bg-sheet shadow-sheet"
          style={{ borderRadius: 16 * k, backfaceVisibility: "hidden" }}
        >
          <span
            className="absolute top-[12%] font-mono uppercase text-sheet-ink"
            style={{ right: 20 * k, fontSize: 15 * k, letterSpacing: "0.08em", writingMode: "vertical-rl" }}
          >
            {stamp}
          </span>
        </div>
        <div
          className="absolute inset-0 overflow-hidden bg-sheet text-sheet-ink shadow-sheet"
          style={{ borderRadius: 16 * k, backfaceVisibility: "hidden", transform: "rotateY(180deg)", padding: `${30 * k}px ${26 * k}px`, fontSize: 14.5 * k, lineHeight: 1.32 }}
        >
          <ClassifiedNote k={k} />
        </div>
      </motion.div>

      {/* The cover, hinged on its left edge. */}
      <motion.div
        initial={false}
        animate={state}
        variants={cover}
        className="absolute inset-0 z-[2] bg-gradient-to-b from-folder to-folder-low text-white shadow-folder"
        style={{ transformOrigin: "0% 50%", borderRadius: 18 * k }}
      >
        <Asterisk className="absolute" style={{ left: 26 * k, top: 30 * k, width: 36 * k, height: 36 * k }} />
        <div className="absolute" style={{ left: 26 * k, bottom: 36 * k }}>
          <p className="m-0 font-mono uppercase" style={{ fontSize: 18 * k, letterSpacing: "0.02em" }}>
            {label}
          </p>
          <p className="m-0 text-white/75" style={{ fontSize: 14 * k, marginTop: 6 * k }}>
            {sublabel}
          </p>
        </div>
      </motion.div>
    </div>
  )
}

/** What the sheet says once it is turned over. */
export function ClassifiedNote({ k = 1 }: { k?: number }) {
  return (
    <div className="flex h-full flex-col" style={{ gap: 12 * k }}>
      <p className="m-0">This document is classified and intended solely for authorized personnel.</p>
      <p className="m-0">Access without proper clearance is strictly prohibited and may lead to serious consequences.</p>
      <p className="m-0">By continuing, you acknowledge that you understand the sensitivity of the material and agree to handle it responsibly.</p>
      <Doodle style={{ width: 96 * k, height: 57 * k }} />
      <p className="m-0 mt-auto">You really don't follow instructions, do you?</p>
    </div>
  )
}

/** Two small creatures drawn in one line, peering over the bottom of the page. */
export function Doodle({ style }: { style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 74 44" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="round" strokeLinejoin="round" style={style} aria-hidden="true">
      <path d="M6 42c0-12 4-22 13-22s13 10 13 22" fill="#e9e3dc" />
      <path d="M9 24l-2-9 7 5M29 24l2-9-7 5" fill="#e9e3dc" />
      <circle cx="15" cy="30" r="1.2" fill="currentColor" />
      <circle cx="23" cy="30" r="1.2" fill="currentColor" />
      <path d="M17.5 34q1.5 1.5 3 0" />
      <path d="M40 42c0-11 4-19 12-19s12 8 12 19" fill="#fff" />
      <path d="M58 25c3-3 8-2 8 3s-5 6-7 3" fill="#2a2622" />
      <circle cx="48" cy="32" r="1.2" fill="currentColor" />
      <circle cx="55" cy="32" r="1.2" fill="currentColor" />
      <path d="M50.5 36q1.5 1.2 3 0" />
    </svg>
  )
}

/** The six-petal mark on the cover. */
export function Asterisk({ className, style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="-20 -20 40 40" className={className} style={style} aria-hidden="true">
      {[0, 60, 120, 180, 240, 300].map((r) => (
        <path key={r} transform={`rotate(${r})`} d="M0 -2 C 3 -7 3 -13 0 -18 C -3 -13 -3 -7 0 -2 Z" fill="white" />
      ))}
    </svg>
  )
}

/** The folder's width, shrunk to fit a narrow window. */
function useFit(size: number) {
  const [w, setW] = useState(() => fit(size))
  useEffect(() => {
    const update = () => setW(fit(size))
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [size])
  return w
}

function fit(size: number) {
  if (typeof window === "undefined") return size
  return Math.round(Math.min(size, window.innerWidth * 0.62, (window.innerHeight - 140) / RATIO))
}
