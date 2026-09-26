import { House, PanelRight, Plus, X } from "lucide-react"

import { Board } from "./board"
import { DesignPanel } from "./design-panel"
import { LayersPanel, NavRail } from "./layers-panel"

/** The mockup's native size: the editor at a 1440px-wide window. Scenes scale it. */
export const EDITOR_SIZE = { width: 1440, height: 860 } as const

/**
 * Codecaine's editor, drawn in code rather than pasted in as a screenshot, so
 * it stays sharp at any zoom the camera takes it to: the tab strip, the nav
 * rail, Layers, the board with a framed project, and the Design panel.
 */
export function EditorWindow({ editing = false }: { editing?: boolean }) {
  return (
    <div
      className="flex flex-col overflow-hidden rounded-window bg-ed-panel font-sans text-ed-text shadow-window select-none"
      style={{ width: EDITOR_SIZE.width, height: EDITOR_SIZE.height }}
      aria-hidden
    >
      <TabStrip />
      <div className="flex min-h-0 flex-1">
        <NavRail />
        <LayersPanel />
        <Board hover={editing} />
        <DesignPanel editing={editing} />
      </div>
    </div>
  )
}

function TabStrip() {
  return (
    <div className="flex h-10 shrink-0 items-center border-b border-ed-line bg-ed-panel pr-2 pl-4">
      <span className="mr-12 flex gap-2">
        {["bg-period-light-close", "bg-period-light-min", "bg-period-light-max"].map((c) => (
          <span key={c} className={`size-3 rounded-full ${c}`} />
        ))}
      </span>
      <span className="grid size-7 place-items-center rounded-[8px] text-ed-text-2">
        <House className="size-4" strokeWidth={1.5} />
      </span>
      <span className="ml-1 flex h-[39px] max-w-[224px] items-center gap-2 border-x border-ed-line bg-ed-field pr-2 pl-2.5 text-[13px] font-medium">
        <span className="grid size-4 place-items-center rounded-full bg-ed-text-3 text-[9px] font-semibold text-white">T</span>
        Tidewater
        <X className="size-3.5 text-ed-text-3" strokeWidth={1.5} />
      </span>
      <span className="grid size-7 place-items-center text-ed-text-2">
        <Plus className="size-4" strokeWidth={1.5} />
      </span>
      <PanelRight className="ml-auto size-4 text-ed-text-2" strokeWidth={1.5} />
    </div>
  )
}
