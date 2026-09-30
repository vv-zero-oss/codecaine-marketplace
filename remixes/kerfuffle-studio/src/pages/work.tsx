import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { CtaBand } from "@/components/layout/site-footer"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { DisplayHeading } from "@/components/ui/heading"
import { WorkCard } from "@/components/work/work-card"
import { CASES, type ServiceKey } from "@/content"
import { cn } from "@/lib/utils"

const FILTERS: { key: "all" | ServiceKey; label: string }[] = [
  { key: "all", label: "All work" },
  { key: "animation", label: "Animation" },
  { key: "video", label: "Video" },
  { key: "social", label: "Social" },
]

export function WorkPage() {
  const [filter, setFilter] = useState<"all" | ServiceKey>("all")
  useCanvasAction("Show animation only", (on) => setFilter((on ?? filter !== "animation") ? "animation" : "all"), {
    group: "Work",
    on: filter === "animation",
  })
  const shown = CASES.filter((c) => filter === "all" || c.services.includes(filter))
  return (
    <>
      <section data-tone="light" className="pt-36 pb-section md:pt-44">
        <Container>
          <Reveal>
            <DisplayHeading as="h1" eyebrow="Selected projects, 2023 – 2026" bold="The" serif="archive" inline size="xl" align="left" />
          </Reveal>
          <LayoutGroup>
            <div role="tablist" aria-label="Filter work" className="mt-10 flex flex-wrap gap-2">
              {FILTERS.map((f) => {
                const active = filter === f.key
                const count = f.key === "all" ? CASES.length : CASES.filter((c) => c.services.includes(f.key as ServiceKey)).length
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.key)}
                    className={cn(
                      "relative h-11 rounded-pill border-2 border-ink px-5 label text-xs transition-colors duration-(--duration-fast)",
                      active ? "text-ink" : "bg-card text-ink hover:bg-paper",
                    )}
                  >
                    {active ? (
                      <motion.span layoutId="work-filter" className="absolute -inset-[2px] rounded-pill border-2 border-ink bg-lime" transition={{ type: "spring", stiffness: 500, damping: 38 }} />
                    ) : null}
                    <span className="relative">
                      {f.label} <span className="font-mono text-[11px] font-normal opacity-70">{count}</span>
                    </span>
                  </button>
                )
              })}
            </div>
            <motion.ul layout className="mt-14 grid gap-x-6 gap-y-14 sm:grid-cols-2 md:mt-16 lg:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {shown.map((item) => (
                  <motion.li
                    key={item.slug}
                    layout
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.94 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <WorkCard item={item} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          </LayoutGroup>
        </Container>
      </section>
      <CtaBand />
    </>
  )
}
