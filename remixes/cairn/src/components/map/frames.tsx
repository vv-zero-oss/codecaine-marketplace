import type * as React from "react"
import { Lock } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A browser window drawn in markup: three dots, an address, and whatever
 * the page is. The mockups on the site are real components inside one of
 * these, never a screenshot.
 */
export function BrowserFrame({
  url = "cairn.page",
  toolbar,
  className,
  bodyClassName,
  children,
}: {
  url?: string
  toolbar?: React.ReactNode
  className?: string
  bodyClassName?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("flex flex-col overflow-hidden rounded-(--radius-window) bg-raised shadow-(--shadow-window)", className)}>
      <div className="flex h-9 shrink-0 items-center gap-3 border-b border-line bg-raised px-3">
        <span aria-hidden className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-window-red" />
          <span className="size-2.5 rounded-full bg-window-amber" />
          <span className="size-2.5 rounded-full bg-window-green" />
        </span>
        <span className="mx-auto flex h-6 max-w-[60%] min-w-0 items-center gap-1.5 rounded-[6px] bg-panel px-3 text-[11px] text-ink-3">
          <Lock className="size-2.5 shrink-0" />
          <span className="truncate">{url}</span>
        </span>
        {toolbar ?? <span className="w-[42px]" aria-hidden />}
      </div>
      <div className={cn("relative min-h-0 flex-1", bodyClassName)}>{children}</div>
    </div>
  )
}

/**
 * The sky the product shots float on: a Pexels photograph of soft cloud,
 * cropped to the panel, with the mockup set into it.
 */
export function SkyPanel({
  photo,
  className,
  children,
}: {
  photo: string
  className?: string
  children?: React.ReactNode
}) {
  return (
    <div className={cn("relative isolate overflow-hidden rounded-(--radius-panel) bg-accent-soft", className)}>
      <img src={photo} alt="" aria-hidden className="absolute inset-0 -z-10 size-full scale-110 object-cover" draggable={false} loading="lazy" />
      <span className="sky-wash -z-10" />
      {children}
    </div>
  )
}
