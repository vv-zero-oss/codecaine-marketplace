import { Container } from "@/components/ui/container"
import { Chapter } from "@/components/ui/chapter"
import { Print } from "@/components/ui/print"
import { Reveal } from "@/components/motion/reveal"
import { house } from "@/content"

/** Who runs the place and what it is — and, as plainly, what it isn't. */
export function House({ title = house.title }: { title?: string }) {
  return (
    <section id="house" className="pb-(--spacing-section)">
      <Container>
        <Chapter number="01" label="The house" title={title} />
        <div className="mt-12 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Print src={house.image} alt={house.imageAlt} fig="2" caption={house.caption} ratio="4/3" />
          </Reveal>
          <div className="lg:col-span-6 lg:col-start-7">
            {house.paragraphs.map((p, i) => (
              <p
                key={i}
                className={
                  "font-serif text-xl leading-[1.55] text-ink " +
                  (i === 0 ? "first-letter:float-left first-letter:mt-1 first-letter:mr-2 first-letter:text-[4.2rem] first-letter:leading-[0.8] first-letter:text-signal" : "mt-5")
                }
              >
                {p}
              </p>
            ))}
            <dl className="mt-10 grid grid-cols-3 border-y border-ink">
              {house.facts.map((f, i) => (
                <div key={f.label} className={"py-5 " + (i > 0 ? "border-l border-rule pl-4 sm:pl-6" : "")}>
                  <dt className="label text-ink-faint">{f.label}</dt>
                  <dd className="mt-1 font-serif text-3xl tracking-[-0.02em] sm:text-4xl">{f.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Container>
    </section>
  )
}
