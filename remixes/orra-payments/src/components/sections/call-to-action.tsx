import { useContactSales } from "@/components/contact-sales"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SurfaceCard } from "@/components/ui/surface-card"
import { CTA } from "@/content"

/** The ask: start now, or talk to us — with the price promise beside it. */
export function CallToAction() {
  const contact = useContactSales()
  return (
    <section id="pricing" className="scroll-mt-20 pt-24 sm:pt-32">
      <Container>
        <Reveal>
          <SurfaceCard
            id="signup"
            className="grid scroll-mt-24 gap-10 p-6 py-12 sm:p-10 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"
          >
            <div>
              <h2 className="max-w-[680px] text-[clamp(2rem,1.45rem+2.1vw,3.4rem)] leading-[1.12] tracking-[-0.035em] text-balance">
                {CTA.title}
              </h2>
              <div className="mt-10 flex flex-wrap items-center gap-6">
                <ButtonLink href="#signup" size="lg">
                  {CTA.primary}
                </ButtonLink>
                <ArrowLink
                  href="#contact"
                  onClick={(event) => {
                    event.preventDefault()
                    contact()
                  }}
                >
                  {CTA.secondary}
                </ArrowLink>
              </div>
            </div>
            <div className="border-l border-line-strong pl-3.5 lg:mt-3">
              <h3 className="text-xl tracking-[-0.02em]">{CTA.aside.title}</h3>
              <p className="mt-1.5 text-[13px] text-ink-3">{CTA.aside.body}</p>
              <ArrowLink href="#pricing" tone="ink" className="mt-5 text-[15px] font-normal sm:text-base">
                {CTA.aside.link}
              </ArrowLink>
            </div>
          </SurfaceCard>
        </Reveal>
      </Container>
    </section>
  )
}
