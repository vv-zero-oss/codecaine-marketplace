import type * as React from "react"
import { ArrowUpRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { BillDrop } from "@/components/mock/bento-bill-drop"
import { ExpenseFeed } from "@/components/mock/bento-expense-feed"
import { IntegrationOrbit } from "@/components/mock/bento-integrations"
import { AutoLedger } from "@/components/mock/bento-ledger"
import { TreasuryCard } from "@/components/mock/bento-treasury"
import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { BENTO } from "@/content/home-top"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * One cell of the bento: the product's name in ink and what it does in
 * grey, a small square link to its page, and a working mockup below. The
 * card lifts a little under the pointer and the arrow leans toward its page.
 */
export function BentoCard({
  title,
  continuation,
  href = "/platform",
  className,
  bodyClassName,
  children,
}: {
  title: string
  continuation?: string
  href?: string
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <article
      className={cn(
        "group/bento relative flex flex-col overflow-hidden rounded-(--radius-panel) bg-panel shadow-(--shadow-hairline) transition-shadow duration-(--duration-swap) ease-(--ease-out-strong) hover:shadow-(--shadow-float)",
        className,
      )}
    >
      <header className="flex items-start justify-between gap-4 p-5 sm:p-7">
        <h3 className="type-head max-w-[17ch] text-[22px] leading-tight tracking-[-0.025em] text-ink sm:text-h4">
          {title} <span className="text-ink-soft">{continuation}</span>
        </h3>
        <Link
          href={href}
          aria-label={`More about ${title}`}
          className="-m-2 grid size-11 shrink-0 place-items-center"
        >
          <span className="grid size-8 place-items-center rounded-(--radius-field) bg-raised text-ink shadow-(--shadow-xs) transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/bento:translate-x-0.5 group-hover/bento:-translate-y-0.5">
            <ArrowUpRight className="size-4" strokeWidth={1.8} />
          </span>
        </Link>
      </header>
      <div className={cn("relative flex-1", bodyClassName)}>{children}</div>
    </article>
  )
}

/** What's in it: five products, each shown doing its job. */
export function PlatformBento() {
  const c = BENTO.cards
  return (
    <section id="platform" className="pt-(--spacing-section)">
      <Container>
        <div className="flex flex-col items-start gap-6">
          <SectionHeading title={BENTO.title} continuation={BENTO.continuation} size="h1" />
          <Reveal delay={0.1}>
            <ButtonLink href="/pricing" size="lg">{BENTO.cta}</ButtonLink>
          </Reveal>
        </div>

        <div className="mt-12 grid gap-4 lg:grid-cols-2">
          <Reveal>
            <BentoCard {...c.cards} className="h-[460px] sm:h-[540px]">
              <ExpenseFeed />
            </BentoCard>
          </Reveal>
          <Reveal delay={0.08}>
            <BentoCard {...c.procure} className="h-[460px] sm:h-[540px]" bodyClassName="pl-5 sm:pl-7">
              <BillDrop />
            </BentoCard>
          </Reveal>
        </div>

        <div className="mt-4 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Reveal>
            <BentoCard {...c.accounting} className="h-[440px]" bodyClassName="flex items-end px-5 sm:px-7">
              <AutoLedger className="w-full" />
            </BentoCard>
          </Reveal>
          <Reveal delay={0.06}>
            <BentoCard {...c.treasury} className="h-[440px]" bodyClassName="flex items-end px-5 sm:px-7">
              <TreasuryCard className="w-full" />
            </BentoCard>
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-2 lg:col-span-1">
            <BentoCard {...c.integrations} className="h-[440px]" bodyClassName="flex items-center px-5 pb-6">
              <IntegrationOrbit className="max-w-[300px]" />
            </BentoCard>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
