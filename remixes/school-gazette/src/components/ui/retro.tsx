import { Scissors } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * A postage stamp: a perforated edge (a tiled radial gradient with a hole at
 * every tile centre, covered inside by the paper), a printed value and a
 * hand-signed line. It takes any content.
 */
export function Stamp({ className, children, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      className={cn("relative p-1.5 [filter:drop-shadow(0_2px_1px_rgb(28_27_24/0.35))]", className)}
      style={{ background: "radial-gradient(circle, transparent 0 4px, var(--paper-bright) 4.5px) 0 0 / 12px 12px" }}
      {...props}
    >
      <div className="bg-paper-bright p-2.5 shadow-stamp">{children}</div>
    </div>
  )
}

/** A twelve-point badge that turns slowly: "NEW!", "FREE!", "VOL. 42". */
export function Starburst({ label = "New!", sub, size = 96, spin = true, className }: { label?: string; sub?: string; size?: number; spin?: boolean; className?: string }) {
  return (
    <div className={cn("relative grid shrink-0 place-items-center", className)} style={{ width: size, height: size }}>
      <div
        aria-hidden
        className={cn("absolute inset-0 bg-rust drop-shadow-[0_3px_0_var(--ink)]", spin && "animate-spin-slow")}
        style={{ clipPath: "polygon(50% 0%, 61% 11%, 75% 7%, 79% 21%, 93% 25%, 89% 39%, 100% 50%, 89% 61%, 93% 75%, 79% 79%, 75% 93%, 61% 89%, 50% 100%, 39% 89%, 25% 93%, 21% 79%, 7% 75%, 11% 61%, 0% 50%, 11% 39%, 7% 25%, 21% 21%, 25% 7%, 39% 11%)" }}
      />
      <div className="relative -rotate-6 text-center font-display leading-none text-paper-bright" style={{ fontSize: size * 0.24 }}>
        {label}
        {sub ? <span className="mt-0.5 block font-type text-[0.38em] tracking-widest uppercase">{sub}</span> : null}
      </div>
    </div>
  )
}

/** A clip-out coupon with scissor marks and a dashed cut line. */
export function Coupon({ title, body, code, className }: { title: string; body: string; code: string; className?: string }) {
  return (
    <aside className={cn("relative border-2 border-dashed border-ink bg-paper-bright p-4 pt-5", className)}>
      <Scissors aria-hidden className="absolute -top-3 left-4 size-5 rotate-90 bg-paper-bright px-0.5 text-ink" />
      <p className="kicker text-rust">Clip &amp; keep</p>
      <h4 className="display mt-1 text-3xl">{title}</h4>
      <p className="mt-2 text-sm leading-snug text-ink-soft">{body}</p>
      <p className="mt-3 flex items-center justify-between gap-3 border-t border-dashed border-ink pt-2 font-type text-[0.7rem] tracking-widest">
        <span>{code}</span>
        <span aria-hidden className="h-5 w-16 bg-[repeating-linear-gradient(90deg,var(--ink)_0_2px,transparent_2px_4px,var(--ink)_4px_5px,transparent_5px_8px)]" />
      </p>
    </aside>
  )
}

/** A pointing hand, set in type, for the "see also" line. */
export function Manicule({ className }: { className?: string }) {
  return <span aria-hidden className={cn("inline-block text-[1.3em] leading-none", className)}>☞</span>
}

/** A strip of masking tape across a corner of whatever it is placed on. */
export function Tape({ className }: { className?: string }) {
  return <span aria-hidden className={cn("absolute z-10 block h-6 w-20 bg-[color-mix(in_srgb,var(--brass)_55%,var(--paper-light))] opacity-80 shadow-[0_1px_2px_rgb(0_0_0/0.25)]", className)} />
}
