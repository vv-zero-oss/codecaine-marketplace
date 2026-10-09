import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { RotateCcw } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CoffeeCard } from "@/components/blocks/coffee-card"
import { Doodle } from "@/components/mock/doodles"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { COFFEES, MERCH, type Coffee } from "@/content/products"
import { cn } from "@/lib/utils"
import { MerchTile } from "./merch-tile"
import { SortSelect } from "./sort-select"

type Tab = "coffee" | "merch"
type RoastFilter = "all" | Coffee["roast"]
type ProcessFilter = "all" | "Washed" | "Natural" | "Honey" | "Decaf"
type Sort = "featured" | "price-asc" | "price-desc" | "light-dark"

const ACCENTS = ["rust", "ember", "sky", "honey"] as const
const SORTS: { value: Sort; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price, low to high" },
  { value: "price-desc", label: "Price, high to low" },
  { value: "light-dark", label: "Lightest to darkest" },
]

const isSingle = (c: Coffee) => !c.origin.includes(",")

/**
 * The shelf itself: a sticky bar of filters under the header — Coffee or
 * Merch, roast, process, single origins only, sort, reset — over a grid of
 * hairline-ruled cells. The filters really filter; cards that leave fade
 * and shrink out while the rest slide into their new places (220ms
 * ease-out, layout animation; reduced motion just swaps). Nothing left?
 * An empty shelf with a way back.
 */
