import { ProjectMedia } from "@/components/media/media"
import { TONE_FILL } from "@/components/media/tone"
import { ScrollFlight } from "@/components/motion/scroll-flight"
import { Container } from "@/components/ui/container"
import { PROJECTS, type Project } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * One project: its picture in a frame of its own colour, its name and its
 * sector. The picture lifts a little under the cursor.
 */
export function WorkCard({
  project,
  fly = false,
  className,
}: {
  project: Project
  /** Start the picture in the hero and fly it here on scroll. */
  fly?: boolean
  className?: string
}) {
  const media = (
    <ProjectMedia
      media={project.media}
      tone={project.tone}
      className="transition-transform duration-500 ease-[var(--ease-out-soft)] group-hover:-translate-y-1.5 group-hover:scale-[1.03] group-hover:-rotate-1"
    />
  )
  return (
    <Link
      href={`/work/${project.slug}`}
      className={cn(
        "group relative flex aspect-[3/4] flex-col rounded-[var(--radius-tile)] transition-[filter] duration-300 hover:brightness-105",
        TONE_FILL[project.tone],
        className,
      )}
    >
      <div className="flex flex-1 items-center justify-center px-[15%] pt-[14%]">
        {fly ? (
          <ScrollFlight slot={project.slug} className="w-full">
            {media}
          </ScrollFlight>
        ) : (
          <div className="w-full">{media}</div>
        )}
      </div>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 px-5 pt-4 pb-5 text-[15px]">
        <span className="font-semibold tracking-[-0.01em]">{project.title}</span>
        <span className="text-night/60">{project.sector}</span>
      </div>
    </Link>
  )
}

/** The six projects, three by two. The first three fly in from the hero. */
export function WorkGrid({ flight = true }: { flight?: boolean }) {
  return (
    <section id="work" aria-label="Selected work" className="relative z-10 pt-6 lg:pt-24">
      <Container>
        <div className="grid grid-cols-1 gap-[var(--spacing-tile-gap)] min-[480px]:grid-cols-2 lg:grid-cols-3">
          {PROJECTS.map((project, i) => (
            <WorkCard key={project.slug} project={project} fly={flight && i < 3} />
          ))}
        </div>
      </Container>
    </section>
  )
}
