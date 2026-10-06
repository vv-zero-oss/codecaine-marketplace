
import { Dropdown } from "../dropdown";
import { CaretIcon, ChevronRight, CopyIcon, RescanIcon } from "../icons";

/**
 * The hero dropdown is the reference implementation of the open/close
 * choreography: scale from `--motion-scale-md` (0.97) at `--duration-medium`
 * on open, back to `--motion-scale-xs` (0.99) at `--duration-fast` on close,
 * both on the house curve, anchored at the trigger's top-left corner.
 */
export function Hero() {
  return (
    <section className="flex flex-col items-center pt-7 pb-12 text-center">
      <p className="type-eyebrow inline-flex items-center gap-1.5">
        Codecaine <span className="badge-soft">Design system</span>
      </p>
      <h1 className="type-display mt-2.5">Brand guidelines</h1>
      <p className="type-lead mt-4 max-w-[417px]">
        The tokens, components and motion this site is built from — read live from the same
        stylesheet the pages use, so this page can never drift from them.
      </p>

      <div className="mt-4 flex w-full justify-center">
        <Dropdown
          className="inline-block"
          menuClassName="absolute left-0 top-[calc(100%_+_8px)] z-20 min-w-[208px]"
          renderTrigger={({ expanded, toggle, menuId }) => (
            <button
              type="button"
              className="btn btn-lg btn-soft btn-pill"
              aria-haspopup="menu"
              aria-expanded={expanded}
              aria-controls={menuId}
              onClick={toggle}
            >
              Dropdown menu
              <span className="select-icon">
                <CaretIcon className="size-4" />
              </span>
            </button>
          )}
        >
          <div className="menu-section">Actions</div>
          <button type="button" className="menu-item" role="menuitem">
            <span className="menu-item-icon">
              <CopyIcon className="size-4" />
            </span>
            <span className="menu-item-text">Copy values</span>
          </button>
          <button type="button" className="menu-item" role="menuitem">
            <span className="menu-item-icon">
              <RescanIcon className="size-4" />
            </span>
            <span className="menu-item-text">Rescan tokens</span>
          </button>
          <div className="menu-divider" />
          <button type="button" className="menu-item" role="menuitem">
            <span className="menu-item-text">Keyboard shortcuts</span>
            <span className="menu-item-icon">
              <ChevronRight className="size-4" />
            </span>
          </button>
          <button type="button" className="menu-item" role="menuitem">
            <span className="menu-item-text">Learn more</span>
            <span className="menu-item-hint">↗</span>
          </button>
          <div className="menu-divider" />
          <div className="menu-footer">
            <span>
              Codecaine <span className="text-fg-muted">DS</span>
            </span>
            <span className="tabular-nums">1.0.0</span>
          </div>
        </Dropdown>
      </div>
    </section>
  );
}
