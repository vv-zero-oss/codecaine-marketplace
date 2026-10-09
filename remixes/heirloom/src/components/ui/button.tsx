import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/btn inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-pill font-medium tracking-[-0.01em] transition-[background-color,transform,box-shadow] duration-200 ease-soft select-none active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-fg disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-3.5 [&_svg]:shrink-0 [&_svg]:transition-transform [&_svg]:duration-200 [&_svg]:ease-soft hover:[&_svg.arrow]:translate-x-0.5",
  {
    variants: {
      variant: {
        solid: "bg-paper text-on-paper shadow-pill hover:bg-paper/90",
        glass:
          "border border-line-strong bg-glass text-fg shadow-glass backdrop-blur-xl hover:bg-glass-strong",
        warm: "border border-line-strong bg-warm-glass text-fg shadow-glass backdrop-blur-xl hover:bg-warm-glass/70",
        ghost: "text-fg-muted hover:text-fg",
      },
      size: {
        sm: "h-9 px-4 text-[13px]",
        default: "h-11 px-5 text-[13px] sm:h-9",
        lg: "h-12 px-6 text-sm",
      },
    },
    defaultVariants: { variant: "solid", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({ className, variant, size, ...props }: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The button as a link, with the trailing arrow most of this page's calls to
 * action carry. A separate component rather than `asChild`, so the editor's
 * layers panel reads `ButtonLink` and not `Slot`.
 */
export function ButtonLink({
  className,
  variant,
  size,
  arrow = true,
  children,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle & { arrow?: boolean }) {
  return (
    <a {...props} className={cn(buttonVariants({ variant, size, className }))}>
      {children}
      {arrow && <ArrowRight className="arrow" aria-hidden />}
    </a>
  )
}

export { buttonVariants }
