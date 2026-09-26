import { useRef } from "react"
import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { AtSign, Check, Columns2, MapPin, Rows2, Sparkles, Square } from "lucide-react"

import { Board } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The assistant working on the board the way the editor draws it: a mention
 * picks the layer, a band of colour travels round each frame that has a run
 * on it, a chip says what and how long — and a run that needs a person turns
 * amber and breathes instead.
 */

const W = 1000
const H = 470

type Frame = { name: string; x: number; y: number; w: number; h: number; task: string; time: string }
const FRAMES: Frame[] = [
  { name: "Hero", x: 30, y: 96, w: 440, h: 210, task: "Tightening the spacing", time: "0:04" },
  { name: "Pricing", x: 520, y: 96, w: 450, h: 210, task: "Adding an annual toggle", time: "0:02" },
  { name: "Footer", x: 30, y: 352, w: 660, h: 104, task: "Regrouping the links", time: "0:03" },
]

const LINES = [
  { line: "@ any layer. Ask for anything." },
  { line: "Each request becomes its own run" },
  { line: "Three at once. Each one holds its own layer." },
  { line: "And it tells you when it needs you", sub: "A frame that is waiting on you turns amber and breathes. Everything else carries on." },
]

export function ParallelRuns() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 3)

  const state = (i: number): "idle" | "running" | "waiting" | "done" => {
    if (at === 3) return i === 2 ? "waiting" : i === 0 ? "done" : "running"
    if (at === 2) return "running"
    if (at === 1) return i === 0 ? "running" : "idle"
    return "idle"
  }

  return (
    <Scene ref={ref} beats={4.5} id="runs" aria-label="Parallel assistant runs">
      <SceneHeadline id={at} sub={LINES[at].sub}>
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "32svh" : "42svh"}>
        {FRAMES.map((f, i) => (
          <FrameCard key={f.name} frame={f} state={state(i)} />
        ))}

        {/* The assistant bar on the selection, with a mention */}
        <AnimatePresence>
          {at === 0 && (
            <motion.div
              className="absolute top-[228px] left-[60px] w-[380px]"
              initial={{ opacity: 0, transform: "translateY(8px)" }}
              animate={{ opacity: 1, transform: "translateY(0px)" }}
              exit={{ opacity: 0, filter: "blur(6px)" }}
              transition={{ duration: 0.4, ease: EASE_SWAP }}
            >
              <div className="flex h-11 items-center gap-2 rounded-[10px] bg-surface px-3 text-[15px] shadow-card">
                <Sparkles className="size-4 text-ai" strokeWidth={1.75} />
                <span>Tighten the spacing in</span>
                <span className="inline-flex items-center gap-0.5 rounded-[5px] bg-ai/12 px-1.5 font-medium text-ai">
                  <AtSign className="size-3.5" strokeWidth={2} />
                  Hero
                </span>
              </div>
              <ul className="mt-2 w-[220px] overflow-hidden rounded-[10px] bg-surface py-1 text-[13px] shadow-card">
                {[
                  ["Hero", Rows2],
                  ["Pricing", Columns2],
                  ["Footer", Columns2],
                ].map(([name, Icon], i) => (
                  <li key={name as string} className={cn("flex h-8 items-center gap-2 px-3", i === 0 && "bg-ai/10")}>
                    <Icon className="size-4 text-ink-faint" strokeWidth={1.5} />
                    {name as string}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>

        {/* The notices a run leaves */}
        <AnimatePresence>
          {at === 3 && (
            <motion.div
              className="absolute top-[352px] left-[720px] flex flex-col items-start gap-2"
              initial={{ opacity: 0, transform: "translateX(-8px)" }}
              animate={{ opacity: 1, transform: "translateX(0px)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.2, ease: EASE_SWAP }}
            >
              <Notice tone="amber" action="Locate">
                <b className="font-medium">Footer</b> needs you: keep the old links?
              </Notice>
              <Notice tone="done">
                <b className="font-medium">Hero</b>: spacing tightened to 24px
              </Notice>
            </motion.div>
          )}
        </AnimatePresence>
      </Board>
    </Scene>
  )
}

function FrameCard({ frame, state }: { frame: Frame; state: "idle" | "running" | "waiting" | "done" }) {
  const live = state === "running" || state === "waiting"
  return (
    <div className="absolute" style={{ left: frame.x, top: frame.y, width: frame.w, height: frame.h }}>
      <p className="absolute -top-5 left-0 text-[11px] font-medium text-ink-muted">{frame.name}</p>
      <div className="size-full overflow-hidden rounded-[12px] bg-surface p-5 shadow-card">
        <span className="block h-2.5 w-2/5 rounded-full bg-ink/60" />
        <span className="mt-3 block h-2 w-4/5 rounded-full bg-ink/12" />
        <span className="mt-2 block h-2 w-3/5 rounded-full bg-ink/12" />
        {frame.h > 150 && <span className="mt-6 block h-7 w-24 rounded-pill bg-ink/80" />}
      </div>

      {/* The travelling band: a dash that runs round the frame's outline */}
      <AnimatePresence>
        {live && (
          <motion.svg
            className={cn("pointer-events-none absolute -inset-[5px] overflow-visible", state === "waiting" && "animate-breathe")}
            width={frame.w + 10}
            height={frame.h + 10}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            aria-hidden
          >
            <rect
              x={1}
              y={1}
              width={frame.w + 8}
              height={frame.h + 8}
              rx={16}
              fill="none"
              strokeWidth={2}
              className={state === "waiting" ? "stroke-amber" : "stroke-ai/25"}
            />
            {state === "running" && (
              <rect
                x={1}
                y={1}
                width={frame.w + 8}
                height={frame.h + 8}
                rx={16}
                fill="none"
                strokeWidth={3.5}
                pathLength={100}
                strokeDasharray="34 66"
                strokeLinecap="round"
                className="animate-travel stroke-ai motion-reduce:animate-none"
              />
            )}
          </motion.svg>
        )}
      </AnimatePresence>

      {/* The run chip on the frame's name strip */}
      <AnimatePresence>
        {state !== "idle" && (
          <motion.span
            className={cn(
              "absolute -top-6 right-0 flex h-6 items-center gap-1.5 rounded-pill px-2.5 text-[11px] font-medium whitespace-nowrap text-on-accent",
              state === "waiting" ? "bg-amber text-on-bright" : state === "done" ? "bg-mint-deep" : "bg-ai",
            )}
            initial={{ opacity: 0, transform: "translateY(4px)" }}
            animate={{ opacity: 1, transform: "translateY(0px)" }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: EASE_SWAP }}
          >
            {state === "done" ? <Check className="size-3" strokeWidth={2.5} /> : null}
            {state === "waiting" ? "Waiting for you" : state === "done" ? "Done" : `${frame.task} · ${frame.time}`}
            {state === "running" && <Square className="size-2.5 fill-current opacity-80" strokeWidth={0} />}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  )
}

function Notice({ tone, action, children }: { tone: "amber" | "done"; action?: string; children: React.ReactNode }) {
  return (
    <div className="flex h-10 items-center gap-2.5 rounded-pill bg-surface pr-1.5 pl-3.5 text-[14px] whitespace-nowrap shadow-card">
      <span className={cn("size-2 rounded-full", tone === "amber" ? "bg-amber" : "bg-mint-deep")} />
      <span>{children}</span>
      {action && (
        <span className="flex h-7 items-center gap-1 rounded-pill bg-ink px-3 text-[12px] font-medium text-on-ink">
          <MapPin className="size-3" strokeWidth={2} />
          {action}
        </span>
      )}
    </div>
  )
}
