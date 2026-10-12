import { useEffect, useMemo, useState } from "react"
import { X } from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { ProductCard } from "@/components/blocks/product-card"
import { Button } from "@/components/ui/button"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, SERIES, type Process, type SeriesId } from "@/content/coffees"
import { useSearchParam } from "@/lib/router"
import { cn } from "@/lib/utils"

type Sort = "featured" | "price-low" | "price-high" | "sweetest" | "boldest"
const SORTS: { id: Sort; label: string }[] = [
  { id: "featured", label: "Featured" },
  { id: "price-low", label: "Price, low first" },
  { id: "price-high", label: "Price, high first" },
  { id: "sweetest", label: "Sweetest" },
  { id: "boldest", label: "Most body" },
]
const PROCESSES: Process[] = ["Washed", "Natural", "Honey", "Anaerobic", "Wet-hulled", "Decaf"]

/**
 * Every coffee on one shelf, and the controls to narrow it: series chips
 * (also set from `?series=` so a menu link lands filtered), process chips,
 * a sort, and a reset. Cards re-flow with a layout animation as the shelf
 * changes; an empty result says so and offers the way back.
 */
export function Shelf({ onOpen }: { onOpen: (id: string) => void }) {
  const fromUrl = useSearchParam("series") as SeriesId | null
  const [series, setSeries] = useState<SeriesId[]>(fromUrl ? [fromUrl] : [])
  const [processes, setProcesses] = useState<Process[]>([])
  const [sort, setSort] = useState<Sort>("featured")

  useEffect(() => {
    setSeries(fromUrl ? [fromUrl] : [])
  }, [fromUrl])

  useCanvasAction("Shelf: no results", (next) => {
    const on = next ?? !(processes.includes("Decaf") && series.includes("recess"))
    setSeries(on ? ["recess"] : [])
    setProcesses(on ? ["Decaf"] : [])
  }, { on: processes.includes("Decaf") && series.includes("recess"), group: "Shop" })

  const shown = useMemo(() => {
    const list = COFFEES.filter((c) => (series.length ? series.includes(c.series) : true) && (processes.length ? processes.includes(c.process) : true))
    const by: Record<Sort, (a: (typeof list)[number], b: (typeof list)[number]) => number> = {
      featured: () => 0,
      "price-low": (a, b) => a.price - b.price,
      "price-high": (a, b) => b.price - a.price,
      sweetest: (a, b) => b.sweetness - a.sweetness,
      boldest: (a, b) => b.body - a.body,
    }
    return [...list].sort(by[sort])
  }, [series, processes, sort])

  const filtered = series.length + processes.length > 0

  return (
    <section id="shelf" className="px-[var(--spacing-gutter)] pb-[var(--spacing-section)]">
      <div className="sticky top-[84px] z-20 -mx-[var(--spacing-gutter)] border-y border-line bg-paper/92 px-[var(--spacing-gutter)] py-3 backdrop-blur-md lg:top-0 lg:pl-[calc(var(--spacing-gutter)+64px)]">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
          <ToggleGroup type="multiple" value={series} onValueChange={(v) => setSeries(v as SeriesId[])} className="flex flex-wrap gap-1.5" spacing={1} aria-label="Series">
            {SERIES.map((s) => (
              <ToggleGroupItem key={s.id} value={s.id} className="type-display h-9 rounded-[var(--radius-button)] px-3 pt-1 text-[17px] shadow-[inset_0_0_0_1.5px_var(--color-ink)] data-[state=on]:bg-ink data-[state=on]:text-paper">
                {s.short}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup type="multiple" value={processes} onValueChange={(v) => setProcesses(v as Process[])} className="flex flex-wrap gap-1" spacing={1} aria-label="Process">
            {PROCESSES.map((p) => (
              <ToggleGroupItem key={p} value={p} className="h-8 rounded-full px-3 text-[12.58px] text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)] data-[state=on]:bg-tomato-soft data-[state=on]:text-tomato-hover data-[state=on]:shadow-[inset_0_0_0_1px_var(--color-tomato)]">
                {p}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <div className="ml-auto flex items-center gap-3">
            <AnimatePresence>
              {filtered && (
                <motion.button
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  type="button"
                  onClick={() => {
                    setSeries([])
                    setProcesses([])
                  }}
                  className="flex items-center gap-1 text-caption text-ink-2 hover:text-tomato"
                >
                  <X className="size-3.5" /> Reset
                </motion.button>
              )}
            </AnimatePresence>
            <label className="flex items-center gap-2 text-caption text-ink-3">
              Sort
              <select value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="h-9 rounded-[var(--radius-field)] bg-raised px-2 text-[13px] text-ink shadow-[inset_0_0_0_1px_var(--color-line-strong)] outline-none focus:shadow-[inset_0_0_0_1.5px_var(--color-ink)]">
                {SORTS.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </div>

      <p className="mt-6 text-caption text-ink-3" aria-live="polite">
        {shown.length} {shown.length === 1 ? "coffee" : "coffees"}
        {filtered ? " match" : " on the shelf"}
      </p>

      {shown.length === 0 ? (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-8 rounded-[var(--radius-card)] bg-paper-2 px-6 py-16 text-center">
          <p className="type-display text-d3">Nothing on this shelf.</p>
          <p className="mx-auto mt-3 max-w-[40ch] text-ink-2">No coffee is all of those things at once — try one filter fewer.</p>
          <Button
            variant="outline"
            className="mt-6"
            onClick={() => {
              setSeries([])
              setProcesses([])
            }}
          >
            Show every coffee
          </Button>
        </motion.div>
      ) : (
        <motion.ul layout className="mt-4 grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 xl:grid-cols-4">
          <AnimatePresence mode="popLayout">
            {shown.map((c, i) => (
              <motion.li
                key={c.id}
                layout
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.42, delay: Math.min(i, 8) * 0.03, ease: [0.23, 1, 0.32, 1] }}
                className={cn(c.series === "field" && "")}
              >
                <ProductCard coffee={c} onOpen={onOpen} />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      )}
    </section>
  )
}
