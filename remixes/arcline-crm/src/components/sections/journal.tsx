import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { JOURNAL } from "@/content"
import { photo, PHOTOS, type PhotoKey } from "@/photos"

/** A photograph that leans in a little under the pointer. */
function Cover({ image, className }: { image: PhotoKey; className?: string }) {
  return (
    <div className={`overflow-hidden ${className ?? ""}`}>
      <img
        src={photo(image, 1200)}
        alt={PHOTOS[image].alt}
        loading="lazy"
        className="size-full object-cover transition-transform duration-700 ease-out-quint group-hover/post:scale-[1.03]"
      />
    </div>
  )
}

/** The latest writing, in the same hairline grid as the rest of the page. */
export function Journal() {
  return (
    <section id="blog" className="pb-[var(--spacing-section)]">
      <Container>
        <Reveal>
          <h2 className="type-heading text-[clamp(26px,1.9vw,34px)] text-fg">{JOURNAL.title}</h2>
        </Reveal>
        <Reveal className="mt-6 grid border border-line-strong md:grid-cols-2 lg:grid-cols-[50%_25%_25%]">
          <a href="#blog" className="group/post flex flex-col border-b border-line-strong p-2.5 md:row-span-2 md:border-r md:border-b-0">
            <Cover image="signal" className="aspect-[16/10] border border-line" />
            <div className="px-5 pt-8 pb-6">
              <h3 className="type-heading text-[24px] text-fg md:text-[30px]">{JOURNAL.lead.title}</h3>
              <p className="type-eyebrow mt-4 text-muted">{JOURNAL.lead.by}</p>
            </div>
          </a>
          <p className="border-b border-line-strong p-6 text-[15px] leading-[1.55] text-muted lg:border-r">{JOURNAL.note}</p>
          <a href="#blog" className="group/post flex min-h-[200px] items-start border-b border-line-strong bg-forest p-6 transition-colors hover:bg-[color-mix(in_oklab,var(--color-forest)_85%,var(--color-fg))]">
            <span className="type-heading text-[26px] text-fg md:text-[30px]">{JOURNAL.highlight}</span>
          </a>
          <a href="#blog" className="group/post flex flex-col justify-between gap-6 p-6 lg:border-r lg:border-line-strong">
            <h3 className="type-heading text-[20px] text-fg md:text-[24px]">{JOURNAL.second.title}</h3>
            <p className="type-eyebrow text-muted">{JOURNAL.second.by}</p>
          </a>
          <a href="#blog" className="group/post block border-t border-line-strong p-2.5 md:border-t-0">
            <Cover image="stripes" className="aspect-[16/10] w-full lg:aspect-auto lg:h-full" />
          </a>
        </Reveal>
      </Container>
    </section>
  )
}
