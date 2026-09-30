import type * as React from "react"
import { useEffect, useRef, useState } from "react"
import { Check, Loader, MessageCircle, TrendingUp, Wand2 } from "lucide-react"
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react"

import { useCanvasAction } from "@canvas/react"
import { TypeReveal } from "@/components/motion/type-reveal"
import { BrandLogo } from "@/components/ui/brand-logo"
import { Container } from "@/components/ui/container"
import { PixelList } from "@/components/ui/pixel-list"
import { cn } from "@/lib/utils"

type Tone = "mint" | "periwinkle" | "coral" | "butter"

const TONE_BG: Record<Tone, string> = {
  mint: "bg-mint",
  periwinkle: "bg-indigo",
  coral: "bg-coral",
  butter: "bg-butter",
}

export type Step = { key: string; node: string; tone: Tone; title: string; body: string; items: string[]; Visual: () => React.JSX.Element }

export const STEPS: Step[] = [
  {
    key: "inbox",
    node: "Unified inbox",
    tone: "mint",
    title: "Unified inbox",
    body: "Castwell connects to the accounts you already run — every comment, DM, mention and metric lands in one feed.",
    items: ["Nine channels, one login", "Comments and DMs in one thread", "Metrics synced every 15 minutes"],
    Visual: InboxVisual,
  },
  {
    key: "memory",
    node: "Brand memory",
    tone: "periwinkle",
    title: "Brand memory",
    body: "A living style guide the agents read before they write: your voice, your words to avoid, your best-performing posts.",
    items: ["Voice and tone rules", "Asset library with usage rights", "Learns from what performs"],
    Visual: MemoryVisual,
  },
  {
    key: "agents",
    node: "Always-on agents",
    tone: "coral",
    title: "Always-on agents",
    body: "Specialist AI agents draft captions, cut video, answer the community and watch trends — around the clock.",
    items: ["Caption and copy agents", "Video producer agent", "Community reply agents", "Trend-watch agents flag moments"],
    Visual: AgentsVisual,
  },
  {
    key: "scheduler",
    node: "Scheduler",
    tone: "butter",
    title: "Scheduler",
    body: "One calendar where agents and people meet. Your team approves, Castwell publishes at each audience's best hour.",
    items: ["Approval workflows at every step", "Best-time slots per channel", "Full audit trail on every post"],
    Visual: SchedulerVisual,
  },
]

/* ----------------------------------------------------------------------------
 * Visual building blocks (night)
 * --------------------------------------------------------------------------*/

/** A hairline box with a second outline offset behind it, for depth. */
export function DepthBox({ title, className, children }: { title?: string; className?: string; children?: React.ReactNode }) {
  return (
    <div className={cn("relative", className)}>
      <span aria-hidden className="absolute inset-0 translate-x-1.5 translate-y-1.5 border border-night-line" />
      <div className="relative h-full border border-night-line-strong bg-night p-3 md:p-4">
        {title && <p className="mb-3 text-[11px] text-night-ink/85 md:text-xs">{title}</p>}
        {children}
      </div>
    </div>
  )
}

export function Pill({ tone = "outline", children, icon }: { tone?: "outline" | "coral" | "butter" | "mint" | "dim"; children: React.ReactNode; icon?: React.ReactNode }) {
  return (
    <span
      className={cn(
        "inline-flex h-7 items-center gap-1.5 rounded-full px-3 text-[10.5px] whitespace-nowrap md:text-[11px]",
        tone === "outline" && "border border-night-line-strong text-night-ink",
        tone === "dim" && "border border-night-line text-night-muted",
        tone === "coral" && "bg-coral text-night",
        tone === "butter" && "bg-butter text-night",
        tone === "mint" && "bg-mint text-night",
      )}
    >
      {icon}
      {children}
    </span>
  )
}

