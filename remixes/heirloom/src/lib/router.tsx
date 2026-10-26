import { useEffect, useState, type ComponentProps, type MouseEvent } from "react"

/**
 * A router the size of this project: the home page, five inner pages and
 * `/brand`.
 *
 * Real paths rather than `#/` ones, so the editor's Pages list and a link
 * pasted from the address bar name the same page. Swap it for the router you
 * prefer once the project has more than a handful of pages.
 */
const NAVIGATE = "quartz:navigate"

/** Where the site is served from, without the trailing slash: "" under the dev
 *  server, `/…/demos/sdk-scaffold` when the built site sits in a folder. */
const BASE = new URL(import.meta.env.BASE_URL, window.location.href).pathname.replace(/\/$/, "")

function sitePath(): string {
  const { pathname } = window.location
  const path = BASE && pathname.startsWith(BASE) ? pathname.slice(BASE.length) : pathname
  return path.replace(/\/index\.html$/, "/").replace(/(.)\/$/, "$1") || "/"
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

/** The `href` and `onClick` an anchor needs to change page without a reload.
 *  For components that render their own `<a>` (so the editor reads their name,
 *  not `Link`). A modified click still opens a new tab. */
export function linkProps(href = "/", onClick?: (event: MouseEvent<HTMLAnchorElement>) => void) {
  const handle = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event)
    if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return
    if (!href.startsWith("/")) return
    event.preventDefault()
    navigate(href)
  }
  return { href: href.startsWith("/") ? BASE + href : href, onClick: handle }
}

/** An anchor that changes page without a reload. */
export function Link({ href, onClick, ...props }: ComponentProps<"a">) {
  return <a {...props} {...linkProps(href, onClick)} />
}
