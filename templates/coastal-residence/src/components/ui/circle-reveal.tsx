import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useEffect, useRef, useState, type ReactNode } from "react"

import { cn } from "@/lib/utils"

/**
 * A disc of colour rising over a photograph as you scroll, until it fills the
 * window — the page's way of turning from one chapter to the next. Words can
 * ride round its rim (`arc`), and `children` fade in once it has covered.
 */
export function CircleReveal({
  image,
  imageAlt,
  arc,
  color = "mist",
  children,
  className,
  id,
}: {
  image: string
  imageAlt: string
  arc?: string[]
  color?: "mist" | "shell"
  children?: (progress: MotionValue<number>) => ReactNode
  className?: string
  id?: string
}) {
  const ref = useRef<HTMLElement>(null)
  const reduce = useReducedMotion()
  const [size, setSize] = useState({ w: 1440, h: 900 })
  useEffect(() => {
    const read = () => setSize({ w: window.innerWidth, h: window.innerHeight })
    read()
    window.addEventListener("resize", read)
    return () => window.removeEventListener("resize", read)
  }, [])

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] })
  const diameter = Math.max(size.w * (size.w < 768 ? 2.6 : 1.6), size.h * 1.6)
  const r = diameter / 2
  const dx = size.w / 2
  // The highest the centre may sit and still cover both top corners.
  const coverTop = Math.sqrt(Math.max(r * r - dx * dx, 0)) - r
  const top = useTransform(
    scrollYProgress,
    [0, 0.45, 0.8],
    reduce ? [coverTop, coverTop, coverTop] : [size.h, size.h * 0.42, Math.min(coverTop, 0)],
  )
  const arcSpin = useTransform(scrollYProgress, [0, 0.8], reduce ? [0, 0] : [-14, 0])
  const imageScale = useTransform(scrollYProgress, [0, 0.8], reduce ? [1, 1] : [1, 1.08])

  return (
    <section ref={ref} id={id} className={cn("relative h-[260vh]", className)}>
      <div className="sticky top-0 h-[100svh] overflow-hidden" data-tone="light">
        <motion.img
          src={image}
          alt={imageAlt}
          loading="lazy"
          style={{ scale: imageScale }}
          className="absolute inset-0 size-full object-cover"
        />
        <motion.div
          data-tone="dark"
          className={cn("absolute left-1/2 rounded-full", color === "mist" ? "bg-mist" : "bg-shell")}
          style={{ width: diameter, height: diameter, marginLeft: -r, top }}
        >
          {arc && (
            <motion.svg viewBox="0 0 1000 1000" className="absolute inset-0 size-full text-ink" style={{ rotate: arcSpin }} aria-label={arc.join(" ")}>
              <defs>
                <path id={`arc-${id}`} d="M 60,500 a 440,440 0 1,1 880,0 a 440,440 0 1,1 -880,0" />
              </defs>
              <text
                className="fill-current font-display uppercase"
                style={{ fontStretch: "62.5%", fontWeight: 620, fontSize: size.w < 768 ? 44 : 34, wordSpacing: "1.4em" }}
                textAnchor="middle"
              >
                <textPath href={`#arc-${id}`} startOffset="25%">
                  {arc.join(" ")}
                </textPath>
              </text>
            </motion.svg>
          )}
        </motion.div>
        {children && <div className="pointer-events-none absolute inset-0">{children(scrollYProgress)}</div>}
      </div>
    </section>
  )
}
