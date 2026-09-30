import { ClosingCall } from "@/components/blocks/closing-call"
import { PageIntro } from "@/components/blocks/page-intro"
import { CountUp } from "@/components/motion/count-up"
import { GrowFrame } from "@/components/motion/grow-frame"
import { FadeUp } from "@/components/motion/reveal"
import { StackCards } from "@/components/motion/stack-cards"
import { Container } from "@/components/ui/container"
import { MixedTitle } from "@/components/ui/mixed-title"
import { SectionHeading } from "@/components/ui/section-heading"
import { atelier } from "@/content"

/** The atelier: five steps that stack as you read them, the numbers, and
 *  the workroom window opening to the whole screen. */
export function AtelierPage() {
  return (
    <>
      <PageIntro eyebrow={atelier.eyebrow} title={atelier.title} intro={atelier.intro} />
      <Container>
        <StackCards top={96}>
          {atelier.steps.map((step) => (
            <StepCard key={step.number} {...step} />
          ))}
        </StackCards>
      </Container>
      <Container className="py-section">
        <dl className="grid grid-cols-2 gap-y-14 border-t border-ink/15 pt-12 lg:grid-cols-4">
          {atelier.stats.map((stat, index) => (
            <FadeUp key={stat.label} delay={index * 0.08} className="flex flex-col gap-2">
              <dd className="font-display text-[clamp(64px,8vw,140px)] leading-[0.85] tracking-[-0.02em]">
                <CountUp value={stat.value} suffix={stat.suffix} />
              </dd>
              <dt className="font-serif text-[16px] text-ink-muted">{stat.label}</dt>
            </FadeUp>
          ))}
        </dl>
      </Container>
      <GrowFrame image={atelier.hands.src} alt={atelier.hands.alt} start={28} heading={<SectionHeading eyebrow="_open_ EVERY SATURDAY" title="_come and_ WATCH." size="md" />} />
      <ClosingCall title="See where your coat is made" body="The workroom is open to visitors on Saturday mornings." cta="Book _a_ VISIT" />
    </>
  )
}

/** One step of the process, as a card in the stack. */
export function StepCard({ number, name, title, body, image, alt }: { number: string; name: string; title: string; body: string; image: string; alt: string }) {
  return (
    <article className="grid min-h-[70svh] grid-rows-[auto_1fr] overflow-hidden bg-chip shadow-sheet md:grid-cols-[1fr_1.1fr] md:grid-rows-1">
      <div className="flex flex-col justify-between gap-10 p-6 sm:p-10 lg:p-14">
        <div className="flex items-baseline justify-between font-sans text-[13px] uppercase tracking-[0.06em] text-ink-muted">
          <span>{name}</span>
          <span className="tabular-nums">{number} / 05</span>
        </div>
        <div className="flex flex-col gap-5">
          <MixedTitle as="h2" text={title} className="text-[clamp(40px,5vw,88px)] leading-[0.9] tracking-[-0.015em]" />
          <p className="max-w-[40ch] font-serif text-[17px] leading-[1.6] text-ink-soft">{body}</p>
        </div>
      </div>
      <img src={image} alt={alt} loading="lazy" className="aspect-[4/3] size-full bg-paper-deep object-cover md:aspect-auto" />
    </article>
  )
}
