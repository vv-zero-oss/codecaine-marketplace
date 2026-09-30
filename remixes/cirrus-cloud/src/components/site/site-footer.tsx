import { TetrisSkyline } from "@/components/motion/tetris-skyline"
import { closing } from "@/content"
import { Link } from "@/lib/router"

/** The page's foot: credits, then a skyline you can play. */
export function SiteFooter() {
  return (
    <footer className="mt-10">
      <p className="label px-gutter pb-8 text-center text-faint">
        © 2026 Cirrus · {closing.credits} ·{" "}
        <Link href="/brand" className="text-mute underline-offset-4 [@media(hover:hover)]:hover:text-ink [@media(hover:hover)]:hover:underline">
          Brand guidelines
        </Link>
      </p>
      <TetrisSkyline />
    </footer>
  )
}
