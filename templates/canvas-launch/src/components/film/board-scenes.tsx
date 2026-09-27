import type * as React from "react"
import { motion } from "motion/react"
import { Globe } from "lucide-react"

import { AiRunChip, AiRunRing } from "@/components/canvas/ai-run"
import { FrameTitle, Selection } from "@/components/canvas/frame-chrome"
import { Typed } from "@/components/ui/typed"
import { useTimeline } from "@/hooks/use-timeline"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"
import { NamedPointer } from "./desk"
import { LongwaveScreen, SCREEN_SIZE, type Build, type Screen } from "./longwave"

/*
 * What is on the editor's board in each beat. The board's canvas is about
 * 870 × 800 in the editor's own pixels; frames are placed in those.
 */

/** A frame on the board: its title, then the Longwave screen at `scale`. */
export function BoardFrame({
  screen,
  build,
  scale = 1,
  x,
  y,
  selected,
  running,
  kind = "live",
}: {
  screen: Screen
  build: Build
  scale?: number
  x: number
  y: number
  selected?: boolean
  running?: boolean
  kind?: "live" | "frame" | "webpage"
}) {
  const size = SCREEN_SIZE[screen]
  return (
    <div className="absolute" style={{ left: x, top: y, width: size.w * scale }}>
      <FrameTitle name={size.title} kind={kind} selected={selected} />
      <div className="relative overflow-hidden rounded-[4px] shadow-ed-frame" style={{ width: size.w * scale, height: size.h * scale }}>
        <div className="origin-top-left" style={{ transform: `scale(${scale})` }}>
          <LongwaveScreen screen={screen} build={build} />
        </div>
        {running && <AiRunRing state="running" />}
      </div>
    </div>
  )
}

/** The Import URL dialog, the address typing itself. */
export function ImportDialog() {
  return (
    <div className="absolute inset-0 grid place-items-center bg-ed-canvas/40">
      <motion.div
        className="w-[440px] rounded-[14px] bg-ed-panel p-5 text-ed-text shadow-ed-popover"
        initial={{ opacity: 0, scale: 0.97 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.25, ease: EASE_SWAP }}
      >
        <p className="text-[14px] font-semibold">Import a web page</p>
        <p className="mt-4 mb-1 text-[11px] font-medium text-ed-text-2">Address</p>
        <div className="flex h-9 items-center gap-2 rounded-[7px] bg-ed-field px-3 text-[14px] ring-1 ring-ed-accent">
          <Globe className="size-4 text-ed-text-2" strokeWidth={1.5} />
          <Typed text="longwave.fm" delay={0.35} speed={0.06} />
          <span className="h-4 w-px animate-blink bg-ed-text" />
        </div>
        <p className="mt-4 mb-1 text-[11px] font-medium text-ed-text-2">Theme</p>
        <div className="flex items-center justify-between">
          <div className="flex h-8 w-[150px] rounded-[8px] bg-ed-field p-0.5 text-[12px] font-medium">
            <span className="grid flex-1 place-items-center rounded-[6px] bg-ed-panel shadow-ed-chip">Light</span>
            <span className="grid flex-1 place-items-center text-ed-text-2">Dark</span>
          </div>
          <span className="grid h-8 place-items-center rounded-[6px] bg-ed-ink px-4 text-[12px] font-medium text-ed-on-ink">Import</span>
        </div>
      </motion.div>
    </div>
  )
}

