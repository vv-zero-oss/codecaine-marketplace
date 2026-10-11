import { Marquee } from "@/components/motion/marquee"
import { SectionLabel } from "@/components/blocks/section-label"
import { ClientMark } from "@/components/work/client-mark"
import { PROJECTS } from "@/data/projects"

/** Who we've made things for: their marks drifting past, two rows going opposite ways. */
export function Clients({ speed = 50 }: { speed?: number }) {
  const clients = Array.from(new Map(PROJECTS.map((p) => [p.client, p.mark])).entries())
  const half = Math.ceil(clients.length / 2)
  const rows = [clients.slice(0, half), clients.slice(half)]
  return (
    <section aria-label="Partners" className="overflow-hidden border-y border-line py-14">
      <SectionLabel index="05" className="px-(--spacing-gutter)">
        Partners, so far
      </SectionLabel>
      <div className="mt-10 flex flex-col gap-6 [mask-image:linear-gradient(90deg,transparent,#000_12%,#000_88%,transparent)]">
        {rows.map((row, r) => (
          <Marquee key={r} speed={speed + r * 8} direction={r ? "right" : "left"}>
            {[...row, ...row].map(([client, mark], i) => (
              <span key={`${client}-${i}`} className="flex items-center px-[clamp(24px,3.4vw,56px)]">
                <ClientMark client={client} mark={mark} className="text-[clamp(28px,3.6vw,52px)] text-ink-4 transition-colors duration-(--duration-hover) hover:text-ink" />
              </span>
            ))}
          </Marquee>
        ))}
      </div>
    </section>
  )
}
