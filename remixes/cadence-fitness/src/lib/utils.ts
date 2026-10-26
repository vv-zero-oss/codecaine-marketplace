import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge, told about the type scale in `index.css`. Without this it
 * reads `text-h2` as a colour, and a `text-fg` after it would silently drop
 * the size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "caption", "body", "lead", "h4", "h3", "h2", "statement", "hero"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
