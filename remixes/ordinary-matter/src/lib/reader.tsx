import { createContext, useContext, useMemo, useState, type ReactNode } from "react"

/**
 * Which story is open in the reader. Any card on any page opens it; the
 * reader itself lives once, in App.
 */
type ReaderState = { slug: string | null; openStory: (slug: string) => void; close: () => void }

const Ctx = createContext<ReaderState | null>(null)

export function ReaderProvider({ children }: { children: ReactNode }) {
  const [slug, setSlug] = useState<string | null>(null)
  const value = useMemo(() => ({ slug, openStory: setSlug, close: () => setSlug(null) }), [slug])
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useReader() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error("useReader outside ReaderProvider")
  return ctx
}
