import { Check, CalendarDays, Mail, MessagesSquare, Receipt, RotateCcw, Zap } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { SkyPanel } from "@/components/ui/sky-panel"

const TOOLS = [["Mail", Mail], ["Calendar", CalendarDays], ["Chat", MessagesSquare], ["Billing", Receipt]] as const

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
      <span className="mx-auto rounded-full bg-surface/90 px-3 py-1 text-[11px] font-medium text-ink-700 shadow-card">4 tools connected</span>
    </div>
  )
}

function ComposerVisual() {
  return (
    <div className="w-[240px] rounded-xl bg-surface p-3.5 text-[12px] shadow-lift">
      <p className="leading-relaxed text-ink-900">Every Monday, summarise new leads and draft a reply for each<span className="ml-0.5 inline-block h-3.5 w-px translate-y-0.5 bg-sky-600 [animation:blink_1.1s_steps(1)_infinite]" /></p>
      <div className="mt-3 flex items-center gap-2">
        <span className="flex items-center gap-1 rounded-md bg-sky-100 px-2 py-1 font-medium text-sky-600"><Zap className="size-3" />Skills</span>
        <span className="rounded-md bg-ink-100 px-2 py-1 text-ink-500">Weekly</span>
        <span className="ml-auto grid size-6 place-items-center rounded-md bg-ink-900 text-white">↑</span>
      </div>
    </div>
  )
}

function ReviewVisual() {
  const rows = ["Updated 4 deals", "Filed 12 threads", "Drafted 3 replies"]
  return (
    <ul className="flex w-[240px] flex-col gap-2 text-[12px]">
      {rows.map((r, i) => (
        <li key={r} className="flex items-center gap-2.5 rounded-lg bg-surface px-3 py-2.5 shadow-lift" style={{ transform: `translateX(${(i - 1) * 6}px)` }}>
          <span className="grid size-4 place-items-center rounded-full bg-leaf/15 text-leaf"><Check className="size-2.5" strokeWidth={3} /></span>
          <span className="font-medium">{r}</span>
          <span className="ml-auto flex items-center gap-1 text-ink-400"><RotateCcw className="size-3" />Undo</span>
        </li>
      ))}
    </ul>
  )
}

const STEPS = [
  { visual: <ConnectVisual />, title: "Connect what you already use", body: "Sign in with your work account and pick your tools. Meadow reads history in the background — no import, no cleanup." },
  { visual: <ComposerVisual />, title: "Tell the assistant how you work", body: "Choose a few skills or describe a routine in a sentence. It drafts, files and follows up the way you would, and asks when unsure." },
  { visual: <ReviewVisual />, title: "Review, approve, move on", body: "Everything it does is listed with what it touched. Undo anything in one click and it learns for next time." },
]

/** Three steps in the order a new customer lives them, each drawn on sky.
 *  The band behind it is a shade lighter than the page so the section reads
 *  as its own chapter. */
export function HowItWorks() {
  return (
    <section id="how" className="border-y border-ink-100 bg-surface py-14 sm:py-24">
      <Container>
        <Reveal>
          <SectionHeading align="center" title="How it works" description="From first sign-in to a quieter week in three steps." />
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
    </section>
  )
}
