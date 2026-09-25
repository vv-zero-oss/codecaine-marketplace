import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge has to be told about the type scale in `index.css`: left to
 * guess, it reads `text-product` as a colour and drops it the moment a
 * `text-ink` follows it in the same `cn()`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["caption", "ui", "label", "lead", "statement", "serif", "display", "product"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
