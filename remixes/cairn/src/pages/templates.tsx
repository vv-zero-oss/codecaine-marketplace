import { useEffect, useMemo, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowRight, Search, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { TemplateCard } from "@/components/blocks/template-card"
import { MapGuide } from "@/components/map/map-guide"
import { Reveal } from "@/components/motion/reveal"
import { Badge } from "@/components/ui/badge"
import { Button, ButtonLink } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog"
import { placesById } from "@/content/places"
import { TEMPLATES, type MapTemplate, type TemplateKind } from "@/content/templates"
import { replaceSearch, useSearch } from "@/lib/router"
import { cn } from "@/lib/utils"

const KINDS: ("All" | TemplateKind)[] = ["All", "Events", "Directories", "Community", "Travel", "Property"]

/**
 * /templates — every map somebody can start from. Filter by kind (the
 * hero's photo cards land here already filtered), search by name, open one
 * to try it at full size, then take it into the studio.
 */
export function TemplatesPage() {
  const reduced = useReducedMotion()
  const search = useSearch()
  const initial = (search.get("kind") as TemplateKind | null) ?? "All"
  const [kind, setKind] = useState<"All" | TemplateKind>(KINDS.includes(initial) ? initial : "All")
  const [query, setQuery] = useState("")
  const [open, setOpen] = useState<MapTemplate | null>(null)
  useCanvasAction("Template preview", (next) => setOpen((next ?? !open) ? TEMPLATES[0] : null), { on: !!open, group: "Templates" })
  useCanvasAction("No results", (next) => setQuery(next === false ? "" : "underwater castles"), { on: query === "underwater castles", group: "Templates" })

  useEffect(() => {
    const k = search.get("kind") as TemplateKind | null
    if (k && KINDS.includes(k)) setKind(k)
    // read once per navigation
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search.toString()])

  const pick = (k: "All" | TemplateKind) => {
    setKind(k)
    const params = new URLSearchParams(window.location.search)
    if (k === "All") params.delete("kind")
    else params.set("kind", k)
    replaceSearch(params)
  }

  const shown = useMemo(
    () =>
      TEMPLATES.filter((t) => (kind === "All" || t.kind === kind) && (!query || `${t.title} ${t.summary} ${t.kind}`.toLowerCase().includes(query.toLowerCase()))),
    [kind, query],
  )

  return (
    <>
      <section className="pt-[124px] pb-10 md:pt-[160px] md:pb-14">
        <Container className="max-w-[1100px]">
          <Reveal>
            <p className="type-eyebrow text-accent-ink">Templates</p>
            <h1 className="type-serif mt-4 max-w-[12ch] text-mega text-ink">Borrow a map.</h1>
            <p className="mt-7 max-w-[40ch] text-lead text-ink-3">
              Every template is a finished, working map. Open one, poke at it, then make it yours in the studio.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="pb-section">
        <Container className="max-w-[1100px]">
          <div className="sticky top-[76px] z-20 -mx-4 flex flex-col gap-3 bg-page/88 px-4 py-3 backdrop-blur-md sm:mx-0 sm:flex-row sm:items-center sm:justify-between sm:rounded-[12px] sm:px-0">
            <div role="tablist" aria-label="Kind of map" className="no-scrollbar -mx-4 flex gap-1.5 overflow-x-auto px-4 sm:mx-0 sm:px-0">
              {KINDS.map((k) => {
                const on = k === kind
                const count = k === "All" ? TEMPLATES.length : TEMPLATES.filter((t) => t.kind === k).length
                return (
                  <button
                    key={k}
                    role="tab"
                    type="button"
                    aria-selected={on}
                    onClick={() => pick(k)}
                    className={cn(
                      "relative flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[14.5px] font-medium transition-colors duration-(--duration-hover)",
                      on ? "text-page" : "text-ink-2 hover:bg-panel",
                    )}
                  >
                    {on ? <motion.span layoutId="kind-pill" className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", stiffness: 420, damping: 34 }} /> : null}
                    <span className="relative">{k}</span>
                    <span className={cn("relative text-[12px] tabular-nums", on ? "text-ink-4" : "text-ink-soft")}>{count}</span>
                  </button>
                )
              })}
            </div>
            <label className="flex h-10 w-full items-center gap-2 rounded-(--radius-field) bg-raised px-3 shadow-(--shadow-field) transition-shadow focus-within:shadow-[0_0_0_1.5px_var(--color-accent)] sm:w-[260px]">
              <Search className="size-4 shrink-0 text-ink-3" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search templates"
                aria-label="Search templates"
                className="w-full min-w-0 bg-transparent text-[15px] text-ink outline-none placeholder:text-ink-soft"
              />
              {query ? (
                <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="grid size-6 place-items-center rounded-full text-ink-3 hover:bg-panel hover:text-ink">
                  <X className="size-3.5" />
                </button>
              ) : null}
            </label>
          </div>

          <motion.ul layout={!reduced} className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="popLayout">
              {shown.map((t) => (
                <motion.li
                  key={t.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, scale: 0.97, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={reduced ? { opacity: 0 } : { opacity: 0, scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 320, damping: 32 }}
                >
                  <TemplateCard template={t} onOpen={() => setOpen(t)} />
                  <div className="mt-2 flex items-center gap-2">
                    <Badge>{t.kind}</Badge>
                    <span className="text-[12.5px] text-ink-soft tabular-nums">{t.uses.toLocaleString("en-GB")} copies</span>
                  </div>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>

          {shown.length === 0 ? (
            <div className="mx-auto mt-6 flex max-w-sm flex-col items-center gap-3 rounded-(--radius-panel) bg-cream px-6 py-12 text-center">
              <p className="type-serif text-h4 text-ink">No map like that yet.</p>
              <p className="text-[15px] text-ink-3">Nothing matches “{query}”. Start from a blank map and Cairn will help you fill it.</p>
              <div className="mt-2 flex gap-2">
                <Button variant="outline" size="sm" onClick={() => (setQuery(""), pick("All"))}>
                  Clear filters
                </Button>
                <ButtonLink href="/studio" size="sm">
                  Start blank
                </ButtonLink>
              </div>
            </div>
          ) : null}
        </Container>
      </section>

      <Dialog open={!!open} onOpenChange={(v) => !v && setOpen(null)}>
        <DialogContent className="max-w-[min(1000px,calc(100%-32px))] p-0" showCloseButton={false}>
          {open ? (
            <div className="flex flex-col">
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4 sm:px-6">
                <div className="min-w-0">
                  <DialogTitle className="text-h4">{open.title}</DialogTitle>
                  <DialogDescription className="mt-0.5 text-[14px]">{open.intro}</DialogDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setOpen(null)}>
                    Close
                  </Button>
                  <ButtonLink href={`/studio?template=${open.id}`} size="sm" onClick={() => setOpen(null)}>
                    Use this template <ArrowRight />
                  </ButtonLink>
                </div>
              </div>
              <MapGuide
                heading={open.heading}
                intro={open.intro}
                cover={open.cover}
                places={placesById(open.placeIds)}
                theme={open.theme}
                zoom={open.view.zoom}
                centerX={open.view.x - 60}
                centerY={open.view.y}
                className="h-[min(560px,64svh)] rounded-b-(--radius-panel)"
              />
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </>
  )
}