export function InboxVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <DepthBox title="Audience by channel">
        {[
          ["w-full", "248,310"],
          ["w-[62%]", "92,044"],
          ["w-[40%]", "61,587"],
        ].map(([w, n], i) => (
          <div key={n} className="mb-2 flex items-center gap-3 last:mb-0">
            <span className={cn("h-3", w, i === 0 ? "bg-mint" : "hatch text-mint/70")} />
            <span className="ml-auto shrink-0 text-[10px] text-night-muted tabular-nums">{n}</span>
          </div>
        ))}
      </DepthBox>
      <DepthBox title="Connected">
        <div className="grid grid-cols-3 gap-3">
          {(["instagram", "tiktok", "youtube", "linkedin", "x", "threads"] as const).map((c) => (
            <span key={c} className="grid h-8 place-items-center">
              <BrandLogo channel={c} theme="dark" className="size-5" />
            </span>
          ))}
        </div>
      </DepthBox>
      <DepthBox title="Mentions → routed" className="col-span-2 sm:col-span-1">
        <div className="flex items-center gap-2">
          <span className="hatch size-9 border border-mint/60 text-mint/60" />
          <span className="h-px w-4 bg-night-line-strong" />
          <span className="hatch size-9 border border-mint/60 text-mint/60" />
          <span className="h-px w-4 bg-night-line-strong" />
          <span className="size-9 bg-mint" />
        </div>
      </DepthBox>
    </div>
  )
}

export function MemoryVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <DepthBox title="Voice match">
        <div className="grid place-items-center py-1">
          <svg viewBox="0 0 80 80" className="size-20 md:size-24">
            <circle cx="40" cy="40" r="30" fill="none" stroke="var(--night-line-strong)" strokeWidth="10" />
            <circle
              cx="40"
              cy="40"
              r="30"
              fill="none"
              stroke="var(--indigo)"
              strokeWidth="10"
              strokeDasharray={`${0.96 * 188.5} 188.5`}
              transform="rotate(-90 40 40)"
            />
            <text x="40" y="44" textAnchor="middle" fontSize="11" fill="var(--night-ink)">96%</text>
          </svg>
        </div>
      </DepthBox>
      <DepthBox title="Voice rules">
        <div className="flex flex-wrap gap-1.5">
          <Pill>Warm, never cute</Pill>
          <Pill>No “hack”</Pill>
          <Pill>Sentence case</Pill>
          <Pill tone="dim">Max 2 emoji</Pill>
        </div>
      </DepthBox>
      <DepthBox title="Approved assets" className="col-span-2">
        <div className="grid grid-cols-6 gap-2">
          {Array.from({ length: 6 }, (_, i) => (
            <span key={i} className={cn("aspect-square border border-night-line-strong", i === 1 && "bg-indigo", i === 4 && "bg-indigo/50")} />
          ))}
        </div>
      </DepthBox>
    </div>
  )
}

export function AgentsVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <DepthBox title="Caption agent">
        <div className="flex flex-col items-start gap-2">
          <Pill tone="coral" icon={<TrendingUp className="size-3" />}>Trend spotted</Pill>
          <Pill>Draft ready ×3</Pill>
          <Pill tone="dim">Hook test queued</Pill>
        </div>
      </DepthBox>
      <DepthBox title="Community agent">
        <div className="flex flex-col items-start gap-2">
          <Pill icon={<MessageCircle className="size-3" />}>Question on sizing</Pill>
          <span className="ml-4 h-3 w-px bg-coral" />
          <Pill tone="coral" icon={<Check className="size-3" />}>Reply drafted</Pill>
        </div>
      </DepthBox>
      <DepthBox title="Video producer agent">
        <svg viewBox="0 0 120 50" className="h-16 w-full text-coral" preserveAspectRatio="none">
          <defs>
            <pattern id="hatch-coral" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="1" height="4" fill="currentColor" />
            </pattern>
          </defs>
          <path d="M0 50 L30 22 L55 30 L85 12 L120 4 V50 Z" fill="url(#hatch-coral)" />
          <path d="M0 50 L30 22 L55 30 L85 12 L120 4 V16 L85 26 L55 40 L30 36 Z" fill="currentColor" />
        </svg>
      </DepthBox>
      <DepthBox title="Brand check">
        <div className="flex items-center gap-3">
          <Pill>Policy check</Pill>
          <span className="grid size-7 place-items-center rounded-full bg-coral text-night">
            <Loader className="size-3.5 motion-safe:animate-spin" />
          </span>
        </div>
      </DepthBox>
    </div>
  )
}

