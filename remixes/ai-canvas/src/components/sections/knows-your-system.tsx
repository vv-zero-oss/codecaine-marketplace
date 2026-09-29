import { useRef, useState } from "react"
import { motion, useInView, useReducedMotion } from "motion/react"
import { Sparkles } from "lucide-react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"

import { BlurText } from "@/components/motion/blur-text"
import { Typewriter } from "@/components/motion/typewriter"
import { system } from "@/content"
import { BLUR, DURATION, EASE_IN_OUT, EASE_OUT, STAGGER } from "@/lib/motion"
import { cn } from "@/lib/utils"

/** The wiring, in a 520 × 260 box: from the button down to its tokens. */
const WIRES = ["M260 62 V104 H152 V150 H146", "M152 150 V194 H146", "M260 104 H368 V150 H374", "M368 150 V194 H374"]
const CHIPS = [
  { side: "left", y: 150 },
  { side: "left", y: 194 },
  { side: "right", y: 150 },
  { side: "right", y: 194 },
] as const

type Phase = "idle" | "built" | "wired"

/**
 * An agent building from your system rather than guessing: a prompt is
 * typed, the button it asks for appears, and lines draw from the button to
 * the tokens it was made from. Plays once, when it comes into view.
 *
 * "Generated" in the editor's Actions (group "Agent") holds it finished.
 */
export function KnowsYourSystem() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { amount: 0.55, once: true })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const [phase, setPhase] = useState<Phase>("idle")
  const [held, setHeld] = useState(false)
  useCanvasAction("Generated", (next) => setHeld(next ?? !held), { on: held, group: "Agent" })

  const finished = held || designing || !!reduced
  const current: Phase = finished ? "wired" : phase
  const built = current === "built" || current === "wired"
  const wired = current === "wired"
  const playing = inView

  return (
    <section ref={ref} id="system" className="flex min-h-scene flex-col items-center justify-center gap-10 overflow-x-clip px-gutter py-24">
      <div className="flex h-11 items-center gap-2 rounded-pill bg-paper px-4 text-[14px] shadow-chip">
        <Sparkles className="size-3.5 text-mauve-900" aria-hidden />
        <Typewriter
          text={system.prompt}
          play={playing}
          done={finished}
          onDone={() => {
            setPhase("built")
            window.setTimeout(() => setPhase("wired"), 520)
          }}
        />
      </div>

      {/* A touch smaller on a phone, so the outer chips stay on screen. */}
      <div className="relative aspect-[2/1] w-full max-w-[520px] scale-[0.84] sm:scale-100">
        <svg viewBox="0 0 520 260" className="absolute inset-0 size-full overflow-visible" fill="none" aria-hidden>
          {WIRES.map((d, i) => (
            <motion.path
              key={d}
              d={d}
              stroke="var(--hairline-strong)"
              strokeWidth={1.25}
              strokeLinejoin="round"
              initial={false}
              animate={{ pathLength: wired ? 1 : 0, opacity: wired ? 1 : 0 }}
              transition={{ duration: 0.7, ease: EASE_IN_OUT, delay: wired && !finished ? i * 0.12 : 0 }}
            />
          ))}
          {[
            [260, 104],
            [152, 150],
            [368, 150],
          ].map(([cx, cy]) => (
            <motion.circle
              key={`${cx}-${cy}`}
              cx={cx}
              cy={cy}
              r={3.5}
              fill="var(--paper)"
              stroke="var(--ink-soft)"
              strokeWidth={1.25}
              initial={false}
              animate={{ opacity: wired ? 1 : 0 }}
              transition={{ duration: DURATION.hover, delay: wired && !finished ? 0.35 : 0 }}
            />
          ))}
        </svg>

        <motion.div
          className="absolute top-[15.4%] left-1/2 -translate-x-1/2 -translate-y-1/2"
          initial={false}
          animate={
            built
              ? { opacity: 1, filter: "blur(0px)", scale: 1 }
              : { opacity: 0, filter: `blur(${BLUR}px)`, scale: 0.94 }
          }
          transition={{ duration: DURATION.reveal, ease: EASE_OUT }}
        >
          <span className="inline-flex h-10 items-center rounded-pill bg-button px-5 text-[14px] font-medium text-paper">
            {system.result}
          </span>
        </motion.div>

        {system.tokens.map((token, i) => {
          const chip = CHIPS[i]
          return (
            <motion.div
              key={token.name}
              className={cn(
                "absolute flex h-6 -translate-y-1/2 items-center gap-1.5 rounded-pill bg-paper px-2.5 text-[11px] whitespace-nowrap text-ink-soft shadow-chip",
                chip.side === "left" ? "-translate-x-full" : "",
              )}
              style={{
                left: `${((chip.side === "left" ? 142 : 378) / 520) * 100}%`,
                top: `${(chip.y / 260) * 100}%`,
              }}
              initial={false}
              animate={wired ? { opacity: 1, filter: "blur(0px)" } : { opacity: 0, filter: `blur(${BLUR / 2}px)` }}
              transition={{ duration: DURATION.reveal, ease: EASE_OUT, delay: wired && !finished ? 0.5 + i * STAGGER : 0 }}
            >
              <TokenIcon kind={token.kind} name={token.name} />
              {token.name}
            </motion.div>
          )
        })}
      </div>

      <h2 className="text-center text-scene font-medium tracking-scene text-balance">
        <BlurText text={system.title} by="line" />
      </h2>
    </section>
  )
}

function TokenIcon({ kind, name }: { kind: string; name: string }) {
  if (kind === "colour")
    return (
      <span
        className={cn("size-2.5 rounded-full", name === "primary" ? "bg-button" : "border border-hairline-strong bg-paper")}
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
