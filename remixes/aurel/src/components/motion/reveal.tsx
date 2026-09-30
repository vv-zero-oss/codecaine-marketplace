import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef, type ReactNode } from "react"

import { useCanvasDesignMode } from "@canvas/react"
import { cn } from "@/lib/utils"

const EASE = [0.22, 1, 0.36, 1] as const

/**
 * Fades a block up into place the first time it enters the screen.
 *
 * Short and small — 24px over 0.9s on the house ease-out — because it runs
 * on almost every block and must never make a reader wait. Held at its end
 * state while the page is being designed in the editor.
 */
export function FadeUp({
  children,
  delay = 0,
  distance = 24,
  duration = 0.9,
  className,
}: {
  children: ReactNode
  delay?: number
  distance?: number
  duration?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  return (
    <motion.div
      className={className}
      initial={still ? false : { opacity: 0, y: distance }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}

/**
 * A photograph uncovered by a wipe, bottom to top, as it enters — with the
 * picture settling from a slight zoom behind the wipe.
 */
export function ClipReveal({
  src,
  alt,
  direction = "up",
  duration = 1.2,
  className,
  imageClassName,
}: {
  src: string
  alt: string
  direction?: "up" | "down" | "left" | "right"
  duration?: number
  className?: string
  imageClassName?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const hidden = {
    up: "inset(100% 0% 0% 0%)",
    down: "inset(0% 0% 100% 0%)",
    left: "inset(0% 0% 0% 100%)",
    right: "inset(0% 100% 0% 0%)",
  }[direction]
  const still = reduced || designing
  return (
    <motion.figure
      className={cn("overflow-hidden", className)}
      initial={still ? false : { clipPath: hidden }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration, ease: [0.65, 0, 0.35, 1] }}
    >
      <motion.img
        src={src}
        alt={alt}
        loading="lazy"
        decoding="async"
        className={cn("block size-full bg-paper-deep object-cover", imageClassName)}
        initial={still ? false : { scale: 1.15 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -10% 0px" }}
        transition={{ duration: duration * 1.3, ease: EASE }}
      />
    </motion.figure>
  )
}

/** A photograph that moves slower than the page inside its frame. */
export function ParallaxImage({ src, alt, strength = 12, className }: { src: string; alt: string; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ["0%", "0%"] : [`-${strength}%`, `${strength}%`])
  return (
    <div ref={ref} className={cn("overflow-hidden", className)}>
      <motion.img src={src} alt={alt} loading="lazy" decoding="async" style={{ y, scale: 1 + strength / 50 }} className="block size-full bg-paper-deep object-cover" />
    </div>
  )
}
