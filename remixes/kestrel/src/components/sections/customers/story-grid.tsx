import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { INDUSTRIES, STORIES, type Story } from "@/content/customers"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Filter = (typeof INDUSTRIES)[number]

/** One story as a card: photo, company, the result, and a way into the full read. */
export function StoryCard({ story, onRead }: { story: Story; onRead: () => void }) {
  return (
    <button
      type="button"
      onClick={onRead}
      className="group flex h-full w-full flex-col overflow-hidden rounded-(--radius-card) bg-raised text-left shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-swap) ease-(--ease-out-strong) hover:-translate-y-0.5 hover:shadow-(--shadow-float) active:scale-[0.99]"
    >
      <span className="relative block aspect-[16/10] overflow-hidden bg-panel">
        <img
          src={pexels(story.photo, 720, 450)}
          alt={`The ${story.company} team`}
          loading="lazy"
          className="size-full object-cover transition-transform duration-[700ms] ease-(--ease-out-strong) group-hover:scale-[1.04]"
        />
        <span className="absolute top-3 left-3 rounded-full bg-raised/95 px-2 py-0.5 text-[12px] text-ink-2 shadow-(--shadow-xs)">{story.industry}</span>
      </span>
      <span className="flex flex-1 flex-col p-5">
        <span className="text-[18px] font-semibold tracking-[-0.04em]">{story.company}</span>
        <span className="mt-2 text-[16px] leading-snug text-ink-2">{story.headline}</span>
        <span className="mt-5 flex gap-6 border-t border-line pt-4">
          {story.metrics.map((m) => (
            <span key={m.label} className="min-w-0">
              <span className="block text-[20px] font-medium tracking-[-0.03em] tabular-nums">{m.value}</span>
              <span className="block text-[12.5px] leading-snug text-ink-3">{m.label}</span>
            </span>
          ))}
        </span>
        <span className="mt-auto inline-flex items-center gap-1.5 pt-5 text-[14px] font-medium">
          Read story
          <ArrowRight className="size-4 transition-transform duration-(--duration-hover) group-hover:translate-x-0.5" />
        </span>
      </span>
    </button>
  )
}

/**
 * Every story, filterable by industry. The chip pill slides to the choice
 * and the cards re-flow into place rather than jumping.
 */
export function StoryGrid({ onRead }: { onRead: (story: Story) => void }) {
  const [filter, setFilter] = useState<Filter>("All")
  const reduced = useReducedMotion()
  const shown = STORIES.filter((s) => filter === "All" || s.industry === filter)
  const count = (f: Filter) => (f === "All" ? STORIES.length : STORIES.filter((s) => s.industry === f).length)

  return (
    <section className="py-(--spacing-section)">
      <Container>
        <SectionHeading title="Find a team like yours." continuation="Then steal their setup." />
        <div role="tablist" aria-label="Filter by industry" className="mt-8 -mx-4 flex gap-1 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:px-0">
          {INDUSTRIES.map((f) => (
            <button
              key={f}
              type="button"
              role="tab"
              aria-selected={filter === f}
              onClick={() => setFilter(f)}
              className={cn("relative inline-flex min-h-11 shrink-0 items-center gap-1.5 rounded-full px-4 text-[15px] transition-colors duration-(--duration-hover)", filter === f ? "text-page" : "text-ink-2 hover:text-ink")}
            >
              {filter === f && (
                <motion.span layoutId="industry-pill" className="absolute inset-0 rounded-full bg-ink" transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.12 }} />
              )}
              {filter !== f && <span aria-hidden className="absolute inset-0 rounded-full bg-panel" />}
              <span className="relative">{f}</span>
              <span className={cn("relative text-[12px] tabular-nums", filter === f ? "text-night-muted" : "text-ink-3")}>{count(f)}</span>
            </button>
          ))}
        </div>
        <motion.ul layout={!reduced} className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((story) => (
              <motion.li
                key={story.id}
                layout={!reduced}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
              >
                <StoryCard story={story} onRead={() => onRead(story)} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      </Container>
    </section>
  )
}
