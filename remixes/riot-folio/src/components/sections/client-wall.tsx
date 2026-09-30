import { AudioLines, Circle, Tent } from "lucide-react"

import { TONES, TONE_FILL } from "@/components/media/tone"
import { Container } from "@/components/ui/container"
import { CLIENTS } from "@/content"
import { cn } from "@/lib/utils"

const MARKS = { orbit: Circle, field: Tent, radio: AudioLines } as const

/**
 * A client's mark in a square. Under the cursor the square floods with one of
 * the six tones and the mark turns night — the wall answers back.
 */
export function ClientTile({ index }: { index: number }) {
  const client = CLIENTS[index]
  const Mark = "mark" in client ? MARKS[client.mark] : null
  const tone = TONES[index % TONES.length]
  return (
    <li
      className={cn(
        "group relative flex aspect-square items-center justify-center rounded-[var(--radius-tile)] bg-ground-deep text-ink transition-colors duration-300 ease-[var(--ease-out-soft)]",
        "hover:text-night",
      )}
    >
      <span
        aria-hidden
        className={cn(
          "absolute inset-0 scale-95 rounded-[inherit] opacity-0 transition-[opacity,transform] duration-300 ease-[var(--ease-out-soft)] group-hover:scale-100 group-hover:opacity-100",
          TONE_FILL[tone],
        )}
      />
      <span className={cn("relative flex items-center gap-2 text-[clamp(1rem,0.8rem+0.8vw,1.35rem)]", client.style)}>
        {Mark ? <Mark className="size-[1.1em]" strokeWidth={2.5} /> : null}
        {client.name}
      </span>
    </li>
  )
}

/** Who the work was for. */
export function ClientWall() {
  return (
    <section aria-label="Clients" className="pt-8 pb-4">
      <Container>
        <ul className="grid grid-cols-2 gap-[var(--spacing-tile-gap)] sm:grid-cols-4">
          {CLIENTS.map((client, i) => (
            <ClientTile key={client.name} index={i} />
          ))}
        </ul>
      </Container>
    </section>
  )
}
