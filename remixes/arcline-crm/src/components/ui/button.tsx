import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { ArrowRight } from "lucide-react"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Buttons: 36px, 10px corners, a 1px border, no shadow.
 *
 * State changes arrive in 50ms and leave over 300ms on the emphasized curve,
 * so a hover answers the pointer at once and lets go softly. The primary
 * fill carries a light that rises from its top edge on hover.
 */
const buttonVariants = cva(
  [
    "group/button relative inline-flex shrink-0 items-center justify-center gap-1.5 overflow-hidden whitespace-nowrap border text-sm font-medium select-none outline-none",
    "rounded-button transition-[background-color,border-color,color,box-shadow] duration-300 ease-emphasized hover:duration-[50ms] active:duration-[50ms]",
    "focus-visible:ring-2 focus-visible:ring-accent/60 focus-visible:ring-offset-2 focus-visible:ring-offset-page",
    "disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-3.5",
  ],
  {
    variants: {
      variant: {
        primary:
          "border-ink bg-ink text-page shadow-(--shadow-btn-primary) before:pointer-events-none before:absolute before:inset-0 before:bg-(image:--glow-btn-primary) before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100 hover:before:duration-[50ms] active:bg-ink-soft active:border-ink-soft",
        outline:
          "border-line-strong bg-page text-ink hover:border-line-bold hover:bg-surface active:border-ink-3 active:bg-hover",
        ghost: "border-transparent bg-transparent text-ink-soft hover:bg-hover-2 hover:text-ink active:bg-line-bold",
      },
      size: {
        sm: "h-8 px-2.5 text-caption",
        md: "h-9 px-3",
        lg: "h-12 px-5 text-base",
      },
    },
    defaultVariants: { variant: "outline", size: "md" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

function Label({ children, arrow }: { children: React.ReactNode; arrow?: boolean }) {
  return (
    <>
      <span className="relative flex items-center gap-1.5">{children}</span>
      {arrow && (
        <ArrowRight className="relative -mr-0.5 transition-transform duration-300 ease-emphasized group-hover/button:translate-x-0.5 group-hover/button:duration-150" />
      )}
    </>
  )
}

function Button({
  className,
  variant,
  size,
  arrow,
  asChild = false,
  children,
  ...props
}: React.ComponentProps<"button"> & ButtonStyle & { arrow?: boolean; asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return (
    <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {asChild ? children : <Label arrow={arrow}>{children}</Label>}
    </Comp>
  )
}

/**
 * The same button as a link. Its own component rather than
 * `<Button asChild>`, so the editor's layers panel names it `ButtonLink`.
 * Site paths ("/pricing") change page without a reload.
 */
function ButtonLink({
  className,
  variant,
  size,
  arrow,
  children,
  ...props
}: React.ComponentProps<"a"> & ButtonStyle & { arrow?: boolean }) {
  return (
    <Link {...props} className={cn(buttonVariants({ variant, size, className }))}>
      <Label arrow={arrow}>{children}</Label>
    </Link>
  )
}

export { Button, ButtonLink, buttonVariants }
