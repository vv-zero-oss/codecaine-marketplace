import type * as React from "react"

import { cn } from "@/lib/utils"

const field =
  "w-full rounded-tile border border-line bg-surface px-3.5 text-[15px] text-fg placeholder:text-fg-subtle transition-[border-color,box-shadow] duration-200 ease-soft outline-none hover:border-line-strong focus-visible:border-fg/60 focus-visible:ring-4 focus-visible:ring-fg/10 aria-[invalid=true]:border-danger aria-[invalid=true]:ring-danger/15 disabled:opacity-50 sm:text-sm"

/** shadcn's input and textarea. 15px on phones so iOS does not zoom in. */
export function Input({ className, ...props }: React.ComponentProps<"input">) {
  return <input className={cn(field, "h-12 sm:h-11", className)} {...props} />
}

export function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return <textarea className={cn(field, "min-h-32 resize-y py-3 leading-relaxed", className)} {...props} />
}

export function Label({ className, ...props }: React.ComponentProps<"label">) {
  return <label className={cn("text-[11px] font-medium tracking-[0.12em] text-fg-muted uppercase", className)} {...props} />
}

/** The line under a field: what went wrong and how to fix it. */
export function FieldError({ id, children }: { id: string; children?: string }) {
  if (!children) return null
  return (
    <p id={id} role="alert" className="text-xs text-danger">
      {children}
    </p>
  )
}
