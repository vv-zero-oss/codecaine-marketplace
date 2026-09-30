import { GrowFrame } from "@/components/motion/grow-frame"
import { SectionHeading } from "@/components/ui/section-heading"
import { home } from "@/content"

/** The studio photograph that opens from a card to the whole screen. */
export function CraftFrame() {
  const { craft } = home
  return (
    <section id="craft">
      <GrowFrame image={craft.image} alt={craft.alt} focus="50% 18%" heading={<SectionHeading eyebrow={craft.eyebrow} title={craft.title} size="lg" titleClassName="max-w-[9em]" />} />
    </section>
  )
}
