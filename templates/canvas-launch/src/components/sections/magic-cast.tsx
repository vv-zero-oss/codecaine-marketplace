import { useEffect, useRef, useState } from "react"
import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import { Maximize2, Pause, Volume2 } from "lucide-react"

import { KineticLoop } from "@/components/art/kinetic-loop"
import { AiRunChip, AiRunRing } from "@/components/canvas/ai-run"
import { FrameTitle } from "@/components/canvas/frame-chrome"
import { MagicCastPill } from "@/components/canvas/magic-cast-pill"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { Typed } from "@/components/ui/typed"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Magic Cast, shot like a short film. You're watching a motion piece and you
 * love it. You hit record and just say so — your words run as captions, and a
 * frame is kept the moment you say "this". It becomes a brief. Hard cut to the
 * board: your own site, the assistant's ring round its hero, and then the same
 * motion, running on your page.
 */

const LINES = [
  { line: "Seen something you love?" },
  { line: "Show it. Say it." },
  { line: "Magic Cast turns it into a brief", sub: "Your words, word for word, with the frame you were pointing at each time you said “this”." },
  { line: "And now it's on your site" },
]

const CAPTIONS = ["Okay, this is so good.", "Can you put this, exactly this motion, on my hero?"]

export function MagicCast() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const view = useViewport()
  const at = Math.min(step, 3)
  const wide = view.width >= 1024
  const playerW = wide ? Math.min(700, view.width * 0.46) : view.width - 32

  return (
    <Scene ref={ref} beats={5} id="magic-cast" aria-label="Magic Cast">
      <SceneHeadline id={at} sub={LINES[at].sub} size={at === 0 ? "xl" : "lg"} className="top-[11svh]">
        {LINES[at].line}
      </SceneHeadline>

      <AnimatePresence mode="popLayout">
        {at < 3 ? (
          <motion.div
            key="watching"
            className="absolute top-[29svh] left-1/2 -translate-x-1/2"
            style={{ width: playerW }}
            exit={{ opacity: 0, filter: "blur(10px)", scale: 1.04 }}
            transition={{ duration: 0.45, ease: EASE_SWAP }}
          >
            <Player recording={at >= 1} />
            <AnimatePresence>
              {at >= 1 && (
                <motion.div
                  className="absolute top-4 left-1/2 z-10 -translate-x-1/2"
                  initial={{ opacity: 0, y: -10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.35, ease: EASE_SWAP }}
                >
                  <MagicCastPill state={at >= 2 ? "transcribing" : "recording"} elapsed={at >= 2 ? "00:09" : "00:06"} />
                </motion.div>
              )}
            </AnimatePresence>
            {at === 1 && <Captions />}
            {at === 2 && <Brief />}
          </motion.div>
        ) : (
          <motion.div
            key="board"
            className="absolute inset-x-0 top-[30svh] flex justify-center px-4"
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.5, ease: EASE_SWAP }}
          >
            <YourSite width={wide ? Math.min(900, view.width * 0.62) : view.width - 32} />
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  )
}

/** A video player: the motion piece, playing, with the usual chrome. */
function Player({ recording }: { recording: boolean }) {
  return (
    <div className="overflow-hidden rounded-window bg-art-bg shadow-window">
      <div className="relative aspect-video">
        <KineticLoop />
        {recording && <span aria-hidden className="pointer-events-none absolute inset-0 rounded-window ring-2 ring-rec ring-inset" />}
      </div>
      <div className="flex items-center gap-3 px-4 py-3 text-art-cream">
        <Pause className="size-4 fill-current" strokeWidth={0} />
        <Volume2 className="size-4" strokeWidth={1.75} />
        <span className="font-mono text-[12px] opacity-80">0:42 / 1:10</span>
        <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-art-cream/20">
          <motion.span
            className="absolute inset-y-0 left-0 rounded-full bg-art-coral"
            initial={{ width: "58%" }}
            animate={{ width: "72%" }}
            transition={{ duration: 12, ease: "linear" }}
          />
        </div>
        <span className="text-[12px] font-medium opacity-80">Motion study · loop 04</span>
        <Maximize2 className="size-4" strokeWidth={1.75} />
      </div>
    </div>
  )
}

