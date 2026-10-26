import { useLayoutEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A screen's content laid out at a fixed desktop width and scaled down to
 * fit — so the same mock reads correctly on a laptop, a tablet or a phone-
 * sized card without being redrawn for each.
 */
export function ScaledScreen({ base = 980, className, children }: { base?: number; className?: string; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(0.5)
  useLayoutEffect(() => {
    const element = ref.current
    if (!element) return
    const observer = new ResizeObserver(([entry]) => setScale(entry.contentRect.width / base))
    observer.observe(element)
    return () => observer.disconnect()
  }, [base])
  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <div className="absolute top-0 left-0 origin-top-left" style={{ width: base, transform: `scale(${scale})` }}>
        {children}
      </div>
    </div>
  )
}

/** The wallpaper behind the app on a laptop or a tablet: Keel's blue, folded. */
export function Wallpaper({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("absolute inset-0", className)}
      style={{
        background:
          "linear-gradient(135deg, transparent 40%, rgb(255 255 255 / 0.12) 40.2%, transparent 55%), linear-gradient(225deg, #0d3fae 0%, #1f6bff 45%, #0a2c7a 100%)",
      }}
    />
  )
}

/** A laptop: lid, screen, and a keyboard deck drawn flat from above. */
export function Laptop({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("flex flex-col items-center", className)}>
      <div className="w-full rounded-t-[16px] bg-[#0b0d12] p-[1.6%] shadow-(--shadow-device)">
        <div className="relative aspect-[16/10] overflow-hidden rounded-[6px]">{children}</div>
      </div>
      <div className="w-[104%] rounded-b-[14px] bg-gradient-to-b from-[#c9ccd2] to-[#a3a7af] p-[5%] pb-[4%] shadow-[0_30px_60px_-30px_rgb(0_0_0/0.8)]">
        <div className="grid grid-cols-14 gap-[3px] rounded-[6px] bg-[#1a1c21] p-[1.5%]">
          {Array.from({ length: 70 }, (_, i) => (
            <span key={i} className="aspect-square rounded-[2px] bg-[#2a2d33]" />
          ))}
        </div>
        <div className="mx-auto mt-[4%] aspect-[16/7] w-[46%] rounded-[8px] bg-[#b4b8bf] shadow-[inset_0_0_0_1px_rgb(0_0_0/0.08)]" />
      </div>
    </div>
  )
}

/** A tablet in landscape: an even black bezel. */
export function Tablet({ className, children }: { className?: string; children: ReactNode }) {
  return (
    <div className={cn("rounded-[22px] bg-[#0b0d12] p-[2.4%] shadow-(--shadow-device)", className)}>
      <div className="relative aspect-[4/3] overflow-hidden rounded-[12px]">{children}</div>
    </div>
  )
}
