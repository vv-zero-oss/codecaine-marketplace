import type * as React from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { LineReveal } from "@/components/motion/line-reveal"
import { photo, type PHOTO } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * How every inner page opens: an eyebrow, a headline stacked loud in the
 * poster face (lines split on "|"), the page's first line of story, and a
 * photograph that parallaxes slower than the type as you leave.
 */
export function PageHero({
  eyebrow = "",
  title = "",
  intro = "",
  image,
  alt = "",
  children,
  className,
}: {
  eyebrow?: string
  title?: string
  intro?: string
  image?: keyof typeof PHOTO
  alt?: string
  children?: React.ReactNode
  className?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], ["0%", reduced ? "0%" : "18%"])
  return (
    <section ref={ref} className={cn("grid gap-10 px-[var(--spacing-gutter)] pt-10 pb-16 lg:grid-cols-[1.618fr_1fr] lg:items-end lg:pt-[96px] lg:pb-20", className)}>
      <div>
        <motion.p initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }} className="type-eyebrow text-ink-3 lg:pl-16">
          {eyebrow}
        </motion.p>
        <LineReveal text={title} as="h1" className="type-display mt-4 text-d5" />
        <motion.p initial={reduced ? false : { opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.7, ease: [0.23, 1, 0.32, 1] }} className="mt-6 max-w-[48ch] text-lead text-ink-2">
          {intro}
        </motion.p>
        {children}
      </div>
      {image && (
        <motion.div initial={reduced ? false : { clipPath: "inset(100% 0 0 0)" }} animate={{ clipPath: "inset(0% 0 0 0)" }} transition={{ delay: 0.3, duration: 1, ease: [0.77, 0, 0.175, 1] }} className="relative aspect-[4/5] overflow-hidden rounded-[var(--radius-tag)] lg:aspect-[3/4]">
          <motion.img style={{ y, scale: 1.15 }} src={photo(image, 1100)} alt={alt} className="h-full w-full object-cover" />
        </motion.div>
      )}
    </section>
  )
}
