import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

import { cn } from "@/lib/utils"

type Theme = "light" | "dark"

/**
 * Light / dark, as a two-way segmented switch. The choice is saved for the
 * next visit; until somebody picks one, the page follows the system (see the
 * script in index.html).
 */
export function ThemeToggle({ className }: { className?: string }) {
  const [theme, setTheme] = useState<Theme>(() => (document.documentElement.dataset.theme as Theme) ?? "light")

  useEffect(() => {
    // The system can change underneath us while nothing is saved.
    const observer = new MutationObserver(() => setTheme(document.documentElement.dataset.theme as Theme))
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] })
    return () => observer.disconnect()
  }, [])

  const choose = (next: Theme) => {
    document.documentElement.dataset.theme = next
    try {
      localStorage.setItem("theme", next)
    } catch {
      // Private mode: the choice lasts for this visit only.
    }
  }

  return (
    <div role="radiogroup" aria-label="Colour theme" className={cn("inline-flex rounded-pill bg-ink/8 p-1", className)}>
      {([
        ["light", Sun, "Light"],
        ["dark", Moon, "Dark"],
      ] as const).map(([value, Icon, label]) => (
        <button
          key={value}
          role="radio"
          aria-checked={theme === value}
          aria-label={label}
          onClick={() => choose(value)}
          className={cn(
            "grid size-11 cursor-pointer place-items-center rounded-pill transition-[background-color,color,transform] duration-160 ease-press active:scale-[0.94] sm:size-9",
            theme === value ? "bg-surface text-ink shadow-chip" : "text-ink-muted hover:text-ink",
          )}
        >
          <Icon className="size-4" strokeWidth={1.75} />
        </button>
      ))}
    </div>
  )
}
