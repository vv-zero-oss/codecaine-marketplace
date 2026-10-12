import { useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { ConvergePanel } from "@/components/mock/converge-panel"
import {
  CardFormWindow,
  ChatBubbleWindow,
  FlightWindow,
  FolderWindow,
  InboxWindow,
  PayrollWindow,
  PolicyPdfWindow,
  SpreadsheetWindow,
} from "@/components/mock/converge-windows"
import { CONVERGE } from "@/content/home-story"
import { cn } from "@/lib/utils"

/**
 * Where each tool floats, relative to the point they all converge on:
 * `x` in % of the stage's width, `y` in % of its height. `depth` sets how
 * far it drifts while the stage is pinned; `phone` keeps it on small screens.
 */
const WINDOWS: { id: string; x: number; y: number; rot: number; depth: number; phone: boolean; render: () => ReactNode }[] = [
  { id: "sheet", x: -30, y: -4, rot: -2.5, depth: 1.2, phone: true, render: () => <SpreadsheetWindow /> },
  { id: "inbox", x: 29, y: -9, rot: 2, depth: 0.8, phone: true, render: () => <InboxWindow /> },
  { id: "pdf", x: 34, y: 16, rot: 3, depth: 1.5, phone: false, render: () => <PolicyPdfWindow /> },
  { id: "card", x: -6, y: 18, rot: -1.5, depth: 0.6, phone: true, render: () => <CardFormWindow /> },
  { id: "chat", x: 12, y: 2, rot: 0, depth: 1, phone: true, render: () => <ChatBubbleWindow /> },
  { id: "flight", x: -29, y: 23, rot: 1.5, depth: 1.3, phone: false, render: () => <FlightWindow /> },
  { id: "folder", x: -12, y: -6, rot: 0, depth: 0.5, phone: false, render: () => <FolderWindow /> },
  { id: "payroll", x: 15, y: 25, rot: -2, depth: 0.9, phone: true, render: () => <PayrollWindow /> },
]

/** Dashed threads between tools that pass the same expense along. */
const LINKS: [string, string][] = [
  ["sheet", "folder"],
  ["folder", "chat"],
  ["chat", "inbox"],
  ["inbox", "pdf"],
  ["card", "chat"],
  ["flight", "card"],
  ["card", "payroll"],
  ["payroll", "pdf"],
]

/** The converge point sits below the stage's centre, under the headline. */
const TARGET_Y = 16

/** The pin's timeline, in 0–1 of the section's scroll. */
const T = {
  drawEnd: 0.26,
  convergeStart: 0.32,
  convergeEnd: 0.62,
  swapStart: 0.4,
  swapEnd: 0.48,
  panelStart: 0.5,
  panelEnd: 0.68,
  ticksFrom: 0.72,
}

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const convergeAmount = (p: number) => easeInOut(clamp01((p - T.convergeStart) / (T.convergeEnd - T.convergeStart)))

function useIsPhone() {
  const [phone, setPhone] = useState(() => typeof window !== "undefined" && window.matchMedia("(max-width: 767px)").matches)
  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)")
    const update = () => setPhone(query.matches)
    query.addEventListener("change", update)
    return () => query.removeEventListener("change", update)
  }, [])
  return phone
}

function ScatterWindow({
  progress,
  x,
  y,
  rot,
  depth,
  scatter,
  children,
}: {
  progress: MotionValue<number>
  x: number
  y: number
  rot: number
  depth: number
  scatter: number
  children: ReactNode
}) {
  const transform = useTransform(progress, (p) => {
    const k = convergeAmount(p)
    const drift = -depth * Math.min(p, T.convergeStart) * 14
    const dx = x * scatter * (1 - k)
    const dy = (y * scatter + drift) * (1 - k)
    return `translate(-50%, -50%) translate(${dx}cqw, ${dy}cqh) rotate(${rot * (1 - k)}deg) scale(${1 - 0.5 * k})`
  })
  const opacity = useTransform(progress, (p) => 1 - clamp01((convergeAmount(p) - 0.45) / 0.45))
  const filter = useTransform(progress, (p) => `blur(${(convergeAmount(p) * 8).toFixed(2)}px)`)

  return (
    <motion.div
      style={{ transform, opacity, filter, top: `${50 + TARGET_Y}%` }}
      className="absolute left-1/2 will-change-transform"
    >
      <div className="origin-center scale-[0.62] sm:scale-[0.8] lg:scale-100">{children}</div>
    </motion.div>
  )
}

function Connectors({ progress, size, scatter, ids }: { progress: MotionValue<number>; size: { w: number; h: number }; scatter: number; ids: Set<string> }) {
  const pathLength = useTransform(progress, [0.02, T.drawEnd], [0, 1])
  const opacity = useTransform(progress, [T.convergeStart, T.convergeStart + 0.1], [1, 0])
  const at = (id: string) => {
    const w = WINDOWS.find((entry) => entry.id === id)!
    return { x: size.w / 2 + (w.x * scatter * size.w) / 100, y: size.h * (0.5 + TARGET_Y / 100) + (w.y * scatter * size.h) / 100 }
  }
  const links = LINKS.filter(([a, b]) => ids.has(a) && ids.has(b))
  if (!size.w) return null

  return (
    <motion.svg aria-hidden style={{ opacity }} className="pointer-events-none absolute inset-0 size-full text-ink-4" width={size.w} height={size.h}>
      <defs>
        <mask id="converge-draw" maskUnits="userSpaceOnUse">
          {links.map(([a, b]) => {
            const p = at(a)
            const q = at(b)
            const mx = (p.x + q.x) / 2
            const d = `M${p.x},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}`
            return <motion.path key={`${a}-${b}`} d={d} fill="none" stroke="white" strokeWidth={6} style={{ pathLength }} />
          })}
        </mask>
      </defs>
      <g mask="url(#converge-draw)">
        {links.map(([a, b]) => {
          const p = at(a)
          const q = at(b)
          const mx = (p.x + q.x) / 2
          return <path key={`${a}-${b}`} d={`M${p.x},${p.y} C${mx},${p.y} ${mx},${q.y} ${q.x},${q.y}`} fill="none" stroke="currentColor" strokeWidth={1.4} strokeDasharray="2 5" strokeLinecap="round" />
        })}
      </g>
    </motion.svg>
  )
}

