import { TetrisSkyline } from "@/components/motion/tetris-skyline"
import { closing } from "@/content"

/** The page's foot: credits, then a skyline you can play. */
export function SiteFooter() {
  return (
    <footer className="mt-10">
      <p className="label px-gutter pb-8 text-center text-faint">
        © 2026 Cirrus · {closing.credits}
      </p>
      <TetrisSkyline />
    </footer>
  )
}
