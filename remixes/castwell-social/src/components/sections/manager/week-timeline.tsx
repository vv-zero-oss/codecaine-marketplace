import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

const WEEK = [
  { day: "Monday", time: "07:00", tone: "bg-mint", agent: "Marketing Manager", did: "Sends the brief: last week's numbers, this week's plan, three decisions for you." },
  { day: "Tuesday", time: "09:30", tone: "bg-periwinkle", agent: "Copy agent", did: "Drafts every caption in your voice, one version per channel, with alt text." },
  { day: "Wednesday", time: "12:00", tone: "bg-coral", agent: "Video producer", did: "Cuts last week's webinar into five vertical clips with burned-in captions." },
  { day: "Thursday", time: "16:10", tone: "bg-butter", agent: "Insights agent", did: "Spots a trending audio in your niche and pitches a same-day remix." },
  { day: "Friday", time: "17:00", tone: "bg-mint", agent: "Marketing Manager", did: "Reports what worked, moves next week's slots, and asks for one approval." },
]

/** A working week, one row a day, on the night ground. */
export function WeekTimeline() {
  return (
    <Section tone="night" className="night-grid">
      <Container>
        <SectionHeading
          tone="night"
          eyebrow="A week with Castwell"
          title="What happens while you're in meetings"
          align="left"
        />
        <ol className="mt-12 border-t border-night-line md:mt-16">
          {WEEK.map((w, i) => (
            <Reveal
              as="li"
              key={w.day}
              delay={i * 0.05}
              className="grid gap-3 border-b border-night-line py-6 md:grid-cols-[180px_220px_1fr] md:items-center md:gap-8 md:py-7"
            >
              <p className="flex items-center gap-3 font-serif text-[1.5rem] font-light text-night-ink">
                <span className={cn("size-2.5", w.tone)} />
                {w.day}
              </p>
              <p className="text-[13px] text-night-muted">
                <span className="tabular-nums">{w.time}</span> · {w.agent}
              </p>
              <p className="text-[15px] leading-relaxed text-night-ink/85">{w.did}</p>
            </Reveal>
          ))}
        </ol>
      </Container>
    </Section>
  )
}
