import { Container } from "@/components/ui/container"
import { CountUp } from "@/components/sections/story/count-up"

const NUMBERS = [
  { value: 380, suffix: " kg", label: "Roasted every week, five kilos at a time" },
  { value: 14, suffix: "", label: "Producers we buy from, every one by name" },
  { value: 612, suffix: "", label: "Records behind the Elm Street bar" },
  { value: 10, suffix: " yrs", label: "On Foundry Lane, and counting" },
]

/** The run-out groove: four numbers that count up as they arrive. */
export function StoryNumbers() {
  return (
    <section className="border-b border-line">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {NUMBERS.map((n, i) => (
          <div key={n.label} className={`space-y-2 border-b border-line py-10 lg:border-b-0 lg:border-r lg:px-6 lg:first:pl-0 lg:last:border-r-0 ${i % 2 === 0 ? "border-r pr-4" : "pl-4"}`}>
            <CountUp value={n.value} suffix={n.suffix} className="type-display block text-h1" />
            <p className="max-w-[24ch] text-[14px] text-ink-2">{n.label}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}
