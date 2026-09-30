import { Fragment } from "react"
import { Check, Minus } from "lucide-react"

import { Reveal } from "@/components/motion/reveal"
import { Container } from "@/components/ui/container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Section } from "@/components/sections/shared/section"

type Cell = boolean | string

const ROWS: { group: string; rows: [string, Cell, Cell, Cell][] }[] = [
  {
    group: "Publishing",
    rows: [
      ["Connected channels", "3", "12", "Unlimited"],
      ["Best-time scheduling", true, true, true],
      ["Multi-market time zones", false, true, true],
      ["Approval workflows", false, true, true],
    ],
  },
  {
    group: "AI team",
    rows: [
      ["AI captions", "300 / mo", "Unlimited", "Unlimited"],
      ["AI Marketing Manager", false, true, true],
      ["Community reply agent", false, true, true],
      ["Custom agents", false, false, true],
    ],
  },
  {
    group: "Video studio",
    rows: [
      ["Video renders", "20 / mo", "150 / mo", "Unlimited"],
      ["Clip finder for long video", false, true, true],
      ["Voiceover languages", "5", "38", "38 + custom voice"],
    ],
  },
  {
    group: "Team & security",
    rows: [
      ["Seats", "1", "5", "Unlimited"],
      ["Audit trail export", false, false, true],
      ["SSO and SCIM", false, false, true],
    ],
  },
]

function Value({ v }: { v: Cell }) {
  if (v === true) return <Check className="mx-auto size-4 text-mint-ink" aria-label="Included" />
  if (v === false) return <Minus className="mx-auto size-4 text-line-strong" aria-label="Not included" />
  return <span className="text-[12px] whitespace-normal text-ink md:text-[13px]">{v}</span>
}

export function ComparePlans() {
  return (
    <Section tone="sage">
      <Container>
        <SectionHeading eyebrow="Compare plans" title="Everything in each plan" />
        <Reveal className="mx-auto mt-12 max-w-5xl overflow-x-auto border border-line bg-page md:mt-16">
          <Table className="table-fixed">
            <TableHeader>
              <TableRow className="border-line hover:bg-transparent">
                <TableHead className="w-[34%] px-3 text-[12px] text-muted md:w-[40%] md:px-6" />
                {["Starter", "Growth", "Scale"].map((p) => (
                  <TableHead key={p} className="px-1 text-center font-serif text-base font-light text-ink md:text-[1.15rem]">
                    {p}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {ROWS.map((g) => (
                <Fragment key={g.group}>
                  <TableRow className="border-line bg-panel hover:bg-panel">
                    <TableCell colSpan={4} className="px-4 py-3 text-[12px] font-medium text-muted md:px-6">
                      {g.group}
                    </TableCell>
                  </TableRow>
                  {g.rows.map(([label, a, b, c]) => (
                    <TableRow key={label} className="border-line hover:bg-sage/50">
                      <TableCell className="px-3 py-3.5 text-[13px] whitespace-normal text-ink md:px-6 md:text-[14px]">{label}</TableCell>
                      <TableCell className="px-1 text-center whitespace-normal"><Value v={a} /></TableCell>
                      <TableCell className="bg-mint-soft/15 px-1 text-center whitespace-normal"><Value v={b} /></TableCell>
                      <TableCell className="px-1 text-center whitespace-normal"><Value v={c} /></TableCell>
                    </TableRow>
                  ))}
                </Fragment>
              ))}
            </TableBody>
          </Table>
        </Reveal>
      </Container>
    </Section>
  )
}
