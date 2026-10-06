
import { useEffect, useSyncExternalStore } from "react";
import { applyTheme, type ResolvedTheme, type ThemePref } from "@/lib/theme";

/**
 * The theme hooks read the DOM, not React state.
 *
 * `data-theme` / `data-theme-pref` on <html> are the single source of truth —
 * the inline head script sets them before first paint, and `applyTheme` is the
 * only writer. Subscribing to those attributes with `useSyncExternalStore`
 * keeps every consumer in sync without a second copy of the value in state,
 * and gives the server render a stable snapshot so nothing hydrates twice.
 */
function subscribe(onChange: () => void) {
  const observer = new MutationObserver(onChange);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["data-theme", "data-theme-pref"],
  });
  return () => observer.disconnect();
}

const readPref = (): ThemePref =>
  (document.documentElement.getAttribute("data-theme-pref") as ThemePref) ?? "system";

const readResolved = (): ResolvedTheme =>
  document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";

/** What the user chose: light | dark | system. */
export function useThemePref(): ThemePref {
  return useSyncExternalStore(subscribe, readPref, () => "system");
}

/** What is actually painting. Any third-party component that needs to know the
 *  theme (sonner, for one) reads it from here — this repo has no next-themes. */
export function useResolvedTheme(): ResolvedTheme {
  return useSyncExternalStore(subscribe, readResolved, () => "light");
}

/**
 * Keeps `system` following the OS. Mount once, near the root; it writes the
 * attributes and every subscriber above re-reads them.
 */
export function useSystemThemeSync() {
  useEffect(() => {
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const onChange = () => {
      if (readPref() === "system") applyTheme("system");
    };
    media.addEventListener("change", onChange);
    return () => media.removeEventListener("change", onChange);
  }, []);
}
