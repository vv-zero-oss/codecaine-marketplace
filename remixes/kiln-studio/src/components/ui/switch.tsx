import * as React from "react"
import { Switch as SwitchPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

function Switch({ className, ...props }: React.ComponentProps<typeof SwitchPrimitive.Root>) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      className={cn(
        "peer inline-flex h-[22px] w-[38px] shrink-0 items-center rounded-full p-[2px] shadow-(--shadow-xs) transition-colors duration-(--duration-hover) ease-(--ease-out-strong) outline-none focus-visible:ring-[3px] focus-visible:ring-ember/40 disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-ember data-[state=unchecked]:bg-raised",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className="pointer-events-none block size-[18px] rounded-full bg-bone shadow-(--shadow-card) ring-0 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0"
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
