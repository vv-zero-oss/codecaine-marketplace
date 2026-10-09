import { motion, useTransform, type MotionValue } from "motion/react"

import { cn } from "@/lib/utils"

function Word({ progress, range, children }: { progress: MotionValue<number>; range: [number, number]; children: string }) {
  const opacity = useTransform(progress, range, [0.14, 1])
  const y = useTransform(progress, range, [6, 0])
  return (
    <motion.span style={{ opacity, y }} className="inline-block will-change-[opacity,transform]">
      {children}
    </motion.span>
  )
}

/**
 * Text that fills in word by word as `progress` runs. Why it exists: a long
 * quote is read at the speed the visitor scrolls, not all at once.
 */
export function WordReveal({
  text,
  progress,
  start = 0,
  end = 1,
  className,
}: {
  text: string
  progress: MotionValue<number>
  start?: number
  end?: number
  className?: string
}) {
  const words = text.split(" ")
  return (
    <span className={cn("inline", className)} aria-label={text}>
      {words.map((word, i) => {
        const from = start + ((end - start) * i) / words.length
        const to = start + ((end - start) * (i + 1.6)) / words.length
        return (
          <span key={i} aria-hidden>
            <Word progress={progress} range={[from, Math.min(to, end)]}>{word}</Word>
            {i < words.length - 1 ? " " : ""}
          </span>
        )
      })}
    </span>
  )
}
