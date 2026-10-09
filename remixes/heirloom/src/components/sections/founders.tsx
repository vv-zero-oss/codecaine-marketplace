import { Reveal } from "@/components/motion/reveal"
import { SectionIntro } from "@/components/sections/section-intro"
import { Container } from "@/components/ui/container"
import { Tag } from "@/components/ui/tag"
import { COLLAGE } from "@/content"

export function CallTile({ image, alt, tag, name, role }: { image: string; alt: string; tag: string; name: string; role: string }) {
  return (
    <figure className="relative isolate h-full aspect-[3/4] overflow-hidden rounded-tile bg-surface-raised shadow-card">
      <img src={image} alt={alt} loading="lazy" className="absolute inset-0 -z-10 size-full object-cover" />
      <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-ink/80 via-transparent to-transparent" />
      <Tag className="absolute top-3 left-3">{tag}</Tag>
      <figcaption className="absolute inset-x-3 bottom-3">
        <p className="text-[13px] font-medium">{name}</p>
        <p className="mt-0.5 text-[9px] tracking-[0.12em] text-fg-muted uppercase">{role}</p>
      </figcaption>
    </figure>
  )
}

export function QuoteTile({ tag, quote, author }: { tag: string; quote: string; author: string }) {
  return (
    <figure className="flex h-full flex-col justify-between gap-6 rounded-tile bg-surface-raised p-4 shadow-card">
      <div>
        <Tag>{tag}</Tag>
        <blockquote className="mt-4 text-[13px] leading-snug font-medium">“{quote}”</blockquote>
      </div>
      <figcaption className="text-[9px] tracking-[0.12em] text-fg-subtle uppercase">{author}</figcaption>
    </figure>
  )
}

export function Founders() {
  return (
    <section id="founders" className="bg-ink py-20 sm:py-[18vh]">
      <Container>
        <SectionIntro
          before="We stand behind founders"
          accent="beyond"
          after="the cheque."
          body="We back the world's best founders with storytelling, a network that opens doors, and the kind of counsel only operators can give."
          cta="Learn more"
          href="#join"
        />
        <div className="mx-auto mt-14 grid max-w-xl grid-cols-2 gap-3 sm:mt-20">
          {[[0, 2], [1, 3]].map((column, c) => (
            <div key={c} className={c === 1 ? "flex flex-col gap-3 pt-10" : "flex flex-col gap-3"}>
              {column.map((i) => {
                const tile = COLLAGE[i]
                return (
                  <Reveal key={i} delay={c * 0.12 + (i > 1 ? 0.1 : 0)} className={tile.kind === "call" ? "" : "flex-1"}>
                    {tile.kind === "call" ? <CallTile {...tile} /> : <QuoteTile {...tile} />}
                  </Reveal>
                )
              })}
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}
