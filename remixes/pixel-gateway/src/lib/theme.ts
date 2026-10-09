/**
 * The rolled theme: a handful of token overrides written onto <html>.
 * Remembered in localStorage when it is available, and never required.
 */
export type ThemeVars = Record<string, string>
const KEY = "pixelkeep:theme"

export function applyTheme(vars: ThemeVars | null) {
  const root = document.documentElement
  for (const name of Object.keys(readApplied())) root.style.removeProperty(name)
  if (vars) for (const [name, value] of Object.entries(vars)) root.style.setProperty(name, value)
  try {
    if (vars) localStorage.setItem(KEY, JSON.stringify(vars))
    else localStorage.removeItem(KEY)
  } catch {
    /* private window or blocked storage: the theme just will not persist */
  }
  applied = vars ?? {}
}

let applied: ThemeVars = {}
function readApplied() {
  return applied
}

export function restoreTheme() {
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) applyTheme(JSON.parse(raw))
  } catch {
    /* ignore */
  }
}

export function themeIsApplied() {
  return Object.keys(applied).length > 0
}
