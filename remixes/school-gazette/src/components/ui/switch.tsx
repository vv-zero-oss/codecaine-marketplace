import * as SwitchPrimitive from "@radix-ui/react-switch"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A toggle switch with a brass lever, on a recessed plate. The lever slides
 * 28px with a spring-ish ease-out and leans into the end stop; ON and OFF are
 * engraved either side of it.
 */
export function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      className={cn(
        "group relative inline-flex h-11 w-[4.5rem] shrink-0 items-center rounded-full border-2 border-ink bg-bakelite p-1 shadow-deboss transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust data-[state=checked]:bg-teal-deep touch-manipulation",
        className,
      )}
      {...props}
    >
      <span aria-hidden className="pointer-events-none absolute left-2.5 font-type text-[0.5rem] tracking-widest text-paper-light/60 opacity-0 transition-opacity group-data-[state=checked]:opacity-100">ON</span>
      <span aria-hidden className="pointer-events-none absolute right-2.5 font-type text-[0.5rem] tracking-widest text-paper-light/60 group-data-[state=checked]:opacity-0">OFF</span>
      <SwitchPrimitive.Thumb className="pointer-events-none block size-8 rounded-full bg-[radial-gradient(circle_at_32%_28%,#f1d98f,var(--brass)_50%,var(--brass-deep))] shadow-knob transition-transform duration-[var(--duration-base)] ease-[var(--ease-out)] data-[state=checked]:translate-x-[1.75rem]" />
    </SwitchPrimitive.Root>
  )
}
