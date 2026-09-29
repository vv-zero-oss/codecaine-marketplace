import { useRef, useState } from "react"
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react"
import { Sparkles } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { CursorChip } from "@/components/blocks/cursor-chip"
import { LogoMark } from "@/components/blocks/logo"
import { BlurText } from "@/components/motion/blur-text"
import { Typewriter } from "@/components/motion/typewriter"
import { system } from "@/content"
import { BLUR, DURATION, EASE_IN_OUT, EASE_OUT, STAGGER } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * The wiring, in a 520 × 260 box, mirrored about the centre (x = 260): from
 * the button down to a split, then out to the first token on the left and
 * the first two on the right. Columns sit 46 either side of centre, rows on
 * a 30-unit rhythm.
 */
const W = 520
const H = 260
const CENTRE = 260
const LEFT = 214
const RIGHT = 306
const ROWS = [158, 188, 218]
const WIRES = [
  `M${CENTRE} 112 V132 H${LEFT} V${ROWS[0]}`,
  `M${CENTRE} 132 H${RIGHT} V${ROWS[0]}`,
  `M${RIGHT} ${ROWS[0]} V${ROWS[1]}`,
]
const JOINTS: [number, number][] = [
  [LEFT, ROWS[0]],
  [RIGHT, ROWS[0]],
  [RIGHT, ROWS[1]],
]
const pos = (x: number, y: number) => ({ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` })

type Phase = "idle" | "built" | "wired"

/**
 * An agent building from your system rather than guessing. The page's mark
 * waits where the button will be; the prompt is typed; the mark sharpens into
 * the button; lines run down to the tokens it was made from — the wired ones
 * in ink, the rest of the system muted beside them. Plays once, in view.
 *
 * The stage is cut on the golden section: the diagram in the upper 61.8%,
 * the headline in the lower 38.2%. "Generated" (group "Agent") holds it
 * finished in the editor.
 */
export function KnowsYourSystem() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.6, once: true })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [phase, setPhase] = useState<Phase>("idle")
  const [held, setHeld] = useState(false)
  useCanvasAction("Generated", (next) => setHeld(next ?? !held), { on: held, group: "Agent" })

  const finished = held || designing || !!reduced
  const current: Phase = finished ? "wired" : phase
  const built = current !== "idle"
  const wired = current === "wired"
  const beat = (i: number) => (wired && !finished ? i : 0)

  return (
    <section ref={ref} id="system" className="grid h-svh min-h-[640px] rows-golden-below px-gutter pt-nav">
      <div className="flex items-center justify-center">
        <div className="relative aspect-[2/1] w-full max-w-[720px] scale-[0.86] sm:scale-100">
          {/* The prompt, with the person typing it. */}
          <div className="absolute top-0 left-1/2 flex -translate-x-1/2 items-center">
            <div className="flex h-11 items-center gap-2 rounded-pill bg-paper px-4 text-[14px] whitespace-nowrap shadow-chip">
              <Sparkles className="size-3.5 text-mauve-900" aria-hidden />
              <Typewriter
                text={system.prompt}
                play={inView}
                done={finished}
                onDone={() => {
                  setPhase("built")
                  window.setTimeout(() => setPhase("wired"), 560)
                }}
              />
            </div>
            <CursorChip name="Maya" tone="2" className="absolute -right-phi-7 -bottom-phi-3 hidden sm:flex" />
          </div>

          <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
            {WIRES.map((d, i) => (
              <motion.path
                key={d}
                d={d}
                stroke="var(--ink-soft)"
                strokeWidth={1.25}
                strokeLinejoin="round"
                initial={false}
                animate={{ pathLength: wired ? 1 : 0, opacity: wired ? 1 : 0 }}
                transition={{ duration: 0.6, ease: EASE_IN_OUT, delay: beat(i * 0.14) }}
              />
            ))}
            {JOINTS.map(([cx, cy], i) => (
              <motion.circle
                key={`${cx}-${cy}`}
                cx={cx}
                cy={cy}
                r={4}
                fill="var(--paper)"
                stroke="var(--ink)"
                strokeWidth={1.5}
                initial={false}
                animate={{ opacity: wired ? 1 : 0 }}
                transition={{ duration: DURATION.hover, delay: beat(0.4 + i * 0.1) }}
              />
            ))}
          </svg>

          {/* The mark becomes the button: one crossfades into the other. */}
          <div className="absolute -translate-x-1/2 -translate-y-1/2" style={pos(CENTRE, 90)}>
            <AnimatePresence mode="popLayout" initial={false}>
              {built ? (
                <motion.span
                  key="button"
                  className="inline-flex h-12 items-center rounded-pill bg-button px-7 text-[15px] font-medium whitespace-nowrap text-paper"
                  initial={{ opacity: 0, filter: `blur(${BLUR}px)`, transform: "scale(0.94)" }}
                  animate={{ opacity: 1, filter: "blur(0px)", transform: "scale(1)" }}
                  transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
                >
                  {system.result}
                </motion.span>
              ) : (
                <motion.span
                  key="mark"
                  className="block"
                  exit={{ opacity: 0, filter: `blur(${BLUR}px)`, transform: "scale(1.06)" }}
                  transition={{ duration: DURATION.swap, ease: EASE_OUT }}
                >
                  <LogoMark className="size-12 rounded-[13px]" />
                </motion.span>
              )}
            </AnimatePresence>
          </div>

          {/* The system: colours on the left, shape and type on the right. */}
          {system.colours.map((name, i) => (
            <Token key={name} name={name} kind="colour" side="left" row={i} wired={i === 0 && wired} shown={wired} delay={beat(0.5 + i * STAGGER)} />
          ))}
          {system.styles.map((name, i) => (
            <Token key={name} name={name} kind={i === 0 ? "radius" : "type"} side="right" row={i} wired={i < 2 && wired} shown={wired} delay={beat(0.55 + i * STAGGER)} />
          ))}
        </div>
      </div>

      <div className="flex items-start justify-center pt-phi-3">
        <h2 className="text-center text-scene font-medium tracking-scene text-balance">
          <BlurText text={system.title} by="line" />
        </h2>
      </div>
    </section>
  )
}

function Token({
  name,
  kind,
  side,
  row,
  wired,
  shown,
  delay,
}: {
  name: string
  kind: "colour" | "radius" | "type"
  side: "left" | "right"
  row: number
  wired: boolean
  shown: boolean
  delay: number
}) {
  const x = side === "left" ? LEFT - 12 : RIGHT + 12
  return (
    <motion.div
      className={cn(
        "absolute flex h-7 -translate-y-1/2 items-center gap-1.5 rounded-pill bg-paper px-3 text-[12px] whitespace-nowrap shadow-chip",
        side === "left" && "-translate-x-full",
        wired ? "text-ink" : "text-ink-muted",
      )}
      style={pos(x, ROWS[row])}
      initial={false}
      animate={shown ? { opacity: wired ? 1 : 0.55, filter: "blur(0px)" } : { opacity: 0.35, filter: "blur(0px)" }}
      transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay }}
    >
      <TokenIcon kind={kind} name={name} />
      {name}
    </motion.div>
  )
}

function TokenIcon({ kind, name }: { kind: string; name: string }) {
  if (kind === "colour")
    return (
      <span
        className={cn(
          "size-2.5 rounded-full",
          name === "primary" && "bg-button",
          name === "mauve" && "bg-mauve-500",
          name === "paper" && "border border-hairline-strong bg-paper",
        )}
        aria-hidden
      />
    )
  if (kind === "radius") return <span className="size-2.5 rounded-full border border-ink-soft" aria-hidden />
  return (
    <span className="text-[9px] font-semibold" aria-hidden>
      Aa
    </span>
  )
}
