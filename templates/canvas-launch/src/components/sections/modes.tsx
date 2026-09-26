import { useRef } from "react"
import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"
import {
  AppWindow,
  ArrowLeft,
  ArrowRight,
  Bot,
  LayoutDashboard,
  MessageSquare,
  MousePointer2,
  Pencil,
  RotateCw,
  Sparkles,
  SquareCode,
  type LucideIcon,
} from "lucide-react"

import { EditorWindow, EDITOR_SIZE } from "@/components/mockup/editor-window"
import { Board } from "@/components/ui/diagram"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useBoardScale } from "@/hooks/use-board-scale"
import { EASE_CAMERA, EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The line-up: one switch, four ways to work. The switch's chip slides to the
 * mode each beat is about (a shared layout id), and the window below it blurs
 * from one mode to the next.
 */

const W = 1000
const H = 470

const MODES: { id: string; label: string; icon: LucideIcon; line: string; sub: string; labs?: boolean }[] = [
  {
    id: "artboard",
    label: "Artboard",
    icon: LayoutDashboard,
    line: "Artboard: the whole product on one board",
    sub: "Frames, running projects and imported pages side by side, with Design, Interact and Preview.",
  },
  {
    id: "code",
    label: "Code",
    icon: SquareCode,
    line: "Code mode: your assistant beside a real browser",
    sub: "Browse your running app, drop comment pins the assistant can read, or edit the page in place.",
  },
  {
    id: "agent",
    label: "Agent",
    icon: Bot,
    line: "Agent mode: a full coding agent in its own window",
    sub: "For the work that isn't a design: scripts, services, the back end.",
  },
  {
    id: "apps",
    label: "Apps",
    icon: AppWindow,
    line: "Apps: build your own tools with the assistant",
    sub: "Describe it, and the editor reloads it as each file is saved. Every app runs sandboxed, with the permissions you give it.",
    labs: true,
  },
]

export function Modes() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const { view, scale } = useBoardScale(W)
  const at = Math.min(step, 3)
  const mode = MODES[at]

  return (
    <Scene ref={ref} beats={4.6} id="modes" aria-label="Modes">
      <SceneHeadline id={mode.id} sub={mode.sub} size="md" className="top-[11svh]">
        {mode.line}
      </SceneHeadline>

      <Board width={W} height={H} scale={scale} top={view.width >= 1024 ? "32svh" : "44svh"}>
        {/* The switch */}
        <div className="absolute top-0 left-1/2 flex h-11 -translate-x-1/2 rounded-pill bg-ink/8 p-1">
          {MODES.map((m, i) => (
            <span
              key={m.id}
              className={cn(
                "relative flex items-center gap-2 px-4 text-[14px] font-medium transition-colors duration-300",
                i === at ? "text-ink" : "text-ink-muted",
              )}
            >
              {i === at && (
                <motion.span
                  layoutId="mode-chip"
                  className="absolute inset-0 rounded-pill bg-surface shadow-chip"
                  transition={{ duration: 0.45, ease: EASE_CAMERA }}
                />
              )}
              <m.icon className="relative size-4" strokeWidth={1.75} />
              <span className="relative">{m.label}</span>
              {m.labs && (
                <span className="relative rounded-pill bg-violet px-1.5 text-[10px] leading-4 text-on-accent">Labs</span>
              )}
            </span>
          ))}
        </div>

        <div className="absolute top-[68px] left-1/2 h-[400px] w-[900px] -translate-x-1/2">
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={mode.id}
              className="absolute inset-0 overflow-hidden rounded-window bg-ed-panel text-ed-text shadow-window"
              initial={{ opacity: 0, filter: "blur(8px)", transform: "translateY(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" }}
              exit={{ opacity: 0, filter: "blur(8px)", transform: "translateY(-14px)" }}
              transition={{ duration: 0.45, ease: EASE_SWAP }}
            >
              {mode.id === "artboard" && <ArtboardPanel />}
              {mode.id === "code" && <CodePanel />}
              {mode.id === "agent" && <AgentPanel />}
              {mode.id === "apps" && <AppsPanel />}
            </motion.div>
          </AnimatePresence>
        </div>
      </Board>
    </Scene>
  )
}

function ArtboardPanel() {
  const s = 900 / EDITOR_SIZE.width
  return (
    <div className="origin-top-left" style={{ transform: `scale(${s})` }}>
      <EditorWindow />
    </div>
  )
}

function Bubble({ from, children }: { from: "you" | "assistant"; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "max-w-[92%] rounded-[12px] px-3 py-2 text-[12.5px] leading-snug",
        from === "you" ? "self-end bg-ed-accent text-ed-on-accent" : "self-start bg-ed-field text-ed-text",
      )}
    >
      {children}
    </div>
  )
}

