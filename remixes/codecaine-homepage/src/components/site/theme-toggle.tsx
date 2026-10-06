
import { applyTheme, THEME_ORDER } from "@/lib/theme";
import { useResolvedTheme, useSystemThemeSync, useThemePref } from "@/hooks/use-theme";
import { MoonIcon, SunIcon } from "./icons";

/**
 * light → dark → system, in that order.
 *
 * The two icons live in one grid cell and cross-blur (`.m-icon-swap`): the
 * outgoing icon blurs and scales down while the incoming one resolves, so the
 * button never shows an empty frame. Frequency-wise a theme toggle is a rare
 * action, so it earns real motion — at `--duration-medium`, the same open
 * duration the rest of the system uses.
 *
 * State comes straight off the `data-theme*` attributes the inline head script
 * already set, so the first client render matches the server HTML exactly.
 */
export function ThemeToggle() {
  const pref = useThemePref();
  const resolved = useResolvedTheme();
  useSystemThemeSync();

  return (
    <button
      type="button"
      className="btn btn-icon btn-soft btn-pill"
      aria-label="Toggle color theme"
      title={`Theme: ${pref}`}
      onClick={() => applyTheme(THEME_ORDER[(THEME_ORDER.indexOf(pref) + 1) % THEME_ORDER.length])}
    >
      <span className="m-icon-swap size-4" data-state={resolved === "dark" ? "b" : "a"} aria-hidden>
        <MoonIcon data-icon="a" className="size-4" />
        <SunIcon data-icon="b" className="size-4" />
      </span>
    </button>
  );
}
