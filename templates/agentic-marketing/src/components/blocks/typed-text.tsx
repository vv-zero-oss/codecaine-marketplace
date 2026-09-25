import { useInView, useReducedMotion } from "motion/react"
import { useEffect, useRef, useState } from "react"

/**
 * Types a sentence out once it scrolls into view — an explanation of "ask it
 * anything" that shows the asking. Reduced motion gets the whole line at once.
 */
export function TypedText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -120px 0px" })
  const reduce = useReducedMotion()
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    if (reduce) return setCount(text.length)
    let i = 0
    const id = window.setInterval(() => {
      i += 1
      setCount(i)
      if (i >= text.length) window.clearInterval(id)
    }, 34)
    return () => window.clearInterval(id)
  }, [inView, reduce, text])

  return (
    <span ref={ref} className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden>
        {text.slice(0, count)}
        <span className="ml-px inline-block h-[1.1em] w-px translate-y-[0.2em] animate-pulse bg-ink motion-reduce:hidden" />
      </span>
    </span>
  )
}
