import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/** Invented outlets, each set in its own way so the row reads like a press
 *  wall rather than three captions. */
const QUOTES = [
  { quote: "The only travel app I'd keep if I had to delete the rest.", outlet: "Ledger", style: "font-data italic font-semibold tracking-[-0.02em] text-[22px]" },
  { quote: "Plenty of apps track flights. One explains them.", outlet: "FIELD NOTES", style: "font-mono text-[15px] tracking-[0.18em]" },
  { quote: "It told me about my delay before the airline did. Twice.", outlet: "the commute", style: "font-sans font-extrabold lowercase tracking-[-0.06em] text-[22px]" },
]

export function PressQuotes() {
  return (
    <section data-theme="night" className="bg-night pt-10 pb-24 md:pb-32">
      <Container>
        <ul className="grid gap-10 text-center md:grid-cols-3 md:gap-8">
          {QUOTES.map((q, i) => (
            <Reveal key={q.outlet} as="li" delay={i * 0.06}>
              <p className="mx-auto max-w-[26ch] text-[17px] leading-snug font-semibold tracking-[-0.01em] text-night-fg uppercase">“{q.quote}”</p>
              <p className={cn("mt-3 text-night-dim", q.style)}>{q.outlet}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
