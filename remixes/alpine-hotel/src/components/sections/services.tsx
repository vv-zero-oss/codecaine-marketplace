import { Snowflake, CarFront, Mountain, Waves, UtensilsCrossed, Baby, type LucideIcon } from "lucide-react"
import { Container } from "@/components/ui/container"
import { Reveal } from "@/components/motion/reveal"
import { ParallaxCard } from "@/components/motion/parallax-card"
import { services, servicePhotos } from "@/content"

const ICONS: Record<string, LucideIcon> = {
  ski: Snowflake,
  car: CarFront,
  mountain: Mountain,
  spa: Waves,
  fondue: UtensilsCrossed,
  kids: Baby,
}

/** Everything the house does for you, beside a small pinboard of it happening. */
export function Services({
  title = "Taken care of, from the station up",
  lede = "Included with every stay, or a word to the front desk away.",
}: {
  title?: string
  lede?: string
}) {
  return (
    <section id="services" className="bg-ice py-(--spacing-section)">
      <Container className="grid gap-14 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div>
          <Reveal>
            <p className="text-[13px] font-medium text-rust">Services</p>
            <h2 className="font-headline mt-4 max-w-[15ch] text-title text-balance">{title}</h2>
            <p className="mt-4 max-w-[40ch] text-lg text-ink-soft">{lede}</p>
          </Reveal>
          <ul className="mt-12 grid gap-x-8 sm:grid-cols-2">
            {services.map((s, i) => (
              <Reveal key={s.title} delay={(i % 2) * 0.06}>
                <ServiceItem icon={s.icon} title={s.title} body={s.body} />
              </Reveal>
            ))}
          </ul>
        </div>
        <div className="relative grid grid-cols-2 gap-4 self-center">
          {servicePhotos.map((p, i) => (
            <ParallaxCard
              key={p.label}
              speed={[50, 110, 80][i]}
              tilt={[-3, 2.5, -1.5][i]}
              className={i === 0 ? "col-span-2 mx-auto w-4/5" : ""}
            >
              <figure className="rounded-card bg-snow p-2 shadow-(--shadow-card)">
                <img src={p.src} alt={p.alt} loading="lazy" className="aspect-[4/3] w-full rounded-[0.625rem] object-cover" />
                <figcaption className="px-1 pt-2 pb-0.5 text-[13px] text-ink-soft">{p.label}</figcaption>
              </figure>
            </ParallaxCard>
          ))}
        </div>
      </Container>
    </section>
  )
}

export function ServiceItem({ icon, title, body }: { icon: string; title: string; body: string }) {
  const Icon = ICONS[icon] ?? Snowflake
  return (
    <li className="flex gap-4 border-t border-hairline py-5">
      <span className="flex size-10 shrink-0 items-center justify-center rounded-pill bg-snow text-rust shadow-(--shadow-pill)">
        <Icon className="size-[18px]" />
      </span>
      <div>
        <p className="font-medium">{title}</p>
        <p className="mt-1 text-sm leading-relaxed text-ink-soft">{body}</p>
      </div>
    </li>
  )
}
