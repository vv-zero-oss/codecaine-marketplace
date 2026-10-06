
import { Dropdown } from "../dropdown";
import { ModalDemo } from "../modal-demo";
import { PillTabs } from "../pill-tabs";
import { Scrubber } from "../scrubber";
import { Segmented } from "../segmented";
import { ToggleSwitch } from "../toggle-switch";
import { showToast } from "../toast-host";
import { CheckIcon, ChevronDown, ChevronRight, CollapseIcon, GearIcon, SparkIcon } from "../icons";

const BEZIER = ["0.22", "1", "0.36", "1"] as const;

export function ComponentGallery() {
  return (
    <section className="mt-12" id="components">
      <h2 className="type-title">Components</h2>

      {/* Buttons ------------------------------------------------------------ */}
      <div className="card mt-6">
        <h3 className="type-heading">Buttons</h3>
        <p className="type-caption mt-1">
          One base class, six skins, three heights. Press feedback is{" "}
          <code className="type-code">scale: .96</code> so it composes with any transform a parent is
          running.
        </p>

        <p className="type-meta mt-5 uppercase tracking-wider">Variants</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button className="btn btn-raised">Reset</button>
          <button className="btn btn-solid">Publish</button>
          <button className="btn btn-soft">Secondary</button>
          <button className="btn btn-ghost">Ghost</button>
          <button className="btn btn-accent">
            <SparkIcon />
            Generate
          </button>
          <button className="btn btn-danger">Delete</button>
          <button className="btn btn-raised" disabled>
            Disabled
          </button>
        </div>

        <p className="type-meta mt-5 uppercase tracking-wider">Sizes &amp; shapes</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <button className="btn btn-sm btn-raised">Small · 32</button>
          <button className="btn btn-md btn-raised">Medium · 36</button>
          <button className="btn btn-lg btn-raised">Large · 40</button>
          <button className="btn btn-raised btn-pill">Pill</button>
          <button className="btn btn-icon btn-raised" aria-label="Settings">
            <GearIcon />
          </button>
          <button className="btn btn-icon btn-ghost btn-pill" aria-label="Minimize">
            <CollapseIcon />
          </button>
        </div>
      </div>

      {/* Inputs ------------------------------------------------------------- */}
      <div className="card mt-5">
        <h3 className="type-heading">Inputs &amp; fields</h3>
        <p className="type-caption mt-1">
          Focus is an inset ring on the well, never an outer glow, so a focused field stays inside
          its row.
        </p>

        <div className="mt-5 grid gap-5 sm:grid-cols-2">
          <label className="field">
            <span className="type-field-label">Component name</span>
            <input className="input" type="text" placeholder="Menu dropdown" />
            <span className="field-hint">Shown in the transition picker.</span>
          </label>

          <label className="field">
            <span className="type-field-label">Selector</span>
            <input className="input input-mono" type="text" defaultValue=".wd-dd .wd-dd-menu" />
            <span className="field-error">No element matches this selector.</span>
          </label>

          <label className="field sm:col-span-2">
            <span className="type-field-label">Notes</span>
            <textarea className="textarea" placeholder="What should this transition feel like?" />
          </label>

          <div className="field">
            <span className="type-field-label">cubic-bezier</span>
            <div className="flex gap-1">
              {BEZIER.map((value, index) => (
                <div className="input-num" key={index}>
                  <input type="number" step="0.05" defaultValue={value} aria-label={`Control point ${index + 1}`} />
                </div>
              ))}
            </div>
          </div>

          <div className="field">
            <span className="type-field-label">Toggle</span>
            <div className="flex h-8 items-center gap-3">
              <ToggleSwitch defaultChecked label="Snap to grid" />
              <span className="type-body">Snap to grid</span>
            </div>
          </div>
        </div>

        <p className="type-meta mt-6 uppercase tracking-wider">
          Scrubber — slider and number input in one box
        </p>
        <div className="mt-2 flex max-w-[320px] flex-col gap-2.5">
          <Scrubber label="Duration" defaultValue={250} />
          <Scrubber label="Delay" defaultValue={0} />
        </div>
      </div>

      {/* Select + menu ------------------------------------------------------ */}
      <div className="card mt-5">
        <h3 className="type-heading">Select &amp; menu</h3>
        <p className="type-caption mt-1">
          One surface, one row class. The chevron rotates from the same{" "}
          <code className="type-code">aria-expanded</code> the menu reads.
        </p>

        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="type-field-label mb-1.5">Select</p>
            <Dropdown
              role="listbox"
              menuClassName="absolute left-0 top-[calc(100%_+_6px)] z-20 w-full min-w-[248px]"
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
              <div className="menu-section">Motion tokens</div>
              <div className="menu-item" role="option" aria-selected="true">
                <span className="menu-item-text">Smooth ease out</span>
                <span className="menu-item-check">
                  <CheckIcon className="size-4" />
                </span>
              </div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">Ease in out</span>
              </div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">Bouncy overshoot</span>
              </div>
              <div className="menu-divider" />
              <div className="menu-section">Standard</div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">ease</span>
              </div>
              <div className="menu-item" role="option" aria-selected="false">
                <span className="menu-item-text">linear</span>
              </div>
              <div className="menu-item is-disabled" role="option" aria-selected="false">
                <span className="menu-item-text">steps() — unsupported</span>
              </div>
            </Dropdown>
          </div>

          <div>
            <p className="type-field-label mb-1.5">Menu with search</p>
            <div className="menu">
              <div className="menu-search">
                <input className="input-search" type="text" placeholder="Search" aria-label="Search" />
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
              <div className="menu-divider" />
              <div className="menu-item">
                <span className="menu-item-text">Theme</span>
                <span className="flex items-center gap-1">
                  <span className="type-meta">System</span>
                  <span className="menu-item-icon">
                    <ChevronRight className="size-4" />
                  </span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs, chips, keycaps ---------------------------------------------- */}
      <div className="card mt-5">
        <h3 className="type-heading">Tabs, chips &amp; keycaps</h3>

        <p className="type-meta mt-5 uppercase tracking-wider">Sliding pill tabs</p>
        <PillTabs className="mt-2" tabs={["Overview", "Timeline", "Suggestions"]} />

        <p className="type-meta mt-5 uppercase tracking-wider">Segmented control</p>
        <Segmented className="mt-2" options={["Easing", "Springs"]} />

        <p className="type-meta mt-5 uppercase tracking-wider">Chips &amp; badges</p>
        <div className="mt-2 flex flex-wrap items-center gap-2">
          <span className="badge">Menu surface</span>
          <span className="badge-count is-single">3</span>
          <span className="badge-count">12</span>
          <span className="badge-soft">Beta</span>
          <span className="chip-status">
            <span className="status-dot" />
            Live
          </span>
          <span className="chip-status is-off">
            <span className="status-dot" />
            Live off
          </span>
        </div>

        <p className="type-meta mt-5 uppercase tracking-wider">Keycaps</p>
        <div className="mt-2 flex items-center gap-1">
          <kbd className="kbd">⌘</kbd>
          <span className="type-meta">+</span>
          <kbd className="kbd">K</kbd>
          <span className="ml-4" />
          <kbd className="kbd">⌘</kbd>
          <span className="type-meta">+</span>
          <kbd className="kbd">⌫</kbd>
        </div>
      </div>

      {/* Overlays ----------------------------------------------------------- */}
      <div className="card mt-5">
        <h3 className="type-heading">Overlays</h3>
        <p className="type-caption mt-1">
          Tooltips are CSS-only; the modal and toast share the dropdown&apos;s curve.
        </p>

        <ModalDemo
          trigger={(openModal) => (
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <span className="tooltip-host">
                <button className="btn btn-raised">Hover me</button>
                <span className="tooltip" role="tooltip">
                  Save changes to your codebase<span className="tooltip-kbd">⌘A</span>
                </span>
              </span>

              <span className="tooltip-host">
                <button className="btn btn-soft">Below &amp; wrapping</button>
                <span className="tooltip tooltip-below tooltip-wrap" role="tooltip">
                  Duration is set by the spring — its settle time is derived from stiffness,
                  damping and mass, so it can’t be edited directly.
                </span>
              </span>

              <button className="btn btn-raised" onClick={() => showToast("Values copied")}>
                Show toast
              </button>

              <button className="btn btn-solid" onClick={openModal}>
                Open modal
              </button>
            </div>
          )}
        />
      </div>
    </section>
  );
}
