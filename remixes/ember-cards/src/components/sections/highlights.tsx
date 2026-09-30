import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { HIGHLIGHTS } from "@/content"
import { cn } from "@/lib/utils"

import { FeeWidget, NumberWidget, PrivacyWidget } from "./highlight-widgets"

// Each panel is graphite with the faintest cast of one metal, lit from above.
const TONES = {
  mint: "bg-panel-smoke",
  sky: "bg-panel-steel",
  lilac: "bg-panel-umber",
} as const

/** A tinted panel: a widget held up top, then a serif title and two muted lines. */
export function HighlightCard({
  tone,
  title,
  body,
  children,
}: {
  tone: keyof typeof TONES
  title: string
  body: string
  children: React.ReactNode
}) {
  return (
    <article className={cn("grain flex h-full flex-col items-center overflow-hidden rounded-card px-6 pt-12 pb-11 text-center shadow-card [--grain-opacity:0.14]", TONES[tone])} style={{ backgroundImage: "var(--atmos-panel)" }}>
      <div className="relative z-2 flex w-full justify-center">{children}</div>
      <h3 className="relative z-2 mt-12 font-serif text-[1.75rem] leading-tight text-ink">{title}</h3>
      <p className="relative z-2 mt-2 text-[0.9375rem] leading-relaxed text-muted lg:whitespace-pre-line">{body}</p>
    </article>
  )
}

const WIDGETS = [FeeWidget, NumberWidget, PrivacyWidget]

/** Why a card per purchase is free, instant and private. */
export function Highlights({ title = HIGHLIGHTS.title, blurb = HIGHLIGHTS.blurb }: { title?: string; blurb?: string }) {
  return (
    <section id="security" className="pb-24 sm:pb-36">
      <Container>
        <SectionHeading title={title} blurb={blurb} />
        <div className="mt-12 grid gap-5 sm:mt-14 md:grid-cols-3 md:gap-[26px]">
          {HIGHLIGHTS.items.map((item, i) => {
            const Widget = WIDGETS[i]
            return (
              <Reveal key={item.title} delay={i * 0.08} className="h-full">
                <HighlightCard tone={item.tone} title={item.title} body={item.body}>
                  <Widget />
                </HighlightCard>
              </Reveal>
            )
          })}
        </div>
      </Container>
    </section>
  )
}
