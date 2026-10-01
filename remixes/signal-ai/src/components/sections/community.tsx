import { ActivityCard, ActivityGroup, ActivityRow } from "@/components/ui/activity-card"
import { PixelEdge } from "@/components/motion/pixel-edge"

/** Proof on a sky field: what teams shipped this week, then three counted figures. */
export function Community() {
  return (
    <section id="community" className="relative bg-sky pt-20 pb-[190px] sm:pt-28 sm:pb-[220px]">
      <div className="mx-auto flex w-full justify-center px-4" data-canvas-ignore>
        <ActivityCard
          title="Built by teams who ship."
          stats={[
            { to: 400, suffix: "M+", label: "Requests a day" },
            { to: 200, suffix: "K", label: "GPUs online" },
            { to: 12, suffix: "+", label: "Regions" },
          ]}
        >
          <ActivityGroup label="Today" date="Sep 30">
            <ActivityRow chip="Newest release" name="vantage-4" meta="Reasoning · code · voice · images" tags="#chat #build #imagine" badge="New" action="Try" />
            <ActivityRow chip="Most used" name="vantage-4-mini" meta="Fast default · 1M context" badge="Low latency" tone="warn" action="Try" />
          </ActivityGroup>
          <ActivityGroup label="Yesterday" date="Sep 29">
            <ActivityRow chip="Shipped to production · 2.1M requests" name="Support copilot" meta="Customer support · 14 agents" badge="Live" action="Fork" />
          </ActivityGroup>
        </ActivityCard>
      </div>
      <PixelEdge color="var(--paper)" rows={5} cell={30} seed={9} density={0.95} />
    </section>
  )
}
