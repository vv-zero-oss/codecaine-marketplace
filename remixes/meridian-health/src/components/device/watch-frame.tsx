import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

const FACE_W = 198
const FACE_H = 242

/**
 * A watch you can use: a CSS case and an ocean-loop band around a live 198 × 242
 * screen. The crown is a real button — `onCrown` is how a screen cycles.
 */
export function WatchFrame({
  band = "#1d2736",
  onCrown,
  className,
  children,
}: {
  band?: string
  onCrown?: () => void
  className?: string
  children?: ReactNode
}) {
  const host = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const el = host.current
    if (!el) return
    const read = () => setScale(el.clientWidth / FACE_W)
    read()
    const observer = new ResizeObserver(read)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div className={cn("relative w-full", className)} style={{ aspectRatio: "1 / 2.35" }}>
      {/* band */}
      <div className="absolute inset-x-[12%] top-0 bottom-0 rounded-[28%/10%]" style={{ background: band }}>
        <div className="absolute inset-0 rounded-[inherit] bg-[repeating-linear-gradient(180deg,transparent_0_9%,rgb(255_255_255/0.07)_9%_10%)]" />
        <div className="absolute top-[6%] bottom-[6%] left-1/2 w-[14%] -translate-x-1/2 bg-[radial-gradient(circle,rgb(0_0_0/0.5)_0_30%,transparent_32%)] bg-[length:100%_8%] opacity-70" />
      </div>
      {/* case */}
      <div className="absolute inset-x-0 top-[28%] h-[44%] rounded-[24%/20%] bg-[linear-gradient(145deg,#d8d6d0,#8d8b86_50%,#c7c5bf)] p-[3.2%] shadow-phone">
        <div ref={host} className="relative size-full overflow-hidden rounded-[20%/17%] bg-black">
          <div
            data-canvas-ignore
            className="absolute top-0 left-0 origin-top-left text-white"
            style={{ width: FACE_W, height: FACE_H, transform: `scale(${scale})` }}
          >
            {children}
          </div>
        </div>
        <button
          type="button"
          onClick={onCrown}
          aria-label="Turn the crown"
          className="absolute top-[22%] -right-[5%] h-[20%] w-[6%] rounded-r-md bg-[linear-gradient(90deg,#8d8b86,#d8d6d0)] transition-transform active:scale-x-75 focus-visible:outline-2 focus-visible:outline-accent"
        />
        <span className="absolute top-[52%] -right-[3%] h-[10%] w-[4%] rounded-r bg-[#6e6c68]" />
      </div>
    </div>
  )
}
