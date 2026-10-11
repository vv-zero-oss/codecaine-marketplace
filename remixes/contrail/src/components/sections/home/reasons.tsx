import { Accessibility, BellRing, CloudSun, Globe2, Lock, Plane, TrainFront, Users } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"

const REASONS = [
  { Icon: Users, title: "Family sharing", body: "Pro covers up to five people in one household." },
  { Icon: Lock, title: "Private by default", body: "Your trips and history are visible to you alone." },
  { Icon: CloudSun, title: "Weather at both ends", body: "The forecast for when you land, not just today." },
  { Icon: TrainFront, title: "Leave-for-airport alerts", body: "Timed to traffic and the security queue." },
  { Icon: Plane, title: "Seat and cabin notes", body: "Remember which side has the view on that route." },
  { Icon: BellRing, title: "Quiet hours", body: "Only urgent changes wake you up at night." },
  { Icon: Globe2, title: "Every airline, one place", body: "Codeshares and connections in a single trip." },
  { Icon: Accessibility, title: "Built for everyone", body: "VoiceOver, Dynamic Type and high contrast throughout." },
]

/** The smaller reasons, as a grid of quiet cells. Each icon tips forward on
 *  hover, as if about to go. */
export function Reasons() {
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display mx-auto max-w-[18ch] text-center text-h2 text-balance">And a few more reasons to bring Contrail on your next trip.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((r, i) => (
            <Reveal key={r.title} as="li" delay={(i % 4) * 0.04}>
              <div className="group flex h-full flex-col gap-3 rounded-(--radius-card) bg-panel p-5 transition-[background-color,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong) hover:bg-raised hover:shadow-(--shadow-card)">
                <span className="grid size-10 place-items-center rounded-full bg-raised text-violet shadow-(--shadow-xs) transition-transform duration-(--duration-swap) ease-(--ease-out-strong) [@media(hover:hover)]:group-hover:-translate-y-0.5 [@media(hover:hover)]:group-hover:-rotate-6">
                  <r.Icon className="size-5" strokeWidth={1.8} />
                </span>
                <p className="text-[15px] text-ink-2"><span className="font-semibold text-ink">{r.title}.</span> {r.body}</p>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
