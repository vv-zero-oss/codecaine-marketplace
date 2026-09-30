import { Check, Minus } from "lucide-react"

import { SplitHeading } from "@/components/blocks/split-section"
import { Container } from "@/components/ui/container"
import { pricingPage } from "@/content"

/** Every plan's limits, row by row. */
export function Compare() {
  const { compare } = pricingPage
  return (
    <section id="compare" className="py-[calc(var(--spacing-section)/2)]">
      <Container>
        <SplitHeading heading={compare.heading} label={compare.label} className="max-w-[30rem]" />
        <div className="mt-12 overflow-x-auto">
          <table className="w-full min-w-[36rem] text-left text-small">
            <thead>
              <tr className="border-b border-ink">
                <th className="label py-3 font-normal text-faint">Feature</th>
                {compare.columns.map((column) => (
                  <th key={column} className="py-3 text-base font-normal text-ink">
                    {column}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {compare.rows.map((row) => (
                <tr key={row.feature} className="border-b border-hairline">
                  <th scope="row" className="py-3.5 pr-6 font-normal text-ink-soft">
                    {row.feature}
                  </th>
                  {row.values.map((value, i) => (
                    <td key={i} className="py-3.5 pr-6 text-ink">
                      <CompareValue value={value} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Container>
    </section>
  )
}

function CompareValue({ value }: { value: string }) {
  if (value === "yes") return <Check aria-label="Included" className="size-4 text-cobalt" />
  if (value === "—") return <Minus aria-label="Not included" className="size-4 text-faint" />
  return <>{value}</>
}
