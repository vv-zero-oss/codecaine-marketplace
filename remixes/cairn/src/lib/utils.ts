import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/** tailwind-merge, told about the type scale in `index.css` — otherwise it
 *  reads `text-mega` as a colour and drops it next to `text-ink`. */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["micro", "caption", "small", "body", "lead", "h4", "h3", "h2", "display", "mega", "giga"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const clamp = (value: number, min: number, max: number) => Math.min(max, Math.max(min, value))
