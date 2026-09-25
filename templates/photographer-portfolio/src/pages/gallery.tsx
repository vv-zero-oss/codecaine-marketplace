import { ArrowLeft, ArrowRight } from "lucide-react"

import { CallToBook } from "@/components/call-to-book"
import { Photo } from "@/components/photo"
import { ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Eyebrow } from "@/components/ui/section-heading"
import { galleries } from "@/content"
import { NotFoundPage } from "@/pages/not-found"

export function GalleryPage({ slug }: { slug: string }) {
  const index = galleries.findIndex((gallery) => gallery.slug === slug)
  if (index === -1) return <NotFoundPage />
  const gallery = galleries[index]
  const next = galleries[(index + 1) % galleries.length]
  return (
    <>
      <Container className="pt-16">
        <ButtonLink href="/portfolio" variant="link" size="sm" className="px-0">
          <ArrowLeft /> Portfolio
        </ButtonLink>
        <div className="mt-10 grid gap-8 md:grid-cols-12 md:items-end">
          <div className="md:col-span-8">
            <Eyebrow>
              {gallery.category} · {gallery.location} · {gallery.year}
            </Eyebrow>
            <h1 className="mt-5 font-display text-6xl leading-none md:text-7xl">{gallery.title}</h1>
          </div>
          <p className="leading-relaxed text-ink-600 md:col-span-4">{gallery.summary}</p>
        </div>
      </Container>
      <Container className="mt-16 grid gap-6 md:grid-cols-2">
        {gallery.photos.map((item) => (
          <figure key={item.src} className={item.wide ? "md:col-span-2" : undefined}>
            <Photo src={item.src} alt={item.caption} ratio={item.wide ? "landscape" : "portrait"} />
            <figcaption className="mt-3 text-xs text-ink-400">{item.caption}</figcaption>
          </figure>
        ))}
      </Container>
      <Container className="mt-24 flex justify-end">
        <ButtonLink href={`/portfolio/${next.slug}`} variant="outline">
          Next: {next.title} <ArrowRight />
        </ButtonLink>
      </Container>
      <CallToBook />
    </>
  )
}
