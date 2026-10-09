import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react"

import { FREE_SHIPPING, productById, type Cloth } from "@/content/shop"

/**
 * The shopping bag: lines, the open/closed state of its sheet, and a little
 * order history so "Place order" has somewhere to go. Kept in localStorage,
 * so the bag survives a reload the way a real shop's does.
 */
export type BagLine = { id: string; edition?: Cloth; qty: number }
export type Order = { number: string; total: number; items: number; placed: string }

type BagState = {
  lines: BagLine[]
  open: boolean
  setOpen: (open: boolean) => void
  add: (id: string, edition?: Cloth, qty?: number) => void
  setQty: (id: string, edition: Cloth | undefined, qty: number) => void
  remove: (id: string, edition?: Cloth) => void
  clear: () => void
  count: number
  subtotal: number
  shipping: number
  total: number
  /** Bumps on every add, so the header count can pulse. */
  pulse: number
  lastOrder: Order | null
  checkout: () => Order | null
}

const KEY = "ordinary-matter:bag"
const Ctx = createContext<BagState | null>(null)

function load(): BagLine[] {
  try {
    const raw = localStorage.getItem(KEY)
    const parsed = raw ? (JSON.parse(raw) as BagLine[]) : []
    return parsed.filter((l) => productById(l.id) && l.qty > 0)
  } catch {
    return []
  }
}

const same = (l: BagLine, id: string, edition?: Cloth) => l.id === id && l.edition === edition

export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<BagLine[]>(load)
  const [open, setOpen] = useState(false)
  const [pulse, setPulse] = useState(0)
  const [lastOrder, setLastOrder] = useState<Order | null>(null)

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(lines))
    } catch {
      /* private mode: the bag still works for this visit */
    }
  }, [lines])

  const add = useCallback((id: string, edition?: Cloth, qty = 1) => {
    setLines((prev) => {
      const hit = prev.find((l) => same(l, id, edition))
      if (hit) return prev.map((l) => (same(l, id, edition) ? { ...l, qty: Math.min(9, l.qty + qty) } : l))
      return [...prev, { id, edition, qty }]
    })
    setPulse((n) => n + 1)
    setLastOrder(null)
  }, [])

  const setQty = useCallback((id: string, edition: Cloth | undefined, qty: number) => {
    setLines((prev) => (qty <= 0 ? prev.filter((l) => !same(l, id, edition)) : prev.map((l) => (same(l, id, edition) ? { ...l, qty: Math.min(9, qty) } : l))))
  }, [])

  const remove = useCallback((id: string, edition?: Cloth) => setLines((prev) => prev.filter((l) => !same(l, id, edition))), [])
  const clear = useCallback(() => setLines([]), [])

  const count = lines.reduce((n, l) => n + l.qty, 0)
  const subtotal = lines.reduce((n, l) => n + (productById(l.id)?.price ?? 0) * l.qty, 0)
  const shipping = subtotal === 0 || subtotal >= FREE_SHIPPING ? 0 : 8
  const total = subtotal + shipping

  const checkout = useCallback(() => {
    if (!lines.length) return null
    const order: Order = {
      number: `OM-${String(Date.now()).slice(-6)}`,
      total,
      items: count,
      placed: new Date().toLocaleDateString("en-GB", { day: "numeric", month: "long" }),
    }
    setLastOrder(order)
    setLines([])
    return order
  }, [lines.length, total, count])

  const value = useMemo(
    () => ({ lines, open, setOpen, add, setQty, remove, clear, count, subtotal, shipping, total, pulse, lastOrder, checkout }),
    [lines, open, add, setQty, remove, clear, count, subtotal, shipping, total, pulse, lastOrder, checkout],
  )
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useBag() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useBag outside BagProvider")
  return ctx
}

export const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 0 })}`
