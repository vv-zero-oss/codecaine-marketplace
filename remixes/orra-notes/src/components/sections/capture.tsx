import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { APP_MARKS } from "@/components/brand-marks"
import { AppTile, OrraTile } from "@/components/mockups/app-tile"
import { Recorder } from "@/components/mockups/recorder"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SurfaceCard } from "@/components/ui/surface-card"
import { CAPTURE } from "@/content"
import { cn } from "@/lib/utils"

/** The two places Orra listens, side by side: your call apps and the room. */
export function Capture() {
  return (
    <section id="capture" className="scroll-mt-24 pt-20 sm:pt-28">
      <Container className="grid gap-4 md:grid-cols-2">
        <Reveal>
          <ProductCard {...CAPTURE.calls} href="#capture">
            <AppWall className="absolute inset-x-0 bottom-8 sm:bottom-12" />
          </ProductCard>
        </Reveal>
        <Reveal delay={0.08}>
          <ProductCard {...CAPTURE.room} href="#capture">
            <DeviceStack />
          </ProductCard>
        </Reveal>
      </Container>
    </section>
  )
}

/** A warm card with an eyebrow, a title, an orange link, and a picture below them. */
export function ProductCard({
  eyebrow,
  title,
  link,
  href,
  children,
  className,
}: {
  eyebrow: string
  title: string
  link: string
  href: string
  children?: React.ReactNode
  className?: string
}) {
  return (
    <SurfaceCard className={cn("flex min-h-[500px] flex-col p-6 sm:p-7 xl:min-h-[545px]", className)}>
      <div className="relative z-10">
        <Eyebrow className="mb-2.5">{eyebrow}</Eyebrow>
        <h3 className="max-w-[440px] font-heading text-heading-sm font-medium text-balance text-bone">{title}</h3>
        <ArrowLink href={href} className="mt-4">
          {link}
        </ArrowLink>
      </div>
      {/* The picture takes the card's remaining height, edge to edge. */}
      <div data-canvas-ignore className="relative -mx-6 -mb-6 mt-auto h-[280px] pt-6 sm:-mx-7 sm:-mb-7 sm:h-[310px]">
        {children}
      </div>
    </SurfaceCard>
  )
}

/**
 * Two rows of app tiles on a tilt, drifting left. Purpose: explanation —
 * "works with everything" shown as everything, rather than a list.
 */
export function AppWall({
  speed = 48,
  tilt = -8,
  paused = false,
  className,
}: {
  speed?: number
  tilt?: number
  paused?: boolean
  className?: string
}) {
  const half = Math.ceil(APP_MARKS.length / 2)
  const rows = [APP_MARKS.slice(0, half), APP_MARKS.slice(half)]
  return (
    <div className={cn("pointer-events-none", className)} aria-label="Apps Orra works with">
      <div
        data-canvas-ignore
        className="-mx-8 flex flex-col gap-4"
        style={{ transform: `rotate(${tilt}deg) skewX(${tilt * 0.6}deg)` }}
      >
        {rows.map((row, index) => (
          <Marquee key={index} speed={speed + index * 6} gap={16} paused={paused} pauseOnHover={false}>
            {index === 0 ? <OrraTile kind="record" /> : <OrraTile kind="notes" />}
            {row.map((mark) => (
              <AppTile key={mark.id} mark={mark} />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  )
}

/**
 * Three devices mid-recording, leaning on each other and drifting at their
 * own rates as the card scrolls past. Purpose: depth — they read as objects.
 */
export function DeviceStack({ parallax = 28, className }: { parallax?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const range = reduce ? 0 : parallax
  const back = useTransform(scrollYProgress, [0, 1], [`translateY(${range}px) rotate(-14deg)`, `translateY(${-range}px) rotate(-14deg)`])
  const middle = useTransform(scrollYProgress, [0, 1], [`translateY(${range * 0.5}px) rotate(-4deg)`, `translateY(${-range * 0.5}px) rotate(-4deg)`])
  const front = useTransform(scrollYProgress, [0, 1], [`translateY(${range * 1.4}px) rotate(12deg)`, `translateY(${-range * 1.4}px) rotate(12deg)`])

  return (
    <div ref={ref} className={cn("relative h-full", className)} aria-hidden>
      <motion.div style={{ transform: back }} className="absolute bottom-[-6%] left-[8%] w-[30%] sm:left-[14%]">
        <Recorder shape="pin" time="12:48" className="aspect-[3/4]" />
      </motion.div>
      <motion.div style={{ transform: middle }} className="absolute bottom-[-2%] left-[33%] w-[32%] sm:left-[36%]">
        <Recorder shape="desk" finish="silver" time="12:48" className="aspect-[5/8]" />
      </motion.div>
      <motion.div style={{ transform: front }} className="absolute bottom-[2%] left-[58%] w-[30%]">
        <Recorder shape="phone" time="12:48" className="aspect-[1/2]" />
      </motion.div>
    </div>
  )
}
