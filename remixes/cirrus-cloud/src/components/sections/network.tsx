import { Prose, SplitHeading, SplitSection } from "@/components/blocks/split-section"
import { CityLine, CITIES, type City } from "@/components/site/city-line"
import { Chip } from "@/components/ui/chip"
import { Container } from "@/components/ui/container"
import { networkPage } from "@/content"

/** Four numbers the network is held to. */
export function NetworkStats() {
  return (
    <section aria-label="The network in numbers" className="border-b border-hairline">
      <Container className="grid grid-cols-2 lg:grid-cols-4">
        {networkPage.stats.map((stat, i) => (
          <div key={stat.label} className={`py-10 ${i % 2 ? "pl-6" : ""} lg:pl-6 lg:first:pl-0 ${i > 0 ? "lg:border-l" : ""} ${i % 2 ? "border-l" : ""} border-hairline`}>
            <p className="text-heading text-ink tabular-nums">{stat.value}</p>
            <p className="label mt-3 text-mute">{stat.label}</p>
          </div>
        ))}
      </Container>
    </section>
  )
}

/** Every region, its city, whether it is new, and its latency. */
export function RegionTable() {
  const { regions } = networkPage
  return (
    <SplitSection id="regions" heading={regions.heading} label={regions.label}>
      <Prose>
        <p>{regions.body}</p>
      </Prose>
      <div className="mt-9 overflow-x-auto">
        <table className="w-full min-w-[26rem] border-t border-hairline text-left text-small">
          <thead>
            <tr className="label text-faint">
              <th className="py-3 font-normal">Code</th>
              <th className="py-3 font-normal">City</th>
              <th className="py-3 font-normal">Status</th>
              <th className="py-3 text-right font-normal">p50</th>
            </tr>
          </thead>
          <tbody>
            {regions.rows.map((row) => (
              <tr key={row.code} className="border-t border-hairline">
                <td className="py-3 font-mono text-[0.8125rem] text-ink">{row.code}</td>
                <td className="py-3 text-ink-soft">{row.city}</td>
                <td className="py-3">
                  <Chip tone={row.status === "new" ? "lime" : "ink"}>{row.status}</Chip>
                </td>
                <td className="py-3 text-right font-mono text-[0.8125rem] text-ink tabular-nums">{row.p50}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SplitSection>
  )
}

/** Five edges, each as a line drawing of its city. */
export function CityEdges() {
  const { cities } = networkPage
  return (
    <section id="cities" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={cities.heading} label={cities.label} className="max-w-[30rem]" />
        <ul className="mt-14 grid gap-px border border-hairline bg-hairline md:grid-cols-2">
          {cities.items.map((item, i) => (
            <CityCard key={item.city} city={item.city} note={item.note} wide={i === 0} />
          ))}
        </ul>
      </Container>
    </section>
  )
}

export function CityCard({ city, note, wide = false }: { city: City; note: string; wide?: boolean }) {
  const c = CITIES[city]
  return (
    <li className={`flex flex-col justify-between gap-6 bg-paper p-6 ${wide ? "md:col-span-2" : ""}`}>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-title text-ink">{c.name}</p>
        <Chip tone="ink">{c.code}</Chip>
      </div>
      <CityLine city={city} tone="navy" />
      <p className="text-small text-ink-soft">{note}</p>
    </li>
  )
}
