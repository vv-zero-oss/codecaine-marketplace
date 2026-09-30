import { SealVerse } from "@/components/motion/seal-verse"
import { home } from "@/content"

/** The house's verse, with the seal turning between its two columns. */
export function HouseVerse() {
  return (
    <section id="verse">
      <SealVerse lines={home.verse.lines} by={home.verse.by} />
    </section>
  )
}
