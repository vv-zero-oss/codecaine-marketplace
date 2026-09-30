import { useState } from "react"
import { Check } from "lucide-react"

import { Isocon, type IsoconName } from "@/components/icons/isocon"
import { Reveal } from "@/components/motion/reveal"
import { Newsletter, Ruler, TAG_TONE } from "@/components/sections/closing"
import { Container } from "@/components/ui/container"
import { Heading, Lede } from "@/components/ui/heading"
import { Section } from "@/components/ui/section"
import { CHANGELOG, type ChangelogTag } from "@/content/pages"
import { cn } from "@/lib/utils"

const FILTERS: ("all" | ChangelogTag)[] = ["all", "feature", "improvement", "design"]

/** Changelog: every release, newest first, filterable by kind. */
export function ChangelogPage() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("all")
  const entries = CHANGELOG.entries.filter((e) => filter === "all" || e.tag === filter)

  return (
    <>
      <Section>
        <Container className="pt-20 pb-12 md:pt-28">
          <Reveal onMount>
            <Heading as="h1" size="h1" lead={CHANGELOG.title} />
            <Lede className="mt-4">{CHANGELOG.body}</Lede>
          </Reveal>
          <Reveal onMount delay={0.1} className="mt-8 flex flex-wrap gap-1.5">
            {FILTERS.map((f) => (
              <button
                key={f}
                type="button"
                onClick={() => setFilter(f)}
                className={cn(
                  "h-8 rounded-button border px-3 text-sm capitalize transition-colors duration-300 hover:duration-[50ms]",
                  filter === f ? "border-line-bold bg-hover-2 text-ink" : "border-line-strong text-ink-2 hover:bg-surface hover:text-ink",
                )}
              >
                {f}
              </button>
            ))}
          </Reveal>
        </Container>
        <Ruler className="border-t border-line-strong" />
      </Section>

      {entries.map((e) => (
        <Section key={e.title}>
          <Container className="grid grid-cols-1 [&>*]:min-w-0 gap-6 py-14 md:grid-cols-[200px_1fr] md:gap-12 md:py-20">
            <div className="md:sticky md:top-[120px] md:self-start">
              <p className="text-sm text-ink-2">{e.date}</p>
              <p className={cn("mt-1 text-caption capitalize", TAG_TONE[e.tag])}>{e.tag}</p>
            </div>
            <Reveal className="max-w-[680px]">
              <div className="group/iso mb-8 flex h-[220px] items-center justify-center rounded-panel border border-line-strong bg-canvas texture-dots">
                <div className="w-24 text-ink-soft transition-colors duration-300 group-hover/iso:text-accent-ink">
                  <Isocon name={e.icon as IsoconName} draw stroke={1} />
                </div>
              </div>
              <h2 className="text-h3 font-medium text-ink">{e.title}</h2>
              <p className="mt-3 text-base text-ink-2">{e.body}</p>
              <ul className="mt-5 flex flex-col gap-2">
                {e.points.map((p) => (
                  <li key={p} className="flex items-center gap-2 text-sm text-ink-soft">
                    <Check className="size-3.5 text-ink-3" /> {p}
                  </li>
                ))}
              </ul>
            </Reveal>
          </Container>
        </Section>
      ))}

      <Newsletter />
    </>
  )
}
