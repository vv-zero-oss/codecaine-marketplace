import { BarChart3, Eye, FileText, Megaphone, PenLine, Target } from "lucide-react"

import { PixelSteps } from "@/components/motion/pixel-steps"
import { WeeklyBrief } from "@/components/mockups/weekly-brief"
import { CtaBand } from "@/components/site/cta-band"
import { Container } from "@/components/ui/container"
import { PixelIcon } from "@/components/ui/pixel-icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { Outcomes } from "@/components/sections/home/outcomes"
import { AgentRoster } from "@/components/sections/manager/agent-roster"
import { WeekTimeline } from "@/components/sections/manager/week-timeline"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"
import { PillarGrid } from "@/components/sections/shared/pillar-grid"
import { Section } from "@/components/sections/shared/section"
import { TrustStrip } from "@/components/sections/shared/trust-strip"

const CHIPS: ChipSpec[] = [
  { label: "Weekly brief", tone: "mint", icon: <FileText />, depth: 0.25, size: "lg", className: "left-[5%] top-[22%]" },
  { label: "Campaign plan", tone: "periwinkle", icon: <Target />, depth: 0.35, className: "right-[7%] top-[16%]" },
  { label: "Competitor watch", tone: "sage", icon: <Eye />, depth: 0.15, size: "sm", className: "left-[16%] top-[70%]" },
  { label: "Hook testing", tone: "coral", icon: <PenLine />, depth: 0.3, size: "lg", className: "right-[4%] top-[54%]" },
  { label: "Launch moments", tone: "butter", icon: <Megaphone />, depth: 0.2, size: "sm", className: "right-[20%] top-[82%]" },
  { label: "Friday report", tone: "mint-soft", icon: <BarChart3 />, depth: 0.4, size: "sm", className: "left-[34%] top-[12%]" },
  { tone: "coral", depth: 0.8, className: "left-[12%] top-[44%]" },
  { tone: "mint", depth: 0.85, size: "lg", className: "right-[12%] top-[38%]" },
  { tone: "periwinkle", depth: 0.75, className: "left-[62%] top-[88%]" },
]

export function MarketingManagerPage() {
  return (
    <>
      <PageHero
        eyebrow="AI Marketing Manager"
        title="A marketing manager that never logs off."
        description="It plans the month, briefs the agents, watches the numbers and tells you on Monday what it's doing and why. You keep the final say."
        cta="Meet your manager"
        secondary="See the agents"
        secondaryHref="/marketing-manager#agents"
        chips={CHIPS}
      >
        <Container className="relative -mt-4 md:-mt-10">
          <Reveal className="mx-auto max-w-[1190px]">
            <WeeklyBrief />
          </Reveal>
        </Container>
      </PageHero>
      <PixelSteps rise="up" columns={15} rows={5} lead="right" className="mt-16 md:mt-24" />
      <TrustStrip />
      <AgentRoster />
      <WeekTimeline />
      <Section className="pb-0 md:pb-0">
        <Container>
          <SectionHeading
            eyebrow="Guardrails"
            title="Autonomous, never unaccountable"
            description="Everything the AI team does runs through rules you set once and can read any time."
          />
        </Container>
        <PillarGrid
          className="mt-12 md:mt-16"
          pillars={[
            {
              icon: <PixelIcon name="spark" />,
              title: "Brand voice",
              lede: "Writes like you on your best day.",
              items: ["Tone and vocabulary rules", "Words and topics to avoid", "Learns from edits you make"],
            },
            {
              icon: <PixelIcon name="shield" />,
              title: "Approvals",
              lede: "Your rules decide what needs a yes.",
              items: ["Per-channel sign-off", "Legal review for paid posts", "Auto-publish for replies you trust"],
            },
            {
              icon: <PixelIcon name="clock" />,
              title: "Audit trail",
              lede: "Every draft, edit and post, on record.",
              items: ["Who changed what, and when", "Prompt and source history", "Exportable for compliance"],
            },
          ]}
        />
      </Section>
      <div className="h-(--spacing-section)" />
      <Outcomes eyebrow="Customer stories" title="Teams that handed over the busywork" />
      <CtaBand title="Give your brand a manager that works the weekend." cta="Meet your manager" />
    </>
  )
}
