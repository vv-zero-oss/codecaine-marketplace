import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * shadcn/ui's Button, with its variants set to this page's buttons: the
 * forest pill (`default`), the orange one, an outlined chip for choices
 * (`outline`), a bare icon button (`ghost`) and a text link (`link`).
 * The press scales to 0.96 over --duration-press — feedback, fired often, so
 * it is a transition and stays under 160ms.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap font-condensed text-label uppercase outline-none transition-[transform,background-color,color,opacity] duration-(--duration-press) ease-out-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-lime active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "rounded-pill bg-forest text-lime",
        orange: "rounded-pill bg-orange text-forest",
        outline: "rounded-pill border-2 border-forest text-forest [@media(hover:hover)]:hover:bg-forest [@media(hover:hover)]:hover:text-lime",
        ghost: "rounded-pill text-current",
        link: "text-current underline-offset-4 [@media(hover:hover)]:hover:underline",
      },
      size: {
        default: "h-11 px-5",
        sm: "h-8 px-3",
        icon: "size-11",
        "icon-sm": "size-8",
        "icon-lg": "size-[62px]",
        none: "",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"
  return <Comp data-slot="button" className={cn(buttonVariants({ variant, size, className }))} {...props} />
}

export { Button, buttonVariants }
