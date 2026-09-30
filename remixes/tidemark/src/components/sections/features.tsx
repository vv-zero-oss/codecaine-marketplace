import type * as React from "react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { BillsArt, CardsArt, ControlsArt, CurrenciesArt, TreasuryArt } from "@/components/mock/feature-art"
import { Reveal } from "@/components/motion/reveal"
import { LiftCard } from "@/components/motion/tilt-card"
import { Container } from "@/components/ui/container"
import { FEATURES } from "@/content"
import { cn } from "@/lib/utils"

/** One cell of the bento: title and a line, then the product doing it. */
const TONES = {
  cream: "bg-card text-ink",
  pink: "bg-pink text-ink",
  coral: "bg-coral text-ink",
  night: "bg-night text-night-fg",
  sand: "bg-paper-deep text-ink",
} as const

export function FeatureCell({
  title = "",
  body = "",
  tone = "cream",
  className,
  children,
}: {
  title?: string
  body?: string
  /** The block's colour: flat, from the palette. */
  tone?: keyof typeof TONES
  className?: string
  children?: React.ReactNode
}) {
  return (
    <LiftCard className={cn("flex h-full flex-col gap-6 p-6 md:p-7", TONES[tone], className)}>
      <div className="flex flex-col gap-3">
        <h3 className="type-caps text-[20px] leading-[1.05] md:text-[22px]">{title}</h3>
        <p className={cn("max-w-[380px] text-[15px] leading-[1.5]", tone === "night" ? "text-night-muted" : "text-ink/75")}>{body}</p>
      </div>
      <div className="mt-auto">{children}</div>
    </LiftCard>
  )
}

/** The product as a bento: accounts, cards, treasury on top; bills and controls below. */
export function Features() {
  const f = FEATURES
  return (
    <section id="product" className="py-section">
      <Container>
        <Reveal className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow={f.eyebrow} title={f.title} />
          <p className="max-w-[380px] text-[16px] leading-[1.55] text-ink-muted">{f.body}</p>
        </Reveal>
        <div className="mt-12 grid gap-0 md:grid-cols-6">
          <Reveal className="md:col-span-3 lg:col-span-2" delay={0}>
            <FeatureCell tone="cream" {...f.accounts}><CurrenciesArt /></FeatureCell>
          </Reveal>
          <Reveal className="md:col-span-3 lg:col-span-2" delay={0.05}>
            <FeatureCell tone="pink" {...f.cards}><CardsArt /></FeatureCell>
          </Reveal>
          <Reveal className="md:col-span-6 lg:col-span-2" delay={0.1}>
            <FeatureCell tone="night" {...f.treasury}><TreasuryArt /></FeatureCell>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0}>
            <FeatureCell tone="coral" {...f.bills}><BillsArt /></FeatureCell>
          </Reveal>
          <Reveal className="md:col-span-3" delay={0.05}>
            <FeatureCell tone="sand" {...f.controls}><ControlsArt /></FeatureCell>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
