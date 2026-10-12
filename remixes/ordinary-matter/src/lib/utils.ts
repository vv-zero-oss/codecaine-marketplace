import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * tailwind-merge, told about the type scale in index.css — otherwise it
 * reads `text-h1` as a colour and drops it when `text-ink` follows.
 */
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ["label", "caption", "body", "lead", "h4", "h3", "h2", "h1", "display", "mega", "colossal", "masthead"],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
