import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

import { FRAMES, type Category, type Edit, type Frame } from "@/frames"

export type View = "grid" | "list" | "gallery"
export const CATEGORIES: Category[] = ["Residential", "Interior", "Concrete", "Facade", "Civic", "Stair"]

type ArchiveState = {
  view: View
  setView: (view: View) => void
  filter: Category | null
  setFilter: (filter: Category | null) => void
  query: string
  setQuery: (query: string) => void
  /** Whether a frame passes the current filter and search. */
  matches: (frame: Frame) => boolean
  visibleCount: number
  /** What the studio was last asked to show: a frame, under an edit. */
  studioRequest: { frame: Frame; edit: Edit } | null
  openInStudio: (frame: Frame, edit?: Edit) => void
  introDone: boolean
  setIntroDone: (done: boolean) => void
}

const Context = createContext<ArchiveState | null>(null)

export function ArchiveProvider({ children }: { children: ReactNode }) {
  const [view, setView] = useState<View>("grid")
  const [filter, setFilter] = useState<Category | null>(null)
  const [query, setQuery] = useState("")
  const [studioRequest, setStudioRequest] = useState<{ frame: Frame; edit: Edit } | null>(null)
  const [introDone, setIntroDone] = useState(() => new URLSearchParams(window.location.search).has("only"))

  const value = useMemo<ArchiveState>(() => {
    const q = query.trim().toLowerCase()
    const matches = (frame: Frame) =>
      (!filter || frame.category === filter) &&
      (!q || `${frame.name} ${frame.place} ${frame.edit}`.toLowerCase().includes(q))
    return {
      view,
      setView,
      filter,
      setFilter,
      query,
      setQuery,
      matches,
      visibleCount: FRAMES.filter(matches).length,
      studioRequest,
      openInStudio: (frame, edit) => setStudioRequest({ frame, edit: edit ?? frame.edit }),
      introDone,
      setIntroDone,
    }
  }, [view, filter, query, studioRequest, introDone])

  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useArchive() {
  const value = useContext(Context)
  if (!value) throw new Error("useArchive must be used inside <ArchiveProvider>")
  return value
}
