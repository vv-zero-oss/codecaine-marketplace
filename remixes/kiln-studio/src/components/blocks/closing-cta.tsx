import { ArrowRight } from "lucide-react"
import { BorderBeam } from "border-beam"

import { useContact } from "@/components/site/contact-sheet"
import { Reveal } from "@/components/motion/reveal"
import { Button } from "@/components/ui/button"
import { EMAIL } from "@/data/studio"
import { play } from "@/lib/sound"

/**
 * The last ask, on every page: one oversized question, and the one button
 * — the only thing on the site the border beam goes round.
 */
export function ClosingCta({
  title = "Got something nobody's made yet?",
  continuation = "Good. Neither have we.",
  cta = "Let's Talk",
}: {
  title?: string
  continuation?: string
  cta?: string
}) {
  const { setOpen } = useContact()
  return (
    <section aria-label="Start a project" className="px-(--spacing-gutter) py-(--spacing-section)">
      <Reveal>
        <h2 className="type-head max-w-[14ch] text-mega text-ink">
          {title} <span className="text-ink-4">{continuation}</span>
        </h2>
      </Reveal>
      <div className="mt-14 flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
        <BorderBeam size="md" colorVariant="sunset" strength={0.7} theme="dark" className="rounded-full">
          <Button
            size="xl"
            onClick={() => {
              play("open")
              setOpen(true)
            }}
          >
            {cta} <ArrowRight className="size-[0.9em]" />
          </Button>
        </BorderBeam>
        <a href={`mailto:${EMAIL}`} className="group/mail text-lead text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink">
          or write to <span className="text-ink underline decoration-line-3 underline-offset-4 transition-[text-decoration-color] duration-(--duration-hover) group-hover/mail:decoration-ember">{EMAIL}</span>
        </a>
      </div>
    </section>
  )
}
