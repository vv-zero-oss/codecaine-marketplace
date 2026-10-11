import { useMemo } from "react"

import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { cn } from "@/lib/utils"

/** Clusters of tiny squares, like confetti swept into corners — the
 *  reference's dotted field, drawn as one SVG. Seeded, so it never jumps. */
function ConfettiField({ className }: { className?: string }) {
  const dots = useMemo(() => {
    let s = 7
    const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    const clusters = Array.from({ length: 16 }, () => ({ x: rnd() * 1200, y: rnd() * 420, r: 30 + rnd() * 50 }))
    const out: { x: number; y: number; c: number }[] = []
    for (const k of clusters) {
      for (let i = 0; i < 26; i++) {
        const a = rnd() * Math.PI * 2
        const d = Math.sqrt(rnd()) * k.r
        out.push({ x: Math.round((k.x + Math.cos(a) * d) / 7) * 7, y: Math.round((k.y + Math.sin(a) * d) / 7) * 7, c: Math.floor(rnd() * 6) + 1 })
      }
    }
    return out
  }, [])
  return (
    <svg aria-hidden viewBox="0 0 1200 420" preserveAspectRatio="xMidYMid slice" className={cn("absolute inset-0 size-full", className)}>
      {dots.map((d, i) => (
        <rect key={i} x={d.x} y={d.y} width="3" height="3" rx="0.6" fill={`var(--color-flare-${d.c})`} opacity="0.32" />
      ))}
    </svg>
  )
}

/**
 * The last ask, on every page: a flare headline over a field of swept-up
 * confetti, two pill buttons.
 */
export function ClosingCta({
  title = "Your next great night",
  continuation = "is one tap away.",
  primary = "Find something tonight",
  primaryHref = "/discover",
  secondary = "Host an event",
  secondaryHref = "/create",
}: {
  title?: string
  continuation?: string
  primary?: string
  primaryHref?: string
  secondary?: string
  secondaryHref?: string
}) {
  return (
    <section id="cta" className="relative isolate overflow-hidden py-[clamp(120px,16vw,220px)]">
      <ConfettiField className="-z-10 [mask-image:radial-gradient(ellipse_at_center,transparent_18%,black_62%)]" />
      <Container className="max-w-[1000px] text-center">
        <Reveal>
          <h2 className="type-head mx-auto max-w-[14ch] text-mega text-balance">
            <span className="flare-text">{title}</span> <span className="flare-text">{continuation}</span>
          </h2>
        </Reveal>
        <Reveal delay={0.12} className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href={primaryHref} variant="outline" size="lg">
            {primary}
          </ButtonLink>
          <ButtonLink href={secondaryHref} variant="soft" size="lg">
            {secondary}
          </ButtonLink>
        </Reveal>
      </Container>
    </section>
  )
}
