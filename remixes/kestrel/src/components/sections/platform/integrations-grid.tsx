import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { Search, X } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { INTEGRATIONS } from "@/content/platform"
import { cn } from "@/lib/utils"

const KINDS = ["All", ...Array.from(new Set(INTEGRATIONS.map((i) => i.kind)))]

/**
 * The tools Kestrel talks to, searchable and filterable — so a visitor can
 * check for theirs instead of taking our word for it.
 */
export function IntegrationsGrid() {
  const [query, setQuery] = useState("")
  const [kind, setKind] = useState("All")
  const shown = INTEGRATIONS.filter(
    (i) => (kind === "All" || i.kind === kind) && `${i.name} ${i.kind}`.toLowerCase().includes(query.trim().toLowerCase()),
  )

  return (
    <section className="py-(--spacing-section)">
      <Container>
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <SectionHeading
            title="Fits the stack you have."
            continuation="Replaces the spreadsheets you don't want."
            body="Two-way sync with your ledger, payroll, HR and travel tools — set up in minutes, and every field maps where you'd expect."
          />
          <label className="relative flex h-11 w-full items-center rounded-(--radius-field) bg-panel shadow-(--shadow-field) lg:w-72">
            <Search className="pointer-events-none absolute left-3 size-4 text-ink-3" />
            <span className="sr-only">Search integrations</span>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search integrations"
              className="h-full w-full bg-transparent pr-9 pl-9 text-[15px] outline-none placeholder:text-ink-3"
            />
            {query && (
              <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-1 grid size-9 place-items-center text-ink-3 hover:text-ink">
                <X className="size-4" />
              </button>
            )}
          </label>
        </div>
        <div className="mt-8 flex gap-1.5 overflow-x-auto pb-1 [scrollbar-width:none]">
          {KINDS.map((k) => (
            <button
              key={k}
              type="button"
              onClick={() => setKind(k)}
              className={cn("min-h-9 shrink-0 rounded-full px-3.5 text-[14px] transition-colors duration-(--duration-hover)", kind === k ? "bg-ink text-page" : "bg-panel text-ink-2 hover:text-ink")}
            >
              {k}
            </button>
          ))}
        </div>
        <motion.ul layout className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <AnimatePresence initial={false} mode="popLayout">
            {shown.map((i) => (
              <motion.li
                key={i.name}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="group flex flex-col gap-6 rounded-(--radius-card) bg-raised p-4 shadow-(--shadow-card) transition-[box-shadow,transform] duration-(--duration-hover) hover:-translate-y-0.5 hover:shadow-(--shadow-float)"
              >
                <span className="grid size-10 place-items-center rounded-(--radius-field) bg-panel text-[14px] font-semibold tracking-[-0.03em] transition-colors duration-(--duration-hover) group-hover:bg-lime">
                  {i.mono}
                </span>
                <span>
                  <span className="block text-[15px] font-medium">{i.name}</span>
                  <span className="block text-[13px] text-ink-3">{i.kind}</span>
                </span>
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
        {!shown.length && (
          <p className="mt-6 rounded-(--radius-card) bg-panel p-8 text-center text-[15px] text-ink-2">
            No match for “{query}”. We add integrations every month — <button type="button" onClick={() => { setQuery(""); setKind("All") }} className="underline underline-offset-4">clear the search</button>.
          </p>
        )}
      </Container>
    </section>
  )
}
