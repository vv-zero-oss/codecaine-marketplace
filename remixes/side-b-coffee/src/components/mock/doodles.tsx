import { useRef, type ReactNode } from "react"
import { useInView, useReducedMotion } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { cn } from "@/lib/utils"

/**
 * The shop's hand-drawn marks — a steaming cup in headphones, a boombox, a
 * kettle, a record with legs, a crate of LPs, a bike with a bag in the
 * basket. One stroke weight, currentColor, round ends.
 *
 * Each one draws itself in the first time it scrolls into view (a 1.1s
 * ease-out trace, staggered a touch per stroke), and wiggles on hover —
 * a small "hello" for the mouse. Reduced motion and the editor see the
 * finished drawing.
 */
export type DoodleName = "cup" | "boombox" | "kettle" | "record" | "crate" | "bike" | "bean" | "sun"

export function Doodle({
  name = "cup",
  draw = true,
  wiggle = true,
  className,
}: {
  name?: DoodleName
  /** trace the lines in when it scrolls into view */
  draw?: boolean
  /** a small tilt on hover */
  wiggle?: boolean
  className?: string
}) {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" })
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const drawn = !draw || reduced || designing || inView

  return (
    <svg
      ref={ref}
      viewBox="0 0 120 100"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
      data-drawn={drawn}
      className={cn(
        "doodle group/doodle h-auto w-24 text-ink",
        "[&_.s]:[stroke-dasharray:1] [&_.s]:transition-[stroke-dashoffset] [&_.s]:duration-[1100ms] [&_.s]:ease-(--ease-out-strong)",
        "data-[drawn=false]:[&_.s]:[stroke-dashoffset:1] data-[drawn=true]:[&_.s]:[stroke-dashoffset:0]",
        wiggle && "transition-transform duration-(--duration-swap) ease-(--ease-out-strong) [@media(hover:hover)]:hover:-rotate-6",
        className,
      )}
    >
      {SHAPES[name]}
    </svg>
  )
}

/** pathLength=1 lets one dash value trace any stroke, whatever its length */
function S({ d, delay = 0 }: { d: string; delay?: number }) {
  return <path className="s" pathLength={1} d={d} style={{ transitionDelay: `${delay}ms` }} />
}

const SHAPES: Record<DoodleName, ReactNode> = {
  cup: (
    <>
      <S d="M30 44 L36 84 Q37 90 44 90 L70 90 Q77 90 78 84 L84 44 Z" />
      <S d="M84 52 Q98 52 97 63 Q96 74 81 73" delay={80} />
      <S d="M26 44 L88 44" delay={120} />
      <S d="M24 46 Q22 22 57 18 Q92 22 90 46" delay={180} />
      <S d="M18 40 Q16 52 24 54 Q30 54 30 44 L30 36 Q24 34 18 40 Z" delay={240} />
      <S d="M96 40 Q98 52 90 54 Q84 54 84 44 L84 36 Q90 34 96 40 Z" delay={240} />
      <S d="M50 12 Q46 6 50 2 M60 12 Q56 6 60 2 M70 12 Q66 6 70 2" delay={320} />
      <S d="M44 64 Q57 72 70 64" delay={360} />
    </>
  ),
  boombox: (
    <>
      <S d="M10 34 L110 34 Q114 34 114 38 L114 86 Q114 90 110 90 L10 90 Q6 90 6 86 L6 38 Q6 34 10 34 Z" />
      <S d="M30 34 L36 14 L84 14 L90 34" delay={60} />
      <S d="M32 62 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0" delay={120} />
      <S d="M32 62 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" delay={160} />
      <S d="M88 62 m-16 0 a16 16 0 1 0 32 0 a16 16 0 1 0 -32 0" delay={200} />
      <S d="M88 62 m-6 0 a6 6 0 1 0 12 0 a6 6 0 1 0 -12 0" delay={240} />
      <S d="M52 48 L68 48 L68 58 L52 58 Z" delay={280} />
      <S d="M52 70 L68 70 M52 78 L68 78" delay={320} />
      <S d="M98 10 L104 4 M104 16 L112 14 M92 6 L92 0" delay={380} />
    </>
  ),
  kettle: (
    <>
      <S d="M28 88 L92 88 Q90 46 60 42 Q30 46 28 88 Z" />
      <S d="M44 42 Q60 22 76 42" delay={80} />
      <S d="M30 70 Q14 66 8 40 Q4 30 2 32" delay={140} />
      <S d="M90 60 Q108 60 106 74 Q104 84 92 82" delay={200} />
      <S d="M56 30 L64 30" delay={260} />
      <S d="M4 24 Q2 18 6 14 M12 20 Q10 14 14 10" delay={320} />
    </>
  ),
  record: (
    <>
      <S d="M60 46 m-34 0 a34 34 0 1 0 68 0 a34 34 0 1 0 -68 0" />
      <S d="M60 46 m-24 0 a24 24 0 1 0 48 0 a24 24 0 1 0 -48 0" delay={80} />
      <S d="M60 46 m-10 0 a10 10 0 1 0 20 0 a10 10 0 1 0 -20 0" delay={140} />
      <S d="M46 78 L40 96 L30 96 M74 78 L80 96 L90 96" delay={220} />
      <S d="M27 44 Q10 40 8 24 M93 44 Q110 40 112 26" delay={280} />
      <S d="M52 42 L52 44 M68 42 L68 44" delay={340} />
      <S d="M54 52 Q60 56 66 52" delay={360} />
    </>
  ),
  crate: (
    <>
      <S d="M10 40 L110 40 L106 92 L14 92 Z" />
      <S d="M14 58 L106 58 M14 76 L106 76" delay={80} />
      <S d="M22 40 L26 6 L38 6 L36 40 M40 40 L46 10 L58 10 L52 40 M56 40 L66 4 L78 6 L68 40 M72 40 L86 12 L96 16 L84 40" delay={160} />
      <S d="M50 66 L70 66" delay={300} />
    </>
  ),
  bike: (
    <>
      <S d="M28 70 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0" />
      <S d="M92 70 m-20 0 a20 20 0 1 0 40 0 a20 20 0 1 0 -40 0" delay={80} />
      <S d="M28 70 L48 40 L80 40 L92 70 M48 40 L60 70 L80 40 M60 70 L28 70" delay={140} />
      <S d="M44 32 L54 32 M80 40 L84 26 L94 26" delay={220} />
      <S d="M90 26 L112 26 L108 44 L94 44 Z" delay={280} />
      <S d="M100 20 Q98 14 102 10 M106 20 Q104 14 108 10" delay={340} />
    </>
  ),
  bean: (
    <>
      <S d="M60 8 Q100 14 100 50 Q100 88 60 92 Q20 88 20 50 Q20 12 60 8 Z" />
      <S d="M60 10 Q44 30 60 50 Q76 70 60 90" delay={120} />
    </>
  ),
  sun: (
    <>
      <S d="M60 50 m-18 0 a18 18 0 1 0 36 0 a18 18 0 1 0 -36 0" />
      <S d="M60 20 L60 8 M60 80 L60 92 M30 50 L18 50 M90 50 L102 50 M39 29 L30 20 M81 29 L90 20 M39 71 L30 80 M81 71 L90 80" delay={120} />
      <S d="M52 46 L52 48 M68 46 L68 48 M53 56 Q60 62 67 56" delay={260} />
    </>
  ),
}
