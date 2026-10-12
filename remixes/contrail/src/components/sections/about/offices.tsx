import { Reveal } from "@/components/motion/reveal"
import { useLocalTime } from "@/components/site/site-footer"
import { Container } from "@/components/ui/container"
import { PHOTOS, pexels } from "@/lib/photos"

const OFFICES = [
  { city: "Lisbon", tz: "Europe/Lisbon", what: "Product, design and the prediction models.", photo: PHOTOS.coastTown, alt: "A coastal town seen from the air" },
  { city: "Montréal", tz: "America/Toronto", what: "Engineering and airport data for the Americas.", photo: PHOTOS.nightContrail, alt: "A jet crossing the night sky with contrails" },
  { city: "Kyoto", tz: "Asia/Tokyo", what: "Support and data for Asia-Pacific — so someone's always awake.", photo: PHOTOS.windowSunset, alt: "Sunset seen from an airplane window" },
]

function Office({ office }: { office: (typeof OFFICES)[number] }) {
  const time = useLocalTime(office.tz)
  const hour = Number(time.split(":")[0])
  const open = hour >= 8 && hour < 19
  return (
    <article className="group overflow-hidden rounded-(--radius-panel) bg-panel">
      <div className="aspect-[4/3] overflow-hidden">
        <img src={pexels(office.photo, 700)} alt={office.alt} className="size-full object-cover transition-transform duration-700 ease-(--ease-out-strong) group-hover:scale-[1.04]" />
      </div>
      <div className="p-6">
        <div className="flex items-baseline justify-between">
          <h3 className="text-h4 font-semibold">{office.city}</h3>
          <p className="font-mono text-[15px] tabular-nums">{time}</p>
        </div>
        <p className="mt-2 text-ink-2">{office.what}</p>
        <p className="mt-4 flex items-center gap-2 text-[14px] text-ink-3">
          <span className={open ? "size-2 rounded-full bg-green" : "size-2 rounded-full bg-ink-4"} /> {open ? "In the office now" : "Asleep — the others have it"}
        </p>
      </div>
    </article>
  )
}

/** Three cities, nine hours apart, each with its time right now. */
export function Offices() {
  return (
    <section data-theme="day" className="bg-page pb-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[18ch] text-h1 text-balance">Three offices, so somebody's always up.</h2>
        </Reveal>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {OFFICES.map((o, i) => (
            <Reveal key={o.city} delay={i * 0.05}><Office office={o} /></Reveal>
          ))}
        </div>
      </Container>
    </section>
  )
}
