import { useMemo, useState } from "react"
import { ArrowRight, Search, X } from "lucide-react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { useCanvasAction } from "@canvas/react"

import { ParallaxPhoto } from "@/components/motion/parallax-photo"
import { Reveal } from "@/components/motion/reveal"
import { BookObject } from "@/components/mock/book-object"
import { LettersSignup } from "@/components/sections/letters-signup"
import { MakersIndex } from "@/components/sections/makers-index"
import { SectionTitle } from "@/components/sections/section-title"
import { StoryCard } from "@/components/sections/story-card"
import { Button } from "@/components/ui/button"
import { VOLUMES } from "@/content/shop"
import { STORIES, TRADES, type Trade } from "@/content/stories"
import { Link } from "@/lib/router"
import { photo } from "@/lib/photos"
import { useReader } from "@/lib/reader"
import { cn } from "@/lib/utils"

/** The page opens loud: the word, set as big as the page allows, and the count. */
function StoriesMasthead() {
  return (
    <section className="px-gutter pt-28 md:pt-36">
      <Reveal>
        <div className="flex items-end justify-between gap-6 border-b border-rule pb-4">
          <h1 className="type-display text-colossal text-ink">Stories</h1>
          <p className="type-label mb-[1.4vw] hidden shrink-0 text-ink-3 tabular-nums sm:block">
            {STORIES.length} people
            <br />
            {TRADES.length} trades
          </p>
        </div>
        <p className="mt-6 max-w-[40ch] font-serif text-lead text-ink-2">
          Visits with people who make things by hand — in their kitchens, sheds, courtyards and studios. Start anywhere.
        </p>
      </Reveal>
    </section>
  )
}

/** The lead story: why to start reading, before the archive. */
function LeadStory() {
  const lead = STORIES[8]
  const { openStory } = useReader()
  return (
    <section className="px-gutter pt-16 md:pt-24">
      <div className="grid gap-8 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:items-end md:gap-[3.2vw]">
        <ParallaxPhoto src={photo(lead.photo, 1800)} alt={`${lead.name}, ${lead.role}`} className="aspect-[3/2] rounded-none" />
        <Reveal>
          <p className="type-label text-ink-3">The lead story · Volume {lead.volume}</p>
          <h2 className="type-display mt-4 text-h1 text-ink">{lead.name}</h2>
          <p className="mt-1 font-serif text-h4 text-ink-3 italic">{lead.role}, {lead.place}</p>
          <p className="mt-6 max-w-[42ch] font-serif text-[17px] leading-[1.55] text-ink-2">{lead.dek}</p>
          <Button variant="outline" className="mt-8" onClick={() => openStory(lead.slug)}>
            Read the story <ArrowRight />
          </Button>
        </Reveal>
      </div>
    </section>
  )
}

