import { CornerLabels } from "@/components/blocks/corner-label"
import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import { ScrubText } from "@/components/motion/scrub-text"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import type { PhotoName } from "@/lib/photos"
import { cn } from "@/lib/utils"

/** A photograph with a tiny label pinned to its lower corner. */
export function LabelledPhoto({ name, label, className }: { name: PhotoName; label: string; className?: string }) {
  return (
    <figure className={cn("relative", className)}>
      <Photo name={name} className="size-full shadow-(--shadow-photo)" />
      <figcaption className="absolute bottom-4 left-4 rounded-full bg-dusk/55 px-2.5 py-1 text-micro text-dusk-fg backdrop-blur-sm">{label}</figcaption>
    </figure>
  )
}

/**
 * The machine is made by people: a hangar, a wiring bench, a pair of hands
 * on a motor, and a paragraph on certification that inks in as it is read.
 */
export function BuiltByPeople({
  title = "Built slowly, by people who will fly in it.",
  text = "Before anyone buys a seat, the aircraft has to satisfy the same regulator that certifies airliners. Every motor, battery cell and line of flight code is tested, written down and tested again — thousands of flights with nobody aboard, then hundreds with our own engineers in the back. We would rather be late than be first.",
}: {
  title?: string
  text?: string
}) {
  return (
    <section data-header-tone="dark" className="bg-page py-(--spacing-section)">
      <Container>
        <CornerLabels left="Built by people" right="Certification, the long way" className="text-ink-3" />
        <Reveal>
          <h2 className="type-head mt-10 max-w-[16ch] text-display text-balance">{title}</h2>
        </Reveal>
        <div className="mt-12 grid gap-4 md:mt-16 md:grid-cols-[minmax(0,1.6fr)_minmax(0,1fr)] md:gap-5">
          <Reveal>
            <LabelledPhoto name="hangar" label="Final assembly" className="aspect-[4/3] md:aspect-auto md:h-full" />
          </Reveal>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-1 md:gap-5">
            <Reveal delay={0.08}>
              <LabelledPhoto name="engineer" label="Power systems" className="aspect-[3/4] md:aspect-[4/3]" />
            </Reveal>
            <Reveal delay={0.16}>
              <LabelledPhoto name="motor-hands" label="Motor bench" className="aspect-[3/4] md:aspect-[4/3]" />
            </Reveal>
          </div>
        </div>
        <div className="mt-16 grid gap-8 md:mt-24 md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)]">
          <p className="text-micro text-ink-3">Why it takes years</p>
          <div className="flex flex-col items-start gap-8">
            <ScrubText text={text} className="type-head max-w-[34ch] text-h3" />
            <ButtonLink href="/routes" variant="link" className="link-line text-body text-ink">
              Meet the team behind it
            </ButtonLink>
          </div>
        </div>
      </Container>
    </section>
  )
}
