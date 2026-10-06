import {
  CATEGORY_CHIPS,
  DURATIONS,
  EASINGS,
  ELEVATION_TOKENS,
  STATUS_SWATCHES,
  SURFACE_TOKENS,
  TEXT_TOKENS,
  TYPE_SCALE,
} from "@/lib/tokens";

const CHIP_CLASS: Record<(typeof CATEGORY_CHIPS)[number], string> = {
  easing: "chip-easing",
  duration: "chip-duration",
  scale: "chip-scale",
  blur: "chip-blur",
  delay: "chip-delay",
};

const SURFACE_CLASS: Record<(typeof SURFACE_TOKENS)[number], string> = {
  bg: "bg-bg",
  surface: "bg-surface",
  "surface-raised": "bg-surface-raised",
  "surface-sunken": "bg-surface-sunken",
};

const TEXT_CLASS: Record<(typeof TEXT_TOKENS)[number], string> = {
  fg: "text-fg",
  "fg-strong": "text-fg-strong",
  "fg-muted": "text-fg-muted",
  "fg-subtle": "text-fg-subtle",
  "fg-faint": "text-fg-faint",
  "fg-disabled": "text-fg-disabled",
};

const ELEVATION_CLASS: Record<string, string> = {
  "shadow-ring": "shadow-ring",
  "shadow-drop": "shadow-drop",
  "shadow-btn": "shadow-btn",
  "shadow-card": "shadow-card",
  "shadow-menu": "shadow-menu",
  "shadow-panel": "shadow-panel",
};

export function Foundations() {
  return (
    <section className="mt-10" id="foundations">
      <h2 className="type-title">Foundations</h2>
      <p className="type-caption mt-1.5 max-w-[62ch]">
        Every value below is a token. Components never hardcode a color, a shadow or a duration —
        they read a semantic variable, so one attribute flip retints the system.
      </p>

      <div className="card mt-6">
        <h3 className="type-heading">Type scale</h3>
        <p className="type-caption mt-1">Nine px-locked steps. Dense tool UI, not flowing prose.</p>
        <div className="mt-5 flex flex-col gap-4">
          {TYPE_SCALE.map((row) => (
            <div key={row.token} className="grid grid-cols-[132px_1fr] items-baseline gap-4">
              <code className="type-mono text-xs text-fg-faint">
                {row.token} · {row.metrics}
              </code>
              <span className={row.role}>{row.sample}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-5">
        <h3 className="type-heading">Color</h3>
        <p className="type-caption mt-1">Semantic roles, not hues. Each swatch swaps with the theme.</p>

        <p className="type-meta mt-5 uppercase tracking-wider">Surfaces</p>
        <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SURFACE_TOKENS.map((token) => (
            <div key={token} className={`rounded-lg p-3 shadow-hairline ${SURFACE_CLASS[token]}`}>
              <span className="type-mono text-xs">{token}</span>
            </div>
          ))}
        </div>

        <p className="type-meta mt-5 uppercase tracking-wider">Text</p>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
          {TEXT_TOKENS.map((token) => (
            <span key={token} className={`type-mono text-xs ${TEXT_CLASS[token]}`}>
              {token}
            </span>
          ))}
        </div>

        <p className="type-meta mt-5 uppercase tracking-wider">Accent &amp; status</p>
        <div className="mt-2 flex flex-wrap gap-2">
          {STATUS_SWATCHES.map((swatch) => (
            <span
              key={swatch.label}
              className="chip"
              style={{ color: `var(${swatch.fg})`, background: `var(${swatch.bg})` }}
            >
              {swatch.label}
            </span>
          ))}
          {CATEGORY_CHIPS.map((chip) => (
            <span key={chip} className={`chip ${CHIP_CLASS[chip]}`}>
              {chip}
            </span>
          ))}
        </div>
      </div>

      <div className="card mt-5">
        <h3 className="type-heading">Elevation</h3>
        <p className="type-caption mt-1">
          Borders are inset shadows, so a control never changes size between states. In dark mode
          elevation becomes a light top edge rather than a heavier drop.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {ELEVATION_TOKENS.map((row) => (
            <div key={row.token} className={`rounded-xl p-4 ${row.surface} ${ELEVATION_CLASS[row.token]}`}>
              <span className="type-mono text-xs">{row.token}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="card mt-5">
        <h3 className="type-heading">Motion</h3>
        <p className="type-caption mt-1">
          Durations and curves are tokens too — an off-grid 300&nbsp;ms{" "}
          <code className="type-code">ease</code> is exactly what Refine flags.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="type-meta uppercase tracking-wider">Duration</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {DURATIONS.map((row) => (
                <li key={row.name} className="flex justify-between">
                  <span className="type-body">{row.name}</span>
                  <code className="type-mono text-xs text-fg-faint">{row.value}</code>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="type-meta uppercase tracking-wider">Easing</p>
            <ul className="mt-2 flex flex-col gap-1.5">
              {EASINGS.map((row, index) => (
                <li key={row.name} className={`flex flex-col ${index > 0 ? "mt-1" : ""}`}>
                  <span className="type-body">{row.name}</span>
                  <code className="type-mono text-xs text-fg-faint">{row.value}</code>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
