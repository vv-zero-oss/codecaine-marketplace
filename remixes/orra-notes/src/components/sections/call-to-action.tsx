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
    <section id="pricing" className="scroll-mt-24 pt-20 sm:pt-28">
      <Container>
        <Reveal>
          <SurfaceCard
            id="signup"
            size="large"
            className="grid scroll-mt-24 gap-10 p-6 py-12 sm:p-12 sm:py-20 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-start"
          >
            {/* The violet wash — a single pulse of colour along the top edge. */}
            <div aria-hidden className="absolute inset-x-0 top-0 h-px" style={{ background: "var(--gradient-wash)" }} />
            <div>
              <h2 className="max-w-[680px] font-heading text-heading-lg font-medium text-balance text-bone">
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
            <div className="border-l border-hairline-strong pl-4 lg:mt-2">
              <h3 className="font-heading text-heading-sm font-medium text-bone">{CTA.aside.title}</h3>
              <p className="mt-1.5 text-caption text-mist">{CTA.aside.body}</p>
              <ArrowLink href="#pricing" className="mt-5">
                {CTA.aside.link}
              </ArrowLink>
            </div>
          </SurfaceCard>
        </Reveal>
      </Container>
    </section>
  )
}
