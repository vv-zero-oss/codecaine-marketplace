import { ArrowUpRight } from "lucide-react"

import { FadeIn } from "@/components/motion/fade-in"
import { Parallax } from "@/components/motion/parallax"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { FEATURES, pexels } from "@/content"
import { cn } from "@/lib/utils"

/**
 * Features — what Drape does beyond the one try-on, as photo cards in three
 * columns that drift at different speeds as you scroll past.
 */
export function Features({
  title = "Everything a fitting room does,",
  script = "and more",
}: {
  title?: string
  script?: string
}) {
  const columns = [FEATURES.slice(0, 2), FEATURES.slice(2, 4), FEATURES.slice(4, 6)]
  return (
    <section id="features" className="bg-espresso grid-paper-dark py-24 sm:py-32">
      <Container>
        <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
          <SectionHeading title={title} script={script} className="max-w-lg" />
          <ButtonLink href="#faq" variant="outline-dark" className="self-start sm:self-auto">
            Learn more
          </ButtonLink>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {columns.map((cards, column) => (
            <Parallax
              key={column}
              distance={[20, 90, 40][column]}
              className={cn("flex flex-col gap-4", column === 1 && "lg:mt-24", column === 2 && "sm:col-span-2 sm:grid sm:grid-cols-2 lg:col-span-1 lg:flex")}
            >
              {cards.map((card, index) => (
                <FadeIn key={card.id} delay={index * 80}>
                  <FeatureCard photo={card.id} title={card.title} body={card.body} tall={"tall" in card && card.tall} />
                </FadeIn>
              ))}
            </Parallax>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function FeatureCard({
  photo,
  title,
  body,
  tall = false,
  className,
}: {
  photo: number
  title: string
  body: string
  tall?: boolean
  className?: string
}) {
  return (
    <article
      className={cn(
        "group rounded-md border border-line-dark bg-espresso-2 p-2 transition-[border-color,transform] duration-300 ease-(--ease-out) hover:-translate-y-0.5 hover:border-cream/20",
        className,
      )}
    >
      <div className={cn("overflow-hidden rounded-sm bg-espresso-3", tall ? "aspect-[4/5]" : "aspect-[4/3]")}>
        <img
          src={pexels(photo, 720, tall ? 900 : 540)}
          alt={title}
          loading="lazy"
          className="size-full object-cover transition-transform duration-700 ease-(--ease-out) group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-end justify-between gap-3 px-2 pt-3 pb-1.5">
        <div>
          <h3 className="text-[14px] font-medium text-cream">{title}</h3>
          <p className="mt-1 text-[12px] leading-relaxed text-cream-3">{body}</p>
        </div>
        <span className="flex size-7 shrink-0 items-center justify-center rounded-xs border border-line-dark text-cream-3 transition-colors duration-200 group-hover:border-clay group-hover:bg-clay group-hover:text-paper">
          <ArrowUpRight className="size-3.5" />
        </span>
      </div>
    </article>
  )
}
