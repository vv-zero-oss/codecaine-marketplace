import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { WorkflowBuilder } from "@/components/mock/scale-workflow"
import { DotGlobe } from "@/components/motion/dot-globe"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SCALE, type Currency } from "@/content/home-end"
import { cn } from "@/lib/utils"

const VIEWS: { id: Currency | "local"; label: string }[] = [
  { id: "local", label: "Local" },
  { id: "USD", label: "USD" },
  { id: "EUR", label: "EUR" },
  { id: "GBP", label: "GBP" },
  { id: "JPY", label: "JPY" },
]

/** A panel and the caption that names what it shows. */
function ScaleCard({ title, body, className, children, delay = 0 }: { title: string; body: string; className?: string; children: React.ReactNode; delay?: number }) {
  return (
    <Reveal delay={delay} as="article" className="flex flex-col">
      <div className={cn("relative overflow-hidden rounded-(--radius-panel) bg-panel dot-grid shadow-(--shadow-hairline)", className)}>{children}</div>
      <h3 className="type-head mt-6 text-h4 text-ink">{title}</h3>
      <p className="mt-2 max-w-[44ch] text-[16px] text-ink-3">{body}</p>
    </Reveal>
  )
}

/** Currency switch under the globe: every pin re-prices at once. */
function CurrencyToggle({ value, onChange }: { value: Currency | "local"; onChange: (v: Currency | "local") => void }) {
  return (
    <div role="radiogroup" aria-label="Show spend in" className="absolute right-4 bottom-4 left-4 z-30 flex flex-wrap items-center justify-center gap-1 sm:left-auto">
      <span className="mr-1 hidden text-[12px] text-ink-3 sm:inline">Show in</span>
      <div className="flex rounded-(--radius-card) bg-raised p-1 shadow-(--shadow-card)">
        {VIEWS.map((v) => (
          <button
            key={v.id}
            role="radio"
            aria-checked={value === v.id}
            onClick={() => onChange(v.id)}
            className={cn(
              "h-9 min-w-11 rounded-(--radius-field) px-2.5 font-mono text-[12px] transition-[background-color,color,transform] duration-(--duration-hover) active:scale-[0.96]",
              value === v.id ? "bg-ink text-page" : "text-ink-3 hover:bg-panel hover:text-ink",
            )}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}

/**
 * Scale: growing the company without growing the admin. A working approval
 * rule on the left, the world's spend on a turning globe on the right.
 */
export function Scale() {
  const [currency, setCurrency] = useState<Currency | "local">("local")
  useCanvasAction("Globe in USD", (next) => setCurrency((next ?? currency !== "USD") ? "USD" : "local"), { on: currency === "USD", group: "Scale" })

  return (
    <section id="scale" className="py-(--spacing-section)">
      <Container>
        <SectionHeading align="center" size="display" title={SCALE.title} continuation={SCALE.continuation} body={SCALE.body} className="[&_h2]:max-w-[16ch]" />
        <div className="mt-16 grid gap-10 md:grid-cols-2 md:gap-5 lg:mt-20">
          <ScaleCard title={SCALE.workflow.title} body={SCALE.workflow.body}>
            <WorkflowBuilder />
          </ScaleCard>
          <ScaleCard title={SCALE.global.title} body={SCALE.global.body} delay={0.08} className="flex min-h-[420px] items-center justify-center">
            <div className="w-full max-w-[460px] px-4 pt-6 pb-20 sm:px-10">
              <DotGlobe currency={currency} />
            </div>
            <CurrencyToggle value={currency} onChange={setCurrency} />
          </ScaleCard>
        </div>
      </Container>
    </section>
  )
}
