import { Container } from "@/components/ui/container"
import { STATS } from "@/content"

export function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <dt className="text-4xl font-semibold tracking-tight">{value}</dt>
      <dd className="mx-auto mt-2 max-w-56 text-sm text-quartz-600">{label}</dd>
    </div>
  )
}

export function Stats() {
  return (
    <section id="stats" className="py-20">
      <Container>
        <dl className="grid gap-10 text-center sm:grid-cols-3">
          {STATS.map((stat) => (
            <Stat key={stat.label} {...stat} />
          ))}
        </dl>
      </Container>
    </section>
  )
}
