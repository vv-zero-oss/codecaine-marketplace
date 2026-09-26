import type * as React from "react"

import { SwapText } from "@/components/ui/swap-text"
import { cn } from "@/lib/utils"

/**
 * A scene's line, where the reference sets them: near the top over a diagram,
 * or low over a picture. Changing `id` blur-swaps it. `sub` is the quieter
 * sentence under it, swapped with it.
 */
export function SceneHeadline({
  id,
  children,
  sub,
  at = "top",
  size = "lg",
  className,
}: {
  id: string | number
  children: React.ReactNode
  sub?: React.ReactNode
  at?: "top" | "bottom" | "center"
  size?: "md" | "lg" | "xl"
  className?: string
}) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-x-0 z-10 flex flex-col items-center gap-3 px-4 text-center",
        at === "top" && "top-[13svh]",
        at === "bottom" && "bottom-[9svh]",
        at === "center" && "top-1/2 -translate-y-1/2",
        className,
      )}
    >
      <SwapText
        id={id}
        className={cn(
          size === "md" && "max-w-[22ch] text-[clamp(28px,2.95vw,42px)]",
          size === "lg" && "max-w-[20ch] text-[clamp(30px,3.9vw,56px)]",
          size === "xl" && "max-w-[14ch] text-[clamp(40px,4.5vw,64px)]",
        )}
      >
        {children}
      </SwapText>
      {sub !== undefined && (
        <SwapText id={`${id}-sub`} as="p" className="max-w-[48ch] text-[clamp(15px,1.25vw,18px)] leading-snug text-ink-muted [&>*]:font-normal [&>*]:tracking-normal">
          {sub}
        </SwapText>
      )}
    </div>
  )
}
