import { ArrowRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { TemplateCard } from "@/components/blocks/template-card"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { TEMPLATES } from "@/content/templates"
import { navigate } from "@/lib/router"

/**
 * After "how", the shortcut: three maps somebody already made, to start
 * from instead of a blank page. Each opens in the studio.
 */
export function TemplatesPreview() {
  const picks = TEMPLATES.slice(0, 3)
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-[1000px]">
        <SectionHeading
          title="Start with a template."
          lead="Cairn makes maps of places — not charts of data. Borrow one of these and make it yours in a minute."
        />
        <div className="mt-12 grid gap-x-8 gap-y-12 sm:grid-cols-2 md:mt-14 lg:grid-cols-3">
          {picks.map((t, i) => (
            <Reveal key={t.id} delay={i * 0.07}>
              <TemplateCard template={t} onOpen={() => navigate(`/studio?template=${t.id}`)} />
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <ButtonLink href="/templates" variant="link" className="text-[15.5px]">
            See all {TEMPLATES.length} templates <ArrowRight />
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
