import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's three buttons: the glowing blue one that starts something, the
 * white one in the header, and a quiet one for everything else.
 *
 * A press is a quick scale to 0.97 — felt, not seen.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-medium transition-[background-color,color,box-shadow,transform] duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none focus-visible:ring-[3px] focus-visible:ring-blue/50 active:scale-[0.97] active:duration-(--duration-press) disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary: "bg-blue text-blue-ink shadow-(--shadow-button) hover:bg-blue-hover active:bg-blue-press",
        light: "bg-day text-day-ink shadow-(--shadow-button-light) hover:bg-white",
        ghost: "text-fg hover:bg-white/6",
        glass: "bg-surface-2/70 text-fg shadow-(--shadow-glass) backdrop-blur-md hover:bg-surface-3/80",
        outline: "bg-transparent text-day-ink shadow-[0_0_0_1px_var(--color-day-line)] hover:bg-day",
      },
      size: {
        sm: "h-8 rounded-(--radius-button) px-3 text-[14px] [&_svg]:size-3.5",
        md: "h-10 rounded-(--radius-button) px-4 text-[15px] [&_svg]:size-4",
        lg: "h-12 rounded-(--radius-field) px-5 text-[17px] [&_svg]:size-[18px]",
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
