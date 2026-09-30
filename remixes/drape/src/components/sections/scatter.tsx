import { Parallax } from "@/components/motion/parallax"
import { Marquee } from "@/components/motion/marquee"
import { ButtonLink } from "@/components/ui/button"
import { SCATTER, STRIP, pexels } from "@/content"
import { cn } from "@/lib/utils"

/**
 * Scatter — "Made for real wardrobes": the line in the middle and the things
 * people actually own drifting round it at different depths, then a strip of
 * them running past underneath.
 */
export function Scatter({
  title = "Made for",
  script = "real wardrobes",
  lede = "From a first job to a wedding, a winter trip to a Tuesday — Drape is built for the clothes people wear, not the ones on a catwalk.",
}: {
  title?: string
  script?: string
  lede?: string
}) {
  return (
    <section id="wardrobes" className="overflow-hidden bg-espresso pb-24 sm:pb-32">
      <div className="relative mx-auto flex min-h-[80svh] max-w-[1400px] items-center justify-center px-4 py-24">
        {SCATTER.map((item) => (
          <Parallax key={item.id} distance={120 * item.depth} className={cn("absolute", item.className)}>
            <img
              src={pexels(item.id, 400, 480)}
              alt=""
              loading="lazy"
              className="aspect-[5/6] w-full rounded-sm object-cover"
            />
          </Parallax>
        ))}
        <div className="relative z-10 max-w-md text-center">
          <h2 className="font-display text-[clamp(2.25rem,5vw,3.75rem)] leading-[1.02] font-medium tracking-[-0.04em] text-cream">
            {title}
            <br />
            <span className="font-script font-normal tracking-normal">{script}</span>
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-cream-2">{lede}</p>
          <div className="mt-6 flex justify-center gap-2">
            <ButtonLink href="#stories">Read the stories</ButtonLink>
            <ButtonLink href="#faq" variant="outline-dark">
              Get started
            </ButtonLink>
          </div>
        </div>
      </div>

      <Marquee speed={28} gap={12} fade={false}>
        {STRIP.map((id) => (
          <img
            key={id}
            src={pexels(id, 520, 380)}
            alt=""
            loading="lazy"
            className="h-[clamp(9rem,18vw,15rem)] w-auto rounded-sm object-cover"
          />
        ))}
      </Marquee>
    </section>
  )
}
