import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TEAM, VALUES } from "@/content"

export function AboutPage() {
  return (
    <>
      <PageHero kicker="about" title="We got tired of the long way round." blurb="Pixelkeep started when a small IT team switched off a VPN and nobody noticed. We wanted every team to get that quiet." />
      <section className="bg-bg py-24 sm:py-32">
        <Container className="grid gap-16 lg:grid-cols-[1fr_1fr]">
          <div>
            <SectionHeading kicker="what we believe" title="Three rules we build by." />
            <ul className="mt-10 grid gap-6">
              {VALUES.map((v, i) => (
                <li key={v.title}>
                  <Reveal delay={i * 0.08}>
                    <div className="bg-surface p-5 shadow-px-sm [--px-edge:var(--color-line)]">
                      <h3 className="font-display text-[11px] uppercase text-accent-hi">{v.title}</h3>
                      <p className="mt-2 text-xl text-fg-muted">{v.body}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
          <dl className="grid grid-cols-2 content-start gap-6">
            {[{ v: 2021, l: "Founded" }, { v: 38, l: "People, in 14 countries" }, { v: 14200, l: "Teams protected" }, { v: 3, l: "Milliseconds added", s: "ms" }].map((s) => (
              <div key={s.l} className="bg-surface p-5 shadow-px [--px-edge:var(--color-line)]">
                <dd className="font-display text-2xl text-accent-hi"><CountUp value={s.v} suffix={s.s ?? ""} /></dd>
                <dt className="mt-3 text-lg text-fg-muted">{s.l}</dt>
              </div>
            ))}
          </dl>
        </Container>
      </section>
      <section className="border-y-4 border-line bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="the party" title="The people behind it." />
          <div className="mt-12 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
            {TEAM.map((p, i) => (
              <Reveal key={p.name} delay={i * 0.06}>
                <TiltCard maxTilt={9} lift={10} className="grid gap-4 bg-bg p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                  <PixelSprite name={p.sprite} scale={6} className="[transform:translateZ(36px)]" />
                  <p className="text-xl font-semibold">{p.name}</p>
                  <p className="font-mono text-xl text-fg-muted">{p.role}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Come and say hello." body="Book a demo, or just start free and see for yourself." />
    </>
  )
}
