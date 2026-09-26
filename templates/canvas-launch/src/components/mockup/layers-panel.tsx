import {
  ChevronDown,
  Columns2,
  Diamond,
  Eye,
  Frame,
  Images,
  Keyboard,
  Layers,
  Link,
  Maximize2,
  MonitorPlay,
  CirclePlus,
  Rows2,
  Search,
  Sparkles,
  SquareArrowOutUpRight,
  Type,
  type LucideIcon,
} from "lucide-react"

import { Mark } from "@/components/ui/mark"
import { cn } from "@/lib/utils"

/** The nav rail: Insert, Layers, Agent, Assets, Variables — Layers active. */
export function NavRail() {
  const tiles: [LucideIcon, string][] = [
    [CirclePlus, "Insert"],
    [Layers, "Layers"],
    [Sparkles, "Agent"],
    [Images, "Assets"],
    [Diamond, "Variables"],
  ]
  return (
    <nav className="flex w-[57px] shrink-0 flex-col items-center border-r border-ed-line bg-ed-panel pt-3 pb-4">
      <Mark className="mb-3 size-5 text-ed-ink" />
      {tiles.map(([Icon, label]) => (
        <div key={label} className="flex h-[62px] w-14 flex-col items-center justify-center gap-1">
          <span
            className={cn(
              "grid size-8 place-items-center rounded-[5px]",
              label === "Layers" ? "bg-ed-selected text-ed-accent" : "text-ed-text",
            )}
          >
            <Icon className="size-4" strokeWidth={1.5} />
          </span>
          <span className="text-[9px] leading-[14px] text-ed-text-2">{label}</span>
        </div>
      ))}
      <Keyboard className="mt-auto size-4 text-ed-text-2" strokeWidth={1.5} />
    </nav>
  )
}

type Layer = { name: string; icon: LucideIcon; depth: number; open?: boolean; leaf?: boolean; selected?: boolean; fill?: string }

/** A framed project, read by the SDK — so the rows are its components' names. */
const TREE: Layer[] = [
  { name: "localhost:5173", icon: MonitorPlay, depth: 0, open: true, fill: "bg-site-bg" },
  { name: "Navbar", icon: Columns2, depth: 1 },
  { name: "Hero", icon: Rows2, depth: 1, open: true },
  { name: "Eyebrow", icon: Type, depth: 2, leaf: true },
  { name: "SectionHeading", icon: Type, depth: 2, leaf: true },
  { name: "Lede", icon: Type, depth: 2, leaf: true },
  { name: "Actions", icon: Columns2, depth: 2, open: true },
  { name: "ButtonLink", icon: SquareArrowOutUpRight, depth: 3, leaf: true, selected: true, fill: "bg-site-feature" },
  { name: "Link", icon: Link, depth: 3, leaf: true },
  { name: "Pricing", icon: Frame, depth: 1, open: true },
  { name: "PlanCard", icon: Rows2, depth: 2, fill: "bg-site-bg" },
  { name: "PlanCard", icon: Rows2, depth: 2, fill: "bg-site-bg" },
  { name: "PlanCard", icon: Rows2, depth: 2, fill: "bg-site-feature" },
  { name: "Faq", icon: Rows2, depth: 1 },
  { name: "Footer", icon: Columns2, depth: 1 },
]

export function LayersPanel() {
  return (
    <div className="flex w-[255px] shrink-0 flex-col border-r border-ed-line bg-ed-panel">
      <div className="flex h-10 shrink-0 items-center gap-2 border-b border-ed-line px-4 text-[11px]">
        <span className="font-medium text-ed-text">Layers</span>
        <span className="ml-auto text-ed-text-3">1 layer selected</span>
        <Search className="size-3.5 text-ed-text-2" strokeWidth={1.5} />
        <Maximize2 className="size-3.5 text-ed-text-2" strokeWidth={1.5} />
      </div>
      <ul className="py-1">
        {TREE.map((layer, i) => (
          <li
            key={i}
            className={cn(
              "flex h-8 items-center gap-1.5 pr-2 text-[11px] leading-[18px] font-medium text-ed-text",
              layer.selected && "bg-ed-selected",
            )}
            style={{ paddingLeft: 12 + layer.depth * 14 }}
          >
            <ChevronDown
              className={cn("size-4 shrink-0 text-ed-text-3", layer.leaf && "invisible", !layer.open && "-rotate-90")}
              strokeWidth={1.5}
            />
            <layer.icon
              className={cn("size-4 shrink-0", layer.selected ? "text-ed-accent" : "text-ed-text-3")}
              strokeWidth={1.5}
            />
            <span className="flex-1 truncate">{layer.name}</span>
            {layer.selected && <Eye className="size-3.5 text-ed-text-3" strokeWidth={1.5} />}
            {layer.fill && <span className={cn("size-2.5 rounded-full border border-ed-line-strong", layer.fill)} />}
          </li>
        ))}
      </ul>
    </div>
  )
}
