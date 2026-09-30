import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { PixelIcon, type PixelIconName } from "@/components/ui/pixel-icon"
import { PixelList } from "@/components/ui/pixel-list"
import { SectionHeading } from "@/components/ui/section-heading"
import { Section } from "@/components/sections/shared/section"
import { cn } from "@/lib/utils"

type Agent = { name: string; role: string; icon: PixelIconName; tone: string; handles: string[]; now: string }

const AGENTS: Agent[] = [
  { name: "Marketing Manager", role: "Plans, briefs and reports", icon: "brain", tone: "bg-mint-tile", handles: ["Monthly content plan", "Monday brief", "Friday report"], now: "Rebalancing Thursday's slots" },
  { name: "Copy agent", role: "Captions, hooks and threads", icon: "chat", tone: "bg-periwinkle", handles: ["Channel-native captions", "Hook variants", "Alt text"], now: "Drafting 3 hooks for the reel" },
  { name: "Video producer", role: "Cuts, captions and resizes", icon: "film", tone: "bg-coral-soft", handles: ["Clips from long video", "Auto captions", "9:16, 1:1, 16:9"], now: "Rendering Short 2 of 3" },
  { name: "Community agent", role: "Replies, DMs and escalations", icon: "inbox", tone: "bg-butter", handles: ["Answers FAQs", "Flags risk", "Routes leads to sales"], now: "12 replies in the last hour" },
  { name: "Insights agent", role: "Trends, tests and numbers", icon: "chart", tone: "bg-sage-deep", handles: ["Trend alerts", "A/B hook tests", "Competitor digest"], now: "New audio trending in your niche" },
]

/** One agent: its tile, what it owns, and what it is doing right now. */
export function AgentCard({ agent, index = 0 }: { agent: Agent; index?: number }) {
  return (
    <Reveal
      delay={index * 0.05}
      className="group flex flex-col border-r border-b border-line bg-page p-6 transition-colors duration-200 hover:bg-panel md:p-8"
    >
      <div className="flex items-start justify-between">
        <span className={cn("grid size-14 place-items-center text-ink", agent.tone)}>
          <PixelIcon name={agent.icon} className="size-7" />
        </span>
        <span className="text-[11px] text-muted tabular-nums">0{index + 1}</span>
      </div>
      <h3 className="mt-8 font-serif text-[1.6rem] leading-tight font-light text-ink">{agent.name}</h3>
      <p className="mt-1.5 text-[14px] font-medium text-ink-soft">{agent.role}</p>
      <PixelList items={agent.handles} className="mt-5 text-[14px] text-ink-soft" />
      <p className="mt-auto flex items-center gap-2 pt-8 text-[12px] text-muted">
        <span className="relative flex size-2">
          <span className="absolute inset-0 rounded-full bg-mint motion-safe:animate-ping motion-safe:[animation-duration:2s]" />
          <span className="relative size-2 rounded-full bg-mint" />
        </span>
        {agent.now}
      </p>
    </Reveal>
  )
}

export function AgentRoster() {
  return (
    <Section id="agents">
      <Container>
        <SectionHeading
          eyebrow="The team it runs"
          title="Five specialists, one manager"
          description="The Marketing Manager plans the work and hands each piece to the agent built for it. You see every hand-off, and nothing goes out without your rules."
        />
      </Container>
      <Container className="mt-12 px-0 md:mt-16 md:px-(--spacing-gutter)">
        <div className="grid border-t border-l border-line sm:grid-cols-2 lg:grid-cols-3">
          {AGENTS.map((a, i) => (
            <AgentCard key={a.name} agent={a} index={i} />
          ))}
          <div className="flex flex-col justify-between gap-6 border-r border-b border-line bg-sage p-6 md:p-8">
            <p className="font-serif text-[1.6rem] leading-tight font-light text-ink">Bring your own people.</p>
            <p className="text-[14px] text-ink-soft">
              Invite editors, legal and regional leads. Agents draft; people approve, edit or take over any step.
            </p>
          </div>
        </div>
      </Container>
    </Section>
  )
}
