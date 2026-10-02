import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this project: the home page, four inner pages, the
 * generator and `/brand`.
 *
 * Real paths rather than `#/` ones, so the editor's Pages list and a link
 * pasted from the address bar name the same page. Swap it for the router you
 * prefer once the project has more than a handful of pages.
 */
const NAVIGATE = "pixelkeep:navigate"

/** Where the site is served from, without the trailing slash: "" under the dev
 *  server, `/…/demos/sdk-scaffold` when the built site sits in a folder. */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1") || "/"
}

export function navigate(to: string) {
  const [path, hash] = to.split("#")
  const samePage = (path || sitePath()) === sitePath()
  if (!samePage || !hash) {
    if (to === sitePath() + window.location.search + window.location.hash) return
    window.history.pushState(null, "", BASE + (path || sitePath()) + (hash ? `#${hash}` : ""))
    window.dispatchEvent(new Event(NAVIGATE))
    window.scrollTo(0, 0)
  }
  if (hash) {
    // Wait a frame so the new page has mounted before scrolling to its anchor.
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" }))
  }
}

/** Swap the query string without adding a history entry. */
export function replaceSearch(search: string) {
  window.history.replaceState(null, "", BASE + sitePath() + (search ? `?${search}` : "") + window.location.hash)
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
    if (!href.startsWith("/") || props.target === "_blank") return
    event.preventDefault()
    navigate(href)
  }
  return <a href={href.startsWith("/") ? BASE + href : href} onClick={handle} {...props} />
}
