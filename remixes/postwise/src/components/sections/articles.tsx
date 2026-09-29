import { Reveal } from "@/components/motion/reveal"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { ARTICLES } from "@/content"
import { pexels } from "@/lib/photos"

/** One article: a photograph that eases in on hover, a tag, and the headline. */
export function ArticleCard({ title = "", tag = "", photo = 5208348, href = "#blog" }: { title?: string; tag?: string; photo?: number; href?: string }) {
  return (
    <a href={href} className="group flex flex-col gap-3">
      <span className="relative block aspect-[16/9] overflow-hidden rounded-[var(--radius-card)] bg-paper-deep">
        <img
          src={pexels(photo, 640, 360)}
          alt=""
          loading="lazy"
          className="size-full object-cover transition-transform duration-500 ease-(--ease-out-quint) group-hover:scale-[1.04]"
        />
        <span className="absolute top-2.5 left-2.5 rounded-[5px] bg-card/90 px-2 py-0.5 text-[11px] font-medium text-ink backdrop-blur">
          {tag}
        </span>
      </span>
      <span className="text-[14px] leading-[1.35] text-ink-soft transition-colors duration-(--duration-hover) group-hover:text-ink">{title}</span>
    </a>
  )
}

/** The latest from the blog, four across. */
export function Articles() {
  return (
    <section id="blog" className="pb-section">
      <Container className="max-w-[1000px]">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-[clamp(18px,1.8vw,20px)] tracking-[-0.01em] text-ink-soft">{ARTICLES.title}</h2>
          <ButtonLink href="#blog" variant="outline" size="sm">
            {ARTICLES.cta}
          </ButtonLink>
        </div>
        <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-4 lg:gap-4">
          {ARTICLES.items.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <ArticleCard {...item} />
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
