import { PageHero } from "@/components/blocks/page-hero"
import { ServerFarm } from "@/components/motion/server-farm"
import { masthead } from "@/content"

/** The home page's top: the page hero over the server room at night. */
export function Masthead() {
  return (
    <PageHero title={masthead.title} strap={masthead.strap} blurb={masthead.blurb}>
      <ServerRoom />
    </PageHero>
  )
}

/** The server room band, with its legend. */
export function ServerRoom({ traffic = 1 }: { traffic?: number }) {
  return (
    <div className="relative">
      <ServerFarm traffic={traffic} />
      <FarmLegend />
    </div>
  )
}

const LEGEND = [
  { label: "Cache hit", color: "bg-cyan" },
  { label: "Miss → origin", color: "bg-signal" },
  { label: "Replication", color: "bg-violet" },
] as const

/** What the colours in the server room mean. */
export function FarmLegend() {
  return (
    <ul className="label pointer-events-none absolute top-[calc(var(--spacing-pixel)*1.1)] right-gutter hidden gap-5 text-rack-label md:flex">
      {LEGEND.map((item) => (
        <li key={item.label} className="flex items-center gap-2">
          <span aria-hidden className={`size-2 ${item.color}`} />
          {item.label}
        </li>
      ))}
    </ul>
  )
}
