import { ArrowUpRight, Search, X } from "lucide-react"
import { useDeferredValue, useMemo, useState } from "react"

import { useCanvasAction } from "@canvas/react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Container } from "@/components/ui/container"
import { Input } from "@/components/ui/input"
import { ARCHIVE } from "@/content"
import { navigate } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * Every project, newest first, with a filter that sticks to the bottom of the
 * screen while you scroll the list. Rows with a case study open it.
 */
export function ProjectTable({ placeholder = "Filter by client, project, sector or place…" }: { placeholder?: string }) {
  const [query, setQuery] = useState("")
  const deferred = useDeferredValue(query)
  useCanvasAction("No results", (on) => setQuery((on ?? query !== "zzz") ? "zzz" : ""), { on: query === "zzz", group: "Work table" })
  useCanvasAction("Filter: Fintech", (on) => setQuery((on ?? query !== "Fintech") ? "Fintech" : ""), { on: query === "Fintech", group: "Work table" })

  const rows = useMemo(() => {
    const q = deferred.trim().toLowerCase()
    if (!q) return ARCHIVE
    return ARCHIVE.filter((row) => [row.year, row.client, row.project, row.sector, row.location].some((v) => v.toLowerCase().includes(q)))
  }, [deferred])

  return (
    <section aria-label="All projects" className="relative pt-16">
      <Container size="wide">
        <Table className="text-[15px]">
          <TableHeader className="[&_tr]:border-line">
            <TableRow className="hover:bg-transparent">
              <TableHead className="w-20 text-ink-faint">Year</TableHead>
              <TableHead className="text-ink-faint">Client</TableHead>
              <TableHead className="max-sm:hidden text-ink-faint">Project</TableHead>
              <TableHead className="max-md:hidden text-ink-faint">Sector</TableHead>
              <TableHead className="max-lg:hidden text-ink-faint">Location</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {rows.map((row) => (
              <TableRow
                key={`${row.client}-${row.project}`}
                onClick={row.slug ? () => navigate(`/work/${row.slug}`) : undefined}
                className={cn(
                  "h-12 border-line text-ink transition-colors duration-150 hover:bg-ground-raised",
                  row.slug && "cursor-pointer hover:bg-lime hover:text-night",
                )}
              >
                <TableCell className="tabular-nums">{row.year}</TableCell>
                <TableCell>
                  <span className="inline-flex items-center gap-1.5">
                    {row.client}
                    {row.slug ? <ArrowUpRight aria-label="Case study" className="size-3.5" /> : null}
                  </span>
                </TableCell>
                <TableCell className="max-sm:hidden">{row.project}</TableCell>
                <TableCell className="max-md:hidden">{row.sector}</TableCell>
                <TableCell className="max-lg:hidden">{row.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {rows.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-20 text-center">
            <p className="text-lg text-ink">Nothing matches “{query}”.</p>
            <button type="button" onClick={() => setQuery("")} className="h-11 text-[15px] text-lime underline underline-offset-4">
              Clear the filter
            </button>
          </div>
        ) : null}

        <div className="sticky bottom-4 z-20 mt-6 flex justify-start">
          <label className="relative w-full max-w-sm">
            <span className="sr-only">Filter projects</span>
            <Search className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-ink-faint" />
            <Input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={placeholder}
              className="h-11 rounded-[var(--radius-pill)] border-line-strong bg-ground-deep/90 pr-10 pl-10 text-[15px] text-ink shadow-[var(--shadow-media)] backdrop-blur-md placeholder:text-ink-faint"
            />
            {query ? (
              <button
                type="button"
                onClick={() => setQuery("")}
                aria-label="Clear filter"
                className="absolute top-1/2 right-1 flex size-9 -translate-y-1/2 items-center justify-center rounded-full text-ink-muted hover:text-ink"
              >
                <X className="size-4" />
              </button>
            ) : null}
          </label>
        </div>
      </Container>
    </section>
  )
}
