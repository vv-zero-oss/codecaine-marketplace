import { project } from "@/content"
import { Link } from "@/lib/router"
import { cn } from "@/lib/utils"

/**
 * The foot of every page that scrolls: the name, then one row of small print
 * — rights, the issue, and the photo credit. The way to the brand
 * guidelines sits opposite the name.
 */
export function SiteFooter({ tone = "day", className }: { tone?: "day" | "night"; className?: string }) {
  const muted = tone === "night" ? "text-night-muted" : "text-ink-muted"
  return (
    <footer className={cn("px-gutter pt-16 pb-8 text-caption font-mono uppercase tracking-label", className)}>
      <div className="flex items-baseline justify-between gap-6">
        <p className="text-label">{project.name}</p>
        <Link href="/brand" className="-my-3 py-3 underline-offset-4 hover:underline">
          Brand guidelines
        </Link>
      </div>
      <div className={cn("mt-10 grid grid-cols-1 gap-2 sm:grid-cols-3", muted)}>
        <p>All rights reserved © {project.since}–{new Date().getFullYear()}</p>
        <p className="sm:text-center">{project.issue} · {project.tagline}</p>
        <p className="sm:text-right">
          <a href="https://www.pexels.com" target="_blank" rel="noreferrer" className="underline-offset-4 hover:underline">
            {project.credits}
          </a>
        </p>
      </div>
    </footer>
  )
}
