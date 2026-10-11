import { ClosingCta } from "@/components/blocks/closing-cta"
import { Reveal } from "@/components/motion/reveal"
import { Builder } from "@/components/sections/create/builder"
import { HostKit } from "@/components/sections/create/host-kit"
import { Container } from "@/components/ui/container"

/**
 * Host: the promise, then the builder itself — make a page here, now —
 * then what comes with it, and the last ask.
 */
export function CreatePage() {
  return (
    <>
      <section className="pt-28 pb-12 md:pt-36 md:pb-16">
        <Container className="max-w-[1180px]">
          <Reveal>
            <p className="type-eyebrow text-berry">Host</p>
            <h1 className="type-head mt-4 max-w-[12ch] text-giga text-ink">
              Your night, <span className="flare-text">in three moves.</span>
            </h1>
            <p className="mt-8 max-w-[44ch] text-lead text-ink-3">
              Name it, dress it, open the door. Try it right here — the phone shows exactly what your guests will see.
            </p>
          </Reveal>
        </Container>
      </section>
      <Builder />
      <HostKit />
      <ClosingCta title="The first yes" continuation="is the best feeling." primary="Back to the builder" primaryHref="#builder" secondary="See pricing" secondaryHref="/pricing" />
    </>
  )
}
