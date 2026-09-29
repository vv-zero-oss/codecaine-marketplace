import { useLayoutEffect, useRef } from "react"

/**
 * Sizes one line of display type to fill its parent's width exactly, whatever
 * the window: it measures the text at a known size and scales. The element
 * should be `w-max` so it measures its own text. Re-measures on resize and
 * once the web font has arrived (its widths differ from the fallback's).
 */
export function useFitText<T extends HTMLElement>(base = 100) {
  const ref = useRef<T>(null)
  useLayoutEffect(() => {
    const el = ref.current
    if (!el?.parentElement) return
    const parent = el.parentElement
    const fit = () => {
      el.style.fontSize = `${base}px`
      const width = el.getBoundingClientRect().width
      // Hidden at this width (the other breakpoint's copy): nothing to fit.
      if (!width || !parent.clientWidth) return
      const ratio = parent.clientWidth / width
      el.style.fontSize = `${Math.floor(base * ratio * 100) / 100}px`
    }
    fit()
    const ro = new ResizeObserver(fit)
    ro.observe(parent)
    document.fonts?.ready.then(fit)
    return () => ro.disconnect()
  }, [base])
  return ref
}
