import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode } from "react"
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform, type MotionValue } from "motion/react"
import { LocateFixed, Minus, Plus } from "lucide-react"

import { MapBase, MAP_H, MAP_W, type MapTheme } from "@/components/map/map-base"
import { MapPin, PlaceCard, type PinStyle } from "@/components/map/map-pin"
import type { Place } from "@/content/places"
import { clamp, cn } from "@/lib/utils"

const SPRING = { type: "spring", stiffness: 260, damping: 34, mass: 0.9 } as const
const MIN_ZOOM = 1
const MAX_ZOOM = 3.2

/**
 * A working map of Halden Bay: drag to pan, the buttons (or a double-click)
 * to zoom, a pin to open its card. The world is drawn at 3:2 and sized to
 * cover whatever box it is given, so the same map fills a phone frame, a
 * browser window or a full studio.
 *
 * The view (`zoom`, `centerX`, `centerY`) and the look (`theme`,
 * `pinStyle`, `labels`) are scalar props, so the canvas editor can set
 * them; changing one glides the map there.
 */
export function CityMap({
  places,
  theme = "paper",
  pinStyle = "photo",
  labels = true,
  zoom = 1,
  centerX = MAP_W / 2,
  centerY = MAP_H / 2,
  interactive = true,
  controls = true,
  showCard = true,
  dropIn = true,
  selectedId = null,
  onSelect,
  onMapClick,
  className,
  children,
}: {
  places: Place[]
  theme?: MapTheme
  pinStyle?: PinStyle
  /** Neighbourhood and water names on the base map */
  labels?: boolean
  zoom?: number
  centerX?: number
  centerY?: number
  /** Drag, zoom and click; off for a still cover image */
  interactive?: boolean
  controls?: boolean
  /** Open a card over the selected pin */
  showCard?: boolean
  /** Pins fall into place when they first appear */
  dropIn?: boolean
  selectedId?: string | null
  onSelect?: (id: string | null) => void
  /** A click on bare map, in map coordinates — how the studio adds a place */
  onMapClick?: (point: { x: number; y: number }) => void
  className?: string
  children?: ReactNode
}) {
  const reduced = useReducedMotion()
  const box = useRef<HTMLDivElement>(null)
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [view, setView] = useState({ zoom, cx: centerX, cy: centerY })
  const [internalSelected, setInternalSelected] = useState<string | null>(null)
  const selected = onSelect ? selectedId : internalSelected
  const select = useCallback(
    (id: string | null) => (onSelect ? onSelect(id) : setInternalSelected(id)),
    [onSelect],
  )

  // The props are the view's source of truth whenever they change.
  useEffect(() => setView({ zoom, cx: centerX, cy: centerY }), [zoom, centerX, centerY])

  useLayoutEffect(() => {
    const el = box.current
    if (!el) return
    const measure = () => setSize({ w: el.clientWidth, h: el.clientHeight })
    measure()
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  // The world covers the box at 3:2.
  const ww = Math.max(size.w, size.h * (MAP_W / MAP_H))
  const wh = ww * (MAP_H / MAP_W)

  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const z = useMotionValue(zoom)
  const dragging = useRef(false)

  const target = useCallback(
    (v: { zoom: number; cx: number; cy: number }) => {
      const s = (ww / MAP_W) * v.zoom
      const tx = clamp(size.w / 2 - v.cx * s, size.w - ww * v.zoom, 0)
      const ty = clamp(size.h / 2 - v.cy * s, size.h - wh * v.zoom, 0)
      return { tx, ty }
    },
    [ww, wh, size.w, size.h],
  )

  useEffect(() => {
    if (!size.w) return
    const { tx, ty } = target(view)
    if (reduced || dragging.current) {
      x.set(tx)
      y.set(ty)
      z.set(view.zoom)
      return
    }
    const a = [animate(x, tx, SPRING), animate(y, ty, SPRING), animate(z, view.zoom, SPRING)]
    return () => a.forEach((c) => c.stop())
  }, [view, target, size.w, reduced, x, y, z])

  // Pan to a pin when it is picked, zooming in a little if the map is wide.
  // Read through a ref: callers often pass a fresh array each render, and
  // that must not yank the view back while somebody is panning.
  const placesRef = useRef(places)
  placesRef.current = places
  useEffect(() => {
    if (!selected) return
    const place = placesRef.current.find((p) => p.id === selected)
    if (!place) return
    setView((v) => ({ zoom: Math.max(v.zoom, 1.4), cx: place.x, cy: place.y - 40 / Math.max(v.zoom, 1.4) }))
  }, [selected])

  /** Map coordinates under a client point. */
  const toMap = (clientX: number, clientY: number) => {
    const rect = box.current!.getBoundingClientRect()
    const s = (ww / MAP_W) * z.get()
    return { x: (clientX - rect.left - x.get()) / s, y: (clientY - rect.top - y.get()) / s }
  }

  const start = useRef<{ px: number; py: number; cx: number; cy: number; moved: boolean } | null>(null)

  const onPointerDown = (e: React.PointerEvent) => {
    if (!interactive || e.button !== 0) return
    if ((e.target as HTMLElement).closest("[data-map-ui]")) return
    const s = (ww / MAP_W) * view.zoom
    const cx = (size.w / 2 - x.get()) / s
    const cy = (size.h / 2 - y.get()) / s
    start.current = { px: e.clientX, py: e.clientY, cx, cy, moved: false }
  }
  const onPointerMove = (e: React.PointerEvent) => {
    const st = start.current
    if (!st) return
    const dx = e.clientX - st.px
    const dy = e.clientY - st.py
    if (!st.moved && Math.hypot(dx, dy) < 4) return
    if (!st.moved) {
      st.moved = true
      dragging.current = true
      ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
    }
    const s = (ww / MAP_W) * view.zoom
    setView((v) => ({ ...v, cx: st.cx - dx / s, cy: st.cy - dy / s }))
  }
  const onPointerUp = (e: React.PointerEvent) => {
    const st = start.current
    start.current = null
    dragging.current = false
    if (!st || st.moved) {
      // Settle the view inside the bounds the clamp drew it at.
      if (st) {
        const s = (ww / MAP_W) * view.zoom
        setView((v) => ({ ...v, cx: (size.w / 2 - x.get()) / s, cy: (size.h / 2 - y.get()) / s }))
      }
      return
    }
    if ((e.target as HTMLElement).closest("[data-map-ui]")) return
    if (onMapClick) onMapClick(toMap(e.clientX, e.clientY))
    else select(null)
  }

  const zoomBy = (factor: number, around?: { x: number; y: number }) =>
    setView((v) => {
      const next = clamp(v.zoom * factor, MIN_ZOOM, MAX_ZOOM)
      if (!around) return { ...v, zoom: next }
      // keep the point under the cursor where it is
      const k = 1 - v.zoom / next
      return { zoom: next, cx: v.cx + (around.x - v.cx) * k, cy: v.cy + (around.y - v.cy) * k }
    })

  const selectedPlace = places.find((p) => p.id === selected) ?? null
  const inverse = useTransform(z, (v) => 1 / v)

  return (
    <div
      ref={box}
      className={cn(
        `map-${theme} relative isolate overflow-hidden bg-(--map-water) touch-pan-y select-none`,
        interactive && "cursor-grab active:cursor-grabbing",
        onMapClick && "cursor-crosshair active:cursor-grabbing",
        className,
      )}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={onPointerUp}
      onPointerCancel={() => {
        start.current = null
        dragging.current = false
      }}
      onDoubleClick={(e) => {
        if (!interactive || (e.target as HTMLElement).closest("[data-map-ui]")) return
        zoomBy(1.6, toMap(e.clientX, e.clientY))
      }}
    >
      <motion.div
        data-canvas-ignore
        className="absolute top-0 left-0 origin-top-left will-change-transform"
        style={{ width: ww || "100%", height: wh || "100%", x, y, scale: z }}
      >
        <MapBase labels={labels} />
        <div data-canvas-ignore className="absolute inset-0">
          <AnimatePresence>
            {places.map((place, i) => (
              <PinSlot key={place.id} place={place} inverse={inverse}>
                <MapPin
                  place={place}
                  pinStyle={pinStyle}
                  selected={place.id === selected}
                  dropIn={dropIn}
                  index={i}
                  focusable={interactive}
                  onSelect={() => select(place.id === selected ? null : place.id)}
                />
              </PinSlot>
            ))}
          </AnimatePresence>
          {showCard ? (
            <AnimatePresence>
              {selectedPlace ? (
                <PinSlot key={`card-${selectedPlace.id}`} place={selectedPlace} inverse={inverse} top>
                  <PlaceCard place={selectedPlace} onClose={() => select(null)} />
                </PinSlot>
              ) : null}
            </AnimatePresence>
          ) : null}
        </div>
      </motion.div>

      {children}

      {controls && interactive ? (
        <div data-map-ui className="absolute right-3 bottom-3 z-10 flex flex-col overflow-hidden rounded-[9px] bg-raised shadow-(--shadow-float)">
          <MapControl label="Zoom in" onClick={() => zoomBy(1.4)}>
            <Plus />
          </MapControl>
          <span className="mx-2 h-px bg-line" />
          <MapControl label="Zoom out" onClick={() => zoomBy(1 / 1.4)}>
            <Minus />
          </MapControl>
          <span className="mx-2 h-px bg-line" />
          <MapControl label="Recentre" onClick={() => setView({ zoom, cx: centerX, cy: centerY })}>
            <LocateFixed />
          </MapControl>
        </div>
      ) : null}
    </div>
  )
}

/** Holds a pin (or its card) at its point in the world, counter-scaled so
 *  it stays the same size on screen at any zoom. */
function PinSlot({ place, inverse, top, children }: { place: Place; inverse: MotionValue<number>; top?: boolean; children: ReactNode }) {
  return (
    <motion.div
      data-canvas-ignore
      data-map-ui
      className={cn("absolute size-0", top ? "z-30" : "z-10 has-[[data-selected=true]]:z-20")}
      initial={false}
      // a place whose coordinates change glides to its new spot
      animate={{ left: `${(place.x / MAP_W) * 100}%`, top: `${(place.y / MAP_H) * 100}%` }}
      transition={{ type: "spring", stiffness: 220, damping: 28 }}
      style={{ scale: inverse }}
    >
      {children}
    </motion.div>
  )
}

function MapControl({ label, onClick, children }: { label: string; onClick: () => void; children: ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      onClick={onClick}
      className="grid size-9 place-items-center text-ink-2 transition-[background-color,color] duration-(--duration-hover) hover:bg-panel hover:text-ink active:bg-panel-deep [&_svg]:size-4"
    >
      {children}
    </button>
  )
}
