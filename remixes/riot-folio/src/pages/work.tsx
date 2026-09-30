import { PageIntro } from "@/components/sections/page-intro"
import { ProjectTable } from "@/components/sections/project-table"
import { WorkCard } from "@/components/sections/work-grid"
import { Container } from "@/components/ui/container"
import { PROJECTS } from "@/content"

/** The case studies up top, then every project in one long, filterable list. */
export function WorkPage() {
  return (
    <>
      <Container size="wide" className="pt-16 sm:pt-24">
        <PageIntro
          title="Work"
          lede="Eighteen years of it. Six stories told properly, and the rest in the list below — filter it by anything."
        />
      </Container>
      <Container size="wide" className="mt-12">
        <ul className="grid grid-cols-2 gap-[var(--spacing-tile-gap)] md:grid-cols-3 xl:grid-cols-6">
          {PROJECTS.map((project) => (
            <li key={project.slug}>
              <WorkCard project={project} />
            </li>
          ))}
        </ul>
      </Container>
      <ProjectTable />
    </>
  )
}
