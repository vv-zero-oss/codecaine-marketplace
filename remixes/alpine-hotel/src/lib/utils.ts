import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge, told about the type sizes in `index.css` so it doesn't mistake them for colours. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["cover", "display", "lede", "label"] }],
      shadow: [{ shadow: ["(--shadow-print)", "(--shadow-sheet)"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
