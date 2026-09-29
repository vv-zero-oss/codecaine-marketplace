import { useEffect, useRef, useState } from "react"
import { motion, useMotionValue, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { Check } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CursorChip } from "@/components/blocks/cursor-chip"
import { SceneText } from "@/components/blocks/scene-text"
import { ScrubReveal } from "@/components/motion/scrub-reveal"
import { branches } from "@/content"
import { BLUR } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The diagram lives in a 600 × 320 box: the trunk (main) down the middle at
 * x = 300, the original component and the merged one to its left, the branch
 * and its two versions to its right. Every HTML piece is placed in % of the
 * same box, so lines and pills stay joined at any width.
 */
const W = 600
const H = 320
const at = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })

/** Mirrored about the trunk: the component on main sits 130 to its left,
 *  the branch's versions 130 to its right, so the diagram's weight is centred
 *  on the line it grows from. */
const LINES = {
  trunk: "M300 0 V320",
  toTrunk: "M212 52 H300",
  branch: "M300 52 H340 Q370 52 370 82 V204",
  toB: "M370 120 H388",
  toC: "M370 204 H388",
  merge: "M370 204 V236 Q370 266 340 266 H300",
  toD: "M300 266 H212",
}

/** Where on the scroll each step is complete — also where an editor action
 *  holds it. */
const STEPS = { branch: 0.34, review: 0.6, merge: 0.84 } as const
type Step = keyof typeof STEPS

/**
 * Version control for a canvas, told in one diagram as you scroll: a
 * component on main; a branch where Maya edits it; an agent reviews it and
 * asks a question; the reviewed version merges back to main and the old one
 * recedes. Three headlines swap over it with the page's blur crossfade.
 *
 * Laid out on the golden section: the headline in the upper 38.2% of the
 * stage, the diagram in the lower 61.8%, at 61.8% of the screen's width.
 */
