import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import { PROJECTS, type Discipline, type Project, type Region } from "@/data/projects"

/**
 * What the work section is showing: the wall or the list, and which
 * projects survive the filters. Shared by the wall, the list, the bottom
 * bar's view switch and the filter panel, so they can never disagree.
 */
export type WorkView = "grid" | "list"

type Filters = {
  discipline: Discipline | "All"
  features: string[]
  regions: Region[]
  clients: string[]
}

const EMPTY: Filters = { discipline: "All", features: [], regions: [], clients: [] }

type WorkState = {
  view: WorkView
  setView: (view: WorkView) => void
  filters: Filters
  setDiscipline: (d: Discipline | "All") => void
  toggle: (key: "features" | "regions" | "clients", value: string) => void
  reset: () => void
  active: number
  projects: Project[]
  filterOpen: boolean
  setFilterOpen: (open: boolean) => void
  /** Whether the work is on screen — the bottom bar shows its controls only then. */
  onScreen: boolean
  setOnScreen: (on: boolean) => void
}

const Context = createContext<WorkState | null>(null)

export function WorkProvider({ children, initialView = "grid" }: { children: ReactNode; initialView?: WorkView }) {
  const [view, setView] = useState<WorkView>(initialView)
  const [filters, setFilters] = useState<Filters>(EMPTY)
  const [filterOpen, setFilterOpen] = useState(false)
  const [onScreen, setOnScreen] = useState(true)

  const toggle = useCallback((key: "features" | "regions" | "clients", value: string) => {
    setFilters((f) => {
      const list = f[key] as string[]
      return { ...f, [key]: list.includes(value) ? list.filter((v) => v !== value) : [...list, value] }
    })
  }, [])

  const projects = useMemo(
    () =>
      PROJECTS.filter(
        (p) =>
          (filters.discipline === "All" || p.discipline === filters.discipline) &&
          (filters.features.length === 0 || filters.features.some((f) => p.tags.includes(f))) &&
          (filters.regions.length === 0 || filters.regions.includes(p.region)) &&
          (filters.clients.length === 0 || filters.clients.includes(p.client)),
      ),
    [filters],
  )

  const active = (filters.discipline === "All" ? 0 : 1) + filters.features.length + filters.regions.length + filters.clients.length

  const value = useMemo<WorkState>(
    () => ({
      view,
      setView,
      filters,
      setDiscipline: (discipline) => setFilters((f) => ({ ...f, discipline })),
      toggle,
      reset: () => setFilters(EMPTY),
      active,
      projects,
      filterOpen,
      setFilterOpen,
      onScreen,
      setOnScreen,
    }),
    [view, filters, toggle, active, projects, filterOpen, onScreen],
  )

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useWork() {
  const ctx = useContext(Context)
  if (!ctx) throw new Error("useWork() outside <WorkProvider>")
  return ctx
}

/** For the site-wide bottom bar, which only shows the work controls when there is work on screen. */
export function useOptionalWork() {
  return useContext(Context)
}
