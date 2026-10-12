import { useEffect, useRef } from "react"
import { ArrowLeft, ArrowRight } from "lucide-react"
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react"
import { useCanvasDesignMode } from "@canvas/react"

import { ClosingCta } from "@/components/blocks/closing-cta"
import { SectionLabel } from "@/components/blocks/section-label"
import { CountUp } from "@/components/motion/count-up"
import { Reveal } from "@/components/motion/reveal"
import { ClientMark } from "@/components/work/client-mark"
import { ButtonLink } from "@/components/ui/button"
import { nextProject, projectBySlug, PROJECTS, type Project } from "@/data/projects"
import { pexels } from "@/lib/photos"
import { Link } from "@/lib/router"
import { play } from "@/lib/sound"

/** The hero image: opens out of a narrower crop on arrival, then settles from a slight zoom as you scroll. */
function HeroImage({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { designing } = useCanvasDesignMode()
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] })
  const scale = useTransform(scrollYProgress, [0.2, 0.9], [1.12, 1])
  const still = reduced || designing
  return (
    <motion.div
      ref={ref}
      className="relative mx-(--spacing-gutter) aspect-[4/3] overflow-hidden rounded-(--radius-cell) shadow-(--shadow-float) md:aspect-[21/10]"
      style={{ background: project.tone }}
      initial={still ? false : { clipPath: "inset(8% 12% 8% 12% round 2px)" }}
      animate={{ clipPath: "inset(0% 0% 0% 0% round 2px)" }}
      transition={{ duration: 1.1, delay: 0.15, ease: [0.77, 0, 0.175, 1] }}
    >
      <motion.img
        src={pexels(project.photo, 2200, 1050)}
        alt={`${project.title} for ${project.client}`}
        className="absolute inset-0 size-full object-cover"
        style={still ? undefined : { scale }}
      />
    </motion.div>
  )
}

