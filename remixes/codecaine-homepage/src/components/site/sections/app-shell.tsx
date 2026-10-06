
import { useState } from "react";
import { cn } from "@/lib/utils";
import { TIMELINE_ROWS, TIMELINE_RULER } from "@/lib/timeline";
import { Dropdown } from "../dropdown";
import { Scrubber } from "../scrubber";
import { Segmented } from "../segmented";
import { CheckIcon, ChevronDown, DotsIcon, SparkIcon } from "../icons";

const BEZIER = ["0.22", "1", "0.36", "1"] as const;

/** The motion inspector panel, assembled entirely from the component layer. */
export function AppShell() {
  const [selected, setSelected] = useState<string>(
    TIMELINE_ROWS.find((row) => row.selected)?.id ?? TIMELINE_ROWS[0].id,
  );

  return (
    <section className="mt-12" id="shell">
      <h2 className="type-title">Application shell</h2>
      <p className="type-caption mt-1.5 max-w-[62ch]">
        A motion inspector assembled entirely from the component layer — no bespoke CSS. Toolbar,
        timeline and inspector all inherit the theme.
      </p>

      <div className="panel mt-6">
        {/* Toolbar ------------------------------------------------------- */}
        <div className="toolbar">
          <span className="type-body hidden shrink-0 text-fg-subtle sm:inline">Selected</span>

          <Dropdown
            className="min-w-0 shrink"
            menuClassName="absolute left-0 top-[calc(100%_+_6px)] z-30 w-[260px]"
            renderTrigger={({ expanded, toggle, menuId }) => (
              <button
                type="button"
                className="btn btn-ghost btn-pill min-w-0"
                aria-expanded={expanded}
                aria-controls={menuId}
                onClick={toggle}
              >
                <span className="truncate">Menu dropdown · Open</span>
                <span className="text-fg-faint">250ms</span>
                <span className="select-icon">
                  <ChevronDown className="size-4" />
                </span>
              </button>
            )}
          >
            <div className="menu-search">
              <input className="input-search" placeholder="Search" aria-label="Search transitions" />
            </div>
            <div className="menu-section">Menu dropdown</div>
            <div className="menu-item">
              <span className="menu-item-text">Open</span>
              <span className="menu-item-hint">250ms</span>
            </div>
            <div className="menu-item">
              <span className="menu-item-text">Close</span>
              <span className="menu-item-hint">150ms</span>
            </div>
          </Dropdown>

          <span className="ml-auto hidden min-w-0 truncate text-sm text-fg-faint md:inline">
            2 transitions found
          </span>

          <span className="chip-status hidden lg:inline-flex">
            <span className="status-dot" />
            Live
          </span>

          <button className="btn btn-icon btn-raised btn-pill" aria-label="Settings">
            <DotsIcon className="size-4" />
          </button>

          <button className="btn btn-raised btn-pill">Reset</button>

          <button className="btn btn-raised btn-pill">
            <CheckIcon />
            <span className="hidden sm:inline">Accept</span>
          </button>

          <button className="btn btn-accent btn-pill">
            <SparkIcon />
            <span className="hidden sm:inline">Generate</span>
          </button>
        </div>

        {/* Body ---------------------------------------------------------- */}
        <div className="flex min-h-[340px] flex-col lg:flex-row">
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex h-[30px] shrink-0 border-b border-line">
              <div className="shrink-0 basis-[200px] border-r border-line" />
              <div className="timeline-ruler">
                {TIMELINE_RULER.map((stop) =>
                  stop.label ? (
                    <span
                      key={stop.at}
                      className="timeline-ruler-major"
                      style={
                        stop.at === 0
                          ? { left: "4px", transform: "none" }
                          : stop.at === 100
                            ? { left: "100%", transform: "translateX(-100%)", marginLeft: "-4px" }
                            : { left: `${stop.at}%` }
                      }
                    >
                      {stop.label}
                    </span>
                  ) : (
                    <span key={stop.at} className="timeline-tick" style={{ left: `${stop.at}%` }} />
                  ),
                )}
              </div>
            </div>

            {TIMELINE_ROWS.map((row) => (
              <div
                key={row.id}
                className={cn("timeline-row", selected === row.id && "is-selected")}
                onClick={() => setSelected(row.id)}
              >
                <div className="timeline-head">
                  <span className="badge shrink-0">{row.badge}</span>
                  <span
                    className={cn(
                      "min-w-0 truncate text-sm font-medium",
                      selected === row.id ? "text-fg" : "text-fg-subtle",
                    )}
                  >
                    {row.property}
                  </span>
                </div>
                <div className="timeline-track">
                  <div className="timeline-bar" style={{ left: `${row.left}%`, width: `${row.width}%` }}>
                    <span className="timeline-grip" style={{ left: "5px" }} />
                    <span className="timeline-grip" style={{ right: "5px" }} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Inspector --------------------------------------------------- */}
          <aside className="scroll-thin flex w-full shrink-0 flex-col gap-3 border-l border-line p-4 lg:w-[280px]">
            <div className="flex items-center gap-1.5">
              <span className="badge">Menu surface</span>
              <span className="type-label">transform</span>
            </div>

            <Scrubber label="Duration" defaultValue={250} stepperLabel="Presets" />
            <Scrubber label="Delay" defaultValue={0} stepperLabel="Presets" />

            <div className="divider -mx-4 w-[calc(100%_+_2rem)]" />

            <Segmented options={["Easing", "Springs"]} />

            <Dropdown
              role="listbox"
              menuClassName="absolute left-0 top-[calc(100%_+_6px)] z-30 w-full"
              renderTrigger={({ expanded, toggle, menuId }) => (
                <button
                  type="button"
                  className="select"
                  aria-haspopup="listbox"
                  aria-expanded={expanded}
                  aria-controls={menuId}
                  onClick={toggle}
                >
                  <span className="select-value">Smooth ease out</span>
                  <span className="select-icon">
                    <ChevronDown className="size-4" />
                  </span>
                </button>
              )}
            >
              <div className="menu-item" role="option" aria-selected="true">
                <span className="menu-item-text">Smooth ease out</span>
              </div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">Ease in out</span>
              </div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">Linear</span>
              </div>
            </Dropdown>

            <div className="flex gap-1">
              {BEZIER.map((value, index) => (
                <div className="input-num" key={index}>
                  <input
                    type="number"
                    step="0.05"
                    defaultValue={value}
                    aria-label={`Control point ${index + 1}`}
                  />
                </div>
              ))}
            </div>

            <div className="card-flat mt-2 flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="badge">Menu surface</span>
                <span className="text-sm font-medium text-fg">Transform</span>
              </div>
              <div className="divider-soft -mx-4 w-[calc(100%_+_2rem)]" />
              <span className="chip chip-scale self-start">Scale</span>
              <div className="flex flex-col font-mono text-sm">
                <span className="text-fg-faint line-through">0.8</span>
                <span className="text-fg">0.97</span>
              </div>
              <p className="type-caption">
                Medium (0.97) is the scale token for a dropdown open. 0.8 over-pops.
              </p>
              <button className="btn btn-sm btn-raised btn-pill self-start">Apply</button>
            </div>
          </aside>
        </div>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <button className="btn btn-lg btn-raised btn-pill pr-2.5">
          Transitions <span className="badge-count is-single">2</span>
        </button>
        <span className="type-caption">Minimized state</span>
      </div>
    </section>
  );
}