export function SchedulerVisual() {
  return (
    <div className="grid grid-cols-2 gap-4 md:gap-6">
      <DepthBox title="Approval workflow" className="col-span-2 sm:col-span-1">
        {[
          ["Reel · Tue", "Approved"],
          ["Carousel · Wed", "Approved"],
          ["Short · Thu", "Waiting"],
        ].map(([a, b]) => (
          <div key={a} className="flex items-center justify-between border-b border-night-line py-1.5 text-[11px] last:border-b-0">
            <span className="text-night-ink/85">{a}</span>
            {b === "Approved" ? <Pill tone="butter">{b}</Pill> : <Pill tone="dim">{b}</Pill>}
          </div>
        ))}
      </DepthBox>
      <DepthBox title="Feedback loop">
        <div className="flex items-start gap-2">
          <span className="grid size-6 shrink-0 place-items-center rounded-full bg-butter text-night">
            <Wand2 className="size-3" />
          </span>
          <p className="text-[11px] leading-snug text-night-muted">Tuesday reels beat Thursday by 38%. Moving two slots.</p>
        </div>
      </DepthBox>
      <DepthBox title="Best-time slots" className="col-span-2">
        <div className="relative flex items-center justify-between py-3">
          <span className="absolute inset-x-0 top-1/2 h-px bg-night-line-strong" />
          {["08:00", "12:30", "17:45", "21:00"].map((t, i) => (
            <span key={t} className="relative flex flex-col items-center gap-2">
              <span className={cn("size-2.5 rounded-full", i === 2 ? "bg-butter" : "bg-night-line-strong")} />
              <span className="text-[10px] text-night-muted tabular-nums">{t}</span>
            </span>
          ))}
        </div>
      </DepthBox>
    </div>
  )
}

/* ----------------------------------------------------------------------------
 * Panels
 * --------------------------------------------------------------------------*/

export function InfoPanel({ step, index }: { step: Step; index: number }) {
  return (
    <div className="border border-night-line-strong bg-night p-5 md:p-6">
      <div className="flex items-start justify-between gap-4">
        <h3 className="font-serif text-[1.6rem] leading-tight font-light text-night-ink md:text-[1.9rem]">{step.title}</h3>
        <span className={cn("grid size-8 shrink-0 place-items-center text-[11px] font-medium text-night", TONE_BG[step.tone])}>
          0{index + 1}
        </span>
      </div>
      <p className="mt-3 text-[14px] leading-relaxed text-night-ink/85 md:text-[15px]">{step.body}</p>
      <PixelList items={step.items} ruled accent={step.tone} className="mt-4 text-[14px] text-night-ink/85" />
    </div>
  )
}

export function Node({ label, tone, align = "left", active = true }: { label: string; tone: Tone; align?: "left" | "right"; active?: boolean }) {
  return (
    <span className={cn("flex items-center gap-2 text-[11px] whitespace-nowrap transition-opacity duration-300 md:text-xs", active ? "opacity-100" : "opacity-45", align === "right" && "flex-row-reverse")}>
      <span className="text-night-ink">{label}</span>
      <span className={cn("size-2.5", TONE_BG[tone])} />
    </span>
  )
}

/* ----------------------------------------------------------------------------
 * The pinned tour
 * --------------------------------------------------------------------------*/

const CORNERS = [
  { step: 1, x: 0, y: 0, dx: 6, dy: -4 }, // top-left
  { step: 0, x: 1, y: 0, dx: -2, dy: 8 }, // top-right
  { step: 3, x: 1, y: 1, dx: 4, dy: -6 }, // bottom-right
  { step: 2, x: 0, y: 1, dx: -6, dy: 3 }, // bottom-left
]

function useCorner(progress: MotionValue<number>, c: (typeof CORNERS)[number]) {
  // Corners start scattered and square up as the intro scrolls through.
  const left = useTransform(progress, [0, 0.14], [`${c.x * 100 + c.dx}%`, `${c.x * 100}%`])
  const top = useTransform(progress, [0, 0.14], [`${c.y * 100 + c.dy}%`, `${c.y * 100}%`])
  return { left, top }
}

function useIsDesktop() {
  const [desktop, setDesktop] = useState(() => typeof window !== "undefined" && window.matchMedia("(min-width: 1024px)").matches)
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)")
    const on = () => setDesktop(mq.matches)
    mq.addEventListener("change", on)
    return () => mq.removeEventListener("change", on)
  }, [])
  return desktop
}

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * "How it works": a night section pinned for five screens. The title types
 * in inside four scattered corner nodes, which square up into a frame; then
 * each scroll step lights one node and shows what it does inside the frame,
 * with its card on the right. Below 1024px the steps simply stack.
 */
