import type * as React from "react"
import { Check, Clock, Minus, TriangleAlert, X } from "lucide-react"

import { Frame, Section } from "@/components/blocks/frame"
import { Reveal } from "@/components/blocks/reveal"
import { SectionHeading } from "@/components/blocks/section-heading"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { comparison, type Verdict } from "@/content"
import { cn } from "@/lib/utils"

const verdictIcon: Record<Verdict, React.ReactNode> = {
  good: <Check className="size-3 text-mint-strong" />,
  mid: <Clock className="size-3 text-amber" />,
  meh: <Minus className="size-3 text-ink-faint" />,
  bad: <TriangleAlert className="size-3 text-rose" />,
  none: <X className="size-3 text-ink-ghost" />,
}

/**
 * The comparison a buyer is already making in their head — us against an
 * agency, a freelancer and doing it themselves. Adwright's column is tinted
 * and carries the call to action under it. On a phone the table scrolls
 * sideways inside its own box; the page never does.
 */
export function Comparison() {
  return (
    <Section id="compare">
      <Frame>
        <Reveal>
          <SectionHeading bold={comparison.titleBold} light={comparison.titleLight} order="bold-first">
            {comparison.body}
          </SectionHeading>
        </Reveal>

        <Reveal delay={0.08} className="mt-12 md:mt-20">
          <div className="-mx-(--spacing-gutter) overflow-x-auto px-(--spacing-gutter) pb-2" data-lenis-prevent-horizontal>
            <Table className="min-w-[46rem] table-fixed border-separate border-spacing-0 text-[12px]">
              <TableHeader>
                <TableRow className="border-0 hover:bg-transparent">
                  <TableHead className="sticky left-0 z-10 h-10 w-[20%] rounded-tl-md bg-stone-2 px-4 text-[11px] font-normal text-ink-faint">
                    Compare
                  </TableHead>
                  {comparison.columns.map((col, i) => (
                    <TableHead
                      key={col}
                      className={cn(
                        "h-10 px-4 text-[11px] font-medium text-ink",
                        i === 0 ? "rounded-t-md bg-mint-wash" : "bg-stone-2",
                        i === comparison.columns.length - 1 && "rounded-tr-md",
                      )}
                    >
                      {col}
                    </TableHead>
                  ))}
                </TableRow>
              </TableHeader>
              <TableBody>
                {comparison.rows.map((row) => (
                  <TableRow key={row.label} className="border-0 hover:bg-transparent">
                    <TableCell className="sticky left-0 z-10 h-12 border-b border-line bg-canvas px-4 font-medium whitespace-normal text-ink">
                      <span className="mr-2 inline-block size-1 -translate-y-0.5 rounded-full bg-ink" />
                      {row.label}
                    </TableCell>
                    {row.cells.map(([verdict, text], i) => (
                      <TableCell
                        key={i}
                        className={cn(
                          "h-12 border-b px-4 whitespace-normal",
                          i === 0 ? "border-mint-tint bg-mint-wash text-ink" : "border-line text-ink-soft",
                        )}
                      >
                        <span className="flex items-center gap-2">
                          <span className="shrink-0">{verdictIcon[verdict]}</span>
                          {text}
                        </span>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
                <TableRow className="border-0 hover:bg-transparent">
                  <TableCell className="sticky left-0 bg-canvas" />
                  <TableCell className="rounded-b-md bg-mint-wash px-3 pt-3 pb-3">
                    <Button asChild variant="mint" size="cta" className="w-full">
                      <a href="#">{comparison.cta}</a>
                    </Button>
                  </TableCell>
                  <TableCell colSpan={3} />
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </Reveal>
      </Frame>
    </Section>
  )
}
