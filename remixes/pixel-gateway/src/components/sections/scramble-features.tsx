import { ArrowRight } from "lucide-react"

import { ScrambleText } from "@/components/motion/scramble-text"
import { Container } from "@/components/ui/container"
import { FEATURES } from "@/content"
import { Link } from "@/lib/router"
import { buttonVariants } from "@/components/ui/button"

/**
 * Eight capabilities as a departure board: each row is a link that decrypts
 * into place, one after another, as the list scrolls in. The row fills with
 * white on hover and the arrow steps forward.
 */
export function ScrambleFeatures() {
  return (
    <section id="what" className="relative bg-bg py-phi-6 sm:py-phi-7">
      <Container>
        <p className="mb-phi-4 font-mono text-lg uppercase tracking-widest text-fg-subtle">{"> what it checks"}</p>
        <ul className="grid gap-phi-2 sm:gap-phi-3">
          {FEATURES.map((feature, i) => (
            <li key={feature.id}>
              <Link
                href={`/products#${feature.id}`}
                className="group flex min-h-20 items-center justify-between gap-phi-2 bg-surface px-phi-2 py-phi-2 shadow-px transition-colors duration-100 ease-[steps(2,end)] [--px-edge:var(--color-line)] hover:bg-fg hover:text-bg hover:[--px-edge:var(--color-fg)] sm:min-h-28 sm:px-phi-3"
              >
                <ScrambleText
                  text={feature.title}
                  delay={0.06 * i}
                  duration={0.9}
                  charset={i % 3 === 1 ? "symbols" : "alnum"}
                  className="font-display text-[clamp(0.8rem,3.4vw,2.75rem)] uppercase leading-tight"
                />
                <span className="hidden max-w-[24ch] text-right font-mono text-lg leading-tight text-fg-muted group-hover:text-bg/70 2xl:block">
                  {feature.short}
                </span>
                <ArrowRight className="size-6 shrink-0 transition-transform duration-150 ease-[steps(3,end)] group-hover:translate-x-2 sm:size-10" strokeWidth={2.5} />
              </Link>
            </li>
          ))}
        </ul>
        <div className="mt-phi-4 flex flex-wrap gap-phi-2">
          <Link href="/products" className={buttonVariants({ variant: "primary", size: "lg" })}>See all eight checks</Link>
          <Link href="/how-it-works#try" className={buttonVariants({ variant: "outline", size: "lg" })}>Try it on a request</Link>
        </div>
      </Container>
    </section>
  )
}
