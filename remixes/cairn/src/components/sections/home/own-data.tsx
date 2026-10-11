import { useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { FileUp, Plus, Table2, X } from "lucide-react"

import { FeatureRow } from "@/components/blocks/feature-row"
import { CityMap } from "@/components/map/city-map"
import { BrowserFrame, SkyPanel } from "@/components/map/frames"
import { Button } from "@/components/ui/button"
import { AREAS, CATEGORIES, PLACES, type AreaId, type Category, type Place } from "@/content/places"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

type Row = { id: string; name: string; area: AreaId; category: Category }

/** A photo for a row, from a place of the same kind. */
const PHOTO_FOR = Object.fromEntries(
  (Object.keys(CATEGORIES) as Category[]).map((c) => [c, PLACES.find((p) => p.category === c)?.photo ?? 39784928]),
) as Record<Category, number>

const START: Row[] = [
  { id: "r1", name: "Ferrol Bakehouse", area: "lantern", category: "food" },
  { id: "r2", name: "Pilot Coffee Bar", area: "old-port", category: "coffee" },
  { id: "r3", name: "Paper Moon Books", area: "millrace", category: "shops" },
  { id: "r4", name: "Fernhill Park", area: "fernhill", category: "outdoors" },
  { id: "r5", name: "Brick Row", area: "terraces", category: "homes" },
]

/** A row's spot: its neighbourhood, nudged so two rows never share one. */
function toPlace(row: Row, index: number): Place {
  const area = AREAS[row.area]
  const angle = index * 2.399 // the golden angle, so rows in one area fan out
  const r = 26 + (index % 3) * 14
  return {
    id: row.id,
    name: row.name || "Untitled place",
    category: row.category,
    area: row.area,
    x: area.x + Math.cos(angle) * r,
    y: area.y - 24 + Math.sin(angle) * r * 0.7,
    photo: PHOTO_FOR[row.category],
    blurb: `${CATEGORIES[row.category].label} in ${area.name}`,
  }
}

const AREA_BY_NAME = Object.fromEntries(Object.entries(AREAS).map(([id, a]) => [a.name.toLowerCase(), id as AreaId]))

/** name, neighbourhood, category — a header row is skipped, quotes handled. */
function parseCsv(text: string): Row[] {
  const lines = text.split(/\r?\n/).filter((l) => l.trim())
  const cells = (line: string) => (line.match(/("([^"]|"")*"|[^,]*)(,|$)/g) ?? []).map((c) => c.replace(/,$/, "").replace(/^"|"$/g, "").replace(/""/g, '"').trim())
  const rows = lines.map(cells).filter((c) => c[0] && c[0].toLowerCase() !== "name")
  return rows.slice(0, 40).map(([name, area = "", category = ""], i) => ({
    id: `csv-${Date.now()}-${i}`,
    name,
    area: AREA_BY_NAME[area.toLowerCase()] ?? "lantern",
    category: ((Object.keys(CATEGORIES) as Category[]).find((c) => c === category.toLowerCase() || CATEGORIES[c].label.toLowerCase() === category.toLowerCase()) ?? "food") as Category,
  }))
}

/**
 * Proof that the map is your data: a spreadsheet and the map it makes,
 * side by side, both live. Rename a row, move it to another neighbourhood or
 * change its kind and its pin follows; add a row and a pin drops in; import
 * a CSV of your own and the map redraws.
 */
export function OwnData() {
  const reduced = useReducedMotion()
  const [rows, setRows] = useState<Row[]>(START)
  const [selected, setSelected] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)
  const file = useRef<HTMLInputElement>(null)
  const places = useMemo(() => rows.map(toPlace), [rows])

  const update = (id: string, patch: Partial<Row>) => setRows((rs) => rs.map((r) => (r.id === id ? { ...r, ...patch } : r)))
  const add = () => {
    const id = `r${Date.now()}`
    const areas = Object.keys(AREAS) as AreaId[]
    setRows((rs) => [...rs, { id, name: "New place", area: areas[rs.length % areas.length], category: "food" }])
    setSelected(id)
  }
  const importCsv = async (f: File | undefined) => {
    if (!f) return
    const parsed = parseCsv(await f.text())
    if (!parsed.length) {
      setNotice("That file had no rows Cairn could read. Try name, neighbourhood, category.")
      return
    }
    setRows(parsed)
    setSelected(null)
    setNotice(`Imported ${parsed.length} ${parsed.length === 1 ? "place" : "places"} from ${f.name}`)
  }

  return (
    <FeatureRow
      id="own-data"
      title="Bring your own list."
      body="Import a CSV, a Google Sheet or an Airtable base — all Cairn needs is a name and where it is. Edit a row here and watch its pin move."
      action={
        <div className="flex flex-col items-start gap-3">
          <div className="flex flex-wrap gap-3">
            <Button variant="outline" onClick={() => file.current?.click()}>
              <FileUp /> Import a CSV
            </Button>
            <Button variant="ghost" onClick={add}>
              <Plus /> Add a row
            </Button>
          </div>
          <input ref={file} type="file" accept=".csv,text/csv" className="sr-only" onChange={(e) => importCsv(e.target.files?.[0])} />
          <AnimatePresence>
            {notice ? (
              <motion.p
                key={notice}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-[13.5px] text-ink-3"
              >
                {notice}
              </motion.p>
            ) : (
              <p className="text-[13.5px] text-ink-soft">Columns: name, neighbourhood, category.</p>
            )}
          </AnimatePresence>
        </div>
      }
      media={
        <SkyPanel photo={pexels(11715909, 1100, 1000)} className="relative aspect-[476/430] overflow-hidden">
          {/* the sheet, behind */}
          <div className="absolute top-[7%] bottom-[7%] left-[4%] w-[66%]">
            <BrowserFrame url="sheets · halden-places.csv" className="h-full" bodyClassName="flex flex-col">
              <div className="flex h-7 shrink-0 items-center gap-1.5 border-b border-line bg-panel px-2 text-[10.5px] text-ink-3">
                <Table2 className="size-3" /> halden-places
              </div>
              <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-auto">
                <table className="w-full table-fixed border-collapse text-[11px]">
                  <thead className="sticky top-0 bg-raised text-left text-[10px] font-medium text-ink-3">
                    <tr className="[&>th]:border-b [&>th]:border-line [&>th]:px-1.5 [&>th]:py-1">
                      <th className="w-5 text-center">#</th>
                      <th>Name</th>
                      <th className="w-[30%]">Neighbourhood</th>
                      <th className="w-[24%]">Category</th>
                      <th className="w-5" aria-label="Remove" />
                    </tr>
                  </thead>
                  <tbody>
                    <AnimatePresence initial={false}>
                      {rows.map((row, i) => (
                        <motion.tr
                          key={row.id}
                          layout={!reduced}
                          initial={reduced ? false : { opacity: 0, y: -6 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3, ease: [0.23, 1, 0.32, 1] }}
                          onFocus={() => setSelected(row.id)}
                          className={cn("transition-colors duration-(--duration-hover) [&>td]:border-b [&>td]:border-line", row.id === selected && "bg-accent-soft")}
                        >
                          <td className="text-center text-[10px] text-ink-4 tabular-nums">{i + 1}</td>
                          <td>
                            <input
                              aria-label={`Row ${i + 1} name`}
                              value={row.name}
                              onChange={(e) => update(row.id, { name: e.target.value })}
                              className="h-7 w-full min-w-0 bg-transparent px-1.5 text-ink outline-none focus:bg-raised focus:shadow-[inset_0_0_0_1.5px_var(--color-accent)]"
                            />
                          </td>
                          <td>
                            <select
                              aria-label={`Row ${i + 1} neighbourhood`}
                              value={row.area}
                              onChange={(e) => update(row.id, { area: e.target.value as AreaId })}
                              className="h-7 w-full min-w-0 cursor-pointer truncate bg-transparent px-1 text-ink-2 outline-none focus:shadow-[inset_0_0_0_1.5px_var(--color-accent)]"
                            >
                              {Object.entries(AREAS).map(([id, a]) => (
                                <option key={id} value={id}>
                                  {a.name}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <select
                              aria-label={`Row ${i + 1} category`}
                              value={row.category}
                              onChange={(e) => update(row.id, { category: e.target.value as Category })}
                              className="h-7 w-full min-w-0 cursor-pointer bg-transparent px-1 outline-none focus:shadow-[inset_0_0_0_1.5px_var(--color-accent)]"
                              style={{ color: CATEGORIES[row.category].color }}
                            >
                              {(Object.keys(CATEGORIES) as Category[]).map((c) => (
                                <option key={c} value={c}>
                                  {CATEGORIES[c].label}
                                </option>
                              ))}
                            </select>
                          </td>
                          <td>
                            <button
                              type="button"
                              aria-label={`Remove ${row.name}`}
                              onClick={() => setRows((rs) => rs.filter((r) => r.id !== row.id))}
                              className="grid size-6 place-items-center rounded text-ink-4 transition-colors hover:bg-panel hover:text-signal-red"
                            >
                              <X className="size-3" />
                            </button>
                          </td>
                        </motion.tr>
                      ))}
                    </AnimatePresence>
                  </tbody>
                </table>
                <button
                  type="button"
                  onClick={add}
                  className="flex h-7 w-full items-center gap-1 px-2 text-[10.5px] text-ink-3 transition-colors hover:bg-panel hover:text-ink"
                >
                  <Plus className="size-3" /> New row
                </button>
              </div>
            </BrowserFrame>
          </div>
          {/* the map, in front */}
          <div className="absolute top-[18%] right-[4%] bottom-[4%] w-[46%]">
            <BrowserFrame url="cairn.page/halden-places" className="h-full">
              <CityMap
                places={places}
                theme="harbour"
                zoom={1.05}
                centerX={560}
                centerY={420}
                selectedId={selected}
                onSelect={setSelected}
                controls={false}
                className={cn("absolute inset-0")}
              />
            </BrowserFrame>
          </div>
        </SkyPanel>
      }
    />
  )
}
