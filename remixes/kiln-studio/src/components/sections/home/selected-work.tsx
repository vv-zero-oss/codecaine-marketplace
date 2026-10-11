import { useState } from "react"
import { ArrowUpRight } from "lucide-react"

import { SectionHeading } from "@/components/blocks/section-label"
import { CursorPreview } from "@/components/motion/cursor-preview"
import { Reveal } from "@/components/motion/reveal"
import { ClientMark } from "@/components/work/client-mark"
import { PROJECTS, type Project } from "@/data/projects"
import { pexels } from "@/lib/photos"
import { Link } from "@/lib/router"
import { play } from "@/lib/sound"

/** One featured project as an oversized row: the title is the whole row. */
function FeaturedRow({ project, index, onHover }: { project: Project; index: number; onHover: (p: Project | null) => void }) {
  return (
    <li className="border-t border-line-2 last:border-b">
      <Link
        href={`/work/${project.slug}`}
        onPointerEnter={() => {
          onHover(project)
          play("tick")
        }}
        onFocus={() => onHover(project)}
        className="group/feat grid grid-cols-[1fr_auto] items-center gap-x-6 gap-y-4 py-6 md:grid-cols-[3rem_1fr_11rem_auto] lg:grid-cols-[3rem_1fr_14rem_auto] md:py-8"
      >
        <span className="type-label hidden text-ink-4 tabular-nums md:block">{String(index + 1).padStart(2, "0")}</span>
        <span className="type-head col-start-1 row-start-1 min-w-0 text-mega text-ink-4 md:col-start-2 md:text-[8vw] lg:text-mega transition-[color,transform] duration-(--duration-rise) ease-(--ease-out-strong) group-hover/feat:translate-x-3 group-hover/feat:text-ink group-focus-visible/feat:text-ink">
          {project.title}
        </span>
        <span className="col-span-2 flex flex-col gap-1 md:col-span-1">
          <ClientMark client={project.client} mark={project.mark} className="text-[17px] text-ink-2" />
          <span className="type-label text-ink-4">
            {project.discipline} · {project.year}
          </span>
        </span>
        <span className="col-start-2 row-start-1 grid size-12 place-items-center rounded-full text-ink-3 shadow-[inset_0_0_0_1px_var(--color-line-3)] transition-[background-color,color,transform] duration-(--duration-hover) ease-(--ease-out-strong) group-hover/feat:-rotate-45 group-hover/feat:bg-bone group-hover/feat:text-bone-ink md:col-start-4 md:row-start-auto">
          <ArrowUpRight className="size-5 rotate-45" />
        </span>
        {/* On touch the work sits under the row instead of following a cursor. */}
        <img
          src={pexels(project.photo, 900, 560)}
          alt={`${project.title} for ${project.client}`}
          loading="lazy"
          className="col-span-2 aspect-[16/10] w-full rounded-(--radius-cell) object-cover md:hidden"
        />
      </Link>
    </li>
  )
}

/**
 * The four projects the studio is proudest of, as an index set loud: each
 * title fills its row, greys until you point at it, and the work follows
 * your cursor.
 */
export function SelectedWork() {
  const featured = PROJECTS.filter((p) => p.featured)
  const [hovered, setHovered] = useState<Project | null>(null)
  return (
    <section aria-label="Selected work" className="px-(--spacing-gutter) py-(--spacing-section)" onPointerLeave={() => setHovered(null)}>
      <Reveal>
        <SectionHeading index="03" label="Selected work" title="Four we'd make again tomorrow." continuation="In no particular order." />
      </Reveal>
      <ul className="mt-16">
        {featured.map((p, i) => (
          <FeaturedRow key={p.slug} project={p} index={i} onHover={setHovered} />
        ))}
      </ul>
      <CursorPreview photo={hovered?.photo ?? null} width={340} alt={hovered ? `${hovered.title} for ${hovered.client}` : ""} />
    </section>
  )
}
