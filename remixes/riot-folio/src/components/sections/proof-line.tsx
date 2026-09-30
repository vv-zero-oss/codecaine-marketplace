import { ArrowRight } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { PROOF } from "@/content"

/** The scale of it, in one line, and the way into the archive. */
export function ProofLine({ line = PROOF, cta = "View work" }: { line?: string; cta?: string }) {
  return (
    <section aria-label="In numbers" className="py-12 sm:py-14">
      <Container className="flex flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-[clamp(1.25rem,1rem+1vw,1.55rem)] leading-tight tracking-[-0.015em] text-ink">{line}</p>
        <ButtonLink href="/work" className="group">
          {cta}
          <ArrowRight className="transition-transform duration-200 group-hover:translate-x-0.5" />
        </ButtonLink>
      </Container>
    </section>
  )
}
