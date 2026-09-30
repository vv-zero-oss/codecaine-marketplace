import { Fit } from "@/components/mockups/kit"
import { RecordPage } from "@/components/mockups/record-page"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { Heading } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { RECORD } from "@/content/home"

/** The result of all that capture: a record that fills itself in. */
export function Record() {
  return (
    <Section id="records">
      <Container className="flex flex-col items-center py-[var(--spacing-section)] text-center">
        <Reveal className="flex flex-col items-center gap-6">
          <Eyebrow>{RECORD.eyebrow}</Eyebrow>
          <Heading lead={RECORD.lead} rest={RECORD.rest} className="max-w-[18ch]" />
          <ButtonLink href="/agents" size="sm" arrow>
            {RECORD.cta}
          </ButtonLink>
        </Reveal>
        <div className="mt-14 w-full max-w-[1120px] text-left md:mt-16">
          <Fit width={1120}>
            <RecordPage />
          </Fit>
        </div>
      </Container>
    </Section>
  )
}