function CodePanel() {
  return (
    <div className="flex h-full">
      <div className="flex w-[300px] flex-col gap-2.5 border-r border-ed-line p-4">
        <p className="mb-1 flex items-center gap-2 text-[12px] font-medium text-ed-text-2">
          <Sparkles className="size-3.5 text-ai" strokeWidth={1.75} /> Assistant
        </p>
        <Bubble from="you">
          <span className="mr-1 inline-grid size-4 place-items-center rounded-full bg-ed-on-accent text-[10px] font-semibold text-ed-accent">1</span>
          Make these three cards the same height
        </Bubble>
        <Bubble from="assistant">Done. The grid now stretches its rows, in src/components/pricing.tsx.</Bubble>
        <Bubble from="you">And a bit more room above the heading?</Bubble>
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex h-11 items-center gap-2 border-b border-ed-line px-3 text-ed-text-2">
          <ArrowLeft className="size-4" strokeWidth={1.5} />
          <ArrowRight className="size-4" strokeWidth={1.5} />
          <RotateCw className="size-3.5" strokeWidth={1.5} />
          <span className="flex h-7 flex-1 items-center rounded-[7px] bg-ed-field px-3 font-mono text-[12px] text-ed-text">localhost:5173/pricing</span>
          <span className="flex h-7 rounded-[8px] bg-ed-field p-0.5 text-[11px] font-medium">
            {[
              ["Browse", MousePointer2],
              ["Comment", MessageSquare],
              ["Edit", Pencil],
            ].map(([label, Icon], i) => {
              const I = Icon as LucideIcon
              return (
                <span key={label as string} className={cn("flex items-center gap-1 rounded-[6px] px-2", i === 1 && "bg-ed-panel text-ed-text shadow-ed-chip")}>
                  <I className="size-3" strokeWidth={1.75} />
                  {label as string}
                </span>
              )
            })}
          </span>
        </div>
        <div className="relative flex-1 bg-site-bg p-6">
          <span className="block h-3 w-40 rounded-full bg-site-ink/80" />
          <span className="mt-2 block h-2 w-64 rounded-full bg-site-ink/15" />
          <div className="mt-6 grid grid-cols-3 gap-3">
            {[0, 1, 2].map((i) => (
              <div key={i} className={cn("h-40 rounded-[10px] p-3", i === 2 ? "bg-site-feature" : "bg-site-card")}>
                <span className={cn("block h-2 w-12 rounded-full", i === 2 ? "bg-site-on-feature/60" : "bg-site-ink/30")} />
              </div>
            ))}
          </div>
          <span className="absolute top-[74px] left-[150px] grid size-6 place-items-center rounded-full rounded-bl-none bg-ed-accent text-[11px] font-semibold text-ed-on-accent shadow-card">
            1
          </span>
        </div>
      </div>
    </div>
  )
}

function AgentPanel() {
  return (
    <div className="flex h-full flex-col">
      <div className="flex h-11 items-center justify-between border-b border-ed-line px-4 text-[12px]">
        <span className="flex items-center gap-2 font-medium">
          <Bot className="size-4 text-ed-text-2" strokeWidth={1.75} /> Agent window
        </span>
        <span className="rounded-pill bg-ed-field px-2.5 py-0.5 font-mono text-[11px] text-ed-text-2">your CLI · your plan</span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <Bubble from="you">Write a script that turns every image in /public into WebP and updates the imports</Bubble>
        <Bubble from="assistant">On it. Plan: find the images, convert them, rewrite the imports, run the build.</Bubble>
        <div className="rounded-[10px] bg-ed-bar p-4 font-mono text-[12px] leading-6 text-ed-bar-ink">
          <p className="text-ed-bar-ink/60">$ node scripts/to-webp.mjs</p>
          <p>converted 38 images · saved 4.1 MB</p>
          <p>updated 12 imports</p>
          <p className="text-ai">✓ build passed</p>
        </div>
      </div>
    </div>
  )
}

function AppsPanel() {
  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col gap-3 p-6">
        <p className="text-[15px] font-semibold">New app</p>
        <p className="text-[11px] font-medium text-ed-text-2">Describe it for the assistant</p>
        <div className="h-28 rounded-[10px] bg-ed-field p-3 text-[13px] leading-snug">
          A panel that lists every colour on the board that isn't one of our theme variables, with a button to swap each one for the nearest variable.
        </div>
        <div className="flex gap-2">
          <span className="flex h-8 items-center gap-1.5 rounded-[7px] bg-ed-field px-3 text-[12px] font-medium">
            <Sparkles className="size-3.5 text-ai" strokeWidth={1.75} /> Improve with AI
          </span>
          <span className="flex h-8 items-center rounded-[7px] bg-ed-ink px-3 text-[12px] font-medium text-ed-on-ink">Create app</span>
        </div>
      </div>
      <div className="w-[320px] border-l border-ed-line p-5">
        <p className="mb-3 text-[12px] font-medium text-ed-text-2">Installed</p>
        {[
          ["Colour audit", "Ask each time"],
          ["Layer census", "Always allow"],
          ["Quick styles", "This project"],
        ].map(([name, perm]) => (
          <div key={name} className="mb-2 flex h-12 items-center gap-3 rounded-[10px] bg-ed-field px-3">
            <span className="grid size-7 place-items-center rounded-[7px] bg-ed-panel shadow-ed-chip">
              <AppWindow className="size-4 text-ed-text-2" strokeWidth={1.5} />
            </span>
            <span className="flex-1 text-[13px] font-medium">{name}</span>
            <span className="text-[11px] text-ed-text-2">{perm}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
