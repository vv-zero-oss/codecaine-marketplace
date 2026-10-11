import { useState } from "react"

import { MapGuide } from "@/components/map/map-guide"
import { placesById } from "@/content/places"
import type { MapTemplate } from "@/content/templates"
import { cn } from "@/lib/utils"

/**
 * A template as a card: its real map, small, with its guide panel —
 * and on hover the map drifts a little closer, as if leaning in.
 */
export function TemplateCard({
  template,
  onOpen,
  aspect = "portrait",
  className,
}: {
  template: MapTemplate
  onOpen?: () => void
  aspect?: "portrait" | "landscape"
  className?: string
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      className={cn("group relative flex w-full flex-col text-left", className)}
    >
      {/* one button over the whole card: the map inside holds buttons of its own */}
      <button
        type="button"
        onClick={onOpen}
        onFocus={() => setHover(true)}
        onBlur={() => setHover(false)}
        aria-label={`Open the ${template.title.toLowerCase()} template`}
        className="peer absolute inset-0 z-10 cursor-pointer rounded-[10px] outline-none"
      />
      <span
        className={cn(
          "relative block w-full overflow-hidden rounded-[10px] shadow-(--shadow-hairline) transition-[transform,box-shadow] duration-(--duration-swap) ease-(--ease-out-strong) group-hover:-translate-y-1 group-hover:shadow-(--shadow-card) peer-focus-visible:ring-[3px] peer-focus-visible:ring-accent/40 group-active:scale-[0.985]",
          aspect === "portrait" ? "aspect-[264/330]" : "aspect-[4/3]",
        )}
      >
        <MapGuide
          heading={template.heading}
          intro={template.intro}
          cover={template.cover}
          places={placesById(template.placeIds)}
          theme={template.theme}
          zoom={template.view.zoom + (hover ? 0.12 : 0)}
          centerX={template.view.x - 90}
          centerY={template.view.y}
          compact
          interactive={false}
          controls={false}
          className="pointer-events-none absolute inset-0"
        />
      </span>
      <span className="mt-3.5 text-[17px] font-medium tracking-[-0.015em] text-ink">{template.title}</span>
      <span className="mt-0.5 text-[15px] text-ink-3">{template.summary}</span>
    </div>
  )
}
