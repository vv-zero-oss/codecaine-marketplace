import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The hero's light: two soft shapes — a warm ember and a lilac — blurred
 * into each other behind the headline, drifting and reshaping slowly.
 *
 * CSS keyframes (`blob` in `index.css`), so the editor's Motion switch stops
 * and reduces it with nothing extra, as does reduced motion.
 */
export function GradientBlob({
  speed = 18,
  blur = 36,
  intensity = 1,
  className,
}: {
  /** Seconds for one drift. Higher is calmer. */
  speed?: number
  blur?: number
  /** 0–1: how strongly the colours show. */
  intensity?: number
  className?: string
}) {
  const shape = "absolute animate-blob motion-reduce:animate-none"
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-x-0 top-0 h-[min(1100px,125vh)] animate-in overflow-hidden duration-300 fade-in motion-reduce:animate-none [mask-image:linear-gradient(180deg,#000_70%,transparent)]", className)}
      style={{ opacity: intensity, filter: `blur(${blur}px)` } as React.CSSProperties}
    >
      <div
        className={cn(shape, "top-[18%] -left-[8%] h-[92%] w-[42%] bg-[radial-gradient(closest-side,var(--color-ember)_45%,var(--color-flare)_72%,transparent)]")}
        style={{ "--blob-duration": `${speed}s` } as React.CSSProperties}
      />
      <div
        className={cn(shape, "top-[52%] left-[4%] h-[60%] w-[80%] bg-[radial-gradient(closest-side,var(--color-lilac)_40%,var(--color-lavender)_70%,transparent)]")}
        style={{ "--blob-duration": `${speed * 1.3}s`, animationDelay: `-${speed / 2}s` } as React.CSSProperties}
      />
      {/* The lilac ribbon that runs up to the plane's trail */}
      <div className="absolute top-[58%] left-[8%] h-[26%] w-[96%] -rotate-[14deg] bg-[radial-gradient(closest-side,var(--color-lilac)_35%,transparent)] opacity-80" />
      <div
        className={cn(shape, "top-[18%] right-[-8%] h-[46%] w-[36%] bg-[radial-gradient(closest-side,var(--color-lavender),transparent)] opacity-70")}
        style={{ "--blob-duration": `${speed * 0.9}s`, animationDelay: `-${speed / 3}s` } as React.CSSProperties}
      />
    </div>
  )
}
