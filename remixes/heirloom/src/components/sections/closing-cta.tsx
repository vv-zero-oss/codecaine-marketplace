import { SectionIntro } from "@/components/sections/section-intro"
import { Container } from "@/components/ui/container"

/** The quiet sign-off every page ends on before the footer: a heading, a
 *  line and one button. */
export function ClosingCta({
  id,
  before,
  accent,
  after,
  body,
  cta,
  href = "/contact",
}: {
  id?: string
  before: string
  accent: string
  after?: string
  body?: string
  cta: string
  href?: string
}) {
  return (
    <section id={id} className="border-t border-line bg-ink py-24 sm:py-[18vh]">
      <Container>
        <SectionIntro before={before} accent={accent} after={after} body={body} cta={cta} href={href} />
      </Container>
    </section>
  )
}
