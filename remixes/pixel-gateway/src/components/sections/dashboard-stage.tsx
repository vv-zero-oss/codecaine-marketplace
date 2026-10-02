import { animate, motion, useMotionValueEvent, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useEffect, useMemo, useRef, useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Reveal } from "@/components/motion/reveal"
import { ScrambleText } from "@/components/motion/scramble-text"
import { TiltCard } from "@/components/motion/tilt-card"
import { Badge } from "@/components/ui/badge"
import { Container } from "@/components/ui/container"
import { STAGES, type StageId } from "@/content"
import { cn } from "@/lib/utils"

const ACCENT: Record<StageId, string> = {
  block: "var(--color-bad)",
  detect: "var(--color-accent-hi)",
  control: "var(--color-good)",
}

const FEED: Record<StageId, string[]> = {
  block: ["BLOCK  phish-kit.example  0.2s", "BLOCK  c2-beacon.test  0.1s", "HOLD   new-domain.example", "BLOCK  malware-host.test"],
  detect: ["FOUND  ai-notes.app  risk 7", "COACH  paste → chat-bot", "FOUND  img-gen.studio  risk 4", "ALLOW  docs-copilot  risk 1"],
  control: ["PUSH   policy v212  4,013 devices", "DIFF   +2 −1 rules", "ROLL   v211 kept as undo", "AUDIT  written  0.4s"],
}

function useClock() {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  return now.toISOString().slice(11, 19)
}

/** A bar chart of sixteen columns that takes a random step every second. */
function PixelBars({ stage, paused }: { stage: StageId; paused: boolean }) {
  const [bars, setBars] = useState(() => Array.from({ length: 16 }, (_, i) => 30 + ((i * 37) % 55)))
  useEffect(() => {
    if (paused) return
    const id = setInterval(
      () => setBars((prev) => [...prev.slice(1), Math.max(12, Math.min(96, prev[prev.length - 1] + (Math.random() - 0.45) * 38))]),
      900,
    )
    return () => clearInterval(id)
  }, [paused])
  return (
    <div aria-hidden className="flex h-full items-end gap-1">
      {bars.map((h, i) => (
        <span
          key={i}
          className="w-full min-w-1 transition-[height] duration-300 ease-[steps(4,end)]"
          style={{ height: `${h}%`, background: ACCENT[stage], opacity: 0.35 + (i / bars.length) * 0.65 }}
        />
      ))}
    </div>
  )
}

/** The metric tweens to the new stage's number when the stage changes. */
function Metric({ value, reduced }: { value: number; reduced: boolean }) {
  const [shown, setShown] = useState(value)
  const tween = useRef<ReturnType<typeof animate> | null>(null)
  const from = useRef(value)
  useEffect(() => {
    tween.current?.stop()
    if (reduced) {
      setShown(value)
      from.current = value
      return
    }
    tween.current = animate(from.current, value, {
      duration: 0.8,
      ease: [0.22, 0.9, 0.24, 1],
      onUpdate: (v) => {
        from.current = v
        setShown(Math.round(v))
      },
    })
    return () => tween.current?.stop()
  }, [value, reduced])
  return <span className="tabular-nums">{shown.toLocaleString("en-US")}</span>
}

/**
 * The dashboard that stays put. It is `sticky` under the nav and rides the
 * whole stage: each of the three sections below scrolls beneath it and the
 * readout, colour and feed change to match the one in view. It leans back as it
 * arrives and settles flat once it sticks, and tilts a few degrees toward the
 * section you are in.
 */
