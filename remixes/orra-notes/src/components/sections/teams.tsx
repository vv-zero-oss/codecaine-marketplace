import { Marquee } from "@/components/motion/marquee"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FEATURES, HERO, TEAMS } from "@/content"
import { Eyebrow } from "@/components/ui/eyebrow"
import { cn } from "@/lib/utils"

const TEAM_STYLE = {
  serif: "font-heading text-[22px] font-normal tracking-[-0.03em]",
  spaced: "text-[16px] font-medium tracking-[0.3em] uppercase",
  heavy: "font-heading text-[21px] font-semibold tracking-[-0.045em]",
  mono: "font-heading text-[14px] font-medium tracking-[0.14em] uppercase",
  script: "text-[23px] font-medium italic tracking-[-0.03em]",
  round: "text-[23px] font-medium tracking-[-0.05em]",
} as const

/** A team's name set in its own type — stand-ins for customer logos. */
export function TeamMark({
  name,
  style,
  className,
}: {
  name: string
  style: keyof typeof TEAM_STYLE
  className?: string
}) {
  return <span className={cn("whitespace-nowrap text-mist", TEAM_STYLE[style], className)}>{name}</span>
}

/** Who already takes notes with Orra: a still row on wide screens, a slow drift on small ones. */
export function TeamStrip() {
  return (
    <section id="teams" aria-label="Teams using Orra" className="pt-16 sm:pt-20">
      <Eyebrow className="mb-8 px-5 text-center">{HERO.eyebrow}</Eyebrow>
      <Container className="hidden items-center justify-between gap-6 xl:flex">
        {TEAMS.slice(0, 9).map((team) => (
          <TeamMark key={team.name} {...team} />
        ))}
      </Container>
      <Marquee speed={45} gap={48} className="xl:hidden [mask-image:linear-gradient(90deg,transparent,black_12%,black_88%,transparent)]">
        {TEAMS.map((team) => (
          <TeamMark key={team.name} {...team} />
        ))}
      </Marquee>
    </section>
  )
}

/**
 * Everything Orra does, as a numbered list: the name on the left, its
 * two-digit index on the right, no rules and no chrome — structure from type.
 */
export function FeatureIndex() {
  const half = Math.ceil(FEATURES.length / 2)
  return (
    <section id="features" aria-label="Features" className="scroll-mt-24 pt-20 sm:pt-28">
      <Container className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-16">
        <SectionHeading
          eyebrow="Features"
          size="heading"
          title="What Orra handles for you"
          lead="Everything that used to happen after the meeting — done before you’ve closed the tab."
        />
        <div className="grid gap-x-12 sm:grid-cols-2">
          {[FEATURES.slice(0, half), FEATURES.slice(half)].map((column, columnIndex) => (
            <ol key={columnIndex} className="flex flex-col">
              {column.map((feature, index) => (
                <li key={feature.label}>
                  <FeatureLink {...feature} index={columnIndex * half + index + 1} />
                </li>
              ))}
            </ol>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function FeatureLink({ label, href, index }: { label: string; href: string; index: number }) {
  return (
    <a
      href={href}
      className="group/feature flex min-h-11 items-center justify-between gap-4 py-2.5 text-body text-bone transition-colors duration-(--duration-fast)"
    >
      <span className="underline decoration-transparent underline-offset-[5px] transition-[text-decoration-color] duration-(--duration-fast) group-hover/feature:decoration-bone/40">
        {label}
      </span>
      <span className="text-ash tabular-nums">{String(index).padStart(2, "0")}</span>
    </a>
  )
}
