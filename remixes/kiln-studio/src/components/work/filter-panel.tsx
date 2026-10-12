import { Fragment } from "react"
import { useCanvasAction } from "@canvas/react"

import { useWork } from "@/components/work/work-state"
import { Button } from "@/components/ui/button"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle } from "@/components/ui/sheet"
import { CLIENTS, DISCIPLINES, FEATURES, PROJECTS, REGIONS } from "@/data/projects"
import { play } from "@/lib/sound"
import { cn } from "@/lib/utils"

/** A filter word in a mono column: grey until chosen, then white with an ember dot. */
function FilterOption({ label, on, onToggle, count }: { label: string; on: boolean; onToggle: () => void; count: number }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={on}
      onClick={() => {
        play("tick")
        onToggle()
      }}
      className={cn(
        "type-label group/opt flex min-h-7 w-full items-center gap-2 text-left transition-colors duration-(--duration-hover) ease-(--ease-out-strong)",
        on ? "text-ink" : "text-ink-3 hover:text-ink",
      )}
    >
      <span aria-hidden className={cn("size-[5px] shrink-0 rounded-full bg-ember transition-[transform,opacity] duration-(--duration-hover) ease-(--ease-out-strong)", on ? "scale-100 opacity-100" : "scale-0 opacity-0")} />
      <span className={cn("transition-transform duration-(--duration-hover) ease-(--ease-out-strong)", !on && "-translate-x-[7px]")}>{label}</span>
      <span className="ml-auto text-ink-5 tabular-nums">{count}</span>
    </button>
  )
}

/**
 * The filter, as the reference sets it: a dark panel sliding in from the
 * right over the wall, the disciplines as one loud sentence — "All,
 * Experience, Product, Communication" — with the chosen one white and
 * underlined, and three mono columns underneath. Everything filters the
 * wall and the list live, behind the panel.
 */
export function FilterPanel() {
  const { filterOpen, setFilterOpen, filters, setDiscipline, toggle, reset, projects, active } = useWork()
  useCanvasAction("Filter panel", (next) => setFilterOpen(next ?? !filterOpen), { on: filterOpen, group: "Work" })

  const words = ["All", ...DISCIPLINES] as const
  const count = (key: "tags" | "region" | "client", value: string) =>
    PROJECTS.filter((p) => (key === "tags" ? p.tags.includes(value) : p[key] === value)).length

  return (
    <Sheet open={filterOpen} onOpenChange={setFilterOpen}>
      <SheetContent
        showCloseButton={false}
        className="w-full gap-0 overflow-y-auto bg-page/86 px-(--spacing-gutter) pt-24 pb-0 backdrop-blur-2xl sm:max-w-[min(760px,52vw)] sm:px-10 sm:pt-28"
        overlayClassName="bg-gradient-to-r from-transparent via-page/20 to-page/70"
      >
        {/* A low ember glow in the corner, the way a kiln door lights a room. */}
        <div aria-hidden className="pointer-events-none absolute -bottom-40 -left-40 size-[480px] rounded-full bg-ember-deep/30 blur-[120px]" />
        <p className="type-label relative text-ink-3">Filter by zone</p>
        <SheetTitle asChild>
          <h2 className="type-head relative mt-3 text-[clamp(40px,4.6vw,76px)] leading-[0.98] tracking-[-0.05em]">
            {words.map((word, i) => {
              const on = filters.discipline === word
              return (
                <Fragment key={word}>
                <span className="whitespace-nowrap">
                  <button
                    type="button"
                    aria-pressed={on}
                    onClick={() => {
                      play("press")
                      setDiscipline(word)
                    }}
                    className={cn(
                      "underline-offset-[0.12em] transition-[color,text-decoration-color] duration-(--duration-hover) ease-(--ease-out-strong)",
                      on ? "text-ink underline decoration-[0.06em]" : "text-ink-5 decoration-transparent hover:text-ink-3",
                    )}
                  >
                    {word}
                  </button>
                  {i < words.length - 1 ? <span className={cn(on ? "text-ink" : "text-ink-5")}>,</span> : null}
                </span>{" "}
                </Fragment>
              )
            })}
          </h2>
        </SheetTitle>
        <SheetDescription className="sr-only">Filter the projects by discipline, feature, region and partner.</SheetDescription>

        <div className="relative mt-12 grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-3">
          <fieldset>
            <legend className="type-label mb-3 text-ink-4">Feature</legend>
            {FEATURES.map((f) => (
              <FilterOption key={f} label={f} count={count("tags", f)} on={filters.features.includes(f)} onToggle={() => toggle("features", f)} />
            ))}
          </fieldset>
          <fieldset>
            <legend className="type-label mb-3 text-ink-4">Region</legend>
            {REGIONS.map((r) => (
              <FilterOption key={r} label={r} count={count("region", r)} on={filters.regions.includes(r)} onToggle={() => toggle("regions", r)} />
            ))}
          </fieldset>
          <fieldset className="col-span-2 sm:col-span-1">
            <legend className="type-label mb-3 text-ink-4">Partner</legend>
            {CLIENTS.map((c) => (
              <FilterOption key={c} label={c} count={count("client", c)} on={filters.clients.includes(c)} onToggle={() => toggle("clients", c)} />
            ))}
          </fieldset>
        </div>

        <div className="sticky bottom-0 z-10 -mx-(--spacing-gutter) mt-auto flex items-center justify-between gap-3 bg-gradient-to-t from-page via-page/90 to-transparent px-(--spacing-gutter) pt-10 pb-[max(clamp(14px,1.8vw,28px),env(safe-area-inset-bottom))] sm:-mx-10 sm:px-10">
          <p className="type-label text-ink-3 tabular-nums" aria-live="polite">
            Showing <span className="text-ink">{projects.length}</span> of {PROJECTS.length}
          </p>
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="sm" onClick={reset} disabled={active === 0}>
              Reset
            </Button>
            <SheetClose asChild>
              <Button className="h-[clamp(44px,3.4vw,52px)] px-[clamp(16px,1.6vw,26px)] text-[clamp(14px,1.05vw,17px)]">Close</Button>
            </SheetClose>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  )
}
