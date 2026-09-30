import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { cn } from "@/lib/utils"
import { useMediaQuery } from "@/components/motion/smooth-scroll"

/**
 * Two lines of display type with a film running inside the letters.
 *
 * The film sits underneath; above it, a sheet in the section's colour with the
 * words in black is blended with `screen` — the sheet stays its colour and the
 * black letters turn into windows onto the footage. The words stay real text:
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
  tone = "snow",
  className,
}: {
  lineOne: string
  lineTwo: string
  src: string
  poster?: string
  parallax?: number
  drift?: number
  tone?: "ice" | "snow"
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
        className="absolute inset-x-0 -top-[20%] -z-10 h-[140%] w-full object-cover brightness-[0.78] contrast-[1.15]"
      />
      <div
        className={cn(
          "flex flex-col items-center py-[4vw] mix-blend-screen",
          tone === "ice" ? "bg-ice" : "bg-snow",
        )}
      >
        <motion.p
          style={{ x: oneX }}
          className="font-headline text-[26vw] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-night md:text-[22vw]"
        >
          {lineOne}
        </motion.p>
        <motion.p
          style={{ x: twoX }}
          className="font-headline text-[26vw] leading-[0.8] font-extrabold tracking-[-0.06em] whitespace-nowrap text-night md:text-[22vw]"
        >
          {lineTwo}
        </motion.p>
      </div>
    </div>
  )
}
