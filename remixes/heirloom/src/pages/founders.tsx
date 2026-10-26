import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { ClosingCta } from "@/components/sections/closing-cta"
import { PageHero } from "@/components/sections/page-hero"
import { Portfolio } from "@/components/sections/portfolio"
import { PullQuote } from "@/components/sections/pull-quote"
import { SectionIntro } from "@/components/sections/section-intro"
import { SectionLabel } from "@/components/sections/section-label"
import { Steps } from "@/components/sections/steps"
import { Container } from "@/components/ui/container"
import { FOUNDER_STEPS, PAGE_HEROES } from "@/content"

const TERMS = [
  { value: 250, prefix: "$", suffix: "k", label: "First cheque, at seed" },
  { value: 5, prefix: "$", suffix: "m", label: "Largest follow-on" },
  { value: 15, suffix: " yrs", label: "Longest we will hold" },
  { value: 7, suffix: " days", label: "From first call to answer" },
]

export function FoundersPage() {
  return (
    <>
      <PageHero
        eyebrow="For founders"
        before="Founders who"
        accent="bend"
        after="reality."
        body="We invest our own family's capital in a handful of companies a year, and stay for as long as the work takes."
        {...PAGE_HEROES.founders}
      />
      <section className="bg-ink pt-20 sm:pt-[14vh]">
        <Container>
          <SectionIntro
            before="Not a fund. A family that"
            accent="stays."
            body="No fund clock, no limited partners to please, no pressure to sell. Just patient capital and people who have built things themselves."
          />
          <div className="mx-auto mt-14 grid max-w-4xl grid-cols-2 gap-y-10 sm:mt-20 lg:grid-cols-4">
            {TERMS.map((t, i) => (
              <Reveal key={t.label} delay={i * 0.08}>
                <div className="border-l border-line px-4 py-2">
                  <CountUp value={t.value} prefix={t.prefix} suffix={t.suffix} className="block text-4xl font-light tracking-[-0.04em] tabular-nums" />
                  <p className="mt-2 text-[9px] tracking-[0.12em] text-fg-subtle uppercase">{t.label}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <Portfolio />
      <section className="border-t border-line bg-ink py-20 sm:py-[14vh]">
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <h2 className="mt-4 max-w-xl text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]">
            From a first call to the long middle.
          </h2>
          <Steps steps={FOUNDER_STEPS} className="mt-12" />
        </Container>
      </section>
      <section className="bg-ink pb-20 sm:pb-[12vh]">
        <Container>
          <PullQuote
            quote="They asked about our customers before they asked about our numbers. Nobody had done that."
            name="Marguerite Lowe"
            role="CEO, Ledgerline"
          />
        </Container>
      </section>
      <ClosingCta
        before="Building something that should"
        accent="outlast"
        after="you?"
        body="Write to a partner. No deck needed — a paragraph about the problem is enough to start."
        cta="Pitch a partner"
      />
    </>
  )
}
