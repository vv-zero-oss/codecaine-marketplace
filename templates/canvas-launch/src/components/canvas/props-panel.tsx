/**
 * The inspector's Attributes tab with a component's props in it — what
 * `@canvas/react` hands the editor — ported from canvas:
 *
 *   - `design/InspectorChrome.tsx` — the Design / Attributes tabs and the zoom,
 *     drawn from the markup the editor renders (its `Tabs` is Fluid
 *     Functionalism's, whose sliding chip is a sized box; here the chip sits
 *     inside the active tab, at the same 2px inset, 24px height and 6px round);
 *   - `design/PanelHeader.tsx` — the layer's name;
 *   - `design/AttributesPanel.tsx`'s `ComponentPropsSection` and
 *     `ComponentPropField` — the "Component props" group, one row per prop,
 *     a closed set of values as a dropdown;
 *   - `ui/Panel.tsx`'s `Section`, `Row` and `Field`, `ui/InfoTip.tsx`'s ⓘ;
 *   - `ui/SelectInput.tsx` over `components/ui/select.tsx` — the 24px filled
 *     strip, and the menu it opens.
 *
 * What changed to fit a static page, and nothing else:
 *   - Radix Select and Tooltip are replaced by the markup they render:
 *     `openField` draws that field's menu open under it, `highlighted` the row
 *     under the pointer. Nothing opens on a click.
 *   - A field without `options` is shown as the panel's text field would show
 *     it (the same 24px strip, without the chevron).
 *   - The editor's composite utilities are spelled out: `ed-text-control` is
 *     `text-2xs font-control tracking-control`, `ed-bar-40` is `h-[40px]`,
 *     shadcn's `bg-popover` is `bg-ed-panel`, canvas's `rounded-lg` is 12px,
 *     and the tab track's `bg-muted` is `bg-ed-input`.
 *   - `source` is not printed — the editor's panel does not show where a
 *     component is defined; it is the component name's `title` here.
 */
import { cn } from "@/lib/utils";
import { HugeiconsIcon } from "@hugeicons/react";
import { ChevronDownIcon as HgChevronDown } from "@hugeicons/core-free-icons";
import { ChevronRightIcon, InfoIcon } from "./icons";

const LABEL = "truncate text-3xs leading-4 font-medium tracking-control-tight text-ed-text-secondary";
const CONTROL_TEXT = "text-2xs font-control tracking-control";

export interface PropField {
  name: string;
  value: string;
  /** The closed set the project's types allow — a dropdown when present. */
  options?: string[];
}

export interface PropsPanelProps {
  /** The component the selected element is the root of — "Button". */
  component: string;
  /** Where it is defined. Not drawn (see the header). */
  source?: string;
  fields: PropField[];
  /** A field whose dropdown is drawn open. */
  openField?: string;
  /** The option under the pointer in the open menu. */
  highlighted?: string;
  /** The layer's name in the panel header; the component's by default. */
  layer?: string;
  /** The element's tag, for the header's ⓘ. */
  tag?: string;
  /** Which tab the chrome shows as chosen. */
  tab?: "design" | "attributes";
  /** The zoom field's reading. */
  zoom?: string;
  className?: string;
}

