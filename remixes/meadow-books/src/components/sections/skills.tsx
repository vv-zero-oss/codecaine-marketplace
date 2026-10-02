import {
  BadgePercent, BellRing, BookCheck, CalendarCheck, Calculator, FileSearch, Landmark, LineChart, MessageSquareText, ReceiptText, ScanText, Send, Sparkles, Split, TrendingUp, Users, Wallet,
} from "lucide-react"
import { useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Skill = { icon: React.ComponentType<{ className?: string }>; title: string; body: string; tone: string }

const GROUPS: Record<string, Skill[]> = {
  Featured: [
    { icon: ScanText, title: "Receipt capture", body: "Snap or forward a receipt and it is read, coded and matched to the payment.", tone: "bg-apricot/20 text-apricot" },
    { icon: Sparkles, title: "Smart categorisation", body: "Learns your chart of accounts and codes every new transaction to match.", tone: "bg-lilac/20 text-lilac" },
    { icon: BellRing, title: "Invoice chaser", body: "Sends polite, well-timed reminders for anything overdue and logs the replies.", tone: "bg-coral/15 text-coral" },
    { icon: Landmark, title: "Bank reconciliation", body: "Matches every bank line to your books and holds back the ones that don't fit.", tone: "bg-sky-100 text-sky-600" },
    { icon: BookCheck, title: "Month-end close", body: "Runs the checklist: accruals, depreciation, reconciliations and review notes.", tone: "bg-teal/20 text-teal" },
    { icon: BadgePercent, title: "Tax set-aside", body: "Works out what to hold back for tax as income arrives, so April holds no surprises.", tone: "bg-ink-100 text-ink-700" },
  ],
  Bookkeeping: [
    { icon: Split, title: "Split transactions", body: "Divides one payment across categories, projects or clients from a sentence.", tone: "bg-lilac/20 text-lilac" },
    { icon: FileSearch, title: "Duplicate finder", body: "Spots double charges and repeated bills before they reach the ledger.", tone: "bg-coral/15 text-coral" },
    { icon: Calculator, title: "Journal drafter", body: "Drafts accruals and adjustments with the reasoning written beside them.", tone: "bg-teal/20 text-teal" },
  ],
  Invoicing: [
    { icon: Send, title: "Invoice from a message", body: "Turn “bill Tallow for March retainer” into a sent invoice.", tone: "bg-sky-100 text-sky-600" },
    { icon: BellRing, title: "Payment reminders", body: "Escalates reminders on a schedule you set, in a tone you approve.", tone: "bg-coral/15 text-coral" },
    { icon: ReceiptText, title: "Recurring billing", body: "Repeats invoices and keeps revenue recognised in the right month.", tone: "bg-apricot/20 text-apricot" },
  ],
  Tax: [
    { icon: BadgePercent, title: "Sales tax tracker", body: "Applies the right rate per line and totals it for each filing period.", tone: "bg-ink-100 text-ink-700" },
    { icon: CalendarCheck, title: "Deadline watch", body: "Counts down to every filing and tells you what is still missing.", tone: "bg-lilac/20 text-lilac" },
    { icon: Calculator, title: "Deduction finder", body: "Flags expenses that are commonly missed and asks before claiming.", tone: "bg-teal/20 text-teal" },
  ],
  Payroll: [
    { icon: Users, title: "Payroll journals", body: "Posts each pay run to the right accounts with taxes split out.", tone: "bg-sky-100 text-sky-600" },
    { icon: Wallet, title: "Contractor payments", body: "Tracks contractor spend and prepares year-end summaries.", tone: "bg-apricot/20 text-apricot" },
    { icon: TrendingUp, title: "Headcount cost", body: "Shows the true cost of each role, benefits and tax included.", tone: "bg-teal/20 text-teal" },
  ],
  Reporting: [
    { icon: LineChart, title: "Plain-English P&L", body: "Explains what moved this month and why, in a few sentences.", tone: "bg-sky-100 text-sky-600" },
    { icon: TrendingUp, title: "Cash forecast", body: "Projects the next 90 days from invoices, bills and past patterns.", tone: "bg-teal/20 text-teal" },
    { icon: MessageSquareText, title: "Variance explainer", body: "Answers “why did costs rise in March?” with the lines behind it.", tone: "bg-lilac/20 text-lilac" },
  ],
  "Month-end": [
    { icon: BookCheck, title: "Close checklist", body: "A live list of what is left, who owns it and what is blocking it.", tone: "bg-teal/20 text-teal" },
    { icon: Landmark, title: "Accrual suggestions", body: "Proposes accruals and prepayments from contracts and bills.", tone: "bg-apricot/20 text-apricot" },
    { icon: FileSearch, title: "Review pack", body: "Builds the package your accountant reads — variances, flags and sign-offs.", tone: "bg-sky-100 text-sky-600" },
  ],
}

const QUICK = [
  ["Ask the books", "Ask a question about spend, income or cash and get the lines behind it."],
  ["Find duplicates", "Scan the last quarter for double charges and repeated bills."],
  ["Explain a variance", "See why a category moved and which vendors drove it."],
  ["Draft a journal", "Write an accrual or adjustment with the reasoning attached."],
  ["Forecast cash", "Project the next 90 days from what is owed and what is due."],
  ["Summarise P&L", "A short, plain-English read of the month for the board or bank."],
  ["Chase overdue", "Send reminders for every invoice past its due date."],
  ["Attach receipt", "Match a loose receipt to the right transaction."],
]

/** Filterable skill cards: the tab picks a group, the grid below follows. */
export function Skills() {
  const [group, setGroup] = useState("Featured")
  return (
    <section id="skills" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Skills that run the routine work" description="Meadow works in the background so the books stay current. Automate the repetitive, hand off the tedious, and keep the judgement for yourself." />
        </Reveal>
        <Reveal delay={0.08} className="mt-7">
          <Tabs value={group} onValueChange={setGroup}>
            <TabsList className="-mx-2 overflow-x-auto px-2 pb-1" aria-label="Skill groups">
              {Object.keys(GROUPS).map((name) => (
                <TabsTrigger key={name} value={name} className="min-h-9">
                  {name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          <ul key={group} className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {GROUPS[group].map(({ icon: Icon, title, body, tone }, i) => (
              <li
                key={title}
                style={{ animationDelay: `${i * 45}ms` }}
                className="group flex gap-3 rounded-[var(--radius-card)] bg-surface p-4 shadow-card transition-[box-shadow,transform] duration-200 ease-out [animation:rise_420ms_var(--ease-out)_both] hover:-translate-y-0.5 hover:shadow-lift"
              >
                <span className={`grid size-8 shrink-0 place-items-center rounded-lg ${tone}`}><Icon className="size-4" /></span>
                <div>
                  <h3 className="text-[14px] font-semibold tracking-tight">{title}</h3>
                  <p className="mt-1 text-[13px] leading-snug text-ink-500">{body}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
        <Reveal className="mt-10">
          <ul className="grid gap-x-6 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            {QUICK.map(([title, body]) => (
              <li key={title} className="flex flex-col gap-1.5">
                <h3 className="flex items-center gap-2 text-[13px] font-semibold"><Sparkles className="size-3.5 text-sky-500" aria-hidden="true" />{title}</h3>
                <p className="line-clamp-2 text-[13px] leading-snug text-ink-500">{body}</p>
              </li>
            ))}
          </ul>
        </Reveal>
      </Container>
    </section>
  )
}
