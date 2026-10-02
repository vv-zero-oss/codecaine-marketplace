import { Bot, Database, FileText, LayoutGrid, MessageSquare, Plug, BarChart3 } from "lucide-react"

import { Mark } from "@/components/ui/wordmark"
import { OUTPUTS, SOURCES } from "@/content"
import { cn } from "@/lib/utils"

const OUT_ICONS = [MessageSquare, BarChart3, FileText, Plug, LayoutGrid, Bot]

function DarkFrame({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("relative h-full overflow-hidden rounded-window bg-night-2 shadow-night", className)}>
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 [background:radial-gradient(60%_100%_at_50%_100%,var(--color-glow),transparent_75%)] opacity-70" />
      <div className="relative h-full">{children}</div>
    </div>
  )
}

/** Sources → semantic platform → outputs, with the connecting lines drawn in. */
export function SemanticDiagram() {
  return (
    <DarkFrame>
      <div className="grid h-full grid-cols-[auto_1fr_auto] items-center gap-3 p-4 text-[9px] text-ink-inverse sm:gap-6 sm:p-8">
        <div className="space-y-2">
          {SOURCES.map((s) => <p key={s} className="flex items-center gap-1.5 rounded-lg border border-line-inverse bg-night-3 px-2 py-1.5"><Database className="size-3 text-ink-inverse-2" />{s}</p>)}
        </div>
        <div className="relative rounded-2xl border border-line-inverse bg-night-3/70 p-3 sm:p-4">
          <svg aria-hidden viewBox="0 0 40 100" preserveAspectRatio="none" className="absolute top-0 -left-6 hidden h-full w-6 sm:block" fill="none">
            {[10, 30, 50, 70, 90].map((y, i) => <path key={y} d={`M0 ${y} C 24 ${y}, 16 50, 40 50`} stroke="white" strokeOpacity="0.28" strokeWidth="0.8" vectorEffect="non-scaling-stroke" strokeDasharray="2 3" pathLength="1" style={{ strokeDashoffset: 0, animation: `draw 1.2s var(--ease-out-soft) ${i * 90}ms both` }} />)}
          </svg>
          <p className="flex items-center gap-1.5 text-[11px] font-medium"><Mark className="size-4" />Fathom</p>
          <p className="mb-3 text-ink-inverse-2">Semantic platform</p>
          <p className="rounded-lg border border-line-inverse bg-night-2 py-4 text-center">Semantic model</p>
          <div className="mt-2 grid grid-cols-3 gap-2">{["Context", "Caching", "Control"].map((s) => <p key={s} className="rounded-lg border border-line-inverse bg-night-2 py-3 text-center">{s}</p>)}</div>
        </div>
        <div className="space-y-1.5 rounded-xl border border-line-inverse bg-night-3/70 p-2.5">
          {OUTPUTS.map((o, i) => { const I = OUT_ICONS[i]; return <p key={o} className="flex items-center gap-1.5 py-0.5"><I className="size-3 text-ink-inverse-2" />{o}</p> })}
        </div>
      </div>
    </DarkFrame>
  )
}

const Code = ({ lines }: { lines: string[] }) => (
  <pre className="h-full overflow-hidden p-5 pt-8 font-mono text-[10px] leading-relaxed text-ink-inverse-2 sm:p-8">
    {lines.map((l, i) => <span key={i} className="block"><span className="mr-4 inline-block w-4 text-right text-white/20 select-none">{i + 1}</span>{l}</span>)}
  </pre>
)

export const ApiPanel = () => (
  <DarkFrame><Code lines={["curl https://api.fathom.example/v1/query \\", "  -H 'Authorization: Bearer $FATHOM_KEY' \\", "  -d '{", '    "metrics": ["net_revenue"],', '    "dimensions": ["segment"],', '    "time": "last_30_days"', "  }'", "", "→ 200 OK  ·  41 ms  ·  cached"]} /></DarkFrame>
)

export const CodePanel = () => (
  <DarkFrame><Code lines={["metric: net_revenue", "label: Net revenue", "type: sum", "sql: amount_usd - refunds_usd", "filters:", "  - status = 'settled'", "dimensions: [segment, region, plan]", "owner: finance@company", "tests:", "  - not_null: [amount_usd]"]} /></DarkFrame>
)

const CATALOG = [["net_revenue", "Finance", "Today"], ["activation_rate", "Product", "1h ago"], ["weekly_active", "Growth", "Today"], ["support_csat", "Support", "6h ago"], ["pipeline_value", "Sales", "Today"]]
export const CatalogPanel = () => (
  <DarkFrame>
    <div className="space-y-1 p-5 pt-8 text-[10px] text-ink-inverse sm:p-8">
      <p className="mb-3 rounded-lg border border-line-inverse bg-night-3 px-3 py-2 text-ink-inverse-2">Search 214 metrics…</p>
      {CATALOG.map(([m, o, f]) => <p key={m} className="grid grid-cols-[1.4fr_1fr_auto] items-center gap-3 border-b border-line-inverse py-2"><span className="font-mono">{m}</span><span className="text-ink-inverse-2">{o}</span><span className="text-ink-inverse-2">{f}</span></p>)}
    </div>
  </DarkFrame>
)

export const PLATFORM_PANELS = [SemanticDiagram, ApiPanel, CatalogPanel, CodePanel]
