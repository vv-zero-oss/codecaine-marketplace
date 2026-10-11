import { motion, useReducedMotion } from "motion/react"
import {
  Bitcoin,
  BookOpen,
  Brain,
  CodeXml,
  Earth,
  Flower2,
  Footprints,
  Keyboard,
  Palette,
  PenTool,
  Soup,
  Sprout,
  Sun,
  Wind,
  type LucideIcon,
} from "lucide-react"
import { useCanvasDesignMode } from "@canvas/react"

import { SectionHeading } from "@/components/blocks/section-heading"
import { Container } from "@/components/ui/container"
import { CATEGORIES, COMMUNITIES, UPCOMING_MAJOR } from "@/content/events"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

export const CATEGORY_ICONS: Record<string, LucideIcon> = {
  keyboard: Keyboard,
  soup: Soup,
  brain: Brain,
  palette: Palette,
  earth: Earth,
  footprints: Footprints,
  flower: Flower2,
  bitcoin: Bitcoin,
}

const COMMUNITY_ICONS: Record<string, LucideIcon> = {
  footprints: Footprints,
  "book-open": BookOpen,
  "code-xml": CodeXml,
  "pen-tool": PenTool,
  sun: Sun,
  sprout: Sprout,
  wind: Wind,
}

/** The hairline card every tile in the directory is: lifts a touch on
 *  hover, settles on press. */
const tile =
  "group block rounded-(--radius-card) border border-line bg-raised transition-[transform,box-shadow,border-color] duration-(--duration-hover) ease-(--ease-out-strong) hover:-translate-y-0.5 hover:border-line-strong hover:shadow-(--shadow-card) active:translate-y-0 active:scale-[0.985] active:duration-(--duration-press)"

/** Tiles land one after another as the row scrolls in. */
function Stagger({ children, className, as = "ul" }: { children: React.ReactNode; className?: string; as?: "ul" | "div" }) {
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const Tag = as === "ul" ? motion.ul : motion.div
  if (reduced || designing) {
    const Plain = as
    return <Plain className={className}>{children}</Plain>
  }
  return (
    <Tag
      className={className}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ staggerChildren: 0.05 }}
    >
      {children}
    </Tag>
  )
}

const item = {
  hidden: { opacity: 0, y: 14 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.23, 1, 0.32, 1] as const } },
}

/** A row of the season's big ones — the reference's first band under the hero. */
export function UpcomingMajor() {
  return (
    <section id="major" className="pt-4 pb-14 md:pb-20">
      <Container className="max-w-[1040px]">
        <SectionHeading title="This season’s big ones" link="/discover" />
        <Stagger className="-mx-4 flex snap-x snap-mandatory gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-4">
          {UPCOMING_MAJOR.slice(0, 4).map((m) => (
            <motion.li key={m.name} variants={item} className="w-[78%] shrink-0 snap-start sm:w-auto">
              <Link href="/discover" className={cn(tile, "flex items-center gap-3 p-3")}>
                <span
                  className="grid size-11 shrink-0 place-items-center rounded-[8px] font-(family-name:--font-block) text-[13px] tracking-[0.02em] transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-rotate-6"
                  style={{ background: m.ground, color: m.ink }}
                >
                  {m.mark}
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[16px] font-medium tracking-[-0.012em] text-ink">{m.name}</span>
                  <span className="block truncate text-[14px] text-ink-3">
                    {m.dates} · {m.city}
                  </span>
                </span>
              </Link>
            </motion.li>
          ))}
        </Stagger>
      </Container>
    </section>
  )
}

/** The communities people keep coming back to. */
export function Communities() {
  return (
    <section id="communities" className="py-14 md:py-20">
      <Container className="max-w-[1040px]">
        <SectionHeading title="Communities worth joining" link="/discover" linkLabel="Explore" />
        <Stagger className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {COMMUNITIES.map((c) => {
            const Icon = COMMUNITY_ICONS[c.mark]
            return (
              <motion.li key={c.name} variants={item}>
                <Link href="/discover" className={cn(tile, "h-full p-4")}>
                  <span className="grid size-12 place-items-center rounded-[10px] transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:scale-[1.06]" style={{ background: c.ground, color: c.ink }}>
                    <Icon className="size-6" strokeWidth={1.8} />
                  </span>
                  <span className="mt-4 block text-[17px] font-medium tracking-[-0.016em] text-ink">{c.name}</span>
                  <span className="mt-1 line-clamp-2 block text-[15px] leading-snug text-ink-3">{c.blurb}</span>
                  <span className="mt-3 block text-[13px] text-ink-4 tabular-nums">{c.members.toLocaleString("en-US")} members</span>
                </Link>
              </motion.li>
            )
          })}
          <motion.li variants={item}>
            <Link href="/create" className={cn(tile, "flex h-full min-h-40 flex-col items-start justify-end border-dashed bg-panel/50 p-4")}>
              <span className="text-[17px] font-medium tracking-[-0.016em] text-ink">Start your own</span>
              <span className="mt-1 text-[15px] leading-snug text-ink-3">A page, a calendar and a members list in two minutes.</span>
            </Link>
          </motion.li>
        </Stagger>
      </Container>
    </section>
  )
}

/** Eight doors into Discover, each with its own tint. */
export function Categories() {
  return (
    <section id="categories" className="py-14 md:py-20">
      <Container className="max-w-[1040px]">
        <SectionHeading title="Browse by what you love" />
        <Stagger className="grid grid-cols-2 gap-3 lg:grid-cols-4">
          {CATEGORIES.map((c) => {
            const Icon = CATEGORY_ICONS[c.icon]
            return (
              <motion.li key={c.id} variants={item}>
                <Link href={`/discover?category=${c.id}`} className={cn(tile, "flex h-full flex-col p-4")}>
                  <Icon className={cn("size-7 transition-transform duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-translate-y-0.5 group-hover:-rotate-8", c.tint)} strokeWidth={1.6} />
                  <span className="mt-8 text-[17px] font-medium tracking-[-0.016em] text-ink md:mt-10">{c.label}</span>
                  <span className="text-[14px] text-ink-3 tabular-nums">{c.count.toLocaleString("en-US")} events</span>
                </Link>
              </motion.li>
            )
          })}
        </Stagger>
      </Container>
    </section>
  )
}