export function DashboardHero({ active, progress, onSelect }: { active: number; progress: number; onSelect: (index: number) => void }) {
  const stage = STAGES[active]
  const clock = useClock()
  const reduced = useReducedMotion() ?? false
  const { designing } = useCanvasDesignMode()
  const feed = FEED[stage.id]
  return (
    <TiltCard maxTilt={3} perspective={1400} glare={false} className="mx-auto w-full max-w-7xl">
      <div className="bg-bg/90 shadow-px-drop backdrop-blur-[3px] [--px-edge:var(--color-line-strong)] [--px-drop:rgba(0,0,0,0.5)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 border-b-2 border-line px-4 py-2.5 sm:px-6">
          <div className="flex items-center gap-2.5">
            <PixelSprite name="shield" scale={2} />
            <span className="font-display text-[10px] uppercase">Gateway</span>
            <span className="inline-flex items-center gap-1.5 font-mono text-xl text-good">
              <span className="size-2.5 animate-blink bg-good" /> LIVE
            </span>
          </div>
          <div role="tablist" aria-label="Gateway stages" className="order-last flex w-full gap-2 sm:order-none sm:ml-auto sm:w-auto">
            {STAGES.map((s, i) => (
              <button
                key={s.id}
                role="tab"
                aria-selected={i === active}
                onClick={() => onSelect(i)}
                className={cn(
                  "min-h-11 flex-1 px-3 font-display text-[9px] uppercase shadow-px-sm transition-colors duration-100 ease-[steps(2,end)] sm:flex-none",
                  i === active ? "bg-accent text-accent-fg [--px-edge:var(--color-accent)]" : "bg-surface-2 text-fg-muted [--px-edge:var(--color-surface-2)] hover:text-fg",
                )}
              >
                {s.index} {s.label}
              </button>
            ))}
          </div>
          <span className="ml-auto font-mono text-xl tabular-nums text-fg-muted sm:ml-0">UTC {clock}</span>
        </div>

        <div className="grid gap-4 px-4 py-3 sm:px-6 md:grid-cols-[1.1fr_1fr_1fr] md:gap-6 md:py-4">
          <div>
            <p className="font-mono text-xl uppercase text-fg-muted">{stage.metric.label}</p>
            <p className="font-display text-[clamp(1.1rem,3.4vw,2.1rem)] leading-tight" style={{ color: ACCENT[stage.id] }}>
              <Metric value={stage.metric.value} reduced={reduced} />
            </p>
          </div>
          <div className="hidden h-16 md:block">
            <PixelBars stage={stage.id} paused={reduced || designing} />
          </div>
          <ul className="hidden gap-0.5 font-mono text-lg leading-tight text-fg-muted md:grid" aria-label="Live feed">
            {feed.map((line, i) => (
              <li key={`${stage.id}-${i}`} className={cn("truncate", i === 0 && "text-fg")}>
                <ScrambleText text={line} duration={0.5} delay={i * 0.1} trigger="mount" band={3} />
              </li>
            ))}
          </ul>
        </div>

        <div className="flex gap-1 px-4 pb-3 sm:px-6" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress * 100)} aria-label="Stage progress">
          {STAGES.map((s, i) => {
            const fill = Math.min(1, Math.max(0, progress * STAGES.length - i))
            return (
              <span key={s.id} className="h-2 flex-1 bg-surface-3">
                <span className="block h-full" style={{ width: `${Math.round(fill * 12) * (100 / 12)}%`, background: ACCENT[s.id] }} />
              </span>
            )
          })}
        </div>
      </div>
    </TiltCard>
  )
}

/** Stage 1 — a wall of tiles rising out of the floor, a few of them bad. */
function BrickWall() {
  const tiles = useMemo(() => Array.from({ length: 24 }, (_, i) => ({ i, bad: [3, 8, 13, 18, 22].includes(i) })), [])
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1100px]">
      <div className="absolute inset-[8%] grid grid-cols-6 gap-2 preserve-3d [transform:rotateX(58deg)_rotateZ(-38deg)]">
        {tiles.map(({ i, bad }) => (
          <motion.div
            key={i}
            initial={{ z: -60, opacity: 0 }}
            whileInView={{ z: bad ? 34 : (i % 5) * 7, opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: [0.22, 0.9, 0.24, 1] }}
            className={cn(
              "px-dither relative aspect-square shadow-px-sm",
              bad ? "bg-bad [--px-edge:var(--color-bad)]" : "bg-surface-3 [--px-edge:var(--color-line-strong)]",
            )}
            style={{ transformStyle: "preserve-3d" }}
          >
            {bad ? <PixelSprite name="bug" scale={2} className="absolute inset-0 m-auto animate-blink [transform:translateZ(18px)_rotateX(-58deg)]" /> : null}
          </motion.div>
        ))}
      </div>
    </div>
  )
}

/** Stage 2 — a flat radar with a stepping sweep and sprites standing on it. */
function Radar() {
  const blips = [
    { left: "30%", top: "34%", name: "eye" as const },
    { left: "64%", top: "28%", name: "bug" as const },
    { left: "58%", top: "66%", name: "chip" as const },
    { left: "26%", top: "62%", name: "eye" as const },
  ]
  return (
    <div className="relative mx-auto aspect-square w-full max-w-md [perspective:1000px]">
      <div className="absolute inset-[4%] preserve-3d [transform:rotateX(62deg)]">
        {[100, 72, 44].map((size) => (
          <span key={size} className="absolute left-1/2 top-1/2 -translate-1/2 border-4 border-dashed border-accent/60" style={{ width: `${size}%`, height: `${size}%` }} />
        ))}
        <span className="absolute left-0 right-0 top-1/2 h-1 -translate-y-1/2 bg-accent/40" />
        <span className="absolute bottom-0 left-1/2 top-0 w-1 -translate-x-1/2 bg-accent/40" />
        <span
          aria-hidden
          data-canvas-ignore
          className="absolute inset-0 animate-spin rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_270deg,color-mix(in_oklab,var(--color-good)_70%,transparent)_360deg)]"
          style={{ animationDuration: "5s", animationTimingFunction: "steps(30, end)" }}
        />
        {blips.map((b, i) => (
          <span key={i} className="absolute animate-float preserve-3d" style={{ left: b.left, top: b.top, animationDelay: `${i * 0.5}s`, transform: "translateZ(26px) rotateX(-62deg)" }}>
            <PixelSprite name={b.name} scale={4} />
          </span>
        ))}
      </div>
    </div>
  )
}

