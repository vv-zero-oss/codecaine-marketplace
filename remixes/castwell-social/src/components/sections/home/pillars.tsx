import { Container } from "@/components/ui/container"
import { PixelIcon } from "@/components/ui/pixel-icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { PillarGrid } from "@/components/sections/shared/pillar-grid"
import { Section } from "@/components/sections/shared/section"

export function Pillars() {
  return (
    <Section id="platform" className="pb-0 md:pb-0">
      <Container>
        <SectionHeading
          eyebrow="What we do"
          title="Introducing the AI marketing team"
          description="Social tools help you schedule posts. Castwell's agents plan, make and publish them."
        />
      </Container>
      <PillarGrid
        className="mt-12 md:mt-16"
        pillars={[
          {
            icon: <PixelIcon name="brain" />,
            title: "Plan",
            lede: "A month of content, planned in an afternoon.",
            items: ["Campaign calendars", "Trend and competitor watch", "Weekly briefs", "Goal tracking"],
          },
          {
            icon: <PixelIcon name="film" />,
            title: "Create",
            lede: "Captions, carousels and video in your voice.",
            items: ["AI video generation", "Caption variants per channel", "Resize and repurpose"],
          },
          {
            icon: <PixelIcon name="send" />,
            title: "Publish",
            lede: "Every post, every channel, on time.",
            items: ["Multi-channel scheduler", "Approvals and roles", "Replies and DMs"],
          },
        ]}
      />
    </Section>
  )
}
