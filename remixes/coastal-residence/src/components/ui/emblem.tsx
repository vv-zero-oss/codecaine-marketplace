import type * as React from "react"

import { cn } from "@/lib/utils"

/** The residence's mark: four drawn petals and four leaves round a still centre. */
export function Emblem({ className, ...props }: React.ComponentProps<"svg">) {
  const petal = "M0 -5 C 5.5 -10 6 -19 0 -27 C -6 -19 -5.5 -10 0 -5 Z"
  const leaf = "M3.5 -3.5 C 9 -7 14 -8 17 -12 C 13 -13 7 -12 3.5 -3.5 Z"
  return (
    <svg viewBox="-30 -30 60 60" fill="none" aria-hidden="true" className={cn("size-12", className)} {...props}>
      {[0, 90, 180, 270].map((r) => (
        <g key={r} transform={`rotate(${r})`}>
          <path d={petal} stroke="currentColor" strokeWidth={2.4} strokeLinejoin="round" />
          <path d="M0 -9 L0 -21" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" />
          <path d={leaf} fill="currentColor" />
        </g>
      ))}
      <circle r={2.2} fill="currentColor" />
    </svg>
  )
}