/**
 * The pinned "six tools → one" story. The section is `pinHeight` viewport
 * heights tall; its stage sticks for the length of it while scroll plays the
 * timeline: the threads between the tools draw, the tools fly in to one
 * point and blur away, the headline swaps, and the resolved expense rises in
 * its place and ticks itself off.
 *
 * Reduced motion and design mode show it unpinned, at the end. The
 * "Converge" actions in the editor hold it at either end.
 */
export function ConvergeStage({
  pinHeight = 300,
  scatter = 1,
  showConnectors = true,
  className,
}: {
  /** How long the pin lasts, in viewport heights (desktop; phones get ¾). */
  pinHeight?: number
  /** 0–1.4: how far the tools spread out. */
  scatter?: number
  showConnectors?: boolean
  className?: string
}) {
  const section = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const phone = useIsPhone()
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [forced, setForced] = useState<"scattered" | "joined" | null>(null)

  useCanvasAction("Converge: scattered", (next) => setForced((next ?? forced !== "scattered") ? "scattered" : null), { on: forced === "scattered", group: "Converge" })
  useCanvasAction("Converge: joined", (next) => setForced((next ?? forced !== "joined") ? "joined" : null), { on: forced === "joined", group: "Converge" })

  const still = forced !== null || reduced || designing
  const { scrollYProgress } = useScroll({ target: section, offset: ["start start", "end end"] })
  const held = useMotionValue(forced === "scattered" ? 0.28 : 1)
  useEffect(() => held.set(forced === "scattered" ? 0.28 : 1), [forced, held])
  const progress = still ? held : scrollYProgress

  useLayoutEffect(() => {
    const element = stage.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setSize({ w: entry.contentRect.width, h: entry.contentRect.height }))
    observer.observe(element)
    return () => observer.disconnect()
  }, [])

  const spread = scatter * (phone ? 0.7 : 1)
  const visible = WINDOWS.filter((w) => !phone || w.phone)
  const ids = new Set(visible.map((w) => w.id))

  // The headlines never share the stage: one is gone before the next starts.
  const swapGap = 0.02
  const afterStart = T.swapEnd + swapGap
  const afterEnd = afterStart + (T.swapEnd - T.swapStart)
  const beforeOpacity = useTransform(progress, [T.swapStart, T.swapEnd], [1, 0])
  const beforeY = useTransform(progress, [T.swapStart, T.swapEnd], ["translateY(0px)", "translateY(-24px)"])
  const beforeBlur = useTransform(progress, [T.swapStart, T.swapEnd], ["blur(0px)", "blur(6px)"])
  const afterOpacity = useTransform(progress, [afterStart, afterEnd], [0, 1])
  const afterY = useTransform(progress, [afterStart, afterEnd], ["translateY(24px)", "translateY(0px)"])
  const afterBlur = useTransform(progress, [afterStart, afterEnd], ["blur(6px)", "blur(0px)"])
  const panelOpacity = useTransform(progress, [T.panelStart, T.panelEnd], [0, 1])
  const panelTransform = useTransform(progress, [T.panelStart, T.panelEnd], ["translate(-50%, -50%) scale(0.9)", "translate(-50%, -50%) scale(1)"])

  return (
    <section
      ref={section}
      id="converge"
      aria-labelledby="converge-title"
      className={cn("relative", className)}
      style={{ height: still ? undefined : `${phone ? Math.round(pinHeight * 0.75) : pinHeight}vh` }}
    >
      <div ref={stage} className={cn("top-0 h-svh min-h-[640px] w-full [container-type:size]", still ? "relative" : "sticky")}>
        {showConnectors && <Connectors progress={progress} size={size} scatter={spread} ids={ids} />}

        {visible.map((w) => (
          <ScatterWindow key={w.id} progress={progress} x={w.x} y={w.y} rot={w.rot} depth={w.depth} scatter={spread}>
            {w.render()}
          </ScatterWindow>
        ))}

        <motion.div style={{ opacity: panelOpacity, transform: panelTransform, top: `${50 + TARGET_Y}%` }} className="absolute left-1/2 z-10">
          <ConvergePanel progress={progress} tickFrom={T.ticksFrom} />
        </motion.div>

        <div className="pointer-events-none relative z-20 grid px-4 pt-[clamp(88px,13vh,140px)] text-center">
          <motion.div style={{ opacity: beforeOpacity, transform: beforeY, filter: beforeBlur }} className="[grid-area:1/1]">
            <h2 id="converge-title" className="type-head mx-auto max-w-[16ch] text-balance text-mega text-ink">{CONVERGE.before.title}</h2>
            <p className="mx-auto mt-4 max-w-[40ch] text-lead text-ink-2">{CONVERGE.before.body}</p>
          </motion.div>
          <motion.div style={{ opacity: afterOpacity, transform: afterY, filter: afterBlur }} className="[grid-area:1/1]">
            <p className="type-head mx-auto max-w-[20ch] text-balance text-mega text-ink" aria-hidden={!still}>{CONVERGE.after.title}</p>
            <p className="mx-auto mt-4 max-w-[48ch] text-lead text-ink-2">{CONVERGE.after.body}</p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
