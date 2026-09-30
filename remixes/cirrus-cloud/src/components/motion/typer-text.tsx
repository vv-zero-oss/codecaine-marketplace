import { useEffect, useRef, useState } from "react"
import { useInView } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * A heading that types itself in. When it scrolls into view a wave runs
 * across it, and each letter flickers through a filled ink bar, a lime
 * highlight and an outlined bar before it lands as plain text — neighbours in
 * the same state read as one long bar.
 *
 * Pure CSS keyframes (see `.typer-*` in index.css), so the editor's Motion
 * switch finishes or stops it; it plays once. While the page is being
 * designed it holds its end state, and reduced motion skips straight there.
 */
export function TyperText({
  text,
  as: Tag = "h2",
  duration = 420,
  stagger = 22,
  once = true,
  className,
}: {
  text: string
  as?: "h1" | "h2" | "h3" | "p"
  /** ms each letter spends flickering. */
  duration?: number
  /** ms between one letter starting and the next. */
  stagger?: number
  once?: boolean
  className?: string
}) {
  const ref = useRef<HTMLHeadingElement>(null)
  const inView = useInView(ref, { once, margin: "0px 0px -12% 0px" })
  const { designing } = useCanvasDesignMode()
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (!inView) return
    const total = duration + Math.min(stagger, 600 / Math.max(1, text.length)) * text.length
    const id = window.setTimeout(() => setDone(true), total + 50)
    return () => window.clearTimeout(id)
  }, [inView, duration, stagger, text])

  // A long line keeps its wave inside about a second.
  const step = Math.min(stagger, 600 / Math.max(1, text.length))
  const settled = designing || done
  let index = 0
  const words = text.split(" ")

  return (
    <Tag
      ref={ref}
      aria-label={text}
      className={cn(settled ? "typer-done" : inView && "typer-on", className)}
      style={{ "--typer-duration": `${duration}ms`, "--typer-stagger": `${step}ms` } as React.CSSProperties}
    >
      {words.map((word, w) => (
        <span key={w} aria-hidden className="inline-block whitespace-nowrap">
          {Array.from(word).map((char) => {
            const i = index++
            return (
              <span key={i} className="typer-char" style={{ "--i": i } as React.CSSProperties}>
                {char}
              </span>
            )
          })}
          {w < words.length - 1 && (
            <span className="typer-char" style={{ "--i": index++ } as React.CSSProperties}>
              {" "}
            </span>
          )}
        </span>
      ))}
    </Tag>
  )
}
