import { CardRail } from "@/components/blocks/card-rail"
import { workloads } from "@/content"

/** What teams run on it: the proof, in pictures. */
export function Workloads() {
  return (
    <section id="work" aria-label="What teams run on Cirrus" className="pb-[calc(var(--spacing-section)/2)]">
      <CardRail name="Workloads" cards={workloads} />
    </section>
  )
}
