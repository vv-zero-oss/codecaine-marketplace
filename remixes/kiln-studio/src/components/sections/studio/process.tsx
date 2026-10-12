import { Flame, Hammer, PenTool, Sparkle } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-label"
import { StackCards } from "@/components/motion/stack-cards"
import { PROCESS } from "@/data/studio"

const ICONS = [Sparkle, PenTool, Hammer, Flame]

/** One step of the process, as a card that stacks. */
export function ProcessCard({ index, step, weeks, title, body }: { index: number; step: string; weeks: string; title: string; body: string }) {
  const Icon = ICONS[index % ICONS.length]
  return (
    <article className="grid min-h-[min(62svh,520px)] gap-8 rounded-(--radius-panel) bg-panel p-[clamp(24px,3.4vw,56px)] shadow-(--shadow-float) [box-shadow:var(--shadow-float),var(--shadow-inset-top)] md:grid-cols-[1fr_1.2fr]">
      <div className="flex flex-col justify-between gap-10">
        <p className="type-label flex items-center gap-3 text-ink-3">
          <span className="grid size-9 place-items-center rounded-full bg-panel-2 text-ember">
            <Icon className="size-4" strokeWidth={1.75} />
          </span>
          {weeks}
        </p>
        <p className="type-head text-mega text-ink">
          <span className="text-ink-5 tabular-nums">{String(index + 1).padStart(2, "0")} </span>
          {step}
        </p>
      </div>
      <div className="flex flex-col justify-end gap-5">
        <h3 className="type-head text-h3 text-ink">{title}</h3>
        <p className="max-w-[46ch] text-lead text-ink-3">{body}</p>
      </div>
    </article>
  )
}

/** How a project goes, as four cards that pin and stack as you scroll. */
export function Process() {
  return (
    <section aria-label="How we work" className="px-(--spacing-gutter) py-(--spacing-section)">
      <SectionHeading index="02" label="How we work" title="Four firings." continuation="Every project goes through the kiln the same way." />
      <StackCards className="mt-16" offset={110} gap={64}>
        {PROCESS.map((p, i) => (
          <ProcessCard key={p.step} index={i} {...p} />
        ))}
      </StackCards>
    </section>
  )
}
