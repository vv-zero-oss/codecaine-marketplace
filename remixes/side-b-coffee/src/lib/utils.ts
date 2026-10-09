import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * `cn()` with the site's own type scale taught to tailwind-merge, so
 * `text-h3` replaces a component's default `text-lg` instead of being
 * mistaken for a colour and dropped.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "caption", "body", "lead", "h4", "h3", "h2", "h1", "display", "mega"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
