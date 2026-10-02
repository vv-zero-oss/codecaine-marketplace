import { ArrowRight } from "lucide-react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { TiltCard } from "@/components/motion/tilt-card"
import { buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { CASE_STUDIES } from "@/content"
import { Link } from "@/lib/router"

/** Three case studies on the home page: the headline number, the company, a link in. */
export function CaseStrip() {
  return (
    <section id="cases" className="border-y-4 border-line bg-surface py-phi-6 sm:py-phi-7">
      <Container>
        <SectionHeading kicker="case studies" title="What changed after the first fortnight." />
        <ul className="mt-phi-5 grid gap-phi-4 lg:grid-cols-3">
          {CASE_STUDIES.map((c, i) => (
            <li key={c.id}>
              <Reveal delay={i * 0.08} className="h-full">
                <TiltCard maxTilt={8} lift={10} className="h-full bg-bg shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line)]">
                  <Link href={`/case-studies#${c.id}`} className="flex h-full flex-col gap-phi-3 p-phi-4">
                    <p className="font-mono text-lg uppercase tracking-widest text-fg-subtle">{c.company}</p>
                    <p className="font-display text-3xl text-accent-hi [transform:translateZ(30px)]"><CountUp value={c.results[0].value} suffix={c.results[0].suffix} /></p>
                    <p className="text-base text-fg-muted">{c.results[0].label}</p>
                    <p className="mt-auto text-lg font-semibold">{c.title}</p>
                    <span className="inline-flex items-center gap-phi-1 font-display text-label uppercase">Read the story <ArrowRight className="size-4" /></span>
                  </Link>
                </TiltCard>
              </Reveal>
            </li>
          ))}
        </ul>
        <Link href="/case-studies" className={buttonVariants({ variant: "outline", size: "lg", className: "mt-phi-5" })}>All case studies</Link>
      </Container>
    </section>
  )
}
