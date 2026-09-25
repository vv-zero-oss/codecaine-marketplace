import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this site: five paths and one with a parameter.
 *
 * Not react-router, on purpose. A template is something a person reads before
 * they change it, and forty lines they can see are easier to replace with the
 * router they prefer than a dependency they have to learn first. Real paths
 * rather than `#/` ones, so the editor's Pages list and a link pasted from the
 * address bar name the same page.
 */
const NAVIGATE = "photographer:navigate"

export function navigate(to: string) {
  if (to === window.location.pathname) return
  window.history.pushState(null, "", to)
  window.dispatchEvent(new Event(NAVIGATE))
  window.scrollTo(0, 0)
}

export function usePathname(): string {
  const [pathname, setPathname] = useState(() => window.location.pathname)
  useEffect(() => {
    const update = () => setPathname(window.location.pathname)
    window.addEventListener("popstate", update)
    window.addEventListener(NAVIGATE, update)
    return () => {
      window.removeEventListener("popstate", update)
      window.removeEventListener(NAVIGATE, update)
    }
  }, [])
  return pathname
}

/** `/portfolio/:slug` → `{ slug }`, or null when the path is another shape. */
export function matchPath(pattern: string, pathname: string): Record<string, string> | null {
  const want = pattern.split("/").filter(Boolean)
  const have = pathname.split("/").filter(Boolean)
  if (want.length !== have.length) return null
  const params: Record<string, string> = {}
  for (const [index, part] of want.entries()) {
    if (part.startsWith(":")) params[part.slice(1)] = decodeURIComponent(have[index])
    else if (part !== have[index]) return null
  }
  return params
}

/** An anchor that changes page without a reload — and is still an anchor, so
 *  a modified click opens a new tab the way a person expects. */
export function Link({ href = "/", onClick, ...props }: ComponentProps<"a">) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    if (!href.startsWith("/")) return
    event.preventDefault()
    navigate(href)
  }
  return <a href={href} onClick={handle} {...props} />
}
