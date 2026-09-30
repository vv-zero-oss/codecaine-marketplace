import { Marquee } from "@/components/motion/marquee"
import { CLIENTS } from "@/content"

/** A slow line of client names between two hairlines. */
export function Clients() {
  return (
    <section data-tone="light" aria-label="Clients" className="border-y border-line py-6">
      <Marquee duration={50} gap={64}>
        {CLIENTS.map((name) => (
          <span key={name} className="flex items-center gap-16 text-2xl tracking-[-0.03em] whitespace-nowrap text-ink-soft md:text-3xl">
            {name}
            <span aria-hidden className="size-1.5 rounded-full bg-ink-mute" />
          </span>
        ))}
      </Marquee>
    </section>
  )
}
