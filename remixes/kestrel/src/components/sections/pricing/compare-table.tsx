import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Check, ChevronDown, Minus } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { COMPARISON, PLANS, type Cell } from "@/content/pricing"
import { cn } from "@/lib/utils"

function Value({ cell }: { cell: Cell }) {
  if (cell === true) return <Check className="size-4 text-ink" strokeWidth={2.2} aria-label="Included" />
  if (cell === false) return <Minus className="size-4 text-ink-4" aria-label="Not included" />
  return <span className="text-[14px] text-ink-2">{cell}</span>
}

/** Desktop: one table, a header row that stays under the site header, groups that fold. */
function DesktopTable() {
  const [closed, setClosed] = useState<string[]>([])
  const toggle = (label: string) => setClosed((all) => (all.includes(label) ? all.filter((l) => l !== label) : [...all, label]))
  return (
    <div className="hidden md:block">
      <Table className="table-fixed">
        <TableHeader className="sticky top-[58px] z-10 bg-page/95 backdrop-blur-md [&_tr]:border-line-strong">
          <TableRow className="hover:bg-transparent">
            <TableHead className="w-[34%] py-4 text-[14px] font-normal text-ink-3">Compare plans</TableHead>
            {PLANS.map((p) => (
              <TableHead key={p.id} className={cn("py-4 text-[16px]", p.featured && "bg-panel/60")}>
                {p.name}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        {COMPARISON.map((group) => {
          const open = !closed.includes(group.label)
          return (
            <TableBody key={group.label}>
              <TableRow className="border-line hover:bg-transparent">
                <TableCell colSpan={4} className="p-0">
                  <button
                    type="button"
                    aria-expanded={open}
                    onClick={() => toggle(group.label)}
                    className="flex min-h-12 w-full items-center gap-2 px-3 pt-5 text-left text-[15px] font-medium"
                  >
                    <ChevronDown className={cn("size-4 text-ink-3 transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", !open && "-rotate-90")} />
                    {group.label}
                    <span className="text-[13px] font-normal text-ink-3">{group.rows.length}</span>
                  </button>
                </TableCell>
              </TableRow>
              {open &&
                group.rows.map((row) => (
                  <TableRow key={row.label} className="hover:bg-panel/50">
                    <TableCell className="text-ink-2">{row.label}</TableCell>
                    {row.values.map((v, i) => (
                      <TableCell key={i} className={cn(PLANS[i].featured && "bg-panel/60")}>
                        <Value cell={v} />
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
            </TableBody>
          )
        })}
      </Table>
    </div>
  )
}

/** Phones: pick a plan, read its column as a list. */
function MobileTable() {
  const [plan, setPlan] = useState(1)
  const reduced = useReducedMotion()
  return (
    <div className="md:hidden">
      <div className="sticky top-[58px] z-10 -mx-4 bg-page/95 px-4 py-2 backdrop-blur-md sm:-mx-6 sm:px-6">
        <div role="tablist" aria-label="Plan" className="grid grid-cols-3 rounded-full bg-panel p-1">
          {PLANS.map((p, i) => (
            <button
              key={p.id}
              type="button"
              role="tab"
              aria-selected={plan === i}
              onClick={() => setPlan(i)}
              className={cn("relative min-h-10 rounded-full text-[14px] transition-colors", plan === i ? "text-ink" : "text-ink-3")}
            >
              {plan === i && <motion.span layoutId="compare-plan" className="absolute inset-0 rounded-full bg-raised shadow-(--shadow-card)" transition={reduced ? { duration: 0 } : { type: "spring", duration: 0.35, bounce: 0.15 }} />}
              <span className="relative">{p.name}</span>
            </button>
          ))}
        </div>
      </div>
      {COMPARISON.map((group) => (
        <div key={group.label} className="mt-6">
          <p className="text-[15px] font-medium">{group.label}</p>
          <ul className="mt-2">
            {group.rows.map((row) => (
              <li key={row.label} className="flex min-h-11 items-center justify-between gap-4 border-b border-line py-2 text-[14px] text-ink-2">
                {row.label}
                <Value cell={row.values[plan]} />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

/** Every line of every plan, for the buyer who reads the small print first. */
export function CompareTable() {
  return (
    <section className="py-(--spacing-section)">
      <Container>
        <SectionHeading title="The whole list." continuation="Nothing hidden in a footnote." className="mb-10" />
        <DesktopTable />
        <MobileTable />
      </Container>
    </section>
  )
}
