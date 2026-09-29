import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * `cn()`, taught this page's type scale. Without it tailwind-merge reads
 * `text-scene` as a colour and drops it beside `text-ink` — or drops the
 * colour beside it — and a headline loses its size.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["micro", "nav", "body", "scene", "hero", "cta"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
