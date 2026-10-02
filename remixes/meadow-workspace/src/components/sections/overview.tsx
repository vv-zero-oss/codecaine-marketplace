import { CalendarDays, Contact, FolderKanban, Inbox, Mail, MessagesSquare, Paperclip, ChevronDown } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

const FEATURES = [
  {
    id: "mail",
    icon: Inbox,
    title: "Mail & messages",
    body: "A fast, friendly inbox that sorts itself. Snippets, split views, keyboard shortcuts, undo send and read receipts — all built for speed.",
    replaces: [Mail, MessagesSquare],
  },
  { id: "people", icon: Contact, title: "Customers & contacts", body: "Every person and company you deal with, filled in from the threads you already have — no data entry, no stale records." },
  { id: "meetings", icon: CalendarDays, title: "Meetings", body: "Walk in with a briefing and walk out with notes, follow-ups and tasks already filed where they belong." },
  { id: "projects", icon: FolderKanban, title: "Projects", body: "Boards, lists and docs that stay linked to the conversations they came from, so nothing loses its context." },
]

const THREAD = [
  { who: "You", to: "Noor Haddad", text: "Reviewed the plan — the pricing slide needs the new tiers and the Q3 forecast. Can you update before Friday?", time: "Mar 10" },
  { who: "Noor Haddad", to: "You", text: "Done. Pricing now shows the three tiers, forecast refreshed with the March numbers. Ready for a last look.", time: "10:24 AM", tag: "Needs reply" },
]

function MailPanel() {
  return (
    <div className="flex w-full max-w-[320px] flex-col gap-2 text-[11px] text-ink-900">
      {THREAD.map((m) => (
        <div key={m.who} className="rounded-lg bg-surface p-3 leading-snug shadow-lift">
          <div className="mb-1.5 flex items-center gap-1.5">
            <span className="font-semibold">{m.who}</span>
            <span className="text-ink-400">to {m.to}</span>
            {m.tag ? <span className="ml-auto rounded bg-apricot/20 px-1.5 py-0.5 text-[9px] font-medium text-ink-700">{m.tag}</span> : <span className="ml-auto text-ink-400">{m.time}</span>}
          </div>
          {m.text}
        </div>
      ))}
      <div className="rounded-lg bg-surface p-3 shadow-lift">
        <p className="mb-1.5 text-ink-400">To <span className="font-semibold text-ink-900">Noor Haddad</span></p>
        <p>Looks great — sending it to the board now. Thanks for turning it around.</p>
        <div className="mt-2 flex items-center gap-2">
          <span className="inline-flex h-6 items-center gap-1 rounded bg-sky-600 px-2 font-medium text-white">Send <ChevronDown className="size-3" /></span>
          <Paperclip className="size-3.5 text-ink-400" />
        </div>
      </div>
    </div>
  )
}

function ListPanel({ rows }: { rows: { label: string; meta: string; tone: string }[] }) {
  return (
    <ul className="flex w-full max-w-[300px] flex-col gap-2 text-[12px]">
      {rows.map((r) => (
        <li key={r.label} className="flex items-center gap-2.5 rounded-lg bg-surface p-3 shadow-lift">
          <span className={cn("size-2 rounded-full", r.tone)} />
          <span className="font-medium">{r.label}</span>
          <span className="ml-auto text-ink-400">{r.meta}</span>
        </li>
      ))}
    </ul>
  )
}

const PANELS: Record<string, React.ReactNode> = {
  mail: <MailPanel />,
  people: <ListPanel rows={[
    { label: "Noor Haddad", meta: "Head of Growth", tone: "bg-teal" },
    { label: "Tomás Reyes", meta: "Investor", tone: "bg-lilac" },
    { label: "Fernhill Co.", meta: "Series A", tone: "bg-apricot" },
  ]} />,
  meetings: <ListPanel rows={[
    { label: "Board prep", meta: "9:30", tone: "bg-sky-500" },
    { label: "Customer call — Tallow", meta: "11:00", tone: "bg-leaf" },
    { label: "Weekly review", meta: "16:00", tone: "bg-coral" },
  ]} />,
  projects: <ListPanel rows={[
    { label: "Launch checklist", meta: "6 of 9", tone: "bg-leaf" },
    { label: "Pricing page refresh", meta: "In review", tone: "bg-apricot" },
    { label: "Partner onboarding", meta: "Next week", tone: "bg-periwinkle" },
  ]} />,
}

/**
 * Four jobs, one list. The open item shows what it does and the panel on the
 * right shows it happening; the others stay as quiet titles until chosen.
 */
export function Overview() {
  const [active, setActive] = useState("mail")
  const reduce = useReducedMotion()
  useCanvasAction("Overview tab", (next) => setActive(typeof next === "string" ? next : "mail"), { group: "Overview" })

  return (
    <section id="overview" className="bg-page py-16 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading title="Everything in one clearing" description="Everything you need to talk to people, keep track of relationships and finish the work." />
        </Reveal>
        <Reveal delay={0.08} className="mt-8">
          <Tabs value={active} onValueChange={setActive} orientation="vertical" className="grid overflow-hidden rounded-[var(--radius-card)] bg-surface-muted shadow-lift md:grid-cols-2">
            <TabsList className="flex-col gap-0 p-6 sm:p-8 md:py-10" aria-label="Product areas">
              {FEATURES.map((f) => {
                const open = f.id === active
                const Icon = f.icon
                return (
                  <TabsTrigger
                    key={f.id}
                    value={f.id}
                    className="group h-auto w-full flex-col items-stretch gap-0 rounded-none border-b border-ink-100 bg-transparent px-1 py-4 text-left last:border-b-0 hover:bg-transparent data-[state=active]:bg-transparent"
                  >
                    <span className={cn("flex items-center gap-3 font-display text-[20px] font-semibold tracking-[-0.02em] transition-colors duration-200", open ? "text-ink-900" : "text-ink-500")}>
                      <Icon className="size-4 shrink-0 text-ink-500" strokeWidth={1.75} />
                      {f.title}
                    </span>
                    <motion.span
                      initial={false}
                      animate={{ height: open ? "auto" : 0, opacity: open ? 1 : 0 }}
                      transition={{ duration: reduce ? 0 : 0.35, ease: [0.23, 1, 0.32, 1] }}
                      className="block overflow-hidden"
                    >
                      <span className="mt-2 block pl-7 text-[14px] leading-[1.7] font-normal text-wrap text-ink-500">{f.body}</span>
                      {f.replaces ? (
                        <span className="mt-3 flex items-center gap-2 pl-7 text-[12px] text-ink-500">
                          Replaces
                          {f.replaces.map((R, i) => (
                            <span key={i} className="grid size-5 place-items-center rounded-md bg-surface shadow-card"><R className="size-3" /></span>
                          ))}
                        </span>
                      ) : null}
                    </motion.span>
                  </TabsTrigger>
                )
              })}
            </TabsList>
            <div className="relative flex min-h-[300px] items-center justify-center overflow-hidden bg-gradient-to-b from-sky-500 to-sky-100 p-6 md:min-h-[400px]">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active}
                  initial={reduce ? false : { opacity: 0, y: 12, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={reduce ? undefined : { opacity: 0, y: -8, filter: "blur(4px)" }}
                  transition={{ duration: 0.28, ease: [0.23, 1, 0.32, 1] }}
                  className="flex w-full justify-center"
                >
                  {PANELS[active]}
                </motion.div>
              </AnimatePresence>
            </div>
          </Tabs>
        </Reveal>
      </Container>
    </section>
  )
}
