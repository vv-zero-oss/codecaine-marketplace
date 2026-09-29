import { Hearts } from "@/components/blocks/doodle"
import { ParallaxColumns } from "@/components/motion/parallax-columns"
import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { LOVE } from "@/content"
import { avatar } from "@/lib/photos"

/** A customer's note on the wall: who they are, then what they said. */
export function LoveCard({
  name = "",
  role = "",
  company = "",
  photo = 16160809,
  text = "",
}: {
  name?: string
  role?: string
  company?: string
  photo?: number
  text?: string
}) {
  return (
    <article className="flex flex-col gap-4 rounded-[var(--radius-card)] bg-night-card p-5 shadow-(--shadow-night)">
      <header className="flex items-center gap-2.5">
        <img src={avatar(photo)} alt={name} className="size-8 rounded-[5px] object-cover" loading="lazy" />
        <span className="flex flex-col text-[12.5px] leading-tight">
          <span className="text-night-fg">{name}</span>
          <span className="text-night-subtle">
            {role} at <span className="text-night-muted">{company}</span>
          </span>
        </span>
      </header>
      <p className="text-[clamp(15px,1.4vw,17px)] leading-[1.45] tracking-[-0.01em] text-night-fg">{text}</p>
    </article>
  )
}

/** The wall of love: three columns of notes sliding past each other in the dark. */
export function LoveWall() {
  return (
    <section id="wall-of-love" data-nav-tone="night" className="bg-night pt-section text-night-fg">
      <Container className="max-w-[1000px]">
        <Reveal className="text-center">
          <h2 className="type-display text-[clamp(34px,4.4vw,52px)]">
            {LOVE.titleStart}
            <br /> {LOVE.titleEnd} <Hearts className="-translate-y-4" />
          </h2>
        </Reveal>
        <div className="mt-14 max-h-[1100px] overflow-hidden [mask-image:linear-gradient(180deg,transparent,#000_8%,#000_80%,transparent)] md:max-h-[900px]">
          <ParallaxColumns items={LOVE.items.map((item) => <LoveCard key={item.name} {...item} />)} />
        </div>
      </Container>
    </section>
  )
}
