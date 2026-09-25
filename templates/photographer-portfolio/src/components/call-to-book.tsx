import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function CallToBook({ title = "Tell me about your day." }: { title?: string }) {
  return (
    <section className="mt-32 bg-ink text-paper">
      <Container className="flex flex-col items-start gap-8 py-24 md:flex-row md:items-end md:justify-between">
        <h2 className="max-w-2xl font-display text-5xl leading-[1.02] md:text-6xl">{title}</h2>
        <ButtonLink href="/contact" variant="light" size="lg">
          Check a date <ArrowRight />
        </ButtonLink>
      </Container>
    </section>
  )
}