/** The archive: filter by trade, search by name or place, and the grid re-flows. */
function StoryArchive() {
  const [trade, setTrade] = useState<Trade | "All">("All")
  const [query, setQuery] = useState("")
  const reduced = useReducedMotion()
  useCanvasAction("Archive: no results", (next) => setQuery((next ?? !query) ? "zzz" : ""), { on: query === "zzz", group: "Stories" })

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    return STORIES.filter((s) => (trade === "All" || s.trade === trade) && (!q || `${s.name} ${s.role} ${s.place}`.toLowerCase().includes(q)))
  }, [trade, query])

  const reset = () => {
    setTrade("All")
    setQuery("")
  }

  return (
    <section className="px-gutter py-section" aria-label="Archive">
      <SectionTitle title="The archive" />
      <div className="mt-6 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="-mx-1 flex flex-wrap gap-1.5" role="group" aria-label="Filter by trade">
          {(["All", ...TRADES] as const).map((t) => {
            const on = trade === t
            return (
              <button
                key={t}
                type="button"
                aria-pressed={on}
                onClick={() => setTrade(t)}
                className={cn(
                  "type-label relative inline-flex h-10 items-center rounded-(--radius-chip) px-4 transition-colors duration-(--duration-hover)",
                  on ? "text-page" : "text-ink-2 shadow-[inset_0_0_0_1px_var(--color-line-strong)] hover:text-ink",
                )}
              >
                {on && <motion.span layoutId="archive-chip" className="absolute inset-0 rounded-(--radius-chip) bg-ink" transition={{ type: "spring", duration: 0.35, bounce: 0.12 }} />}
                <span className="relative">{t}</span>
              </button>
            )
          })}
        </div>
        <label className="relative flex w-full items-center lg:w-72">
          <Search className="pointer-events-none absolute left-0 size-4 text-ink-3" />
          <input
            value={query === "zzz" ? "" : query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search a name or a place"
            aria-label="Search stories"
            className="h-11 w-full border-0 border-b border-rule bg-transparent pr-9 pl-7 font-serif text-[16px] text-ink outline-none placeholder:text-ink-4 focus-visible:border-ink"
          />
          {query && (
            <button type="button" aria-label="Clear search" onClick={() => setQuery("")} className="absolute right-0 grid size-9 place-items-center text-ink-3 hover:text-ink">
              <X className="size-4" />
            </button>
          )}
        </label>
      </div>
      <p className="type-label mt-6 text-ink-3 tabular-nums" aria-live="polite">
        {results.length} {results.length === 1 ? "story" : "stories"}
      </p>

      {results.length ? (
        <motion.ul layout={!reduced} className="mt-6 grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 md:gap-x-[2.4vw] lg:grid-cols-4">
          <AnimatePresence mode="popLayout" initial={false}>
            {results.map((s) => (
              <motion.li
                key={s.slug}
                layout={!reduced}
                initial={{ opacity: 0, transform: "scale(0.97)" }}
                animate={{ opacity: 1, transform: "scale(1)" }}
                exit={{ opacity: 0, transform: "scale(0.97)", transition: { duration: 0.15 } }}
                transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
              >
                <StoryCard story={s} ratio="tall" />
              </motion.li>
            ))}
          </AnimatePresence>
        </motion.ul>
      ) : (
        <div className="mt-10 border-y border-line py-16 text-center">
          <p className="type-display text-h3 text-ink">Nobody here yet.</p>
          <p className="mt-3 text-ink-2">We haven't visited anyone who matches — try another trade or name.</p>
          <Button variant="outline" className="mt-6" onClick={reset}>
            Show everyone
          </Button>
        </div>
      )}
    </section>
  )
}

/** Where the longer versions live: the three volumes. */
function FromTheVolumes() {
  return (
    <section className="bg-sheet px-gutter py-section">
      <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-[4vw]">
        <Reveal>
          <h2 className="type-display max-w-[12ch] text-h1 text-ink">The long versions are in print.</h2>
          <p className="mt-5 max-w-[40ch] font-serif text-ink-2">Every story online is a shorter cut of a chapter in one of the volumes — with three times the photographs and the whole conversation.</p>
          <Link href="/shop" className="type-label link-draw mt-8 inline-block text-ink">
            Visit the shop
          </Link>
        </Reveal>
        <div className="grid grid-cols-3 gap-[3vw]">
          {VOLUMES.map((v, i) => (
            <Reveal key={v.number} delay={i * 0.08}>
              <Link href="/shop" className="block">
                <BookObject volume={v.number} title={v.title} subtitle={v.subtitle} cloth={v.cloth} angle={-14} />
                <p className="mt-6 font-serif text-[15px] text-ink md:text-[17px]">Volume {v.number}</p>
                <p className="type-label mt-1 text-ink-3">{v.title} · {v.year}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

/**
 * `/stories`: the word, the lead story (why start here), the archive you can
 * filter (who else), the index by name (everyone at a glance), where the long
 * versions live, and the letters.
 */
export function StoriesPage() {
  return (
    <>
      <StoriesMasthead />
      <LeadStory />
      <StoryArchive />
      <MakersIndex id="index" title="Index, by name" size="h1" />
      <FromTheVolumes />
      <LettersSignup />
    </>
  )
}
