import { clsx, type ClassValue } from "clsx"
import { extendTailwindMerge } from "tailwind-merge"

/**
 * `cn` that knows the project's own tokens: without this, tailwind-merge reads
 * `text-label` as a colour and drops it whenever a text colour follows it, and
 * reads `py-phi-6` as nothing it can reconcile with `sm:py-phi-7`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [{ text: ["label", "label-sm"] }],
      p: [{ p: ["phi-1", "phi-2", "phi-3", "phi-4", "phi-5", "phi-6", "phi-7"] }],
      px: [{ px: ["phi-1", "phi-2", "phi-3", "phi-4", "phi-5", "phi-6", "phi-7"] }],
      py: [{ py: ["phi-1", "phi-2", "phi-3", "phi-4", "phi-5", "phi-6", "phi-7"] }],
      gap: [{ gap: ["phi-1", "phi-2", "phi-3", "phi-4", "phi-5", "phi-6", "phi-7"] }],
      mt: [{ mt: ["phi-1", "phi-2", "phi-3", "phi-4", "phi-5", "phi-6", "phi-7"] }],
      "max-w": [{ "max-w": ["measure"] }],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
