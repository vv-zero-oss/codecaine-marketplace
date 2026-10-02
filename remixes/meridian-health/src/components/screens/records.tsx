import { ChevronRight, FlaskConical, Plus, X } from "lucide-react"
import { useState } from "react"

import { NavRow, Screen } from "@/components/screens/kit"
import { cn } from "@/lib/utils"

type Rec = { id: number; kind: "Blood test" | "Clinical note" | "ECG"; title: string; date: string; month: string; detail: string }
const SEED: Rec[] = [
  { id: 1, kind: "Clinical note", title: "Outpatient clinical visit", date: "Dec 11, 2025", month: "December 2025", detail: "Dr. Okafor — blood pressure 118/74, no changes to medication. Follow up in six months." },
  { id: 2, kind: "ECG", title: "Resting ECG, 12-lead", date: "Dec 8, 2025", month: "December 2025", detail: "Sinus rhythm, 54 bpm. No abnormalities detected." },
  { id: 3, kind: "Blood test", title: "Fasting glucose & metabolic panel", date: "Nov 20, 2025", month: "November 2025", detail: "12 biomarkers: glucose 4.9 mmol/L, ApoB 0.71 g/L, ferritin 96 µg/L. All in range." },
  { id: 4, kind: "Blood test", title: "Lipid panel", date: "Nov 2, 2025", month: "November 2025", detail: "LDL 2.1 mmol/L, HDL 1.7 mmol/L. Trending down since March." },
]
const KIND_STYLE = { "Blood test": "bg-mint/15 text-mint", "Clinical note": "bg-accent/15 text-accent", ECG: "bg-rose/15 text-rose" } as const
const FILTERS = ["All", "Blood test", "Clinical note", "ECG"] as const

export function RecordsScreen() {
  const [records, setRecords] = useState(SEED)
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("All")
  const [open, setOpen] = useState<number | null>(null)
  const list = records.filter((r) => filter === "All" || r.kind === filter)
  const months = [...new Set(list.map((r) => r.month))]
  const add = () =>
    setRecords([{ id: Date.now(), kind: "Blood test", title: "Vitamin D & B12 (just uploaded)", date: "Today", month: "December 2025", detail: "Imported from your lab’s portal. Vitamin D 74 nmol/L, B12 410 pmol/L — both in range." }, ...records])
  return (
    <Screen className="bg-[linear-gradient(#e7edfb,#fff_200px)]">
      <NavRow
        left={<span className="grid size-9 place-items-center rounded-full bg-paper shadow-sm"><X className="size-4" /></span>}
        right={<button onClick={add} aria-label="Add a record" className="grid size-9 place-items-center rounded-full bg-paper shadow-sm transition-transform active:scale-90"><Plus className="size-4" /></button>}
      />
      <h3 className="mt-1 text-[26px] font-semibold tracking-tight">Health Records</h3>
      <div className="mt-3 -mr-5 flex gap-2 overflow-x-auto pr-5 pb-1 [scrollbar-width:none]">
        {FILTERS.map((f) => (
          <button key={f} onClick={() => setFilter(f)} className={cn("h-8 shrink-0 rounded-full px-3.5 text-[13px] font-medium transition-colors", filter === f ? "bg-ink text-paper" : "bg-paper text-ink-2 shadow-sm")}>{f}</button>
        ))}
      </div>
      {months.map((m) => (
        <div key={m} className="mt-5">
          <div className="text-[15px] font-semibold">{m}</div>
          <ul className="mt-2 divide-y divide-line">
            {list.filter((r) => r.month === m).map((r) => (
              <li key={r.id}>
                <button onClick={() => setOpen(open === r.id ? null : r.id)} className="flex w-full items-center gap-3 py-3 text-left">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-tint"><FlaskConical className="size-5 text-ink-3" /></span>
                  <span className="min-w-0 flex-1">
                    <span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", KIND_STYLE[r.kind])}>{r.kind}</span>
                    <span className="mt-1 block truncate text-[15px] font-medium">{r.title}</span>
                    <span className="block text-[12px] text-ink-3">Date of service: {r.date}</span>
                  </span>
                  <ChevronRight className={cn("size-4 text-ink-3 transition-transform duration-200", open === r.id && "rotate-90")} />
                </button>
                <div className={cn("grid transition-[grid-template-rows] duration-300 ease-out", open === r.id ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}>
                  <p className="overflow-hidden rounded-xl bg-tint text-[13px] leading-snug text-ink-2"><span className="block p-3">{r.detail}</span></p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
      {list.length === 0 && <p className="mt-10 text-center text-[14px] text-ink-3">Nothing here yet.</p>}
    </Screen>
  )
}
