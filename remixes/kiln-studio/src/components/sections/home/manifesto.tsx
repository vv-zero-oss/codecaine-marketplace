import { ArrowRight } from "lucide-react"

import { SectionLabel } from "@/components/blocks/section-label"
import { ScrollWords } from "@/components/motion/scroll-words"
import { ButtonLink } from "@/components/ui/button"

/**
 * After the wall, the sentence it was all for: what Kiln believes, lit word
 * by word at the pace you scroll, set as large as the page can hold it.
 */
export function Manifesto({
  text = "We're designers, engineers and makers who think the best ideas are the ones you can touch. So we build them early, fire them properly, and put them in front of real people.",
}: {
  text?: string
}) {
  return (
    <section aria-label="The studio" className="px-(--spacing-gutter) pt-(--spacing-section) pb-[calc(var(--spacing-section)*0.6)]">
      <SectionLabel index="01">The studio</SectionLabel>
      <ScrollWords text={text} className="type-head mt-10 max-w-[22ch] text-display text-ink" />
      <div className="mt-14 grid gap-8 md:grid-cols-[1fr_1fr] md:items-end">
        <p className="max-w-[44ch] text-lead text-ink-3">
          Forty-six people in Lisbon and Montréal. One room per city, where strategy, design, engineering, 3D and production sit at the same tables.
        </p>
        <ButtonLink href="/studio" variant="outline" size="lg" className="w-fit md:justify-self-end">
          How we work <ArrowRight />
        </ButtonLink>
      </div>
    </section>
  )
}
