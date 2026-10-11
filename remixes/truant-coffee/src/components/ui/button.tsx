import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The buttons are labels: the poster face in capitals, a 4px corner, tight
 * padding — a solid ink one, an outlined one, a paper one with tomato type
 * for photographs, and tomato for the one thing to press. A press sinks them
 * to 97% in 140ms.
 */
const buttonVariants = cva(
  "type-display inline-flex select-none tracking-[0.01em] items-center justify-center gap-2 whitespace-nowrap rounded-[var(--radius-button)] leading-none transition-[background-color,color,box-shadow,transform] duration-[var(--duration-hover)] ease-[var(--ease-out-strong)] active:scale-[0.97] active:duration-[var(--duration-press)] disabled:pointer-events-none disabled:opacity-45 [&_svg]:size-[1em] [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        solid: "bg-ink text-paper hover:bg-ink-2",
        outline: "bg-transparent text-ink shadow-[inset_0_0_0_1.5px_var(--color-ink)] hover:bg-ink hover:text-paper",
        paper: "bg-paper text-tomato shadow-button hover:bg-white hover:text-tomato-hover",
        tomato: "bg-tomato text-paper hover:bg-tomato-hover active:bg-tomato-press",
        ghost: "text-ink hover:bg-ink/6",
        night: "bg-night-fg text-night hover:bg-white",
      },
      size: {
        sm: "h-8 px-2.5 pt-[3px] text-[17px]",
        md: "h-10 px-3.5 pt-[3px] text-[21px]",
        lg: "h-12 px-5 pt-[3px] text-[25.89px]",
        icon: "size-11 text-[18px]",
      },
    },
    defaultVariants: { variant: "solid", size: "md" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/** The same button, as a link — its own component rather than `asChild`,
 *  so the editor's layers read `ButtonLink` rather than `Slot`. */
export function ButtonLink({ className, variant, size, ...props }: React.ComponentProps<"a"> & ButtonStyle) {
  return <Link {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
