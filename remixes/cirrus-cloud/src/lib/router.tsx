import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this site: a handful of paths.
 *
 * Not react-router, on purpose. A remix is something a person reads before
 * they change it, and forty lines they can see are easier to replace with the
 * router they prefer than a dependency they have to learn first. Real paths
 * rather than `#/` ones, so the editor's Pages list and a link pasted from the
 * address bar name the same page.
 */
const NAVIGATE = "cirrus:navigate"

/**
 * Where the site is served from, without the trailing slash: "" under the dev
 * server, `/…/demos/cirrus-cloud` when the built site is served from
 * a folder. A build made with `--base ./` knows its base only relative to the
 * page it loaded on, so it is read once, from that first address. Every path
 * the site names is a site path ("/portfolio"); this is added on the way out
 * to the address bar and taken off on the way in.
 */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/") || "/"
}

/** A site path as the address bar needs it, with the base in front. */
export function withBase(path: string) {
  return BASE + path
}

export function navigate(to: string) {
  const [path, hash] = to.split("#")
  const scroll = () => {
    const target = hash ? document.getElementById(hash) : null
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" })
    else window.scrollTo(0, 0)
  }
  if ((path || "/") === sitePath()) {
    if (hash) window.history.replaceState(null, "", BASE + to)
    scroll()
    return
  }
  window.history.pushState(null, "", BASE + to)
  window.dispatchEvent(new Event(NAVIGATE))
  // The new page renders on this event; scroll once it has.
  requestAnimationFrame(() => requestAnimationFrame(scroll))
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
  return <a href={href.startsWith("/") ? BASE + href : href} onClick={handle} {...props} />
}
