import { ArrowRight } from "lucide-react"

import { ProductWindow } from "@/components/mock/page-product-window"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * The platform page opens on the claim and then the proof: a working
 * product window on the warm dotted panel — click through cards, bills and
 * the close.
 */
export function PlatformHero() {
  return (
    <section className="relative pt-16 pb-12 sm:pt-24">
      <Container>
        <Reveal>
          <p className="type-eyebrow flex items-center gap-2 text-ink-2">
            The platform
            <span className="rounded-(--radius-chip) bg-panel px-1.5 py-0.5 font-mono text-[11px] tracking-normal normal-case text-ink">9 modules · 1 ledger</span>
          </p>
          <h1 className="type-head text-display mt-5 max-w-[16ch] text-balance">
            Everything money touches.{" "}
            <span className="text-ink-soft">One place to touch it.</span>
          </h1>
          <p className="text-lead mt-5 max-w-[46ch] text-ink-2">
            Cards, bills, procurement, travel and the close — on one ledger, with agents doing the parts nobody should do by hand.
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            <ButtonLink href="/pricing" size="lg">Book a demo <ArrowRight /></ButtonLink>
            <ButtonLink href="/pricing" size="lg" variant="outline">See pricing</ButtonLink>
          </div>
        </Reveal>
        <Reveal delay={0.1} className="relative mt-12 overflow-hidden rounded-(--radius-panel) bg-panel p-3 sm:mt-16 sm:p-8 lg:p-14">
          <div aria-hidden className="dot-grid absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_80%)]" />
          <ProductWindow className="relative mx-auto max-w-[920px]" />
          <p className="relative mt-4 text-center text-[13px] text-ink-3">It works — try the sidebar, the limits and the approvals.</p>
        </Reveal>
      </Container>
    </section>
  )
}
