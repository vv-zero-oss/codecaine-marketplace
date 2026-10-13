import { useSmoothScroll } from "@/components/motion"
import { Features } from "@/components/sections/features"
import { Hero } from "@/components/sections/hero"

/** The page grows one section at a time, in the order they appear on it. */
const SECTIONS: { id: string; Section: () => React.ReactNode }[] = [
  { id: "top", Section: Hero },
  { id: "features", Section: Features },
]

/** `data-canvas-ignore` on the page wrapper and `<main>`: structural, with
 *  nothing of their own to design (see CLAUDE.md). */
export default function App() {
  useSmoothScroll()

  return (
    <div className="bg-white text-neutral-900" data-canvas-ignore>
      <main data-canvas-ignore>
        {SECTIONS.map(({ id, Section }) => (
          <Section key={id} />
        ))}
      </main>
    </div>
  )
}
