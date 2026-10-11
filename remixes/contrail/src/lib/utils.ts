import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge, told about the type scale in `index.css` — otherwise it
 *  reads `text-h1` as a colour and drops it when a `text-ink` follows. */
const merge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["micro", "caption", "body", "lead", "h4", "h3", "h2", "h1", "display", "mega"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return merge(clsx(inputs))
}
