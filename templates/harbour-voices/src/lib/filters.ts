import { useSyncExternalStore } from "react"

import type { Category, Person } from "@/content"

/**
 * What the grid and the list are narrowed to: the story kinds ticked under
 * FILTERS and the text typed into SEARCH. Shared, so switching between the
 * two views keeps the same selection.
 */
interface State {
  open: boolean
  categories: Category[]
  query: string
}

let state: State = { open: false, categories: [], query: "" }
const listeners = new Set<() => void>()

function set(next: Partial<State>) {
  state = { ...state, ...next }
  for (const listener of listeners) listener()
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useFilters() {
  return useSyncExternalStore(subscribe, () => state)
}

export const filters = {
  get: () => state,
  subscribe,
  toggleOpen: () => set({ open: !state.open }),
  setOpen: (open: boolean) => set({ open }),
  toggle(category: Category) {
    const has = state.categories.includes(category)
    set({ categories: has ? state.categories.filter((c) => c !== category) : [...state.categories, category] })
  },
  setQuery: (query: string) => set({ query }),
  clear: () => set({ categories: [], query: "" }),
}

function fold(value: string) {
  return value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase()
}

/** Does this person pass the current filters? */
export function matches(person: Person, current: State = state) {
  if (current.categories.length && !current.categories.includes(person.category)) return false
  if (current.query.trim()) {
    const q = fold(current.query.trim())
    return fold(`${person.name} ${person.trade} ${person.born}`).includes(q)
  }
  return true
}
