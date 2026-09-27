import { useRef } from "react"
import type * as React from "react"
import { AnimatePresence, motion } from "motion/react"

import { ThreeObject } from "@/components/art/three-object"
import { AiRunChip } from "@/components/canvas/ai-run"
import { AssistantBar, MentionChip } from "@/components/canvas/assistant-bar"
import { FrameTitle, Selection } from "@/components/canvas/frame-chrome"
import { Toolbar } from "@/components/canvas/toolbar"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { Typed } from "@/components/ui/typed"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * Real elements, not pictures of them. From the editor's own toolbar: a form
 * that is a real form (fields that focus, a choice that ticks), then a 3D
 * scene that is a real three.js scene — and one sentence to the assistant
 * changes it while it keeps running.
 */

const LINES = [
  { line: "Real elements, not pictures of them" },
  { line: "Build a form that actually works" },
  { line: "A 3D scene is just another layer" },
  { line: "Ask, and it changes while it runs" },
]

export function RealElements() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const view = useViewport()
  const at = Math.min(step, 3)
  const wide = view.width >= 1024
  const colW = wide ? Math.min(420, (view.width - 200) / 2) : view.width - 32

  return (
    <Scene ref={ref} beats={5} id="real-elements" aria-label="Real elements">
      <SceneHeadline id={at} className="top-[11svh]">
        {LINES[at].line}
      </SceneHeadline>

      <div className={cn("absolute inset-x-0 flex justify-center gap-12 px-4", wide ? "top-[31svh] items-start" : "top-[27svh] flex-col items-center gap-5")}>
        {/* The form */}
        <motion.div style={{ width: colW }} initial={false} animate={{ opacity: at >= 3 && !wide ? 0 : 1 }}>
          <FrameTitle name="Sign up" kind="frame" selected={at === 1} />
          <div className="rounded-[10px] bg-site-bg p-6 shadow-window">
            <p className="text-[20px] font-semibold tracking-[-0.02em] text-site-ink">Join the beta</p>
            <div className="mt-4 space-y-3">
              <Field show={at >= 1} delay={0} label="Name" value="Ada Park" />
              <Field show={at >= 1} delay={0.15} label="Email" value="ada@northwind.dev" focused />
              <motion.div
                className="flex gap-2"
                initial={false}
                animate={at >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: 0.3, ease: EASE_SWAP }}
              >
                {["Designer", "Engineer", "Both"].map((c, i) => (
                  <span
                    key={c}
                    className={cn(
                      "flex h-9 flex-1 items-center gap-2 rounded-[8px] border px-3 text-[13px]",
                      i === 2 ? "border-ed-accent bg-ed-accent-soft text-site-ink" : "border-site-line text-site-muted",
                    )}
                  >
                    <span className={cn("size-3.5 rounded-full border-2", i === 2 ? "border-ed-accent bg-ed-accent shadow-[inset_0_0_0_2px_var(--color-site-bg)]" : "border-site-line")} />
                    {c}
                  </span>
                ))}
              </motion.div>
              <motion.span
                className="flex h-10 items-center justify-center rounded-[8px] bg-site-feature text-[14px] font-medium text-site-on-feature"
                initial={false}
                animate={at >= 1 ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
                transition={{ duration: 0.35, delay: 0.45, ease: EASE_SWAP }}
              >
                Request an invite
              </motion.span>
            </div>
          </div>
        </motion.div>

        {/* The 3D scene */}
        <AnimatePresence>
          {at >= 2 && (
            <motion.div
              style={{ width: colW }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_SWAP }}
              className={cn(!wide && "absolute top-0")}
            >
              <FrameTitle name="Scene · 3D Canvas" kind="frame" selected />
              <Selection label="Scene" size="420 × 300" tone="accent">
                <div className="relative aspect-[7/5] overflow-hidden rounded-[10px] bg-[radial-gradient(circle_at_50%_40%,var(--color-art-violet),var(--color-art-bg)_70%)] shadow-window">
                  <ThreeObject look={at >= 3 ? "glass" : "matte"} speed={at >= 3 ? 0.35 : 1.2} />
                  {at === 3 && (
                    <div className="absolute top-3 right-3">
                      <AiRunChip label="Glass, slower" elapsed="0:04" state="done" />
                    </div>
                  )}
                </div>
              </Selection>
              <AnimatePresence>
                {at === 3 && (
                  <motion.div
                    className="mt-5"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE_SWAP }}
                  >
                    <AssistantBar
                      value={
                        <>
                          Make <MentionChip name="Scene" kind="canvas" /> <Typed text="glass, and slow the spin right down." delay={0.2} speed={0.025} />
                        </>
                      }
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* The editor's own toolbar, with the tool each beat uses */}
      <div className="absolute bottom-[5svh] left-1/2 -translate-x-1/2 origin-bottom scale-[0.8] sm:scale-100">
        <Toolbar activeTool={at === 2 ? "media" : "shape"} openGroup={at === 0 ? "shape" : at === 2 ? "media" : undefined} />
      </div>
    </Scene>
  )
}

function Field({ show, delay, label, value, focused }: { show: boolean; delay: number; label: string; value: string; focused?: boolean }): React.ReactNode {
  return (
    <motion.label
      className="block"
      initial={false}
      animate={show ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      transition={{ duration: 0.35, delay, ease: EASE_SWAP }}
    >
      <span className="mb-1 block text-[12px] font-medium text-site-muted">{label}</span>
      <span
        className={cn(
          "flex h-10 items-center rounded-[8px] border px-3 text-[14px] text-site-ink",
          focused ? "border-ed-accent ring-3 ring-ed-accent/20" : "border-site-line",
        )}
      >
        {show ? <Typed text={value} delay={delay + 0.4} speed={0.04} /> : null}
        {focused && <span className="ml-px h-4 w-px animate-[breathe_1s_steps(1)_infinite] bg-site-ink" />}
      </span>
    </motion.label>
  )
}
