import { CaseBody, CaseHeader, CaseHero, PressGrid } from "@/components/sections/case-study"
import { WorkCard } from "@/components/sections/work-grid"
import { Container } from "@/components/ui/container"
import { PROJECTS } from "@/content"
import { NotFoundPage } from "@/pages/not-found"

/** One project, told properly — then the next three. */
export function CaseStudyPage({ slug }: { slug: string }) {
  const index = PROJECTS.findIndex((p) => p.slug === slug)
  if (index < 0) return <NotFoundPage />
  const project = PROJECTS[index]
  const more = [1, 2, 3].map((n) => PROJECTS[(index + n) % PROJECTS.length])
  return (
    <article>
      <CaseHeader project={project} />
      <CaseHero project={project} />
      <CaseBody project={project} />
      <PressGrid project={project} />
      <Container className="mt-24">
        <h2 className="text-xl font-semibold tracking-[-0.02em] text-ink">More case studies</h2>
        <p className="mt-2 text-[17px] text-ink-muted">What came before and after it.</p>
        <ul className="mt-8 grid grid-cols-1 gap-[var(--spacing-tile-gap)] min-[480px]:grid-cols-3">
          {more.map((p) => (
            <li key={p.slug}>
              <WorkCard project={p} />
            </li>
          ))}
        </ul>
      </Container>
    </article>
  )
}
