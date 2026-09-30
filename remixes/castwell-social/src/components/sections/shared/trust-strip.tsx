import { Aperture, Bird, Flame, Leaf, Mountain, Shell } from "lucide-react"

import { Container } from "@/components/ui/container"

const BRANDS = [
  { name: "Northloop", icon: Aperture, style: "font-semibold tracking-tight" },
  { name: "FERNBROOK", icon: Leaf, style: "font-medium tracking-[0.2em] text-[13px]" },
  { name: "oddbird", icon: Bird, style: "font-semibold lowercase" },
  { name: "Kiln & Co", icon: Flame, style: "font-serif text-xl" },
  { name: "PEAKFORM", icon: Mountain, style: "font-semibold tracking-[0.12em] text-[13px]" },
  { name: "Tidewell", icon: Shell, style: "font-medium italic" },
]

/** A single row of customer marks under the hero. */
export function TrustStrip({ label = "Trusted by brand teams who post every day." }: { label?: string }) {
  return (
    <div className="border-b border-line bg-page">
      <Container className="flex flex-col items-center gap-6 py-8 lg:flex-row lg:gap-10 lg:py-7">
        <p className="shrink-0 text-center text-[12px] text-muted lg:w-44 lg:text-left">{label}</p>
        <ul className="grid w-full grid-cols-2 items-center gap-x-6 gap-y-5 sm:grid-cols-3 lg:flex lg:flex-1 lg:justify-between">
          {BRANDS.map(({ name, icon: Icon, style }) => (
            <li key={name} className="flex items-center justify-center gap-1.5 text-[17px] text-ink/55">
              <Icon className="size-4" strokeWidth={2.2} />
              <span className={style}>{name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </div>
  )
}
