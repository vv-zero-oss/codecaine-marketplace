import { HeroCarousel } from "@/components/motion/hero-carousel"
import { Reveal } from "@/components/motion/reveal"
import { BookObject } from "@/components/mock/book-object"
import { SectionTitle } from "@/components/sections/section-title"
import { DISPATCHES, type Dispatch } from "@/content/stories"
import { Link } from "@/lib/router"
import { photo, photoSet, PHOTOS } from "@/lib/photos"
import { cn } from "@/lib/utils"

const RATIO: Record<Dispatch["ratio"], string> = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[3/2]",
  square: "aspect-square",
}

/** One dispatch: the grotesk title and its rule, the number and the serif summary, then the picture. */
export function DispatchCard({ dispatch, index }: { dispatch: Dispatch; index: number }) {
  return (
    <article className="group/dispatch">
      <SectionTitle title={dispatch.title} href={dispatch.href} />
      <div className="mt-4 grid grid-cols-[3.4rem_1fr] gap-2 md:grid-cols-[4.5rem_1fr]">
        <span className="font-serif text-[13px] text-ink-3 tabular-nums">{String(index + 1).padStart(2, "0")}</span>
        <p className="max-w-[46ch] font-serif text-[15px] leading-[1.5] text-ink">{dispatch.summary}</p>
      </div>
      <Link href={dispatch.href} className={cn("relative mt-6 block overflow-hidden bg-sheet", RATIO[dispatch.ratio])} aria-label={dispatch.title}>
        {dispatch.kind === "volume" ? (
          <>
            <img src={photo(PHOTOS.timber, 1000)} alt="" className="absolute inset-0 size-full object-cover" />
            <div className="absolute inset-0 bg-[rgb(120_50_10/0.18)] mix-blend-multiply" />
            <div className="absolute inset-x-[25%] top-[17%]">
              <BookObject angle={0} thickness={6} />
            </div>
          </>
        ) : (
          <img
            src={photo(dispatch.photo!, 1000)}
            srcSet={photoSet(dispatch.photo!, [480, 800, 1200])}
            sizes="(min-width: 768px) 36vw, 92vw"
            alt=""
            loading="lazy"
            className="absolute inset-0 size-full object-cover photo-grade transition-transform duration-[900ms] ease-(--ease-out-strong) group-hover/dispatch:scale-[1.03]"
          />
        )}
      </Link>
    </article>
  )
}

/**
 * The home page's opening: the reference's split. On the left, a statement
 * and the dispatches, scrolling; on the right, the people in this volume,
 * pinned for the whole run of the column.
 */
export function SplitHero({
  statement = "People who make things by hand, and the rooms they make them in.",
}: {
  statement?: string
}) {
  return (
    <section className="relative grid md:grid-cols-2">
      <div className="md:order-2">
        <HeroCarousel className="aspect-[4/5] w-full md:sticky md:top-0 md:aspect-auto md:h-svh" />
      </div>
      <div className="px-gutter pt-12 pb-section md:order-1 md:pt-[34svh]">
        <Reveal>
          <h1 className="type-display max-w-[13ch] text-h1 text-ink">{statement}</h1>
        </Reveal>
        <div className="mt-20 flex flex-col gap-24 md:mt-[22svh] md:max-w-[min(100%,560px)] md:gap-32">
          {DISPATCHES.map((d, i) => (
            <Reveal key={d.title}>
              <DispatchCard dispatch={d} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
