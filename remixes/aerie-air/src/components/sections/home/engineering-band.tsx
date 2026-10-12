import { useRef } from "react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { photos } from "@/lib/photos"
import { CountUp } from "@/components/motion/count-up"
import { ButtonLink } from "@/components/ui/button"

/**
 * The machine, briefly: a full-bleed dusk photograph of a wing that
 * drifts slower than the page, the line, an Explore pill to the aircraft
 * page, and three facts that count up as they arrive.
 */
export function EngineeringBand({
  title = "Engineering that makes the dream sound quiet",
  drift = 14,
}: {
  title?: string
  /** How far (%) the photograph drifts against the scroll. */
  drift?: number
}) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [`-${drift}%`, `${drift}%`])

  return (
    <section ref={ref} data-header-tone="light" className="relative isolate flex min-h-[100svh] items-end overflow-hidden bg-dusk text-dusk-fg">
      <motion.img
        src={photos["wing-dusk"].src}
        alt={photos["wing-dusk"].alt}
        loading="lazy"
        style={reduced || designing ? undefined : { y, scale: 1.3 }}
        className="absolute inset-0 -z-10 size-full object-cover"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-dusk/85 via-dusk/25 to-transparent" />
      <div className="grid w-full gap-10 px-(--spacing-gutter) pb-[clamp(40px,8svh,96px)] md:grid-cols-2 md:items-end">
        <div className="flex flex-col items-start gap-6">
          <h2 className="type-head max-w-[16ch] text-h2">{title}</h2>
          <ButtonLink href="/aircraft" variant="cream" size="sm">
            Explore the aircraft
          </ButtonLink>
        </div>
        <dl className="grid grid-cols-[auto_auto_auto] max-sm:grid-cols-2 gap-4 border-l border-dusk-fg/40 pl-4 md:ml-auto md:max-w-md">
          <div>
            <dt className="text-micro text-dusk-muted">Take-off</dt>
            <dd className="text-h4 font-medium tabular-nums">Vertical</dd>
          </div>
          <div>
            <dt className="text-micro text-dusk-muted">Top speed</dt>
            <dd className="text-h4 font-medium tabular-nums">
              <CountUp value={290} /> <span className="text-micro">km/h</span>
            </dd>
          </div>
          <div>
            <dt className="text-micro text-dusk-muted">In flight</dt>
            <dd className="text-h4 font-medium">Zero emissions</dd>
          </div>
        </dl>
      </div>
    </section>
  )
}
