import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, Reorder, useReducedMotion } from "motion/react"
import { ArrowUp, Check, Crosshair, Eye, GripVertical, Loader2, MapPinned, Palette, PencilLine, Sparkles, Trash2, Undo2 } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { CityMap } from "@/components/map/city-map"
import { THEMES, type MapTheme } from "@/components/map/map-base"
import { GuidePanel } from "@/components/map/map-guide"
import type { PinStyle } from "@/components/map/map-pin"
import { ShareDialog } from "@/components/sections/studio/share-dialog"
import { CairnMark } from "@/components/site/logo"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { AREAS, CATEGORIES, type Category, type Place } from "@/content/places"
import { placesById } from "@/content/places"
import { templateById } from "@/content/templates"
import { ask, nearestArea, SUGGESTIONS } from "@/lib/ask"
import { thumb } from "@/lib/photos"
import { cn } from "@/lib/utils"

type MapDoc = {
  title: string
  intro: string
  theme: MapTheme
  pinStyle: PinStyle
  labels: boolean
  places: Place[]
  cover: number
  view: { x: number; y: number; zoom: number }
}

const STORAGE = "cairn:studio:v1"

const BLANK: MapDoc = {
  title: "Slow mornings in the bay",
  intro: "Coffee first, then somewhere to sit with it.",
  theme: "paper",
  pinStyle: "photo",
  labels: true,
  places: placesById(["ferrol", "pilot", "second-shelf"]),
  cover: 1855214,
  view: { x: 640, y: 330, zoom: 1.35 },
}

function fromTemplate(id: string | null | undefined): MapDoc | null {
  const t = id ? templateById(id) : null
  if (!t) return null
  return { title: t.heading, intro: t.intro, theme: t.theme, pinStyle: "photo", labels: true, places: placesById(t.placeIds), cover: t.cover, view: t.view }
}

function load(persist: boolean): MapDoc | null {
  if (!persist) return null
  try {
    const raw = window.localStorage.getItem(STORAGE)
    return raw ? { ...BLANK, ...(JSON.parse(raw) as MapDoc) } : null
  } catch {
    return null
  }
}

/**
 * The Cairn studio, working. Ask for places in plain words, click the map
 * to drop your own, drag the list to reorder it, restyle the map, preview
 * it as a reader would, and share the link or the embed code. With
 * `persist`, the map is kept in this browser between visits.
 */
