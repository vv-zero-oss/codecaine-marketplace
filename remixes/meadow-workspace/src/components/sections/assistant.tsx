import { Calendar, Check, FileText, Mail, Search, SquareCheckBig, TrendingUp, User } from "lucide-react"

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
  { icon: Mail, label: "Send email" },
  { icon: SquareCheckBig, label: "Create task" },
  { icon: TrendingUp, label: "Update deal" },
  { icon: Calendar, label: "Schedule meeting" },
  { icon: Search, label: "Search contacts" },
  { icon: FileText, label: "Write document" },
]

const COLUMNS = [
  { name: "Proposal sent", cards: [["Fernhill", "$2.5M", true], ["Tallow", "$90K", false]] },
  { name: "Negotiating", cards: [["Orchard Row", "$48K", false]] },
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
          <SectionHeading title="An assistant that does the work, not just the talking" description="Meadow learns how you work and takes care of the busywork — updating records, summarising meetings and keeping everything connected." />
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
                Email sent to <strong className="font-semibold">Noor Haddad</strong>
              </p>
            </SkyPanel>
            <Caption title="Takes actions for you" body="from a sentence, with a receipt for each." />
          </Reveal>
          <Reveal delay={0.12}>
            <SkyPanel className="h-[300px] sm:h-[340px]">
              <div className="absolute inset-x-[16%] top-[58%] h-24 -rotate-2 rounded-xl bg-surface/60 shadow-card" />
              <div className="relative w-[min(88%,400px)] -rotate-2 rounded-xl bg-surface p-4 shadow-lift">
                <p className="flex items-center gap-2 border-b border-ink-100 pb-3 text-[13px] text-ink-700"><Search className="size-3.5" /> What did Tomás say about the term sheet?</p>
                <div className="mt-3 flex flex-col gap-3 text-[12px]">
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-sky-100 text-sky-600"><User className="size-4" /></span><div><p className="font-semibold">Tomás Reyes</p><p className="text-ink-500">Partner at Orchard Capital</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-teal/20 text-teal"><Mail className="size-4" /></span><div><p className="font-semibold">Re: Series A term sheet</p><p className="text-ink-500">From tomas@orchard.example · 2h ago</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-ink-100 text-ink-500"><FileText className="size-4" /></span><div><p className="font-semibold">Board update — Q4</p><p className="text-ink-500">Document · edited yesterday</p></div></div>
                </div>
              </div>
            </SkyPanel>
            <Caption title="Finds anything" body="search mail, people, meetings and files in plain language." />
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
                    {ci === 1 ? <p className="rounded-md border border-dashed border-sky-500 px-2 py-3 text-center font-medium text-sky-600">Drop here</p> : null}
                  </div>
                ))}
              </div>
            </SkyPanel>
            <Caption title="Keeps records current" body="stages move as the thread does." />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
