import { useEffect, useRef, useState, type ReactNode } from "react"
import { motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { AgentRun, DealSuggestion } from "@/components/mockups/agent-ui"
import { AutoLog, CompaniesTable, EnrichmentRadar, IntentScore, PromptList } from "@/components/mockups/capture"
import { Fit } from "@/components/mockups/kit"
import {
  AnalystCard,
  HealthBars,
  LineChart,
  PipelineBoard,
  RecordStack,
  RiskList,
  SequenceSteps,
  SignalsFeed,
  WorkflowCanvas,
} from "@/components/mockups/pipeline"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { PLATFORM } from "@/content/home"
import { EASE } from "@/lib/motion"
import { cn } from "@/lib/utils"

type ChapterId = (typeof PLATFORM.chapters)[number]["id"]

/** Each chapter's large panel and its two smaller pictures. */
const VISUALS: Record<ChapterId, { panel: ReactNode; subs: [ReactNode, ReactNode] }> = {
  capture: {
    panel: <Fit width={1000}><CompaniesTable /></Fit>,
    subs: [<Fit width={400}><AutoLog /></Fit>, <Fit width={400}><EnrichmentRadar /></Fit>],
  },
  qualify: {
    panel: <div className="mx-auto max-w-[520px]"><Fit width={520}><PromptList /></Fit></div>,
    subs: [<Fit width={400}><IntentScore /></Fit>, <div className="flex justify-center"><DealSuggestion /></div>],
  },
  engage: {
    panel: <Fit width={1120}><WorkflowCanvas /></Fit>,
    subs: [<div className="mx-auto max-w-[400px]"><AgentRun /></div>, <Fit width={400}><SequenceSteps /></Fit>],
  },
  forecast: {
    panel: <Fit width={1160}><PipelineBoard /></Fit>,
    subs: [<Fit width={440}><AnalystCard /></Fit>, <Fit width={560}><LineChart /></Fit>],
  },
  retain: {
    panel: (
      <Fit width={1080}>
        <div className="flex items-start gap-6">
          <HealthBars />
          <RiskList />
        </div>
      </Fit>
    ),
    subs: [<Fit width={380}><SignalsFeed /></Fit>, <Fit width={380}><RecordStack /></Fit>],
  },
}

/** The chapter list: sticky beside the chapters, a hairline marker on the one in view. */
function ChapterNav({ active, onPick }: { active: ChapterId; onPick: (id: ChapterId) => void }) {
  return (
    <>
      <nav aria-label="Platform chapters" className="sticky top-[140px] hidden flex-col gap-1 lg:flex">
        {PLATFORM.chapters.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            className={cn(
              "relative py-1 text-left text-base font-medium transition-colors duration-[320ms] ease-out-cubic",
              active === c.id ? "text-ink" : "text-ink-faint hover:text-ink-2",
            )}
          >
            {active === c.id && (
              <motion.span
                layoutId="chapter-marker"
                className="absolute top-1 bottom-1 -left-[25px] w-0.5 bg-accent"
                transition={{ duration: 0.32, ease: EASE.outCubic }}
              />
            )}
            {c.label}
          </button>
        ))}
      </nav>
      <nav
        aria-label="Platform chapters"
        className="sticky top-[60px] z-20 -mx-5 flex overflow-x-auto border-y border-line-strong bg-canvas/95 backdrop-blur-md sm:-mx-8 lg:hidden [&::-webkit-scrollbar]:hidden"
      >
        {PLATFORM.chapters.map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => onPick(c.id)}
            className={cn(
              "relative shrink-0 border-r border-line-strong px-5 py-4 text-sm whitespace-nowrap transition-colors",
              active === c.id ? "text-ink" : "text-ink-3",
            )}
          >
            {c.label}
            {active === c.id && <motion.span layoutId="chapter-marker-m" className="absolute inset-x-0 bottom-0 h-0.5 bg-accent" />}
          </button>
        ))}
      </nav>
    </>
  )
}

/**
 * Platform: the whole sale in five chapters. A sticky list on the left marks
 * the chapter in view; each chapter says its one thing, shows it in a large
 * panel, then two smaller ways it helps.
 */
export function Platform() {
  const [active, setActive] = useState<ChapterId>("capture")
  const refs = useRef<Record<string, HTMLElement | null>>({})

  const pick = (id: ChapterId) => {
    setActive(id)
    refs.current[id]?.scrollIntoView({ behavior: "smooth", block: "start" })
  }
  useCanvasAction("Next chapter", () => {
    const ids = PLATFORM.chapters.map((c) => c.id)
    pick(ids[(ids.indexOf(active) + 1) % ids.length])
  }, { group: "Platform" })

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const hit = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (hit) setActive(hit.target.id as ChapterId)
      },
      { rootMargin: "-35% 0px -55% 0px" },
    )
    Object.values(refs.current).forEach((el) => el && io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <Section id="platform" tone="canvas">
      <Container className="pt-[var(--spacing-section)] pb-10">
        <Reveal className="flex max-w-[640px] flex-col items-start gap-6">
          <Eyebrow>{PLATFORM.eyebrow}</Eyebrow>
          <Heading lead={PLATFORM.lead} rest={PLATFORM.rest} />
        </Reveal>
      </Container>

      <Container className="grid grid-cols-1 gap-x-10 pb-[var(--spacing-section)] lg:grid-cols-[240px_1fr] [&>*]:min-w-0">
        <div>
          <ChapterNav active={active} onPick={pick} />
        </div>
        <div className="flex flex-col">
          {PLATFORM.chapters.map((c) => {
            const v = VISUALS[c.id]
            return (
              <article
                key={c.id}
                id={c.id}
                ref={(el) => {
                  refs.current[c.id] = el
                }}
                className="scroll-mt-[140px] border-b border-line-strong py-12 last:border-b-0 md:py-16"
              >
                <Reveal className="max-w-[560px]">
                  <Heading as="h3" size="statement" lead={c.lead} rest={c.rest} />
                </Reveal>
                <Reveal className="texture-dots mt-8 overflow-hidden rounded-panel border border-line-strong bg-page p-4 sm:p-8 md:mt-10 md:p-10">
                  {v.panel}
                </Reveal>
                <div className="mt-8 grid grid-cols-1 [&>*]:min-w-0 gap-8 md:grid-cols-2 md:gap-6">
                  {c.subs.map((s, i) => (
                    <Reveal key={s.title} delay={i * 0.08} className="flex flex-col">
                      <h4 className="text-h4 font-medium text-ink">{s.title}</h4>
                      <p className="mt-1 max-w-[38ch] text-sm text-ink-2 md:text-base">{s.body}</p>
                      <div className="mt-6 flex min-h-[200px] items-center justify-center overflow-hidden rounded-panel border border-line-strong bg-page p-5 md:p-8">
                        <div className="w-full">{v.subs[i]}</div>
                      </div>
                    </Reveal>
                  ))}
                </div>
              </article>
            )
          })}
        </div>
      </Container>
    </Section>
  )
}
