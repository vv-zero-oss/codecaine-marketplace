import { BarChart3, CalendarDays, Check, Contact, FileText, Layers, Mail, MessagesSquare, Sprout, SquareCheckBig, Timer } from "lucide-react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SkyPanel } from "@/components/ui/sky-panel"
import { cn } from "@/lib/utils"

const TOOLS = [Mail, MessagesSquare, CalendarDays, Contact, SquareCheckBig, FileText]

function ToolsVisual() {
  return (
    <div className="grid grid-cols-3 gap-2.5">
      {TOOLS.map((Icon, i) => (
        <span key={i} className={cn("grid size-12 place-items-center rounded-xl bg-surface text-ink-700 shadow-lift", i % 2 ? "translate-y-2 rotate-3" : "-rotate-3")}>
          <Icon className="size-5" strokeWidth={1.6} />
        </span>
      ))}
    </div>
  )
}

function HoursVisual() {
  const days = [["M", 46], ["T", 62], ["W", 38], ["T", 74], ["F", 54]] as const
  return (
    <div className="flex w-[220px] flex-col gap-3 rounded-xl bg-surface p-4 shadow-lift">
      <div className="flex items-center justify-between text-[11px]"><span className="flex items-center gap-1.5 font-semibold"><BarChart3 className="size-3.5 text-sky-600" />Time on busywork</span><span className="rounded bg-leaf/15 px-1.5 py-0.5 font-semibold text-leaf">−9 hrs</span></div>
      <div className="flex h-[68px] items-end gap-2">
        {days.map(([d, h], i) => (
          <div key={i} className="flex h-full flex-1 flex-col items-center justify-end gap-1.5">
            <span className={cn("w-full rounded-md", i === 3 ? "bg-sky-500" : "bg-sky-200")} style={{ height: `${h}%` }} />
            <span className="text-[10px] text-ink-400">{d}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

function SetupVisual() {
  const rows = [["Connect your inbox", true], ["Choose three skills", true], ["First morning briefing", false]] as const
  return (
    <div className="flex w-[220px] flex-col gap-2.5 rounded-xl bg-surface p-4 text-[12px] shadow-lift">
      {rows.map(([label, done]) => (
        <p key={label} className="flex items-center gap-2.5">
          <span className={cn("grid size-4 place-items-center rounded-full", done ? "bg-leaf text-white" : "border border-ink-200")}>{done ? <Check className="size-2.5" strokeWidth={3} /> : null}</span>
          <span className={done ? "text-ink-700" : "font-medium"}>{label}</span>
        </p>
      ))}
      <span className="mt-1 block h-1.5 overflow-hidden rounded-full bg-ink-100"><span className="block h-full w-2/3 rounded-full bg-sky-500" /></span>
    </div>
  )
}

const PROPS = [
  { icon: Layers, visual: <ToolsVisual />, stat: 6, suffix: "", label: "tools in one", title: "One place, not six tabs", body: "Mail, chat, customers, meetings, tasks and docs share one record of the truth, so nothing is copied by hand." },
  { icon: Timer, visual: <HoursVisual />, stat: 9, suffix: " hrs", label: "back each week", title: "Time given back", body: "The assistant files, follows up and prepares — the repetitive parts of the week quietly stop being yours." },
  { icon: Sprout, visual: <SetupVisual />, stat: 2, suffix: " min", label: "to get going", title: "Grows when you do", body: "Start with your inbox. Add people, projects and automations as the team does, without a migration." },
]

/** The case for the product in three claims. Each card shows the claim as a
 *  small picture on sky first, then states it with a number to remember. */
export function ValueProps() {
  return (
    <section id="value" className="relative bg-page py-14 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading align="center" title="Less switching. More finishing." description="Work is mostly moving information between places. Meadow removes the moving, so the hours go to the work itself." />
        </Reveal>
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {PROPS.map(({ icon: Icon, visual, stat, suffix, label, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-2.5 shadow-card">
                  <SkyPanel className="h-[190px]">{visual}</SkyPanel>
                  <div className="flex flex-1 flex-col gap-3 px-3.5 pb-4">
                    <div className="flex items-baseline justify-between gap-3">
                      <p className="font-display text-[44px] leading-none font-semibold tracking-[-0.05em] tabular-nums"><CountUp value={stat} suffix={suffix} /></p>
                      <p className="flex items-center gap-1.5 text-[12px] font-medium text-ink-400"><Icon className="size-3.5" />{label}</p>
                    </div>
                    <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
                    <p className="text-[14px] leading-relaxed text-ink-500">{body}</p>
                  </div>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
