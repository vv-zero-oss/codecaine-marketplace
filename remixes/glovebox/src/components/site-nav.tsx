import { useEffect, useState } from "react"

import { LogoMark } from "@/components/ui/logo-mark"
import { cn } from "@/lib/utils"

const links = [
  { href: "#features", label: "Product" },
  { href: "#proof", label: "Stories" },
]

/**
 * The nav: one small tray of white keys at the top centre. Over the hero's
 * footage the tray is frosted glass and the name sits beside the mark; once
 * the footage is behind you the tray turns to sand and the name folds away,
 * leaving just the mark.
 */
export function SiteNav() {
  const [onFootage, setOnFootage] = useState(true)
  useEffect(() => {
    const update = () => setOnFootage(window.scrollY < window.innerHeight * 1.1)
    update()
    window.addEventListener("scroll", update, { passive: true })
    return () => window.removeEventListener("scroll", update)
  }, [])

  const key =
    "flex h-11 items-center rounded-control bg-surface px-3.5 text-[15px] text-ink shadow-press transition-[background-color,transform] duration-(--duration-press) ease-(--ease-out) active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/25 sm:h-10 sm:px-3 hover:bg-surface-soft"

  return (
    <header data-canvas-ignore className="pointer-events-none fixed inset-x-0 top-3 z-40 flex justify-center px-3 sm:top-4">
      <nav
        aria-label="Main"
        className={cn(
          "pointer-events-auto flex items-center gap-1 rounded-[0.875rem] p-1 shadow-nav backdrop-blur-md transition-colors duration-500 ease-(--ease-out)",
          onFootage ? "bg-surface/20" : "bg-sand-deep/90",
        )}
      >
        <a href="#top" aria-label="Glovebox, back to top" className={cn(key, "gap-1.5 px-3")}>
          <LogoMark className="size-[18px]" />
          <span
            className="grid transition-[grid-template-columns,opacity] duration-500 ease-(--ease-out)"
            style={{ gridTemplateColumns: onFootage ? "1fr" : "0fr", opacity: onFootage ? 1 : 0 }}
          >
            <span className="overflow-hidden font-display text-[17px] leading-none tracking-[-0.01em]">Glovebox</span>
          </span>
        </a>
        {links.map((link) => (
          <a key={link.href} href={link.href} className={key}>
            {link.label}
          </a>
        ))}
        <a
          href="#top"
          className={cn(
            "flex h-11 items-center rounded-control px-3.5 text-[15px] transition-colors duration-(--duration-ui) sm:h-10 sm:px-3",
            onFootage
              ? "text-surface/85 hover:bg-surface/15"
              : "bg-sand-press text-ink-soft hover:text-ink",
          )}
        >
          Log in
        </a>
      </nav>
    </header>
  )
}
