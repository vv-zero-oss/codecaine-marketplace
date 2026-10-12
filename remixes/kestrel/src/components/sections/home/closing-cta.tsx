import { EmailCapture } from "@/components/blocks/email-capture"
import { Reveal } from "@/components/motion/reveal"
import { UnderlineDraw } from "@/components/motion/underline-draw"
import { Container } from "@/components/ui/container"
import { CLOSING } from "@/content/home-end"

/** The last ask: the promise, loud, and the same field the page opened with. */
export function ClosingCta() {
  return (
    <section id="start" className="py-(--spacing-section)">
      <Container className="flex flex-col items-center text-center">
        <Reveal>
          <h2 className="type-head text-mega text-ink">
            {CLOSING.title}
            <br />
            <span className="relative inline-block text-ink-soft">
              {CLOSING.continuation}
              <UnderlineDraw className="-z-10" />
            </span>
          </h2>
        </Reveal>
        <Reveal delay={0.1} className="mt-12 flex w-full flex-col items-center">
          <EmailCapture name="Closing signup" className="mx-auto" />
          <p className="mt-1 text-[14px] text-ink-3">{CLOSING.note}</p>
        </Reveal>
      </Container>
    </section>
  )
}
