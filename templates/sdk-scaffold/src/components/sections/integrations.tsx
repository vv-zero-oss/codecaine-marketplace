import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ArrowIcon } from "@/components/ui/icon"
import { INTEGRATIONS } from "@/content"

export function IntegrationTile({ children }: { children: string }) {
  return (
    <div className="rounded-xl border border-quartz-200 bg-white px-4 py-5 text-center text-xs font-medium text-quartz-600">
      {children}
    </div>
  )
}

/** A grid inside a grid, and flex inside both. */
export function Integrations() {
  return (
    <section id="integrations" className="bg-quartz-50/60 py-24">
      <Container>
        <div className="grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              It already talks to what you use
            </h2>
            <p className="mt-4 text-quartz-600">
              Connect a repository and the rest follows. No webhook plumbing, no bespoke glue.
            </p>
            {/* A link with both text and an element child — which is how an
                element ends up losing its own words on the way across. */}
            <ButtonLink href="#integrations" variant="link" size="sm" className="mt-6 px-0">
              Browse all integrations
              <ArrowIcon />
            </ButtonLink>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-4">
            {INTEGRATIONS.map((name) => (
              <IntegrationTile key={name}>{name}</IntegrationTile>
            ))}
          </div>
        </div>
      </Container>
    </section>
  )
}
