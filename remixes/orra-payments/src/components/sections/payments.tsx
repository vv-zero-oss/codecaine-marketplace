import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import { PAYMENT_MARKS } from "@/components/brand-marks"
import { GenericTile, PaymentTile } from "@/components/mockups/payment-tile"
import { Terminal } from "@/components/mockups/terminal"
import { Marquee } from "@/components/motion/marquee"
import { Reveal } from "@/components/motion/reveal"
import { ArrowLink } from "@/components/ui/arrow-link"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/eyebrow"
import { SurfaceCard } from "@/components/ui/surface-card"
import { PAYMENTS } from "@/content"
import { cn } from "@/lib/utils"

/** The two ways money comes in, side by side: online and in person. */
export function Payments() {
  return (
    <section id="payments" className="scroll-mt-20 pt-20 sm:pt-28">
      <Container className="grid gap-5 md:grid-cols-2 md:gap-9">
        <Reveal>
          <ProductCard {...PAYMENTS.online} href="#payments">
            <MethodWall className="absolute inset-x-0 bottom-8 sm:bottom-12" />
          </ProductCard>
        </Reveal>
        <Reveal delay={0.08}>
          <ProductCard {...PAYMENTS.inPerson} href="#payments">
            <TerminalStack />
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
    <SurfaceCard className={cn("flex min-h-[500px] flex-col p-6 sm:p-10 xl:min-h-[545px]", className)}>
      <div className="relative z-10">
        <Eyebrow className="mb-2.5">{eyebrow}</Eyebrow>
        <h3 className="max-w-[420px] text-title text-balance">{title}</h3>
        <ArrowLink href={href} className="mt-4">
          {link}
        </ArrowLink>
      </div>
      {/* The picture takes the card's remaining height, edge to edge. */}
      <div data-canvas-ignore className="relative -mx-6 -mb-6 mt-auto h-[280px] pt-6 sm:-mx-10 sm:-mb-10 sm:h-[310px]">
        {children}
      </div>
    </SurfaceCard>
  )
}

/**
 * Two rows of payment-method tiles on a tilt, drifting left. Purpose:
 * explanation — "many methods" shown as many, rather than a number.
 */
export function MethodWall({
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
  const half = Math.ceil(PAYMENT_MARKS.length / 2)
  const rows = [PAYMENT_MARKS.slice(0, half), PAYMENT_MARKS.slice(half)]
  return (
    <div className={cn("pointer-events-none", className)} aria-label="Accepted payment methods">
      <div
        data-canvas-ignore
        className="-mx-8 flex flex-col gap-4"
        style={{ transform: `rotate(${tilt}deg) skewX(${tilt * 0.6}deg)` }}
      >
        {rows.map((row, index) => (
          <Marquee key={index} speed={speed + index * 6} gap={16} paused={paused} pauseOnHover={false}>
            {index === 0 ? <GenericTile kind="card" /> : <GenericTile kind="gift" />}
            {row.map((mark) => (
              <PaymentTile key={mark.id} mark={mark} />
            ))}
          </Marquee>
        ))}
      </div>
    </div>
  )
}

/**
 * Three terminals leaning on each other, each drifting at its own rate as the
 * card scrolls past. Purpose: depth — the hardware reads as objects.
 */
export function TerminalStack({ parallax = 28, className }: { parallax?: number; className?: string }) {
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
        <Terminal shape="handheld" amount="€25.00" className="aspect-[3/4]" />
      </motion.div>
      <motion.div style={{ transform: middle }} className="absolute bottom-[-2%] left-[33%] w-[32%] sm:left-[36%]">
        <Terminal shape="tower" finish="silver" amount="€25.00" className="aspect-[5/8]" />
      </motion.div>
      <motion.div style={{ transform: front }} className="absolute bottom-[2%] left-[58%] w-[30%]">
        <Terminal shape="phone" amount="€25.00" className="aspect-[1/2]" />
      </motion.div>
    </div>
  )
}
