/** Theme preference: what the user chose. `system` follows the OS. */
export type ThemePref = "light" | "dark" | "system";

/** Theme resolution: what actually paints. */
export type ResolvedTheme = "light" | "dark";

export const THEME_ORDER: ThemePref[] = ["light", "dark", "system"];
export const THEME_STORAGE_KEY = "ds:theme";

/**
 * Runs in <head> before first paint so the page never flashes the wrong theme.
 * Sets BOTH hooks — `data-theme` (page chrome) and `data-tl-theme` (embedded
 * panel + its portaled menus) — so they stay in lockstep, and records the
 * preference itself in `data-theme-pref` for the toggle to read back.
 *
 * Stringified rather than imported: it has to be inline to beat first paint.
 */
export const themeInitScript = `(function(){try{
var pref=localStorage.getItem(${JSON.stringify(THEME_STORAGE_KEY)})||"system";
var dark=pref==="dark"||(pref==="system"&&window.matchMedia&&window.matchMedia("(prefers-color-scheme: dark)").matches);
var r=document.documentElement;
r.setAttribute("data-theme",dark?"dark":"light");
r.setAttribute("data-tl-theme",dark?"dark":"light");
r.setAttribute("data-theme-pref",pref);
}catch(e){}})();`;

export function resolveTheme(pref: ThemePref): ResolvedTheme {
  if (pref !== "system") return pref;
  if (typeof window === "undefined") return "light";
  return window.matchMedia?.("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export function applyTheme(pref: ThemePref): ResolvedTheme {
  const resolved = resolveTheme(pref);
  const root = document.documentElement;
  root.setAttribute("data-theme", resolved);
  root.setAttribute("data-tl-theme", resolved);
  root.setAttribute("data-theme-pref", pref);
  try {
    localStorage.setItem(THEME_STORAGE_KEY, pref);
  } catch {
    /* private mode — the attributes above still hold for this session */
  }
  return resolved;
}
