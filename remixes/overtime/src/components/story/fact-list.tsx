import { TypeReveal } from "@/components/ui/type-reveal"
import type { Person } from "@/content"
import { cn } from "@/lib/utils"

/**
 * The facts beside a portrait — name, where and when, the work, the age —
 * each typed in behind a block cursor, one after another, as the page opens.
 */
export function FactList({ person, className }: { person: Person; className?: string }) {
  const rows: [string, string][][] = [
    [["Name", person.name]],
    [
      ["Place of birth", person.born],
      ["Date of birth", person.bornOn],
    ],
    [
      ["Worked as", person.trade],
      ["On the quay", person.years],
    ],
    [["Age", `${person.age} years old`]],
  ]

  let delay = 450
  return (
    <dl className={cn("flex flex-col gap-5", className)}>
      {rows.map((row, r) => (
        <div key={r} className="grid grid-cols-2 gap-x-6">
          {row.map(([label, value]) => {
            const at = delay
            delay += 140
            return (
              <div key={label} className={cn(row.length === 1 && "col-span-2")}>
                <dt className="text-ink-muted">{label}</dt>
                <dd>
                  <TypeReveal text={value} delay={at} />
                </dd>
              </div>
            )
          })}
        </div>
      ))}
    </dl>
  )
}
