import type { CSSProperties, ReactNode } from "react"

import { cn } from "@/lib/utils"

/** Bobs its child up and down — the floating metric chips around a phone. Offset `delay` so neighbours don't move in step. */
export function Floating({
  distance = 10,
  duration = 6,
  delay = 0,
  className,
  children,
}: {
  distance?: number
  duration?: number
  delay?: number
  className?: string
  children?: ReactNode
}) {
  const style = {
    "--float-distance": `${distance}px`,
    "--float-duration": `${duration}s`,
    animationDelay: `${delay}s`,
  } as CSSProperties
  return (
    <div className={cn("animate-float motion-reduce:animate-none", className)} style={style}>
      {children}
    </div>
  )
}
