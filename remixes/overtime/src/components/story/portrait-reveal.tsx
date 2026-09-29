import { motion } from "motion/react"
import { useState } from "react"

import { ease, prefersReducedMotion } from "@/lib/motion"
import { cn } from "@/lib/utils"

/**
 * A portrait that arrives behind a sweep of black.
 *
 * A black panel grows across the empty frame from the left, then slides off
 * to the right and leaves the picture behind it — a shutter, not a fade, so
 * the face lands all at once. The sweep waits for the image to decode, so it
 * never uncovers a half-loaded picture.
 */
export function PortraitReveal({
  src,
  alt,
  delay = 0.15,
  className,
  imageClassName,
}: {
  src: string
  alt: string
  delay?: number
  className?: string
  imageClassName?: string
}) {
  const [loaded, setLoaded] = useState(false)
  const reduced = prefersReducedMotion()

  return (
    <div className={cn("relative overflow-hidden bg-paper-soft", className)}>
      <motion.img
        src={src}
        alt={alt}
        onLoad={() => setLoaded(true)}
        initial={false}
        animate={{ clipPath: loaded || reduced ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
        transition={{ delay: delay + 0.5, duration: 0.55, ease: ease.inOutQuart }}
        className={cn("size-full object-cover", imageClassName)}
      />
      {!reduced && (
        <motion.div
          aria-hidden
          className="absolute inset-y-0 left-0 w-full bg-ink"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={
            loaded
              ? { clipPath: ["inset(0 100% 0 0)", "inset(0 0% 0 0)", "inset(0 0% 0 100%)"] }
              : { clipPath: "inset(0 100% 0 0)" }
          }
          transition={{ delay, duration: 1.05, times: [0, 0.48, 1], ease: ease.inOutQuart }}
        />
      )}
    </div>
  )
}