export function MapStudio({
  templateId,
  persist = false,
  compact = false,
  className,
}: {
  templateId?: string | null
  /** keep the map in localStorage between visits */
  persist?: boolean
  /** the home page's smaller window: no reader preview */
  compact?: boolean
  className?: string
}) {
  const reduced = useReducedMotion()
  const [doc, setDoc] = useState<MapDoc>(() => fromTemplate(templateId) ?? load(persist) ?? BLANK)
  const [tab, setTab] = useState<"places" | "style">("places")
  const [selected, setSelected] = useState<string | null>(null)
  const [adding, setAdding] = useState(false)
  const [draft, setDraft] = useState<Place | null>(null)
  const [preview, setPreview] = useState(false)
  const [share, setShare] = useState(false)
  const [saved, setSaved] = useState<"saved" | "saving">("saved")

  useCanvasAction("Studio: Style tab", (next) => setTab((next ?? tab === "places") ? "style" : "places"), { on: tab === "style", group: "Studio" })
  useCanvasAction("Studio: adding a place", (next) => setAdding(next ?? !adding), { on: adding, group: "Studio" })
  useCanvasAction("Studio: reader preview", (next) => setPreview(next ?? !preview), { on: preview, group: "Studio" })
  useCanvasAction("Studio: share dialog", (next) => setShare(next ?? !share), { on: share, group: "Studio" })
  useCanvasAction("Studio: empty map", (next) => patch({ places: next === false ? BLANK.places : [] }), { on: doc.places.length === 0, group: "Studio" })

  // A template in the address replaces whatever was open.
  useEffect(() => {
    const next = fromTemplate(templateId)
    if (next) {
      setDoc(next)
      setSelected(null)
    }
  }, [templateId])

  // Autosave, with a visible beat of "Saving…".
  const first = useRef(true)
  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    setSaved("saving")
    const t = window.setTimeout(() => {
      if (persist) {
        try {
          window.localStorage.setItem(STORAGE, JSON.stringify(doc))
        } catch {
          /* private mode: the map still works, it just won't be kept */
        }
      }
      setSaved("saved")
    }, 550)
    return () => window.clearTimeout(t)
  }, [doc, persist])

  const patch = (p: Partial<MapDoc>) => setDoc((d) => ({ ...d, ...p }))
  const remove = (id: string) => {
    patch({ places: doc.places.filter((p) => p.id !== id) })
    if (selected === id) setSelected(null)
  }

  const onMapClick = (pt: { x: number; y: number }) => {
    if (!adding) return
    const area = nearestArea(pt.x, pt.y)
    setDraft({ id: `mine-${Date.now()}`, name: "", category: "food", area, x: pt.x, y: pt.y + 6, photo: 39784928, blurb: `A favourite in ${AREAS[area].name}` })
  }

  const shownPlaces = useMemo(() => (draft ? [...doc.places, { ...draft, name: draft.name || "New place" }] : doc.places), [doc.places, draft])

  return (
    <div className={cn("flex flex-col overflow-hidden rounded-(--radius-window) bg-raised shadow-(--shadow-window)", className)}>
      {/* top bar */}
      <div className="flex h-12 shrink-0 items-center gap-2 border-b border-line px-3">
        <CairnMark className="size-6 shrink-0 text-ink" />
        <label className="group relative flex min-w-0 items-center">
          <span className="sr-only">Map title</span>
          <input
            value={doc.title}
            onChange={(e) => patch({ title: e.target.value })}
            className="h-8 w-[min(46vw,280px)] min-w-0 truncate rounded-[7px] px-2 text-[14px] font-semibold tracking-[-0.012em] text-ink outline-none transition-shadow hover:shadow-[inset_0_0_0_1px_var(--color-line-strong)] focus:shadow-[inset_0_0_0_1.5px_var(--color-accent)]"
          />
          <PencilLine className="pointer-events-none absolute right-2 size-3 text-ink-4 opacity-0 transition-opacity group-hover:opacity-100" />
        </label>
        <span aria-live="polite" className="hidden items-center gap-1 text-[12px] text-ink-soft sm:flex">
          <AnimatePresence mode="wait" initial={false}>
            {saved === "saving" ? (
              <motion.span key="saving" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                <Loader2 className="size-3 animate-spin" /> Saving
              </motion.span>
            ) : (
              <motion.span key="saved" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex items-center gap-1">
                <Check className="size-3" /> Saved
              </motion.span>
            )}
          </AnimatePresence>
        </span>
        <div className="ml-auto flex items-center gap-1.5">
          {!compact ? (
            <Button variant={preview ? "soft" : "ghost"} size="sm" onClick={() => setPreview((v) => !v)} aria-pressed={preview} className="h-8 px-2.5 text-[13px]">
              <Eye /> <span className="hidden sm:inline">{preview ? "Back to editing" : "Preview"}</span>
            </Button>
          ) : null}
          <Button size="sm" onClick={() => setShare(true)} className="h-8 px-3 text-[13px]">
            Share
          </Button>
        </div>
      </div>

      <div className="flex min-h-0 flex-1 flex-col-reverse md:flex-row">
        {/* sidebar */}
        <AnimatePresence initial={false}>
          {!preview ? (
            <motion.aside
              key="side"
              initial={reduced ? false : { opacity: 0, x: -16 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduced ? { opacity: 0 } : { opacity: 0, x: -16 }}
              transition={{ type: "spring", stiffness: 320, damping: 34 }}
              className="flex min-h-0 flex-col border-t border-line md:w-[300px] md:shrink-0 md:border-t-0 md:border-r"
            >
              <div className="p-3 pb-0">
                <div role="tablist" aria-label="Studio panels" className="relative flex rounded-[9px] bg-panel p-1">
                  {(
                    [
                      ["places", "Places", MapPinned],
                      ["style", "Style", Palette],
                    ] as const
                  ).map(([id, label, Icon]) => (
                    <button
                      key={id}
                      role="tab"
                      type="button"
                      aria-selected={tab === id}
                      onClick={() => setTab(id)}
                      className={cn(
                        "relative flex h-8 flex-1 items-center justify-center gap-1.5 rounded-[6px] text-[13px] font-medium transition-colors duration-(--duration-hover)",
                        tab === id ? "text-ink" : "text-ink-3 hover:text-ink",
                      )}
                    >
                      {tab === id ? (
                        <motion.span layoutId={`studio-tab-${compact ? "c" : "f"}`} className="absolute inset-0 rounded-[6px] bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", stiffness: 420, damping: 34 }} />
                      ) : null}
                      <span className="relative flex items-center gap-1.5">
                        <Icon className="size-3.5" /> {label}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
              <div data-lenis-prevent className="no-scrollbar min-h-0 flex-1 overflow-y-auto overscroll-contain p-3">
                {tab === "places" ? (
                  <PlacesPanel
                    doc={doc}
                    patch={patch}
                    selected={selected}
                    setSelected={setSelected}
                    remove={remove}
                    adding={adding}
                    setAdding={(v) => {
                      setAdding(v)
                      if (!v) setDraft(null)
                    }}
                    draft={draft}
                    setDraft={setDraft}
                  />
                ) : (
                  <StylePanel doc={doc} patch={patch} />
                )}
              </div>
            </motion.aside>
          ) : null}
        </AnimatePresence>

        {/* map */}
        <div className={cn("relative min-h-[300px] flex-1", compact ? "md:min-h-0" : "md:min-h-0")}>
          <CityMap
            places={shownPlaces}
            theme={doc.theme}
            pinStyle={doc.pinStyle}
            labels={doc.labels}
            zoom={doc.view.zoom}
            centerX={doc.view.x}
            centerY={doc.view.y}
            selectedId={draft ? draft.id : selected}
            onSelect={(id) => (draft ? null : setSelected(id))}
            onMapClick={adding ? onMapClick : undefined}
            showCard={!adding}
            className="absolute inset-0"
          >
            {preview ? (
              <GuidePanel
                heading={doc.title}
                intro={doc.intro}
                cover={doc.cover}
                places={doc.places}
                selectedId={selected}
                onSelect={setSelected}
                className="absolute top-3 bottom-3 left-3 z-20 w-[42%] max-w-[260px]"
              />
            ) : null}
            <AnimatePresence>
              {adding ? (
                <motion.div
                  key="hint"
                  data-map-ui
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  className="absolute top-3 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2 rounded-full bg-ink px-3.5 py-2 text-[12.5px] whitespace-nowrap text-page shadow-(--shadow-float)"
                >
                  <Crosshair className="size-3.5" /> {draft ? "Name it in the panel" : "Click anywhere on the map"}
                </motion.div>
              ) : null}
            </AnimatePresence>
          </CityMap>
        </div>
      </div>

      <ShareDialog open={share} onOpenChange={setShare} title={doc.title} theme={doc.theme} />
    </div>
  )
}

function PlacesPanel({
  doc,
  patch,
  selected,
  setSelected,
  remove,
  adding,
  setAdding,
  draft,
  setDraft,
}: {
  doc: MapDoc
  patch: (p: Partial<MapDoc>) => void
  selected: string | null
  setSelected: (id: string | null) => void
  remove: (id: string) => void
  adding: boolean
  setAdding: (v: boolean) => void
  draft: Place | null
  setDraft: (p: Place | null) => void
}) {
  const reduced = useReducedMotion()
  const [request, setRequest] = useState("")
  const [thinking, setThinking] = useState(false)
  const [reply, setReply] = useState<{ text: string; undo?: Place[] } | null>(null)
  useCanvasAction("Studio: Ask Cairn thinking", (next) => setThinking(next ?? !thinking), { on: thinking, group: "Studio" })

  const submit = (text: string) => {
    if (!text.trim() || thinking) return
    setRequest(text)
    setThinking(true)
    setReply(null)
    window.setTimeout(() => {
      const result = ask(text, doc.places.map((p) => p.id))
      const before = doc.places
      if (result.places.length) patch({ places: [...doc.places, ...result.places] })
      setReply({ text: result.message, undo: result.places.length ? before : undefined })
      setThinking(false)
      setRequest("")
    }, 750)
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Ask Cairn */}
      <form
        onSubmit={(e) => {
          e.preventDefault()
          submit(request)
        }}
        className="rounded-[10px] bg-raised p-1 shadow-(--shadow-field) transition-shadow focus-within:shadow-[0_0_0_1.5px_var(--color-accent)]"
      >
        <label htmlFor="ask-cairn" className="flex items-center gap-1.5 px-2 pt-1.5 text-[11.5px] font-medium text-accent-ink">
          <Sparkles className="size-3.5" /> Ask Cairn
        </label>
        <div className="flex items-end gap-1">
          <textarea
            id="ask-cairn"
            rows={2}
            value={request}
            onChange={(e) => setRequest(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault()
                submit(request)
              }
            }}
            placeholder="Bakeries open early in the Lantern Quarter…"
            className="min-h-[44px] w-full resize-none bg-transparent px-2 py-1 text-[13.5px] text-ink outline-none placeholder:text-ink-soft"
          />
          <button
            type="submit"
            aria-label="Find places"
            disabled={!request.trim() || thinking}
            className="mb-1 grid size-8 shrink-0 place-items-center rounded-[7px] bg-accent text-white transition-[background-color,transform,opacity] duration-(--duration-hover) hover:bg-accent-hover active:scale-95 disabled:opacity-40"
          >
            {thinking ? <Loader2 className="size-4 animate-spin" /> : <ArrowUp className="size-4" />}
          </button>
        </div>
      </form>

      <AnimatePresence mode="wait" initial={false}>
        {thinking ? (
          <motion.p key="thinking" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="-mt-1 flex items-center gap-2 px-1 text-[12.5px] text-ink-3">
            <span className="relative flex size-2">
              <span className="absolute inset-0 animate-ping-soft rounded-full bg-accent" />
              <span className="relative size-2 rounded-full bg-accent" />
            </span>
            Reading the neighbourhood…
          </motion.p>
        ) : reply ? (
          <motion.div key={reply.text} initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="-mt-1 flex items-start justify-between gap-2 px-1 text-[12.5px] text-ink-2">
            <span>{reply.text}</span>
            {reply.undo ? (
              <button
                type="button"
                onClick={() => {
                  patch({ places: reply.undo! })
                  setReply(null)
                }}
                className="flex shrink-0 items-center gap-1 font-medium text-accent-ink hover:text-accent"
              >
                <Undo2 className="size-3" /> Undo
              </button>
            ) : null}
          </motion.div>
        ) : (
          <motion.div key="chips" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="-mt-1 flex flex-wrap gap-1.5">
            {SUGGESTIONS.slice(0, 3).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => submit(s)}
                className="rounded-full bg-panel px-2.5 py-1 text-[11.5px] text-ink-2 transition-[background-color,color,transform] duration-(--duration-hover) hover:bg-panel-deep hover:text-ink active:scale-[0.97]"
              >
                {s}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* add by clicking */}
      {draft ? (
        <motion.form
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          onSubmit={(e) => {
            e.preventDefault()
            patch({ places: [...doc.places, { ...draft, name: draft.name.trim() || "My place" }] })
            setSelected(draft.id)
            setDraft(null)
            setAdding(false)
          }}
          className="flex flex-col gap-2 rounded-[10px] bg-accent-soft p-3"
        >
          <p className="text-[12px] font-medium text-accent-ink">New place in {AREAS[draft.area].name}</p>
          <input
            autoFocus
            aria-label="Place name"
            placeholder="What's it called?"
            value={draft.name}
            onChange={(e) => setDraft({ ...draft, name: e.target.value })}
            className="h-9 rounded-[7px] bg-raised px-2.5 text-[13.5px] text-ink shadow-(--shadow-field) outline-none focus:shadow-[0_0_0_1.5px_var(--color-accent)]"
          />
          <div className="flex flex-wrap gap-1">
            {(Object.keys(CATEGORIES) as Category[])
              .filter((c) => c !== "people")
              .map((c) => {
                const C = CATEGORIES[c]
                const on = draft.category === c
                return (
                  <button
                    key={c}
                    type="button"
                    aria-pressed={on}
                    onClick={() => setDraft({ ...draft, category: c, photo: placeholderPhoto(c) })}
                    className={cn(
                      "flex h-7 items-center gap-1 rounded-full px-2 text-[11.5px] transition-[background-color,color,box-shadow] duration-(--duration-hover)",
                      on ? "bg-raised text-ink shadow-[inset_0_0_0_1.5px_currentColor]" : "bg-raised/60 text-ink-3 hover:bg-raised",
                    )}
                    style={on ? { color: C.color } : undefined}
                  >
                    <C.icon className="size-3" /> {C.label}
                  </button>
                )
              })}
          </div>
          <div className="mt-1 flex gap-2">
            <Button type="submit" size="sm" className="h-8 flex-1 text-[13px]">
              Pin it
            </Button>
            <Button type="button" variant="outline" size="sm" className="h-8 text-[13px]" onClick={() => setDraft(null)}>
              Cancel
            </Button>
          </div>
        </motion.form>
      ) : (
        <Button
          type="button"
          variant={adding ? "soft" : "outline"}
          size="sm"
          aria-pressed={adding}
          onClick={() => setAdding(!adding)}
          className={cn("h-9 justify-start text-[13px]", adding && "text-accent-ink")}
        >
          <Crosshair /> {adding ? "Click the map to drop a pin — or cancel" : "Add a place by clicking the map"}
        </Button>
      )}

      {/* the list */}
      <div>
        <p className="mb-1.5 flex items-center justify-between px-1 text-[11px] font-semibold tracking-[0.04em] text-ink-soft uppercase">
          On this map <span className="tabular-nums">{doc.places.length}</span>
        </p>
        {doc.places.length === 0 ? (
          <div className="flex flex-col items-center gap-2 rounded-[10px] border border-dashed border-line-strong px-4 py-8 text-center">
            <MapPinned className="size-5 text-ink-4" />
            <p className="text-[13px] font-medium text-ink-2">Nothing pinned yet</p>
            <p className="text-[12px] text-ink-3">Ask Cairn for places above, or click the map to add your own.</p>
          </div>
        ) : (
          <Reorder.Group axis="y" values={doc.places} onReorder={(places) => patch({ places })} className="flex flex-col gap-1">
            {doc.places.map((place) => (
              <PlaceRow key={place.id} place={place} on={place.id === selected} onPick={() => setSelected(place.id === selected ? null : place.id)} onRemove={() => remove(place.id)} />
            ))}
          </Reorder.Group>
        )}
      </div>
    </div>
  )
}

