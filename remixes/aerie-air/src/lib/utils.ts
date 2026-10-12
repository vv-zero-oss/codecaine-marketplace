import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge, told about the type scale in `index.css` — otherwise it
 *  reads `text-giga` as a colour and drops it next to `text-ink`. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["micro", "body", "lead", "h4", "h3", "h2", "display", "mega", "giga", "tera"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
