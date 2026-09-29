import { ArrowRight } from "lucide-react"

import { EmailCapture } from "@/components/blocks/email-capture"
import { ScaledFrame } from "@/components/blocks/scaled-frame"
import { InboxMock } from "@/components/mock/inbox-mock"
import { GradientBlob } from "@/components/motion/gradient-blob"
import { RiseIn } from "@/components/motion/rise-in"
import { Container } from "@/components/ui/container"
import { HERO } from "@/content"

/** The badge above the headline: a black NEW chip and the latest release. */
function NewsBadge({ label = HERO.badge, text = HERO.badgeText, href = "#copilot" }: { label?: string; text?: string; href?: string }) {
  return (
    <a
      href={href}
      className="group inline-flex items-center gap-2 rounded-[var(--radius-chip)] bg-card py-1 pr-2.5 pl-1 text-[12.5px] text-ink-soft shadow-(--shadow-field) transition-shadow duration-(--duration-hover) hover:shadow-(--shadow-nav)"
    >
      <span className="rounded-[4px] bg-ink px-1.5 py-0.5 text-[10px] font-semibold tracking-wide text-white">{label}</span>
      {text}
      <ArrowRight className="size-3 transition-transform duration-(--duration-hover) ease-(--ease-out-quint) group-hover:translate-x-0.5" />
    </a>
  )
}

/**
 * The hero: the news badge, the headline, the trial form, and the product
 * rising out of a sea-glass light. The words are there from the first frame;
 * only the light and the product move in.
 */
export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <GradientBlob />
      <Container className="relative flex flex-col items-center text-center">
        <div>
          <NewsBadge />
        </div>
        <h1 className="type-display mt-6 text-[clamp(36px,4.2vw,58px)] text-balance text-ink">
          {HERO.titleStart} <em className="font-light italic">{HERO.titleAccent}</em>
          <br className="hidden sm:block" /> {HERO.titleEnd}
        </h1>
        <p className="mt-5 max-w-[440px] text-[16px] leading-[1.5] text-ink-muted md:text-[17px]">
          {HERO.body}
        </p>
        <div className="mt-8 flex w-full justify-center">
          <EmailCapture name="Hero" placeholder={HERO.placeholder} cta={HERO.cta} rating={HERO.rating} ratingNote={HERO.ratingNote} />
        </div>
      </Container>
      <Container className="relative mt-14 max-w-[920px] md:mt-16">
        <RiseIn>
          <ScaledFrame width={1040}>
            <InboxMock />
          </ScaledFrame>
        </RiseIn>
      </Container>
    </section>
  )
}
