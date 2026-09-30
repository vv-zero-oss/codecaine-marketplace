import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this site: a handful of pages and one pattern
 * (`/work/<slug>`).
 *
 * Real paths rather than `#/` ones, so the editor's Pages list and a link
 * pasted from the address bar name the same page. Page changes go through the
 * brush transition when one is mounted (see `components/motion/brush-transition.tsx`):
 * `Link` asks it to cover the screen first, and the transition calls
 * `navigate` once it has.
 */
const NAVIGATE = "kerfuffle:navigate"
const REQUEST = "kerfuffle:request-navigate"

/** Where the site is served from, without the trailing slash: "" under the dev
 *  server, `/…/demos/kerfuffle-studio` when the built site sits in a folder. */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

export function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1") || "/"
}

/** Changes page at once. */
export function navigate(to: string) {
  const [path, hash] = to.split("#")
  if (path !== sitePath()) {
    window.history.pushState(null, "", BASE + to)
    window.dispatchEvent(new Event(NAVIGATE))
  }
  if (hash) {
    requestAnimationFrame(() => document.getElementById(hash)?.scrollIntoView())
  } else {
    window.scrollTo(0, 0)
  }
}

/** Changes page through the transition if one is listening, at once if not. */
export function requestNavigate(to: string) {
  const event = new CustomEvent(REQUEST, { detail: to, cancelable: true })
  // A listener that takes over calls preventDefault and navigates itself.
  if (window.dispatchEvent(event)) navigate(to)
}

export function onNavigateRequest(handler: (to: string) => boolean) {
  const listener = (event: Event) => {
    if (handler((event as CustomEvent<string>).detail)) event.preventDefault()
  }
  window.addEventListener(REQUEST, listener)
  return () => window.removeEventListener(REQUEST, listener)
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
    requestNavigate(href)
  }
  return <a href={href.startsWith("/") ? BASE + href : href} onClick={handle} {...props} />
}

export function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(href + "/")
}
