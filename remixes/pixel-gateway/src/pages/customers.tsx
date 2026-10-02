import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { PageHero } from "@/components/page-hero"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { CallToAction } from "@/components/sections/call-to-action"
import { LogoStrip } from "@/components/sections/logo-strip"
import { Testimonials } from "@/components/sections/testimonials"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CASES } from "@/content"

export function CustomersPage() {
  return (
    <>
      <PageHero kicker="customers" title="14,200 teams, one quiet gateway." blurb="From freight to games studios, they all asked for the same thing: fewer detours, fewer alerts." />
      <LogoStrip />
      <section className="bg-bg py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="case files" title="What changed after the first week." />
          <div className="mt-14 grid gap-8 lg:grid-cols-3">
            {CASES.map((c, i) => (
              <Reveal key={c.name} delay={i * 0.08}>
                <TiltCard maxTilt={9} lift={12} className="flex h-full flex-col gap-5 bg-surface p-7 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                  <PixelSprite name={c.sprite} scale={5} className="[transform:translateZ(36px)]" />
                  <p className="font-display text-[10px] uppercase text-fg-muted">{c.name}</p>
                  <p className="font-display text-3xl leading-none text-accent-hi">
                    <CountUp value={c.metric} />
                    <span className="ml-1 font-sans text-lg font-semibold text-fg">{c.suffix}</span>
                  </p>
                  <p className="text-xl">{c.result}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <Testimonials />
      <CallToAction title="Join the party." />
    </>
  )
}
