import { useEffect, useRef, useState } from "react"
import { Search } from "lucide-react"

import { CityMap } from "@/components/map/city-map"
import type { MapTheme } from "@/components/map/map-base"
import type { PinStyle } from "@/components/map/map-pin"
import { CATEGORIES, type Category, type Place } from "@/content/places"
import { pexels, thumb } from "@/lib/photos"
import { cn } from "@/lib/utils"

/**
 * The panel a published map carries: a cover, a heading, a line of intro
 * and the places, grouped by kind. A row and its pin are the same thing —
 * pick one and the other answers.
 */
export function GuidePanel({
  heading,
  intro,
  cover,
  places,
  selectedId,
  onSelect,
  search = true,
  compact = false,
  className,
}: {
  heading: string
  intro: string
  cover: number
  places: Place[]
  selectedId: string | null
  onSelect: (id: string | null) => void
  search?: boolean
  compact?: boolean
  className?: string
}) {
  const [query, setQuery] = useState("")
  const list = useRef<HTMLDivElement>(null)
  const shown = query ? places.filter((p) => `${p.name} ${p.blurb}`.toLowerCase().includes(query.toLowerCase())) : places
  const groups = Object.entries(
    shown.reduce<Record<string, Place[]>>((acc, p) => {
      ;(acc[p.category] ??= []).push(p)
      return acc
    }, {}),
  ) as [Category, Place[]][]

  // Keep the picked row in view when the pick came from the map.
  useEffect(() => {
    if (!selectedId) return
    list.current?.querySelector(`[data-row="${selectedId}"]`)?.scrollIntoView({ block: "nearest", behavior: "smooth" })
  }, [selectedId])

  return (
    <div
      data-map-ui
      onPointerDown={(e) => e.stopPropagation()}
      className={cn("flex min-h-0 flex-col overflow-hidden rounded-[10px] bg-raised shadow-(--shadow-float)", className)}
    >
      {search ? (
        <label className="m-2 mb-0 flex h-8 shrink-0 items-center gap-2 rounded-[7px] bg-panel px-2.5 text-[12px] text-ink-3">
          <Search className="size-3.5 shrink-0" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search this map"
            className="w-full min-w-0 bg-transparent text-[12px] text-ink outline-none placeholder:text-ink-soft"
          />
        </label>
      ) : null}
      <div ref={list} data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain">
        <div className="p-2">
          <img
            src={pexels(cover, 480, compact ? 180 : 240)}
            alt=""
            className={cn("w-full rounded-[7px] object-cover", compact ? "h-[72px]" : "h-[108px]")}
            draggable={false}
          />
          <p className="mt-2.5 px-1 text-[14px] leading-tight font-semibold tracking-[-0.012em] text-ink">{heading}</p>
          {!compact ? <p className="mt-1 px-1 text-[11.5px] leading-snug text-ink-3">{intro}</p> : null}
        </div>
        {groups.map(([category, items]) => (
          <div key={category} className="px-2 pb-2">
            <p className="px-1 pt-1 pb-1.5 text-[10.5px] font-semibold tracking-[0.04em] text-ink-soft uppercase">{CATEGORIES[category].label}</p>
            <ul className="flex flex-col gap-1">
              {items.map((place) => {
                const on = place.id === selectedId
                return (
                  <li key={place.id}>
                    <button
                      type="button"
                      data-row={place.id}
                      onClick={() => onSelect(on ? null : place.id)}
                      className={cn(
                        "flex w-full items-center gap-2 rounded-[7px] p-1.5 text-left transition-[background-color,box-shadow] duration-(--duration-hover) ease-(--ease-out-strong)",
                        on ? "bg-accent-soft shadow-[inset_0_0_0_1px_var(--color-accent)]" : "bg-panel/70 hover:bg-panel-deep",
                      )}
                    >
                      <img src={thumb(place.photo)} alt="" className="size-7 shrink-0 rounded-[5px] object-cover" draggable={false} loading="lazy" />
                      <span className="min-w-0">
                        <span className={cn("block truncate text-[12px] leading-tight font-medium", on ? "text-accent-ink" : "text-ink")}>{place.name}</span>
                        <span className="block truncate text-[10.5px] leading-tight text-ink-3">{place.detail ?? place.blurb}</span>
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
        {shown.length === 0 ? <p className="px-3 pb-4 text-[12px] text-ink-3">Nothing called “{query}” on this map.</p> : null}
      </div>
    </div>
  )
}

/**
 * A published map: the city, its pins and the guide panel floating over
 * the left edge. What a reader of an embedded Cairn map sees.
 */
export function MapGuide({
  heading,
  intro,
  cover,
  places,
  theme = "paper",
  pinStyle = "photo",
  zoom = 1.2,
  centerX = 600,
  centerY = 400,
  panel = true,
  compact = false,
  interactive = true,
  controls = true,
  className,
}: {
  heading: string
  intro: string
  cover: number
  places: Place[]
  theme?: MapTheme
  pinStyle?: PinStyle
  zoom?: number
  centerX?: number
  centerY?: number
  panel?: boolean
  compact?: boolean
  interactive?: boolean
  controls?: boolean
  className?: string
}) {
  const [selected, setSelected] = useState<string | null>(null)
  return (
    <CityMap
      places={places}
      theme={theme}
      pinStyle={pinStyle}
      zoom={zoom}
      centerX={centerX}
      centerY={centerY}
      interactive={interactive}
      controls={controls}
      selectedId={selected}
      onSelect={setSelected}
      className={className}
    >
      {panel ? (
        <GuidePanel
          heading={heading}
          intro={intro}
          cover={cover}
          places={places}
          selectedId={selected}
          onSelect={setSelected}
          compact={compact}
          search={!compact}
          className={cn("absolute top-2.5 bottom-2.5 left-2.5 z-20", compact ? "w-[44%] max-w-[180px]" : "w-[40%] max-w-[232px]")}
        />
      ) : null}
    </CityMap>
  )
}
