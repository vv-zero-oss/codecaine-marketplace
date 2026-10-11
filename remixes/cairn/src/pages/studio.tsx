import { MapStudio } from "@/components/sections/studio/map-studio"
import { Container } from "@/components/ui/container"
import { useSearch } from "@/lib/router"

/**
 * /studio — the map maker, full size. A `?template=` in the address opens
 * that template; otherwise the last map made in this browser comes back.
 */
export function StudioPage() {
  const template = useSearch().get("template")
  return (
    <section className="pt-[84px] pb-10">
      <Container className="max-w-[1600px] lg:px-6">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-2 px-1">
          <h1 className="type-serif text-h3 text-ink">Studio</h1>
          <p className="text-[14px] text-ink-3">Your map saves in this browser as you go.</p>
        </div>
        <MapStudio templateId={template} persist className="h-[calc(100svh-150px)] min-h-[720px] md:min-h-[560px]" />
      </Container>
    </section>
  )
}
