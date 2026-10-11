import { BellOff, EyeOff, MessageSquareText, Timer } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

const VALUES = [
  { Icon: Timer, title: "First, or not at all.", body: "An alert that arrives after the gate agent's announcement is noise. If we can't be first, we stay quiet." },
  { Icon: MessageSquareText, title: "Plain words.", body: "“Inbound held in Denver by storms” — not a status code. Every message has to make sense to someone half asleep at a gate." },
  { Icon: EyeOff, title: "Your trips are yours.", body: "No advertising, no selling data, no sharing you didn't switch on. The business is the subscription, full stop." },
  { Icon: BellOff, title: "Calm is a feature.", body: "Quiet hours, grouped updates and no badge for its own sake. Fewer notifications that each matter more." },
]

/** What we hold to — and the reason Privacy and Terms point here. */
export function Values() {
  return (
    <section id="values" data-theme="night" className="bg-night py-section">
      <Container>
        <Reveal>
          <p className="type-eyebrow text-violet-glow">What we hold to</p>
          <h2 className="type-display mt-4 max-w-[18ch] text-h1 text-balance text-night-fg">Four rules every feature has to pass.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-(--radius-panel) bg-night-line sm:grid-cols-2">
          {VALUES.map((v, i) => (
            <Reveal key={v.title} as="li" delay={(i % 2) * 0.05} className="bg-night-2 p-8 md:p-10">
              <v.Icon className="size-7 text-amber" strokeWidth={1.6} />
              <h3 className="mt-6 text-h4 font-semibold text-night-fg">{v.title}</h3>
              <p className="mt-2 max-w-[44ch] text-night-2fg">{v.body}</p>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
