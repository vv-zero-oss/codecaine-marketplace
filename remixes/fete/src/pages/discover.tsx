import { useEffect, useMemo, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Search, SlidersHorizontal, X } from "lucide-react"
import { useCanvasAction } from "@canvas/react"

import { ClosingCta } from "@/components/blocks/closing-cta"
import { EventCard } from "@/components/blocks/event-card"
import { InviteCard } from "@/components/mock/invite-card"
import { Reveal } from "@/components/motion/reveal"
import { CATEGORY_ICONS } from "@/components/sections/home/directory"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui/container"
import { Sheet, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { Switch } from "@/components/ui/switch"
import { CATEGORIES, CITIES, EVENTS, type CategoryId, type FeteEvent } from "@/content/events"
import { cn } from "@/lib/utils"

type When = "any" | "weekend" | "weeknight"
type Sort = "soonest" | "popular"

const WHEN: { id: When; label: string }[] = [
  { id: "any", label: "Any day" },
  { id: "weekend", label: "Weekends" },
  { id: "weeknight", label: "Weeknights" },
]

const isWeekend = (iso: string) => [0, 6].includes(new Date(iso + "T12:00:00").getDay())

/** A pill in a row of choices, with the "on" ground sliding between them. */
function Chip({ on, onClick, children, group }: { on: boolean; onClick: () => void; children: React.ReactNode; group: string }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={cn(
        "relative inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full px-4 text-[15px] whitespace-nowrap transition-colors duration-(--duration-hover)",
        on ? "text-page" : "text-ink-2 hover:bg-panel hover:text-ink",
      )}
    >
      {on && <motion.span layoutId={`chip-${group}`} className="absolute inset-0 rounded-full bg-ink" transition={{ type: "spring", duration: 0.4, bounce: 0.15 }} />}
      <span className="relative inline-flex items-center gap-1.5">{children}</span>
    </button>
  )
}

/**
 * Discover: find a night. Search, a city, a kind of thing, a day of the
 * week — every control filters the same list, live, and every card opens a
 * real invitation you can answer.
 */
