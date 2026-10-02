import { ArrowLeftRight, Check, FileText, Landmark, Receipt, Search, Send, TrendingUp, FileBarChart } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SkyPanel } from "@/components/ui/sky-panel"
import { cn } from "@/lib/utils"

function Caption({ title, body }: { title: string; body?: string }) {
  return (
    <p className="mt-4 text-[13px] leading-snug text-ink-500">
      <strong className="font-semibold text-ink-900">{title}</strong>
      {body ? <> — {body}</> : null}
    </p>
  )
}

const ACTIONS = [
  { icon: ArrowLeftRight, label: "Categorise transactions" },
  { icon: Send, label: "Send invoice" },
  { icon: TrendingUp, label: "Chase payment" },
  { icon: Landmark, label: "Reconcile account" },
  { icon: FileText, label: "Draft journal entry" },
  { icon: FileBarChart, label: "Export report" },
]

const COLUMNS = [
  { name: "Needs review", cards: [["Figma", "$45 · duplicate?", true], ["AWS", "+38% vs. avg", false]] },
  { name: "Posted", cards: [["Stripe payout", "$4,210", false]] },
]

/** Three things the assistant does, each shown on sky with the product doing
 *  it. The panels are tall and layered — a menu with its result beneath it, a
 *  search with a second result peeking, a board with a card mid-drag — so none
 *  of them is a lone card on an empty field. */
export function Assistant() {
  return (
    <section id="assistant" className="bg-page py-14 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading title="An assistant that does the books, not just the talking" description="Meadow learns how your business works and takes care of the routine — coding, matching and chasing — while showing its reasoning on every entry." />
        </Reveal>
        <div className="mt-9 grid gap-5 md:grid-cols-[1fr_1.7fr_1fr]">
          <Reveal delay={0.05}>
            <SkyPanel className="h-[300px] flex-col gap-3 sm:h-[340px]">
              <ul className="w-[210px] rounded-xl bg-surface p-1.5 text-[12px] shadow-lift">
                {ACTIONS.map(({ icon: Icon, label }, i) => (
                  <li key={label} className={cn("flex items-center gap-2.5 rounded-lg px-2.5 py-2", i === 0 ? "bg-sky-100 text-sky-600" : "text-ink-700")}>
                    <Icon className="size-3.5" /> {label}
                  </li>
                ))}
              </ul>
              <p className="flex w-[210px] items-center gap-2 rounded-lg bg-surface/95 px-3 py-2 text-[11px] shadow-lift">
                <span className="grid size-4 place-items-center rounded-full bg-leaf text-white"><Check className="size-2.5" strokeWidth={3} /></span>
                Invoice #1043 sent to <strong className="font-semibold">Tallow</strong>
              </p>
            </SkyPanel>
            <Caption title="Takes actions for you" body="from a sentence, with an audit trail for each." />
          </Reveal>
          <Reveal delay={0.12}>
            <SkyPanel className="h-[300px] sm:h-[340px]">
              <div className="absolute inset-x-[16%] top-[58%] h-24 -rotate-2 rounded-xl bg-surface/60 shadow-card" />
              <div className="relative w-[min(88%,400px)] -rotate-2 rounded-xl bg-surface p-4 shadow-lift">
                <p className="flex items-center gap-2 border-b border-ink-100 pb-3 text-[13px] text-ink-700"><Search className="size-3.5" /> How much did we spend on software in Q1?</p>
                <div className="mt-3 flex flex-col gap-3 text-[12px]">
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-sky-100 text-sky-600"><Receipt className="size-4" /></span><div><p className="font-semibold">Software &amp; subscriptions · $8,420</p><p className="text-ink-500">Jan–Mar · up 6% on last quarter</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-teal/20 text-teal"><Landmark className="size-4" /></span><div><p className="font-semibold">Top vendor: Figma · $1,980</p><p className="text-ink-500">14 transactions · all receipts attached</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-ink-100 text-ink-500"><FileText className="size-4" /></span><div><p className="font-semibold">Q1 expenses report</p><p className="text-ink-500">Report · updated today</p></div></div>
                </div>
              </div>
            </SkyPanel>
            <Caption title="Answers anything" body="ask about spend, cash and customers in plain language." />
          </Reveal>
          <Reveal delay={0.19}>
            <SkyPanel className="h-[300px] sm:h-[340px]">
              <div className="flex w-[88%] gap-2 text-[11px]">
                {COLUMNS.map((col, ci) => (
                  <div key={col.name} className="flex flex-1 flex-col gap-2 rounded-lg bg-surface/70 p-2 shadow-card">
                    <p className="font-semibold text-ink-700">{col.name}</p>
                    {col.cards.map(([n, v, drag]) => (
                      <div key={n as string} className={cn("rounded-md bg-surface p-2 shadow-card", drag && "-rotate-3 shadow-lift")}>
                        <p className="font-semibold">{n}</p><p className="text-ink-500">{v}</p>
                      </div>
                    ))}
                    {ci === 1 ? <p className="rounded-md border border-dashed border-sky-500 px-2 py-3 text-center font-medium text-sky-600">Approve to post</p> : null}
                  </div>
                ))}
              </div>
            </SkyPanel>
            <Caption title="Keeps the books current" body="entries post, accounts reconcile, exceptions wait for you." />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
