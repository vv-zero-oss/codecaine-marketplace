import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

export function CallToAction() {
  return (
    <section id="cta" className="pb-24">
      <Container>
        <div className="rounded-3xl bg-gradient-to-br from-indigo-600 via-violet-600 to-indigo-700 px-8 py-16 text-center">
          <h2 className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            Ready to see it on your own stack?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-indigo-100">
            Connect a repository and have a preview environment in under five minutes.
          </p>
          <ButtonLink
            href="#start"
            size="lg"
            className="mt-8 bg-white text-indigo-700 hover:bg-indigo-50"
          >
            Start free trial
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
