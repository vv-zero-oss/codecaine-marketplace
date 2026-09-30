import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/components/motion/smooth-scroll"

/**
 * Two lines of display type with a film running inside the letters.
 *
 * The film sits underneath; above it, a white sheet with the words in black
 * is blended with `screen`, so the sheet stays white and the letters turn into
 * windows onto the footage. The paper colour is then multiplied over the lot. The words stay real text:
 * selectable, readable, editable.
 *
 * On scroll the footage drifts vertically against the page (`parallax`, in
 * px) while the two lines slide in opposite directions (`drift`, in px).
 * Both are halved on phones and switched off under reduced motion.
 */
export function TextClipParallax({
  lineOne,
  lineTwo,
  src,
  poster,
  parallax = 160,
  drift = 120,
  tone = "paper",
  className,
}: {
  lineOne: string
  lineTwo: string
  src: string
  poster?: string
  parallax?: number
  drift?: number
  /** The paper colour the letters are printed on. */
  tone?: "paper" | "paper-deep" | "sheet"
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const small = useMediaQuery("(max-width: 767px)")
  const k = reduce ? 0 : small ? 0.5 : 1
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const filmY = useTransform(scrollYProgress, [0, 1], [-parallax * k, parallax * k])
  const oneX = useTransform(scrollYProgress, [0, 1], [drift * k, -drift * k])
  const twoX = useTransform(scrollYProgress, [0, 1], [-drift * k, drift * k])

  return (
    <div ref={ref} className={cn("relative isolate overflow-hidden", className)}>
      <motion.video
        src={src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        aria-hidden
        style={{ y: filmY }}
        className="absolute inset-x-0 -top-[20%] -z-10 h-[140%] w-full object-cover brightness-[0.72] contrast-[1.2] grayscale-[0.35]"
      />
      <div className="flex flex-col items-center bg-white py-[4vw] mix-blend-screen">
        <motion.p
          style={{ x: oneX }}
          className="font-serif text-[27vw] leading-[0.78] font-semibold tracking-[-0.05em] whitespace-nowrap text-night md:text-[23vw]"
        >
          {lineOne}
        </motion.p>
        <motion.p
          style={{ x: twoX }}
          className="font-serif text-[27vw] leading-[0.78] font-semibold tracking-[-0.05em] whitespace-nowrap text-night md:text-[23vw]"
        >
          {lineTwo}
        </motion.p>
      </div>
      {/* The paper, multiplied over everything: white becomes paper, and the
          footage in the letters takes on the paper's warmth, like ink. */}
      <div
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 mix-blend-multiply",
          tone === "paper" && "bg-paper",
          tone === "paper-deep" && "bg-paper-deep",
          tone === "sheet" && "bg-sheet",
        )}
      />
    </div>
  )
}
