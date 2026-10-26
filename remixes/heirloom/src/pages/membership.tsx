import { Reveal } from "@/components/motion/reveal"
import { ClosingCta } from "@/components/sections/closing-cta"
import { Faq } from "@/components/sections/faq"
import { PageHero } from "@/components/sections/page-hero"
import { SectionIntro } from "@/components/sections/section-intro"
import { SectionLabel } from "@/components/sections/section-label"
import { Steps } from "@/components/sections/steps"
import { TierCard } from "@/components/sections/tier-card"
import { Container } from "@/components/ui/container"
import { BENEFITS, FAQ, PAGE_HEROES, TIERS } from "@/content"

const APPLY = [
  { title: "An introduction", body: "Most members are introduced by another. If no one comes to mind, write to us and say why you'd like to join." },
  { title: "Dinner as a guest", body: "Come to one of our tables before deciding. It is the best way to know whether this circle is yours." },
  { title: "A decision in writing", body: "A partner writes within a week of the dinner. Membership begins the first of the following month." },
]

export function Benefit({ index, title, body }: { index: number; title: string; body: string }) {
  return (
    <div className="flex flex-col gap-3 border-t border-line pt-6">
      <span className="font-mono text-[11px] text-fg-subtle tabular-nums">{String(index + 1).padStart(2, "0")}</span>
      <h3 className="text-xl font-medium tracking-[-0.025em]">{title}</h3>
      <p className="max-w-sm text-sm leading-relaxed text-fg-muted">{body}</p>
    </div>
  )
}

export function MembershipPage() {
  return (
    <>
      <PageHero
        eyebrow="Membership"
        before="A table worth"
        accent="sitting"
        after="at."
        body="Athletes, artists and entrepreneurs investing side by side in the founders we back — and in each other."
        {...PAGE_HEROES.membership}
      />
      <section className="bg-ink py-20 sm:py-[14vh]">
        <Container>
          <SectionIntro
            before="What members"
            accent="actually"
            after="get."
            body="Membership is access, advice and company: the same rooms our partners sit in, and an office that looks after the rest."
          />
          <div className="mx-auto mt-14 grid max-w-4xl gap-x-10 gap-y-10 sm:mt-20 sm:grid-cols-2">
            {BENEFITS.map((b, i) => (
              <Reveal key={b.title} delay={(i % 2) * 0.1}>
                <Benefit index={i} {...b} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section id="tiers" className="border-t border-line bg-ink py-20 sm:py-[14vh]">
        <Container>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <SectionLabel>Tiers</SectionLabel>
              <h2 className="mt-4 text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">Three ways to join.</h2>
            </div>
            <p className="max-w-sm text-sm text-fg-muted">Billed yearly. No fees on co-investments until your capital is returned.</p>
          </div>
          <div className="mt-12 grid gap-4 lg:grid-cols-3">
            {TIERS.map((tier, i) => (
              <Reveal key={tier.name} delay={i * 0.1} className="h-full">
                <TierCard {...tier} />
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-t border-line bg-ink py-20 sm:py-[14vh]">
        <Container>
          <SectionLabel>Joining</SectionLabel>
          <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">
            Three weeks, one dinner, no forms.
          </h2>
          <Steps steps={APPLY} className="mt-12" />
        </Container>
      </section>
      <Faq items={FAQ} />
      <ClosingCta
        before="Ask for a seat at the"
        accent="next"
        after="table."
        body="Tell us a little about yourself. A partner will reply, and invite you to dinner as our guest."
        cta="Apply for membership"
      />
    </>
  )
}
