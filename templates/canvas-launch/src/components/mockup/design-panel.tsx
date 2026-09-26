import {
  AlignCenter,
  AlignHorizontalJustifyCenter,
  AlignHorizontalJustifyEnd,
  AlignHorizontalJustifyStart,
  AlignLeft,
  AlignRight,
  AlignVerticalJustifyCenter,
  AlignVerticalJustifyEnd,
  AlignVerticalJustifyStart,
  Blend,
  ChevronDown,
  Columns2,
  Contrast,
  EyeOff,
  Grid2x2,
  PanelTop,
  Plus,
  Rows2,
  Scan,
  SquareRoundCorner,
  type LucideIcon,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Combo, Field, NumberBox, Row, Section, Segmented, Select } from "./controls"

/**
 * The editor's Design panel with a framed project's `ButtonLink` selected —
 * the sections, controls and values the real inspector shows for it, in order.
 */
export function DesignPanel({ editing = false }: { editing?: boolean }) {
  return (
    <aside className="flex h-full w-[259px] shrink-0 flex-col overflow-hidden border-l border-ed-line bg-ed-panel">
      <div className="flex items-center justify-between border-b border-ed-line px-2 pt-2 pb-3">
        <Segmented items={["Design", "Attributes"]} className="w-[149px]" />
        <span className="flex items-center gap-1 pr-2 text-[11px] text-ed-text">
          100% <ChevronDown className="size-3 text-ed-text-2" strokeWidth={1.5} />
        </span>
      </div>
      <div className="flex h-10 shrink-0 items-center justify-between pr-2 pl-4">
        <span className="text-[13px] font-semibold text-ed-text">ButtonLink</span>
        <span className="grid h-8 w-[66px] place-items-center rounded-[5px] bg-ed-ink text-[11px] font-medium text-white">
          Preview
        </span>
      </div>
      <Section title="State">
        <Segmented items={["Default", "Hover", "More"]} active={editing ? 1 : 0} />
      </Section>
      <Section title="Position">
        <Select value="Static" />
        <Field label="Alignment">
          <Row className="gap-1.5">
            <ButtonGroup icons={[AlignHorizontalJustifyStart, AlignHorizontalJustifyCenter, AlignHorizontalJustifyEnd]} active={0} />
            <ButtonGroup icons={[AlignVerticalJustifyStart, AlignVerticalJustifyCenter, AlignVerticalJustifyEnd]} dim />
          </Row>
        </Field>
      </Section>
      <Section title="Size" action={<Plus className="mr-1 size-4 text-ed-text-2" strokeWidth={1.5} />}>
        <Row>
          <Field label="Width">
            <Combo value="Hug" />
          </Field>
          <Field label="Height">
            <Combo value="Hug" />
          </Field>
        </Row>
      </Section>
      <Section title="Layout">
        <Field label="Direction">
          <Segmented items={[PanelTop, Columns2, Rows2, Grid2x2, EyeOff]} active={1} />
        </Field>
        <Row>
          <Field label="Gap">
            <Combo value="8" icon={AlignVerticalJustifyCenter} />
          </Field>
          <Field label="Wrap">
            <Select value="No wrap" />
          </Field>
        </Row>
      </Section>
      <Section title="Padding">
        <Field label="All sides">
          <Combo value="Mixed" icon={Scan} />
        </Field>
        <Row>
          {[
            ["Top", "9"],
            ["Right", "16"],
            ["Bottom", "9"],
            ["Left", "16"],
          ].map(([label, value]) => (
            <Field key={label} label={label}>
              <NumberBox value={value} />
            </Field>
          ))}
        </Row>
      </Section>
      <Section title="Typography">
        <Select value="Inter" />
        <Row>
          <Select value="Medium" className="flex-1" />
          <Combo value="15" className="w-[72px]" />
        </Row>
        <Row className="gap-1.5">
          <ButtonGroup icons={[AlignLeft, AlignCenter, AlignRight]} active={1} />
        </Row>
      </Section>
      <Section title="Fill" action={<span className="mr-1 h-px w-2.5 bg-ed-text-2" />}>
        <ColorRow hex="141414" />
      </Section>
      <Section title="Appearance">
        <Row>
          <Field label="Opacity">
            <Combo value="100%" icon={Contrast} />
          </Field>
          <Field label="Blend mode">
            <Select value="Normal" icon={Blend} />
          </Field>
        </Row>
      </Section>
      <Section title="Border Radius">
        <Combo value="999" icon={SquareRoundCorner} />
      </Section>
      <Section title="Effects" action={<Plus className="mr-1 size-4 text-ed-text-2" strokeWidth={1.5} />} />
      <Section title="Filters" action={<Plus className="mr-1 size-4 text-ed-text-2" strokeWidth={1.5} />} />
    </aside>
  )
}

function ButtonGroup({ icons, active, dim }: { icons: LucideIcon[]; active?: number; dim?: boolean }) {
  return (
    <div className={cn("flex h-6 divide-x divide-white overflow-hidden rounded-[6px] bg-ed-field", dim && "opacity-60")}>
      {icons.map((Icon, i) => (
        <span
          key={i}
          className={cn("grid w-8 place-items-center", i === active ? "bg-ed-selected text-ed-accent" : "text-ed-text")}
        >
          <Icon className="size-3.5" strokeWidth={1.5} />
        </span>
      ))}
    </div>
  )
}

function ColorRow({ hex }: { hex: string }) {
  return (
    <div className="flex h-6 gap-px text-[11px] text-ed-text">
      <div className="flex flex-1 items-center gap-2 rounded-l-[6px] bg-ed-field px-2">
        <span className="size-3.5 rounded-[2px] bg-ed-ink ring-1 ring-black/10" />
        {hex}
      </div>
      <div className="flex w-14 items-center justify-center gap-1 rounded-r-[6px] bg-ed-field">
        100 <span className="text-ed-text-2">%</span>
      </div>
    </div>
  )
}
