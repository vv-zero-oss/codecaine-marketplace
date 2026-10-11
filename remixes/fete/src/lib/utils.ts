import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge, told about the type scale in `index.css` — otherwise it
 *  reads `text-mega` as a colour and drops it next to `text-ink`. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["caption", "body", "lead", "h4", "h3", "h2", "display", "mega", "giga"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
