import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

/**
 * shadcn/ui's Button, with its variants set to this page's buttons: a round
 * arrow button that sits inside a pill (`round`, on either tone), a text link
 * (`link`), and the dark circle that wipes the drawing (`default` + `icon`).
 * The press scales to 0.96 over --duration-press — feedback, fired often, so
 * it is a transition and stays under 160ms.
 */
const buttonVariants = cva(
  "inline-flex shrink-0 items-center justify-center gap-2 whitespace-nowrap text-ui font-normal outline-none transition-[transform,background-color,color,opacity] duration-(--duration-press) ease-out-strong focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-transparent active:scale-[0.96] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "rounded-pill bg-pill text-cream",
        cream: "rounded-pill bg-cream text-ink",
        ghost: "rounded-pill text-ink",
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
