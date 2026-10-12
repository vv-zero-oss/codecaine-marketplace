import { Photo } from "@/components/blocks/photo"
import { Reveal } from "@/components/motion/reveal"
import { ScrubText } from "@/components/motion/scrub-text"
import { JourneyPhone } from "@/components/sections/home/journey-phone"

/**
 * After "imagine": how. A wide golden-hour photograph with the app laid on
 * it in glass — a working one — a smaller cabin photograph beside it, and
 * the line that says what the app does.
 */
export function DoorToDoor({
  line = "Seamless, door to door — the whole trip planned in a few taps on your phone.",
  aside = "The app books the car to the pad, the seat in the air and the car from the other side — and moves all three if your meeting runs long.",
}: {
  line?: string
  aside?: string
}) {
  return (
    <section data-header-tone="dark" className="bg-page px-(--spacing-gutter) pb-(--spacing-section)">
      <div className="grid gap-4 lg:grid-cols-12">
        <Reveal className="relative lg:col-span-9">
          <Photo name="city-sunset" className="aspect-[4/5] shadow-(--shadow-photo) sm:aspect-[16/10]" />
          <div className="absolute inset-0 flex items-center justify-center py-8">
            <JourneyPhone />
          </div>
          <p className="absolute bottom-4 left-4 rounded-full bg-dusk/40 px-3 py-1 text-micro text-dusk-fg backdrop-blur-md">Try it — hold the button</p>
        </Reveal>
        <Reveal delay={0.12} className="flex flex-col gap-4 lg:col-span-3">
          <Photo name="cabin-calm" className="aspect-[4/3] shadow-(--shadow-card)" position="50% 40%" />
          <p className="max-w-[30ch] text-micro text-ink-2">{aside}</p>
        </Reveal>
      </div>
      <div className="mt-10 flex flex-col gap-3 lg:ml-[25%] lg:w-1/2">
        <p className="text-micro text-ink-3">Coming spring 2027</p>
        <ScrubText text={line} className="type-head text-h3 leading-[1.12] tracking-[-0.03em]" />
      </div>
    </section>
  )
}
