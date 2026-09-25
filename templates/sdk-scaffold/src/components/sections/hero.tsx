import { Badge } from "@/components/ui/badge"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"

/**
 * `min-h-[100vh]` deliberately.
 *
 * A full-height hero is what most marketing pages open with, and it is the one
 * piece of CSS that behaves differently when a frame is as tall as its own
 * content: the section grows the page, the page grows the frame, and the frame
 * grows the section. The editor compensates for it while designing.
 */
export function HeroGlow() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-[-8rem] mx-auto h-96 max-w-3xl rounded-full bg-gradient-to-br from-indigo-200/60 via-violet-200/50 to-transparent blur-3xl"
    />
  )
}

export function Hero() {
  return (
    <section id="top" className="relative flex min-h-[100vh] items-center overflow-hidden py-24">
      {/* An absolutely positioned child of a relative parent — the kind of
          thing that ends up somewhere arbitrary if a transfer rewrites
          positions it does not own. */}
      <HeroGlow />
      <Container className="relative text-center">
        <Badge>Quartz 3.0 is out</Badge>
        <h1 className="mx-auto mt-6 max-w-3xl text-5xl font-semibold tracking-tight text-balance sm:text-6xl">
          The deploy platform that gets out of the way
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-quartz-600">
          Preview every branch, roll back in two clicks, and see what your app is actually doing —
          without assembling four tools to do it.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <ButtonLink href="#start" size="lg">
            Start free
          </ButtonLink>
          <ButtonLink href="#demo" size="lg" variant="outline">
            Book a demo
          </ButtonLink>
        </div>
        <p className="mt-4 text-xs text-quartz-400">No card required · 14-day trial on Team</p>
      </Container>
    </section>
  )
}