function placeholderPhoto(c: Category) {
  return { food: 39784928, coffee: 1855214, shops: 37267653, culture: 7859041, outdoors: 12589510, homes: 30580640, events: 27173521, people: 39598425 }[c]
}

function PlaceRow({ place, on, onPick, onRemove }: { place: Place; on: boolean; onPick: () => void; onRemove: () => void }) {
  const C = CATEGORIES[place.category]
  return (
    <Reorder.Item
      value={place}
      initial={{ opacity: 0, y: -4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      whileDrag={{ scale: 1.02, boxShadow: "var(--shadow-float)" }}
      className={cn(
        "group relative flex items-center gap-2 rounded-[8px] bg-raised p-1.5 transition-[background-color,box-shadow] duration-(--duration-hover)",
        on ? "bg-accent-soft shadow-[inset_0_0_0_1px_var(--color-accent)]" : "hover:bg-panel",
      )}
    >
      <GripVertical className="size-3.5 shrink-0 cursor-grab text-ink-4 active:cursor-grabbing" aria-hidden />
      <button type="button" onClick={onPick} className="flex min-w-0 flex-1 items-center gap-2 text-left">
        <img src={thumb(place.photo)} alt="" className="size-8 shrink-0 rounded-[6px] object-cover" draggable={false} loading="lazy" />
        <span className="min-w-0">
          <span className={cn("block truncate text-[13px] leading-tight font-medium", on ? "text-accent-ink" : "text-ink")}>{place.name}</span>
          <span className="flex items-center gap-1 text-[11px] text-ink-3">
            <span className="size-1.5 rounded-full" style={{ background: C.color }} /> {C.label} · {AREAS[place.area].name}
          </span>
        </span>
      </button>
      <button
        type="button"
        aria-label={`Remove ${place.name}`}
        onClick={onRemove}
        className="grid size-7 shrink-0 place-items-center rounded-[6px] text-ink-4 opacity-100 transition-[opacity,background-color,color] duration-(--duration-hover) hover:bg-signal-red-soft hover:text-signal-red md:opacity-0 md:group-hover:opacity-100 md:focus-visible:opacity-100"
      >
        <Trash2 className="size-3.5" />
      </button>
    </Reorder.Item>
  )
}

function StylePanel({ doc, patch }: { doc: MapDoc; patch: (p: Partial<MapDoc>) => void }) {
  return (
    <div className="flex flex-col gap-5">
      <fieldset>
        <legend className="mb-2 px-1 text-[11px] font-semibold tracking-[0.04em] text-ink-soft uppercase">Map style</legend>
        <div className="grid grid-cols-2 gap-2">
          {THEMES.map((t) => {
            const on = doc.theme === t.id
            return (
              <button
                key={t.id}
                type="button"
                aria-pressed={on}
                onClick={() => patch({ theme: t.id })}
                className={cn(
                  "relative overflow-hidden rounded-[10px] text-left transition-[box-shadow,transform] duration-(--duration-hover) active:scale-[0.97]",
                  on ? "shadow-[0_0_0_2px_var(--color-accent)]" : "shadow-(--shadow-field) hover:shadow-[0_0_0_1px_var(--color-ink-4)]",
                )}
              >
                <span className="relative block h-14" style={{ background: t.swatch[1] }}>
                  <span className="absolute inset-y-0 left-0 w-[62%] rounded-r-[40%]" style={{ background: t.swatch[0] }} />
                  <span className="absolute top-3 left-3 size-5 rounded-full" style={{ background: t.swatch[2] }} />
                  {on ? (
                    <motion.span layoutId="theme-check" className="absolute top-1.5 right-1.5 grid size-5 place-items-center rounded-full bg-accent text-white">
                      <Check className="size-3" strokeWidth={3} />
                    </motion.span>
                  ) : null}
                </span>
                <span className="block bg-raised px-2.5 py-1.5 text-[12.5px] font-medium text-ink">{t.label}</span>
              </button>
            )
          })}
        </div>
      </fieldset>

      <fieldset>
        <legend className="mb-2 px-1 text-[11px] font-semibold tracking-[0.04em] text-ink-soft uppercase">Pins</legend>
        <div className="relative flex rounded-[9px] bg-panel p-1">
          {(["photo", "dot"] as const).map((s) => (
            <button
              key={s}
              type="button"
              aria-pressed={doc.pinStyle === s}
              onClick={() => patch({ pinStyle: s })}
              className={cn("relative h-8 flex-1 rounded-[6px] text-[13px] font-medium transition-colors", doc.pinStyle === s ? "text-ink" : "text-ink-3 hover:text-ink")}
            >
              {doc.pinStyle === s ? <motion.span layoutId="pin-style" className="absolute inset-0 rounded-[6px] bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
              <span className="relative">{s === "photo" ? "Photos" : "Icons"}</span>
            </button>
          ))}
        </div>
      </fieldset>

      <label className="flex items-center justify-between gap-3 rounded-[10px] bg-panel px-3 py-2.5">
        <span>
          <span className="block text-[13px] font-medium text-ink">Neighbourhood names</span>
          <span className="block text-[11.5px] text-ink-3">Labels on the base map</span>
        </span>
        <Switch checked={doc.labels} onCheckedChange={(labels) => patch({ labels })} />
      </label>

      <label className="flex flex-col gap-1.5">
        <span className="px-1 text-[11px] font-semibold tracking-[0.04em] text-ink-soft uppercase">Intro for readers</span>
        <textarea
          rows={3}
          value={doc.intro}
          onChange={(e) => patch({ intro: e.target.value })}
          className="resize-none rounded-[10px] bg-raised px-3 py-2 text-[13px] text-ink shadow-(--shadow-field) outline-none focus:shadow-[0_0_0_1.5px_var(--color-accent)]"
        />
      </label>
    </div>
  )
}
