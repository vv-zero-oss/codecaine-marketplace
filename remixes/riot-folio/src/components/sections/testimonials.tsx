import { QuoteCarousel } from "@/components/motion/quote-carousel"
import { Container } from "@/components/ui/container"

/** What it was like to work with her, in the words of the people who did. */
export function Testimonials({ interval = 7 }: { interval?: number }) {
  return (
    <section aria-label="Testimonials" className="pt-[var(--spacing-section)]">
      <Container>
        <QuoteCarousel interval={interval} className="max-w-[46rem]" />
      </Container>
    </section>
  )
}
