import * as SliderPrimitive from "@radix-ui/react-slider"
import type * as React from "react"

import { cn } from "@/lib/utils"

/** A mixing-desk fader: a routed groove with tick marks and a brass cap. */
export function Slider({ className, ...props }: React.ComponentProps<typeof SliderPrimitive.Root>) {
  return (
    <SliderPrimitive.Root className={cn("relative flex h-11 w-full touch-none select-none items-center", className)} {...props}>
      <SliderPrimitive.Track className="relative h-2.5 grow overflow-hidden rounded-full border border-ink bg-bakelite shadow-deboss">
        <SliderPrimitive.Range className="absolute h-full bg-rust" />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb
        aria-label="Fader"
        className="block h-8 w-5 rounded-[3px] border-2 border-ink bg-[linear-gradient(90deg,var(--brass-deep),#f1d98f_40%,var(--brass)_60%,var(--brass-deep))] shadow-[0_3px_0_var(--ink)] transition-transform duration-[var(--duration-press)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-rust active:scale-95"
      />
    </SliderPrimitive.Root>
  )
}
