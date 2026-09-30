import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Square-cornered, flat, 14px medium — the page's only button shape.
 * Presses down to 0.97 so every tap is answered.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 cursor-pointer items-center justify-center gap-2 text-sm font-medium whitespace-nowrap outline-none select-none transition-[transform,background-color,color,border-color] duration-(--duration-press) ease-out-strong active:scale-[0.97] focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-ink text-page hover:bg-ink-soft",
        outline: "border border-line-strong bg-page text-ink hover:border-ink",
        ghost: "text-ink hover:bg-sage",
        mint: "bg-mint text-ink hover:bg-mint-soft",
        night: "bg-night-ink text-night hover:bg-white",
        "night-outline": "border border-night-line-strong text-night-ink hover:border-night-ink",
        link: "h-auto px-0 text-ink underline-offset-4 hover:underline",
      },
      size: {
        sm: "h-10 px-4",
        md: "h-11 px-5 md:h-[52px]",
        lg: "h-14 px-7 text-[15px]",
        icon: "size-11",
      },
    },
    defaultVariants: { variant: "primary", size: "md" },
  },
)

type ButtonVariants = VariantProps<typeof buttonVariants>

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> & ButtonVariants & { asChild?: boolean }) {
  const Comp = asChild ? Slot.Root : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

/** A button that navigates. Uses the site router for "/…" paths. */
function ButtonLink({
  className,
  variant,
  size,
  href = "/",
  ...props
}: React.ComponentProps<"a"> & ButtonVariants) {
  return <Link href={href} className={cn(buttonVariants({ variant, size }), className)} {...props} />
}

export { Button, ButtonLink, buttonVariants }
