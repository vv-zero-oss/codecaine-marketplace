import { X } from "lucide-react"
import { useState } from "react"
import { useCanvasAction } from "@canvas/react"

import { ANNOUNCEMENT } from "@/content"

export function AnnouncementBar() {
  const [open, setOpen] = useState(true)
  useCanvasAction("Announcement bar", (next) => setOpen(next ?? !open), { on: open, group: "Header" })
  if (!open) return null
  return (
    <div className="relative flex min-h-8 items-center justify-center bg-bar px-10 py-2 text-center text-[12px] leading-4 text-text">
      <p>
        {ANNOUNCEMENT.text}{" "}
        <a href="#build" className="underline underline-offset-2 transition-colors hover:text-muted">
          {ANNOUNCEMENT.linkLabel}
        </a>
      </p>
      <button
        type="button"
        aria-label="Dismiss announcement"
        onClick={() => setOpen(false)}
        className="absolute inset-y-0 right-1 flex w-11 items-center justify-center text-muted transition-colors hover:text-text"
      >
        <X className="size-3.5" />
      </button>
    </div>
  )
}
