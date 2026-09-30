import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { quotes } from "@/content"

/** Three lines copied out of the book by the fire. No stars, no photos — just what people wrote. */
export function GuestBook({ label = "From the guest book, winter 2025/26" }: { label?: string }) {
  return (
    <section id="guest-book" className="py-(--spacing-section)">
      <Container>
        <p className="label border-t border-ink pt-3 text-ink-faint">{label}</p>
        <div className="mt-10 grid gap-10 md:grid-cols-3 md:gap-0">
          {quotes.map((q, i) => (
            <Reveal key={q.who} delay={i * 0.06} className={i > 0 ? "md:border-l md:border-rule md:pl-8" : "md:pr-8"}>
              <figure className={i === 1 ? "md:px-0" : ""}>
                <blockquote className="font-serif text-2xl leading-snug text-ink italic">“{q.quote}”</blockquote>
                <figcaption className="label mt-5 text-ink-faint">— {q.who}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