export function Branches() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })

  // The scroll drives it — unless the editor holds one of its steps.
  const [held, setHeld] = useState<Step | null>(null)
  const drive = useMotionValue(0)
  useEffect(() => {
    const apply = (v: number) => drive.set(held ? STEPS[held] : v)
    apply(scrollYProgress.get())
    return scrollYProgress.on("change", apply)
  }, [held, scrollYProgress, drive])
  useCanvasAction("Branch", (on) => setHeld(on === false ? null : "branch"), { on: held === "branch", group: "Version control" })
  useCanvasAction("Review", (on) => setHeld(on === false ? null : "review"), { on: held === "review", group: "Version control" })
  useCanvasAction("Merge", (on) => setHeld(on === false ? null : "merge"), { on: held === "merge", group: "Version control" })

  const blur = reduced ? 0 : BLUR
  const leave = useTransform(scrollYProgress, (v) => 1 - Math.min(1, Math.max(0, (v - 0.92) / 0.08)))
  const leaveBlur = useTransform(leave, (o) => `blur(${((1 - o) * blur).toFixed(2)}px)`)
  return (
    <section ref={ref} id="branches" className="relative h-[340svh]">
      <motion.div
        className="sticky top-0 grid h-svh rows-golden-above overflow-hidden px-gutter pt-nav"
        style={{ opacity: leave, filter: leaveBlur }}
        data-canvas-ignore
      >
        {/* Main starts at the top edge: its label, and the first stretch of
            the trunk running down towards the headline. */}
        <ScrubReveal
          progress={drive}
          from={0.0}
          to={0.06}
          className="absolute top-nav left-1/2 flex -translate-x-1/2 flex-col items-center pt-phi-2"
        >
          <span className="rounded-pill border border-hairline-strong bg-paper px-2.5 py-1 font-mono text-[10px] tracking-[0.08em] text-ink-soft uppercase">
            {branches.trunk}
          </span>
          <span aria-hidden className="h-phi-6 w-px bg-linear-to-b from-hairline-strong to-transparent" />
        </ScrubReveal>

        <div className="relative flex items-end justify-center pb-phi-4">
          {branches.headlines.map((line, i) => (
            <Headline key={line} text={line} index={i} progress={drive} blur={blur} />
          ))}
        </div>

        <div className="flex items-start justify-center">
          <div className="relative aspect-[600/320] w-full max-w-[880px] sm:w-golden">
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
              <Line d={LINES.trunk} progress={drive} range={[0, 0.1]} faint />
              <Line d={LINES.toTrunk} progress={drive} range={[0.08, 0.14]} />
              <Line d={LINES.branch} progress={drive} range={[0.14, 0.28]} />
              <Line d={LINES.toB} progress={drive} range={[0.26, 0.3]} />
              <Line d={LINES.toC} progress={drive} range={[0.5, 0.54]} />
              <Line d={LINES.merge} progress={drive} range={[0.62, 0.74]} />
              <Line d={LINES.toD} progress={drive} range={[0.72, 0.78]} />
              {(
                [
                  [300, 52, 0.12],
                  [370, 120, 0.28],
                  [370, 204, 0.52],
                  [300, 266, 0.74],
                ] as const
              ).map(([cx, cy, when]) => (
                <Dot key={`${cx}-${cy}`} cx={cx} cy={cy} progress={drive} when={when} />
              ))}
            </svg>

            {/* The original, on main — it recedes once the new one lands. */}
            <Node progress={drive} from={0.03} to={0.09} dim={[0.74, 0.8]} x={212} y={52} tone="old" />
            <Pill progress={drive} range={[0.16, 0.22]} x={320} y={52} label={branches.people.branch} />
            <Chip progress={drive} range={[0.16, 0.2]} out={[0.3, 0.34]} x={300} y={20} label={branches.creating} />
            <Node progress={drive} from={0.28} to={0.34} x={388} y={120} tone="edit" />
            <Pill progress={drive} range={[0.4, 0.46]} x={370} y={162} label={branches.people.review} />
            <Node progress={drive} from={0.5} to={0.56} x={388} y={204} tone="done" />
            <Chip progress={drive} range={[0.64, 0.68]} out={[0.8, 0.84]} x={336} y={294} label={branches.merging} ink />
            <Node progress={drive} from={0.76} to={0.82} x={212} y={266} tone="done" />

            {/* The people, and the question the agent asks. */}
            <Presence progress={drive} range={[0.22, 0.28]} out={[0.6, 0.66]} x={486} y={84}>
              <div className="flex flex-col items-start gap-phi-1">
                <CursorChip name={branches.people.branch} tone="2" />
                {/* Her answer to the agent, under her own cursor. */}
                <ScrubReveal progress={drive} from={0.46} to={0.5}>
                  <span className="ml-5 rounded-[10px] rounded-tl-[3px] bg-button px-2.5 py-1.5 text-[11px] whitespace-nowrap text-paper shadow-chip">
                    {branches.reply}
                  </span>
                </ScrubReveal>
              </div>
            </Presence>
            <Presence progress={drive} range={[0.38, 0.44]} out={[0.6, 0.66]} x={504} y={196}>
              <div className="flex flex-col items-start gap-phi-1">
                <CursorChip name={branches.people.review} agent tone="1" />
                <span className="ml-5 rounded-[10px] rounded-tl-[3px] bg-mauve-900 px-2.5 py-1.5 text-[11px] whitespace-nowrap text-paper shadow-chip">
                  {branches.comment}
                </span>
              </div>
            </Presence>
          </div>
        </div>
      </motion.div>
    </section>
  )
}

function Headline({ text, index, progress, blur }: { text: string; index: number; progress: MotionValue<number>; blur: number }) {
  // Each headline owns a stretch of the scroll; neighbours crossfade.
  const bounds = [0, 0.4, 0.68, 1.01]
  const [a, b] = [bounds[index], bounds[index + 1]]
  const fade = 0.04
  const opacity = useTransform(progress, (v) => {
    const inn = index === 0 ? 1 : Math.min(1, Math.max(0, (v - a) / fade))
    const out = index === 2 ? 1 : Math.min(1, Math.max(0, (b - v) / fade))
    return Math.min(inn, out)
  })
  const filter = useTransform(opacity, (o) => `blur(${((1 - o) * blur).toFixed(2)}px)`)
  return (
    <motion.div className="absolute inset-x-0 bottom-phi-4" style={{ opacity, filter }}>
      <SceneText first={text} />
    </motion.div>
  )
}

function Line({ d, progress, range, faint = false }: { d: string; progress: MotionValue<number>; range: [number, number]; faint?: boolean }) {
  const pathLength = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - range[0]) / (range[1] - range[0]))))
  // Hidden until it starts, so a zero-length path leaves no round cap behind.
  const opacity = useTransform(pathLength, (l) => (l > 0 ? 1 : 0))
  return (
    <motion.path
      d={d}
      stroke={faint ? "var(--hairline-strong)" : "var(--mauve-500)"}
      strokeWidth={faint ? 1 : 1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ pathLength, opacity }}
    />
  )
}

