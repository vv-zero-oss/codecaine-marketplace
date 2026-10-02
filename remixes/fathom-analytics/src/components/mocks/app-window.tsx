import { BarChart3, Boxes, FileText, Home, Layers, Map, MessageSquare, Search, Share2, Users } from "lucide-react"
import { motion, type MotionValue } from "motion/react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const NAV = [
  [Home, "Home"], [MessageSquare, "Fathom AI"], [Share2, "Model"], [BarChart3, "Metrics"], [Boxes, "Entities"], [FileText, "Reports"], [Map, "Maps"],
] as const
const TEAMS = [["bg-orange-300", "Leadership"], ["bg-blue-300", "Product"], ["bg-emerald-300", "Sales"], ["bg-zinc-300", "All teams"]]

/** The product window: chrome dots, a workspace sidebar, and whatever the screen is. */
export function AppWindow({ active = "Home", children, className, dark = false, chrome }: { active?: string; children: React.ReactNode; className?: string; dark?: boolean; chrome?: MotionValue<number> }) {
  return (
    <div className={cn("relative grid h-full min-h-0 grid-cols-[28%_1fr] rounded-window text-ink", !chrome && "overflow-hidden", dark && "text-ink-inverse", className)}>
      {/* The window's own surface: a layer, so a scene can fade it in under widgets that are already on screen. */}
      <motion.div aria-hidden style={chrome ? { opacity: chrome } : undefined} className={cn("absolute inset-0 rounded-window", dark ? "bg-night-2 shadow-night" : "bg-window shadow-window")} />
      <motion.aside style={chrome ? { opacity: chrome } : undefined} className={cn("hidden min-w-0 flex-col gap-0.5 border-r p-3 pt-10 text-[9px] sm:flex", dark ? "border-line-inverse" : "border-line bg-surface/60")}>
        <div className="absolute top-3.5 left-4 flex gap-1.5">
          {[0, 1, 2].map((i) => <span key={i} className={cn("size-2 rounded-full", dark ? "bg-white/15" : "bg-ink/10")} />)}
        </div>
        <div className="mb-2 flex items-center justify-between px-1.5 font-medium"><span className="flex items-center gap-1.5"><Layers className="size-3 text-ember" />Codify</span><Search className="size-3 opacity-50" /></div>
        {NAV.map(([Icon, label]) => (
          <span key={label} className={cn("flex items-center gap-2 rounded-md px-1.5 py-[5px]", label === active && (dark ? "bg-white/8" : "bg-ink/[0.05]"))}><Icon className="size-3 opacity-60" />{label}</span>
        ))}
        <span className="mt-3 px-1.5 text-[8px] opacity-45">Teams</span>
        {TEAMS.map(([tone, label]) => (
          <span key={label} className="flex items-center gap-2 px-1.5 py-[5px]"><span className={cn("size-2.5 rounded-[3px]", tone)} />{label}</span>
        ))}
        <span className="mt-auto flex items-center gap-2 px-1.5 py-1 opacity-60"><Users className="size-3" />Invite people</span>
      </motion.aside>
      <div className="relative min-h-0 min-w-0 sm:col-start-2 max-sm:col-span-2">{children}</div>
    </div>
  )
}
