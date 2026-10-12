import { Reveal } from "@/components/motion/reveal"
import { CountUp } from "@/components/motion/count-up"
import { Container } from "@/components/ui/container"
import { avatar } from "@/lib/photos"

const STATS = [
  { value: 48210, label: "maps made this year" },
  { value: 2.6, decimals: 1, suffix: "M", label: "places pinned" },
  { value: 310, suffix: "M", label: "times a map was opened" },
]

const QUOTES = [
  {
    quote: "We used to send a PDF of the trail. Now the map is on the website, the posters and the bus shelters, and when a café closes we change it once.",
    name: "Priya Raman",
    role: "Runs a coastal walking festival",
    photo: 16046265,
  },
  {
    quote: "I typed ‘every studio open on Saturday’ and had a map before my coffee went cold. Our members actually use it.",
    name: "Daniel Okafor",
    role: "Coordinator, a makers' guild",
    photo: 36712860,
  },
  {
    quote: "Open-house weekends used to be a spreadsheet and a prayer. The map does the explaining for us.",
    name: "Marta Lindqvist",
    role: "Estate agent, three branches",
    photo: 39598425,
  },
]

/**
 * Who it's already working for, with the numbers first — then three
 * people saying it in their own words.
 */
export function Voices() {
  return (
    <section id="voices" className="scroll-mt-24 py-16 md:py-24">
      <Container className="max-w-[1000px]">
        <dl className="grid gap-10 border-y border-line py-12 sm:grid-cols-3 sm:gap-6">
          {STATS.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.06}>
              <dt className="sr-only">{s.label}</dt>
              <dd className="type-serif text-display text-ink">
                <CountUp value={s.value} decimals={s.decimals} suffix={s.suffix} />
              </dd>
              <p className="mt-2 text-[15px] text-ink-3">{s.label}</p>
            </Reveal>
          ))}
        </dl>
        <ul className="mt-14 grid gap-10 md:grid-cols-3 md:gap-8">
          {QUOTES.map((q, i) => (
            <Reveal as="li" key={q.name} delay={i * 0.07} className="flex flex-col">
              <blockquote className="type-serif text-[22px] leading-[1.25] tracking-[-0.02em] text-ink">“{q.quote}”</blockquote>
              <div className="mt-6 flex items-center gap-3">
                <img src={avatar(q.photo)} alt="" className="size-10 rounded-full object-cover" loading="lazy" />
                <span>
                  <span className="block text-[14.5px] font-medium text-ink">{q.name}</span>
                  <span className="block text-[13.5px] text-ink-3">{q.role}</span>
                </span>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
