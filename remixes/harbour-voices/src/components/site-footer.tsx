import { project } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The foot of every page that scrolls: the name, then one row of small print
 * — rights, the city, and the photo credit.
 */
export function SiteFooter({ tone = "day", className }: { tone?: "day" | "night"; className?: string }) {
  const muted = tone === "night" ? "text-night-muted" : "text-ink-muted"
  return (
    <footer className={cn("px-gutter pt-16 pb-8 text-caption uppercase tracking-label", className)}>
      <p className="text-label">{project.name}</p>
      <div className={cn("mt-10 grid grid-cols-1 gap-2 sm:grid-cols-3", muted)}>
        <p>All rights reserved © {project.since}–{new Date().getFullYear()}</p>
        <p className="sm:text-center">Port of {project.city}</p>
        <p className="sm:text-right">
          <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            {project.credits}
          </a>
        </p>
      </div>
    </footer>
  )
}