export function ShopShelf({ onCount }: { onCount?: (count: number, kind: string) => void }) {
  const [tab, setTab] = useState<Tab>("coffee")
  const [roast, setRoast] = useState<RoastFilter>("all")
  const [process, setProcess] = useState<ProcessFilter>("all")
  const [single, setSingle] = useState(false)
  const [sort, setSort] = useState<Sort>("featured")
  const reduced = useReducedMotion()

  // `/shop?filter=single` and `/shop?filter=merch` arrive pre-filtered
  useEffect(() => {
    const filter = new URLSearchParams(window.location.search).get("filter")
    if (filter === "merch") setTab("merch")
    if (filter === "single") setSingle(true)
  }, [])

  const reset = () => {
    setRoast("all")
    setProcess("all")
    setSingle(false)
    setSort("featured")
  }

  useCanvasAction("Shop tab: Merch", (next) => setTab((next ?? tab !== "merch") ? "merch" : "coffee"), { on: tab === "merch", group: "Shop" })
  const forcedEmpty = roast === "Dark" && process === "Honey"
  useCanvasAction(
    "Empty results",
    (next) => {
      setTab("coffee")
      if (next ?? !forcedEmpty) {
        setRoast("Dark")
        setProcess("Honey")
      } else reset()
    },
    { on: forcedEmpty, group: "Shop" },
  )

  const coffees = useMemo(() => {
    let list = COFFEES.filter(
      (c) =>
        (roast === "all" || c.roast === roast) &&
        (process === "all" || c.process.startsWith(process)) &&
        (!single || isSingle(c)),
    )
    if (sort === "price-asc") list = [...list].sort((a, b) => a.price - b.price)
    if (sort === "price-desc") list = [...list].sort((a, b) => b.price - a.price)
    if (sort === "light-dark") list = [...list].sort((a, b) => a.roastLevel - b.roastLevel)
    return list
  }, [roast, process, single, sort])

  const filtered = roast !== "all" || process !== "all" || single || sort !== "featured"
  const count = tab === "coffee" ? coffees.length : MERCH.length
  useEffect(() => onCount?.(count, tab === "coffee" ? (count === 1 ? "coffee" : "coffees") : "pieces of merch"), [count, tab, onCount])

  const cell = "border-b border-line sm:border-r"
  const transition = { duration: reduced ? 0 : 0.22, ease: [0.23, 1, 0.32, 1] as const }

  return (
    <section>
      {/* the sticky bar */}
      <div className="sticky top-14 z-30 border-b border-line bg-page/95 lg:top-[52px]">
        <div className="mx-auto flex max-w-[1600px] items-center gap-3 overflow-x-auto px-(--spacing-gutter) py-2.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <ToggleGroup type="single" variant="outline" value={tab} onValueChange={(v) => v && setTab(v as Tab)} aria-label="Shop section">
            <ToggleGroupItem value="coffee" className="h-9 px-4">Coffee</ToggleGroupItem>
            <ToggleGroupItem value="merch" className="h-9 px-4">Merch</ToggleGroupItem>
          </ToggleGroup>

          {tab === "coffee" && (
            <>
              <span className="h-6 w-px shrink-0 bg-line-strong" aria-hidden />
              <ToggleGroup type="single" spacing={1} value={roast} onValueChange={(v) => v && setRoast(v as RoastFilter)} aria-label="Roast">
                {(["all", "Light", "Medium", "Dark"] as const).map((r) => (
                  <ToggleGroupItem key={r} value={r} className="h-9 rounded-(--radius-button) px-3">
                    {r === "all" ? "Any roast" : r}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <span className="h-6 w-px shrink-0 bg-line-strong" aria-hidden />
              <ToggleGroup type="single" spacing={1} value={process} onValueChange={(v) => v && setProcess(v as ProcessFilter)} aria-label="Process">
                {(["all", "Washed", "Natural", "Honey", "Decaf"] as const).map((p) => (
                  <ToggleGroupItem key={p} value={p} className="h-9 rounded-(--radius-button) px-3">
                    {p === "all" ? "Any process" : p}
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
              <label className="flex h-9 shrink-0 cursor-pointer items-center gap-2 pl-1 text-[13.5px] whitespace-nowrap text-ink-2">
                <Switch checked={single} onCheckedChange={setSingle} />
                Single origins
              </label>
              <div className="ml-auto flex shrink-0 items-center gap-2 pl-2">
                <AnimatePresence initial={false}>
                  {filtered && (
                    <motion.div
                      initial={{ opacity: 0, transform: "scale(0.95)" }}
                      animate={{ opacity: 1, transform: "scale(1)" }}
                      exit={{ opacity: 0, transform: "scale(0.95)" }}
                      transition={{ duration: 0.15, ease: [0.23, 1, 0.32, 1] }}
                    >
                      <Button variant="ghost" size="sm" onClick={reset}>
                        <RotateCcw /> Reset
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
                <SortSelect value={sort} onChange={setSort} options={SORTS} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* the grid */}
      {tab === "coffee" ? (
        coffees.length ? (
          <motion.div layout={!reduced} className="grid sm:grid-cols-2 xl:grid-cols-4">
            <AnimatePresence mode="popLayout" initial={false}>
              {coffees.map((c, i) => (
                <motion.div
                  key={c.id}
                  layout={!reduced}
                  initial={{ opacity: 0, transform: "scale(0.97)" }}
                  animate={{ opacity: 1, transform: "scale(1)" }}
                  exit={{ opacity: 0, transform: "scale(0.97)" }}
                  transition={transition}
                  className={cell}
                >
                  <CoffeeCard coffeeId={c.id} accent={ACCENTS[i % ACCENTS.length]} className="h-full" />
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <div className="flex flex-col items-center gap-5 border-b border-line px-6 py-24 text-center">
            <Doodle name="record" className="w-32" />
            <p className="type-display text-h2">Nothing on this side.</p>
            <p className="max-w-[40ch] text-[16px] text-ink-2">
              No coffee on the shelf matches all of that right now. Loosen a filter, or flip the record over and start again.
            </p>
            <Button onClick={reset}>
              <RotateCcw /> Reset filters
            </Button>
          </div>
        )
      ) : (
        <div className="grid sm:grid-cols-2 xl:grid-cols-3">
          {MERCH.map((item) => (
            <MerchTile key={item.id} item={item} className={cn(cell)} />
          ))}
        </div>
      )}
    </section>
  )
}
