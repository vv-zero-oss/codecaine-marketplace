import { useEffect, useState } from "react"

/** The window's size, kept current on resize. */
export function useViewport() {
  const [size, setSize] = useState(() => ({ w: window.innerWidth, h: window.innerHeight }))
  useEffect(() => {
    let frame = 0
    const onResize = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => setSize({ w: window.innerWidth, h: window.innerHeight }))
    }
    window.addEventListener("resize", onResize)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("resize", onResize)
    }
  }, [])
  return size
}

/** True on a device with a real hover (a mouse or trackpad). */
export function useFinePointer() {
  const [fine, setFine] = useState(() => window.matchMedia("(hover: hover) and (pointer: fine)").matches)
  useEffect(() => {
    const query = window.matchMedia("(hover: hover) and (pointer: fine)")
    const onChange = () => setFine(query.matches)
    query.addEventListener("change", onChange)
    return () => query.removeEventListener("change", onChange)
  }, [])
  return fine
}
