import { Clock3, Plug, Users } from "lucide-react"

import { PLATFORM_PANELS } from "@/components/mocks/dark-panels"
import { StickyTabs } from "@/components/motion/sticky-tabs"
import { Container } from "@/components/ui/container"
import { PLATFORM_FEATURES, PLATFORM_TABS } from "@/content"
import { Reveal } from "@/components/motion/reveal"

const ICONS = { users: Users, clock: Clock3, plug: Plug }

/** Dark pinned tabs for the platform, then three quiet capabilities beneath. */
export function Platform({ holdVh = 70 }: { holdVh?: number }) {
  return (
    <div id="platform" className="bg-night text-ink-inverse" data-canvas-ignore>
      <StickyTabs
        tone="dark"
        eyebrow="Semantic platform"
        title="Ship metrics, not dashboards"
        body="A complete semantic platform to govern and publish all your metrics. No more repeating yourself."
        holdVh={holdVh}
        tabs={PLATFORM_TABS}
        panels={PLATFORM_PANELS}
      />
      <Container className="grid gap-10 pb-24 sm:grid-cols-3">
        {PLATFORM_FEATURES.map((f, i) => {
          const Icon = ICONS[f.icon as keyof typeof ICONS]
          return (
            <Reveal key={f.title} delay={i * 0.08}>
              <Icon className="mb-5 size-6 text-ink-inverse-2" strokeWidth={1.4} />
              <h3 className="text-[15px] font-medium">{f.title}</h3>
              <p className="mt-1 max-w-[16rem] text-[15px] leading-snug text-ink-inverse-2">{f.body}</p>
            </Reveal>
          )
        })}
      </Container>
    </div>
  )
}
