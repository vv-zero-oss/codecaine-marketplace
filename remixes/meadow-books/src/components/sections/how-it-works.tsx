import { ArrowRight, Check, CreditCard, Landmark, Users, Wallet } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SkyPanel } from "@/components/ui/sky-panel"

const TOOLS = [["Bank", Landmark], ["Cards", CreditCard], ["Payments", Wallet], ["Payroll", Users]] as const

function ConnectVisual() {
  return (
    <div className="flex w-[230px] flex-col gap-2.5">
      <div className="grid grid-cols-2 gap-2">
        {TOOLS.map(([name, Icon]) => (
          <span key={name} className="relative flex items-center gap-2 rounded-lg bg-surface px-2.5 py-2.5 text-[12px] font-medium shadow-lift">
            <Icon className="size-3.5 text-ink-500" />{name}
            <span className="absolute -top-1.5 -right-1.5 grid size-4 place-items-center rounded-full bg-leaf text-white"><Check className="size-2.5" strokeWidth={3} /></span>
          </span>
        ))}
      </div>
      <span className="mx-auto rounded-full bg-surface/90 px-3 py-1 text-[11px] font-medium text-ink-700 shadow-card">Read-only · 4 sources linked</span>
    </div>
  )
}

function CodeVisual() {
  return (
    <div className="w-[250px] rounded-xl bg-surface p-3.5 text-[12px] shadow-lift">
      <p className="flex items-center justify-between"><span className="font-semibold">Blue Bottle Coffee</span><span className="tabular-nums text-ink-500">$18.50</span></p>
      <div className="mt-3 flex items-center gap-2">
        <span className="rounded-md bg-ink-100 px-2 py-1 text-ink-500">Uncategorised</span>
        <ArrowRight className="size-3.5 text-ink-400" />
        <span className="rounded-md bg-apricot/20 px-2 py-1 font-semibold text-apricot">Meals</span>
        <span className="ml-auto text-[11px] text-ink-400">98%</span>
      </div>
      <span className="mt-3 block h-1.5 overflow-hidden rounded-full bg-ink-100"><span className="block h-full w-[98%] rounded-full bg-sky-500" /></span>
    </div>
  )
}

function CloseVisual() {
  return (
    <div className="w-[240px] rounded-xl bg-surface p-3.5 text-[12px] shadow-lift">
      <ul className="flex flex-col gap-2">
        {[["128 entries posted", true], ["Bank accounts reconciled", true], ["3 flagged for review", false]].map(([r, ok]) => (
          <li key={r as string} className="flex items-center gap-2.5">
            <span className={ok ? "grid size-4 place-items-center rounded-full bg-leaf/15 text-leaf" : "grid size-4 place-items-center rounded-full bg-coral/15 text-coral"}>{ok ? <Check className="size-2.5" strokeWidth={3} /> : "!"}</span>
            <span className="font-medium">{r as string}</span>
          </li>
        ))}
      </ul>
      <span className="mt-3 flex h-8 items-center justify-center rounded-lg bg-ink-900 font-medium text-white shadow-button">Close March</span>
    </div>
  )
}

const STEPS = [
  { visual: <ConnectVisual />, title: "Connect your accounts", body: "Link your bank, cards, payment processor and payroll with read-only access. Meadow pulls in history and builds your ledger in the background." },
  { visual: <CodeVisual />, title: "Meadow codes and matches", body: "Each transaction is read, categorised and matched to its receipt or invoice. Anything unusual is held back with a note, never guessed." },
  { visual: <CloseVisual />, title: "Review and close the month", body: "You see exceptions first, approve in a click, and close with every entry traceable. Your accountant gets a tidy file." },
]

/** Three steps in the order a new customer lives them, each drawn on sky.
 *  The band behind it is a shade lighter than the page so the section reads
 *  as its own chapter. */
export function HowItWorks() {
  return (
    <section id="how" className="bg-page px-2 sm:px-3">
      <div className="rounded-[var(--radius-section)] bg-surface py-14 shadow-card sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading align="center" title="How it works" description="From first bank connection to a closed month in three steps." />
        </Reveal>
        <ol className="mt-10 grid gap-5 md:grid-cols-3">
          {STEPS.map(({ visual, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="flex h-full flex-col gap-5">
                  <SkyPanel className="h-[220px]">
                    {visual}
                    <span className="absolute top-3 left-3 grid size-7 place-items-center rounded-full bg-ink-900 text-[12px] font-semibold text-white tabular-nums shadow-button">{i + 1}</span>
                  </SkyPanel>
                  <div className="px-1">
                    <h3 className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em] text-balance">{title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
      </div>
    </section>
  )
}