function Dot({ cx, cy, progress, when }: { cx: number; cy: number; progress: MotionValue<number>; when: number }) {
  const opacity = useTransform(progress, (v) => Math.min(1, Math.max(0, (v - when) / 0.02)))
  return <motion.circle cx={cx} cy={cy} r={4.5} fill="var(--paper)" stroke="var(--ink-soft)" strokeWidth={1.4} style={{ opacity }} />
}

/** A component as it stands on a branch: its path above it, the button. */
function Node({
  progress,
  from,
  to,
  dim,
  x,
  y,
  tone,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  dim?: [number, number]
  x: number
  y: number
  tone: "old" | "edit" | "done"
}) {
  // On main (left of the trunk) a node ends at its connector; on the branch
  // (right) it starts at it — so every line meets a button's edge.
  const onMain = x < 300
  return (
    <ScrubReveal
      progress={progress}
      from={from}
      to={to}
      dimFrom={dim?.[0]}
      dimTo={dim?.[1]}
      className={cn("absolute -translate-y-1/2", onMain ? "-translate-x-full" : "")}
      style={at(x, y)}
    >
      <div className="relative">
        <span className="absolute -top-phi-3 left-0 text-[9px] whitespace-nowrap text-mist">{branches.component}</span>
        <span
          className={cn(
            "inline-flex h-[clamp(30px,3vw,46px)] items-center gap-1.5 rounded-[8px] px-[clamp(10px,1.3vw,20px)] text-[clamp(11px,1.1vw,16px)] font-medium whitespace-nowrap ring-1 ring-offset-2 ring-offset-paper",
            tone === "old" && "bg-mist text-paper ring-hairline-strong",
            tone === "edit" && "rounded-pill bg-mauve-500 text-paper ring-mauve-300",
            tone === "done" && "rounded-pill bg-button text-paper ring-mauve-300",
          )}
        >
          {tone === "done" && (
            <span className="grid size-4 place-items-center rounded-full bg-live text-paper">
              <Check className="size-2.5" strokeWidth={3} aria-hidden />
            </span>
          )}
          {branches.label}
        </span>
      </div>
    </ScrubReveal>
  )
}

/** A name on a line, the way a branch is labelled. */
function Pill({ progress, range, x, y, label }: { progress: MotionValue<number>; range: [number, number]; x: number; y: number; label: string }) {
  return (
    <ScrubReveal progress={progress} from={range[0]} to={range[1]} className="absolute -translate-x-1/2 -translate-y-1/2" style={at(x, y)}>
      <span className="rounded-pill border border-mauve-300 bg-mauve-50 px-2 py-0.5 font-mono text-[9px] tracking-[0.06em] whitespace-nowrap text-mauve-900 uppercase">
        {label}
      </span>
    </ScrubReveal>
  )
}

/** A passing status, in and out. */
function Chip({
  progress,
  range,
  out,
  x,
  y,
  label,
  ink = false,
}: {
  progress: MotionValue<number>
  range: [number, number]
  out: [number, number]
  x: number
  y: number
  label: string
  ink?: boolean
}) {
  return (
    <ScrubReveal
      progress={progress}
      from={range[0]}
      to={range[1]}
      dimFrom={out[0]}
      dimTo={out[1]}
      dimOpacity={0}
      className="absolute -translate-x-1/2 -translate-y-1/2"
      style={at(x, y)}
    >
      <span
        className={cn(
          "rounded-pill px-2.5 py-1 text-[10px] font-medium whitespace-nowrap shadow-chip",
          ink ? "bg-button text-paper" : "bg-paper text-ink-soft",
        )}
      >
        {label}
      </span>
    </ScrubReveal>
  )
}

function Presence({
  progress,
  range,
  out,
  x,
  y,
  children,
}: {
  progress: MotionValue<number>
  range: [number, number]
  out: [number, number]
  x: number
  y: number
  children: React.ReactNode
}) {
  return (
    <ScrubReveal
      progress={progress}
      from={range[0]}
      to={range[1]}
      dimFrom={out[0]}
      dimTo={out[1]}
      dimOpacity={0}
      // The people are colour, not information: on a phone the diagram
      // needs its width more than they need a place in it.
      className="pointer-events-none absolute hidden sm:block"
      style={at(x, y)}
    >
      {children}
    </ScrubReveal>
  )
}
