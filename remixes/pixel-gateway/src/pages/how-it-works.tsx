import { IsoCube } from "@/components/motion/iso-cube"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { RequestSimulator } from "@/components/request-simulator"
import { CallToAction } from "@/components/sections/call-to-action"
import { Faq } from "@/components/sections/faq"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { HOW_STEPS } from "@/content"
import { Link } from "@/lib/router"
import { openDialog } from "@/lib/ui-events"
import { cn } from "@/lib/utils"

export function HowItWorksPage() {
  return (
    <>
      <PageHero kicker="how it works" title="Check it here. Send it there." blurb="Pixelkeep decides on the device, then lets the request go straight where it was headed. Here is the whole path, and a way to try it.">
        <Link href="/get-started" className={buttonVariants({ variant: "primary", size: "lg" })}>Get started</Link>
        <Button variant="glass" size="lg" onClick={() => openDialog("demo")}>Book a demo</Button>
      </PageHero>

      <section className="bg-bg py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="the path" title="Four stops, about three milliseconds." />
          <ol className="mt-16 grid gap-16">
            {HOW_STEPS.map((step, i) => (
              <li key={step.id} id={step.id} className={cn("grid scroll-mt-28 items-center gap-8 md:grid-cols-2 md:gap-16", i % 2 && "md:[&>*:first-child]:order-2")}>
                <Reveal direction={i % 2 ? "left" : "right"}>
                  <p className="font-display text-5xl text-accent-hi sm:text-6xl">{step.index}</p>
                  <h3 className="mt-4 text-[clamp(1.8rem,4vw,2.8rem)] font-bold leading-none tracking-tight">{step.title}</h3>
                  <p className="mt-4 max-w-lg text-xl text-fg-muted">{step.body}</p>
                  <p className="mt-4 max-w-lg font-mono text-xl text-fg-subtle">{`> ${step.detail}`}</p>
                </Reveal>
                <Reveal delay={0.1}>
                  <div className="grid min-h-56 place-items-center bg-surface shadow-px [--px-edge:var(--color-line)]">
                    <IsoCube size={96} tone={step.tone === "sky" ? "sky" : step.tone} speed={10 + i * 3} />
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section id="try" className="border-y-4 border-line bg-surface py-24 sm:py-32">
        <Container>
          <SectionHeading kicker="try it" title="Send a request through the gateway." blurb="Pick something your people really do, and watch where it stops." />
          <div className="mt-12"><RequestSimulator /></div>
        </Container>
      </section>

      <CtaBand title="Seen enough? Protect your first device." body="It takes about the time you spent on this page." />
      <Faq />
      <CallToAction title="Insert coin." />
    </>
  )
}
