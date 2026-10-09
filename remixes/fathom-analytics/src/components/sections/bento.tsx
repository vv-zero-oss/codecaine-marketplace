import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionTitle } from "@/components/ui/section-title"
import { BENTO } from "@/content"
import { cn } from "@/lib/utils"

/** Isometric line illustrations, one stroke weight, in `currentColor`. */
function Art({ kind }: { kind: "bricks" | "gears" | "rocket" }) {
  const common = { fill: "none", stroke: "currentColor", strokeWidth: 1.2, strokeLinejoin: "round", strokeLinecap: "round", vectorEffect: "non-scaling-stroke" } as const
  return (
    <svg viewBox="0 0 160 120" className="h-full w-full" aria-hidden>
      {kind === "bricks" && (
        <g {...common}>
          <path d="M20 78l30-16 36 18-30 16z M20 78v10l36 18v-10 M56 106l30-16V80" />
          <path d="M60 60l22-12 22 11-22 12z M60 60v8l22 11v-8 M82 79l22-12v-8" />
          <path d="M100 40l12-6 12 6v12l-12 6-12-6z M112 34v12 M100 40l12 6 12-6" />
        </g>
      )}
      {kind === "gears" && (
        <g {...common}>
          <circle cx="64" cy="70" r="20" /><circle cx="64" cy="70" r="7" />
          <path d="M64 44v-8 M64 96v8 M38 70h-8 M90 70h8 M46 52l-6-6 M82 88l6 6 M46 88l-6 6 M82 52l6-6" />
          <circle cx="112" cy="46" r="13" /><circle cx="112" cy="46" r="4" />
          <path d="M112 29v-5 M112 63v5 M95 46h-5 M129 46h5" />
        </g>
      )}
      {kind === "rocket" && (
        <g {...common}>
          <path d="M44 88c14-36 36-62 76-70-8 40-34 62-70 76z" />
          <circle cx="94" cy="44" r="6" />
          <path d="M44 88l-14 4 10-14 M50 94l-4 14 14-10 M34 74l-10-2" />
        </g>
      )}
    </svg>
  )
}

export function Bento({ title = "A new kind of", accent = "analytics platform" }: { title?: string; accent?: string }) {
  return (
    <section id="bento" className="bg-paper pt-20 pb-24 sm:pt-28 sm:pb-32" data-canvas-ignore>
      <Container>
        <Reveal>
          <SectionTitle className="mx-auto max-w-[22rem] text-center sm:max-w-[28rem]">
            {title} <em>{accent}</em>
          </SectionTitle>
        </Reveal>
        <div className="mt-12 grid gap-3 sm:mt-16 md:grid-cols-[1.35fr_1fr_1fr]">
          {BENTO.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.08} className="h-full">
              <article className={cn("group relative flex h-full min-h-[21rem] flex-col justify-between overflow-hidden rounded-card p-4 transition-transform duration-(--duration-base) ease-out-soft hover:-translate-y-0.5 md:min-h-[27rem]", c.tone === "peach" ? "bg-peach text-ember" : "bg-surface text-ink")}>
                <h3 className="text-[13px] font-medium">{c.title}</h3>
                <div className={cn("mx-auto h-44 w-full max-w-[16rem] transition-transform duration-(--duration-slow) ease-out-soft group-hover:scale-[1.04] md:h-56", c.tone === "peach" ? "text-ember/70" : "text-ink-2/70")}>
                  <Art kind={c.art} />
                </div>
                {c.body && <p className="max-w-[17rem] text-[13px] leading-snug">{c.body}</p>}
              </article>
            </Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
