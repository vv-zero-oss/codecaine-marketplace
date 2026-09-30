import { DriftGallery } from "@/components/motion/drift-gallery"
import { ButtonLink } from "@/components/ui/button-link"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { home } from "@/content"

/** The mood wall: twenty small pictures drifting past a pinned button. */
export function ArchiveWall() {
  const { archive } = home
  return (
    <section id="archive" className="pt-section pb-[8vh]">
      <Container>
        <SectionHeading eyebrow={archive.eyebrow} title={archive.title} titleClassName="max-w-[8.6em]" />
        <DriftGallery images={archive.images} columns={5} className="mt-20 hidden md:block">
          <ButtonLink href="/journal" label={archive.cta} />
        </DriftGallery>
        <DriftGallery images={archive.images.slice(0, 12)} columns={3} drift={60} className="mt-14 md:hidden">
          <ButtonLink href="/journal" label={archive.cta} />
        </DriftGallery>
      </Container>
    </section>
  )
}
