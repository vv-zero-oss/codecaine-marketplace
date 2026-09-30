import { Car, CircleCheck, Download, Landmark, Link2, Files } from "lucide-react"
import type * as React from "react"

import { InsurerMonogram } from "@/components/blocks/mini-cards"
import { Reveal } from "@/components/motion/reveal"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

/** The three jobs Glovebox does, each shown as the thing it produces. */
export function HowItWorks() {
  return (
    <section id="how" className="py-[14svh] sm:py-[18svh]">
      <Container>
        <Reveal>
          <SectionHeading>How Glovebox works</SectionHeading>
        </Reveal>
        <div className="mt-12 grid gap-10 sm:mt-16 md:grid-cols-3 md:gap-4 lg:gap-6">
          <StepCard
            delay={0}
            title="Collects every policy"
            description="Connects to your insurers and reads your documents, so every car, driver and date lives in one place."
          >
            <CollectVisual />
          </StepCard>
          <StepCard
            delay={0.08}
            title="Shops every renewal"
            description="Weeks before a renewal, it prices your exact cover across 40+ insurers and shows what a switch would save."
          >
            <CompareVisual />
          </StepCard>
          <StepCard
            delay={0.16}
            title="Handles your claims"
            description="Files the claim, chases the insurer and books the repair, then tells you when the money lands."
          >
            <ClaimVisual />
          </StepCard>
        </div>
      </Container>
    </section>
  )
}

function StepCard({
  title,
  description,
  delay = 0,
  children,
}: {
  title: string
  description: string
  delay?: number
  children?: React.ReactNode
}) {
  return (
    <Reveal delay={delay} blur={0}>
      <article>
        <div className="grid aspect-[5/5.2] place-items-center rounded-step bg-sand p-5 sm:p-8 md:p-5 lg:p-10">
          {children}
        </div>
        <h3 className="mt-5 text-lg text-ink sm:text-xl">{title}</h3>
        <p className="mt-1.5 max-w-[40ch] text-[15px] leading-relaxed text-muted sm:text-base">{description}</p>
      </article>
    </Reveal>
  )
}

function Tile({ className, ...props }: React.ComponentProps<"div">) {
  return <div className={cn("rounded-tile bg-surface p-3.5 shadow-card sm:p-4", className)} {...props} />
}

/** A dashed thread with a status chip on it, joining two tiles. */
function Thread({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex flex-col items-center py-1" aria-hidden="false">
      <span className="h-3 border-l border-dashed border-faint" />
      {children}
      <span className="h-3 border-l border-dashed border-faint" />
    </div>
  )
}

function Money({ children, className }: { children: React.ReactNode; className?: string }) {
  return <span className={cn("font-mono text-[13px] text-money tabular sm:text-sm", className)}>{children}</span>
}

function CollectVisual() {
  return (
    <div className="w-full max-w-[21rem] text-[13px] sm:text-sm">
      <div className="relative">
        <div aria-hidden="true" className="absolute inset-x-3 -top-2 h-5 rounded-t-tile bg-surface/60" />
        <Tile className="relative">
          <div className="flex items-center justify-between">
            <span className="text-ink">Harbor Mutual</span>
            <Money>$96.40/mo</Money>
          </div>
          <div className="my-3 space-y-2" aria-hidden="true">
            <div className="border-t border-dashed border-hairline" />
            <div className="border-t border-dashed border-hairline" />
          </div>
          <p className="font-mono text-[12px] tracking-wide text-muted">HM 4471 209 5583</p>
        </Tile>
      </div>
      <Thread>
        <Chip tone="link">
          <Landmark />
          Imported
        </Chip>
      </Thread>
      <Tile>
        <div className="flex items-center justify-between gap-2">
          <span className="text-ink">Your garage</span>
          <Chip tone="money">
            <CircleCheck />2 cars covered
          </Chip>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-hairline pt-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[0.5rem] bg-check text-surface">
            <Car className="size-4" strokeWidth={1.8} />
          </span>
          <div className="min-w-0">
            <p className="text-ink">Subaru Outback</p>
            <p className="font-mono text-[11px] text-muted">7XKD 214</p>
          </div>
          <Money className="ml-auto text-ink">$500 excess</Money>
        </div>
      </Tile>
    </div>
  )
}

function CompareVisual() {
  return (
    <div className="w-full max-w-[21rem] text-[13px] sm:text-sm">
      <Tile className="mx-auto w-[90%]">
        <div className="flex items-center gap-3">
          <InsurerMonogram letter="N" className="size-9 rounded-[0.5rem] bg-link text-base" />
          <div className="min-w-0">
            <p className="text-ink">$892.00 quoted</p>
            <p className="text-[12px] text-muted">Northway Direct · like for like</p>
          </div>
          <span className="ml-auto self-start text-[11px] text-muted">Just now</span>
        </div>
      </Tile>
      <Thread>
        <Chip tone="link">
          <Link2 />
          Better price found
        </Chip>
      </Thread>
      <Tile>
        <div className="flex items-center justify-between border-b border-hairline pb-3">
          <span className="font-mono text-[13px] text-ink">RENEWAL HM-4471</span>
          <Chip tone="neutral" className="bg-surface">
            <Download />
            Quote
          </Chip>
        </div>
        <dl className="space-y-2 border-b border-hairline py-3">
          <div className="flex justify-between">
            <dt className="text-muted">Insurer today</dt>
            <dd className="text-ink">Harbor Mutual</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted">Renews</dt>
            <dd className="text-ink">Mar 27, 2027</dd>
          </div>
        </dl>
        <div className="flex items-center justify-between pt-3">
          <Money>−$312.00 a year</Money>
          <CircleCheck className="size-5 fill-check text-surface" />
        </div>
      </Tile>
    </div>
  )
}

function ClaimVisual() {
  const steps = [
    { label: "Photos sent", date: "Apr 2" },
    { label: "Repair booked", date: "Apr 4" },
    { label: "Payout received", date: "Apr 9" },
  ]
  return (
    <div className="w-full max-w-[21rem] text-[13px] sm:text-sm">
      <Tile>
        <div className="flex items-center gap-3">
          <InsurerMonogram letter="H" className="size-9 rounded-[0.5rem] text-base" />
          <span className="text-ink">Harbor Mutual</span>
          <Money className="ml-auto">+$340.00</Money>
        </div>
        <div className="mt-3 flex items-center gap-3 border-t border-hairline pt-3">
          <span className="grid size-9 shrink-0 place-items-center rounded-[0.5rem] bg-link-soft text-link">
            <Landmark className="size-4" strokeWidth={1.6} />
          </span>
          <div>
            <p className="text-ink">Checking 2209</p>
            <p className="text-[12px] text-muted">Paid Apr 9, 2027</p>
          </div>
        </div>
      </Tile>
      <Thread>
        <Chip tone="link">
          <Files />
          Claim settled
        </Chip>
      </Thread>
      <ul className="mx-auto w-[90%] space-y-1.5">
        {steps.map((step) => (
          <li key={step.label}>
            <Tile className="flex items-center gap-3 py-3 sm:py-3">
              <CircleCheck className="size-4 shrink-0 fill-check text-surface" />
              <span className="text-ink">{step.label}</span>
              <span className="ml-auto font-mono text-[12px] text-muted">{step.date}</span>
            </Tile>
          </li>
        ))}
      </ul>
    </div>
  )
}
