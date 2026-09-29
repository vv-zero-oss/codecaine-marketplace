import { Nfc } from "lucide-react"
import { useReducedMotion } from "motion/react"
import { useRef, type PointerEvent } from "react"

import { LogoMark } from "@/components/ui/logo"
import { cn } from "@/lib/utils"

export type MetalFinish = "chrome" | "titanium" | "champagne" | "graphite" | "copper"

/**
 * An Ember card in machined metal: an angled, many-banded finish, hairline
 * brushing, film grain, and type engraved into it. Under a fine pointer the
 * specular highlight follows the cursor and the card leans a few degrees
 * towards it — the light moving is what sells it as metal.
 */
export function MetalCard({
  finish = "titanium",
  holder = "Nora Lindqvist",
  last4 = "4821",
  label = "Virtual",
  interactive = true,
  maxTilt = 8,
  size = "md",
  className,
}: {
  finish?: MetalFinish
  holder?: string
  last4?: string
  label?: string
  interactive?: boolean
  maxTilt?: number
  size?: "sm" | "md"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const live = interactive && !reduce

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (!live || e.pointerType !== "mouse") return
    const el = ref.current
    if (!el) return
    const r = el.getBoundingClientRect()
    const x = (e.clientX - r.left) / r.width
    const y = (e.clientY - r.top) / r.height
    el.style.setProperty("--mx", `${x * 100}%`)
    el.style.setProperty("--my", `${y * 100}%`)
    el.style.transform = `perspective(900px) rotateX(${(0.5 - y) * maxTilt}deg) rotateY(${(x - 0.5) * maxTilt}deg)`
  }
  const onLeave = () => {
    const el = ref.current
    if (!el) return
    el.style.setProperty("--mx", "30%")
    el.style.setProperty("--my", "20%")
    el.style.transform = ""
  }

  const small = size === "sm"
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={cn(
        "metal grain relative aspect-[1.586] w-full overflow-hidden transition-transform duration-500 ease-out [--grain-opacity:0.35]",
        `metal-${finish}`,
        small ? "rounded-[8px] p-2.5" : "rounded-[18px] p-6",
        className,
      )}
    >
      <div className="relative z-2 flex h-full flex-col justify-between">
        <div className="flex items-start justify-between">
          <LogoMark className={cn("engraved", small ? "size-4" : "size-8")} style={{ filter: "drop-shadow(0 1px 0 var(--emboss))" }} />
          {!small ? <span className="engraved text-[0.6875rem] font-medium tracking-[0.18em] uppercase">{label}</span> : null}
        </div>
        {!small ? (
          <div className="flex items-center gap-3">
            <span className="metal metal-champagne grain relative h-9 w-12 overflow-hidden rounded-[6px] [--grain-opacity:0.4]" aria-hidden>
              <span className="absolute inset-x-0 top-1/2 h-px bg-black/25" />
              <span className="absolute inset-y-0 left-1/3 w-px bg-black/25" />
              <span className="absolute inset-y-0 left-2/3 w-px bg-black/25" />
            </span>
            <Nfc className="engraved size-5" style={{ filter: "drop-shadow(0 1px 0 var(--emboss))" }} />
          </div>
        ) : null}
        <div>
          {!small ? <p className="engraved font-serif text-[1.375rem] leading-none">{holder}</p> : null}
          <p className={cn("engraved font-mono tracking-[0.2em] tabular-nums", small ? "text-[0.625rem]" : "mt-2 text-sm")}>
            •••• {last4}
          </p>
        </div>
      </div>
    </div>
  )
}
