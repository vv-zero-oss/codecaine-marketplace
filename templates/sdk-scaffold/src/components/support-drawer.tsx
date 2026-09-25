/**
 * A drawer that is closed, which is the whole point of it.
 *
 * Every design tool spends most of its time on the states a page is one
 * interaction deep into: the cart with three things in it, the toast, the
 * second step of a wizard, the error a form shows after a bad submit. On a
 * board those are reachable only by going into Interact mode and clicking your
 * way there — and then back out to style what you found.
 *
 * The editor cannot find this state by itself and should not try: `open` is a
 * `useState` in this file, and on the next project it is a store, a route or a
 * server action. So the project says so, in one line beside the state it is
 * about, and the editor draws a switch for it. See `useCanvasAction` in
 * `@canvas/react`.
 */

import { useState } from "react"
import { useCanvasAction, useCanvasDesignMode } from "@canvas/react"
import { Button } from "@/components/ui/button"

export function SupportDrawer() {
  const [open, setOpen] = useState(false)
  const { designing } = useCanvasDesignMode()

  // `on` is what makes this a switch in the panel rather than a button: the
  // editor can show whether the drawer is open as well as offer to open it.
  useCanvasAction("Support drawer", (next) => setOpen(next ?? !open), { on: open })

  // Nothing at all until it is open, which is both the honest shape of the
  // thing — a drawer is not on the page — and what keeps this project
  // rendering the same document as `scaffold/` (see the README there). It is
  // also the point: with no button on the page, the editor's Actions row is
  // the only way to reach this state without leaving the board.
  if (!open) return null

  return (
    <aside
      data-support-drawer
      className="fixed top-0 right-0 z-50 flex h-full w-80 flex-col gap-4 border-l border-quartz-200 bg-white p-6 shadow-xl"
    >
      <div className="flex items-start justify-between gap-4">
        <h2 className="text-lg font-semibold tracking-tight text-quartz-900">Support</h2>
        <Button variant="ghost" size="sm" onClick={() => setOpen(false)}>
          Close
        </Button>
      </div>
      <p className="text-sm text-quartz-600">
        An engineer answers within an hour on weekdays. Tell us what you were doing and what
        you expected instead.
      </p>
      <textarea
        className="min-h-32 rounded-xl border border-quartz-200 p-3 text-sm text-quartz-900 placeholder:text-quartz-400 focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:outline-none"
        placeholder="What happened?"
      />
      <Button variant="primary">Send</Button>
      {/* The other direction: what the page knows about being looked at.
          A real project uses this to hold something open, stop a carousel
          advancing under the cursor, or skip an intro it plays once — and
          a line of text is the smallest version of it that can be read off
          a screenshot. */}
      <p className="mt-auto text-xs text-quartz-400">
        {designing ? "Opened from the editor." : "Opened by a visitor."}
      </p>
    </aside>
  )
}
