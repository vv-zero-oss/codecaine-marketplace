import { motion, useReducedMotion } from "motion/react"
import { useMemo } from "react"
import { useCanvasDesignMode } from "@canvas/react"

import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { COVERAGE } from "@/content"
import { cn } from "@/lib/utils"
import world from "@/assets/world-dots.json"

const FLAGS = import.meta.glob<string>("@/assets/flags/*.svg", { eager: true, query: "?url", import: "default" })
const flagUrl = (code: string) => FLAGS[`/src/assets/flags/${code}.svg`]

/** The world, drawn in dots, as a quiet backdrop. */
export function DottedMap({ dot = 0.3, className }: { dot?: number; className?: string }) {
  const circles = useMemo(
    () => world.p.map(([x, y], i) => <circle key={i} cx={x} cy={y} r={dot} />),
    [dot],
  )
  return (
    <svg
      aria-hidden
      viewBox={`0 0 ${world.w} ${world.h}`}
      className={cn("pointer-events-none fill-dot", className)}
      style={{
        maskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
        WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 50% 50%, #000 40%, transparent 100%)",
      }}
    >
      {circles}
    </svg>
  )
}

/** A white pill with a round flag, tipped at an angle as if dropped on the table. */
export function FlagChip({ code, name, rotate = 0, className }: { code: string | null; name: string; rotate?: number; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-11 items-center gap-2.5 rounded-chip bg-surface pr-5 pl-2 text-[0.875rem] font-medium text-ink-soft shadow-chip sm:h-12",
        !code && "pl-5",
        className,
      )}
      style={{ rotate: `${rotate}deg` }}
    >
      {code ? <img src={flagUrl(code)} alt="" className="size-7 rounded-full" /> : null}
      {name}
    </span>
  )
}

// Angles and drops read off the reference, so the pile looks tossed, not gridded.
const SCATTER = [
  { r: -6, y: 6 },
  { r: -3, y: -4 },
  { r: 4, y: 8 },
  { r: 9, y: 0 },
  { r: -7, y: 2 },
  { r: 8, y: 10 },
  { r: -4, y: -2 },
  { r: 7, y: -6 },
  { r: -5, y: 4 },
  { r: 3, y: -2 },
]

/**
 * The countries, dropped in one after another when the section arrives —
 * each falls a little way, turning into its resting angle on a soft spring.
 * On a fine pointer a chip lifts under the cursor.
 */
export function FlagCloud({ stagger = 0.04, drop = 28, className }: { stagger?: number; drop?: number; className?: string }) {
  const reduce = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  return (
    <ul className={cn("mx-auto flex max-w-[680px] flex-wrap justify-center gap-x-3 gap-y-3 sm:gap-x-4", className)}>
      {COVERAGE.countries.map((country, i) => {
        const s = SCATTER[i % SCATTER.length]
        return (
          <motion.li
            key={country.name}
            className="[@media(hover:hover)_and_(pointer:fine)]:hover:-translate-y-1 transition-transform duration-(--duration-hover) ease-out"
            style={{ marginTop: s.y }}
            initial={designing ? false : reduce ? { opacity: 0 } : { opacity: 0, transform: `translateY(-${drop}px) rotate(${-s.r}deg)` }}
            whileInView={{ opacity: 1, transform: "translateY(0px) rotate(0deg)" }}
            viewport={{ once: true, margin: "0px 0px -10% 0px" }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.2, delay: 0.15 + i * stagger }}
          >
            <FlagChip code={country.code} name={country.name} rotate={s.r} />
          </motion.li>
        )
      })}
    </ul>
  )
}

/** Where the card works: the dotted world behind a headline and the pile of flags. */
export function Coverage({
  eyebrow = COVERAGE.eyebrow,
  title = COVERAGE.title,
  blurb = COVERAGE.blurb,
}: {
  eyebrow?: string
  title?: string
  blurb?: string
}) {
  return (
    <section id="coverage" className="relative overflow-hidden pt-8 pb-24 sm:pb-32">
      <DottedMap className="absolute top-0 left-1/2 w-[max(900px,110%)] -translate-x-1/2 sm:w-[1000px]" />
      <Container className="relative pt-12 sm:pt-20">
        <SectionHeading eyebrow={eyebrow} title={title} blurb={blurb} />
        <FlagCloud className="mt-12 sm:mt-14" />
      </Container>
    </section>
  )
}
