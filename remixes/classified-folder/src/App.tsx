/**
 * Classified — one folder on a warm desk, and the one secret it keeps.
 *
 * Hover to peek, click to read. The folder is `ClassifiedFolder` in
 * `components/motion/`, with every knob as a prop; `/brand` is the style guide.
 */

import { ClassifiedFolder } from "@/components/motion/classified-folder"
import { Link, usePathname } from "@/lib/router"
import { BrandPage } from "@/pages/brand"

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design (see CLAUDE.md, section 10). */
export default function App() {
  const pathname = usePathname()
  if (pathname === "/brand") {
    return (
      <div className="min-h-svh bg-desk text-ink" data-canvas-ignore>
        <BrandPage />
      </div>
    )
  }
  return (
    <div className="relative min-h-svh bg-desk text-ink" data-canvas-ignore>
      <main data-canvas-ignore className="grid min-h-svh place-items-center px-4 py-16">
        <ClassifiedFolder />
      </main>
      <Link href="/brand" className="absolute right-5 bottom-4 font-mono text-[11px] tracking-[0.06em] text-ink-mute uppercase transition-colors hover:text-ink">
        Brand guidelines
      </Link>
    </div>
  )
}
