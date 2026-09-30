import { CalendarClock, Clapperboard, MessageCircle, PenLine, ShieldCheck, TrendingUp } from "lucide-react"

import { ScrollGrow } from "@/components/motion/scroll-grow"
import { CommandCenter } from "@/components/mockups/command-center"
import { Container } from "@/components/ui/container"
import { PageHero, type ChipSpec } from "@/components/sections/shared/page-hero"

export const HOME_CHIPS: ChipSpec[] = [
  { label: "Trend monitoring", tone: "sage", icon: <TrendingUp />, depth: 0.15, size: "sm", className: "left-[11%] top-[13%]" },
  { label: "Community replies", tone: "coral", icon: <MessageCircle />, depth: 0.35, size: "lg", className: "right-[5%] top-[21%]" },
  { label: "Video generation", tone: "mint", icon: <Clapperboard />, depth: 0.25, size: "lg", className: "left-[4%] top-[47%]" },
  { label: "Best-time scheduling", tone: "mint-soft", icon: <CalendarClock />, depth: 0.4, size: "lg", className: "right-[8%] top-[56%]" },
  { label: "Approvals", tone: "butter", icon: <ShieldCheck />, depth: 0.2, size: "sm", className: "left-[21%] top-[80%]" },
  { label: "Caption drafting", tone: "periwinkle", icon: <PenLine />, depth: 0.3, size: "sm", className: "left-[66%] top-[86%]" },
  { tone: "butter", depth: 0.8, className: "left-[40%] top-[10%]" },
  { tone: "mint", depth: 0.9, size: "lg", className: "left-[67%] top-[13%]" },
  { tone: "periwinkle", depth: 0.85, size: "lg", className: "left-[15%] top-[30%]" },
  { tone: "coral", depth: 0.75, className: "left-[8%] top-[86%]" },
  { tone: "sage", depth: 0.8, size: "lg", className: "right-[10%] top-[82%]" },
]

/** Home's opening: the promise, the chips, and the product unfolding under it. */
export function HomeHero() {
  return (
    <PageHero
      title="Run every channel with one AI marketing team."
      description="Castwell plugs into your social accounts and runs your content workflows — so your team can spend less time posting and more time building the brand."
      chips={HOME_CHIPS}
    >
      <Container className="relative -mt-4 pb-0 md:-mt-10">
        <ScrollGrow start={18} className="mx-auto max-w-[1190px]">
          <CommandCenter />
        </ScrollGrow>
      </Container>
    </PageHero>
  )
}
