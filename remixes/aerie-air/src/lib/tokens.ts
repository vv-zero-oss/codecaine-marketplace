import { useLayoutEffect, useState } from "react"

/**
 * A colour token from `index.css`, resolved to its value — for motion
 * values that interpolate between colours (Framer Motion cannot blend two
 * `var()`s). Re-read on mount, so a changed token still flows through.
 */
export function useTokens<const K extends string>(names: K[], fallback = "#000000"): Record<K, string> {
  const read = () =>
    Object.fromEntries(
      names.map((n) => [n, getComputedStyle(document.documentElement).getPropertyValue(`--color-${n}`).trim() || fallback]),
    ) as Record<K, string>
  const [values, setValues] = useState(read)
  useLayoutEffect(() => setValues(read()), [names.join(",")])
  return values
}
