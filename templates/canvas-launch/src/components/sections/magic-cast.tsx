import { useRef } from "react"
import type * as React from "react"
import { motion } from "motion/react"
import { Ear, Eye, Keyboard, Mic, MousePointer2, MousePointerClick, Pencil, Square, type LucideIcon } from "lucide-react"

import { Beat, Board, Wire } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { Typed } from "@/components/ui/typed"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Magic Cast, told from the senses up: the four things a person does while
 * explaining a change, handed to the assistant as one recording — then what
 * comes out of it, a transcript with the frames each word pointed at.
 */

const W = 1000
const H = 470

const SENSES: { icon: LucideIcon; label: string; note: string }[] = [
  { icon: Eye, label: "See", note: "Your screen, as frames" },
  { icon: Ear, label: "Hear", note: "Your voice, word by word" },
  { icon: MousePointer2, label: "Point", note: "Where you were when you said “this”" },
  { icon: Keyboard, label: "Type", note: "Straight into the chat" },
]

const LINES = [
  { line: "You see. You hear. You point. You type." },
  { line: "Now your assistant does too" },
  { line: "Magic Cast: record your screen, talk, get a brief", sub: "Draw on the screen and keep using your app while it records." },
  {
    line: "It transcribes. It doesn't guess.",
    sub: "Speech runs on your machine, with no API key, and works offline. Up to 20 frames, each captioned with the word that picked it.",
  },
]

const FRAMES = [
  { word: "this", at: "00:03" },
  { word: "here", at: "00:07" },
  { word: "that one", at: "00:11" },
]

export function MagicCast() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 3)

  return (
    <Scene ref={ref} beats={4.5} id="magic-cast" aria-label="Magic Cast">
      <SceneHeadline id={at} sub={LINES[at].sub} size={at === 0 ? "xl" : "lg"} className={at === 0 ? "sm:[&_h2]:max-w-[22ch]" : undefined}>
        {LINES[at].line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "36svh" : "44svh"}>
        {/* The four senses, then wired into one recording */}
        <Beat when={at <= 1}>
          {SENSES.map((sense, i) => (
            <motion.div
              key={sense.label}
              className="absolute top-0 flex w-[214px] flex-col gap-3 rounded-card bg-surface p-5 shadow-card"
              style={{ left: 20 + i * 246 }}
              initial={{ opacity: 0, transform: "translateY(16px)" }}
              animate={{ opacity: 1, transform: `translateY(${at === 1 ? -10 : 0}px)` }}
              transition={{ duration: 0.45, delay: i * 0.06, ease: EASE_SWAP }}
            >
              <span className="grid size-10 place-items-center rounded-pill bg-ink text-on-ink">
                <sense.icon className="size-5" strokeWidth={1.75} />
              </span>
              <span className="text-[22px] font-medium tracking-[-0.02em]">{sense.label}</span>
              <span className="text-[14px] leading-snug text-ink-muted">{sense.note}</span>
            </motion.div>
          ))}
        </Beat>
        <Beat when={at === 1}>
          {[127, 373, 619, 865].map((x, i) => (
            <Wire
              key={x}
              width={W}
              height={H}
              delay={i * 0.06}
              d={`M${x} 190 V240 Q${x} 270 ${x + (500 - x) * 0.3} 280 L${500 + (x - 500) * 0.1} 330 V360`}
              className="stroke-signal"
            />
          ))}
        </Beat>

        {/* The recording pill */}
        <motion.div
          className="absolute left-1/2 -translate-x-1/2"
          initial={false}
          animate={at === 0 ? { opacity: 0, top: 380 } : { opacity: 1, top: at === 1 ? 360 : 20 }}
          transition={{ duration: 0.55, ease: EASE_CAMERA }}
        >
          <RecordingPill />
        </motion.div>

        {/* What comes out: frames, then the transcript */}
        <Beat when={at >= 2}>
          <div className="absolute top-[110px] left-0 flex w-full justify-center gap-5">
            {FRAMES.map((f, i) => (
              <motion.figure
                key={f.word}
                className="m-0 w-[230px]"
                initial={{ opacity: 0, transform: `translateY(20px) rotate(${(i - 1) * 3}deg)` }}
                animate={{ opacity: 1, transform: `translateY(${at === 3 ? -6 : 0}px) rotate(${(i - 1) * 2}deg)` }}
                transition={{ duration: 0.5, delay: 0.15 + i * 0.08, ease: EASE_SWAP }}
              >
                <MiniScreen highlight={i} />
                <figcaption className="mt-2 font-mono text-[12px] text-ink-muted">
                  {f.at} · 0.25s before “{f.word}”
                </figcaption>
              </motion.figure>
            ))}
          </div>
        </Beat>
        <Beat when={at === 3}>
          <div className="absolute top-[300px] left-1/2 w-[620px] -translate-x-1/2 rounded-card bg-surface p-5 font-mono text-[13px] leading-6 shadow-card">
            <Typed as="p" delay={0.2} speed={0.014} text="[00:03] “Make this button match the one on the pricing page,”" insert={{ after: 24, node: <FrameChip n={1} /> }} />
            <Typed as="p" delay={1.2} speed={0.014} text="[00:07] “it's right here, and use that one's shadow.”" insert={{ after: 24, node: <FrameChip n={2} /> }} />
          </div>
        </Beat>
      </Board>
    </Scene>
  )
}

/** Magic Cast's floating pill while recording: always dark, like the editor's toolbar. */
function RecordingPill() {
  return (
    <div className="flex h-11 items-center gap-1 rounded-pill bg-ed-bar pr-1.5 pl-4 text-ed-bar-ink shadow-ed-bar">
      <span className="relative mr-1 grid size-3 place-items-center">
        <span className="absolute size-3 animate-ping rounded-full bg-rec/60 motion-reduce:hidden" />
        <span className="size-2.5 rounded-full bg-rec" />
      </span>
      <span className="mr-2 font-mono text-[13px] tabular-nums">00:14</span>
      {[Mic, Pencil, MousePointerClick].map((Icon, i) => (
        <span key={i} className="grid size-8 place-items-center rounded-pill text-ed-bar-ink/80">
          <Icon className="size-4" strokeWidth={1.75} />
        </span>
      ))}
      <span className="ml-1 grid size-8 place-items-center rounded-pill bg-rec text-on-accent">
        <Square className="size-3 fill-current" strokeWidth={0} />
      </span>
    </div>
  )
}

/** A frame the recording kept: a page, with the thing that was pointed at ringed. */
function MiniScreen({ highlight }: { highlight: number }) {
  return (
    <div className="aspect-[16/10] overflow-hidden rounded-[10px] bg-site-bg p-3 shadow-card">
      <span className="block h-1.5 w-1/3 rounded-full bg-site-ink/70" />
      <span className="mt-2 block h-1 w-3/4 rounded-full bg-site-ink/15" />
      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "h-12 rounded-[5px] bg-site-card",
              i === highlight && "outline-2 outline-offset-2 outline-signal outline-solid",
            )}
          />
        ))}
      </div>
      <span className="mt-2.5 block h-3 w-12 rounded-pill bg-site-feature" />
    </div>
  )
}


function FrameChip({ n }: { n: number }): React.ReactNode {
  return (
    <span className="mx-1 inline-block rounded-[4px] bg-signal px-1.5 align-[1px] text-[11px] leading-4 text-on-accent">
      frame {n}
    </span>
  )
}
