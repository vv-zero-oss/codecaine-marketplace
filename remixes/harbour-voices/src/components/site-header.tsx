import { AnimatePresence, motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { Bracket, BracketLink } from "@/components/ui/bracket"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { ScrambleText } from "@/components/ui/scramble-text"
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { categories, people, project } from "@/content"
import { filters, matches, useFilters } from "@/lib/filters"
import { ease } from "@/lib/motion"
import { Link } from "@/lib/router"
import { go } from "@/lib/transition"
import { cn } from "@/lib/utils"

export const VIEWS = [
  { href: "/", label: "Grid" },
  { href: "/list", label: "List" },
  { href: "/gallery", label: "Gallery" },
]

/**
 * The header every index page shares: how many voices are showing, the three
 * ways to look at them, and the way to the about page. On the grid and the
 * list a second row adds FILTERS and SEARCH, which narrow both views.
 *
 * It floats over the page with no background of its own — on the grid the
 * portraits pass underneath it, as they would under a caption on a sheet of
 * contacts. Only its words take the pointer, so a drag that starts between
 * them still moves the grid.
 */
export function SiteHeader({
  pathname,
  tools = false,
  blend = false,
}: {
  pathname: string
  tools?: boolean
  /** Over full-bleed pictures: white, difference-blended, so it reads on any image. */
  blend?: boolean
}) {
  const state = useFilters()
  const count = tools ? people.filter((person) => matches(person, state)).length : people.length

  return (
    <header
      className={cn(
        "pointer-events-none fixed inset-x-0 top-0 z-30 px-gutter pt-4 md:pt-5",
        blend && "text-paper mix-blend-difference [--page-bg:var(--color-ink)] [--page-ink:var(--color-paper)]",
      )}
    >
      <div className="grid grid-cols-[1fr_auto] items-center gap-4 md:grid-cols-[1fr_auto_1fr]">
        <Link
          href="/"
          onClick={(event) => {
            event.preventDefault()
            go("/")
          }}
          className="pointer-events-auto justify-self-start text-label uppercase tracking-label"
        >
          <ScrambleText text={`${count} ${project.name}`} />
        </Link>

        <nav aria-label="Views" className="pointer-events-auto hidden items-center gap-5 md:flex">
          {VIEWS.map((view) => (
            <BracketLink
              key={view.href}
              href={view.href}
              active={pathname === view.href}
              onClick={(event) => {
                event.preventDefault()
                go(view.href)
              }}
            >
              <ScrambleText text={view.label} replay={pathname} />
            </BracketLink>
          ))}
        </nav>

        <div className="pointer-events-auto hidden justify-self-end md:block">
          <BracketLink
            href="/about"
            bare
            active={pathname === "/about"}
            onClick={(event) => {
              event.preventDefault()
              go("/about")
            }}
          >
            About the project
          </BracketLink>
        </div>

        <MobileMenu pathname={pathname} />
      </div>

      {tools && <Tools />}
    </header>
  )
}

/** FILTERS [+] on the left, SEARCH on the right, and the row they open. */
function Tools() {
  const { open, categories: ticked, query } = useFilters()
  const [searching, setSearching] = useState(query.length > 0)
  const input = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (searching) input.current?.focus()
  }, [searching])

  return (
    <div className="mt-3 md:mt-10">
      <div className="flex items-center justify-between gap-4">
        <Bracket
          bare
          aria-expanded={open}
          aria-controls="filters"
          onClick={() => filters.toggleOpen()}
          className="pointer-events-auto"
        >
          Filters <span className="tracking-normal">[{open ? "–" : "+"}]</span>
        </Bracket>

        <div className="pointer-events-auto flex min-h-11 items-center justify-end md:min-h-0">
          <AnimatePresence initial={false} mode="popLayout">
            {searching ? (
              <motion.div
                key="field"
                initial={{ opacity: 0, width: 80 }}
                animate={{ opacity: 1, width: "min(15rem, 52vw)" }}
                exit={{ opacity: 0, width: 80 }}
                transition={{ duration: 0.32, ease: ease.outQuart }}
                className="flex items-center gap-2"
              >
                <label htmlFor="search" className="sr-only">
                  Search by name, trade or place
                </label>
                <Input
                  id="search"
                  ref={input}
                  value={query}
                  placeholder="Name, trade, place"
                  onChange={(event) => filters.setQuery(event.target.value)}
                  onKeyDown={(event) => {
                    if (event.key === "Escape") {
                      filters.setQuery("")
                      setSearching(false)
                    }
                  }}
                />
                <Bracket
                  aria-label="Close search"
                  onClick={() => {
                    filters.setQuery("")
                    setSearching(false)
                  }}
                >
                  ×
                </Bracket>
              </motion.div>
            ) : (
              <motion.div key="button" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                <Bracket bare onClick={() => setSearching(true)}>
                  Search
                </Bracket>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence initial={false}>
        {open && (
          <motion.fieldset
            id="filters"
            key="filters"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.32, ease: ease.outQuart }}
            className="pointer-events-auto -mx-gutter overflow-hidden border-0 p-0"
          >
            <legend className="sr-only">Show only these kinds of story</legend>
            <div className="no-scrollbar flex gap-x-6 gap-y-1 overflow-x-auto px-gutter pt-3 md:flex-wrap md:gap-x-7 md:pt-5">
              {categories.map((category, index) => (
                <motion.label
                  key={category}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.03 * index, duration: 0.24, ease: ease.outQuart }}
                  className="flex min-h-11 shrink-0 cursor-pointer items-center gap-2.5 whitespace-nowrap md:min-h-0"
                >
                  <Checkbox checked={ticked.includes(category)} onCheckedChange={() => filters.toggle(category)} />
                  <span>{category}</span>
                </motion.label>
              ))}
              {ticked.length > 0 && (
                <Bracket size="caption" tone="muted" onClick={() => filters.clear()} className="shrink-0">
                  Clear
                </Bracket>
              )}
            </div>
          </motion.fieldset>
        )}
      </AnimatePresence>
    </div>
  )
}

/** Below `md`, the three views and the about page move into a sheet. */
function MobileMenu({ pathname }: { pathname: string }) {
  const [open, setOpen] = useState(false)
  const links = [...VIEWS, { href: "/about", label: "About the project" }]
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Bracket className="pointer-events-auto justify-self-end md:hidden">Menu</Bracket>
      </SheetTrigger>
      <SheetContent className="px-gutter pt-4 pb-10">
        <div className="flex items-center justify-between">
          <SheetTitle className="text-label uppercase tracking-label">{project.name}</SheetTitle>
          <SheetClose asChild>
            <Bracket>Close</Bracket>
          </SheetClose>
        </div>
        <SheetDescription className="sr-only">Site navigation</SheetDescription>
        <nav aria-label="Site" className="flex flex-col gap-1 pt-6">
          {links.map((link, index) => (
            <motion.div
              key={link.href}
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.12 + index * 0.04, duration: 0.3, ease: ease.outQuart }}
            >
              <BracketLink
                href={link.href}
                active={pathname === link.href}
                className={cn("text-2xl")}
                onClick={(event) => {
                  event.preventDefault()
                  setOpen(false)
                  go(link.href)
                }}
              >
                {link.label}
              </BracketLink>
            </motion.div>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}
