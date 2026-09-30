import { AnimatePresence, LayoutGroup, motion } from "motion/react"
import { useState } from "react"

import { useCanvasAction } from "@canvas/react"

import { CtaBand } from "@/components/layout/site-footer"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeader } from "@/components/ui/heading"
import { WorkCard } from "@/components/work/work-card"
import { CASES, type ServiceKey } from "@/content"
import { cn } from "@/lib/utils"

const FILTERS: { key: "all" | ServiceKey; label: string }[] = [
  { key: "all", label: "All" },
  { key: "animation", label: "Animation" },
  { key: "video", label: "Film" },
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
      <section data-tone="light" className="pt-40 pb-section md:pt-48">
        <Container>
          <Reveal>
            <SectionHeader as="h1" size="xl" label="Work" title="Selected projects, 2023–2026." />
          </Reveal>
          <LayoutGroup>
            <div role="tablist" aria-label="Filter work" className="mt-16 flex flex-wrap gap-x-6 gap-y-2 border-b border-line pb-4 md:ml-[25%]">
              {FILTERS.map((f) => {
                const active = filter === f.key
                const count = f.key === "all" ? CASES.length : CASES.filter((c) => c.services.includes(f.key as ServiceKey)).length
                return (
                  <button
                    key={f.key}
                    role="tab"
                    aria-selected={active}
                    onClick={() => setFilter(f.key)}
                    className={cn("relative h-10 text-sm transition-opacity duration-(--duration-fast)", active ? "opacity-100" : "opacity-50 hover:opacity-100")}
                  >
                    {f.label} <sup className="font-mono text-[10px]">{count}</sup>
                    {active ? (
                      <motion.span layoutId="work-filter" className="absolute inset-x-0 -bottom-[17px] h-px bg-ink" transition={{ type: "spring", duration: 0.4, bounce: 0 }} />
                    ) : null}
                  </button>
                )
              })}
            </div>
            <motion.ul layout className="mt-12 grid gap-x-6 gap-y-16 md:grid-cols-2">
              <AnimatePresence mode="popLayout">
                {shown.map((item) => (
                  <motion.li
                    key={item.slug}
                    layout
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <WorkCard item={item} index={CASES.indexOf(item)} />
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
