import { useEffect, useRef, useState } from "react"
import { AnimatePresence, animate, motion, useMotionValue } from "motion/react"

import { AuroraHeader } from "@/components/art/aurora-header"
import { AiRunChip, AiRunRing } from "@/components/canvas/ai-run"
import { AssistantBar, MentionChip } from "@/components/canvas/assistant-bar"
import { FrameTitle } from "@/components/canvas/frame-chrome"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * "Make it like theirs." Somebody else's live page sits on the board next to
 * your own project. You @ both and ask for the header, one to one. Your frame
 * builds it layer by layer — then the two scroll together, and the scroll
 * effect is the same on both.
 */

const LINES = [
  { line: "Love how another site does it?" },
  { line: "Put it on the board next to yours" },
  { line: "@ both. Ask for a one-to-one." },
  { line: "Scroll effect and all" },
]

export function Recreate() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 5)
  const view = useViewport()
  const at = Math.min(step, 3)
  const wide = view.width >= 1024
  const frameW = wide ? Math.min(560, (view.width - 160) / 2) : view.width - 32

  // Their page scrolls itself, back and forth, to show its effect off; once
  // yours is built, both share the one scroll.
  const theirs = useMotionValue(0)
  useEffect(() => {
    const controls = animate(theirs, [0, 1, 0], { duration: 4, repeat: Infinity, ease: "easeInOut" })
    return () => controls.stop()
  }, [theirs])
  const still = useMotionValue(0)

  const [built, setBuilt] = useState(0)
  useEffect(() => {
    if (at < 3) {
      setBuilt(0)
      return
    }
    const ids = [1, 2, 3, 4].map((n) => setTimeout(() => setBuilt(n / 4), 250 + n * 380))
    return () => ids.forEach(clearTimeout)
  }, [at])

  return (
    <Scene ref={ref} beats={5} id="recreate" aria-label="Recreate from a live page">
      <SceneHeadline id={at} className="top-[11svh]">
        {LINES[at].line}
      </SceneHeadline>

      <div className={cn("absolute inset-x-0 flex justify-center gap-10 px-4", wide ? "top-[32svh]" : "top-[28svh] flex-col items-center gap-6")}>
        <motion.div style={{ width: frameW }} initial={false} animate={{ opacity: at >= 0 ? 1 : 0 }}>
          <FrameTitle name="aurora.studio · live page" kind="webpage" />
          <div className="aspect-[16/10] overflow-hidden rounded-[8px] shadow-window">
            <AuroraHeader scroll={theirs} />
          </div>
        </motion.div>

        <AnimatePresence>
          {at >= 1 && (
            <motion.div
              style={{ width: frameW }}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease: EASE_SWAP }}
            >
              <FrameTitle name="my-site · localhost:3000" kind="live" />
              <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-site-bg shadow-window">
                {at < 3 ? (
                  <div className="flex h-full flex-col justify-center gap-3 p-8">
                    <span className="text-[clamp(16px,1.8vw,24px)] font-semibold text-site-ink">Northwind</span>
                    <span className="h-2 w-2/3 rounded-full bg-site-ink/12" />
                    <span className="h-2 w-1/2 rounded-full bg-site-ink/12" />
                  </div>
                ) : (
                  <AuroraHeader scroll={built >= 1 ? theirs : still} built={built} />
                )}
                {at === 3 && built < 1 && <AiRunRing state="running" />}
                {at === 3 && (
                  <div className="absolute top-3 right-3">
                    <AiRunChip
                      label={built >= 1 ? "Header recreated" : "Recreating the header"}
                      elapsed={built >= 1 ? "1:04" : "0:52"}
                      state={built >= 1 ? "done" : "running"}
                    />
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {at === 2 && (
          <motion.div
            className="absolute bottom-[10svh] left-1/2 w-[min(560px,calc(100%-32px))] -translate-x-1/2"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_SWAP }}
          >
            <AssistantBar
              value={
                <>
                  Recreate the header from <MentionChip name="aurora.studio" kind="webpage" /> in{" "}
                  <MentionChip name="my-site" kind="live" />, one to one. Scroll effect and all.
                </>
              }
            />
          </motion.div>
        )}
      </AnimatePresence>
    </Scene>
  )
}