/** Live captions, and a frame kept (a flash, a thumbnail) at "this". */
function Captions() {
  const [flash, setFlash] = useState(0)
  useEffect(() => {
    const ids = [setTimeout(() => setFlash(1), 700), setTimeout(() => setFlash(2), 2300)]
    return () => ids.forEach(clearTimeout)
  }, [])
  return (
    <>
      <AnimatePresence>
        {flash > 0 && (
          <motion.span
            key={flash}
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 aspect-video rounded-window bg-on-night"
            initial={{ opacity: 0.55 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          />
        )}
      </AnimatePresence>
      <div className="absolute inset-x-0 -bottom-4 flex translate-y-full flex-col items-center gap-2">
        <p className="rounded-[8px] bg-night/85 px-3 py-1.5 text-center text-[clamp(14px,1.3vw,18px)] font-medium text-on-night">
          <Typed text={CAPTIONS[0]} delay={0.15} speed={0.03} />{" "}
          <Typed text={CAPTIONS[1]} delay={1.2} speed={0.03} />
        </p>
        <div className="flex gap-2">
          {[1, 2].map((n) => (
            <motion.span
              key={n}
              className="flex h-7 items-center gap-1.5 rounded-pill bg-surface px-2.5 font-mono text-[11px] shadow-chip"
              initial={{ opacity: 0, y: 6 }}
              animate={flash >= n ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
              transition={{ duration: 0.3, ease: EASE_SWAP }}
            >
              <span className="size-2 rounded-full bg-rec" />
              frame {n} · “this”
            </motion.span>
          ))}
        </div>
      </div>
    </>
  )
}

/** The brief that gets sent: quoted words, with the frames they picked. */
function Brief() {
  return (
    <motion.div
      className="absolute inset-x-[6%] -bottom-6 translate-y-full rounded-card bg-surface p-5 shadow-window"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE_CAMERA }}
    >
      <p className="mb-3 font-mono text-[11px] tracking-wider text-ink-faint">BRIEF · SENT TO THE ASSISTANT</p>
      <div className="flex gap-4">
        <div className="grid w-[38%] shrink-0 grid-cols-2 gap-2">
          {[1, 2].map((n) => (
            <figure key={n} className="m-0">
              <div className="aspect-video overflow-hidden rounded-[6px]">
                <KineticLoop playing={false} />
              </div>
              <figcaption className="mt-1 font-mono text-[10px] text-ink-muted">frame {n} · 0.25s before “this”</figcaption>
            </figure>
          ))}
        </div>
        <div className="space-y-1.5 font-mono text-[12.5px] leading-5">
          <p>
            <span className="text-ink-faint">[00:02]</span> “Okay, this <Chip n={1} /> is so good.”
          </p>
          <p>
            <span className="text-ink-faint">[00:05]</span> “Can you put this <Chip n={2} />, exactly this motion, on my hero?”
          </p>
        </div>
      </div>
    </motion.div>
  )
}

function Chip({ n }: { n: number }): React.ReactNode {
  return <span className="rounded-[4px] bg-signal px-1 text-[10.5px] text-on-accent">frame {n}</span>
}

/** Your site on the board: the assistant works on the hero, then it plays. */
function YourSite({ width }: { width: number }) {
  const [phase, setPhase] = useState<"running" | "done">("running")
  useEffect(() => {
    const id = setTimeout(() => setPhase("done"), 1800)
    return () => clearTimeout(id)
  }, [])
  return (
    <div style={{ width }}>
      <FrameTitle name="my-site · localhost:3000" kind="live" />
      <div className="overflow-hidden rounded-[8px] bg-site-bg shadow-window">
        <div className="flex items-center justify-between border-b border-site-line px-5 py-3 text-[12px] text-site-muted">
          <span className="text-[14px] font-semibold tracking-tight text-site-ink">Northwind</span>
          <span className="flex gap-4">
            <span>Product</span>
            <span>Pricing</span>
            <span>Log in</span>
          </span>
        </div>
        <div className="relative aspect-[16/7]">
          <div className={cn("absolute inset-0 transition-opacity duration-700", phase === "done" ? "opacity-100" : "opacity-0")}>
            <KineticLoop />
          </div>
          <div className={cn("absolute inset-0 grid place-items-center bg-site-card transition-opacity duration-500", phase === "done" && "opacity-0")}>
            <span className="h-4 w-1/3 rounded-full bg-site-ink/15" />
          </div>
          <div className="absolute inset-x-0 bottom-[12%] flex flex-col items-center gap-2 text-center">
            <span className={cn("text-[clamp(20px,2.6vw,36px)] font-semibold tracking-[-0.04em] transition-colors duration-700", phase === "done" ? "text-art-cream" : "text-site-ink")}>
              Ship the loud version
            </span>
          </div>
          {phase === "running" && <AiRunRing state="running" />}
          <div className="absolute top-3 right-3">
            <AiRunChip label={phase === "done" ? "Hero rebuilt" : "Rebuilding the hero"} elapsed={phase === "done" ? "0:38" : "0:31"} state={phase} />
          </div>
        </div>
      </div>
    </div>
  )
}
