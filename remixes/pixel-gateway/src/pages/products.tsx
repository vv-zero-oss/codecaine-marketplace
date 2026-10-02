import { IsoCube } from "@/components/motion/iso-cube"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { PageHero } from "@/components/page-hero"
import { PixelSprite } from "@/components/pixel/pixel-sprite"
import { CallToAction } from "@/components/sections/call-to-action"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FEATURES } from "@/content"
import { openDialog } from "@/lib/ui-events"

const STEPS = [
  { tone: "accent" as const, title: "Install the agent", body: "Push it with your device manager. It runs beside the browser and starts in under a second." },
  { tone: "warn" as const, title: "Set the rules", body: "Start from a template or write your own. Every rule shows a diff before it ships." },
  { tone: "good" as const, title: "Go direct", body: "Requests are checked on the device and then go straight to where they were headed." },
]

export function ProductsPage() {
  return (
    <>
      <PageHero kicker="products" title="Eight checks. One gateway." blurb="Everything runs on the device, so there is nothing to backhaul and nothing for your people to notice.">
        <Button variant="primary" size="lg" onClick={() => openDialog("demo")}>Book a demo</Button>
      </PageHero>
      <section className="bg-bg py-24 sm:py-32">
        <Container>
          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">
            {FEATURES.map((feature, i) => (
              <Reveal key={feature.id} delay={(i % 4) * 0.06}>
                <div id={feature.id} className="scroll-mt-28">
                  <TiltCard maxTilt={10} lift={12} className="flex h-full min-h-72 flex-col gap-5 bg-surface p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                    <div className="flex h-20 items-center [transform:translateZ(44px)]">
                      <PixelSprite name={feature.sprite} scale={6} />
                    </div>
                    <h2 className="font-display text-[11px] uppercase leading-snug">{feature.title}</h2>
                    <p className="text-lg text-fg-muted">{feature.body}</p>
                  </TiltCard>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
      <section className="border-y-4 border-line bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="how it works" title="From install to protected in an afternoon." />
          <ol className="mt-16 grid gap-12 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <li key={step.title}>
                <Reveal delay={i * 0.1}>
                  <IsoCube tone={step.tone} size={84} speed={12 + i * 3} className="mb-8" />
                  <p className="font-mono text-xl text-fg-subtle">STEP 0{i + 1}</p>
                  <h3 className="mt-1 text-2xl font-semibold">{step.title}</h3>
                  <p className="mt-2 text-lg text-fg-muted">{step.body}</p>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>
      <CallToAction />
    </>
  )
}
