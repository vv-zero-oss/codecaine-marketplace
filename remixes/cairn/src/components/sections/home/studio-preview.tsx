import { Reveal } from "@/components/motion/reveal"
import { MapStudio } from "@/components/sections/studio/map-studio"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { pexels, SKIES } from "@/lib/photos"

/**
 * The tool itself, the whole of it, on the home page: a cream header that
 * names it and a blue sky with the working studio set into it. Everything
 * in the window works — this is the same component as /studio.
 */
export function StudioPreview() {
  return (
    <section className="py-16 md:py-24">
      <Container className="max-w-[1000px]">
        <Reveal className="overflow-hidden rounded-(--radius-panel)">
          <div className="flex flex-col gap-4 bg-cream px-5 py-6 sm:flex-row sm:items-end sm:justify-between sm:px-7 sm:py-7">
            <div>
              <h2 className="type-serif text-h3 text-ink">The Cairn studio</h2>
              <p className="mt-2 max-w-[48ch] text-[15.5px] text-ink-3">
                Add places, choose a style and arrange your guide — without touching code. Go on, it's live: ask it for something.
              </p>
            </div>
            <ButtonLink href="/studio" variant="outline" size="sm" className="shrink-0">
              Open full screen
            </ButtonLink>
          </div>
          <div className="relative isolate overflow-hidden bg-harbour-water p-3 sm:p-8 md:p-10">
            <img src={pexels(SKIES.lavender, 1400, 900)} alt="" aria-hidden className="absolute inset-0 -z-10 size-full object-cover opacity-55 mix-blend-screen" loading="lazy" />
            <MapStudio compact className="h-[640px] sm:h-[560px]" />
          </div>
        </Reveal>
      </Container>
    </section>
  )
}
