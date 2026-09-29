import { motion, useScroll, useTransform, type MotionValue } from "motion/react"
import { useRef, useState, type ReactNode } from "react"

import { SiteFooter } from "@/components/site-footer"
import { SiteHeader } from "@/components/site-header"
import { Input } from "@/components/ui/input"
import { about, people, pexels, sessions, writers } from "@/content"
import { ease, prefersReducedMotion, useSmoothScroll } from "@/lib/motion"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Where the photographs sit around the text, and how fast each drifts against
 * the scroll: a positive speed rises faster than the page, a negative one
 * lags. The spread of speeds is what makes the column of text feel like it is
 * moving through a room of pictures rather than past a wallpaper.
 */
const FLOATS = [
  { photo: sessions[0], className: "left-[8%] top-[2%] w-[13vw] aspect-[4/3]", speed: 0.35 },
  { photo: sessions[1], className: "right-gutter top-[6%] w-[27vw] aspect-[4/3]", speed: 0.15 },
  { photo: sessions[2], className: "left-gutter top-[38%] w-[11vw] aspect-[3/4]", speed: 0.5 },
  { photo: sessions[3], className: "right-[14%] top-[48%] w-[15vw] aspect-[4/5]", speed: -0.1 },
  { photo: sessions[4], className: "left-[16%] top-[70%] w-[18vw] aspect-[4/3]", speed: 0.25 },
  { photo: { photo: people[3].archive[0].photo }, className: "right-[4%] top-[82%] w-[12vw] aspect-[3/4]", speed: 0.45 },
]

export function AboutPage({ pathname }: { pathname: string }) {
  useSmoothScroll()
  const room = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: room, offset: ["start end", "end start"] })

  return (
    <div className="min-h-dvh bg-paper text-ink" data-canvas-ignore>
      <SiteHeader pathname={pathname} />
      <main data-canvas-ignore>
        <section ref={room} aria-labelledby="about-title" className="relative overflow-hidden pt-32 pb-24 md:pt-[34vh] md:pb-[30vh]">
          {FLOATS.map((item, index) => (
            <Float key={index} progress={scrollYProgress} speed={item.speed} className={item.className}>
              <img
                src={pexels(item.photo.photo, 700)}
                alt=""
                loading={index < 2 ? "eager" : "lazy"}
                className="size-full rounded-card object-cover"
              />
            </Float>
          ))}

          <div className="relative mx-auto max-w-[23rem] px-gutter md:px-0">
            <h1 id="about-title" className="mb-8 text-headline font-light tracking-headline text-ink">
              {about.title}
            </h1>
            <div className="flex flex-col gap-6 text-ink-soft">
              {about.body.map((paragraph, index) => (
                <motion.p
                  key={index}
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "0px 0px -60px 0px" }}
                  transition={{ duration: 0.7, ease: ease.outQuart }}
                >
                  {paragraph}
                </motion.p>
              ))}
            </div>
            <p className="mt-12 text-ink">“{about.quote}”</p>
          </div>

          {/* Phones: the pictures as a row under the text instead of around it. */}
          <div className="no-scrollbar mt-16 flex gap-3 overflow-x-auto px-gutter md:hidden">
            {sessions.map((s) => (
              <img
                key={s.photo}
                src={pexels(s.photo, 500)}
                alt=""
                loading="lazy"
                className="aspect-[4/3] w-[70vw] shrink-0 rounded-card object-cover"
              />
            ))}
          </div>
        </section>

        <WritersIndex />
      </main>
      <SiteFooter />
    </div>
  )
}

function Float({
  progress,
  speed,
  className,
  children,
}: {
  progress: MotionValue<number>
  speed: number
  className?: string
  children: ReactNode
}) {
  const reduced = prefersReducedMotion()
  const drift = reduced ? 0 : speed * 60
  const y = useTransform(progress, [0, 1], [`${drift}vh`, `${-drift}vh`])
  return (
    <motion.div aria-hidden style={{ y }} className={cn("absolute hidden overflow-hidden rounded-card bg-paper-soft md:block", className)}>
      {children}
    </motion.div>
  )
}

/**
 * The writers of the issue, with everyone each of them profiled. A row goes
 * solid under the pointer, as a line does when it is selected in a terminal;
 * SEARCH narrows the list to a name.
 */
function WritersIndex() {
  const [query, setQuery] = useState("")
  const q = query.trim().toLowerCase()
  const rows = writers.filter(
    (w) => !q || w.name.toLowerCase().includes(q) || w.people.some((p) => p.name.toLowerCase().includes(q)),
  )

  return (
    <section aria-labelledby="writers" className="px-gutter pt-10">
      <div className="flex items-end justify-between gap-6 border-b border-rule pb-3">
        <h2 id="writers" className="text-label font-mono uppercase tracking-label">
          Written by
        </h2>
        <label className="flex items-center gap-3">
          <span className="text-label font-mono uppercase tracking-label">Search</span>
          <Input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            aria-label="Search writers and the athletes they profiled"
            className="w-[min(12rem,40vw)]"
          />
        </label>
      </div>

      <ul className="mt-4">
        {rows.map((writer) => (
          <li
            key={writer.name}
            className="group -mx-gutter grid grid-cols-1 gap-x-6 px-gutter py-2 transition-colors duration-(--duration-fast) hover:bg-ink hover:text-paper md:grid-cols-[minmax(0,1fr)_minmax(0,2.4fr)_auto] md:py-[0.3rem]"
          >
            <span>{writer.name}</span>
            <span className="text-ink-muted group-hover:text-paper/70">
              {writer.people.map((p, index) => (
                <span key={p.slug}>
                  {index > 0 && ", "}
                  <Link href={`/story/${p.slug}`} className="underline-offset-4 hover:underline">
                    {p.name}
                  </Link>
                </span>
              ))}
            </span>
            <Link
              href={`/story/${writer.people[0]?.slug ?? ""}`}
              className="hidden font-mono uppercase tracking-label md:block"
              aria-label={`Open the first profile ${writer.name} wrote`}
            >
              [Read]
            </Link>
          </li>
        ))}
        {rows.length === 0 && <li className="py-6 text-ink-muted">No one by that name.</li>}
      </ul>
    </section>
  )
}
