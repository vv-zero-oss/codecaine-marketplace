import { CheckCircle2, Plug, Wand2 } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const STEPS = [
  {
    icon: Plug,
    title: "Connect what you already use",
    body: "Sign in with your work account and pick your tools. Meadow reads history in the background — no import, no cleanup.",
    visual: ["Mail", "Calendar", "Chat", "Billing"],
  },
  {
    icon: Wand2,
    title: "Tell the assistant how you work",
    body: "Choose a few skills or describe a routine in a sentence. It drafts, files and follows up the way you would, and asks when unsure.",
    visual: ["Morning briefing", "Follow-up finder", "Meeting prep"],
  },
  {
    icon: CheckCircle2,
    title: "Review, approve, move on",
    body: "Everything it does is listed with what it touched. Undo anything in one click and it learns for next time.",
    visual: ["Updated 4 deals", "Filed 12 threads", "Drafted 3 replies"],
  },
]

/** Three steps in the order a new customer lives them. The rail links the
 *  numbers on wide screens; below `md` it becomes a plain vertical list. */
export function HowItWorks() {
  return (
    <section id="how" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="How it works" description="From first sign-in to a quieter week in three steps." />
        </Reveal>
        <ol className="relative mt-9 grid gap-4 md:grid-cols-3">
          <span aria-hidden="true" className="absolute top-[34px] right-[16%] left-[16%] hidden h-px bg-gradient-to-r from-transparent via-ink-200 to-transparent md:block" />
          {STEPS.map(({ icon: Icon, title, body, visual }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.08} className="h-full">
                <article className="relative flex h-full flex-col gap-4 rounded-[var(--radius-card)] bg-surface p-6 shadow-card">
                  <div className="flex items-center gap-3">
                    <span className="grid size-[34px] place-items-center rounded-full bg-ink-900 text-[13px] font-semibold text-white tabular-nums shadow-button">{i + 1}</span>
                    <Icon className="size-4 text-ink-400" />
                  </div>
                  <h3 className="font-display text-[19px] leading-tight font-semibold tracking-[-0.02em] text-balance">{title}</h3>
                  <p className="text-[14px] leading-relaxed text-ink-500">{body}</p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
                    {visual.map((v) => (
                      <li key={v} className="rounded-md bg-sky-100 px-2 py-1 text-[11px] font-medium text-sky-600">{v}</li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
