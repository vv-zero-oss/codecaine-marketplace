import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { STEPS } from "@/content"

/** One step: its number in mono, a hairline, then what happens. */
export function Step({ n = "01", title = "", body = "" }: { n?: string; title?: string; body?: string }) {
  return (
    <div className="flex flex-col gap-4 border-t border-ink pt-6">
      <p className="type-display text-[56px] text-coral">{n}</p>
      <h3 className="type-caps text-[22px] leading-[1.05] text-ink">{title}</h3>
      <p className="max-w-[340px] text-[15.5px] leading-[1.55] text-ink-muted">{body}</p>
    </div>
  )
}

/** Getting started, in three steps. */
export function Steps() {
  return (
    <section id="how-it-works" className="py-section">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={STEPS.eyebrow} title={STEPS.title} />
          <ButtonLink href="#start" variant="outline">Start your application</ButtonLink>
        </Reveal>
        <div className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {STEPS.items.map((s, i) => (
            <Reveal key={s.n} delay={i * 0.06}>
              <Step {...s} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
