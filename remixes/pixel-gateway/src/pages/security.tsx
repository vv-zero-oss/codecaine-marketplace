import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { CallToAction } from "@/components/sections/call-to-action"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { TRUST } from "@/content"
import { openDialog } from "@/lib/ui-events"

export function SecurityPage() {
  return (
    <>
      <PageHero kicker="security" title="A security product should be easy to trust." blurb="What we collect, where it lives, and who has checked our work.">
        <Button variant="primary" size="lg" onClick={() => openDialog("demo")}>Request the reports</Button>
      </PageHero>
      <section className="bg-bg py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="the short version" title="Six promises, in plain words." />
          <div className="mt-14 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
            {TRUST.map((t, i) => (
              <Reveal key={t.title} delay={(i % 3) * 0.07}>
                <TiltCard maxTilt={8} lift={10} className="flex h-full flex-col gap-4 bg-surface p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                  <PixelSprite name={t.sprite} scale={5} className="[transform:translateZ(36px)]" />
                  <h3 className="font-display text-[11px] uppercase">{t.title}</h3>
                  <p className="text-lg text-fg-muted">{t.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand title="Want the audit reports?" body="We share them under NDA, usually the same day." primary="Get started" secondary="Request reports" tone="surface" />
      <CallToAction title="Trust, then verify." />
    </>
  )
}
