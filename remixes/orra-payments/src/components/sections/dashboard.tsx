import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"

import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { AssistantPanel, InsightsPanel, TeamPanel } from "@/components/mockups/dashboard-window"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { DASHBOARD } from "@/content"
import { DURATION, EASE } from "@/lib/easing"
import { cn } from "@/lib/utils"
import { PHOTOS, pexels } from "@/photos"

const PANELS = { team: TeamPanel, insights: InsightsPanel, assistant: AssistantPanel }

/** The dashboard: three things it does, each a tab that shows itself on the right. */
export function Dashboard() {
  return (
    <section id="dashboard" className="scroll-mt-20 pt-24 sm:pt-32">
      <Container>
        <FeatureTabs />
      </Container>
    </section>
  )
}

/**
 * Tabs that advance on their own: the active one's orange underline fills
 * over `interval` seconds, then the next takes over. The fill is a CSS
 * animation, so the editor's Motion switch pauses the rotation too.
 */
export function FeatureTabs({ interval = 7, autoplay = true }: { interval?: number; autoplay?: boolean }) {
  const [active, setActive] = useState(2)
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const running = autoplay && !reduce && !designing
  const tab = DASHBOARD.tabs[active]
  const Panel = PANELS[tab.id as keyof typeof PANELS]

  return (
    <div className="grid gap-10 lg:grid-cols-[minmax(0,480px)_minmax(0,1fr)] lg:gap-[clamp(3rem,10vw,10rem)]">
      <div className="flex flex-col">
        <SectionHeading
          align="left"
          size="title"
          eyebrow={DASHBOARD.eyebrow}
          title={<span className="text-[clamp(1.75rem,1.3rem+1.6vw,2.4rem)] leading-[1.15]">{DASHBOARD.title}</span>}
        />
        <p className="mt-3 max-w-[390px] text-lg leading-snug text-ink">{DASHBOARD.body}</p>
        <div role="tablist" aria-label="Dashboard features" className="mt-10 max-w-[370px] lg:mt-auto">
          {DASHBOARD.tabs.map((item, index) => (
            <TabRow
              key={item.id}
              item={item}
              selected={index === active}
              onSelect={() => setActive(index)}
              interval={interval}
              running={running}
              onDone={() => setActive((index + 1) % DASHBOARD.tabs.length)}
            />
          ))}
          {DASHBOARD.tabs.map((item, index) => (
            <TabAction key={item.id} label={item.label} on={index === active} select={() => setActive(index)} />
          ))}
        </div>
      </div>
      <Reveal>
        <div className="relative aspect-[4/5] overflow-hidden rounded-xl bg-espresso sm:aspect-[777/692]">
          <img src={pexels(PHOTOS.ember, 1600)} alt="" className="absolute inset-0 size-full object-cover" />
          {/* Warms the photo towards espresso, so the glow reads orange rather than yellow. */}
          <div aria-hidden className="absolute inset-0 bg-espresso/40 mix-blend-multiply" />
          <div className="absolute inset-x-4 inset-y-6 mx-auto max-w-[412px] sm:inset-y-[10%]">
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={tab.id}
                className="h-full"
                initial={{ opacity: 0, transform: reduce ? "none" : "translateY(10px) scale(0.985)" }}
                animate={{ opacity: 1, transform: "translateY(0px) scale(1)" }}
                exit={{ opacity: 0, transform: reduce ? "none" : "translateY(-6px) scale(0.99)" }}
                transition={{ duration: DURATION.base, ease: EASE.out }}
              >
                <Panel />
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Reveal>
    </div>
  )
}

function TabAction({ label, on, select }: { label: string; on: boolean; select: () => void }) {
  useCanvasAction(`Dashboard tab: ${label}`, select, { on, group: "Dashboard" })
  return null
}

export function TabRow({
  item,
  selected,
  onSelect,
  interval,
  running,
  onDone,
}: {
  item: (typeof DASHBOARD.tabs)[number]
  selected: boolean
  onSelect: () => void
  interval: number
  running: boolean
  onDone: () => void
}) {
  const badge = "badge" in item ? item.badge : undefined
  return (
    <div className="relative border-t border-line">
      <button
        type="button"
        role="tab"
        aria-selected={selected}
        onClick={onSelect}
        className={cn(
          "flex min-h-16 w-full items-center gap-2.5 text-left text-lg transition-colors duration-(--duration-fast)",
          selected ? "text-ink" : "text-ink hover:text-ink-2",
        )}
      >
        {item.label}
        {badge ? (
          <span className="rounded-full bg-honey-bg px-2.5 py-0.5 text-[13px] text-honey-ink">{badge}</span>
        ) : null}
      </button>
      <AnimatePresence initial={false}>
        {selected ? (
          <motion.p
            key="body"
            className="overflow-hidden text-base leading-[1.4] text-ink-2"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: DURATION.base, ease: EASE.out }}
          >
            <span className="block pb-6">{item.body}</span>
          </motion.p>
        ) : null}
      </AnimatePresence>
      {selected ? (
        <span aria-hidden className="absolute -top-px left-0 h-px w-full overflow-hidden">
          <span
            key={`${item.id}-${running}`}
            className="absolute inset-0 origin-left bg-ember"
            style={{
              animation: running ? `hero-progress ${interval}s linear forwards` : undefined,
              transform: running ? undefined : "scaleX(1)",
            }}
            onAnimationEnd={onDone}
          />
        </span>
      ) : null}
    </div>
  )
}
