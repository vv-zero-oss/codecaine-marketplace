import * as React from "react"
import { cn } from "@/lib/utils"
import { Switch as SwitchPrimitive } from "radix-ui"

/** shadcn's switch, in the page's night: a Forest Ink track, a Paper thumb,
 *  and a lime track once it is on. */
function Switch({
  className,
  size = "default",
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive.Root
      data-slot="switch"
      data-size={size}
      className={cn(
        "peer group/switch inline-flex shrink-0 items-center rounded-full p-[3px] shadow-(--shadow-inner) transition-colors duration-(--duration-hover) ease-(--ease-out-strong) outline-none focus-visible:ring-[3px] focus-visible:ring-action/50 disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-7 data-[size=default]:w-12 data-[size=sm]:h-5 data-[size=sm]:w-8 data-[state=checked]:bg-action data-[state=unchecked]:bg-surface-3",
        className,
      )}
      {...props}
    >
      <SwitchPrimitive.Thumb
        data-slot="switch-thumb"
        className={cn(
          "pointer-events-none block rounded-full bg-paper shadow-[0_1px_3px_rgb(0_0_0/0.4)] group-data-[state=checked]/switch:bg-forest-ink ring-0 transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-data-[size=default]/switch:size-[22px] group-data-[size=sm]/switch:size-3.5 data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0 group-data-[size=sm]/switch:data-[state=checked]:translate-x-3",
        )}
      />
    </SwitchPrimitive.Root>
  )
}

export { Switch }
