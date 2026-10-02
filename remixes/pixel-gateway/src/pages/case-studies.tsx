import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { PageHero } from "@/components/page-hero"
import { CtaBand } from "@/components/cta-band"
import { CallToAction } from "@/components/sections/call-to-action"
import { Badge } from "@/components/ui/badge"
import { Button, buttonVariants } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { CASE_STUDIES } from "@/content"
import { Link } from "@/lib/router"
import { openDialog } from "@/lib/ui-events"
import { cn } from "@/lib/utils"

/** Three full stories: challenge, approach, results and a quote, alternating the φ split. */
export function CaseStudiesPage() {
  return (
    <>
      <PageHero kicker="case studies" title="Real teams. Measured results." blurb="Three teams, three very different problems, one thing in common: they stopped taking the long way round.">
        <Link href="/get-started" className={buttonVariants({ variant: "primary", size: "lg" })}>Get started</Link>
        <Button variant="glass" size="lg" onClick={() => openDialog("demo")}>Talk to a person</Button>
      </PageHero>
      {CASE_STUDIES.map((c, i) => (
        <section key={c.id} id={c.id} className={cn("scroll-mt-20 py-phi-6 sm:py-phi-7", i % 2 ? "border-y-4 border-line bg-surface" : "bg-bg")}>
          <Container className={cn("grid items-start gap-phi-5 lg:gap-phi-6", i % 2 ? "lg:grid-cols-[1fr_1.618fr] lg:[&>*:first-child]:order-2" : "lg:grid-cols-[1.618fr_1fr]")}>
            <Reveal>
              <Badge tone="outline">{c.industry}</Badge>
              <h2 className="mt-phi-3 text-3xl font-bold">{c.title}</h2>
              <dl className="mt-phi-4 grid gap-phi-4">
                <div><dt className="font-display text-label uppercase text-accent-hi">The problem</dt><dd className="mt-phi-1 max-w-measure text-base text-fg-muted">{c.challenge}</dd></div>
                <div><dt className="font-display text-label uppercase text-accent-hi">What they did</dt><dd className="mt-phi-1 max-w-measure text-base text-fg-muted">{c.approach}</dd></div>
              </dl>
              <blockquote className="mt-phi-4 max-w-measure border-l-4 border-accent pl-phi-3 text-lg">“{c.quote.text}”
                <footer className="mt-phi-2 font-mono text-lg text-fg-muted">{c.quote.name}, {c.quote.role}, {c.company}</footer>
              </blockquote>
            </Reveal>
            <Reveal delay={0.1}>
              <dl className={cn("grid gap-phi-3 p-phi-4 shadow-px-drop [--px-drop:rgba(0,0,0,0.5)] [--px-edge:var(--color-line-strong)]", i % 2 ? "bg-bg" : "bg-surface")}>
                <p className="font-display text-label uppercase text-fg-subtle">{c.company} · results</p>
                {c.results.map((r) => (
                  <div key={r.label} className="border-t-2 border-line pt-phi-3 first-of-type:border-t-0 first-of-type:pt-0">
                    <dd className="font-display text-2xl text-accent-hi"><CountUp value={r.value} suffix={r.suffix} /></dd>
                    <dt className="mt-phi-1 text-base text-fg-muted">{r.label}</dt>
                  </div>
                ))}
              </dl>
            </Reveal>
          </Container>
        </section>
      ))}
      <CtaBand title="Want results like these?" body="Start with one depot, one team, one afternoon." />
      <CallToAction title="Your turn." />
    </>
  )
}
