import { AnimatePresence, motion, type MotionValue } from "motion/react"
import { useCanvasAction } from "@canvas/react"
import { useId, useRef, useState } from "react"

import { StickyScene, scrollToStep, useStep } from "@/components/motion/sticky-scene"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow, Lede, SectionTitle } from "@/components/ui/section-title"
import { EASE_OUT } from "@/lib/motion-tokens"
import { cn } from "@/lib/utils"

export type Tab = { id: string; label: string; body: string }

function TabAction({ label, group, active, go }: { label: string; group: string; active: boolean; go: () => void }) {
  useCanvasAction(label, () => go(), { on: active, group })
  return null
}

type StageProps = {
  p: MotionValue<number>
  pinned: boolean
  dark: boolean
  eyebrow: string
  title: string
  accent?: string
  body: string
  cta: string
  heightVh: number
  tabs: Tab[]
  panels: React.ComponentType[]
  sceneRef: React.RefObject<HTMLDivElement | null>
}

function TabsStage({ p, pinned, dark, eyebrow, title, accent, body, cta, heightVh, tabs, panels, sceneRef }: StageProps) {
  const uid = useId()
  const [manual, setManual] = useState(0)
  const scrolled = useStep(p, tabs.length)
  const index = pinned ? scrolled : manual
  const Panel = panels[index]
  const go = (i: number) => {
    if (pinned) scrollToStep(sceneRef.current?.firstElementChild as HTMLElement | null, i, tabs.length, heightVh)
    else setManual(i)
  }
  return (
    <div data-canvas-ignore className={cn("relative flex-1 py-16 md:pt-[11vh]")}>
        <Container className="relative flex h-full flex-col">
          <div className="max-w-[34rem]">
            <Eyebrow className={dark ? "text-ink-inverse-2" : undefined}>{eyebrow}</Eyebrow>
            <SectionTitle className="mt-4 text-[clamp(2.2rem,4.6vw,3.4rem)]">
              {title} {accent && <em>{accent}</em>}
            </SectionTitle>
            <Lede className={cn("mt-4", dark && "text-ink-inverse-2")}>{body}</Lede>
            <ButtonLink href="#cta" variant={dark ? "inverse" : "soft"} size="lg" className="mt-6">{cta} <span aria-hidden>→</span></ButtonLink>
          </div>

          <div className="mt-10 grid gap-8 md:absolute md:inset-x-5 md:top-[34vh] md:mt-0 md:grid-cols-[minmax(0,19rem)_1fr] md:gap-0 md:px-8 lg:left-8">
            <div className="flex min-w-0 flex-col md:pt-[10vh]">
              <p className={cn("mb-3 max-w-[17rem] text-[13px] leading-snug", dark ? "text-ink-inverse-2" : "text-ink-2")}>
                <span className={cn("mb-1 block font-medium", dark ? "text-ink-inverse" : "text-ink")}>{tabs[index].label}</span>
                {tabs[index].body}
              </p>
              <div role="tablist" aria-label={eyebrow} className="flex gap-1 overflow-x-auto md:flex-col md:gap-0 md:overflow-visible">
                {tabs.map((t, i) => (
                  <button
                    key={t.id}
                    role="tab"
                    aria-selected={i === index}
                    onClick={() => go(i)}
                    className={cn(
                      "relative min-h-11 shrink-0 rounded-pill px-4 text-left text-[13px] transition-colors duration-(--duration-fast) md:min-h-12 md:rounded-none md:border-t md:px-0",
                      dark ? "md:border-line-inverse" : "md:border-line",
                      i === index ? (dark ? "bg-white/10 text-ink-inverse md:bg-transparent" : "bg-ink/[0.06] text-ink md:bg-transparent") : dark ? "text-ink-inverse-2 hover:text-ink-inverse" : "text-ink-2 hover:text-ink",
                    )}
                  >
                    {i === index && pinned && <motion.span layoutId={`${uid}-bar`} transition={{ duration: 0.4, ease: EASE_OUT }} className={cn("absolute -top-px left-0 hidden h-px w-7 md:block", dark ? "bg-ink-inverse" : "bg-ink")} />}
                    {t.label}
                  </button>
                ))}
              </div>
            </div>
            <div className="relative h-[22rem] min-w-0 md:h-[62vh] md:min-h-[26rem] md:translate-x-[3vw]" aria-live="polite">
              <AnimatePresence mode="popLayout" initial={false}>
                <motion.div
                  key={tabs[index].id}
                  initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.5, ease: EASE_OUT }}
                  className="absolute inset-0"
                >
                  <Panel />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
          {tabs.map((t, i) => <TabAction key={t.id} label={t.label} group={eyebrow} active={i === index} go={() => go(i)} />)}
        </Container>
    </div>
  )
}

/**
 * Pinned feature tabs. The heading and the tab list stay put while the page
 * scrolls; each `holdVh` of scroll advances to the next tab and its screen
 * swaps in. Click a tab to jump there. Below 900px it is plain tabs.
 * Why it exists: a long feature list is walked through at the visitor's pace
 * without a carousel to operate.
 */
export function StickyTabs({
  tone = "light",
  eyebrow,
  title,
  accent,
  body,
  cta = "Learn more",
  holdVh = 70,
  tabs,
  panels,
  id,
}: {
  tone?: "light" | "dark"
  eyebrow: string
  title: string
  accent?: string
  body: string
  cta?: string
  holdVh?: number
  tabs: Tab[]
  panels: React.ComponentType[]
  id?: string
}) {
  const sceneRef = useRef<HTMLDivElement>(null)
  const dark = tone === "dark"
  const heightVh = 100 + tabs.length * holdVh
  return (
    <section id={id} data-canvas-ignore className={cn(dark ? "bg-night text-ink-inverse" : "bg-paper text-ink")}>
      <div ref={sceneRef} data-canvas-ignore>
        <StickyScene heightVh={heightVh} stageClassName="flex flex-col">
          {(p, pinned) => <TabsStage {...{ p, pinned, dark, eyebrow, title, accent, body, cta, heightVh, tabs, panels, sceneRef }} />}
        </StickyScene>
      </div>
    </section>
  )
}
