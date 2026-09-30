import type { VariantProps } from "class-variance-authority"

import { MixedTitle } from "@/components/ui/mixed-title"
import { buttonVariants } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Link } from "@/router"

/**
 * A house button that goes somewhere. The label uses the `_italic_ CAPS`
 * markup, like the titles.
 */
export function ButtonLink({
  href,
  label,
  variant = "chip",
  size = "chip",
  className,
}: {
  href: string
  label: string
  className?: string
} & VariantProps<typeof buttonVariants>) {
  return (
    <Link href={href} className={cn(buttonVariants({ variant, size }), className)}>
      <MixedTitle as="span" text={label} className="whitespace-nowrap" />
    </Link>
  )
}
