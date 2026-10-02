import { Quote, Star } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { cn } from "@/lib/utils"

type Voice = { quote: string; name: string; role: string; photo?: string; initials: string; tone: string; feature?: "sky" | "ink"; tag?: string }

const VOICES: Voice[] = [
  { quote: "It feels like the first tool that works for me instead of asking me to work for it.", name: "Maya Okonkwo", role: "Founder, Kiln & Co.", photo: "/images/avatar-3.jpg", initials: "MO", tone: "", feature: "sky", tag: "11 hrs saved weekly" },
  { quote: "The morning briefing alone pays for it. I open one page and know my day.", name: "Daniel Ferreira", role: "Partner, Northbeam", photo: "/images/avatar-2.jpg", initials: "DF", tone: "" },
  { quote: "We stopped losing threads between sales and support. Everyone sees the same history.", name: "Ana Pereira", role: "Head of Support, Quillstone", initials: "AP", tone: "bg-teal/20 text-teal", tag: "3× faster replies" },
  { quote: "Setup took an afternoon. By Friday the team had quit two other apps.", name: "Sam Whitaker", role: "COO, Harbor & Pine", initials: "SW", tone: "bg-lilac/20 text-lilac", feature: "ink" },
  { quote: "It asks before it acts, and it tells me what it did. That is exactly the trust I needed.", name: "Chloe Lindqvist", role: "Operations Lead, Tallow", photo: "/images/avatar-4.jpg", initials: "CL", tone: "" },
  { quote: "I haven't written a status update by hand in two months.", name: "Rafael Moreno", role: "Product Manager, Orchard Row", initials: "RM", tone: "bg-coral/15 text-coral", tag: "−62% admin time" },
]

function Stars() {
  return <span className="flex gap-0.5" aria-label="5 out of 5">{[0, 1, 2, 3, 4].map((i) => <Star key={i} className="size-3.5 fill-apricot text-apricot" />)}</span>
}

/** A wall of short voices in CSS columns so uneven quotes pack without gaps.
 *  Two cards are tinted (sky, ink) and some carry the result they led to, so
 *  the wall has rhythm rather than six identical white boxes. */
export function Testimonials() {
  return (
    <section id="voices" className="relative overflow-hidden bg-page py-14 sm:py-24">
      <span aria-hidden="true" className="absolute -top-40 left-1/2 -z-0 h-80 w-[720px] -translate-x-1/2 rounded-full bg-sky-200/50 blur-3xl" />
      <Container className="relative">
        <Reveal className="flex flex-col items-center gap-5">
          <SectionHeading align="center" title="Loved by people who do the work" description="A few words from the teams who made the switch." />
          <div className="flex items-center gap-3 rounded-full bg-surface py-1.5 pr-4 pl-1.5 shadow-card">
            <span className="flex -space-x-2">{["/images/avatar-1.jpg", "/images/avatar-2.jpg", "/images/avatar-3.jpg", "/images/avatar-4.jpg"].map((s) => <img key={s} src={s} alt="" className="size-7 rounded-full object-cover ring-2 ring-surface" />)}</span>
            <Stars />
            <span className="text-[12px] text-ink-500"><strong className="font-semibold text-ink-900">4.9</strong> from 1,200+ reviews</span>
          </div>
        </Reveal>
        <ul className="mt-10 columns-1 gap-4 sm:columns-2 lg:columns-3">
          {VOICES.map((v, i) => {
            const sky = v.feature === "sky"
            const ink = v.feature === "ink"
            return (
              <li key={v.name} className="mb-4 break-inside-avoid">
                <Reveal delay={(i % 3) * 0.06}>
                  <figure className={cn("relative flex flex-col gap-5 overflow-hidden rounded-[var(--radius-card)] p-5 sm:p-6", sky ? "bg-gradient-to-b from-sky-500 to-sky-400 text-white shadow-lift" : ink ? "bg-ink-900 text-white shadow-lift" : "bg-surface text-ink-900 shadow-card")}>
                    <Quote aria-hidden="true" className={cn("size-6 fill-current", sky || ink ? "text-white/30" : "text-sky-200")} />
                    <blockquote className={cn("text-[16px] leading-relaxed", sky || ink ? "font-medium" : "")}>{v.quote}</blockquote>
                    {v.tag ? <span className={cn("w-fit rounded-md px-2 py-1 text-[11px] font-semibold", sky || ink ? "bg-white/15" : "bg-sky-100 text-sky-600")}>{v.tag}</span> : null}
                    <figcaption className="flex items-center gap-3">
                      {v.photo ? <img src={v.photo} alt="" className="size-9 rounded-full object-cover" /> : <span aria-hidden="true" className={cn("grid size-9 place-items-center rounded-full text-[12px] font-semibold", v.tone)}>{v.initials}</span>}
                      <span className="text-[13px] leading-tight"><span className="block font-semibold">{v.name}</span><span className={sky || ink ? "text-white/75" : "text-ink-500"}>{v.role}</span></span>
                    </figcaption>
                  </figure>
                </Reveal>
              </li>
            )
          })}
        </ul>
      </Container>
    </section>
  )
}
