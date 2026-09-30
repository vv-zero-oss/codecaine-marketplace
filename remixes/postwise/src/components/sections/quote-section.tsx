import { QuoteBlock } from "@/components/blocks/quote-block"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { QUOTES } from "@/content"
import { cn } from "@/lib/utils"

/** A single customer quote given a section of its own, between the bigger blocks. */
export function QuoteSection({ quote = "first", tone = "paper", className }: { quote?: "first" | "second" | "third"; tone?: "paper" | "night"; className?: string }) {
  const q = QUOTES[quote]
  return (
    <section
      data-nav-tone={tone === "night" ? "night" : undefined}
      className={cn("py-section", tone === "night" && "bg-night", className)}
    >
      <Container>
        <Reveal>
          <QuoteBlock {...q} tone={tone} />
        </Reveal>
      </Container>
    </section>
  )
}
