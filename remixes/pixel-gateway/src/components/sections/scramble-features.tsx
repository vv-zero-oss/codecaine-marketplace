import { ArrowRight } from "lucide-react"

import { ScrambleText } from "@/components/motion/scramble-text"
import { Container } from "@/components/ui/container"
import { FEATURES } from "@/content"
import { Link } from "@/lib/router"

/**
 * Eight capabilities as a departure board: each row is a link that decrypts
 * into place, one after another, as the list scrolls in. The row fills with
 * white on hover and the arrow steps forward.
 */
export function ScrambleFeatures() {
  return (
    <section id="what" className="relative bg-bg py-24 sm:py-32">
      <Container>
        <p className="mb-8 font-mono text-xl uppercase tracking-widest text-fg-subtle">{"> what it checks"}</p>
        <ul className="grid gap-4 sm:gap-5">
          {FEATURES.map((feature, i) => (
            <li key={feature.id}>
              <Link
                href={`/products#${feature.id}`}
                className="group flex min-h-20 items-center justify-between gap-4 bg-surface px-4 py-3 shadow-px transition-colors duration-100 ease-[steps(2,end)] [--px-edge:var(--color-line)] hover:bg-fg hover:text-bg hover:[--px-edge:var(--color-fg)] sm:min-h-28 sm:px-6"
              >
                <ScrambleText
                  text={feature.title}
                  delay={0.06 * i}
                  duration={0.9}
                  charset={i % 3 === 1 ? "symbols" : "alnum"}
                  className="font-display text-[clamp(0.8rem,3.4vw,2.75rem)] uppercase leading-tight"
                />
                <span className="hidden max-w-[24ch] text-right font-mono text-xl leading-tight text-fg-muted group-hover:text-bg/70 2xl:block">
                  {feature.short}
                </span>
                <ArrowRight className="size-6 shrink-0 transition-transform duration-150 ease-[steps(3,end)] group-hover:translate-x-2 sm:size-10" strokeWidth={2.5} />
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