export function HowItWorksTour({ title = "How it works" }: { title?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const desktop = useIsDesktop()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const [step, setStep] = useState(-1)
  const [forced, setForced] = useState<number | null>(null)
  const active = forced ?? step

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setStep(p < 0.2 ? -1 : Math.min(STEPS.length - 1, Math.floor((p - 0.2) / 0.2)))
  })

  useCanvasAction("Intro", () => setForced(-1), { on: active === -1, group: "How it works" })
  STEPS.forEach((s, i) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useCanvasAction(s.title, (next) => setForced(next === false ? null : i), { on: active === i, group: "How it works" })
  })

  // A function rather than a range: Motion would otherwise hand a plain
  // opacity range to the browser's scroll timeline, measured against the
  // whole page instead of this section.
  const titleOpacity = useTransform(scrollYProgress, (p) => Math.min(1, Math.max(0, (0.19 - p) / 0.05)))
  const corners = CORNERS.map((c) => useCorner(scrollYProgress, c)) // eslint-disable-line react-hooks/rules-of-hooks

  if (!desktop) {
    return (
      <div className="flex flex-col gap-14 py-(--spacing-section)">
        <h2 className="text-center font-serif text-title font-light text-night-ink">
          <TypeReveal text={title} />
        </h2>
        {STEPS.map((s, i) => (
          <div key={s.key} className="flex flex-col gap-6">
            <Node label={s.node} tone={s.tone} />
            <s.Visual />
            <InfoPanel step={s} index={i} />
          </div>
        ))}
      </div>
    )
  }

  const Current = active >= 0 ? STEPS[active] : null

  return (
    <div ref={ref} className="relative" style={{ height: `${(STEPS.length + 1) * 100}svh` }}>
      <div className="sticky top-0 flex h-svh items-center overflow-hidden">
        <div className="relative mx-auto grid w-full grid-cols-[1.35fr_1fr] items-center gap-10 xl:gap-16">
          {/* the frame */}
          <div className="relative aspect-[1.35] w-full">
            <svg className="absolute inset-0 size-full overflow-visible" aria-hidden>
              {corners.map((c, i) => {
                const n = corners[(i + 1) % corners.length]
                return <CornerLine key={i} a={c} b={n} />
              })}
            </svg>
            {CORNERS.map((c, i) => (
              <motion.span
                key={i}
                style={{ left: corners[i].left, top: corners[i].top }}
                className={cn("absolute", c.x ? "-translate-x-[calc(100%-5px)]" : "-translate-x-[5px]", "-translate-y-1/2")}
              >
                {c.x ? (
                  <Node label={STEPS[c.step].node} tone={STEPS[c.step].tone} active={active === -1 || active === c.step} />
                ) : (
                  <span className="flex flex-row-reverse items-center">
                    <Node label={STEPS[c.step].node} tone={STEPS[c.step].tone} align="right" active={active === -1 || active === c.step} />
                  </span>
                )}
              </motion.span>
            ))}
            <motion.h2
              style={{ opacity: forced !== null && forced >= 0 ? 0 : titleOpacity }}
              className="absolute inset-0 grid place-items-center font-serif text-title font-light text-night-ink"
            >
              <TypeReveal text={title} />
            </motion.h2>
            <div className="absolute inset-[9%]">
              <AnimatePresence mode="wait">
                {Current && (
                  <motion.div
                    key={Current.key}
                    initial={reduce ? false : { opacity: 0, transform: "scale(0.96)", filter: "blur(4px)" }}
                    animate={{ opacity: 1, transform: "scale(1)", filter: "blur(0px)" }}
                    exit={{ opacity: 0, transform: "scale(1.02)", filter: "blur(4px)" }}
                    transition={{ duration: 0.45, ease: EASE }}
                    className="grid h-full place-items-center"
                  >
                    <div className="w-full max-w-[640px]">
                      <Current.Visual />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
          {/* the card */}
          <div className="relative min-h-[320px]">
            <AnimatePresence mode="wait">
              {Current && (
                <motion.div
                  key={Current.key}
                  initial={reduce ? false : { opacity: 0, transform: "translateY(16px)" }}
                  animate={{ opacity: 1, transform: "translateY(0px)" }}
                  exit={{ opacity: 0, transform: "translateY(-10px)" }}
                  transition={{ duration: 0.45, ease: EASE }}
                >
                  <InfoPanel step={Current} index={active} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}

function CornerLine({ a, b }: { a: ReturnType<typeof useCorner>; b: ReturnType<typeof useCorner> }) {
  return <motion.line x1={a.left} y1={a.top} x2={b.left} y2={b.top} stroke="var(--night-line-strong)" strokeWidth={1} />
}

export function HowItWorks() {
  return (
    <section id="how-it-works" className="night night-grid scroll-mt-0 bg-night text-night-ink">
      <Container>
        <HowItWorksTour />
      </Container>
    </section>
  )
}
