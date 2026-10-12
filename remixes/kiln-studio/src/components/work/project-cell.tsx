import type * as React from "react"

import { ClientMark } from "@/components/work/client-mark"
import type { Project } from "@/data/projects"
import { pexels } from "@/lib/photos"
import { Link } from "@/lib/router"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

/**
 * One cell of the wall: the client's mark and the project's name across the
 * top, the work floating in the middle on a soft shadow, the discipline and
 * tags along the bottom with the year. The whole cell lightens on hover
 * (240ms, measured off the reference), and it is a link.
 */
export function ProjectCell({
  project,
  className,
  style,
  imageSize = 520,
  ...props
}: { project: Project; imageSize?: number } & Omit<React.ComponentProps<"a">, "href">) {
  return (
    <Link
      href={`/work/${project.slug}`}
      onPointerEnter={() => play("tick")}
      className={cn(
        "group/cell flex flex-col justify-between border-r border-b border-line bg-cell p-[clamp(8px,0.9vw,14px)] text-ink transition-colors duration-(--duration-hover) ease-(--ease-out-strong) outline-none select-none hover:bg-cell-hover focus-visible:bg-cell-hover focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-ember",
        className,
      )}
      style={style}
      draggable={false}
      {...props}
    >
      <span className="flex items-start justify-between gap-3">
        <ClientMark client={project.client} mark={project.mark} className="text-[clamp(11px,0.95vw,15px)] text-ink-2" />
        <span className="type-label text-right text-[clamp(8.5px,0.62vw,11px)] text-ink-3">{project.title}</span>
      </span>
      <span className="flex flex-1 items-center justify-center py-[6%]">
        <span
          className="relative aspect-[1/1.02] w-[64%] overflow-hidden rounded-(--radius-cell) shadow-(--shadow-card) transition-transform duration-(--duration-rise) ease-(--ease-out-strong) group-hover/cell:scale-[1.035]"
          style={{ background: project.tone }}
        >
          <img
            src={pexels(project.photo, imageSize, Math.round(imageSize * 1.02))}
            alt={`${project.title} for ${project.client}`}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="absolute inset-0 size-full object-cover"
          />
        </span>
      </span>
      <span className="flex items-end justify-between gap-2">
        <span className="flex min-w-0 flex-wrap items-center gap-1 overflow-hidden">
          <span className="type-label mr-1 text-[clamp(8px,0.58vw,10px)] text-ink-3">{project.discipline}</span>
          {project.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="type-label rounded-full bg-panel-2 px-[0.7em] py-[0.35em] text-[clamp(8px,0.58vw,10px)] text-ink-2 max-sm:hidden">
              {tag}
            </span>
          ))}
        </span>
        <span className="type-label text-[clamp(8px,0.58vw,10px)] text-ink-3 tabular-nums">{project.year}</span>
      </span>
    </Link>
  )
}