/** Stage 3 — four policy cards in a stack that fans out as you scroll. */
function PolicyStack() {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "center center"] })
  const spread = useTransform(scrollYProgress, [0, 1], [0, reduced ? 1 : 1])
  const [t, setT] = useState(reduced ? 1 : 0)
  useMotionValueEvent(spread, "change", setT)
  const cards = [
    { name: "Block personal mail", on: true },
    { name: "Coach on AI paste", on: true },
    { name: "Mask API keys", on: true },
    { name: "Log file uploads", on: false },
  ]
  return (
    <div ref={ref} className="relative mx-auto aspect-square w-full max-w-md [perspective:1100px]">
      <div className="absolute inset-[8%] preserve-3d [transform:rotateX(56deg)_rotateZ(-32deg)]">
        {cards.map((c, i) => (
          <div
            key={c.name}
            className="absolute inset-x-[6%] top-[22%] flex h-[28%] items-center justify-between gap-3 bg-surface-2 px-4 shadow-px-drop [--px-drop:rgba(0,0,0,0.45)] [--px-edge:var(--color-line-strong)]"
            style={{ transform: `translateZ(${i * (6 + t * 44)}px) translateY(${i * t * -10}px)` }}
          >
            <span className="font-display text-[10px] uppercase leading-tight">{c.name}</span>
            <span className={cn("h-5 w-10 p-0.5 shadow-px-sm", c.on ? "bg-good/30 [--px-edge:var(--color-good)]" : "bg-surface-3 [--px-edge:var(--color-line-strong)]")}>
              <span className={cn("block size-4 bg-fg", c.on && "translate-x-5")} />
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

const VISUALS: Record<StageId, () => React.JSX.Element> = { block: BrickWall, detect: Radar, control: PolicyStack }

export function StageSection({ index, onActive }: { index: number; onActive: (index: number) => void }) {
  const stage = STAGES[index]
  const Visual = VISUALS[stage.id]
  const ref = useRef<HTMLElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([entry]) => entry.isIntersecting && onActive(index), { rootMargin: "-38% 0px -52% 0px" })
    io.observe(el)
    return () => io.disconnect()
  }, [index, onActive])
  return (
    <section ref={ref} id={`stage-${stage.id}`} className="flex min-h-svh scroll-mt-48 items-center py-16 lg:py-10">
      <Container className={cn("grid items-center gap-10 lg:grid-cols-2 lg:gap-16", index % 2 === 1 && "lg:[&>*:first-child]:order-2")}>
        <div>
          <Reveal>
            <Badge tone="outline">Stage {stage.index} / 03</Badge>
            <h3 className="mt-4 text-balance text-[clamp(2rem,5vw,3.6rem)] font-bold leading-[0.95] tracking-tight">{stage.title}</h3>
            <p className="mt-5 max-w-xl text-pretty text-xl text-fg-muted">{stage.body}</p>
          </Reveal>
          <ul className="mt-6 grid gap-2.5">
            {stage.bullets.map((bullet, i) => (
              <li key={bullet}>
                <Reveal delay={0.08 * i} distance={10} className="flex items-start gap-3 text-lg">
                  <PixelSprite name="star" scale={3} className="mt-1.5" />
                  {bullet}
                </Reveal>
              </li>
            ))}
          </ul>
        </div>
        <TiltCard maxTilt={6} glare={false} perspective={1200} className="overflow-hidden">
          <Visual />
        </TiltCard>
      </Container>
    </section>
  )
}

/**
 * Three stages scrolling past one pinned dashboard. `active` follows the stage
 * in view; the progress bar follows the scroll through the three. Each stage is
 * reachable from the Actions row and from the dashboard's own tabs.
 */
export function DashboardStage() {
  const [active, setActive] = useState(0)
  const [progress, setProgress] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 30%", "end 70%"] })
  useMotionValueEvent(scrollYProgress, "change", (p) => setProgress(Math.min(1, Math.max(0, p))))

  const go = (index: number) => document.getElementById(`stage-${STAGES[index].id}`)?.scrollIntoView({ behavior: "smooth", block: "center" })
  useCanvasAction("Stage 1 · Block", () => go(0), { group: "Dashboard" })
  useCanvasAction("Stage 2 · Detect", () => go(1), { group: "Dashboard" })
  useCanvasAction("Stage 3 · Control", () => go(2), { group: "Dashboard" })

  return (
    <section id="gateway" className="relative bg-bg">
      <Container className="pb-10 pt-24 sm:pt-32">
        <Reveal>
          <p className="font-mono text-xl uppercase tracking-widest text-accent-hi">{"> the gateway, live"}</p>
          <h2 className="mt-2 max-w-4xl text-balance text-[clamp(2.2rem,6vw,4.5rem)] font-bold leading-[0.95] tracking-tight">
            One dashboard. Three jobs. It never leaves your screen.
          </h2>
        </Reveal>
      </Container>
      <div ref={ref} className="relative">
        <div className="pointer-events-none sticky top-(--header-h) z-30 px-3 pt-3 sm:px-6">
          <div className="pointer-events-auto">
            <DashboardHero active={active} progress={progress} onSelect={go} />
          </div>
        </div>
        {STAGES.map((_, i) => (
          <StageSection key={i} index={i} onActive={setActive} />
        ))}
      </div>
    </section>
  )
}
