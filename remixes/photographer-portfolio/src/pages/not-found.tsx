import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function NotFoundPage() {
  return (
    <Container className="flex flex-col items-start gap-8 py-40">
      <h1 className="font-display text-6xl">Out of frame.</h1>
      <p className="text-ink-600">That page isn't here. It may have moved.</p>
      <ButtonLink href="/">Back home</ButtonLink>
    </Container>
  )
}
