import { motion, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"


/**
 * A headline that arrives word by word: each word clears from a blur and
 * rises into place a beat after the one before it. Line breaks in `text`
 * (`\n`) are kept on screens from `sm` up. Reduced motion keeps a plain
 * fade; the canvas editor sees the finished line.
 */
export function SplitText({
  text,
  as: Tag = "h2",
  delay = 0,
  stagger = 0.05,
  duration = 0.7,
  blur = 10,
  distance = 18,
  className,
}: {
  text: string
  as?: "h1" | "h2" | "h3" | "p"
  delay?: number
  stagger?: number
  duration?: number
  blur?: number
  distance?: number
  className?: string
}) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const MotionTag = motion[Tag]
  let index = 0
  const lines = text.split("\n")

  return (
    <MotionTag
      className={className}
      initial={designing ? false : "hidden"}
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      aria-label={text.replace(/\n/g, " ")}
    >
      {lines.map((line, l) => (
        <span key={l} aria-hidden className="sm:block">
          {line.split(" ").map((word, w) => {
            const i = index++
            return (
              <span key={w} className="inline-block whitespace-pre">
                <motion.span
                  className="inline-block"
                  variants={{
                    hidden: reduce
                      ? { opacity: 0 }
                      : { opacity: 0, filter: `blur(${blur}px)`, transform: `translateY(${distance}px)` },
                    shown: { opacity: 1, filter: "blur(0px)", transform: "translateY(0px)" },
                  }}
                  transition={{ duration, ease: [0.23, 1, 0.32, 1], delay: delay + i * stagger }}
                >
                  {word}
                </motion.span>
                {w < line.split(" ").length - 1 || l < lines.length - 1 ? " " : ""}
              </span>
            )
          })}
        </span>
      ))}
    </MotionTag>
  )
}

