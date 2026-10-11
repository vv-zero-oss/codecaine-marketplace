import { motion, useReducedMotion } from "motion/react"
import { ChevronRight } from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Link } from "@/lib/router"
import { pexels } from "@/lib/photos"
import { cn } from "@/lib/utils"

const EASE = [0.23, 1, 0.32, 1] as const

/** Who it is for — each card opens the templates made for them. */
const USE_CASES = [
  { label: "Communities", href: "/templates?kind=Community", photo: 9582689, alt: "Someone running through long grass, blurred with speed", pins: [[28, 42], [62, 30], [48, 64]] },
  { label: "Design studios", href: "/templates?kind=Directories", photo: 33964179, alt: "A swirl of blue and white paint", pins: [[34, 36], [70, 52], [52, 24]] },
  { label: "Real estate", href: "/templates?kind=Property", photo: 11808088, alt: "City lights streaking past at night", pins: [[26, 30], [58, 46], [76, 26]] },
  { label: "Travel", href: "/templates?kind=Travel", photo: 30227319, alt: "A snow-capped mountain under a pink sky", pins: [[40, 38], [66, 30], [30, 58]] },
]

/**
 * The promise, said big: a serif headline set at the top of the golden
 * scale, one grey line of what Cairn is, one blue button. Under it the four
 * kinds of people who make maps, as photo cards; hover one and pins drop
 * onto the photo, the way they would onto a map.
 */
export function Hero({
  title = "Maps people actually use.",
  lead = "Cairn is the AI map maker for guides, directories and event maps — made in minutes, embedded anywhere.",
  cta = "Make a map for free",
}: {
  title?: string
  lead?: string
  cta?: string
}) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const still = reduced || designing
  const words = title.split(" ")
  // two lines, split near the middle
  const cut = Math.ceil(words.length / 2)
  const lines = [words.slice(0, cut).join(" "), words.slice(cut).join(" ")]

  return (
    <section id="top" className="pt-[124px] pb-16 md:pt-[150px] md:pb-24">
      <Container className="flex flex-col items-center text-center">
        <h1 className="type-serif text-mega text-ink">
          {lines.map((line, i) => (
            <span key={i} className="block overflow-hidden pb-[0.06em]">
              <motion.span
                className="block"
                initial={still ? false : { y: "105%" }}
                animate={{ y: "0%" }}
                transition={{ duration: 0.9, ease: EASE, delay: 0.08 + i * 0.09 }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p
          className="mt-7 max-w-[40ch] text-lead text-ink-soft md:mt-8"
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.32 }}
        >
          {lead}
        </motion.p>
        <motion.div
          className="mt-8"
          initial={still ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.42 }}
        >
          <ButtonLink href="/studio" size="lg">
            {cta}
          </ButtonLink>
        </motion.div>
      </Container>

      <Container className="mt-16 md:mt-[104px]">
        <ul className="no-scrollbar -mx-4 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4 lg:gap-6">
          {USE_CASES.map((item, i) => (
            <motion.li
              key={item.label}
              className="w-[78%] shrink-0 snap-start sm:w-auto"
              initial={still ? false : { opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: EASE, delay: 0.5 + i * 0.07 }}
            >
              <UseCaseCard {...item} />
            </motion.li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

/** A photo card with its label along the bottom. Hovering drops three pins
 *  onto the photo and nudges the chevron — a promise of what's inside. */
export function UseCaseCard({
  label,
  href,
  photo,
  alt,
  pins,
  className,
}: {
  label: string
  href: string
  photo: number
  alt: string
  pins: number[][]
  className?: string
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group relative block aspect-[311/212] overflow-hidden rounded-(--radius-card) bg-panel shadow-(--shadow-photo) outline-none transition-[transform,box-shadow] duration-(--duration-swap) ease-(--ease-out-strong) hover:-translate-y-1 focus-visible:ring-[3px] focus-visible:ring-accent/40 active:scale-[0.985]",
        className,
      )}
    >
      <img
        src={pexels(photo, 640, 440)}
        alt={alt}
        draggable={false}
        className="absolute inset-0 size-full scale-[1.02] object-cover blur-[1.5px] saturate-[1.15] transition-transform duration-(--duration-scene) ease-(--ease-out-strong) group-hover:scale-[1.07]"
      />
      <span aria-hidden className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/0 to-black/0" />
      {pins.map(([x, y], i) => (
        <span
          key={i}
          aria-hidden
          className="absolute size-3 -translate-x-1/2 -translate-y-1/2 scale-0 rounded-full bg-raised opacity-0 shadow-(--shadow-pin) ring-[3px] ring-accent transition-[transform,opacity] duration-(--duration-swap) ease-(--ease-pop) group-hover:scale-100 group-hover:opacity-100"
          style={{ left: `${x}%`, top: `${y}%`, transitionDelay: `${i * 60}ms` }}
        />
      ))}
      <span className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 pb-3.5 text-[16px] font-medium tracking-[-0.01em] text-white">
        {label}
        <ChevronRight className="size-4 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:translate-x-1" />
      </span>
    </Link>
  )
}
