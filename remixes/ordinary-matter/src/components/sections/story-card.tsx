import type { Story } from "@/content/stories"
import { photo, photoSet } from "@/lib/photos"
import { useReader } from "@/lib/reader"
import { cn } from "@/lib/utils"

/**
 * A person: the photograph, "Name, Role" in the serif, the place in small
 * caps. Opens the reader. The photograph eases up 3% under the pointer —
 * slow (900ms), so it reads as light shifting rather than a hover effect.
 */
export function StoryCard({
  story,
  ratio = "portrait",
  sizes = "(min-width: 768px) 25vw, 50vw",
  className,
}: {
  story: Story
  ratio?: "portrait" | "wide" | "tall"
  sizes?: string
  className?: string
}) {
  const { openStory } = useReader()
  return (
    <button type="button" onClick={() => openStory(story.slug)} className={cn("group/story block w-full text-left", className)}>
      <span
        className={cn(
          "relative block overflow-hidden bg-sheet",
          ratio === "portrait" && "aspect-[4/5]",
          ratio === "tall" && "aspect-[3/4]",
          ratio === "wide" && "aspect-[3/2] md:aspect-[33/20]",
        )}
      >
        <img
          src={photo(story.photo, 900)}
          srcSet={photoSet(story.photo, [480, 800, 1200])}
          sizes={sizes}
          alt=""
          loading="lazy"
          className="absolute inset-0 size-full object-cover photo-grade transition-transform duration-[900ms] ease-(--ease-out-strong) group-hover/story:scale-[1.03]"
        />
      </span>
      <span className="mt-4 block font-serif text-[16px] leading-snug text-ink md:text-[17px]">
        <span className="link-draw">
          {story.name}, {story.role}
        </span>
      </span>
      <span className="type-label mt-2 block text-ink-3">{story.place}</span>
    </button>
  )
}
