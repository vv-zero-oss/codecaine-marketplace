import { ScrollMarquee } from "@/components/motion/scroll-marquee"

/**
 * The break between the archive and the studio: the four edits in oversize
 * type, one line solid and one outlined, sliding against each other with the
 * scroll.
 */
export function EditBand() {
  return (
    <section aria-label="Relight, re-sky, re-season, regrade" className="overflow-hidden border-y border-hairline py-[clamp(1.5rem,4vw,4rem)]">
      <ScrollMarquee text="Relight — Re-sky —" direction="left" distance={28} />
      <ScrollMarquee text="Re-season — Regrade —" direction="right" outline distance={28} className="-mt-[0.06em]" />
    </section>
  )
}
