import { ArrowRight } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The closing line of every page: a serif sentence on the left, and on the
 * right the button set into a cluster of black blocks.
 */
export function CtaBand({
  title = "Move from posting every day to growing the brand.",
  cta = "Start free",
  href = "/pricing",
}: {
  title?: string
  cta?: string
  href?: string
}) {
  return (
    <section className="relative overflow-hidden border-t border-line bg-page">
      <Container className="grid items-center gap-10 py-16 md:grid-cols-[1fr_auto] md:py-24">
        <Reveal>
          <h2 className="max-w-xl font-serif text-heading font-light text-balance text-ink md:text-[2.5rem] md:leading-[1.1]">
            {title}
          </h2>
        </Reveal>
        <BlockCluster cta={cta} href={href} />
      </Container>
    </section>
  )
}

/** Black blocks stacked in steps around the call to action. */
function BlockCluster({ cta, href }: { cta: string; href: string }) {
  return (
    <div className="relative h-[168px] w-full max-w-[520px] justify-self-end md:w-[520px]">
      <span aria-hidden className="absolute top-0 right-[18%] h-10 w-[30%] bg-ink" />
      <span aria-hidden className="absolute top-10 right-0 h-10 w-[46%] bg-ink" />
      <span aria-hidden className="absolute top-[120px] right-0 h-12 w-[64%] bg-ink" />
      <span aria-hidden className="absolute top-[120px] left-[4%] size-12 bg-ink" />
      <span aria-hidden className="absolute top-20 right-[10%] h-10 w-[12%] bg-ink" />
      <ButtonLink href={href} className="absolute top-20 left-[18%] z-10 md:h-10" size="sm">
        {cta} <ArrowRight />
      </ButtonLink>
    </div>
  )
}
