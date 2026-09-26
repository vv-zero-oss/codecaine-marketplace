import { useRef } from "react"
import type * as React from "react"
import { motion } from "motion/react"
import { CircleCheck } from "lucide-react"

import { Beat, Dot, Pill, Wire } from "@/components/ui/diagram"
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
        <Beat when={at >= 1}>
          <Pill className="left-[255px] top-[37px] border-ink bg-surface text-ink">SRC</Pill>
          <Wire width={W} height={H} d={`M${SRC_X} 60 V${H}`} className="stroke-ink/20" />
          <Candidate at={[37, 287]} caption="ButtonLink" tone="neutral">
            <span className="rounded-[6px] bg-slate px-5 py-2 text-[22px] font-medium text-on-accent">Start free trial</span>
          </Candidate>
          <Wire width={W} height={H} d={`M215 325 H${SRC_X}`} className="stroke-ink/20" />
          <Wire width={W} height={H} d={`M${SRC_X} 325 H372 Q424 325 424 377 V404`} className="stroke-violet" />
          <Pill className="left-[322px] top-[314px] border-violet bg-violet-soft text-violet">DESKTOP</Pill>
          <Dot width={W} height={H} x={SRC_X} y={325} className="stroke-ink" />
          <Dot width={W} height={H} x={424} y={404} className="stroke-violet" />
          <Wire width={W} height={H} d="M432 404 H462" className="stroke-violet" />
          <Candidate at={[495, 371]} caption="ButtonLink" tone="violet">
            <span className="block rounded-pill bg-mint px-5 py-2 text-[22px] font-medium text-on-accent">Start free trial</span>
          </Candidate>
        </Beat>
        <Beat when={at === 1}>
          <NameTag label="Editing Desktop" tone="bg-violet text-on-accent" arrow="text-violet" className="absolute top-[418px] left-[610px]" />
        </Beat>
        <Beat when={at >= 2}>
          <Wire width={W} height={H} d="M424 412 V600" className="stroke-signal" />
          <Pill className="left-[392px] top-[496px] border-signal bg-signal/10 text-signal">MOBILE</Pill>
          <Dot width={W} height={H} x={424} y={600} className="stroke-signal" />
          <Wire width={W} height={H} d="M432 600 H462" className="stroke-signal" />
          <Candidate at={[497, 566]} caption="ButtonLink · hover" tone="signal">
            <span className="flex items-center gap-2.5 rounded-pill bg-mint py-2 pr-5 pl-3 text-[22px] font-medium text-on-accent shadow-lift">
              <CircleCheck className="size-6" strokeWidth={2} /> Start free trial
            </span>
          </Candidate>
        </Beat>
        <Beat when={at === 2}>
          <NameTag label="Green on mobile too?" tone="bg-violet text-on-accent" arrow="text-violet" className="absolute top-[292px] left-[650px]" />
          <NameTag label="On it" tone="bg-signal text-on-accent" arrow="text-signal" className="absolute top-[622px] left-[703px]" />
        </Beat>
        <Beat when={at >= 3}>
          <Wire width={W} height={H} d={`M424 608 V640 Q424 681 383 681 H${SRC_X}`} className="stroke-signal" />
          <Dot width={W} height={H} x={SRC_X} y={681} className="stroke-signal" />
          <Candidate at={[1, 648]} caption="ButtonLink · saved" tone="mint">
            <span className="flex items-center gap-2.5 rounded-pill bg-mint py-2 pr-5 pl-3 text-[22px] font-medium text-on-accent">
              <CircleCheck className="size-6" strokeWidth={2} /> Start free trial
            </span>
          </Candidate>
          <NameTag label="Saved" tone="bg-signal text-on-accent" arrow="text-signal" className="absolute top-[690px] left-[310px]" />
        </Beat>
      </div>
    </Scene>
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
