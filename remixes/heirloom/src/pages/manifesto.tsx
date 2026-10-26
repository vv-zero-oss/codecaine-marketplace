import { BlurWords } from "@/components/motion/blur-words"
import { Reveal } from "@/components/motion/reveal"
import { ClosingCta } from "@/components/sections/closing-cta"
import { PageHero } from "@/components/sections/page-hero"
import { PhotoBand } from "@/components/sections/photo-band"
import { Principles, Signatories } from "@/components/sections/principles"
import { SectionLabel } from "@/components/sections/section-label"
import { Container } from "@/components/ui/container"
import { MANIFESTO_ASIDE, MANIFESTO_BAND, PAGE_HEROES, PRINCIPLES, SIGNATORIES } from "@/content"

export function ManifestoPage() {
  return (
    <>
      <PageHero
        eyebrow="Manifesto"
        before="Capital should"
        accent="outlive"
        after="its owner."
        body="Why a family that made its money building things decided to spend it helping others do the same."
        {...PAGE_HEROES.manifesto}
      />
      <section className="bg-ink py-20 sm:py-[14vh]">
        <Container className="grid gap-12 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] lg:items-end lg:gap-16">
          <div className="flex flex-col gap-8">
            <SectionLabel>Why we exist</SectionLabel>
            <BlurWords
              as="p"
              before="Our grandfather built a workshop, then a company, then a fortune. What he left us that mattered most was the"
              accent="habit"
              after="of making things carefully and for a long time."
              stagger={0.025}
              className="text-[clamp(1.5rem,3vw,2.25rem)] leading-[1.2] font-medium tracking-[-0.03em]"
            />
            <Reveal delay={0.2}>
              <p className="max-w-xl text-[15px] leading-relaxed text-fg-muted">
                Heirloom is that habit, applied to capital. We invest our own money, beside people who have built careers on a stage, a pitch or a
                balance sheet, in founders whose work should still matter when our grandchildren are our age.
              </p>
            </Reveal>
          </div>
          <Reveal delay={0.1}>
            <figure className="overflow-hidden rounded-card shadow-card">
              <img src={MANIFESTO_ASIDE.image} alt={MANIFESTO_ASIDE.alt} loading="lazy" className="aspect-[4/5] w-full object-cover" />
            </figure>
          </Reveal>
        </Container>
      </section>
      <Principles items={PRINCIPLES} />
      <PhotoBand
        image={MANIFESTO_BAND.image}
        alt={MANIFESTO_BAND.alt}
        eyebrow="In short"
        before="Make it well, make it last, and make it"
        accent="matter."
        cta="Join the circle"
        href="/membership"
      />
      <section className="bg-ink py-20 sm:py-[14vh]">
        <Container>
          <Reveal>
            <p className="max-w-2xl text-[15px] leading-relaxed text-fg-muted">
              We will get things wrong. When we do, we will say so to the founders and members who trusted us, and write it down here so the next
              generation of this office does not have to learn it twice.
            </p>
          </Reveal>
          <Signatories people={SIGNATORIES} />
        </Container>
      </section>
      <ClosingCta
        before="If this reads like"
        accent="you,"
        after="write to us."
        body="Founders, members and the merely curious are all welcome. A partner answers every note."
        cta="Start a conversation"
      />
    </>
  )
}
