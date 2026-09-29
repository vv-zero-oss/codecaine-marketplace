import { motion } from "motion/react"
import { useEffect, useState } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { people, pexels, type Person } from "@/content"
import { filters, matches, useFilters } from "@/lib/filters"
import { ease, useSmoothScroll } from "@/lib/motion"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The same eighty-four people as a list, set at night: portrait, name, where
 * they were born, and a way into the story. Hovering a row dims the rest, so
 * the eye stays on one face at a time. The filters open with it, since a list
 * is what people reach for when they are looking for someone.
 */
export function ListPage({ pathname }: { pathname: string }) {
  useSmoothScroll()
  const state = useFilters()
  const [hovered, setHovered] = useState<string | null>(null)
  const shown = people.filter((person) => matches(person, state))

  useEffect(() => {
    filters.setOpen(true)
    document.documentElement.dataset.tone = "night"
    return () => {
      delete document.documentElement.dataset.tone
    }
  }, [])

  return (
    <div className="min-h-dvh bg-night text-night-ink" data-canvas-ignore>
      <SiteHeader pathname={pathname} tools />
      <main data-canvas-ignore className="px-gutter pt-52 pb-24 md:pt-[17.5rem]">
        <ul aria-label="Stories" className="flex flex-col gap-6 md:gap-9" onMouseLeave={() => setHovered(null)}>
          {shown.map((person, index) => (
            <ListRow
              key={person.slug}
              person={person}
              index={index}
              dimmed={hovered !== null && hovered !== person.slug}
              active={hovered === person.slug}
              onHover={() => setHovered(person.slug)}
            />
          ))}
        </ul>
        {shown.length === 0 && (
          <p className="py-24 text-night-muted">
            No one matches that yet.{" "}
            <button type="button" className="cursor-pointer underline underline-offset-4" onClick={() => filters.clear()}>
              Clear the filters
            </button>
          </p>
        )}
      </main>
      <SiteFooter tone="night" />
    </div>
  )
}

function ListRow({
  person,
  index,
  dimmed,
  active,
  onHover,
}: {
  person: Person
  index: number
  dimmed: boolean
  active: boolean
  onHover: () => void
}) {
  return (
    <motion.li
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -40px 0px" }}
      transition={{ duration: 0.5, ease: ease.outQuart, delay: Math.min(index, 8) * 0.04 }}
      onMouseEnter={onHover}
      onFocus={onHover}
      className={cn("transition-opacity duration-(--duration-base)", dimmed && "opacity-35")}
    >
      <Link
        href={`/story/${person.slug}`}
        className="group grid grid-cols-[4.5rem_1fr] items-center gap-4 outline-none sm:grid-cols-[7.2rem_1fr_auto] md:gap-[1.1rem]"
      >
        <img
          src={pexels(person.photo, 240, 240)}
          alt={`Portrait of ${person.name}`}
          width={115}
          height={115}
          loading={index < 8 ? "eager" : "lazy"}
          className="aspect-square w-full bg-night-soft object-cover"
        />
        <span className="min-w-0">
          <span className="block truncate">{person.name}</span>
          <span className="block truncate text-night-muted">{person.born}</span>
          <span className="mt-1 block text-caption uppercase tracking-label text-night-muted sm:hidden">
            {person.trade}
          </span>
        </span>
        <span className="hidden items-center gap-[0.6em] uppercase tracking-label sm:inline-flex">
          <span aria-hidden>[</span>
          <span
            className={cn(
              "px-[0.15em] transition-colors duration-(--duration-fast)",
              active && "bg-night-ink text-night",
              "group-focus-visible:bg-night-ink group-focus-visible:text-night",
            )}
          >
            Learn more
          </span>
          <span aria-hidden>]</span>
        </span>
      </Link>
    </motion.li>
  )
}
