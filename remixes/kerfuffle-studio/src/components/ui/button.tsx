import { cva, type VariantProps } from "class-variance-authority"
import { ArrowUpRight, type LucideIcon } from "lucide-react"
import type * as React from "react"

import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The studio's button: a rounded pill with its label first and the icon in a
 * round well at the end. On hover the well grows a little and the arrow turns
 * to point straight ahead; on press the pill squeezes.
 */
const buttonVariants = cva(
  "group/button inline-flex items-center gap-3 rounded-pill label leading-none whitespace-nowrap transition-[background-color,color,transform] duration-(--duration-fast) ease-out select-none active:scale-[0.97] disabled:pointer-events-none disabled:opacity-40",
  {
    variants: {
      tone: {
        flame: "bg-flame text-snow hover:bg-flame-deep [&_[data-well]]:bg-snow [&_[data-well]]:text-flame",
        lime: "bg-lime text-ink hover:bg-lime-deep [&_[data-well]]:bg-ink [&_[data-well]]:text-lime",
        white: "bg-card text-ink hover:bg-snow [&_[data-well]]:bg-ink [&_[data-well]]:text-snow",
        ink: "bg-ink text-snow hover:bg-night-raised [&_[data-well]]:bg-lime [&_[data-well]]:text-ink",
      },
      size: {
        sm: "h-10 pr-1 pl-4 text-xs [&_[data-well]]:size-8",
        md: "h-12 pr-1.5 pl-5 text-sm [&_[data-well]]:size-9",
        lg: "h-14 pr-2 pl-6 text-base [&_[data-well]]:size-10",
      },
    },
    defaultVariants: { tone: "flame", size: "md" },
  },
)

type ButtonStyle = VariantProps<typeof buttonVariants>

type Shared = ButtonStyle & {
  label: string
  icon?: LucideIcon
  loading?: boolean
}

function Inner({ label, icon: Icon = ArrowUpRight, loading }: Pick<Shared, "label" | "icon" | "loading">) {
  return (
    <>
      <span>{label}</span>
      <span
        data-well
        className="flex shrink-0 items-center justify-center rounded-full transition-transform duration-(--duration-base) ease-(--ease-pop) group-hover/button:scale-110"
      >
        {loading ? (
          <span className="size-4 animate-spin rounded-full border-2 border-current border-t-transparent" />
        ) : (
          <Icon
            className={cn(
              "size-4 transition-transform duration-(--duration-base) ease-out",
              Icon === ArrowUpRight && "group-hover/button:rotate-45",
            )}
            strokeWidth={2.5}
          />
        )}
      </span>
    </>
  )
}

export function Button({
  className,
  tone,
  size,
  label,
  icon,
  loading,
  ...props
}: Omit<React.ComponentProps<"button">, "children"> & Shared) {
  return (
    <button className={cn(buttonVariants({ tone, size }), className)} disabled={loading || props.disabled} {...props}>
      <Inner label={label} icon={icon} loading={loading} />
    </button>
  )
}

/** The same button as a link: internal paths go through the page transition. */
export function ButtonLink({
  className,
  tone,
  size,
  label,
  icon,
  href = "/",
  ...props
}: Omit<React.ComponentProps<"a">, "children"> & Shared) {
  const classes = cn(buttonVariants({ tone, size }), className)
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes} {...props}>
        <Inner label={label} icon={icon} />
      </Link>
    )
  }
  return (
    <a href={href} className={classes} {...props}>
      <Inner label={label} icon={icon} />
    </a>
  )
}

export { buttonVariants }
