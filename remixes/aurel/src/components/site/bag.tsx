import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react"

import { products, type Product } from "@/content"

type Line = { slug: string; size: string; quantity: number }

type Bag = {
  lines: (Line & { product: Product })[]
  count: number
  total: number
  open: boolean
  setOpen: (open: boolean) => void
  add: (slug: string, size: string) => void
  remove: (slug: string, size: string) => void
}

const BagContext = createContext<Bag | null>(null)

export function useBag() {
  const bag = useContext(BagContext)
  if (!bag) throw new Error("useBag outside <BagProvider>")
  return bag
}

/** The shopping bag's state: what is in it, and whether its sheet is open. */
export function BagProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<Line[]>([])
  const [open, setOpen] = useState(false)

  const add = useCallback((slug: string, size: string) => {
    setLines((current) => {
      const found = current.find((line) => line.slug === slug && line.size === size)
      if (found) return current.map((line) => (line === found ? { ...line, quantity: line.quantity + 1 } : line))
      return [...current, { slug, size, quantity: 1 }]
    })
  }, [])
  const remove = useCallback((slug: string, size: string) => {
    setLines((current) => current.filter((line) => !(line.slug === slug && line.size === size)))
  }, [])

  const value = useMemo<Bag>(() => {
    const full = lines.map((line) => ({ ...line, product: products.find((p) => p.slug === line.slug)! })).filter((line) => line.product)
    return {
      lines: full,
      count: full.reduce((sum, line) => sum + line.quantity, 0),
      total: full.reduce((sum, line) => sum + line.quantity * line.product.price, 0),
      open,
      setOpen,
      add,
      remove,
    }
  }, [lines, open, add, remove])

  return <BagContext.Provider value={value}>{children}</BagContext.Provider>
}

export const euro = (value: number) => new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(value)
