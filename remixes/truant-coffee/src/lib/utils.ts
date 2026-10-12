import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge has to be told the type steps in `index.css` are font
 *  sizes, or `text-d3 text-ink` loses the size to the colour. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["micro", "caption", "body", "lead", "statement", "label", "d1", "d2", "d3", "d4", "d5", "d6"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
