import { Layers, Sprout, Timer } from "lucide-react"

import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

const PROPS = [
  { icon: Layers, stat: 6, suffix: "", label: "tools in one", title: "One place, not six tabs", body: "Mail, chat, customers, meetings, tasks and docs share one record of the truth, so nothing is copied by hand." },
  { icon: Timer, stat: 9, suffix: " hrs", label: "back each week", title: "Time given back", body: "The assistant files, follows up and prepares — the repetitive parts of the week quietly stop being yours." },
  { icon: Sprout, stat: 2, suffix: " min", label: "to get going", title: "Grows when you do", body: "Start with your inbox. Add people, projects and automations as the team does, without a migration." },
]

/** The case for the product in three claims, each with a number a visitor can
 *  hold on to. Sits right after the hero's proof so the promise is backed
 *  before it is explained. */
export function ValueProps() {
  return (
    <section id="value" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Less switching. More finishing." description="Work is mostly moving information between places. Meadow removes the moving, so the hours go to the work itself." />
        </Reveal>
        <ul className="mt-9 grid gap-4 md:grid-cols-3">
          {PROPS.map(({ icon: Icon, stat, suffix, label, title, body }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.07} className="h-full">
                <article className="flex h-full flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-6 shadow-card sm:p-7">
                  <div className="flex items-end justify-between">
                    <p className="font-display text-[56px] leading-none font-semibold tracking-[-0.05em] text-ink-900 tabular-nums">
                      <CountUp value={stat} suffix={suffix} />
                    </p>
                    <span className="grid size-9 place-items-center rounded-lg bg-sky-100 text-sky-600"><Icon className="size-4" /></span>
                  </div>
                  <p className="-mt-3 text-[12px] font-medium tracking-wide text-ink-400 uppercase">{label}</p>
                  <div>
                    <h3 className="text-[16px] font-semibold tracking-tight">{title}</h3>
                    <p className="mt-2 text-[14px] leading-relaxed text-ink-500">{body}</p>
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
