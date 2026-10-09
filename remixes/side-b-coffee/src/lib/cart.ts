import { useSyncExternalStore } from "react"

/**
 * The cart: a tiny store kept in localStorage, so a bag added on the shop
 * page is still there on the next visit. Quick view, the subscription
 * builder, the merch shelf and the cart drawer all read and write it.
 */
export type CartLine = {
  key: string
  id: string
  name: string
  /** "12 oz · Whole bean", "M", "Every 2 weeks · 2 bags" */
  detail: string
  price: number
  qty: number
  kind: "coffee" | "merch" | "subscription"
}

type State = { lines: CartLine[]; open: boolean; bump: number }

const KEY = "side-b:cart"
let state: State = { lines: read(), open: false, bump: 0 }
const listeners = new Set<() => void>()

function read(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(KEY)
    return raw ? (JSON.parse(raw) as CartLine[]) : []
  } catch {
    return []
  }
}

function set(next: Partial<State>) {
  state = { ...state, ...next }
  try {
    window.localStorage.setItem(KEY, JSON.stringify(state.lines))
  } catch {
    /* private mode: the cart lives for this visit only */
  }
  listeners.forEach((listener) => listener())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  return () => listeners.delete(listener)
}

export function useCart() {
  return useSyncExternalStore(subscribe, () => state)
}

export const cart = {
  add(line: Omit<CartLine, "key" | "qty"> & { qty?: number }, { open = true } = {}) {
    const key = `${line.id}|${line.detail}`
    const existing = state.lines.find((l) => l.key === key)
    const qty = line.qty ?? 1
    const lines = existing
      ? state.lines.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l))
      : [...state.lines, { ...line, key, qty }]
    set({ lines, open, bump: state.bump + 1 })
  },
  setQty(key: string, qty: number) {
    set({ lines: qty <= 0 ? state.lines.filter((l) => l.key !== key) : state.lines.map((l) => (l.key === key ? { ...l, qty } : l)) })
  },
  remove(key: string) {
    set({ lines: state.lines.filter((l) => l.key !== key) })
  },
  clear() {
    set({ lines: [] })
  },
  setOpen(open: boolean) {
    set({ open })
  },
}

export function cartCount(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty, 0)
}
export function cartTotal(lines: CartLine[]) {
  return lines.reduce((sum, line) => sum + line.qty * line.price, 0)
}