export function PropsPanel({
  component,
  source,
  fields,
  openField,
  highlighted,
  layer,
  tag = "button",
  tab = "attributes",
  zoom = "100%",
  className,
}: PropsPanelProps) {
  const title = layer ?? component;
  return (
    <div className={cn("flex h-full min-h-0 flex-col bg-ed-panel text-ed-text", className)}>
      <InspectorChrome tab={tab} zoom={zoom} />
      <div className="flex h-full min-h-0 flex-col">
        <PanelHeader
          title={title}
          info={`Rendered as <${tag}>. Everything below is set on the element itself.`}
        />
        <div className="min-h-0 flex-1">
          <Section
            title="Component props"
            info="Read from the running app, and written back to it: a change here renders that component now, and lasts until its parent renders it again or the page reloads. The project's own source is untouched."
          >
            <div>
              <div className="flex items-center gap-1 px-4 pt-2 pb-1">
                <span className="text-2xs leading-4 font-medium text-ed-text" title={source}>
                  {component}
                </span>
              </div>
              {fields.map((field) => (
                <Row key={field.name}>
                  <Field label={field.name}>
                    <SelectStrip
                      value={field.value}
                      options={field.options}
                      open={openField === field.name}
                      highlighted={highlighted}
                    />
                  </Field>
                </Row>
              ))}
            </div>
          </Section>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * InspectorChrome
 * ------------------------------------------------------------------ */
function InspectorChrome({ tab, zoom }: { tab: "design" | "attributes"; zoom: string }) {
  const tabs: Array<{ value: "design" | "attributes"; label: string }> = [
    { value: "design", label: "Design" },
    { value: "attributes", label: "Attributes" },
  ];
  return (
    <div className="flex shrink-0 flex-col border-b border-ed-border bg-ed-panel px-2 pt-2 pb-3">
      <div className="flex items-center justify-between">
        <div className="flex shrink-0 items-center">
          <div
            role="tablist"
            aria-label="Inspector"
            className="relative inline-flex items-center rounded-[8px] bg-ed-input p-0.5 select-none"
          >
            {tabs.map(({ value, label }) => {
              const active = value === tab;
              return (
                <button
                  key={value}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  data-state={active ? "active" : "inactive"}
                  className="relative z-10 flex h-6 cursor-pointer items-center gap-1 border-none bg-transparent px-3 outline-none"
                >
                  {active && (
                    <span
                      aria-hidden
                      className="pointer-events-none absolute inset-0 -z-10 rounded-[6px] bg-ed-tab-chip shadow-ed-tab-chip"
                    />
                  )}
                  <span className="inline-grid text-xs whitespace-nowrap">
                    <span
                      aria-hidden
                      className="invisible col-start-1 row-start-1 [text-box:trim-both_cap_alphabetic]"
                      style={{ fontVariationSettings: '"wght" 550, "opsz" 18' }}
                    >
                      {label}
                    </span>
                    <span
                      className={cn(
                        "col-start-1 row-start-1 transition-[color,font-variation-settings] duration-80 [text-box:trim-both_cap_alphabetic]",
                        active ? "text-ed-text" : "text-ed-text-secondary"
                      )}
                      style={{
                        fontVariationSettings: active ? '"wght" 550, "opsz" 18' : '"wght" 400, "opsz" 14',
                      }}
                    >
                      {label}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        <div className="flex h-6 w-[62px] shrink-0 items-center rounded-2xs pl-1 text-ed-text transition-colors duration-150 hover:bg-ed-hover">
          <span className="h-6 min-w-0 flex-1 border-0 bg-transparent text-center text-2xs leading-6 font-control tracking-control text-ed-text tabular-nums">
            {zoom}
          </span>
          <span className="flex size-5 shrink-0 items-center justify-center rounded-2xs text-ed-text">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden className="size-4">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10.4751 7.47486C10.6704 7.2796 10.6704 6.96302 10.4751 6.76775C10.2798 6.57249 9.96326 6.57249 9.768 6.76775L8.00023 8.53552L6.23246 6.76775C6.0372 6.57249 5.72062 6.57249 5.52535 6.76775C5.33009 6.96302 5.33009 7.2796 5.52535 7.47486L7.64668 9.59618L8.00023 9.94973L8.35378 9.59618L10.4751 7.47486Z"
                fill="currentColor"
                fillOpacity="0.9"
              />
            </svg>
          </span>
        </div>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * PanelHeader, Section, Row, Field, InfoTip
 * ------------------------------------------------------------------ */
function PanelHeader({ title, info }: { title: string; info?: string }) {
  return (
    <header className="flex h-[40px] shrink-0 items-center border-b border-ed-border select-none">
      <div className="flex min-w-0 flex-1 items-center justify-between gap-2 pr-2 pl-4">
        <div className="flex min-w-0 flex-1 items-center gap-1.5">
          <h2 className="min-w-0 truncate text-ed-shell leading-4 font-semibold text-ed-text">{title}</h2>
          {info && <InfoTip subject={title} info={info} />}
        </div>
      </div>
    </header>
  );
}

function InfoTip({ subject, info }: { subject: string; info: string }) {
  return (
    <button
      type="button"
      aria-label={`About ${subject}`}
      data-info={info}
      className={cn(
        "flex size-4 shrink-0 items-center justify-center rounded-full text-ed-text-tertiary",
        "transition-colors hover:text-ed-text",
        "focus-visible:ring-2 focus-visible:ring-ed-accent focus-visible:outline-none"
      )}
    >
      <InfoIcon size={12} />
    </button>
  );
}

function Section({ title, info, children }: { title: string; info?: string; children: React.ReactNode }) {
  return (
    <section className="border-b border-ed-border select-none">
      <div className="flex h-8 items-center justify-between pr-4 pl-4 transition-opacity">
        <div className="flex min-w-0 flex-1 items-center gap-1">
          <button
            type="button"
            aria-expanded
            className="flex min-w-0 items-center gap-1.5 self-stretch focus-visible:ring-2 focus-visible:ring-ed-accent focus-visible:outline-none focus-visible:ring-inset"
          >
            <span className="min-w-0 truncate text-left text-2xs leading-4 font-label tracking-control text-ed-text">
              {title}
            </span>
            <ChevronRightIcon size={12} className="shrink-0 rotate-90 text-ed-text-tertiary transition-transform duration-150" />
          </button>
          {info && <InfoTip subject={title} info={info} />}
        </div>
      </div>
      <div className="pb-3">{children}</div>
    </section>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  return (
    <div className="py-1 pr-10 pl-4">
      <div className="flex items-end gap-2">{children}</div>
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex min-w-0 flex-1 flex-col">
      <span className={cn(LABEL, "mb-1")}>{label}</span>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------ *
 * SelectInput — the trigger strip, and the menu it opens
 * ------------------------------------------------------------------ */
function SelectStrip({
  value,
  options,
  open,
  highlighted,
}: {
  value: string;
  options?: string[];
  open: boolean;
  highlighted?: string;
}) {
  // What it is set to now, even where the types no longer include it.
  const list = options ? (value && !options.includes(value) ? [value, ...options] : options) : null;
  return (
    <div className="relative">
      <button
        type="button"
        data-slot="select-trigger"
        data-state={open ? "open" : "closed"}
        className={cn(
          "flex h-6 w-full min-w-0 items-center gap-1 rounded-input bg-ed-input pr-0 pl-1.5",
          CONTROL_TEXT,
          "text-ed-text transition-colors duration-150",
          "hover:bg-ed-input-hover",
          "data-[state=open]:bg-ed-input-hover",
          !list && "pr-1.5"
        )}
      >
        <span data-slot="select-value" className="min-w-0 flex-1 truncate text-left">
          <span className="flex min-w-0 items-center gap-1.5">
            <span className="truncate">{value}</span>
          </span>
        </span>
        {list && (
          <span className="flex size-6 shrink-0 items-center justify-center text-ed-text">
            <HugeiconsIcon icon={HgChevronDown} size={12} strokeWidth={1.5} aria-hidden />
          </span>
        )}
      </button>
      {list && open && (
        <div
          data-slot="select-content"
          role="listbox"
          className={cn(
            "absolute top-full right-0 left-0 z-50 mt-1 min-w-[8rem] overflow-x-hidden overflow-y-auto",
            "rounded-[12px] bg-ed-panel p-1.5 text-ed-text shadow-ed-popover"
          )}
        >
          {list.map((option) => {
            const checked = option === value;
            const lit = option === highlighted;
            return (
              <div
                key={option}
                role="option"
                aria-selected={checked}
                data-state={checked ? "checked" : "unchecked"}
                data-highlighted={lit ? "" : undefined}
                className={cn(
                  "relative flex h-7 w-full cursor-default items-center gap-2 rounded-2xs px-2",
                  CONTROL_TEXT,
                  "text-ed-text outline-none select-none",
                  "not-data-[highlighted]:data-[state=checked]:bg-ed-input",
                  "data-[highlighted]:bg-ed-accent data-[highlighted]:text-ed-on-accent"
                )}
              >
                <span className="flex items-center gap-2">
                  <span className="truncate">{option}</span>
                </span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
