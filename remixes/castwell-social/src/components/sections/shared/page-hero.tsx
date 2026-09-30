import type * as React from "react"
import { ArrowRight } from "lucide-react"
import { motion, useReducedMotion } from "motion/react"

import { useCanvasDesignMode } from "@canvas/react"
import { FloatingChip } from "@/components/motion/floating-chip"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

export type ChipSpec = React.ComponentProps<typeof FloatingChip>

const EASE = [0.23, 1, 0.32, 1] as const

/**
 * Every page opens the same way: a centred serif line, one sentence under
 * it, one black button — with workflow chips floating at different depths
 * around it, and the page's product visual below.
 */
export function PageHero({
  eyebrow,
  title,
  description,
  cta = "Start free",
  ctaHref = "/pricing",
  secondary,
  secondaryHref = "/",
  chips = [],
  compact = false,
  children,
  className,
}: {
  eyebrow?: string
  title: string
  description: string
  cta?: string
  ctaHref?: string
  secondary?: string
  secondaryHref?: string
  chips?: ChipSpec[]
  /** A shorter hero for pages whose content starts right under it. */
  compact?: boolean
  children?: React.ReactNode
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduce || designing
  const enter = (delay: number) =>
    still
      ? {}
      : {
          initial: { opacity: 0, transform: "translateY(12px)" },
          animate: { opacity: 1, transform: "translateY(0px)" },
          transition: { duration: 0.8, delay, ease: EASE },
        }

  return (
    <section className={cn("relative overflow-hidden bg-page", className)}>
      <div className="pointer-events-none absolute inset-0" data-canvas-ignore>
        {chips.map((chip, i) => (
          <FloatingChip key={i} {...chip} />
        ))}
      </div>
      <Container className={cn("relative flex flex-col items-center justify-center py-20 text-center md:py-28", compact ? "min-h-[min(60svh,560px)] md:pb-16" : "min-h-[min(88svh,860px)]")}>
        {eyebrow && (
          <motion.div {...enter(0)}>
            <Eyebrow className="mb-5">{eyebrow}</Eyebrow>
          </motion.div>
        )}
        <motion.h1 {...enter(0.05)} className="max-w-5xl font-serif text-display font-light text-balance text-ink">
          {title}
        </motion.h1>
        <motion.p
          {...enter(0.15)}
          className="mt-5 max-w-[42rem] text-[15px] leading-relaxed text-pretty text-ink-soft md:mt-7 md:text-lg"
        >
          {description}
        </motion.p>
        <motion.div {...enter(0.25)} className="mt-7 flex flex-wrap items-center justify-center gap-3 md:mt-8">
          <ButtonLink href={ctaHref}>
            {cta} <ArrowRight />
          </ButtonLink>
          {secondary && (
            <ButtonLink href={secondaryHref} variant="outline">
              {secondary}
            </ButtonLink>
          )}
        </motion.div>
      </Container>
      {children}
    </section>
  )
}
