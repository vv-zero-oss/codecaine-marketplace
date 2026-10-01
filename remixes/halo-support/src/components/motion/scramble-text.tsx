import { animate } from "motion/react"
import { useEffect, useState } from "react"

import { useStill } from "@/components/motion"
import { cn } from "@/lib/utils"

const GLYPHS = "abcdefghijklmnopqrstuvwxyz0123456789#%&*+=<>/"

/** Display type that resolves left to right out of noise, the way a terminal
 *  settles. Re-runs whenever `text` changes. `scanlines` cuts it with the
 *  raster mask from index.css. */
export function ScrambleText({
  text,
  duration = 0.9,
  delay = 0,
  scanlines = true,
  className,
}: {
  text: string
  duration?: number
  delay?: number
  scanlines?: boolean
  className?: string
}) {
  const still = useStill()
  const [shown, setShown] = useState(text)

  useEffect(() => {
    if (still) {
      setShown(text)
      return
    }
    const controls = animate(0, 1, {
      duration,
      delay,
      ease: "linear",
      onUpdate: (progress) => {
        const settled = Math.floor(progress * text.length)
        setShown(
          text
            .split("")
            .map((char, i) => (i < settled || char === " " ? char : GLYPHS[Math.floor(Math.random() * GLYPHS.length)]))
            .join(""),
        )
      },
      onComplete: () => setShown(text),
    })
    return () => controls.stop()
  }, [text, duration, delay, still])

  return (
    <span className={cn(scanlines && "scanline", "inline-block", className)} aria-label={text}>
      <span aria-hidden>{shown}</span>
    </span>
  )
}
