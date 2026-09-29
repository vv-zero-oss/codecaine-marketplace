import { Photo } from "@/components/photo"
import type { Gallery } from "@/content"
import { Link } from "@/router"

export function GalleryCard({ gallery, ratio = "portrait" }: { gallery: Gallery; ratio?: "portrait" | "tall" }) {
  return (
    <Link href={`/portfolio/${gallery.slug}`} className="group block">
      <Photo src={gallery.cover} alt={gallery.title} ratio={ratio} />
      <div className="mt-4 flex items-baseline justify-between gap-4">
        <h3 className="font-display text-2xl">{gallery.title}</h3>
        <span className="text-xs text-ink-400">{gallery.year}</span>
      </div>
      <p className="mt-1 text-xs uppercase tracking-[0.2em] text-ink-400">
        {gallery.category} · {gallery.location}
      </p>
    </Link>
  )
}
