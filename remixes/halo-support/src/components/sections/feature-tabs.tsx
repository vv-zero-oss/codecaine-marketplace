import { BorderBeam } from "border-beam"
import { AnimatePresence, motion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { useCycle, useStill } from "@/components/motion"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Glow } from "@/components/ui/glow"
import {
  AgentChatVisual, ExperimentVisual, NewAgentVisual, ObjectiveVisual, OpportunitiesVisual, SegmentVisual,
  ThreadsVisual, TrendVisual,
} from "@/components/visuals/visuals"
import { FEATURES, type FeatureGroup } from "@/content"
import { cn } from "@/lib/utils"

const VISUALS: Record<FeatureGroup, React.ReactNode[]> = {
  build: [<NewAgentVisual />, <AgentChatVisual step={1} />, <AgentChatVisual step={2} />],
  observe: [<SegmentVisual />, <ThreadsVisual />, <TrendVisual />],
  improve: [<ObjectiveVisual />, <OpportunitiesVisual />, <ExperimentVisual />],
}

/**
 * A product walkthrough: a title and three steps on the left, the live screen
 * for the current step on the right. The step advances every `cycleSeconds`
 * (an orange rule fills along the open step to show the time left), holds while
 * the pointer is over it, and any step can be chosen directly.
 */
export function FeatureTabs({
  group,
  cycleSeconds = 6.5,
  autoplay = true,
}: {
  group: FeatureGroup
  cycleSeconds?: number
  autoplay?: boolean
}) {
  const feature = FEATURES[group]
  const still = useStill()
  const [hover, setHover] = useState(false)
  const paused = hover || still || !autoplay
  const [step, setStep] = useCycle(feature.steps.length, cycleSeconds, paused)
  useCanvasAction(`${feature.eyebrow}: next step`, () => setStep((step + 1) % feature.steps.length), { group: "Walkthroughs" })

  return (
    <section id={group} className="relative py-14 sm:py-20">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,450px)_minmax(0,1fr)] lg:gap-[42px]" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
          <div className="flex flex-col">
            <Eyebrow>{feature.eyebrow}</Eyebrow>
            <h2 className="mt-5 text-[clamp(24px,2.2vw,28px)] leading-[1.18] font-medium tracking-[-0.02em] text-balance">{feature.title}</h2>
            <p className="mt-5 text-[16px] leading-[1.45] text-faint">{feature.body}</p>
            <ol className="mt-10 lg:mt-auto">
              {feature.steps.map((s, i) => {
                const open = i === step
                return (
                  <li key={s.title} className="relative border-t border-line">
                    {open ? (
                      <motion.span
                        key={`${step}-${paused}`}
                        className="absolute -top-px left-0 h-px w-full origin-left bg-iris"
                        initial={{ scaleX: still ? 1 : 0 }}
                        animate={{ scaleX: 1 }}
                        transition={{ duration: still ? 0 : cycleSeconds, ease: "linear" }}
                      />
                    ) : null}
                    <button type="button" onClick={() => setStep(i)} aria-expanded={open} className="w-full py-4 text-left">
                      <span className={cn("block text-[16px] font-medium tracking-tight transition-colors duration-300", open ? "text-text" : "text-ghost hover:text-faint")}>{s.title}</span>
                      <motion.span
                        initial={false}
                        animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                        transition={{ duration: 0.4, ease: [0.23, 1, 0.32, 1] }}
                        className="block overflow-hidden text-[14px] leading-[1.5] text-faint"
                      >
                        <span className="block max-w-[400px] pt-2.5">{s.body}</span>
                      </motion.span>
                    </button>
                  </li>
                )
              })}
            </ol>
          </div>

          <BorderBeam size="md" glowSize={1.5} duration={3.2} colorVariant="ocean" borderRadius={18} strength={1} brightness={1.6} active={!still} className="min-w-0">
          <div className="relative flex h-full min-h-[420px] items-center justify-center overflow-hidden rounded-panel border border-line bg-panel p-4 sm:p-8 lg:h-[630px]">
            <Glow tone={feature.tone} intensity={0.7} />
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                className="relative z-10 flex w-full justify-center"
                initial={{ opacity: 0, scale: 0.97, y: 8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.985 }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                {VISUALS[group][step]}
              </motion.div>
            </AnimatePresence>
          </div>
          </BorderBeam>
        </div>
      </Container>
    </section>
  )
}
