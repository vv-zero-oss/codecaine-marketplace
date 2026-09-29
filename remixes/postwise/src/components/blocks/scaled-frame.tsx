import type * as React from "react"
import { useLayoutEffect, useRef, useState } from "react"

import { cn } from "@/lib/utils"

/**
 * Lays a fixed-width mock-up out at its own size, then scales it to the
 * width it is given — so a product screen reads the same at 360px as at
 * 1440px instead of reflowing into something it never looks like.
 */
export function ScaledFrame({
  width = 1040,
  className,
  children,
}: {
  /** The width the content is designed at. */
  width?: number
  className?: string
  children?: React.ReactNode
}) {
  const outer = useRef<HTMLDivElement>(null)
  const inner = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  const [height, setHeight] = useState<number>()

  useLayoutEffect(() => {
    const el = outer.current
    const content = inner.current
    if (!el || !content) return
    const measure = () => {
      const s = Math.min(1, el.clientWidth / width)
      setScale(s)
      setHeight(content.offsetHeight * s)
    }
    measure()
    const ro = new ResizeObserver(measure)
    ro.observe(el)
    ro.observe(content)
    return () => ro.disconnect()
  }, [width])

  return (
    <div ref={outer} className={cn("relative w-full", className)} style={{ height }}>
      <div
        ref={inner}
        data-canvas-ignore
        className="absolute top-0 left-0 origin-top-left"
        style={{ width, transform: `scale(${scale})` }}
      >
        {children}
      </div>
    </div>
  )
}
