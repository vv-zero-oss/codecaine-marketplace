import { motion, useReducedMotion } from "motion/react"
import { X } from "lucide-react"

import { CATEGORIES, type Place } from "@/content/places"
import { thumb } from "@/lib/photos"
import { cn } from "@/lib/utils"

export type PinStyle = "photo" | "dot"

/**
 * One place on the map. A photo pin is a small print with a white mat (the
 * way a person pins a picture to a wall map); a dot pin is the category's
 * colour with its icon. Pins fall in on a soft spring, lift on hover, and
 * show their name when picked.
 */
export function MapPin({
  place,
  pinStyle = "photo",
  selected = false,
  dropIn = true,
  index = 0,
  focusable = true,
  onSelect,
}: {
  place: Place
  pinStyle?: PinStyle
  selected?: boolean
  dropIn?: boolean
  index?: number
  /** off on a still map, so a card holding one isn't a dozen tab stops */
  focusable?: boolean
  onSelect?: () => void
}) {
  const reduced = useReducedMotion()
  const category = CATEGORIES[place.category]
  const Icon = category.icon
  const fall = dropIn && !reduced

  return (
    <motion.button
      type="button"
      data-selected={selected}
      aria-pressed={selected}
      aria-label={`${place.name}, ${category.label}`}
      tabIndex={focusable ? undefined : -1}
      onClick={(e) => {
        e.stopPropagation()
        onSelect?.()
      }}
      initial={fall ? { opacity: 0, y: -18, scale: 0.6 } : false}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.6, y: -8, transition: { duration: 0.16 } }}
      transition={{ type: "spring", stiffness: 420, damping: 24, delay: fall ? Math.min(index, 12) * 0.045 : 0 }}
      className="group absolute -translate-x-1/2 -translate-y-full cursor-pointer outline-none"
    >
      <span
        className={cn(
          "relative block transition-transform duration-(--duration-hover) ease-(--ease-out-strong) group-hover:-translate-y-0.5 group-active:scale-95",
          selected && "-translate-y-1 scale-[1.12] group-hover:-translate-y-1",
        )}
      >
        {selected ? (
          <span aria-hidden className="absolute inset-0 animate-ping-soft rounded-[10px]" style={{ background: category.color }} />
        ) : null}
        {pinStyle === "photo" ? (
          <span className="relative block size-[34px] overflow-hidden rounded-[9px] bg-raised p-[2px] shadow-(--shadow-pin) group-focus-visible:ring-2 group-focus-visible:ring-accent">
            <img src={thumb(place.photo)} alt="" draggable={false} className="size-full rounded-[7px] object-cover" loading="lazy" />
            <span
              aria-hidden
              className="absolute -right-0.5 -bottom-0.5 grid size-3.5 place-items-center rounded-full ring-2 ring-white"
              style={{ background: category.color }}
            />
          </span>
        ) : (
          <span
            className="relative grid size-[26px] place-items-center rounded-full text-white shadow-(--shadow-pin) ring-2 ring-white group-focus-visible:ring-accent"
            style={{ background: category.color }}
          >
            <Icon className="size-3.5" strokeWidth={2.2} />
          </span>
        )}
        {/* the point the pin stands on */}
        <span aria-hidden className="absolute -bottom-[5px] left-1/2 size-2 -translate-x-1/2 rotate-45 rounded-[1px] bg-raised" />
      </span>
      <span
        className={cn(
          "pointer-events-none absolute top-full left-1/2 mt-2 -translate-x-1/2 rounded-full bg-raised/95 px-2 py-0.5 text-[11px] font-medium whitespace-nowrap text-ink shadow-(--shadow-xs) transition-[opacity,transform] duration-(--duration-hover) ease-(--ease-out-strong)",
          selected ? "translate-y-0 opacity-100" : "-translate-y-1 opacity-0 group-hover:translate-y-0 group-hover:opacity-100",
        )}
      >
        {place.name}
      </span>
    </motion.button>
  )
}

/** The card over a picked pin: the photo, what it is, and when. */
export function PlaceCard({ place, onClose }: { place: Place; onClose?: () => void }) {
  const reduced = useReducedMotion()
  const category = CATEGORIES[place.category]
  return (
    <motion.div
      initial={reduced ? { opacity: 0 } : { opacity: 0, y: 8, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={reduced ? { opacity: 0 } : { opacity: 0, y: 4, scale: 0.97, transition: { duration: 0.14 } }}
      transition={{ type: "spring", stiffness: 380, damping: 30 }}
      style={{ transformOrigin: "50% 100%" }}
      className="absolute bottom-[54px] left-1/2 w-[230px] -translate-x-1/2 overflow-hidden rounded-[12px] bg-raised text-left shadow-(--shadow-float)"
      onClick={(e) => e.stopPropagation()}
    >
      <div className="relative h-[96px]">
        <img src={thumb(place.photo).replace("w=160&h=160", "w=460&h=200")} alt={place.name} className="size-full object-cover" draggable={false} />
        {onClose ? (
          <button
            type="button"
            aria-label="Close"
            onClick={onClose}
            className="absolute top-2 right-2 grid size-7 place-items-center rounded-full bg-black/35 text-white backdrop-blur-sm transition-[background-color,transform] duration-(--duration-hover) hover:bg-black/55 active:scale-95"
          >
            <X className="size-3.5" />
          </button>
        ) : null}
      </div>
      <div className="p-3">
        <p className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: category.color }}>
          <category.icon className="size-3" strokeWidth={2.2} /> {category.label}
          {place.detail ? <span className="text-ink-3">· {place.detail}</span> : null}
        </p>
        <p className="mt-1 text-[14px] leading-tight font-semibold tracking-[-0.01em] text-ink">{place.name}</p>
        <p className="mt-1 text-[12.58px] leading-snug text-ink-3">{place.blurb}</p>
      </div>
    </motion.div>
  )
}
