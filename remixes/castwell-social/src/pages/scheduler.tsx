import { CalendarClock, Globe2, Layers, MessageSquareReply, RefreshCw, ShieldCheck } from "lucide-react"

import { PixelSteps } from "@/components/motion/pixel-steps"
import { Reveal } from "@/components/motion/reveal"
import { WeekCalendar } from "@/components/mockups/week-calendar"
import { CtaBand } from "@/components/site/cta-band"
import { Container } from "@/components/ui/container"
import { PixelIcon } from "@/components/ui/pixel-icon"
import { SectionHeading } from "@/components/ui/section-heading"
import { Channels } from "@/components/sections/home/channels"
import { Approvals } from "@/components/sections/scheduler/approvals"
import { BestTime } from "@/components/sections/scheduler/best-time"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"
import { PillarGrid } from "@/components/sections/shared/pillar-grid"
import { Section } from "@/components/sections/shared/section"
import { TrustStrip } from "@/components/sections/shared/trust-strip"

const CHIPS: ChipSpec[] = [
  { label: "Best-time slots", tone: "mint", icon: <CalendarClock />, depth: 0.3, size: "lg", className: "left-[5%] top-[24%]" },
  { label: "Time zones", tone: "periwinkle", icon: <Globe2 />, depth: 0.2, className: "right-[8%] top-[15%]" },
  { label: "Approvals", tone: "butter", icon: <ShieldCheck />, depth: 0.35, size: "lg", className: "right-[4%] top-[56%]" },
  { label: "Evergreen queue", tone: "sage", icon: <RefreshCw />, depth: 0.15, size: "sm", className: "left-[15%] top-[76%]" },
  { label: "First comment", tone: "coral", icon: <MessageSquareReply />, depth: 0.25, size: "sm", className: "left-[34%] top-[11%]" },
  { label: "Bulk upload", tone: "mint-soft", icon: <Layers />, depth: 0.2, size: "sm", className: "right-[22%] top-[84%]" },
  { tone: "periwinkle", depth: 0.8, size: "lg", className: "left-[14%] top-[46%]" },
  { tone: "mint", depth: 0.85, className: "right-[12%] top-[40%]" },
  { tone: "coral", depth: 0.75, className: "left-[62%] top-[90%]" },
]

export function SchedulerPage() {
  return (
    <>
      <PageHero
        eyebrow="Scheduler"
        title="Every channel, every market, one calendar."
        description="Drag a post onto the week and Castwell formats it for each network, slots it into each audience's best hour, and routes it for approval."
        cta="Plan your first week"
        secondary="How approvals work"
        secondaryHref="/scheduler#approvals"
        chips={CHIPS}
      >
        <Container className="relative -mt-4 md:-mt-10">
          <Reveal className="mx-auto max-w-[1190px]">
            <WeekCalendar />
          </Reveal>
        </Container>
      </PageHero>
      <PixelSteps rise="up" columns={15} rows={5} lead="right" className="mt-16 md:mt-24" />
      <TrustStrip label="Scheduling 40,000 posts a week for teams like" />
      <BestTime />
      <Approvals />
      <Section tone="page" className="pt-0 pb-0 md:pt-0 md:pb-0">
        <Container>
          <SectionHeading eyebrow="Publishing" title="The details that keep a calendar honest" />
        </Container>
        <PillarGrid
          className="mt-12 md:mt-16"
          pillars={[
            { icon: <PixelIcon name="calendar" />, title: "Queues", lede: "Fill the gaps automatically.", items: ["Evergreen posts recycle", "Holiday blackout dates", "Bulk CSV upload"] },
            { icon: <PixelIcon name="clock" />, title: "Time zones", lede: "One post, many local hours.", items: ["Per-market publishing", "Daylight-saving safe", "Local previews"] },
            { icon: <PixelIcon name="chat" />, title: "First comment", lede: "The link goes where it works.", items: ["Scheduled first comments", "Hashtag sets per channel", "Mentions and collabs"] },
            { icon: <PixelIcon name="inbox" />, title: "Fail-safes", lede: "No silent misses.", items: ["Retries on API errors", "Alerts if a token expires", "Publish log per post"] },
          ]}
        />
      </Section>
      <Channels />
      <div className="h-(--spacing-section)" />
      <CtaBand title="Plan the week in one sitting. Let the calendar do the rest." cta="Plan your first week" />
    </>
  )
}
