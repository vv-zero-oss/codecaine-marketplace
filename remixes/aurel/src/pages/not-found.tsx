import { ButtonLink } from "@/components/ui/button-link"
import { SectionHeading } from "@/components/ui/section-heading"

export function NotFoundPage() {
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-10 px-gutter text-center">
      <SectionHeading as="h1" eyebrow="_page_ NOT FOUND" title="_this_ ROOM _is_ EMPTY." size="lg" />
      <ButtonLink href="/collection" label="_see the_ COLLECTION" />
    </section>
  )
}
