import { ArrowUpRight } from "lucide-react"

import { PhotoCredits } from "@/components/blocks/photo"
import { CornerLabels } from "@/components/blocks/corner-label"
import { ScrubText } from "@/components/motion/scrub-text"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import type { PhotoName } from "@/lib/photos"

/**
 * The last word, on the loud blue: the line in cream, set huge, then the
 * two ways onward and the credits for every photograph on the page.
 */
export function ClosingCta({
  title = "The long way round is optional now.",
  credits,
}: {
  title?: string
  credits: PhotoName[]
}) {
  return (
    <section data-header-tone="light" className="relative bg-sky pt-(--spacing-section) pb-10 text-on-sky">
      <Container>
        <h2 className="type-head max-w-[15ch] text-giga text-page">{title}</h2>
        <div className="mt-14 grid gap-10 md:grid-cols-2 md:items-end">
          <ScrubText
            text="Seats for spring 2027 are open. Hold one now; nothing is charged until the week you fly."
            className="max-w-[30ch] text-h4 text-page"
          />
          <div className="flex flex-wrap items-center gap-4 md:justify-end">
            <ButtonLink href="#book" variant="cream" size="lg">
              Book a seat
            </ButtonLink>
            <Link href="/routes" className="link-line group inline-flex min-h-11 items-center gap-1 text-body text-page">
              See where we fly
              <ArrowUpRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </div>
        <div className="mt-24 flex flex-col gap-6 border-t border-on-sky/25 pt-6 sm:mt-32">
          <CornerLabels left="Experience" right="Launching spring 2027" className="text-on-sky-soft" />
          <PhotoCredits names={credits} className="text-on-sky-soft" />
        </div>
      </Container>
    </section>
  )
}
