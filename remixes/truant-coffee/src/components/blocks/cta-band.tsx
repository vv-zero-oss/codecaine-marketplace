import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { photo, type PHOTO } from "@/lib/photos"

/**
 * The closing ask on the inner pages: a photograph to the edges, a big
 * line, and one button. The photo drifts in scale as it enters.
 */
export function CtaBand({
  title = "Never run dry",
  body = "Every one, two or four weeks, up to 15% off. Skip, pause or cancel from the rail whenever you like.",
  cta = "Build a subscription",
  href = "/subscribe",
  image = "kayaks",
  alt = "Kayakers on a golden lake at sunset",
}: {
  title?: string
  body?: string
  cta?: string
  href?: string
  image?: keyof typeof PHOTO
  alt?: string
}) {
  return (
    <section className="relative isolate overflow-hidden bg-ink px-[var(--spacing-gutter)] py-[var(--spacing-section)] text-paper">
      <img src={photo(image, 2000)} alt={alt} loading="lazy" className="absolute inset-0 -z-10 h-full w-full object-cover opacity-70" />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/70 to-ink/10" />
      <Reveal className="max-w-[min(100%,820px)]">
        <h2 className="type-display text-d5">{title}</h2>
        <p className="mt-5 max-w-[40ch] text-lead text-paper/90">{body}</p>
        <ButtonLink href={href} variant="paper" size="lg" className="mt-8">
          {cta}
        </ButtonLink>
      </Reveal>
    </section>
  )
}
