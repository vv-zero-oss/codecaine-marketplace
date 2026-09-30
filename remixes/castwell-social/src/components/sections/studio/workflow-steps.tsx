import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

export type Step = { title: string; body: string; tone: string }

/** A numbered, left-to-right process between hairlines. */
export function WorkflowSteps({
  id,
  eyebrow,
  title,
  description,
  steps,
}: {
  id?: string
  eyebrow: string
  title: string
  description?: string
  steps: Step[]
}) {
  return (
    <Section id={id}>
      <Container>
        <SectionHeading eyebrow={eyebrow} title={title} description={description} />
        <ol className={cn("mt-12 grid border-t border-l border-line md:mt-16 sm:grid-cols-2", steps.length === 5 ? "lg:grid-cols-5" : "lg:grid-cols-4")}>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 0.06} className="flex flex-col gap-4 border-r border-b border-line p-6 md:p-7">
              <span className={cn("grid size-8 place-items-center text-[11px] font-medium text-ink", s.tone)}>0{i + 1}</span>
              <h3 className="mt-4 font-serif text-[1.5rem] leading-tight font-light text-ink">{s.title}</h3>
              <p className="text-[14px] leading-relaxed text-ink-soft">{s.body}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
