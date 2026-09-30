import { WordSweep } from "@/components/motion/word-sweep"
import { home } from "@/content"

/** The grey band: the house's process, read out word by word. */
export function ProcessBand() {
  return (
    <section id="process">
      <WordSweep words={home.sweep} />
    </section>
  )
}
