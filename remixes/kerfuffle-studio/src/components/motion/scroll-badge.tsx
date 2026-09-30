import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { Globe } from "lucide-react"

import { cn } from "@/lib/utils"

/**
 * A round sticker whose lettering turns as the page scrolls — one full turn
 * for every `perTurn` pixels.
 */
export function ScrollBadge({
  text = "This is how we scroll • ",
  perTurn = 1400,
  className,
}: {
  text?: string
  perTurn?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { scrollY } = useScroll()
  const rotate = useTransform(scrollY, (y) => (reduced ? 0 : (y / perTurn) * 360))
  const id = "badge-circle"
  return (
    <div className={cn("relative grid size-24 place-items-center rounded-full bg-lilac text-ink shadow-sticker md:size-28", className)}>
      <motion.svg viewBox="0 0 100 100" className="absolute inset-0 size-full" style={{ rotate }}>
        <defs>
          <path id={id} d="M50 50 m-34 0 a34 34 0 1 1 68 0 a34 34 0 1 1 -68 0" />
        </defs>
        <text className="label fill-current text-[13px]" letterSpacing="1.5">
          <textPath href={`#${id}`}>{text.repeat(2)}</textPath>
        </text>
      </motion.svg>
      <Globe className="size-8" strokeWidth={1.75} />
    </div>
  )
}
