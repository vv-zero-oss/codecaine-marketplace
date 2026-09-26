import { useRef } from "react"
import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { CircleCheck } from "lucide-react"

import { NameTag } from "@/components/ui/name-tag"
import { Scene } from "@/components/ui/scene"
import { SwapText } from "@/components/ui/swap-text"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The change journal as a diagram: the source line runs down the page, each
 * breakpoint's edits branch off it with the button as it now looks, and Save
 * brings them back in. Drawn on a 860 × 760 board (the diagram's own units),
 * scaled to the screen.
 */

const LINES = [
  "Every change, written down",
  "Every change, written down",
  "Per breakpoint, per state, counted.",
  "Then saved straight into your source.",
]

const W = 860
const H = 760
const SRC_X = 280

export function Journal() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const view = useViewport()
  const wide = view.width >= 1024
  const scale = Math.min(1, view.height / 903, wide ? view.width / 1440 : (view.width - 16) / W)
  const left = wide ? view.width / 2 - SRC_X * scale : (view.width - W * scale) / 2
  const at = Math.min(step, 3)

  return (
    <Scene ref={ref} beats={5} id="journal" aria-label="The change journal">
      <motion.div
        className="absolute inset-x-0 z-10 flex justify-center px-4 text-center"
        initial={false}
        animate={{ top: at === 0 ? "44svh" : wide ? "14.5svh" : "11svh" }}
        transition={{ duration: 0.7, ease: EASE_SWAP }}
      >
        <SwapText
          id={at === 1 ? 0 : at}
          className={cn(
            "transition-[font-size] duration-700 ease-swap",
            at === 0 ? "text-[clamp(28px,2.8vw,40px)]" : "text-[clamp(28px,3.9vw,56px)]",
          )}
        >
          {LINES[at]}
        </SwapText>
      </motion.div>

      <div
        className="absolute origin-top-left"
        style={{ left, top: wide ? 0 : view.height * 0.2, width: W, height: H, transform: `scale(${scale})` }}
      >
        <Show when={at >= 1}>
          <Pill className="left-[255px] top-[37px] border-ink bg-ed-field text-ink">SRC</Pill>
          <Line d={`M${SRC_X} 60 V${H}`} className="stroke-ink/20" />
          <Candidate at={[37, 287]} caption="ButtonLink" tone="neutral">
            <span className="rounded-[6px] bg-slate px-5 py-2 text-[22px] font-medium text-white">Start free trial</span>
          </Candidate>
          <Line d={`M215 325 H${SRC_X}`} className="stroke-ink/20" />
          <Line d={`M${SRC_X} 325 H372 Q424 325 424 377 V404`} className="stroke-violet" />
          <Pill className="left-[322px] top-[314px] border-violet bg-violet-soft text-violet">DESKTOP</Pill>
          <Node x={SRC_X} y={325} className="stroke-ink" />
          <Node x={424} y={404} className="stroke-violet" />
          <Line d="M432 404 H462" className="stroke-violet" />
          <Candidate at={[495, 371]} caption="ButtonLink" tone="violet">
            <span className="block rounded-pill bg-mint px-5 py-2 text-[22px] font-medium text-white">Start free trial</span>
          </Candidate>
        </Show>
        <Show when={at === 1}>
          <NameTag label="Editing Desktop" tone="bg-violet text-white" arrow="text-violet" className="absolute top-[418px] left-[610px]" />
        </Show>
        <Show when={at >= 2}>
          <Line d="M424 412 V600" className="stroke-signal" />
          <Pill className="left-[392px] top-[496px] border-signal bg-signal/10 text-signal">MOBILE</Pill>
          <Node x={424} y={600} className="stroke-signal" />
          <Line d="M432 600 H462" className="stroke-signal" />
          <Candidate at={[497, 566]} caption="ButtonLink · hover" tone="signal">
            <span className="flex items-center gap-2.5 rounded-pill bg-mint py-2 pr-5 pl-3 text-[22px] font-medium text-white shadow-lift">
              <CircleCheck className="size-6" strokeWidth={2} /> Start free trial
            </span>
          </Candidate>
        </Show>
        <Show when={at === 2}>
          <NameTag label="Green on mobile too?" tone="bg-violet text-white" arrow="text-violet" className="absolute top-[292px] left-[650px]" />
          <NameTag label="On it" tone="bg-signal text-white" arrow="text-signal" className="absolute top-[622px] left-[703px]" />
        </Show>
        <Show when={at >= 3}>
          <Line d={`M424 608 V640 Q424 681 383 681 H${SRC_X}`} className="stroke-signal" />
          <Node x={SRC_X} y={681} className="stroke-signal" />
          <Candidate at={[1, 648]} caption="ButtonLink · saved" tone="mint">
            <span className="flex items-center gap-2.5 rounded-pill bg-mint py-2 pr-5 pl-3 text-[22px] font-medium text-white">
              <CircleCheck className="size-6" strokeWidth={2} /> Start free trial
            </span>
          </Candidate>
          <NameTag label="Saved" tone="bg-signal text-white" arrow="text-signal" className="absolute top-[690px] left-[310px]" />
        </Show>
      </div>
    </Scene>
  )
}

function Show({ when, children }: { when: boolean; children: React.ReactNode }) {
  return (
    <AnimatePresence>
      {when && (
        <motion.div
          className="absolute inset-0"
          initial={{ opacity: 0, filter: "blur(6px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.5, ease: EASE_SWAP }}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  )
}

/** A connector that draws itself in — the line is the explanation, so it moves. */
function Line({ d, className }: { d: string; className?: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
      <motion.path
        d={d}
        fill="none"
        strokeWidth={1.5}
        className={className}
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 0.6, ease: EASE_SWAP }}
      />
    </svg>
  )
}

function Node({ x, y, className }: { x: number; y: number; className?: string }) {
  return (
    <svg className="pointer-events-none absolute inset-0 overflow-visible" width={W} height={H} aria-hidden>
      <circle cx={x} cy={y} r={8} strokeWidth={1.5} className={cn("fill-paper", className)} />
    </svg>
  )
}

function Pill({ className, children }: { className?: string; children: React.ReactNode }) {
  return (
    <span className={cn("absolute rounded-pill border px-2.5 py-0.5 font-mono text-[12px] leading-4 font-medium tracking-wide", className)}>
      {children}
    </span>
  )
}

const OUTLINE = {
  neutral: "border-ink/25 text-ink-muted",
  violet: "border-violet text-violet",
  signal: "border-signal text-signal",
  mint: "border-mint-deep text-mint-deep",
}

function Candidate({
  at,
  caption,
  tone,
  children,
}: {
  at: [number, number]
  caption: string
  tone: keyof typeof OUTLINE
  children: React.ReactNode
}) {
  return (
    <div className="absolute" style={{ left: at[0], top: at[1] - 16 }}>
      <p className={cn("mb-0.5 text-[11px] leading-4", OUTLINE[tone])}>{caption}</p>
      <div className={cn("border p-[3px]", OUTLINE[tone])}>{children}</div>
    </div>
  )
}
