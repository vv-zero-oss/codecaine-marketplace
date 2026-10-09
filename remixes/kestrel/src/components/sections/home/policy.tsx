import { useState } from "react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { DEFAULT_RULES, PolicyDocument, SpendFeed, type Rules } from "@/components/mock/policy-agent"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { POLICY_QUOTE } from "@/content/home-story"

/**
 * The policy agent: write the rule once, and every transaction is checked
 * against it. The document on the left is live — flip a rule or change its
 * number and the spend on the right is re-judged.
 */
export function Policy() {
  const [rules, setRules] = useState<Rules>(DEFAULT_RULES)

  return (
    <section id="policy" aria-label="Policy agent" className="py-(--spacing-section)">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[1fr_380px] lg:items-end">
          <SectionHeading
            title="A policy agent that has read the handbook."
            continuation="And remembers every line of it."
            body="Write your rules in plain words. Kestrel checks every swipe, booking and invoice against them before anyone has to — try changing one."
          />
          <Reveal delay={0.1} className="rounded-(--radius-card) bg-panel p-5">
            <p className="text-[16px] leading-relaxed text-ink">“{POLICY_QUOTE.quote}”</p>
            <div className="mt-4 flex items-center gap-3">
              <img src={POLICY_QUOTE.avatar} alt="" className="size-9 rounded-full object-cover" />
              <span>
                <span className="block text-[14px] text-ink">{POLICY_QUOTE.person}</span>
                <span className="block text-[13px] text-ink-3">{POLICY_QUOTE.role}</span>
              </span>
            </div>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-[7fr_5fr] lg:items-start">
          <Reveal>
            <PolicyDocument rules={rules} onChange={setRules} />
          </Reveal>
          <Reveal delay={0.08}>
            <SpendFeed rules={rules} />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
