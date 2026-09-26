import { useRef } from "react"
import { motion } from "motion/react"
import { Check, Minus } from "lucide-react"

import { Beat, Board, Wire } from "@/components/ui/diagram"
import { Mark } from "@/components/ui/mark"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Bring your own model: the coding CLIs people already pay for drift in from
 * the edges and line up behind bb, the agent IDE the editor ships with. Then
 * the bill — there isn't a second one — and what still works with no AI at all.
 */

const W = 1000
const H = 440

const AGENTS = [
  { name: "Claude Code", logo: "claude-ai-icon.svg", from: [60, 30], mono: false },
  { name: "Codex", logo: "codex_light.svg", from: [800, 10], mono: true },
  { name: "Cursor", logo: "cursor_light.svg", from: [30, 300], mono: true },
  { name: "OpenCode", logo: "opencode.svg", from: [830, 330], mono: true },
  { name: "Gemini CLI", logo: "gemini.svg", from: [420, 380], mono: false },
] as const

const LINES = [
  { line: "Bring your own model" },
  {
    line: "Use the AI you already pay for",
    sub: "Codecaine runs its assistant through bb, the open-source agent IDE built in, on whichever CLI you're signed into, or any ACP agent.",
  },
  { line: "We don't sell AI. There's no second bill.", sub: "The editor holds no API key and picks no model for you." },
  {
    line: "No AI at all? The canvas still works.",
    sub: "Design, import pages and frame your running app without an assistant. Saving design changes into your code is the one part that needs one.",
  },
]

export function OwnModel() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 3)
  const lined = at >= 1

  return (
    <Scene ref={ref} beats={4.5} id="models" aria-label="Bring your own model">
      <SceneHeadline id={at} sub={LINES[at].sub} size={at === 0 ? "xl" : "lg"}>
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "36svh" : "46svh"}>
        {/* The agents, scattered, then lined up behind bb */}
        {AGENTS.map((a, i) => (
          <motion.div
            key={a.name}
            className="absolute top-0 left-0 flex h-11 items-center gap-2.5 rounded-pill bg-surface pr-4 pl-2 text-[15px] font-medium whitespace-nowrap shadow-card"
            initial={false}
            animate={
              at >= 2
                ? { x: 60 + i * 180, y: 20, opacity: 0.35, scale: 0.92 }
                : lined
                  ? { x: 60 + i * 180, y: 40, opacity: 1, scale: 1 }
                  : { x: a.from[0], y: a.from[1], opacity: 1, scale: 1 }
            }
            transition={{ duration: 0.6, delay: lined && at === 1 ? i * 0.05 : 0, ease: EASE_CAMERA }}
          >
            <span className="grid size-7 place-items-center rounded-pill bg-paper">
              <img src={`/logos/${a.logo}`} alt="" className={cn("size-4", a.mono && "dark:invert")} />
            </span>
            {a.name}
          </motion.div>
        ))}

        <Beat when={at === 1}>
          {AGENTS.map((_, i) => (
            <Wire
              key={i}
              width={W}
              height={H}
              delay={0.3 + i * 0.05}
              d={`M${140 + i * 180} 86 V130 Q${140 + i * 180} 150 ${140 + i * 180 + (500 - 140 - i * 180) * 0.2} 158 L500 186 V214`}
              className="stroke-signal"
            />
          ))}
          <motion.div
            className="absolute top-[214px] left-1/2 flex items-center gap-3"
            initial={{ opacity: 0, transform: "translateX(-50%) translateY(10px)" }}
            animate={{ opacity: 1, transform: "translateX(-50%) translateY(0px)" }}
            transition={{ duration: 0.45, delay: 0.55, ease: EASE_SWAP }}
          >
            <span className="grid h-12 place-items-center rounded-pill border border-ink bg-surface px-5 font-mono text-[16px] font-medium">bb</span>
            <span className="h-px w-10 bg-ink/30" />
            <span className="flex h-12 items-center gap-2 rounded-pill bg-ink px-5 text-[16px] font-medium text-on-ink">
              <Mark className="size-5 text-on-ink" /> Codecaine
            </span>
          </motion.div>
        </Beat>

        <Beat when={at === 2}>
          <div className="absolute top-[110px] left-1/2 w-[440px] -translate-x-1/2 rounded-card bg-surface p-6 shadow-card">
            {[
              ["Your model plan", "already yours", true],
              ["Codecaine AI add-on", "doesn't exist", false],
              ["Second subscription", "$0", false],
            ].map(([label, value, yes], i) => (
              <motion.div
                key={label as string}
                className="flex h-12 items-center gap-3 border-b border-ink/8 text-[16px] last:border-0"
                initial={{ opacity: 0, transform: "translateY(6px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.35, delay: 0.15 + i * 0.08, ease: EASE_SWAP }}
              >
                <span className={cn("grid size-6 place-items-center rounded-pill", yes ? "bg-mint text-on-accent" : "bg-ink/8 text-ink-muted")}>
                  {yes ? <Check className="size-3.5" strokeWidth={2.5} /> : <Minus className="size-3.5" strokeWidth={2.5} />}
                </span>
                <span className="flex-1">{label as string}</span>
                <span className="font-mono text-[14px] text-ink-muted">{value as string}</span>
              </motion.div>
            ))}
          </div>
        </Beat>

        <Beat when={at === 3}>
          <div className="absolute top-[110px] left-1/2 flex -translate-x-1/2 gap-4">
            {[
              ["Design on the board", true],
              ["Import a web page", true],
              ["Frame your running app", true],
              ["Save changes into code", false],
            ].map(([label, free], i) => (
              <motion.div
                key={label as string}
                className="flex w-[200px] flex-col gap-3 rounded-card bg-surface p-5 shadow-card"
                initial={{ opacity: 0, transform: "translateY(12px)" }}
                animate={{ opacity: 1, transform: "translateY(0px)" }}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.06, ease: EASE_SWAP }}
              >
                <span
                  className={cn(
                    "w-fit rounded-pill px-2 py-0.5 font-mono text-[11px]",
                    free ? "bg-mint/15 text-mint-deep" : "bg-ai/12 text-ai",
                  )}
                >
                  {free ? "NO AI NEEDED" : "NEEDS AN ASSISTANT"}
                </span>
                <span className="text-[17px] leading-snug font-medium tracking-[-0.01em]">{label as string}</span>
              </motion.div>
            ))}
          </div>
        </Beat>
      </Board>
    </Scene>
  )
}