export function DiscoverPage() {
  const reduced = useReducedMotion()
  const initialCategory = (new URLSearchParams(window.location.search).get("category") ?? "") as CategoryId | ""
  const [query, setQuery] = useState("")
  const [city, setCity] = useState<(typeof CITIES)[number]>("Everywhere")
  const [category, setCategory] = useState<CategoryId | "">(CATEGORIES.some((c) => c.id === initialCategory) ? initialCategory : "")
  const [when, setWhen] = useState<When>("any")
  const [free, setFree] = useState(false)
  const [sort, setSort] = useState<Sort>("soonest")
  const [open, setOpen] = useState<FeteEvent | null>(null)
  const search = useRef<HTMLInputElement>(null)

  useCanvasAction("Event sheet", (next) => setOpen((next ?? !open) ? EVENTS[1] : null), { on: !!open, group: "Discover" })
  useCanvasAction("No results", (next) => setQuery((next ?? query !== "zzz") ? "zzz" : ""), { on: query === "zzz", group: "Discover" })

  // "/" jumps to the search box, as it does on most sites with one.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "/" || (e.target as HTMLElement).closest("input, textarea")) return
      e.preventDefault()
      search.current?.focus()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const list = EVENTS.filter(
      (e) =>
        (!q || [e.name, e.host, e.city, e.venue, e.blurb].some((s) => s.toLowerCase().includes(q))) &&
        (city === "Everywhere" || e.city === city) &&
        (!category || e.category === category) &&
        (when === "any" || (when === "weekend") === isWeekend(e.date)) &&
        (!free || e.price === 0),
    )
    return list.sort((a, b) => (sort === "popular" ? b.going - a.going : a.date.localeCompare(b.date) || a.time.localeCompare(b.time)))
  }, [query, city, category, when, free, sort])

  const filtered = !!query || city !== "Everywhere" || !!category || when !== "any" || free
  const reset = () => {
    setQuery("")
    setCity("Everywhere")
    setCategory("")
    setWhen("any")
    setFree(false)
  }

  return (
    <>
      <section className="pt-28 pb-10 md:pt-36 md:pb-14">
        <Container className="max-w-[1180px]">
          <Reveal>
            <p className="type-eyebrow text-berry">Discover</p>
            <h1 className="type-head mt-4 text-giga text-ink">
              What’s <span className="flare-text">on.</span>
            </h1>
            <p className="mt-8 max-w-[42ch] text-lead text-ink-3">
              {EVENTS.length} nights across six cities this month — from a 6:30 run to a midnight demo. Pick one and say yes.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="mt-10">
            <label className="group relative block max-w-[640px]">
              <span className="sr-only">Search events</span>
              <Search className="pointer-events-none absolute top-1/2 left-5 size-5 -translate-y-1/2 text-ink-4 transition-colors group-focus-within:text-ink" />
              <input
                ref={search}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search run clubs, supper clubs, hack nights…"
                className="h-14 w-full rounded-full bg-raised pr-14 pl-13 text-[17px] shadow-(--shadow-field) transition-shadow duration-(--duration-hover) outline-none placeholder:text-ink-4 focus:shadow-[0_0_0_1.5px_var(--color-ink),var(--shadow-float)]"
              />
              {query ? (
                <button type="button" onClick={() => setQuery("")} aria-label="Clear search" className="absolute top-1/2 right-2 grid size-10 -translate-y-1/2 place-items-center rounded-full text-ink-3 hover:bg-panel">
                  <X className="size-4" />
                </button>
              ) : (
                <kbd className="absolute top-1/2 right-5 hidden -translate-y-1/2 rounded-[6px] border border-line px-2 py-0.5 font-mono text-[12px] text-ink-3 sm:block">/</kbd>
              )}
            </label>
          </Reveal>
        </Container>
      </section>

      {/* The filters ride along under the header. */}
      <div className="sticky top-14 z-30 border-y border-line bg-page/85 backdrop-blur-xl">
        <Container className="flex max-w-[1180px] flex-col gap-2 py-3">
          <div className="-mx-4 flex gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0" role="group" aria-label="City">
            {CITIES.map((c) => (
              <Chip key={c} group="city" on={city === c} onClick={() => setCity(c)}>
                {c}
              </Chip>
            ))}
          </div>
          <div className="-mx-4 flex items-center gap-1 overflow-x-auto px-4 [scrollbar-width:none] sm:mx-0 sm:px-0">
            <SlidersHorizontal className="mr-2 size-4 shrink-0 text-ink-4" aria-hidden />
            {CATEGORIES.map((c) => {
              const Icon = CATEGORY_ICONS[c.icon]
              const on = category === c.id
              return (
                <button
                  key={c.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setCategory(on ? "" : c.id)}
                  className={cn(
                    "inline-flex h-9 shrink-0 items-center gap-1.5 rounded-full border px-3 text-[14px] whitespace-nowrap transition-[background-color,border-color,color] duration-(--duration-hover)",
                    on ? "border-ink bg-ink text-page" : "border-line text-ink-2 hover:border-line-strong hover:text-ink",
                  )}
                >
                  <Icon className={cn("size-4", on ? "text-page" : c.tint)} strokeWidth={1.8} />
                  {c.label}
                </button>
              )
            })}
            <span className="mx-2 h-5 w-px shrink-0 bg-line" aria-hidden />
            {WHEN.map((w) => (
              <Chip key={w.id} group="when" on={when === w.id} onClick={() => setWhen(w.id)}>
                {w.label}
              </Chip>
            ))}
            <label className="ml-2 inline-flex h-9 shrink-0 items-center gap-2 text-[14px] text-ink-2">
              <Switch checked={free} onCheckedChange={setFree} /> Free only
            </label>
          </div>
        </Container>
      </div>

      <section className="pt-8 pb-section">
        <Container className="max-w-[1180px]">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <p className="text-[15px] text-ink-3" aria-live="polite">
              <span className="font-medium text-ink tabular-nums">{results.length}</span> {results.length === 1 ? "night" : "nights"}
              {city !== "Everywhere" && ` in ${city}`}
              {filtered && (
                <button type="button" onClick={reset} className="ml-3 text-berry underline-offset-2 hover:underline">
                  Reset filters
                </button>
              )}
            </p>
            <div className="flex rounded-full bg-panel p-1 text-[14px]" role="group" aria-label="Sort">
              {(["soonest", "popular"] as Sort[]).map((s) => (
                <button
                  key={s}
                  type="button"
                  aria-pressed={sort === s}
                  onClick={() => setSort(s)}
                  className={cn("relative h-8 rounded-full px-3 capitalize transition-colors", sort === s ? "text-ink" : "text-ink-3 hover:text-ink")}
                >
                  {sort === s && <motion.span layoutId="sort-pill" className="absolute inset-0 rounded-full bg-raised shadow-(--shadow-xs)" transition={{ type: "spring", duration: 0.35, bounce: 0.1 }} />}
                  <span className="relative">{s === "soonest" ? "Soonest" : "Most going"}</span>
                </button>
              ))}
            </div>
          </div>

          {results.length ? (
            <motion.ul layout={!reduced} className="grid grid-cols-1 gap-x-4 gap-y-8 min-[460px]:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              <AnimatePresence mode="popLayout" initial={false}>
                {results.map((e) => (
                  <motion.li
                    key={e.id}
                    layout={!reduced}
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.96 }}
                    transition={{ duration: 0.32, ease: [0.23, 1, 0.32, 1] }}
                  >
                    <EventCard event={e} onOpen={setOpen} />
                  </motion.li>
                ))}
              </AnimatePresence>
            </motion.ul>
          ) : (
            <div className="grid place-items-center rounded-(--radius-panel) border border-dashed border-line-strong px-6 py-20 text-center">
              <p className="text-h4 font-semibold text-ink">Nothing on for that — yet.</p>
              <p className="mt-2 max-w-[38ch] text-ink-3">Try another city or a wider day, or be the first to host one.</p>
              <div className="mt-6 flex gap-2">
                <Button variant="outline" onClick={reset}>
                  Reset filters
                </Button>
              </div>
            </div>
          )}
        </Container>
      </section>

      <Sheet open={!!open} onOpenChange={(o) => !o && setOpen(null)}>
        <SheetContent side="right" className="w-full gap-0 overflow-y-auto border-l-0 bg-panel p-4 sm:max-w-[480px] sm:p-6">
          {open && (
            <>
              <SheetTitle className="sr-only">{open.name}</SheetTitle>
              <SheetDescription className="sr-only">Answer the invitation for {open.name}</SheetDescription>
              <div className="pt-10">
                <InviteCard key={open.id} eventId={open.id} />
              </div>
              <div className="mx-auto mt-8 max-w-[420px] px-2">
                <p className="type-eyebrow text-ink-3">About</p>
                <p className="mt-2 text-[17px] leading-relaxed text-ink-2">{open.blurb}</p>
                <p className="type-eyebrow mt-6 text-ink-3">Hosted by</p>
                <p className="mt-2 text-[17px] font-medium text-ink">{open.host}</p>
                <p className="text-[15px] text-ink-3">{open.venue}, {open.city}</p>
              </div>
            </>
          )}
        </SheetContent>
      </Sheet>

      <ClosingCta title="Can’t find your thing?" continuation="Start it." primary="Host an event" primaryHref="/create" secondary="See pricing" secondaryHref="/pricing" />
    </>
  )
}
