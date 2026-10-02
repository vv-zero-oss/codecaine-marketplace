import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"

type Voice = { quote: string; name: string; role: string; photo?: string; initials: string; tone: string }

const VOICES: Voice[] = [
  { quote: "It feels like the first tool that works for me instead of asking me to work for it.", name: "Maya Okonkwo", role: "Founder, Kiln & Co.", photo: "/images/avatar-3.jpg", initials: "MO", tone: "bg-apricot/25 text-apricot" },
  { quote: "The morning briefing alone pays for it. I open one page and know my day.", name: "Daniel Ferreira", role: "Partner, Northbeam", photo: "/images/avatar-2.jpg", initials: "DF", tone: "bg-sky-100 text-sky-600" },
  { quote: "We stopped losing threads between sales and support. Everyone sees the same history.", name: "Ana Pereira", role: "Head of Support, Quillstone", initials: "AP", tone: "bg-teal/20 text-teal" },
  { quote: "Setup took an afternoon. By Friday the team had quit two other apps.", name: "Sam Whitaker", role: "COO, Harbor & Pine", initials: "SW", tone: "bg-lilac/20 text-lilac" },
  { quote: "It asks before it acts, and it tells me what it did. That is exactly the trust I needed.", name: "Chloe Lindqvist", role: "Operations Lead, Tallow", photo: "/images/avatar-4.jpg", initials: "CL", tone: "bg-coral/15 text-coral" },
  { quote: "I haven't written a status update by hand in two months.", name: "Rafael Moreno", role: "Product Manager, Orchard Row", initials: "RM", tone: "bg-ink-100 text-ink-700" },
]

/** A wall of short voices, laid in CSS columns so uneven quotes pack without
 *  gaps. The big testimonial above sets the tone; these supply the volume. */
export function Testimonials() {
  return (
    <section id="voices" className="bg-page py-12 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading title="Loved by people who do the work" description="A few words from the teams who made the switch." />
        </Reveal>
        <ul className="mt-9 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {VOICES.map((v, i) => (
            <li key={v.name} className="mb-4 break-inside-avoid">
              <Reveal delay={(i % 3) * 0.06}>
                <figure className="flex flex-col gap-5 rounded-[var(--radius-card)] bg-surface p-5 shadow-card">
                  <blockquote className="text-[15px] leading-relaxed text-ink-900">“{v.quote}”</blockquote>
                  <figcaption className="flex items-center gap-3">
                    {v.photo ? (
                      <img src={v.photo} alt="" className="size-9 rounded-full object-cover" />
                    ) : (
                      <span aria-hidden="true" className={`grid size-9 place-items-center rounded-full text-[12px] font-semibold ${v.tone}`}>{v.initials}</span>
                    )}
                    <span className="text-[13px] leading-tight"><span className="block font-semibold">{v.name}</span><span className="text-ink-500">{v.role}</span></span>
                  </figcaption>
                </figure>
              </Reveal>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
