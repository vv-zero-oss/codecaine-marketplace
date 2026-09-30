import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this site: two pages, the home page and `/brand`.
 *
 * Real paths rather than `#/` ones, so the editor's Pages list and a link
 * pasted from the address bar name the same page. Swap it for a real router
 * once the site has more than a handful of pages.
 */
const NAVIGATE = "glovebox:navigate"

/** Where the site is served from, without the trailing slash: "" under the dev
 *  server, `/…/demos/glovebox` when the built site sits in a folder. */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

export function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1") || "/"
}

/** A `#section` link that works from any page: as it is on the home page, and
 *  back to the home page's section from anywhere else. */
export function homeHref(hash: string, pathname: string): string {
  return pathname === "/" ? hash : `${BASE}/${hash}`
}

export function navigate(to: string) {
  if (to === sitePath()) return
  window.history.pushState(null, "", BASE + to)
  window.dispatchEvent(new Event(NAVIGATE))
  window.scrollTo(0, 0)
}

export function usePathname(): string {
  const [pathname, setPathname] = useState(sitePath)
  useEffect(() => {
    const update = () => setPathname(sitePath())
    window.addEventListener("popstate", update)
    window.addEventListener(NAVIGATE, update)
    return () => {
      window.removeEventListener("popstate", update)
      window.removeEventListener(NAVIGATE, update)
    }
  }, [])
  return pathname
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
  return <a href={href.startsWith("/") ? BASE + href : href} onClick={handle} {...props} />
}
