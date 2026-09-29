import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

/**
 * The page's pills. Two fills — paper on the night hero, ink on paper — and
 * the page's three sizes: a small nav pill, the hero's wide one and the
 * closing call's enormous one.
 *
 * Press is a 0.97 scale on the compositor, 140ms; hover is a colour change,
 * which Tailwind v4 only applies on devices that can hover.
 */
export const buttonVariants = cva(
  "inline-flex select-none items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium tracking-[-0.01em] transition-[background-color,color,transform] duration-(--duration-press) ease-out-strong active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        paper: "bg-paper text-ink hover:bg-field",
        ink: "bg-button text-paper hover:bg-button-hover",
        ghost: "text-current hover:opacity-70",
      },
      size: {
        nav: "h-7 px-3.5 text-[12px] [&_svg]:size-3.5",
        default: "h-11 px-6 text-[15px] [&_svg]:size-4",
        hero: "h-12 min-w-[180px] px-10 text-[15px] md:h-14 md:min-w-[228px] [&_svg]:size-4",
        cta: "h-[clamp(72px,10vw,146px)] px-[clamp(36px,4.4vw,64px)] text-cta [&_svg]:size-[0.9em]",
      },
    },
    defaultVariants: { variant: "ink", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same pill, as a link. Two components rather than `asChild`, so the
 * editor's layers panel names the anchor `ButtonLink` rather than `Slot`.
 */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}
