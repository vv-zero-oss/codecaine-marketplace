import { Container } from "@/components/ui/container"
import { Badge } from "@/components/ui/badge"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Reveal } from "@/components/motion/reveal"
import { VERTIPORTS } from "@/content/network"
import { cn } from "@/lib/utils"

const PHASES = [
  { opens: "Spring 2027", status: "In build", variant: "green" as const, note: "Structures done, chargers going in." },
  { opens: "Autumn 2027", status: "Permitted", variant: "default" as const, note: "Planning granted, work starts this winter." },
  { opens: "2028", status: "In design", variant: "outline" as const, note: "Sites agreed, drawings with the city." },
]

/**
 * When each pad opens: the network in three waves. A horizontal line from
 * `md` up, a vertical one below it — each pad a card with its code, area and
 * where it stands today.
 */
export function LaunchTimeline() {
  return (
    <section data-header-tone="dark" className="relative bg-page py-(--spacing-section) text-ink">
      <Container>
        <SectionHeading
          eyebrow="Launch — 03"
          title="Not all at once. Three openings, in order."
          lead="The first three pads link the waterfront, the towers and the terminal. The rest follow the river and the rail line."
        />
        <ol className="relative mt-16 grid gap-10 md:mt-24 md:grid-cols-3 md:gap-6">
          {/* the line: vertical on phones, across on wider screens */}
          <span aria-hidden className="absolute top-2 bottom-2 left-[5px] w-px bg-line-strong md:top-[5px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-full" />
          {PHASES.map((phase, i) => {
            const pads = VERTIPORTS.filter((v) => v.opens === phase.opens)
            return (
              <Reveal as="li" key={phase.opens} delay={i * 0.08} className="relative pl-8 md:pt-10 md:pl-0">
                <span
                  aria-hidden
                  className={cn(
                    "absolute top-[1px] left-0 size-[11px] rounded-full border border-ink md:top-0",
                    i === 0 ? "bg-sky" : "bg-page",
                  )}
                />
                <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                  <h3 className="type-head text-h3">{phase.opens}</h3>
                  <p className="text-micro text-ink-3">{pads.length} {pads.length === 1 ? "pad" : "pads"}</p>
                </div>
                <p className="mt-2 max-w-[34ch] text-body text-ink-3">{phase.note}</p>
                <ul className="mt-6 flex flex-col gap-3">
                  {pads.map((v) => (
                    <li
                      key={v.id}
                      className="group flex items-center justify-between gap-4 rounded-(--radius-card) bg-raised p-5 shadow-(--shadow-card) transition-[transform,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong) hover:-translate-y-0.5 hover:shadow-(--shadow-float)"
                    >
                      <div className="min-w-0">
                        <p className="font-mono text-h4 tracking-tight">{v.code}</p>
                        <p className="mt-1 truncate text-body font-medium">{v.name}</p>
                        <p className="truncate text-micro text-ink-3">{v.area}</p>
                      </div>
                      <Badge variant={phase.variant}>{phase.status}</Badge>
                    </li>
                  ))}
                </ul>
              </Reveal>
            )
          })}
        </ol>
      </Container>
    </section>
  )
}
