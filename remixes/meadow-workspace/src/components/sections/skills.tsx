import {
  BellRing, BarChart3, Boxes, CalendarCheck, FlaskConical, Mail, MessageSquareText, Search, Sun, Sparkles, UserSearch, NotebookPen, Inbox, Handshake, ListChecks,
} from "lucide-react"
import { useState } from "react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

type Skill = { icon: React.ComponentType<{ className?: string }>; title: string; body: string; tone: string }

const GROUPS: Record<string, Skill[]> = {
  Featured: [
    { icon: Sun, title: "Morning briefing", body: "Start the day with your calendar, priorities and unread mail in one summary.", tone: "bg-apricot/20 text-apricot" },
    { icon: BellRing, title: "Follow-up finder", body: "Surface the mail, tasks and meetings that still need a nudge.", tone: "bg-coral/15 text-coral" },
    { icon: Inbox, title: "Inbox triage", body: "Sort unread mail by priority and suggest quick replies.", tone: "bg-sky-100 text-sky-600" },
    { icon: BarChart3, title: "Weekly recap", body: "A full-week summary of meetings, wins, tasks and goals.", tone: "bg-teal/20 text-teal" },
    { icon: CalendarCheck, title: "Meeting prep", body: "A briefing on who is attending, recent threads and open items.", tone: "bg-lilac/20 text-lilac" },
    { icon: FlaskConical, title: "Contact research", body: "Look up new contacts and fill in their profiles automatically.", tone: "bg-ink-100 text-ink-700" },
  ],
  Founders: [
    { icon: Handshake, title: "Investor update", body: "Draft the monthly note from real numbers and shipped work.", tone: "bg-lilac/20 text-lilac" },
    { icon: ListChecks, title: "Hiring pipeline", body: "Keep candidates, interviews and feedback in one moving list.", tone: "bg-teal/20 text-teal" },
    { icon: Boxes, title: "Launch tracker", body: "Watch every launch task, owner and blocker from one board.", tone: "bg-apricot/20 text-apricot" },
  ],
  Sales: [
    { icon: UserSearch, title: "Lead enrichment", body: "Add company, role and recent news to each new lead.", tone: "bg-sky-100 text-sky-600" },
    { icon: Mail, title: "Sequence writer", body: "Draft a warm, specific outreach sequence per account.", tone: "bg-coral/15 text-coral" },
    { icon: BarChart3, title: "Pipeline review", body: "See which deals moved, stalled or need a decision.", tone: "bg-teal/20 text-teal" },
  ],
  Personal: [
    { icon: NotebookPen, title: "Daily notes", body: "Collect the day's decisions and thoughts into one page.", tone: "bg-apricot/20 text-apricot" },
    { icon: CalendarCheck, title: "Focus blocks", body: "Protect long stretches of time for deep work.", tone: "bg-sky-100 text-sky-600" },
    { icon: Sun, title: "Evening wind-down", body: "Close open loops and queue tomorrow's first task.", tone: "bg-lilac/20 text-lilac" },
  ],
  Mail: [
    { icon: Inbox, title: "Inbox triage", body: "Sort unread mail by priority and suggest quick replies.", tone: "bg-sky-100 text-sky-600" },
    { icon: MessageSquareText, title: "Thread summary", body: "A clear summary of any long thread, with the ask on top.", tone: "bg-teal/20 text-teal" },
    { icon: BellRing, title: "Follow-up finder", body: "Surface the mail that still needs a nudge.", tone: "bg-coral/15 text-coral" },
  ],
  CRM: [
    { icon: UserSearch, title: "Contact research", body: "Fill in new contacts from public sources.", tone: "bg-ink-100 text-ink-700" },
    { icon: Handshake, title: "Deal updater", body: "Move deals forward from what was said in the thread.", tone: "bg-apricot/20 text-apricot" },
    { icon: BarChart3, title: "Account health", body: "Spot quiet accounts before they go cold.", tone: "bg-teal/20 text-teal" },
  ],
  Projects: [
    { icon: ListChecks, title: "Standup digest", body: "What moved, what is blocked, what is next — every morning.", tone: "bg-sky-100 text-sky-600" },
    { icon: Boxes, title: "Scope check", body: "Flag work that has grown past what was agreed.", tone: "bg-coral/15 text-coral" },
    { icon: CalendarCheck, title: "Milestone planner", body: "Turn a goal into dated milestones and owners.", tone: "bg-lilac/20 text-lilac" },
  ],
}

const QUICK = [
  ["Prep me", "Get ready for your next meeting with a short briefing."],
  ["Draft email", "Write a professional reply based on the thread."],
  ["Research person", "Pull together a background on anyone you name."],
  ["Summarise thread", "A clear summary of any long conversation."],
  ["Intro", "Write a warm introduction connecting two people."],
  ["Research", "Go deep on a company, topic or market."],
  ["What did I do", "Recap what you have been working on."],
  ["Find all", "Build lists of entities that match a description."],
]

/** Filterable skill cards: the tab picks a group, the grid below follows. */
export function Skills() {
  const [group, setGroup] = useState("Featured")
  return (
    <section id="skills" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Skills and automations that keep work growing" description="Meadow works in the background so you can focus. Automate the repetitive, hand off the tedious." />
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
