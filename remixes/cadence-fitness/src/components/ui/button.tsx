import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's buttons, all pills: the lime one that starts something (one per
 * view), the Paper one in the header, a Forest Ink outline on light ground,
 * and quiet ones for everything else. Flat — the fill does the work.
 *
 * A press is a quick scale to 0.97 — felt, not seen.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none focus-visible:ring-[3px] focus-visible:ring-action/60 active:scale-[0.97] active:duration-(--duration-press) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-action text-action-ink hover:bg-action-hover active:bg-action-press",
        light: "bg-paper text-forest-ink hover:bg-linen-mist",
        ghost: "text-fg hover:bg-white/8",
        glass: "bg-surface-2 text-fg shadow-(--shadow-card) hover:bg-surface-3",
        outline: "bg-paper text-forest-ink shadow-[inset_0_0_0_1px_var(--color-forest-ink)] hover:bg-linen-mist",
      },
      size: {
        sm: "h-9 rounded-(--radius-button) px-4 text-[15px] [&_svg]:size-3.5",
        md: "h-11 rounded-(--radius-button) px-6 text-[16px] [&_svg]:size-4",
        lg: "h-13 rounded-(--radius-button) px-7 text-[17px] font-semibold [&_svg]:size-[18px]",
        icon: "size-10 rounded-(--radius-button) [&_svg]:size-5",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button, as a link — its own component rather than `asChild`, so the
 * editor's layers panel names it `ButtonLink` and not `Slot`.
 */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
