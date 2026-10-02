import { FileText, Mail, Search, SquareCheckBig, TrendingUp, Calendar, User } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

function Panel({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`relative flex h-[260px] items-center justify-center overflow-hidden rounded-[var(--radius-card)] bg-gradient-to-b from-sky-500 to-sky-200 sm:h-[312px] ${className ?? ""}`}>
      {children}
    </div>
  )
}

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

/** Three things the assistant does, each shown in a panel of sky and told in
 *  one line underneath. */
export function Assistant() {
  return (
    <section id="assistant" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="An assistant that does the work, not just the talking" description="Meadow learns how you work and takes care of the busywork — updating records, summarising meetings and keeping everything connected." />
        </Reveal>
        <div className="mt-8 grid gap-5 md:grid-cols-[1fr_1.7fr_1fr]">
          <Reveal delay={0.05}>
            <Panel>
              <ul className="w-[200px] rounded-lg bg-surface p-1.5 text-[11px] shadow-lift">
                {ACTIONS.map(({ icon: Icon, label }, i) => (
                  <li key={label} className={`flex items-center gap-2 rounded-md px-2 py-1.5 ${i === 0 ? "bg-sky-100 text-sky-600" : "text-ink-700"}`}>
                    <Icon className="size-3" /> {label}
                  </li>
                ))}
              </ul>
            </Panel>
            <Caption title="Takes actions for you" />
          </Reveal>
          <Reveal delay={0.12}>
            <Panel>
              <div className="w-[min(100%,380px)] -rotate-2 rounded-xl bg-surface/95 p-4 shadow-lift [mask-image:linear-gradient(to_bottom,black_55%,transparent)]">
                <p className="flex items-center gap-2 border-b border-ink-100 pb-3 text-[13px] text-ink-700"><Search className="size-3.5" /> What did Tomás say about the term sheet?</p>
                <div className="mt-3 flex flex-col gap-3 text-[12px]">
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-sky-100 text-sky-600"><User className="size-4" /></span><div><p className="font-semibold">Tomás Reyes</p><p className="text-ink-500">Partner at Orchard Capital</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-teal/20 text-teal"><Mail className="size-4" /></span><div><p className="font-semibold">Re: Series A term sheet</p><p className="text-ink-500">From tomas@orchard.example · 2h ago</p></div></div>
                  <div className="flex items-center gap-3"><span className="grid size-8 place-items-center rounded-lg bg-ink-100 text-ink-500"><FileText className="size-4" /></span><div><p className="font-semibold">Board update — Q4</p><p className="text-ink-500">Document</p></div></div>
                </div>
              </div>
            </Panel>
            <Caption title="Finds anything" body="search mail, people, meetings and files in plain language." />
          </Reveal>
          <Reveal delay={0.19}>
            <Panel>
              <div className="flex w-[230px] gap-2 text-[11px]">
                <div className="w-[112px] -rotate-3 rounded-lg bg-surface p-2.5 shadow-lift"><p className="font-semibold">Fernhill</p><p className="text-ink-500">$2.5M</p><p className="mt-3 font-semibold">Tallow</p><p className="text-ink-500">$90K</p></div>
                <div className="w-[112px] rounded-lg bg-surface/80 p-2.5 shadow-card"><p className="font-semibold">Proposal sent</p><p className="mt-5 font-medium text-sky-600">Drop here</p></div>
              </div>
            </Panel>
            <Caption title="Keeps records current" />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
