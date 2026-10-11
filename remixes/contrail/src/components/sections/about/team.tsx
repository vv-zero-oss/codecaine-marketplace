import { Plane } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { avatar, PEOPLE } from "@/lib/photos"

const TEAM = [
  { name: "Ingrid Solheim", role: "Co-founder, former first officer", route: "OSL–LIS", photo: PEOPLE[0] },
  { name: "Tomás Abreu", role: "Co-founder, dispatch & data", route: "LIS–GRU", photo: PEOPLE[1] },
  { name: "Mireille Okafor", role: "Design lead", route: "YUL–CDG", photo: PEOPLE[2] },
  { name: "Kenji Arakawa", role: "Head of engineering", route: "KIX–SFO", photo: PEOPLE[4] },
  { name: "Priya Nandakumar", role: "Prediction models", route: "SIN–HND", photo: PEOPLE[3] },
  { name: "Callum Reyes", role: "Airport data", route: "DUB–JFK", photo: PEOPLE[6] },
  { name: "Elodie Marchand", role: "Support, 24/7 team lead", route: "YUL–LIS", photo: PEOPLE[7] },
  { name: "Samuel Achterberg", role: "Watch & Mac apps", route: "AMS–OSL", photo: PEOPLE[8] },
]

/** The people, and the route each of them flies most — it slides in under
 *  the name on hover or focus. */
export function Team() {
  return (
    <section data-theme="day" className="bg-page py-section">
      <Container>
        <Reveal>
          <h2 className="type-display max-w-[16ch] text-h1 text-balance">Pilots, dispatchers and people who fly too much.</h2>
          <p className="mt-6 max-w-[54ch] text-lead text-ink-2">A small team on purpose. Everyone here answers support tickets in their first month, and everyone has missed a connection.</p>
        </Reveal>
        <ul className="mt-12 grid grid-cols-2 gap-x-5 gap-y-10 md:grid-cols-4">
          {TEAM.map((p, i) => (
            <Reveal key={p.name} as="li" delay={(i % 4) * 0.05}>
              <div tabIndex={0} className="group rounded-(--radius-card) outline-none focus-visible:ring-2 focus-visible:ring-violet">
                <div className="aspect-[4/5] overflow-hidden rounded-(--radius-card) bg-panel">
                  <img src={avatar(p.photo, 480)} alt={p.name} className="size-full object-cover grayscale-[35%] transition-[filter,transform] duration-500 ease-(--ease-out-strong) group-hover:scale-[1.03] group-hover:grayscale-0 group-focus-visible:grayscale-0" />
                </div>
                <p className="mt-4 font-semibold">{p.name}</p>
                <div className="relative h-6 overflow-hidden text-[14.5px]">
                  <p className="text-ink-3 transition-[transform,opacity] duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-translate-y-full group-hover:opacity-0 group-focus-visible:-translate-y-full group-focus-visible:opacity-0">{p.role}</p>
                  <p className="absolute inset-0 flex translate-y-full items-center gap-1.5 text-violet opacity-0 transition-[transform,opacity] duration-(--duration-swap) ease-(--ease-out-strong) group-hover:translate-y-0 group-hover:opacity-100 group-focus-visible:translate-y-0 group-focus-visible:opacity-100">
                    <Plane className="size-3.5" /> Flies {p.route} most
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </ul>
      </Container>
    </section>
  )
}
