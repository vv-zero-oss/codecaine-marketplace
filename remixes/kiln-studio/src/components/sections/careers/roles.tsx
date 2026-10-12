import { useMemo, useState } from "react"
import { ArrowRight } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-label"
import { ApplySheet } from "@/components/sections/careers/apply-sheet"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ROLES, type Department } from "@/data/studio"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

const DEPARTMENTS: (Department | "All")[] = ["All", "Design", "Engineering", "Strategy", "Production"]
const CITIES = ["Anywhere", "Lisbon", "Montréal"] as const

/** A filter chip with its count; the count is what's left once the other filter is applied. */
function Chip({ label, count, on, onClick }: { label: string; count: number; on: boolean; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={() => {
        play("tick")
        onClick()
      }}
      className={cn(
        "inline-flex h-11 items-center gap-2 rounded-full px-4 text-[15px] transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) active:scale-[0.97]",
        on ? "bg-bone text-bone-ink" : "text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-3)] hover:bg-panel-2 hover:text-ink",
      )}
    >
      {label}
      <span className={cn("font-mono text-[11px] tabular-nums", on ? "text-bone-ink-2" : "text-ink-4")}>{count}</span>
    </button>
  )
}

/**
 * Open roles: filter by team and city, open one to read it, apply in a
 * sheet. Nothing here is decorative — the counts are live, the filters
 * filter, the apply button carries the role into the form.
 */
export function Roles() {
  const [dept, setDept] = useState<Department | "All">("All")
  const [city, setCity] = useState<(typeof CITIES)[number]>("Anywhere")
  const [applying, setApplying] = useState<string | null>(null)
  const [last, setLast] = useState("Open application")
  useCanvasAction("Apply sheet", (next) => {
    const on = next ?? !applying
    setApplying(on ? last : null)
  }, { on: !!applying, group: "Careers" })

  const inCity = (r: (typeof ROLES)[number]) => city === "Anywhere" || r.city === city || r.city === "Either"
  const roles = useMemo(() => ROLES.filter((r) => (dept === "All" || r.department === dept) && inCity(r)), [dept, city]) // eslint-disable-line react-hooks/exhaustive-deps

  const apply = (title: string) => {
    play("open")
    setLast(title)
    setApplying(title)
  }

  return (
    <section id="roles" aria-label="Open roles" className="scroll-mt-24 px-(--spacing-gutter) py-(--spacing-section)">
      <SectionHeading index="02" label="Open roles" title={`${ROLES.length} seats at the table.`} continuation="Pull one up." />
      <div className="mt-12 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap gap-2" aria-label="Team">
          {DEPARTMENTS.map((d) => (
            <Chip key={d} label={d} on={dept === d} onClick={() => setDept(d)} count={ROLES.filter((r) => (d === "All" || r.department === d) && inCity(r)).length} />
          ))}
        </div>
        <div role="radiogroup" aria-label="City" className="flex w-fit gap-1 rounded-full bg-panel-2 p-1">
          {CITIES.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={city === c}
              onClick={() => {
                setCity(c)
                play("tick")
              }}
              className={cn("h-9 rounded-full px-4 text-[14px] transition-[background-color,color] duration-(--duration-hover)", city === c ? "bg-bone text-bone-ink" : "text-ink-3 hover:text-ink")}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {roles.length === 0 ? (
        <div className="mt-10 flex flex-col items-start gap-4 border-t border-line-2 py-14">
          <p className="text-lead text-ink-2">Nothing open there right now — but we read every open application.</p>
          <Button variant="soft" onClick={() => apply("Open application")}>
            Send an open application
          </Button>
        </div>
      ) : (
        <Accordion type="single" collapsible className="mt-10 border-t border-line-2">
          {roles.map((r) => (
            <AccordionItem key={r.id} value={r.id} className="border-line-2">
              <AccordionTrigger
                onPointerEnter={() => play("tick")}
                className="group/role items-center gap-6 rounded-none py-6 hover:no-underline [&>svg]:size-5 [&>svg]:text-ink-3"
              >
                <span className="grid flex-1 gap-2 md:grid-cols-[1.6fr_1fr_1fr] md:items-center">
                  <span className="type-head text-h4 text-ink transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/role:translate-x-1">{r.title}</span>
                  <span className="text-[15px] font-normal text-ink-3">{r.department}</span>
                  <span className="flex flex-wrap gap-1.5">
                    <Badge variant="outline">{r.city === "Either" ? "Lisbon or Montréal" : r.city}</Badge>
                    <Badge variant={r.type === "Freelance" ? "ember" : "default"}>{r.type}</Badge>
                  </span>
                </span>
              </AccordionTrigger>
              <AccordionContent className="pb-10">
                <div className="grid gap-10 md:grid-cols-[1.6fr_2fr]">
                  <div className="flex flex-col items-start gap-6">
                    <p className="max-w-[36ch] text-lead text-ink-2">{r.summary}</p>
                    <Button onClick={() => apply(r.title)}>
                      Apply for this role <ArrowRight />
                    </Button>
                  </div>
                  <div className="grid gap-8 sm:grid-cols-2">
                    {[
                      ["You'll", r.youll],
                      ["You have", r.youhave],
                    ].map(([head, items]) => (
                      <div key={head as string}>
                        <p className="type-label text-ink-4">{head as string}</p>
                        <ul className="mt-3 flex flex-col gap-2.5">
                          {(items as string[]).map((it) => (
                            <li key={it} className="flex gap-3 text-[16px] text-ink-2">
                              <span aria-hidden className="mt-[9px] size-[5px] shrink-0 rounded-full bg-ember" />
                              {it}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      )}
      <ApplySheet role={applying ?? last} open={!!applying} onOpenChange={(o) => setApplying(o ? last : null)} />
    </section>
  )
}