/** The imported page landing: sections fill in top to bottom, as the import streams. */
export function ImportLanding({ active }: { active: boolean }) {
  const t = useTimeline(active, [0.1, 0.45, 0.8, 1.15, 1.6])
  return (
    <div className="absolute top-8 left-10">
      <FrameTitle name="longwave.fm" kind="webpage" selected={t >= 5} />
      <div className="relative" style={{ width: 560 * 1.35, height: 350 * 1.35 }}>
        {[0, 1, 2, 3].map((i) => (
          <motion.div
            key={i}
            className="absolute inset-0 origin-top-left"
            style={{ transform: "scale(1.35)" }}
            initial={false}
            animate={{ clipPath: `inset(0 0 ${t > i ? 0 : 100}% 0)`, opacity: t > i ? 1 : 0 }}
            transition={{ duration: 0.4, ease: EASE_SWAP }}
          >
            {i === 3 && <LongwaveScreen screen="home" build="full" />}
            {i < 3 && <LongwaveScreen screen="home" build={i === 0 ? "empty" : "wire"} className={i === 2 ? "opacity-0" : undefined} />}
          </motion.div>
        ))}
        {t >= 5 && (
          <div className="absolute top-[56px] left-[184px]">
            <Selection label="Good evening" size="112 × 16" tone="page" handles>
              <span className="block h-[22px] w-[150px]" />
            </Selection>
          </div>
        )}
      </div>
    </div>
  )
}

/** Three phone frames going from empty, to blocked out, to built. */
export function MobileBuild({ active, start = "empty" }: { active: boolean; start?: Build }) {
  const t = useTimeline(active, [0.5, 1.3, 1.9, 2.5])
  const build = (i: number): Build => {
    if (start === "full") return "full"
    if (t === 0) return start
    if (t === 1) return "wire"
    return t - 1 > i ? "full" : "wire"
  }
  return (
    <>
      {(["m-home", "m-album", "m-library"] as const).map((s, i) => (
        <BoardFrame key={s} screen={s} build={build(i)} scale={1.2} x={60 + i * 262} y={60} />
      ))}
    </>
  )
}

/** The agent at work: frames it is writing go from blocked out to built, ringed while it runs. */
export function AgentBuild({ active }: { active: boolean }) {
  const t = useTimeline(active, [0.9, 1.9, 2.7])
  return (
    <>
      <BoardFrame screen="m-album" build="full" scale={1.2} x={60} y={60} />
      <BoardFrame screen="m-library" build={t >= 2 ? "full" : t >= 1 ? "wire" : "empty"} scale={1.2} x={322} y={60} running={t < 3} />
      <BoardFrame screen="explore" build={t >= 3 ? "full" : t >= 1 ? "wire" : "empty"} scale={0.62} x={584} y={60} running={t < 3} />
      {t < 3 && (
        <div className="absolute top-[26px] left-[440px]">
          <AiRunChip label="Building Library and Explore" elapsed={`0:0${4 + t}`} state="running" />
        </div>
      )}
    </>
  )
}

/** The frames copied from the browser, arriving on the board after Paste. */
export function PasteLanding() {
  return (
    <>
      <Arrive delay={0}>
        <BoardFrame screen="home" build="full" scale={0.72} x={40} y={50} kind="frame" />
      </Arrive>
      <Arrive delay={0.08}>
        <BoardFrame screen="library" build="full" scale={0.72} x={460} y={50} kind="frame" />
      </Arrive>
      <Arrive delay={0.16}>
        <BoardFrame screen="explore" build="full" scale={0.72} x={40} y={340} kind="frame" />
      </Arrive>
    </>
  )
}

function Arrive({ delay, children }: { delay: number; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: EASE_SWAP }}
    >
      {children}
    </motion.div>
  )
}

/** The whole app on one board, with you and the assistant on it. */
export function Overview({ pointers = true }: { pointers?: boolean }) {
  return (
    <>
      <BoardFrame screen="home" build="full" scale={0.62} x={30} y={40} />
      <BoardFrame screen="explore" build="full" scale={0.62} x={400} y={40} />
      <BoardFrame screen="library" build="full" scale={0.62} x={30} y={300} />
      <BoardFrame screen="m-home" build="full" scale={0.62} x={400} y={300} />
      <BoardFrame screen="m-album" build="full" scale={0.62} x={530} y={300} />
      <BoardFrame screen="m-library" build="full" scale={0.62} x={660} y={300} />
      {pointers && (
        <>
          <span className={cn("absolute top-[208px] left-[92px]")}>
            <NamedPointer name="You" tone="a" />
          </span>
          <span className="absolute top-[180px] left-[640px]">
            <NamedPointer name="Assistant" tone="ai" />
          </span>
        </>
      )}
    </>
  )
}
