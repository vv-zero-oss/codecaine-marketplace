import { Check } from "lucide-react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { CTA } from "@/content"
import { lazy, Suspense } from "react"

const CtaPhone = lazy(() => import("@/components/phone/cta-phone").then((m) => ({ default: m.CtaPhone })))

/** One numbered step on a frosted row. */
export function Step({ index, label }: { index: number; label: string }) {
  return (
    <li className="flex h-11 items-center gap-4 rounded-[8px] bg-white/[0.04] px-4 text-[0.8125rem] font-medium text-ink shadow-[inset_0_1px_0_rgb(255_255_255/0.06),inset_0_0_0_1px_rgb(255_255_255/0.05)]">
      <span className="w-2 text-ink-soft tabular-nums">{index}</span>
      {label}
    </li>
  )
}

/** The steel half: how quick signing up is. */
export function StepsCard({ title = CTA.title, timed = CTA.timed }: { title?: string; timed?: string }) {
  return (
    <div className="grain relative rounded-card bg-(image:--atmos-steel) px-6 shadow-card [--grain-opacity:0.2] pt-9 pb-10 sm:px-14 sm:pt-16 sm:pb-14">
      <h2 className="relative z-2 font-serif text-[1.875rem] leading-[1.1] whitespace-pre-line text-ink sm:text-[2rem]">{title}</h2>
      <ol className="relative z-2 mt-6 flex max-w-[272px] flex-col gap-2">
        {CTA.steps.map((step, i) => (
          <Step key={step} index={i + 1} label={step} />
        ))}
      </ol>
      <span className="absolute bottom-7 left-[min(15.5rem,62%)] z-2 inline-flex h-6 -rotate-3 items-center gap-1.5 rounded-chip bg-surface px-2.5 text-[0.625rem] font-medium text-ink-soft shadow-chip sm:bottom-10 sm:left-[14.5rem]">
        {timed}
        <span className="grid size-3.5 place-items-center rounded-full bg-ink text-canvas">
          <Check className="size-2.5" strokeWidth={3} />
        </span>
      </span>
    </div>
  )
}

/** The champagne-metal half: the price, engraved, and the button. */
export function PriceCard({
  title = CTA.priceTitle,
  price = CTA.price,
  note = CTA.priceNote,
  button = CTA.button,
}: {
  title?: string
  price?: string
  note?: string
  button?: string
}) {
  return (
    <div className="metal metal-champagne grain flex flex-col items-end rounded-card [--mx:92%] [--my:4%] px-6 pt-10 pb-8 text-right sm:px-10 sm:pt-12 sm:pb-12 [--grain-opacity:0.3]">
      <h2 className="engraved relative z-2 font-serif text-[1.875rem] leading-[1.1] whitespace-pre-line sm:text-[2rem]">{title}</h2>
      <p className="engraved relative z-2 mt-5 text-[4.5rem] leading-none font-light tracking-[-0.03em] sm:text-[5rem]">{price}</p>
      <p className="engraved relative z-2 mt-2 text-[0.75rem]">{note}</p>
      <ButtonLink href="#get-started" variant="inverse" size="sm" className="relative z-2 mt-10 sm:mt-16">
        {button}
      </ButtonLink>
    </div>
  )
}

/** The closing offer: steps on the left, the price on the right, a phone leaning across both. */
export function CallToAction() {
  return (
    <section id="get-started" className="pb-24 sm:pb-32">
      <Container>
        <Reveal>
          <div className="relative grid gap-0 md:grid-cols-[1.08fr_1fr] md:items-center md:gap-[18%]">
            <StepsCard />
            <Suspense fallback={<div className="h-[440px] md:hidden" />}>
              <CtaPhone className="pointer-events-none relative -my-16 h-[440px] md:absolute md:top-1/2 md:left-1/2 md:my-0 md:h-[600px] md:w-[440px] md:-translate-x-[46%] md:-translate-y-1/2 lg:h-[640px]" />
            </Suspense>
            <div className="relative md:min-h-[478px] md:[&>div]:min-h-[478px]">
              <PriceCard />
            </div>
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
