import { AnimatePresence } from "motion/react"
import { useState } from "react"

import { CanvasSwitch } from "@/components/canvas-switch"
import { LayoutItem } from "@/components/motion/layout-item"
import { BlurWords } from "@/components/motion/blur-words"
import { Container } from "@/components/ui/container"
import { Tag } from "@/components/ui/tag"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { PORTFOLIO, STAGES } from "@/content"

export function PortraitCard({
  name,
  company,
  stage,
  sector,
  line,
  year,
  image,
  alt,
}: (typeof PORTFOLIO)[number]) {
  return (
    <article className="group flex flex-col gap-4">
      <div className="relative isolate aspect-[4/5] overflow-hidden rounded-card bg-surface-raised shadow-card">
        <img
          src={image}
          alt={alt}
          loading="lazy"
          className="absolute inset-0 -z-10 size-full object-cover transition-transform duration-[1200ms] ease-soft group-hover:scale-[1.04]"
        />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
        <Tag className="absolute top-3 left-3">{stage}</Tag>
        <p className="absolute right-4 bottom-3 font-mono text-[11px] text-fg/70 tabular-nums">Since {year}</p>
      </div>
      <div>
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="text-lg font-medium tracking-[-0.02em]">{company}</h3>
          <span className="text-[10px] tracking-[0.12em] text-fg-subtle uppercase">{sector}</span>
        </div>
        <p className="mt-1 text-[13px] text-fg-muted">{name}</p>
        <p className="mt-3 max-w-sm text-sm leading-relaxed text-fg/85">{line}</p>
      </div>
    </article>
  )
}

/** The founders we back, filtered by stage. Each stage is an editor switch. */
export function Portfolio() {
  const [stage, setStage] = useState<(typeof STAGES)[number]>("All")
  const shown = PORTFOLIO.filter((f) => stage === "All" || f.stage === stage)

  return (
    <section id="portfolio" className="bg-ink py-20 sm:py-[14vh]">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <BlurWords
            before="The people we"
            accent="stand"
            after="behind."
            className="max-w-md text-[clamp(1.75rem,3.6vw,2.5rem)] leading-[1.1] font-medium tracking-[-0.035em]"
          />
          <ToggleGroup type="single" value={stage} onValueChange={(v) => v && setStage(v as typeof stage)} aria-label="Filter by stage">
            {STAGES.map((s) => (
              <ToggleGroupItem key={s} value={s}>
                {s}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          {STAGES.map((s) => (
            <CanvasSwitch key={s} label={`Show ${s}`} group="Portfolio" on={stage === s} set={(on) => setStage(on ? s : "All")} />
          ))}
        </div>
        <div className="mt-12 grid gap-x-4 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout" initial={false}>
            {shown.map((founder) => (
              <LayoutItem key={founder.company}>
                <PortraitCard {...founder} />
              </LayoutItem>
            ))}
          </AnimatePresence>
        </div>
      </Container>
    </section>
  )
}
