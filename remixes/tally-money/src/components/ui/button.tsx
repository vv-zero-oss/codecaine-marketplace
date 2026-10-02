import { cva, type VariantProps } from "class-variance-authority"
import type * as React from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-semibold transition-[background-color,transform,color] duration-150 ease-out active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-ink-900 text-white hover:bg-ink-950",
        primary: "bg-brand-500 text-white shadow-button hover:bg-brand-600",
        outline: "border border-ink-200 bg-white text-ink-900 hover:bg-ink-50",
        ghost: "text-ink-600 hover:bg-ink-50 hover:text-ink-900",
        link: "text-brand-600 underline-offset-4 hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-9 px-4",
        lg: "h-12 px-6 text-base",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

export function Button({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"button"> & ButtonStyle) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

/**
 * The same button, as a link.
 *
 * `scaffold/` writes this as shadcn does — `<Button asChild><a …/></Button>` —
 * and renders exactly the same `<a class="inline-flex …">`. Two components
 * here instead, because `asChild` puts Radix's `Slot` between the anchor and
 * `Button`, and the innermost component is the one an element is the root of:
 * the layer would read `Slot`. The markup is identical either way; which name
 * the editor can show is the whole difference, and it is the kind of thing
 * this project exists to make visible.
 */
export function ButtonLink({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle) {
  // Spread first, so the anchor serialises its own attributes in the order it
  // was given them — `href` then `class`, the same as the `asChild` version in
  // `scaffold/`. The two documents are meant to be comparable down to this.
  return <a {...props} className={cn(buttonVariants({ variant, size, className }))} />
}

export { buttonVariants }
