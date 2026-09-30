import { Asterisk } from "lucide-react"

import { Duotone } from "@/components/media/media"
import { TONE_FILL, TONE_TEXT } from "@/components/media/tone"
import { PageIntro } from "@/components/sections/page-intro"
import { StatGrid } from "@/components/sections/stat-grid"
import { Container } from "@/components/ui/container"
import { pexels, type Project } from "@/content"
import { cn } from "@/lib/utils"

/** A case study's opening: the name, the story in a paragraph, the facts. */
export function CaseHeader({ project }: { project: Project }) {
  return (
    <Container className="pt-16 sm:pt-24">
      <p className={cn("mb-4 text-[15px] font-medium", TONE_TEXT[project.tone])}>
        {project.sector} · {project.year}
      </p>
      <PageIntro title={project.title} lede={project.lede} className="max-w-[40rem]" />
      <dl className="mt-10 grid grid-cols-2 gap-6 border-t border-line pt-6 text-[15px] sm:grid-cols-3">
        <div>
          <dt className="text-ink-faint">Role</dt>
          <dd className="mt-1 text-ink">{project.role}</dd>
        </div>
        <div>
          <dt className="text-ink-faint">Team</dt>
          <dd className="mt-1 text-ink">{project.team}</dd>
        </div>
        <div>
          <dt className="text-ink-faint">Year</dt>
          <dd className="mt-1 text-ink">{project.year}</dd>
        </div>
      </dl>
    </Container>
  )
}

/** Two panels side by side: the tone with a mark, and the photograph in it. */
export function CaseHero({ project }: { project: Project }) {
  return (
    <Container size="wide" className="mt-14 sm:mt-20">
      <div className="grid gap-[var(--spacing-tile-gap)] md:grid-cols-2">
        <div
          className={cn(
            "relative flex aspect-[4/3] items-center justify-center overflow-hidden rounded-[var(--radius-tile)]",
            TONE_FILL[project.tone],
          )}
        >
          <div aria-hidden className="halftone absolute inset-0 opacity-60 mix-blend-multiply" />
          <Asterisk aria-hidden className="relative size-[38%] text-night" strokeWidth={2.4} />
        </div>
        <Duotone
          src={pexels(project.cover.id, 1200)}
          alt={project.cover.alt}
          tone={project.tone}
          className="aspect-[4/3] rounded-[var(--radius-tile)]"
        />
      </div>
    </Container>
  )
}

/** What happened, and what it added up to. */
export function CaseBody({ project }: { project: Project }) {
  return (
    <Container className="mt-16 grid gap-14 sm:mt-24 lg:grid-cols-[12rem_1fr]">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">The work</h2>
      <div className="space-y-5 text-[17px] leading-[1.65] text-ink-muted sm:text-lg">
        {project.body.map((paragraph) => (
          <p key={paragraph.slice(0, 24)}>{paragraph}</p>
        ))}
      </div>
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Impact</h2>
      <StatGrid stats={project.stats} accent={TONE_TEXT[project.tone]} />
    </Container>
  )
}

/** A headline about the work and who ran it, as a card. */
export function PressCard({ headline, outlet }: { headline: string; outlet: string }) {
  return (
    <li className="flex min-h-48 flex-col justify-between gap-8 rounded-[var(--radius-tile)] bg-ground-deep p-5 transition-colors duration-300 hover:bg-ground-raised sm:p-6">
      <p className="max-w-[18rem] text-lg leading-snug tracking-[-0.01em] text-ink">{headline}</p>
      <p className="text-[15px] font-semibold tracking-tight text-ink-faint">{outlet}</p>
    </li>
  )
}

export function PressGrid({ project }: { project: Project }) {
  return (
    <Container className="mt-20 grid gap-8 border-t border-line pt-10 lg:grid-cols-[12rem_1fr]">
      <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">Press</h2>
      <ul className="grid gap-[var(--spacing-tile-gap)] sm:grid-cols-2">
        {project.press.map((item) => (
          <PressCard key={item.headline} {...item} />
        ))}
      </ul>
    </Container>
  )
}
