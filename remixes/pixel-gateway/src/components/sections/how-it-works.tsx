import { ArrowRight } from "lucide-react"

import { IsoCube } from "@/components/motion/iso-cube"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { HOW_STEPS } from "@/content"
import { Link } from "@/lib/router"

/** The four steps as a row of tilting cards, each with a cube. Used on the
 *  home page (with a link on) and as the spine of /how-it-works. */
export function HowItWorks({ link = true, heading = true }: { link?: boolean; heading?: boolean }) {
  return (
    <section id="how" className="border-y-4 border-line bg-surface py-24 sm:py-32">
      <Container>
        {heading ? <SectionHeading kicker="how it works" title="Four steps from install to direct." blurb="No tunnel, no detour. The whole decision happens on the device." /> : null}
        <ol className="mt-14 grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {HOW_STEPS.map((step, i) => (
            <li key={step.id}>
              <Reveal delay={i * 0.08}>
                <TiltCard maxTilt={9} lift={10} className="flex h-full flex-col gap-4 bg-bg p-6 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                  <div className="[transform:translateZ(40px)]"><IsoCube size={64} tone={step.tone === "sky" ? "sky" : step.tone} speed={12 + i * 2} /></div>
                  <p className="font-mono text-xl text-fg-subtle">STEP {step.index}</p>
                  <h3 className="text-2xl font-semibold leading-tight">{step.title}</h3>
                  <p className="text-lg text-fg-muted">{step.body}</p>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ol>
        {link ? (
          <Reveal className="mt-12">
            <Link href="/how-it-works" className={buttonVariants({ variant: "outline", size: "lg" })}>Watch it run <ArrowRight /></Link>
          </Reveal>
        ) : null}
      </Container>
    </section>
  )
}