/** A case study, told in order: the brief → the idea → what we made → what happened → what's next. */
export function ProjectPage({ slug }: { slug: string }) {
  const project = projectBySlug(slug)
  useEffect(() => {
    document.title = project ? `${project.title} for ${project.client} — Kiln Studio` : "Not found — Kiln Studio"
    return () => {
      document.title = "Kiln Studio — technology-led creative studio"
    }
  }, [project])

  if (!project)
    return (
      <section className="flex min-h-svh flex-col items-start justify-center gap-8 px-(--spacing-gutter)">
        <SectionLabel>404</SectionLabel>
        <h1 className="type-head text-giga text-ink">
          Still in <span className="text-ink-4">the kiln.</span>
        </h1>
        <p className="text-lead text-ink-3">There's no project at this address — yet.</p>
        <ButtonLink href="/">
          <ArrowLeft /> All work
        </ButtonLink>
      </section>
    )

  const next = nextProject(project.slug)
  const index = PROJECTS.indexOf(project)

  return (
    <article>
      <header className="px-(--spacing-gutter) pt-[clamp(110px,13vw,190px)] pb-[clamp(40px,5vw,72px)]">
        <Link href="/" className="group/back type-label inline-flex items-center gap-2 text-ink-3 transition-colors duration-(--duration-hover) hover:text-ink">
          <ArrowLeft className="size-3.5 transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover/back:-translate-x-0.5" /> All work
          <span className="text-ink-5">
            · {String(index + 1).padStart(2, "0")} / {PROJECTS.length}
          </span>
        </Link>
        <Reveal>
          <ClientMark client={project.client} mark={project.mark} className="mt-10 block text-[clamp(18px,1.8vw,26px)] text-ink-2" />
          <h1 className="type-head mt-4 text-giga text-ink">{project.title}</h1>
        </Reveal>
        <div className="mt-10 grid gap-10 md:grid-cols-[1.2fr_2fr]">
          <p className="max-w-[34ch] text-lead text-ink-2">{project.summary}</p>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-4">
            {[
              ["Client", project.client],
              ["Year", String(project.year)],
              ["Discipline", project.discipline],
              ["Region", project.region],
            ].map(([k, v]) => (
              <div key={k} className="border-t border-line-2 pt-3">
                <dt className="type-label text-ink-4">{k}</dt>
                <dd className="mt-1.5 text-[16px] text-ink">{v}</dd>
              </div>
            ))}
            <div className="col-span-2 flex flex-wrap gap-1.5 sm:col-span-4">
              {project.tags.map((t) => (
                <span key={t} className="type-label rounded-full bg-panel-2 px-2.5 py-1.5 text-ink-2">
                  {t}
                </span>
              ))}
            </div>
          </dl>
        </div>
      </header>

      <HeroImage project={project} />

      <section aria-label="The brief and the idea" className="grid gap-16 px-(--spacing-gutter) py-(--spacing-section) md:grid-cols-[1fr_2fr]">
        <Reveal>
          <SectionLabel index="01">The brief</SectionLabel>
          <p className="mt-6 max-w-[36ch] text-lead text-ink-2">{project.brief}</p>
        </Reveal>
        <Reveal delay={0.08}>
          <SectionLabel index="02">The idea</SectionLabel>
          <p className="type-head mt-6 text-h2 text-ink">{project.idea}</p>
        </Reveal>
      </section>

      <section aria-label="What we made" className="px-(--spacing-gutter) pb-(--spacing-section)">
        <SectionLabel index="03">What we made</SectionLabel>
        <div className="mt-10 grid gap-4 md:grid-cols-[1fr_1fr]">
          {/* Two details of the work, cropped in close. */}
          {[
            [1100, 1400],
            [1100, 1400],
          ].map(([w, h], i) => (
            <Reveal key={i} delay={i * 0.08} className="aspect-[11/14] overflow-hidden rounded-(--radius-cell) shadow-(--shadow-card)" >
              <img
                src={`${pexels(project.photo, w, h)}&dpr=${i ? 2 : 1}`}
                alt={i ? `${project.title}, a detail` : `${project.title}, in place`}
                loading="lazy"
                className="size-full object-cover"
                style={i ? { transform: "scale(1.6)", transformOrigin: "62% 40%" } : undefined}
              />
            </Reveal>
          ))}
        </div>
        <ol className="mt-12 grid border-t border-line-2 sm:grid-cols-2">
          {project.made.map((m, i) => (
            <li key={m} className="flex items-baseline gap-4 border-b border-line-2 py-5 sm:odd:border-r sm:odd:pr-6 sm:even:pl-6">
              <span className="type-label text-ink-5 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
              <span className="text-[18px] tracking-[-0.02em] text-ink">{m}</span>
            </li>
          ))}
        </ol>
      </section>

      <section aria-label="What happened" className="px-(--spacing-gutter) pb-(--spacing-section)">
        <SectionLabel index="04">What happened</SectionLabel>
        <dl className="mt-10 grid gap-y-10 border-t border-line-2 pt-10 sm:grid-cols-2 lg:grid-cols-3">
          {project.results.map((r) => (
            <div key={r.label}>
              <dd>
                <CountUp value={r.value} prefix={r.prefix} suffix={r.suffix} className="type-head block text-mega text-ink tabular-nums" />
              </dd>
              <dt className="mt-3 text-[17px] text-ink-3">{r.label}</dt>
            </div>
          ))}
        </dl>
      </section>

      <Link
        href={`/work/${next.slug}`}
        onClick={() => play("press")}
        className="group/next relative block overflow-hidden border-y border-line px-(--spacing-gutter) py-[clamp(48px,8vw,128px)]"
      >
        <img
          src={pexels(next.photo, 1600, 700)}
          alt=""
          aria-hidden
          loading="lazy"
          className="absolute inset-0 size-full scale-105 object-cover opacity-0 transition-[opacity,transform] duration-(--duration-scene) ease-(--ease-out-strong) group-hover/next:scale-100 group-hover/next:opacity-35"
        />
        <span className="relative type-label flex items-center gap-2 text-ink-3">
          Next project <ArrowRight className="size-3.5 transition-transform duration-(--duration-hover) group-hover/next:translate-x-1" />
        </span>
        <span className="relative type-head mt-4 block text-giga text-ink-4 transition-colors duration-(--duration-rise) group-hover/next:text-ink">{next.title}</span>
        <span className="relative mt-4 block">
          <ClientMark client={next.client} mark={next.mark} className="text-[20px] text-ink-2" />
        </span>
      </Link>

      <ClosingCta title={`Want something like ${project.title}?`} continuation="Or nothing like it at all." />
    </article>
  )
}
