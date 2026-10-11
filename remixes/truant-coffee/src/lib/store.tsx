import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"
import { useCanvasAction } from "@canvas/react"

import { coffeeById, FREE_SHIPPING, PROMO_CODE, SIZES, type Grind, type SizeId } from "@/content/coffees"

/**
 * The shop's state: the cart, the subscription, the weight unit and which
 * drawer is open. Kept in localStorage so a reload keeps the bag full, and
 * every drawer is registered as an editor action so each one can be opened
 * from the canvas without clicking through the page.
 */

export type CartLine = { key: string; coffeeId: string; size: SizeId; grind: Grind; qty: number }

export type Subscription = {
  coffeeId: string | "rotate"
  size: SizeId
  grind: Grind
  every: 1 | 2 | 4
  bags: number
  startedAt: string
  paused?: boolean
  /** Ship dates (ISO day) the subscriber skipped. */
  skipped?: string[]
}

/** The next `count` Wednesdays this subscription ships on, skips left out. */
export function shipDates(sub: Subscription, count = 3, from = new Date()): Date[] {
  const start = new Date(Math.max(new Date(sub.startedAt).getTime(), from.getTime()))
  const first = new Date(start)
  first.setHours(12, 0, 0, 0)
  first.setDate(first.getDate() + ((3 - first.getDay() + 7) % 7 || 7))
  const dates: Date[] = []
  for (let i = 0; dates.length < count && i < 60; i++) {
    const d = new Date(first)
    d.setDate(first.getDate() + i * 7 * sub.every)
    if (!sub.skipped?.includes(d.toISOString().slice(0, 10))) dates.push(d)
  }
  return dates
}

export const isoDay = (d: Date) => d.toISOString().slice(0, 10)

export type Unit = "oz" | "g"
export type Drawer = "menu" | "cart" | "account" | null

type Store = {
  lines: CartLine[]
  add: (coffeeId: string, size?: SizeId, grind?: Grind, qty?: number) => void
  setQty: (key: string, qty: number) => void
  remove: (key: string) => void
  clear: () => void
  count: number
  subtotal: number
  discount: number
  total: number
  toFreeShipping: number
  promo: string | null
  applyPromo: (code: string) => boolean
  unit: Unit
  setUnit: (unit: Unit) => void
  drawer: Drawer
  setDrawer: (drawer: Drawer) => void
  subscription: Subscription | null
  setSubscription: (sub: Subscription | null) => void
  /** The key of the line that was just added, for the cart's flash. */
  lastAdded: string | null
}

const StoreContext = createContext<Store | null>(null)

function load<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key)
    return raw ? (JSON.parse(raw) as T) : fallback
  } catch {
    return fallback
  }
}

function save(key: string, value: unknown) {
  try {
    localStorage.setItem(key, JSON.stringify(value))
  } catch {
    /* private mode: the cart lives for the session only */
  }
}

export function linePrice(line: Pick<CartLine, "coffeeId" | "size">) {
  const coffee = coffeeById[line.coffeeId]
  const size = SIZES.find((s) => s.id === line.size) ?? SIZES[0]
  return coffee ? Math.round(coffee.price * size.factor * 100) / 100 : 0
}

export function StoreProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => load("truant.cart", []))
  const [promo, setPromo] = useState<string | null>(() => load("truant.promo", null))
  const [unit, setUnit] = useState<Unit>(() => load("truant.unit", "oz"))
  const [subscription, setSubscription] = useState<Subscription | null>(() => load("truant.subscription", null))
  const [drawer, setDrawer] = useState<Drawer>(null)
  const [lastAdded, setLastAdded] = useState<string | null>(null)

  useEffect(() => save("truant.cart", lines), [lines])
  useEffect(() => save("truant.promo", promo), [promo])
  useEffect(() => save("truant.unit", unit), [unit])
  useEffect(() => save("truant.subscription", subscription), [subscription])

  const add = useCallback((coffeeId: string, size: SizeId = "12oz", grind: Grind = "Whole bean", qty = 1) => {
    const key = `${coffeeId}|${size}|${grind}`
    setLines((current) => {
      const found = current.find((l) => l.key === key)
      if (found) return current.map((l) => (l.key === key ? { ...l, qty: Math.min(l.qty + qty, 12) } : l))
      return [...current, { key, coffeeId, size, grind, qty }]
    })
    setLastAdded(key)
    window.setTimeout(() => setLastAdded((k) => (k === key ? null : k)), 1400)
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((current) => (qty <= 0 ? current.filter((l) => l.key !== key) : current.map((l) => (l.key === key ? { ...l, qty: Math.min(qty, 12) } : l))))
  }, [])
  const remove = useCallback((key: string) => setLines((current) => current.filter((l) => l.key !== key)), [])
  const clear = useCallback(() => setLines([]), [])

  const applyPromo = useCallback((code: string) => {
    const ok = code.trim().toUpperCase() === PROMO_CODE
    if (ok) setPromo(PROMO_CODE)
    return ok
  }, [])

  const totals = useMemo(() => {
    const count = lines.reduce((n, l) => n + l.qty, 0)
    const subtotal = lines.reduce((n, l) => n + linePrice(l) * l.qty, 0)
    const discount = promo ? Math.round(subtotal * 0.15 * 100) / 100 : 0
    return { count, subtotal, discount, total: subtotal - discount, toFreeShipping: Math.max(0, FREE_SHIPPING - (subtotal - discount)) }
  }, [lines, promo])

  // Every drawer, reachable from the editor's Actions row.
  useCanvasAction("Menu", (next) => setDrawer((next ?? drawer !== "menu") ? "menu" : null), { on: drawer === "menu", group: "Drawers" })
  useCanvasAction("Cart", (next) => setDrawer((next ?? drawer !== "cart") ? "cart" : null), { on: drawer === "cart", group: "Drawers" })
  useCanvasAction("Your subscription", (next) => setDrawer((next ?? drawer !== "account") ? "account" : null), { on: drawer === "account", group: "Drawers" })
  useCanvasAction(
    "Cart has coffee",
    (next) => {
      const fill = next ?? lines.length === 0
      setLines(fill ? [{ key: "half-day-4|12oz|Whole bean", coffeeId: "half-day-4", size: "12oz", grind: "Whole bean", qty: 1 }, { key: "the-long-way|2lb|Filter", coffeeId: "the-long-way", size: "2lb", grind: "Filter", qty: 1 }] : [])
    },
    { on: lines.length > 0, group: "Cart" },
  )

  const value: Store = {
    lines,
    add,
    setQty,
    remove,
    clear,
    ...totals,
    promo,
    applyPromo,
    unit,
    setUnit,
    drawer,
    setDrawer,
    subscription,
    setSubscription,
    lastAdded,
  }
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error("useStore outside StoreProvider")
  return store
}

/** A bag's weight in the visitor's unit: "12 oz" or "340 g". */
export function useWeight() {
  const { unit } = useStore()
  return (size: SizeId) => {
    const s = SIZES.find((x) => x.id === size) ?? SIZES[0]
    if (unit === "g") return s.grams >= 1000 ? `${(s.grams / 1000).toFixed(s.grams % 1000 ? 1 : 0)} kg` : `${s.grams} g`
    return s.ounces >= 32 ? `${s.ounces / 16} lb` : `${s.ounces} oz`
  }
}
