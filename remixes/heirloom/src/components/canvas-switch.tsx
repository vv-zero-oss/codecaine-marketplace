import { useCanvasAction } from "@canvas/react"

/**
 * One editor toggle, for a state that comes in a list (a filter's options, an
 * FAQ's answers). Rendered once per option, so each gets its own switch in the
 * editor's Actions row without calling a hook in a loop. Draws nothing.
 */
export function CanvasSwitch({ label, group, on, set }: { label: string; group: string; on: boolean; set: (on: boolean) => void }) {
  useCanvasAction(label, (next) => set(next ?? !on), { on, group })
  return null
}
