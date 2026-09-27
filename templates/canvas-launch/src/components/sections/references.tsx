import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion } from "motion/react"

import { AiRunChip, AiRunRing } from "@/components/canvas/ai-run"
import { AssistantBar, AssistantPill, MentionChip, MentionMenu } from "@/components/canvas/assistant-bar"
import { FrameTitle, Selection } from "@/components/canvas/frame-chrome"
import { Scene } from "@/components/ui/scene"
import { SceneHeadline } from "@/components/ui/scene-headline"
import { useSceneStep } from "@/hooks/use-scene-step"
import { useViewport } from "@/hooks/use-viewport"
import { EASE_SWAP } from "@/lib/motion"
import { cn } from "@/lib/utils"

/*
 * The assistant bubble, the way people actually use it: select a layer, open
 * the bubble, @ the layer, paste in three pictures you like — and the layer is
 * rebuilt from them, in your own palette, while you watch the ring go round.
 */

const REFS = [
  { src: "/references/sunrise.jpg", alt: "A warm poster with a rising sun and large type" },
  { src: "/references/glass.jpg", alt: "A glass orb glowing on a deep violet field" },
  { src: "/references/grid.jpg", alt: "A cream grid of bold blocks with a coral button" },
]

const LINES = [
  { line: "Point at a layer" },
  { line: "@ it. Paste what you like." },
  { line: "It rebuilds the layer from what you showed it", sub: "In your palette, in your code. The ring shows it working; the chip tells you when it's done." },
]

export function References() {
  const ref = useRef<HTMLElement>(null)
  const { step } = useSceneStep(ref, 4)
  const view = useViewport()
  const at = Math.min(step, 2)
  const wide = view.width >= 1024
  const frameW = wide ? Math.min(640, view.width * 0.44) : view.width - 32

  return (
    <Scene ref={ref} beats={4} id="references" aria-label="The assistant bubble">
      <SceneHeadline id={at} sub={LINES[at].sub} className="top-[11svh]">
        {LINES[at].line}
      </SceneHeadline>

      <div className="absolute top-[34svh] left-1/2" style={{ width: frameW, transform: `translateX(${wide ? -frameW / 2 - 200 : -frameW / 2}px)` }}>
        <FrameTitle name="my-site · localhost:3000" kind="live" />
        <div className="overflow-hidden rounded-[8px] bg-site-bg shadow-window">
          <div className="border-b border-site-line px-5 py-3 text-[14px] font-semibold tracking-tight text-site-ink">Northwind</div>
          <div className="p-4">
            <Selection label="Hero" size="728 × 300" tone="accent">
              <Hero rebuilt={at === 2} />
              {at === 2 && <AiRunRing state="running" />}
            </Selection>
          </div>
        </div>

        {/* The bubble on the selection, then the bar it opens */}
        <div className="absolute top-8 -right-3 translate-x-full">
          <AssistantPill active={at >= 1} />
        </div>
        <AnimatePresence>
          {at >= 1 && (
            <motion.div
              className={cn("absolute z-10", wide ? "top-16 left-[calc(100%+24px)] w-[400px]" : "inset-x-0 top-[calc(100%+12px)]")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_SWAP }}
            >
              <Composer done={at === 2} />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {at === 2 && (
            <motion.div
              className="absolute top-3 right-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              style={{ top: 58 }}
            >
              <AiRunChip label="Rebuilding Hero" elapsed="0:12" state="running" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Scene>
  )
}

/** What gets typed: an @ that opens the layer list, the pick, the ask, the pastes. */
function Composer({ done }: { done: boolean }) {
  const [beat, setBeat] = useState(done ? 4 : 0)
  useEffect(() => {
    if (done) return
    const ids = [300, 1100, 1700, 2200, 2700].map((t, i) => setTimeout(() => setBeat(i + 1), t))
    return () => ids.forEach(clearTimeout)
  }, [done])
  const pasted = done ? 3 : Math.max(0, beat - 2)
  return (
    <div className="relative">
      <AssistantBar
        value={
          beat === 0 ? (
            ""
          ) : beat === 1 ? (
            "Make @"
          ) : (
            <>
              Make <MentionChip name="Hero" kind="frame" /> feel like these. Keep our palette.
            </>
          )
        }
        placeholder="Ask about this layer…"
        attachments={REFS.slice(0, pasted)}
        sending={done}
      />
      <AnimatePresence>
        {beat === 1 && (
          <motion.div
            className="absolute top-full left-0 mt-2"
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <MentionMenu
              query=""
              active={0}
              items={[
                { name: "Hero", kind: "frame", detail: "Selected" },
                { name: "Navbar", kind: "stack" },
                { name: "Pricing", kind: "frame" },
                { name: "Footer", kind: "stack" },
              ]}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/** The hero before (plain) and after (rebuilt from the three references). */
function Hero({ rebuilt }: { rebuilt: boolean }) {
  return (
    <div className="relative h-[clamp(180px,22vw,300px)] overflow-hidden rounded-[6px]">
      <div className={cn("absolute inset-0 flex flex-col justify-center gap-3 bg-site-card p-8 transition-opacity duration-700", rebuilt && "opacity-0")}>
        <span className="text-[clamp(18px,2.2vw,30px)] font-semibold tracking-[-0.03em] text-site-ink">Plan less. Ship more.</span>
        <span className="h-2 w-2/3 rounded-full bg-site-ink/12" />
        <span className="h-9 w-32 rounded-[6px] bg-site-feature" />
      </div>
      <div
        className={cn(
          "absolute inset-0 grid grid-cols-[1.4fr_1fr] gap-3 bg-art-cream p-4 transition-opacity delay-[900ms] duration-700",
          rebuilt ? "opacity-100" : "opacity-0",
        )}
      >
        <div className="flex flex-col justify-end rounded-[12px] bg-art-bg p-6 text-art-cream">
          <span className="text-[clamp(20px,2.6vw,38px)] leading-[0.9] font-extrabold tracking-[-0.05em]">
            Plan less.
            <br />
            Ship more.
          </span>
          <span className="mt-4 h-8 w-28 rounded-pill bg-art-coral" />
        </div>
        <div className="relative overflow-hidden rounded-[12px] bg-[linear-gradient(160deg,var(--color-art-cream),var(--color-art-amber)_55%,var(--color-art-coral))]">
          <span className="absolute -right-8 bottom-4 size-[70%] rounded-full bg-[radial-gradient(circle,var(--color-art-cream),var(--color-art-amber)_40%,var(--color-art-coral)_75%)]" />
        </div>
      </div>
    </div>
  )
}
