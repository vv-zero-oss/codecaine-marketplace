import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this project: four pages and a brand guide.
 *
 * Real paths rather than `#/` ones, so the editor's Pages list and a link
 * pasted from the address bar name the same page. Swap it for the router you
 * prefer once the project has more than a handful of pages.
 */
const NAVIGATE = "cairn:navigate"

/** Where the site is served from, without the trailing slash: "" under the dev
 *  server, `/…/demos/cairn` when the built site sits in a folder. */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1") || "/"
}

/** Scroll a section into view under the fixed header. */
function scrollToHash(hash: string) {
  const el = hash ? document.getElementById(decodeURIComponent(hash.slice(1))) : null
  if (!el) return false
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 80 })
  return true
}

/** Change page. A `?query` and a `#section` are kept: the query for the
 *  page to read (`useSearch`), the hash scrolled to once the page renders. */
export function navigate(to: string) {
  const url = new URL(to, window.location.origin)
  const samePage = url.pathname === sitePath() && url.search === window.location.search
  if (samePage && url.hash) {
    window.history.pushState(null, "", BASE + to)
    scrollToHash(url.hash)
    return
  }
  if (samePage && !url.hash) return
  window.history.pushState(null, "", BASE + to)
  window.dispatchEvent(new Event(NAVIGATE))
  if (url.hash) requestAnimationFrame(() => requestAnimationFrame(() => scrollToHash(url.hash) || window.scrollTo(0, 0)))
  else window.scrollTo(0, 0)
}

/** The query string, kept current across navigation. */
export function useSearch(): URLSearchParams {
  const [search, setSearch] = useState(() => window.location.search)
  useEffect(() => {
    const update = () => setSearch(window.location.search)
    window.addEventListener("popstate", update)
    window.addEventListener(NAVIGATE, update)
    return () => {
      window.removeEventListener("popstate", update)
      window.removeEventListener(NAVIGATE, update)
    }
  }, [])
  return new URLSearchParams(search)
}

/** Replace the query without a new history entry — for filters. */
export function replaceSearch(params: URLSearchParams) {
  const query = params.toString()
  window.history.replaceState(null, "", BASE + sitePath() + (query ? `?${query}` : ""))
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
